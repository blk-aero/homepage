# Homepage UI and Copy Production Integration PRD

## Problem Statement

The homepage implementation still reads like an early PRD scaffold in several middle and lower sections. The accepted prototype direction is clearer: a light Variant A layout, buyer-facing copy, tangible deliverable tags, an explicit app visualization differentiator, a portfolio section with proof-shaped placeholders, and a final WhatsApp composer that qualifies the first contact without becoming a long form.

The current page needs to absorb those decisions into production while preserving the existing hero, navigation, footer, Flowbite/Astro constraints, and WhatsApp-first conversion path.

## Solution

Integrate the accepted homepage UI/copy direction into the production homepage. Keep the overall information architecture fixed: hero, compact proof band, triage cards, deliverables, app visualization and sharing section, technical confidence, portfolio, FAQ, and final CTA.

The page should feel less like a generic service grid and more like a buyer-facing BLK homepage: visitors choose the right technical base, understand what they receive, see how deliverables are visualized and shared, inspect representative project patterns, and start a qualified WhatsApp conversation with only location and objective.

## User Stories

1. As a visitor with a project need, I want to quickly choose the type of technical base I need, so that I can understand where BLK fits without reading a full service catalog.
2. As a visitor who is unsure which service name applies, I want triage cards written around outcomes, so that I can recognize my situation from plain project language.
3. As a visitor who wants more detail, I want each triage card to expose a quiet "Ver detalhes" link, so that I can inspect scope without losing the main WhatsApp path.
4. As a visitor ready to talk, I want one prominent CTA near the triage cards, so that I know the preferred next step is to contact BLK.
5. As a technical buyer, I want deliverable groups named around decisions, so that I can connect BLK outputs to project, approval, measurement, and alignment needs.
6. As a technical buyer, I want deliverable tags such as DXF, LEPAC, MDT, and volumetria, so that the page feels concrete rather than abstract.
7. As a buyer comparing providers, I want to understand that BLK delivers more than loose files, so that the app visualization and sharing differentiator is clear.
8. As a non-technical stakeholder, I want to know that project outputs can be viewed and shared without depending on specialized software, so that I can participate in review and decisions.
9. As a visitor, I want the app section to show a real app screenshot, so that the differentiator feels credible and not like a vague portal claim.
10. As a visitor, I want the app section to focus on viewing and sharing the project, so that I do not mistake BLK for a standalone software product.
11. As a buyer needing confidence, I want the method section to explain capture, validation, standards, and delivery, so that I understand why BLK outputs are defensible.
12. As a formal-use buyer, I want to see the Categoria A aerolevantamento credential near the method section, so that I understand the compliance relevance.
13. As a visitor seeking proof, I want a portfolio section with concrete project-style examples, so that I can see representative evidence without needing full case studies.
14. As a visitor, I want portfolio examples to include short descriptions and tags, so that I can scan the kind of work BLK delivers.
15. As a visitor, I want portfolio visuals to reserve space for future artifacts without looking broken, so that the section feels intentional in the first production pass.
16. As a visitor, I want FAQ answers to be short and practical, so that pricing, timing, uncertainty, software access, approval/auditing, and aerolevantamento questions are answered before contact.
17. As a visitor ready to contact BLK, I want the final CTA to ask only for location and objective, so that starting a WhatsApp conversation is low-friction.
18. As a visitor with a map link, I want the location field to accept a pasted URL, so that I do not have to retype address details.
19. As a visitor who is unsure what to choose, I want the objective selector to include an explicit orientation option, so that I can still start the conversation.
20. As BLK, I want the final WhatsApp message to include location and objective when available, so that the first response can route the lead more effectively.

## Implementation Decisions

- Keep the accepted Variant A section order and do not reopen the page concept.
- Preserve the current hero, navigation, footer, compact proof group names, and low-friction WhatsApp-first strategy.
- Keep the middle and lower homepage sections light; do not introduce dark backgrounds in these sections.
- Do not leave prototype-only code, variant switchers, prototype markers, or dev-only prototype behavior in the production homepage.
- Keep the site vanilla Astro + Tailwind v4 + Flowbite. Prefer installed Flowbite ESM/CSS integration and Flowbite-style components such as skeletons and accordion behavior over framework adapters, CDN scripts, or heavy custom JavaScript.
- Triage section:
  - Heading: "Escolha a base técnica ideal para o seu projeto".
  - Intro: "Selecione o caminho mais próximo da sua demanda. A BLK ajuda a transformar localização e objetivo em escopo, prazo e entregáveis técnicos."
  - Cards use outcome copy, no tags, no heavy per-card CTA.
  - Card detail paths use a discrete "Ver detalhes" link.
- Deliverables section:
  - Eyebrow: "O QUE VOCÊ RECEBE".
  - Heading: "Bases técnicas para destravar decisões".
  - Public card titles: "Projeto e Obra", "Regularização e Aprovação", "Medição e Auditoria", "Alinhamento Visual".
  - Tags:
    - Projeto e Obra: DXF, curvas de nível, levantamento planialtimétrico, as-built.
    - Regularização e Aprovação: memorial, LEPAC, perímetro, planta ambiental.
    - Medição e Auditoria: volumetria, corte / aterro, comparativos, relatório.
    - Alinhamento Visual: ortofoto, nuvem de pontos, modelo 3D, MDT.
  - English borrowed technical terms such as "as-built" should be visually distinguished, for example italicized.
- App section:
  - Public term: "App de Visualização e Compartilhamento".
  - Eyebrow names the app; headline names the action/outcome.
  - Suggested headline: "Visualize e compartilhe o projeto sem depender de software especializado".
  - Body clarifies deliverables such as ortofotos, nuvens de pontos, modelos 3D, plantas, memoriais, and technical files.
  - Present as part of the BLK delivery experience, not as a standalone SaaS/product CTA.
  - Use copy-left and screenshot-right on desktop; stack copy before screenshot on mobile.
  - Use the provided real app screenshot cleanly and prominently, without callouts, annotations, heavy shadow, dark presentation, or fake decorative chrome.
  - Use white/neutral background with restrained green accents.
  - Do not use download-focused copy in this section.
- Technical confidence section:
  - Keep title "Como garantimos confiança técnica".
  - Use horizontal stepper on desktop and stacked steps on mobile.
  - Keep standards-forward copy.
  - Use a light green "Categoria A em Aerolevantamento pelo Ministério da Defesa" badge.
- Portfolio section:
  - Eyebrow: "PORTFÓLIO".
  - Heading: "Exemplos de projeto e evidência entregue".
  - Intro: "Uma amostra dos tipos de entrega que a BLK organiza para projeto, regularização, medição e gestão territorial."
  - Cards show small muted cluster label, project-style title, short description, tags, and an artifact-shaped skeleton visual placeholder.
  - Keep consistent card dimensions, but vary the internal skeleton rhythm by artifact type.
  - Do not add per-card detail links in this pass.
  - Cards:
    - Projeto e Obra / Terreno em Condomínio / "Base técnica para projeto arquitetônico e alinhamento visual antes de obra ou implantação." / topografia, modelo 3D, curvas de nível.
    - Regularização Rural / Parcelamento em Chácaras / "Organização de perímetro, peças técnicas e bases para regularização rural e análise documental." / INCRA/SIGEF, CAR, plantas, memoriais.
    - Regularização Urbana / REURB-E / "Base cadastral e ambiental para reduzir exigências e apoiar aprovação urbana." / LEPAC, planta ambiental, planta de perímetro.
    - Volumetria e Medição / Viabilidade de Platô para Galpões / "Simulações de terraplenagem para comparar cenários e apoiar decisão de compra." / simulação de cenários, movimentação de terra, decisão de compra.
    - Monitoramento e Inteligência Geográfica / Aterro Sanitário de São José dos Campos / "Série visual e métrica para acompanhar capacidade, tendência de uso e gestão do ativo." / previsão, ritmo de uso, gestão de ativo.
- FAQ section:
  - Keep short, practical answers.
  - Update the software/access answer to use "App de Visualização e Compartilhamento" terminology instead of older platform wording.
- Final CTA:
  - Keep form-style WhatsApp composer, not a single button.
  - Use only two fields: "Localização do projeto" and "Objetivo".
  - "Localização do projeto" allows up to 300 characters and can accept city, neighborhood, address, or map link.
  - "Objetivo" is a selector based on BLK business objectives and includes "Ainda não sei, preciso de orientação".
  - Do not add blocking validation in the first pass.
  - Desktop layout is a compact horizontal composer; mobile stacks controls.
  - Use a light green band for emphasis, but do not place a large white card inside it.
  - Heading: "Envie localização e objetivo do projeto".
  - Support copy: "Com essas duas informações, a BLK já consegue orientar o escopo inicial e indicar o próximo passo pelo WhatsApp."
- Proof band:
  - Keep two groups: "Credenciais e Associações" and "Clientes e Projetos Atendidos".
  - Use provided logo and URL when available.
  - Use text or fallback visual only when no logo is provided.
  - Normalize logos to gray and similar perceived size.
  - Do not add per-logo explanations in this pass.

## Testing Decisions

- Good tests should verify visible behavior, content contracts, routing, and conversion behavior rather than implementation details or class names.
- Update homepage content-model tests to assert the new section order names, triage heading/intro, deliverables tags, app terminology, portfolio card data, FAQ terminology, and final CTA options.
- Update end-to-end homepage tests to verify:
  - The accepted section order remains intact.
  - Triage cards show outcome copy, no tags, and discrete detail links.
  - Deliverables show the four public group titles and selected tags.
  - The app section appears after deliverables, uses the new public terminology, and includes the real screenshot.
  - Portfolio cards render skeleton placeholders, labels, titles, descriptions, and tags without per-card detail links.
  - FAQ uses the new app wording.
  - Final CTA renders two fields, a compact desktop layout, a stacked mobile layout, and generates WhatsApp contact with location/objective when present.
  - The production homepage contains no prototype markers or variant switcher behavior.
- Extend existing WhatsApp/attribution tests if needed so the final CTA composer preserves the current attribution behavior and ctaLocation semantics.
- Use existing accessibility smoke coverage and add assertions where practical for form labels, select labels, button names, and accordion semantics.
- Run `git diff --check`, unit tests, build, and focused homepage E2E checks before claiming completion. Run the full E2E suite when browser dependencies are available.

## Out of Scope

- Reworking the hero carousel concept.
- Building full cluster detail pages beyond existing temporary support/detail routes.
- Creating real portfolio thumbnails or replacing skeleton placeholders with project artifacts.
- Building case-study pages or adding per-card portfolio detail links.
- Adding a service matcher, calculator, pricing estimator, or long lead form.
- Adding CRM/API submission, Pipedrive, Pipedream, or lead-magnet capture flows.
- Changing deployment, adapters, analytics architecture, or the vanilla Astro + Tailwind v4 + Flowbite stack.
- Reintroducing archived generated service/city/blog/case/offer workflows.

## Further Notes

- Respect the repo rule: do not read `ARCHIVE.md` or `/Archive` unless explicitly asked.
- Use the current domain glossary as the copy source of truth.
- Preserve unrelated local changes and keep edits scoped to homepage UI/copy production integration.
- Some proof logos and URLs will be supplied separately by the user; implementation should support provided logo assets and fallback text/visuals.
