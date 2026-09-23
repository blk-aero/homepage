# Update Triage and Deliverables Copy

Type: AFK
Status: ready-for-agent

## Parent

`docs/homepage-ui-copy-prd.md`

## What to build

Update the homepage triage and deliverables sections so the top-middle page uses buyer-facing routing copy and concrete deliverable tags. This slice should keep the accepted section order, preserve the hero/proof band, and make the triage cards quieter: outcome copy, no tags, one section-level contact CTA, and discrete detail links.

## Acceptance criteria

- [ ] The triage section heading is `Escolha a base técnica ideal para o seu projeto`.
- [ ] The triage intro is `Selecione o caminho mais próximo da sua demanda. A BLK ajuda a transformar localização e objetivo em escopo, prazo e entregáveis técnicos.`
- [ ] Triage cards use short outcome copy, contain no tags, and expose `Ver detalhes` as a discrete secondary link.
- [ ] The deliverables section uses eyebrow `O QUE VOCÊ RECEBE` and heading `Bases técnicas para destravar decisões`.
- [ ] Deliverable card titles are `Projeto e Obra`, `Regularização e Aprovação`, `Medição e Auditoria`, and `Alinhamento Visual`.
- [ ] Deliverable cards show the approved four-tag sets from the PRD, with `as-built` visually distinguished as a borrowed English technical term.
- [ ] The page still keeps WhatsApp-first conversion and the accepted section order.

## Test intent

- Behavior: Triage cards route visitors through outcome copy without becoming a service catalog.
  Public interface: Homepage UI.
  Why this matters: The homepage must stay low-friction and buyer-facing.
  Evidence: Focused E2E check confirms heading, intro, no card tags, discrete detail links, and one prominent contact CTA.
  Refactor-safe because: It verifies user-visible content and actions, not component internals.

- Behavior: Deliverables are decision-first and concrete.
  Public interface: Homepage UI and content model.
  Why this matters: Technical buyers need tangible outputs without a raw file catalog.
  Evidence: Unit/content tests and E2E checks confirm public titles and approved tags.
  Refactor-safe because: It asserts stable content contracts and visible output.

## Commit stack

- Commit 1: Update homepage content model for triage and deliverables. Validation: content-model unit tests fail then pass.
- Commit 2: Update homepage section markup and styling for triage/deliverables. Validation: focused homepage E2E check passes.

## Blocked by

None - can start immediately.
