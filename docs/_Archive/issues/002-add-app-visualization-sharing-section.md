# Add App de Visualização e Compartilhamento Section

Type: AFK
Status: ready-for-agent

## Parent

`docs/homepage-ui-copy-prd.md`

## What to build

Replace the current generic visualization platform treatment with the accepted `App de Visualização e Compartilhamento` section. The section should explain the delivery benefit, show the real app screenshot cleanly, and make clear that the app helps clients view and share project outputs without depending on specialized software.

## Acceptance criteria

- [ ] The section uses the public term `App de Visualização e Compartilhamento`.
- [ ] The headline communicates the action/outcome: visualizing and sharing the project without depending on specialized software.
- [ ] Body copy mentions concrete delivery outputs such as ortofotos, nuvens de pontos, modelos 3D, plantas, memoriais, or technical files.
- [ ] The real app screenshot is displayed prominently and cleanly without product-tour callouts, annotations, dark presentation, or fake decorative chrome.
- [ ] Desktop layout places copy left and screenshot right; mobile stacks copy before screenshot.
- [ ] The section has a neutral/white background with restrained green accents.
- [ ] The section does not include a local CTA or download-focused copy.
- [ ] No prototype-only variant switcher, prototype marker, or dev-only behavior is introduced into the production homepage.

## Test intent

- Behavior: The app section reads as a delivery differentiator rather than a standalone software product.
  Public interface: Homepage UI.
  Why this matters: The section must clarify BLK's value without shifting the offer to SaaS.
  Evidence: E2E check confirms terminology, screenshot presence, no download-focused CTA, and placement after deliverables.
  Refactor-safe because: It tests visible messaging and page order.

- Behavior: The screenshot is available in the production build.
  Public interface: Built homepage asset output.
  Why this matters: Missing or broken media would undermine the differentiator.
  Evidence: Build succeeds and E2E confirms the image is visible.
  Refactor-safe because: It validates the rendered page rather than import details.

- Behavior: Production remains free of prototype scaffolding.
  Public interface: Built homepage output.
  Why this matters: The prototype was a learning artifact, not production behavior.
  Evidence: Build output/search confirms no prototype markers or variant switcher behavior.
  Refactor-safe because: It validates shipped output.

## Commit stack

- Commit 1: Add app section content and asset integration. Validation: build succeeds.
- Commit 2: Implement responsive app section UI. Validation: focused desktop/mobile E2E checks pass.

## Blocked by

None - can start immediately.
