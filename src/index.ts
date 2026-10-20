import { getFestivals, isPresetActive } from "./calendar.js";
import type { FestivaEffect, FestivaLocale, FestivalId, FestivalPreset } from "./calendar.js";

export { getFestivals, isPresetActive, presets } from "./calendar.js";
export type { FestivaLocale, FestivalId, FestivalPreset, FestivaEffect } from "./calendar.js";

export interface FestivaOptions {
  locale: FestivaLocale;
  festival?: FestivalId;
  /** Existing logo/header or other HTML element. Does not replace it. */
  target?: string | HTMLElement;
  /** auto: follow festival date range; always: preview regardless of date. */
  mode?: "auto" | "always";
  /** YYYY-MM-DD inclusive; required for auto-scheduling variable-date Nepali festivals. */
  dates?: { start: string; end: string };
  effect?: FestivaEffect;
  intensity?: "subtle" | "normal";
  /** Optional flag; no sound is played in this first release. */
  sound?: false;
  /** Inject a clock for tests or previews. */
  now?: () => Date;
}

export interface FestivaController {
  mount(target?: string | HTMLElement): void;
  destroy(): void;
  refresh(): void;
  readonly active: boolean;
}

const SHAPES: Record<FestivaEffect, readonly string[]> = {
  snow: ["✦", "❄", "·"],
  lights: ["●", "✦", "●"],
  confetti: ["◆", "▰", "●"],
  sparkles: ["✧", "✦", "·"]
};
const PALETTES: Record<FestivaEffect, readonly string[]> = {
  snow: ["#f2f8ff", "#d9eaf8", "#ffffff"],
  lights: ["#f5b94f", "#f5deb4", "#f3c573"],
  confetti: ["#e85a65", "#e9b34e", "#6eab9a", "#a7a2dc"],
  sparkles: ["#eac88c", "#f3e2bc", "#cdb8e4"]
};

function element(value: string | HTMLElement | undefined): HTMLElement | null {
  if (typeof document === "undefined") return null;
  if (!value) return document.body;
  return typeof value === "string" ? document.querySelector<HTMLElement>(value) : value;
}

function makeParticle(type: FestivaEffect, i: number, count: number): HTMLElement {
  const node = document.createElement("span");
  const shape = SHAPES[type][i % SHAPES[type].length];
  node.textContent = shape;
  node.style.cssText = [
    "position:absolute", "pointer-events:none", "line-height:1",
    "user-select:none", "will-change:transform,opacity",
    `left:${(i * 61.8) % 100}%`,
    `top:${(i * 37.7) % 100}%`,
    `font-size:${6 + (i % 4) * 3}px`,
    `color:${PALETTES[type][i % PALETTES[type].length]}`,
    `opacity:${0.35 + (i % 4) * 0.12}`
  ].join(";");
  const duration = 3500 + (i % 7) * 610;
  const drift = 9 + (i % 6) * 4;
  const fall = type === "snow" || type === "confetti" ? 45 : 8;
  const rotate = type === "confetti" ? 160 : 12;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (!reduced && node.animate) {
    node.animate([
      { transform: "translate3d(0,0,0) rotate(0deg)", opacity: 0 },
      { transform: `translate3d(${drift}px,${fall / 2}px,0) rotate(${rotate / 2}deg)`, opacity: 0.75, offset: 0.45 },
      { transform: `translate3d(${-drift}px,${fall}px,0) rotate(${rotate}deg)`, opacity: 0 }
    ], { duration, iterations: Infinity, delay: -(i / count) * duration, easing: "ease-in-out" });
  }
  return node;
}

/**
 * Creates a lightweight festival decoration controller.
 * No global CSS, no framework dependency and no sound autoplay.
 */
export function createFestiva(options: FestivaOptions): FestivaController {
  const preset = getFestivals(options.locale).find(p => p.id === options.festival) ??
    (options.festival ? undefined : getFestivals(options.locale)[0]);
  if (!preset) throw new Error(`Unknown festival "${options.festival}" for locale "${options.locale}"`);
  if (options.dates && (!/^\d{4}-\d{2}-\d{2}$/.test(options.dates.start) || !/^\d{4}-\d{2}-\d{2}$/.test(options.dates.end) || options.dates.start > options.dates.end)) {
    throw new Error("dates must contain ordered YYYY-MM-DD start and end values");
  }
  if ((options.mode ?? "auto") === "auto" && preset.needsDates && !options.dates) {
    throw new Error(`${preset.id} requires explicit dates in auto mode; dates vary by year`);
  }

  let host: HTMLElement | null = null;
  let overlay: HTMLElement | null = null;
  let timer: ReturnType<typeof setInterval> | undefined;
  let mountedTarget = options.target;
  let active = false;

  function detach(): void {
    overlay?.remove();
    overlay = null;
    active = false;
  }

  function refresh(): void {
    if (typeof document === "undefined") return;
    const shouldShow = (options.mode ?? "auto") === "always" ||
      isPresetActive(preset!, (options.now ?? (() => new Date()))(), options.dates);
    if (!shouldShow) { detach(); return; }
    if (overlay?.isConnected) return;
    host = element(mountedTarget);
    if (!host) return;
    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.setAttribute("data-festiva", preset!.id);
    layer.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1;contain:paint";
    const computed = window.getComputedStyle(host);
    // Avoid altering the host site's layout: absolute positioning uses the nearest positioned ancestor.
    // For static elements this minimal adapter attaches to an absolute wrapper anchored by geometry.
    if (computed.position === "static") {
      const rect = host.getBoundingClientRect();
      layer.style.position = "fixed";
      layer.style.inset = "auto";
      layer.style.left = `${rect.left}px`;
      layer.style.top = `${rect.top}px`;
      layer.style.width = `${rect.width}px`;
      layer.style.height = `${rect.height}px`;
      layer.style.zIndex = "2147480000";
      document.body.append(layer);
    } else {
      host.append(layer);
    }
    const kind = options.effect ?? preset!.effect;
    const count = options.intensity === "normal" ? 20 : 9;
    for (let i = 0; i < count; i++) layer.append(makeParticle(kind, i, count));
    overlay = layer;
    active = true;
  }

  function onFocus(): void { refresh(); }
  function onResize(): void {
    if (overlay) { detach(); refresh(); }
  }

  function mount(target?: string | HTMLElement): void {
    if (typeof window === "undefined") return;
    destroy();
    mountedTarget = target ?? options.target;
    refresh();
    timer = setInterval(refresh, 60_000);
    window.addEventListener("focus", onFocus);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onFocus);
  }

  function destroy(): void {
    if (timer !== undefined) clearInterval(timer);
    timer = undefined;
    if (typeof window !== "undefined") {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onFocus);
    }
    detach();
    host = null;
  }
  return { mount, refresh, destroy, get active() { return active; } };
}
