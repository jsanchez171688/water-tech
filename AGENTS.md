# Water Tech Website — Project Instructions

This repository/project is the Water Tech WEBSITE under local development.
It is separate from the Water Tech CRM.

## Water Tech website: UI workflow

For any visible frontend/UI task:

- use the `water-tech-brand-design` skill,
- use `web-animation-design` if animation or interaction motion is involved,
- use `visual-qa` before considering the task complete.

For preview, staging, packaging, deployment preparation, or client handoff:

- use the `staging-handoff` skill.

Project boundaries:

- Do not modify or deploy the Water Tech CRM from this website project.
- Do not deploy to the client's original production domain without explicit authorization.
- The normal lifecycle is local development -> temporary staging/review server -> client approval -> final handoff or authorized production deployment.
- Preserve existing business logic and integrations unless the current task explicitly requires changing them.
- Inspect and use the project's actual stack; do not assume Laravel, React, Next.js, Tailwind, Bootstrap, or any other framework.

## Detected stack (verified on 2026-10-03)

Static website with no framework or build system:

- Pages: top-level `*.html` files (e.g. `index.html`, `categorias.html`, `contacto.html`).
- Styles: `styles.css`, `pages.css`, `home.css`.
- Scripts: `site.js`, `home-motion.js`, `home-ring.js`, `home-wave.js`.
- Assets: `assets/` directory plus top-level images (`logo-watertech.png`, `hero-water-*.jpg`, `favicon.*`).

Repo-scoped Codex skills live in `.codex/skills/`:

- `.codex/skills/water-tech-brand-design/`
- `.codex/skills/web-animation-design/`
- `.codex/skills/visual-qa/`
- `.codex/skills/staging-handoff/`
