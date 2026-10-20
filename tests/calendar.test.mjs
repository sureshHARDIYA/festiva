import test from "node:test";
import assert from "node:assert/strict";
import { getFestivals, isPresetActive, createFestiva } from "../dist/index.js";

test("Norwegian fixed festival activates in December", () => {
  const christmas = getFestivals("no").find(x => x.id === "christmas");
  assert.equal(isPresetActive(christmas, new Date(2026, 11, 24)), true);
  assert.equal(isPresetActive(christmas, new Date(2026, 9, 24)), false);
});
test("New Year wraps across December and January", () => {
  const newYear = getFestivals("no").find(x => x.id === "new-year");
  assert.equal(isPresetActive(newYear, new Date(2026, 11, 31)), true);
  assert.equal(isPresetActive(newYear, new Date(2027, 0, 1)), true);
  assert.equal(isPresetActive(newYear, new Date(2027, 0, 2)), false);
});
test("Nepali lunar festivals require explicit year-specific dates", () => {
  assert.throws(() => createFestiva({ locale: "np", festival: "tihar" }), /requires explicit dates/);
  const tihar = getFestivals("np").find(x => x.id === "tihar");
  assert.equal(isPresetActive(tihar, new Date(2026, 9, 24)), false);
});
test("Supports explicit date windows", () => {
  const tihar = getFestivals("np").find(x => x.id === "tihar");
  assert.equal(isPresetActive(tihar, new Date(2026, 10, 8), { start: "2026-11-07", end: "2026-11-12" }), true);
});
test("Server-side construction is safe", () => {
  const fx = createFestiva({ locale: "no", festival: "christmas", mode: "always" });
  fx.mount();
  assert.equal(fx.active, false);
  fx.destroy();
});
