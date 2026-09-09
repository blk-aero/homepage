# Add Portfólio Proof Section

Type: AFK
Status: ready-for-agent

## Parent

`docs/homepage-ui-copy-prd.md`

## What to build

Replace the generic lower proof snippets with the accepted `PORTFÓLIO` section. The section should show five project-pattern cards with cluster labels, project-style titles, short descriptions, tags, and artifact-shaped Flowbite-style skeleton placeholders.

## Acceptance criteria

- [ ] Section eyebrow is `PORTFÓLIO`.
- [ ] Section heading is `Exemplos de projeto e evidência entregue`.
- [ ] Intro sentence is `Uma amostra dos tipos de entrega que a BLK organiza para projeto, regularização, medição e gestão territorial.`
- [ ] Five cards render with the exact cluster labels, titles, descriptions, and tags from the PRD.
- [ ] Cards show the service-cluster label as a small muted label and the project-style example name as the card title.
- [ ] Cards use artifact-shaped skeleton placeholders rather than generic image placeholders.
- [ ] Cards keep consistent dimensions while varying the skeleton rhythm by artifact type.
- [ ] Cards do not include per-card detail links in this pass.

## Test intent

- Behavior: Portfolio examples feel concrete without requiring real thumbnails.
  Public interface: Homepage UI.
  Why this matters: The first production pass needs credible proof while real artifacts are not yet curated.
  Evidence: E2E check confirms all five cards, skeleton placeholders, tags, descriptions, and no per-card detail links.
  Refactor-safe because: It verifies rendered proof content and actions.

- Behavior: Portfolio data stays centralized and stable.
  Public interface: Homepage content model.
  Why this matters: Future thumbnails can replace placeholders without rewriting page structure.
  Evidence: Unit/content tests confirm the five card data objects and tag sets.
  Refactor-safe because: It checks the public content contract rather than markup implementation.

## Commit stack

- Commit 1: Add portfolio content model. Validation: content-model unit tests pass.
- Commit 2: Render portfolio cards with skeleton placeholders. Validation: focused homepage E2E check passes.

## Blocked by

None - can start immediately.
