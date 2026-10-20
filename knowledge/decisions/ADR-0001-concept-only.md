# ADR-0001 — Architecture concept only

**Status:** Accepted for documentation; implementation deferred.

## Decision
Document Festiva as a framework-agnostic TypeScript seasonal effects system with zero runtime dependency as a target. Start with Christmas, Halloween and New Year packs, add Norwegian calendar defaults and later environmental experiences. Treat user-facing appearance as unresolved.

## Rationale
The system architecture is promising, but earlier GIFs and Christmas mockups felt artificial. A brand-aware overlay around a real website logo may be better; requires design validation before build.

## Consequences
- No library source code or npm publish until further instruction.
- Store alternatives, requirements, engineering contracts and open design questions in knowledge/.
- Future behavior must respect accessibility, performance and framework independence.