/**
 * Lightweight ambient snowfall. Inspired by the movement of softly drifting snow,
 * not the background or Santa artwork of the reference example.
 * No runtime dependencies. One canvas per mounted snowfall region.
 */
export interface SnowfallOptions {
  target?: string | HTMLElement;
  density?: number; // 0..1
  speed?: number; // multiplier, 0.1..3
  wind?: number; // signed horizontal movement, -2..2
  size?: readonly [number, number]; // radius in CSS pixels
  opacity?: readonly [number, number]; // 0..1
  color?: string;
  zIndex?: number;
}
export interface SnowfallController {
  mount(): void;
  destroy(): void;
}

type Flake = {
  x: number; y: number; radius: number; opacity: number;
  velocity: number; phase: number; sway: number;
};
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(n, b));
const randomBetween = (a: number, b: number) => a + Math.random() * (b - a);

export function createSnowfall(options: SnowfallOptions = {}): SnowfallController {
  let canvas: HTMLCanvasElement | undefined;
  let ctx: CanvasRenderingContext2D | null = null;
  let host: HTMLElement | null = null;
  let frame = 0;
  let previous = 0;
  let flakes: Flake[] = [];
  let observer: ResizeObserver | undefined;
  let media: MediaQueryList | undefined;
  let active = false;
  let width = 0, height = 0, dpr = 1;
  let originalPosition = "";
  let changedPosition = false;
  const density = clamp(options.density ?? 0.45, 0, 1);
  const speed = clamp(options.speed ?? 1, 0.1, 3);
  const wind = clamp(options.wind ?? 0.15, -2, 2);
  const size = options.size ?? [0.8, 3.1];
  const opacity = options.opacity ?? [0.25, 0.75];

  function makeFlake(initial = false): Flake {
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : -randomBetween(2, 25),
      radius: randomBetween(Math.max(0.2, size[0]), Math.max(size[0], size[1])),
      opacity: randomBetween(clamp(opacity[0], 0, 1), clamp(opacity[1], 0, 1)),
      velocity: randomBetween(13, 39),
      phase: Math.random() * Math.PI * 2,
      sway: randomBetween(5, 19)
    };
  }
  function resize(): void {
    if (!canvas || !host || !ctx) return;
    const bounds = host.getBoundingClientRect();
    width = Math.max(0, bounds.width);
    height = Math.max(0, bounds.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(240, Math.round(width * height / 8500 * density));
    flakes = Array.from({ length: count }, () => makeFlake(true));
  }
  function tick(time: number): void {
    if (!active || !ctx) return;
    const dt = Math.min((time - (previous || time)) / 1000, 0.05);
    previous = time;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = options.color ?? "#ffffff";
    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.phase += dt * (0.8 + f.radius * 0.18);
      f.x += (wind * 17 + Math.cos(f.phase) * f.sway) * dt;
      f.y += f.velocity * speed * dt;
      if (f.y > height + 8 || f.x > width + 12 || f.x < -12) {
        flakes[i] = makeFlake();
        continue;
      }
      ctx.globalAlpha = f.opacity;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    frame = requestAnimationFrame(tick);
  }
  function stop(): void {
    active = false;
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    ctx?.clearRect(0, 0, width, height);
  }
  function sync(): void {
    if (!canvas || !media) return;
    const allowed = !media.matches && !document.hidden && density > 0;
    if (!allowed) { stop(); return; }
    if (!active) {
      active = true;
      previous = 0;
      frame = requestAnimationFrame(tick);
    }
  }
  function mount(): void {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    destroy();
    host = typeof options.target === "string"
      ? document.querySelector<HTMLElement>(options.target)
      : options.target ?? document.body;
    if (!host) throw new Error("Festiva snowfall target not found");
    const computedPosition = getComputedStyle(host).position;
    originalPosition = host.style.position;
    changedPosition = computedPosition === "static";
    if (changedPosition) host.style.position = "relative";
    canvas = document.createElement("canvas");
    canvas.setAttribute("data-fes-layer", "snowfall");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = `position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:${Math.trunc(options.zIndex ?? 2)};`;
    host.append(canvas);
    ctx = canvas.getContext("2d");
    if (!ctx) { destroy(); return; }
    media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : undefined;
    observer?.observe(host);
    window.addEventListener("resize", resize);
    resize();
    sync();
  }
  function destroy(): void {
    stop();
    media?.removeEventListener("change", sync);
    document.removeEventListener("visibilitychange", sync);
    window.removeEventListener("resize", resize);
    observer?.disconnect();
    observer = undefined;
    canvas?.remove();
    canvas = undefined;
    ctx = null;
    if (host && changedPosition) host.style.position = originalPosition;
    host = null;
  }
  return { mount, destroy };
}

/** Declarative opt-in: elements with data-fes-effect="snowfall". */
export function mountSnowfallFixtures(root: ParentNode = document): () => void {
  const controllers: SnowfallController[] = [];
  for (const node of root.querySelectorAll<HTMLElement>('[data-fes-effect="snowfall"]')) {
    const numeric = (key: string): number | undefined => {
      const value = node.getAttribute(key);
      return value !== null && value.trim() !== "" && Number.isFinite(Number(value))
        ? Number(value) : undefined;
    };
    const snow = createSnowfall({
      target: node,
      density: numeric("data-fes-density"),
      speed: numeric("data-fes-speed"),
      wind: numeric("data-fes-wind")
    });
    snow.mount();
    controllers.push(snow);
  }
  return () => controllers.forEach(controller => controller.destroy());
}
