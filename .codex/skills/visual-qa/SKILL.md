---
name: visual-qa
description: Visually verify Water Tech website changes in a browser before completion, checking responsive layouts, spacing, typography, states, accessibility basics, regressions, and console/build errors.
---

# Water Tech Visual QA

Use this skill after any visible frontend change.

The goal is not only to confirm that code compiles. Confirm that the actual rendered page looks and behaves correctly.

## Workflow

1. Run the project using its existing development workflow.
2. Open the affected page in an available browser/browser automation environment.
3. Inspect the actual rendered result.
4. Compare it against:
   - the user's request,
   - any supplied screenshot/reference,
   - the Water Tech design system,
   - the surrounding pages/components.
5. Fix issues found.
6. Re-run the page and verify again.

Do not declare the UI complete after only reading source code.

## Required viewport checks

Check at least:
- narrow mobile
- standard mobile
- tablet
- desktop

If the change is specifically desktop-only or mobile-only, still check one adjacent breakpoint for regressions.

## Visual checks

Inspect:
- horizontal overflow
- clipping
- text wrapping
- spacing consistency
- section alignment
- button sizing
- icon alignment
- image cropping
- card heights
- navigation behavior
- footer behavior
- empty states
- loading states when available
- modal/dropdown positioning when relevant

## Interaction checks

Test affected controls:
- links
- buttons
- menus
- forms
- accordions
- dialogs
- hover/focus states
- mobile navigation

Do not submit real customer data or trigger destructive actions just to test visuals.

## Technical checks

Confirm:
- no new build errors
- no obvious new runtime errors
- no missing local assets
- no broken routes caused by the change
- no new console errors caused by the edited component when console access is available

## Accessibility baseline

Check:
- meaningful focus indication
- keyboard access for changed interactive controls where practical
- adequate text/background contrast
- alt text behavior for meaningful images
- reduced-motion handling if animation was modified

## Regression discipline

Do not redesign unrelated sections while performing QA.
Fix regressions introduced by the current task.
If an unrelated pre-existing issue is discovered, report it separately rather than silently expanding scope.

## Completion report

When finished, summarize:
- what changed,
- which viewport classes were checked,
- any remaining limitation or item requiring user approval.
