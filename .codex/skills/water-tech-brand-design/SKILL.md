---
name: water-tech-brand-design
description: Apply and preserve the Water Tech website visual system when creating or modifying UI, layouts, sections, components, responsive behavior, and frontend styling.
---

# Water Tech Brand Design

Use this skill for any task that changes the visible Water Tech website.

## Scope

This skill is for the Water Tech WEBSITE project being developed locally.
It is NOT for the Water Tech CRM.
Do not assume the website is Laravel. Inspect the project and use its actual stack.

## First step: inspect before editing

Before changing UI:

1. Identify the frontend stack and build system.
2. Identify the page/component being modified.
3. Inspect existing global styles, design tokens, typography, spacing, buttons, cards, forms, navigation, and breakpoints.
4. Locate existing Water Tech logos and brand assets.
5. Reuse the current design language where it is deliberate and consistent.
6. Do not replace working architecture or dependencies simply to make a visual change.

## Visual direction

Aim for a clean, modern, premium, trustworthy B2B website.

Priorities:
- clear hierarchy
- generous but controlled whitespace
- strong readability
- polished cards and sections
- consistent border radii
- restrained shadows
- clear calls to action
- professional imagery
- excellent mobile behavior
- consistent spacing rhythm
- coherent iconography

Avoid:
- generic AI-looking gradients used without purpose
- excessive glow effects
- oversized headings that break mobile layouts
- random colors
- inconsistent button styles
- decorative elements that compete with content
- unnecessary carousels
- excessive rounded containers
- long text blocks without hierarchy
- visual changes that alter business logic

## Brand preservation

Treat existing approved brand assets as authoritative.

- Do not redraw or alter the logo unless explicitly requested.
- Preserve existing brand colors unless the task explicitly authorizes a redesign.
- If there are multiple inconsistent colors or font definitions, consolidate them carefully rather than inventing a new identity.
- Never fabricate contact data, certifications, client names, addresses, metrics, testimonials, or claims.
- Keep existing website copy unless the user asks for copy changes.

## Layout rules

- Build from a consistent max-width container.
- Use a predictable spacing scale.
- Align section edges.
- Maintain consistent horizontal padding across sections.
- Keep readable line lengths.
- Avoid layout shifts.
- Preserve semantic HTML where possible.
- Prefer reusable components/classes over one-off inline fixes.

## Responsive rules

Validate at minimum:
- mobile narrow viewport
- common mobile viewport
- tablet
- laptop
- wide desktop

At every breakpoint:
- no horizontal overflow
- no clipped text
- no overlapping elements
- buttons remain tappable
- navigation remains usable
- media preserves sensible aspect ratios
- typography scales appropriately
- content order remains logical

## Implementation rules

- Make the smallest coherent change that achieves the requested result.
- Follow the project's existing component and CSS conventions.
- Do not introduce a new framework unless explicitly requested.
- Do not change backend logic, database behavior, APIs, forms, or integrations unless the task requires it.
- Preserve accessibility labels and semantics.
- Add or retain visible focus states for interactive elements.
- Prefer CSS variables/design tokens if the project already uses them.

## Definition of done

A UI task is not complete until:
1. the requested change is implemented,
2. the page builds/runs without new errors,
3. the result is visually coherent with the rest of Water Tech,
4. responsive behavior is checked,
5. visual-qa has been applied.
