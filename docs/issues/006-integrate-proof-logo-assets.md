# Integrate Proof Logo Assets

Type: HITL
Status: waiting-on-user-assets

## Parent

`docs/homepage-ui-copy-prd.md`

## What to build

Update the compact proof band so named proof items use provided logo assets and URLs when available, while preserving the two proof groups and calm visual treatment. Logo visuals should be normalized to a gray treatment and similar perceived size.

## Acceptance criteria

- [ ] Proof band keeps the two groups: `Credenciais e Associações` and `Clientes e Projetos Atendidos`.
- [ ] A provided logo and URL are used for each proof item when available.
- [ ] Text or fallback visuals are used only when no logo is provided.
- [ ] Logos are normalized to gray and similar perceived size.
- [ ] The section does not add per-logo relationship labels or explanations.
- [ ] The proof band remains compact and does not become a case/proof wall.

## Test intent

- Behavior: Proof items render consistently from mixed asset availability.
  Public interface: Homepage proof band.
  Why this matters: Real logos vary in format, color, and size; the section must stay calm and credible.
  Evidence: E2E or component-level check confirms provided logos render, fallback text appears only when needed, and proof groups remain visible.
  Refactor-safe because: It verifies rendered proof behavior rather than asset-processing internals.

- Behavior: Logo metadata remains explicit.
  Public interface: Homepage content model.
  Why this matters: URLs and logo availability should be auditable and easy to update.
  Evidence: Unit/content tests confirm proof entries support label, URL, and optional logo references.
  Refactor-safe because: It checks the data contract.

## Commit stack

- Commit 1: Add proof metadata support for URLs and optional logos. Validation: content-model tests pass.
- Commit 2: Render normalized proof logos and fallbacks. Validation: focused proof-band E2E check passes.

## Blocked by

User must provide the logo files and URLs to use for proof entries. Other homepage UI/copy issues can proceed independently.
