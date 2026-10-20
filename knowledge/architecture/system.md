# System architecture — proposal

## Layering
1. Public framework-neutral TypeScript API.
2. Festival runtime: lifecycle, schedule, presets, event bus.
3. Scene director: timeline and choreography.
4. Behavior planner: context, priorities, reactions and cooldowns.
5. Motion primitives: paths, springs, inertia, collision constraints.
6. Actor/rig engine: hierarchical transforms and secondary movement.
7. Renderers: SVG/DOM for logo-oriented details, Canvas 2D for particles, optional Web Animations API.
8. Web Audio controller: gesture-unlocked sound cues.
9. Performance manager: adaptive quality, visibility, DPR and particle limits.

## Proposed packages
- @festiva/core — runtime, scheduling, motion, actors, behavior, rendering adapters
- @festiva/christmas — logo-aware holiday overlays and restrained festive effects
- @festiva/halloween — reactive seasonal scenes
- @festiva/new-year — celebrations and fireworks
- @festiva/norway — Norwegian calendar defaults, future festivals

Monorepo packages are proposed only. Use strict TS, pnpm workspaces, Vitest, browser-level Playwright tests, Vite playground as development tools; retain zero **runtime** dependencies in core.

## Host integration
Mount into a dedicated overlay layer and anchor decorations to selected DOM elements by their measured bounds. No implicit mutation of a brand logo, no interception of pointer events, no forced re-layout. Observe geometry only when required; cleanly destroy listeners, observers and animation loops. SSR-safe initialization.

## Clock and scheduling
requestAnimationFrame with fixed simulation timestep and interpolation; deterministic seeded randomness for testing. Use timezone-aware calendar boundaries and re-evaluate on tab focus/visibility. Move between inactive/active state at local midnight. Include manual override and reduced-motion policy.

## Open questions
Renderer balance, asset loading/sizes, scene authoring model, licensing, package names, benchmarks, visual direction. All require validation before development.