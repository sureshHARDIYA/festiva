# Motion and behavior engine specification — proposal

Festiva must be **motion-first**, not face-changing or linear image translation. Characters should move through multi-part, context-aware choreography.

## Motion channels
- Locomotion: path following on cubic Bézier curves / spline segments, tangents, momentum and bank angles.
- Articulation: hierarchical joints, procedural poses, phase-dependent gait and secondary response.
- Dynamics: springs, damping, gravity, drag, constrained bounce and settling.
- Environmental: particle trails, wind, snow, rain, glow and firework dynamics.
- Timeline: sequential, parallel, conditional actions, interrupts and reversible exits.

Animation tracks must be composable so a reindeer can gallop, bank, tilt its head and pull a lagging sleigh simultaneously.

## Behavior model
Hierarchical finite-state machines, with an event-driven action selector:
IDLE → ENTER → APPROACH → PERFORM → REACT → RETREAT → EXIT; allow interruption and cooldown.

Actor data:
- position, velocity, target and previous pose
- rig, available locomotion modes and behavior actions
- personality parameters (energy, hesitation, curiosity)
- environment context (viewport, safe anchors, pointer proximity)
- sound cues and timeline events
- guard conditions, transition weights, priorities and cooldowns
- cancellation/disposal and deterministic RNG

## Choreography example
Christmas sleigh enters along a curved path; reindeer gallop, pitch and lean in turns; sleigh trails with harness tension; sleigh decelerates; gift drops and bounces; bells play if audio is unlocked; actors depart with acceleration. This is an engineering *concept*, not an approved visual effect.

## Constraints
Respect reduced motion, background tab pause, blocked-target avoidance, viewport edges, device performance, stable frame timing, and no clickable overlay surfaces by default.

## Verification
Test path continuity, deterministic trajectories, interruption semantics, cancellation, rig composition, response to resize, offscreen culling and zero lifecycle leaks.