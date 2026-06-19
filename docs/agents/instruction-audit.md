# Instruction Audit Notes

## Contradictions

- Current 2026-06-19 check: no new unresolved contradictions found between `AGENTS.md`, `docs/agents/*`, `package.json`, `playwright.config.ts`, `DEPLOYMENT.md`, and the active config tests.
- `docs/agents/deployment-release.md` said Cloudflare Pages, while `DEPLOYMENT.md` and `.github/workflows/astro.yml` define GitHub Pages. Kept GitHub Pages because it is the live deployment source of truth.
- Agent docs referenced `docs/runbooks/weekly-rollout-qa.md`, but that file is not present in this checkout. Replaced the reference with a TODO in `docs/agents/repo-workflows.md`.
- `docs/agents/testing.md` referenced non-existent `tests/content/phase1-content-files.test.ts` and removed `scripts/indexnow.mjs` coverage. Replaced the active surface/content inventory guidance with `tests/config/current-surface.test.ts`.

## Essentials Kept in Root

- One-sentence project description.
- Archive read guard for `ARCHIVE.md` and `/Archive`.
- Vanilla Astro, Tailwind v4, and Flowbite implementation boundary.
- Generated-output boundary for `dist` and `.astro`.
- Non-standard build behavior: `npm run build` includes the opt-in IndexNow `postbuild` hook.
- Completion verification requirement.
- Links to task-specific guidance files.

## Flagged for Deletion

- `This file defines how AI coding agents should operate in this repository.` This is redundant with the file name.
- `Scope is technical execution only...` This is useful context but does not need to stay in root once the guides are split.
- `Use rg and rg --files for fast discovery.` This is generally known agent behavior and not repo-specific.
- Repeated Cloudflare and rollout details in root `AGENTS.md`. These now live behind links to source-specific guides.
- `Package manager: npm.` npm is the default package manager and is also discoverable from `package-lock.json`.
- `Before editing, identify impacted files and nearby tests...` This belongs in task routing and testing guidance, not the root essentials.
- `Use npm run check:links only with the local site available...` This belongs in testing guidance, where it is already captured.
- `For local development without installing dependencies on the host machine...` This is useful but not relevant to every task, so it belongs in `docs/agents/testing.md`.
- The detailed Performance Foundation checklist is important for public-page work but not relevant to every task, so it belongs in `docs/agents/repo-workflows.md` rather than root `AGENTS.md`.

## Suggested Structure

```text
docs/
  agents/
    repository-map.md
    testing.md
    repo-workflows.md
    git-workflow.md
    deployment-release.md
    instruction-audit.md
  runbooks/
    TODO: add a rollout QA guide before restoring generated-content workflows
```
