# Snowfall and declarative fixtures

Festiva's Christmas snowfall intentionally **does not** include the background image or Santa from the inspiration CodePen. Its drifting flakes are drawn on one Canvas instead of using a separate DOM element per snowflake.

## Explicit API

```ts
import { createSnowfall } from "festiva";
const snow = createSnowfall({
  target: "#site-header",
  density: 0.45,
  speed: 0.8,
  wind: 0.1,
  size: [1, 3],
  opacity: [0.2, 0.7]
});
snow.mount();
// Clean up when component unmounts:
snow.destroy();
```

## Attribute-based fixture

```html
<header data-fes-id="site-header"
        data-fes-effect="snowfall"
        data-fes-density="0.45"
        data-fes-speed="0.8"
        data-fes-wind="0.1">
  <img src="/logo.svg" alt="Company logo">
</header>
```

```ts
import { mountSnowfallFixtures } from "festiva";
const cleanup = mountSnowfallFixtures();
// In a single-page app, call cleanup() before remounting.
```

- `data-fes-id` is a developer-assigned identifier for future selection and diagnostics. It is **not** needed by the snowfall renderer today.
- `data-fes-effect` specifies the effect; `snowfall` is the first implemented fixture.
- Values are clamped at runtime. Canvas scales for device resolution with a 2× DPR cap, and the number of flakes is capped at 240.
- Animation pauses in background tabs, respects reduced-motion preference and removes listeners/Canvas on destroy.
- A single Canvas is efficient for ambient particles. Future logo-specific hats, lights and ornaments should use a separately anchored SVG/DOM overlay.
- This initial API does not yet implement automatic festival scheduling for `mountSnowfallFixtures`; use `createFestiva` scheduling separately or mount fixtures only when appropriate.

**Design proposal (not implemented):** `data-fes-decoration="snow-cap"` for a logo is separate from `data-fes-effect="snowfall"`.

Reference inspiration: https://codepen.io/HanGPIIIErr/pen/LEPVwjp
