export type FestivaLocale = "no" | "np";
export type FestivalId = "christmas" | "halloween" | "new-year" | "constitution-day" | "dashain" | "tihar" | "holi";
export type FestivaEffect = "snow" | "lights" | "confetti" | "sparkles";
export type FestivalPreset = {
  id: FestivalId;
  locale: FestivaLocale;
  name: string;
  effect: FestivaEffect;
  /** MM-DD for fixed holidays; dynamic dates intentionally excluded. */
  startsOn?: string;
  endsOn?: string;
  /** True for a festival whose Gregorian dates change by year. */
  needsDates?: boolean;
};

export const presets: Record<FestivaLocale, readonly FestivalPreset[]> = {
  no: [
    { id: "christmas", locale: "no", name: "Jul", effect: "snow", startsOn: "12-01", endsOn: "12-26" },
    { id: "halloween", locale: "no", name: "Halloween", effect: "sparkles", startsOn: "10-20", endsOn: "10-31" },
    { id: "new-year", locale: "no", name: "Nyttår", effect: "confetti", startsOn: "12-31", endsOn: "01-01" },
    { id: "constitution-day", locale: "no", name: "17. mai", effect: "confetti", startsOn: "05-17", endsOn: "05-17" }
  ],
  np: [
    { id: "dashain", locale: "np", name: "Dashain", effect: "sparkles", needsDates: true },
    { id: "tihar", locale: "np", name: "Tihar", effect: "lights", needsDates: true },
    { id: "holi", locale: "np", name: "Holi", effect: "confetti", needsDates: true },
    { id: "new-year", locale: "np", name: "New Year (Gregorian)", effect: "confetti", startsOn: "12-31", endsOn: "01-01" }
  ]
};

export function getFestivals(locale: FestivaLocale): readonly FestivalPreset[] {
  return presets[locale];
}

/** Interprets a calendar date in YYYY-MM-DD. Date ranges are inclusive. */
export function isDateInRange(date: string, start: string, end: string): boolean {
  if (start > end) return date >= start || date <= end; // MM-DD rollover only
  return date >= start && date <= end;
}

export function isPresetActive(preset: FestivalPreset, now: Date, dates?: { start: string; end: string }): boolean {
  const monthDay = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  if (dates) {
    const current = `${now.getFullYear()}-${monthDay}`;
    return current >= dates.start && current <= dates.end;
  }
  if (preset.needsDates) return false;
  if (!preset.startsOn || !preset.endsOn) return false;
  return isDateInRange(monthDay, preset.startsOn, preset.endsOn);
}
