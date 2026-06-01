# Polish Method and FAQ Copy

Type: AFK
Status: ready-for-agent

## Parent

`docs/homepage-ui-copy-prd.md`

## What to build

Polish the technical confidence and FAQ sections to match the accepted copy direction. Keep the method section's title and standards-forward framing, use the light green Categoria A badge, and update FAQ wording to use `App de Visualização e Compartilhamento`.

## Acceptance criteria

- [ ] Technical confidence section keeps title `Como garantimos confiança técnica`.
- [ ] Method steps render as a horizontal stepper on desktop and stacked steps on mobile.
- [ ] The `Categoria A em Aerolevantamento pelo Ministério da Defesa` badge uses a light green treatment.
- [ ] The method and FAQ areas keep the accepted light visual direction and do not introduce dark section backgrounds.
- [ ] Method copy stays standards-forward and does not make blanket claims that drone survey is more precise than traditional topography.
- [ ] FAQ answers remain short and practical.
- [ ] FAQ software/access answer uses `App de Visualização e Compartilhamento` terminology.
- [ ] FAQ still covers price, timeline, unsure visitors, software access, approval/auditing, and registered aerolevantamento.

## Test intent

- Behavior: Method proof is visible and standards-forward.
  Public interface: Homepage UI.
  Why this matters: Buyers need confidence that BLK outputs are defensible.
  Evidence: E2E check confirms method title, badge text, step layout, and standards references.
  Refactor-safe because: It verifies visible proof and copy.

- Behavior: FAQ uses the locked app terminology and remains practical.
  Public interface: FAQ accordion/content.
  Why this matters: Old platform wording conflicts with the new public app language.
  Evidence: E2E/content tests confirm FAQ topics and app terminology.
  Refactor-safe because: It tests user-visible FAQ content.

## Commit stack

- Commit 1: Update method and FAQ content. Validation: content-model tests pass.
- Commit 2: Adjust method badge/stepper treatment if needed. Validation: focused homepage E2E check passes.

## Blocked by

None - can start immediately.
