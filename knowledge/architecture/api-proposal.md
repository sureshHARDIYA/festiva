# Public API proposal (not implemented)

```ts
import { createFestiva } from "@festiva/core";
import { christmas } from "@festiva/christmas";

const festiva = createFestiva({
  festival: christmas,
  schedule: { mode: "auto", timezone: "Europe/Oslo" },
  quality: "auto",
  audio: { enabled: false },
  interactions: {
    pointer: true,
    anchors: ["#site-logo"]
  }
});
festiva.mount(document.body);
festiva.on("scene:completed", ({ sceneId }) => console.log(sceneId));
// festiva.destroy() on unmount.
```

Desired: plain JS compatible, React/Vue/Svelte/Angular integration without runtime framework dependency; typed lifecycle and events; explicit host-element selection; customizable date ranges, motion intensity and sound; SSR-safe access to document/window.

**This is illustrative API design only. No implementation or npm publication approved.**