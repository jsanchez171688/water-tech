---
name: web-animation-design
description: Design and refine purposeful, polished web motion for Water Tech, including hover states, menus, dialogs, accordions, reveals, transitions, loaders, and microinteractions.
---

# Web Animation Design

Use this skill whenever a Water Tech website task includes animation, transitions, motion, hover behavior, dialogs, dropdowns, drawers, accordions, page reveals, or other microinteractions.

## Motion principles

Motion must:
- clarify cause and effect,
- reinforce hierarchy,
- feel responsive,
- avoid delaying the user's task,
- remain subtle enough for a professional business website.

Do not animate simply because an element can be animated.

## Timing guidance

Use short durations for direct manipulation and feedback.
Use slightly longer durations for larger spatial transitions.

Typical starting ranges:
- hover / press feedback: 100–180ms
- small UI transitions: 160–240ms
- menus / popovers / dialogs: 180–280ms
- larger section or drawer motion: 220–350ms

These are starting points, not rigid constants. Match distance and visual weight.

## Easing

For elements entering the interface:
- prefer decelerating/ease-out motion.

For elements leaving:
- prefer faster exits and avoid sluggish ease-in effects.

Avoid dramatic spring/bounce behavior unless specifically requested and appropriate to the brand.

## Scale

Avoid scaling UI from `scale(0)` for ordinary dialogs, cards, or popovers.
For subtle emphasis, prefer values near the final state, such as approximately `scale(0.96)` to `scale(1)` when appropriate.

## Transform and opacity

Prefer performant properties such as:
- transform
- opacity

Avoid animating layout-heavy properties when a transform can achieve the same effect.

## Related motion

Elements that belong to the same interaction should share:
- timing logic
- easing logic
- direction
- spatial relationship

Do not create unrelated motion within a single component.

## Scroll and reveal animations

Use sparingly.
Content should remain understandable and accessible if animation does not run.
Do not hide essential content for long durations.
Do not make every section animate identically.

## Reduced motion

Respect the user's reduced-motion preference.

Where the project supports CSS, include an appropriate `prefers-reduced-motion` strategy for nonessential motion.

Animations must not make navigation or content dependent on motion.

## Interaction quality

Check:
- hover
- active/pressed
- focus
- open
- close
- interrupted transitions
- repeated rapid interaction
- mobile/touch behavior

Avoid double animations produced by conflicting CSS and JavaScript state.

## Definition of done

Before finishing:
1. verify that animation supports the interaction,
2. check that timing feels responsive,
3. confirm no layout jump or flicker,
4. confirm reduced-motion behavior,
5. run the visual-qa skill.
