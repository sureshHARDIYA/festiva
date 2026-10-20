# ADR-0002: Minimal publishable slice

**Status:** Initial implementation approved as a small first version; no publishing approved.

Implement a framework-independent TS package with `locale: "no" | "np"` preset keys. Ship small overlays (snow, confetti, sparkles, lights), without attempting complex characters, physics, real-time weather or sound yet. Preserve documentation of the larger planned motion engine separately.

Nepali lunar festival dates must be supplied explicitly per year, rather than invented or hardcoded. Support explicit fixed dates in YYYY-MM-DD.

Stage 1: repository implementation and tests. Stage 2: npm release only after review. Stage 3: integrate on skmukhiya.com.np only after npm publication and user approval.

The previous ADR-0001 described the design-exploration-only phase; this ADR authorizes a new limited implementation scope, not a visual-direction sign-off on cinematic effects.
