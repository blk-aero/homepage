# Build Final WhatsApp Composer

Type: AFK
Status: ready-for-agent

## Parent

`docs/homepage-ui-copy-prd.md`

## What to build

Replace the simple final CTA button with the accepted two-field WhatsApp composer. The composer should collect `Localização do projeto` and `Objetivo`, then open WhatsApp with a lightly qualified message while preserving existing attribution behavior.

## Acceptance criteria

- [ ] Final CTA heading is `Envie localização e objetivo do projeto`.
- [ ] Support copy is `Com essas duas informações, a BLK já consegue orientar o escopo inicial e indicar o próximo passo pelo WhatsApp.`
- [ ] The composer has only two fields: `Localização do projeto` and `Objetivo`.
- [ ] `Localização do projeto` accepts up to 300 characters and supports short addresses, city/bairro text, or map links.
- [ ] `Objetivo` is a selector using buyer-objective labels from the PRD and includes `Ainda não sei, preciso de orientação`.
- [ ] The first pass does not add blocking validation.
- [ ] Desktop layout is a compact horizontal composer; mobile stacks controls.
- [ ] The section uses a light green band without placing a large white form card inside it.
- [ ] The section keeps the accepted light visual direction and does not introduce a dark CTA section.
- [ ] WhatsApp opens with the selected/typed context when present and preserves the existing CTA location/attribution behavior.

## Test intent

- Behavior: Visitors can start a qualified WhatsApp conversation without a long lead form.
  Public interface: Homepage UI and WhatsApp URL behavior.
  Why this matters: The CTA must reduce friction while improving first-response routing.
  Evidence: Unit tests verify message generation; E2E checks fill location/objective and confirm the generated WhatsApp URL includes them.
  Refactor-safe because: It tests the public CTA behavior and URL output.

- Behavior: The CTA remains visually integrated.
  Public interface: Desktop and mobile homepage UI.
  Why this matters: The prototype problem was a white card floating inside a green band.
  Evidence: Focused E2E visual/layout checks confirm horizontal desktop layout, stacked mobile layout, and no nested-card treatment.
  Refactor-safe because: It checks user-visible layout properties rather than exact classes.

## Commit stack

- Commit 1: Extend WhatsApp message generation for final composer inputs. Validation: WhatsApp unit tests pass.
- Commit 2: Render final CTA composer and responsive layout. Validation: focused E2E conversion check passes.

## Blocked by

None - can start immediately.
