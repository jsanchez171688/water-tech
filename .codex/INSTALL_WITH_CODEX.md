# Install these Water Tech skills with Codex

Copy the `.codex` folder into the ROOT of the local Water Tech website project.

Then merge the contents of `AGENTS_WATER_TECH_SNIPPET.md` into the project's existing `AGENTS.md`.
If `AGENTS.md` does not exist, Codex may create one containing that section.

## Recommended prompt for Codex

Use this prompt from the Water Tech website project:

> We are configuring Codex for the Water Tech WEBSITE project, not the Water Tech CRM.
>
> Inspect this local project first and identify its real frontend/build stack. Do not assume Laravel or any framework.
>
> Install and validate the repo-scoped skills under `.codex/skills/`:
> - `water-tech-brand-design`
> - `web-animation-design`
> - `visual-qa`
> - `staging-handoff`
>
> Merge the Water Tech instructions from `AGENTS_WATER_TECH_SNIPPET.md` into the existing `AGENTS.md` without deleting or weakening existing project instructions.
>
> Then inspect the current site and populate `.codex/skills/water-tech-brand-design/references/brand-guidelines-template.md` only with brand information that can be verified from existing project assets/styles. Do not invent brand colors, fonts, phone numbers, addresses, claims, or content.
>
> Do not redesign the website in this task. Do not modify the Water Tech CRM. Do not deploy anything.
>
> Finally, report:
> 1. the stack you detected,
> 2. the skill paths installed,
> 3. the existing brand tokens/assets you found,
> 4. any conflicts or missing information,
> 5. whether the skills are ready for future UI tasks.

## After installation

For a normal design request, you can tell Codex:

> Improve this section of the Water Tech website. Use the Water Tech brand skill, use the animation skill where appropriate, and run visual QA before finishing. Preserve content and functionality unless I explicitly ask for changes.

For staging later:

> Prepare the approved Water Tech website for a temporary staging/review server using the staging-handoff skill. Do not touch the original domain or the Water Tech CRM.
