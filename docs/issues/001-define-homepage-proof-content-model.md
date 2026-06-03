---
title: Define Homepage Proof Content Model
labels:
  - ready-for-agent
---

# Define Homepage Proof Content Model

## Parent

`docs/proof-logo-assets-prd.md`

## What to build

Define the curated **Homepage Proof Content Model** for the **Compact Proof Band** so the approved proof items are represented as static homepage content rather than parsed from temporary intake files.

The content model should preserve the two visible proof groups, include each item's simple public display name, source URL, and optional logo reference, and make text fallback items explicit when no approved logo exists. Items should sort alphabetically inside each proof group. The approved content set is the source of truth; do not add a runtime CSV parser or separate proof register.

## Acceptance criteria

- [ ] The proof content model has exactly two visible groups: **Credenciais e Associações** and **Clientes e Projetos Atendidos**.
- [ ] Each approved proof item has a simple public display name and source URL.
- [ ] Items inside each group are sorted alphabetically by public display name.
- [ ] Items without an approved logo are represented as text fallback proof items.
- [ ] The model does not parse temporary CSV or loose intake assets at runtime.
- [ ] Tests verify the approved content contract without hardcoding an assertion about one removed historical item.

## Test intent

- Behavior: The homepage content model exposes the approved proof groups, sorted display names, source URLs, and text fallback representation.
  Public interface: Content model unit tests.
  Why this matters: The proof band needs a stable source of truth before production assets and UI rendering are added.
  Evidence: `npm run test -- tests/lib/homepage-content.test.ts`
  Refactor-safe because: It verifies the exported content contract rather than component internals or import mechanics.

## Commit stack

- Commit 1: Add the proof item content model and approved proof item data. Validation: `npm run test -- tests/lib/homepage-content.test.ts` shows the existing suite state.
- Commit 2: Add or update content model tests for proof groups, ordering, URLs, and fallback representation. Validation: `npm run test -- tests/lib/homepage-content.test.ts`.

## Blocked by

None - can start immediately.
