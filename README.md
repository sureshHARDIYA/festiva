# Festiva

**Early development · not published to NPM**

A zero-runtime-dependency, framework-agnostic TypeScript library that adds lightweight festival decorations around an existing website element such as a logo.

Festiva starts with two regional preset keys:
- `no` — Norway: Christmas, Halloween, New Year, Constitution Day (17. mai)
- `np` — Nepal: Dashain, Tihar, Holi, plus Gregorian New Year

The effects are currently small, restrained **snow, lights, confetti and sparkles**. This is **not yet** the proposed high-end character animation system. The visual direction remains open; more ambitious choreography belongs in future versions.

## Setup and validation

```bash
npm install
npm run check
npm test
npm run build
npm pack --dry-run
```

## Integration

```ts
import { createFestiva } from "festiva";

const fx = createFestiva({
  locale: "no",
  festival: "christmas",
  target: "#site-logo",
  mode: "auto", // "always" to preview any time
  intensity: "subtle"
});

fx.mount();
// Dispose on framework unmount / route teardown:
fx.destroy();
```

For variable-date Nepal festivals, dates must be supplied from a **verified calendar** for the selected year:

```ts
const fx = createFestiva({
  locale: "np",
  festival: "tihar",
  target: "#site-logo",
  dates: {
    start: "YYYY-MM-DD",
    end: "YYYY-MM-DD"
  }
});
```

Replace placeholders with valid Gregorian dates before use. Use `mode: "always"` if you only want a preview and have not supplied dates.

## Current festival registry

| Region | Festival | Default effect | Activation |
|---|---|---|---|
| no | christmas | snow | December 1–26 |
| no | halloween | sparkles | October 20–31 |
| no | new-year | confetti | December 31–January 1 |
| no | constitution-day | confetti | May 17 |
| np | dashain | sparkles | explicit dates |
| np | tihar | lights | explicit dates |
| np | holi | confetti | explicit dates |
| np | new-year | confetti | December 31–January 1, Gregorian |

Note: `no` and `np` are **Festiva region keys**, not formal language tags (such as `nb-NO` or `ne-NP`). A Nepal/Bikram Sambat New Year preset and other festivals are planned for later. Automatic Nepali lunar calendar calculation is not implemented.

## Design principles
- No runtime dependencies; pure TypeScript + browser APIs.
- Does not replace the site's logo or directly modify its content.
- No global CSS injection; small overlay with pointer-events disabled.
- No automatic audio or audio implementation in this initial version.
- Browser local time for fixed-date scheduling; verify dates when using variable calendars.
- Reduced motion respected.
- Framework-neutral lifecycle: `mount()`, `refresh()`, `destroy()`.
- Design knowledge and future architecture proposals in [knowledge/](knowledge/).

**Release plan:** validate on browsers and mobile, approve a visual direction, then release v1 on npm in a separate step. Integrate on skmukhiya.com.np afterward. No NPM publication or website modification has occurred.
