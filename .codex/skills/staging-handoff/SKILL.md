---
name: staging-handoff
description: Prepare the locally developed Water Tech website for a client-review staging server and final handoff without touching the Water Tech CRM or the client's original production domain unless explicitly authorized.
---

# Water Tech Staging and Handoff

Use this skill when preparing the Water Tech website for preview, client review, staging deployment, packaging, or final handoff.

## Project boundary

This skill applies only to the Water Tech WEBSITE.

Never:
- modify the Water Tech CRM,
- deploy to the CRM server,
- assume CRM credentials apply to the website,
- publish to the client's original domain without explicit authorization.

## Intended lifecycle

1. Develop and verify locally.
2. Prepare a staging/preview build.
3. Deploy or package for a temporary review server only when the required server details and authorization are available.
4. Allow client review and collect changes.
5. Apply revisions locally and repeat QA.
6. After explicit approval, prepare the final deliverable or deployment instructions for the client's original domain.
7. Do not alter DNS, nameservers, production hosting, or the original domain unless explicitly requested and authorized.

## Before staging

- identify actual framework/build commands,
- ensure environment-specific secrets are not committed,
- separate development/staging configuration,
- verify asset paths,
- verify base URLs,
- run visual-qa,
- create a rollback-safe artifact or clearly reproducible build.

## Staging rules

A staging site must not accidentally:
- index in search engines when privacy is required,
- send real transactional email unless intended,
- submit production forms to unintended endpoints,
- expose secrets or debug data,
- use production credentials without explicit authorization.

Where appropriate, configure staging protections such as noindex or access control.

## Final handoff

Once the client approves:
- document build/runtime requirements,
- document required environment variables without including secret values,
- document deployment steps,
- identify generated/build directories,
- list external services/integrations,
- include a final QA checklist,
- keep a clean copy of the approved source.

Do not claim the website is live on the original domain unless deployment has actually been performed and verified.
