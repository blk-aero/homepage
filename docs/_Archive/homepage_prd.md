# Implement Authority + Triage Homepage

## Problem Statement

BLK Aero's current homepage does not yet match the agreed commercial direction for the business. It still behaves like an early marketing page: a single hero, a small set of service cards, a simple ACONVAP proof strip, and a lead-magnet CTA. That structure does not explain BLK's broader value clearly enough, does not route visitors through the five accepted commercial paths, and does not make the client visualization platform, technical confidence method, or served-client proof visible enough.

The business needs the homepage to act as an **Authority + Triage Homepage**. A visitor should quickly understand that BLK turns real terrain and physical assets into auditable geospatial bases, visual evidence, maps, measurements, technical documents, and 3D outputs that support decisions. The page must minimize first-contact friction by using **WhatsApp First Contact** while still giving researching visitors a clear **Detail Path** into the relevant service cluster.

The homepage must also make BLK's outputs feel understandable to non-technical stakeholders. The value is not only technical accuracy; it is **Accessible Visual Evidence** that helps engineering, legal, management, clients, and other decision-makers see the same situation without needing heavy technical software.

## Solution

Build a new homepage implementation around the settled homepage PRD direction:

- Use the canonical **Homepage Hero Promise**: "Do terreno real à decisão segura e auditável".
- Use the canonical **Homepage Hero Subheadline**: "A BLK transforma áreas, obras e ativos físicos em mapas, medições, peças técnicas e modelos 3D com rastreabilidade visual para reduzir retrabalho, destravar aprovações e tornar decisões técnicas claras para todos os envolvidos."
- Use **Falar com especialista** as the primary **Primary Specialist CTA**, with a WhatsApp icon/logo to make the channel explicit.
- Use a **Hero Service Cluster Carousel** based on the selected prototype direction, **Variant F - Carousel sem setas**.
- Place a **Compact Proof Band** immediately after the hero, split into **Credenciais e Associações** and **Clientes e Projetos Atendidos**.
- Replace the current three-card service section with five **Homepage Triage Cards**:
  1. **Projeto e Obra**
  2. **Regularização Rural**
  3. **Regularização Urbana**
  4. **Volumetria e Medição**
  5. **Monitoramento e Inteligência Geográfica**
- Use **Card-Based Matching** for this phase instead of a separate matcher form or calculator.
- Show **Decision-First Deliverable Groups** before explaining the method.
- Highlight the **Client Visualization Platform** as a standard delivery differentiator, without emphasizing the 20-day access window on the homepage.
- Add the **Technical Confidence Method** section titled "Como garantimos confiança técnica".
- Show **Anonymized Cluster Proof** snippets grounded in real BLK work patterns.
- Add a short **Hiring Objection FAQ** before the final WhatsApp CTA.

The homepage should remain compatible with the current Astro, Tailwind, and Flowbite direction. The implementation should use the repo's existing static-site architecture and avoid introducing a heavy frontend framework.

## User Stories

1. As a property owner, I want to understand what BLK does within the first screen, so that I can decide whether the company can help with my terrain or property problem.
2. As an engineering buyer, I want to see that BLK produces auditable geospatial bases, so that I can trust the outputs for project decisions.
3. As a non-technical decision-maker, I want the homepage to explain outputs visually and plainly, so that I can understand the value without knowing GIS or CAD software.
4. As a visitor ready to talk, I want a clear "Falar com especialista" button, so that I can contact BLK without filling out a form.
5. As a mobile visitor, I want the primary WhatsApp CTA visible and usable without layout friction, so that I can start a conversation quickly.
6. As a visitor from an ad, I want the page to preserve my campaign attribution when I open WhatsApp, so that BLK can understand how I arrived.
7. As a BLK commercial operator, I want WhatsApp messages to ask for location, area/perimeter, objective, deadline, and desired deliverable, so that the first reply can be more useful.
8. As a BLK commercial operator, I want CTA clicks to include page path, CTA location, cluster, and attribution fields, so that I can segment conversion behavior.
9. As a visitor who does not know which service to request, I want five clear service-cluster cards, so that I can recognize the closest problem area.
10. As a visitor interested in project or construction support, I want a **Projeto e Obra** path, so that topography, as-built, architecture, engineering, and BIM-adjacent needs feel covered.
11. As a rural-property visitor, I want a **Regularização Rural** path, so that INCRA, SIGEF, CAR, and rural documentation needs feel covered.
12. As an urban-regularization visitor, I want a **Regularização Urbana** path, so that REURB, loteamentos, cadastro técnico, and municipal approval needs feel covered.
13. As a buyer dealing with volumes or measurements, I want a **Volumetria e Medição** path, so that earthwork, stockpile, recurring measurement, and contractual evidence needs feel covered.
14. As a strategic or advanced-use visitor, I want a **Monitoramento e Inteligência Geográfica** path, so that environmental, energy, agro, inspection, due-diligence, and digital-twin needs feel covered.
15. As a visitor who wants more information before contacting BLK, I want a "Ver detalhes" action on each triage card, so that I can inspect the relevant cluster later.
16. As a visitor in the hero, I want the right-side visual to cycle through the five clusters, so that I can understand BLK's breadth without reading a full service grid.
17. As a mobile visitor, I want the hero carousel to avoid arrow controls, so that the first viewport stays clean and uncluttered.
18. As a keyboard user, I want carousel dot controls to be focusable and labeled, so that I can operate the carousel without a mouse.
19. As a visitor who clicks a carousel dot, I want the carousel to stop auto-cycling afterward, so that my manual choice is respected.
20. As a visitor hovering or focusing the carousel, I want motion to pause, so that I can read the selected cluster without distraction.
21. As a visitor with reduced-motion preferences, I want the carousel not to auto-cycle, so that the page respects my system preference without adding extra UI.
22. As a business owner evaluating credibility, I want to see credentials and memberships near the top, so that BLK feels legitimate before I inspect services.
23. As a buyer evaluating proof, I want to see organizations and projects BLK has served, so that I can trust the company has practical experience.
24. As a homepage reader, I want proof logos/names to be grouped simply, so that the page does not become cluttered with relationship labels.
25. As a reviewer of the site, I want proof-band logos normalized visually, so that mixed file formats, colors, and proportions do not make the page look improvised.
26. As a buyer, I want to understand what deliverables I receive before reading the method, so that the offer maps to my decision.
27. As a project buyer, I want to see **Base para Projeto e Obra**, so that I understand BLK can support design, architecture, engineering, and construction work.
28. As a regularization buyer, I want to see **Base para Regularização e Aprovação**, so that I understand BLK can support legal, cadastral, rural, urban, and municipal processes.
29. As a buyer responsible for payments or quantities, I want to see **Base para Medição e Auditoria**, so that I understand BLK can support measurable and defensible volume decisions.
30. As a non-technical stakeholder, I want to see **Base Visual para Alinhamento**, so that I understand the outputs can align people who do not use technical software.
31. As a client without heavy GIS/CAD hardware, I want to know BLK provides a visualization platform, so that I can inspect orthoimages, point clouds, 3D models, and evidence without installing specialized tools.
32. As a project manager, I want deliverables to be organized in one visual environment, so that engineering, legal, management, and contractors can discuss the same evidence.
33. As a technical buyer, I want the method section to mention GNSS, control points, checkpoints, PEC-PCD, standards, and aerolevantamento discipline, so that the work feels defensible.
34. As a buyer who needs formal use, I want to see **Categoria A em Aerolevantamento pelo Ministério da Defesa**, so that I know BLK understands formal aerolevantamento requirements.
35. As a skeptical buyer, I want drone-topography claims framed as dense detail with validated accuracy, so that the homepage sounds credible rather than exaggerated.
36. As a visitor comparing providers, I want the homepage to explain "mais detalhe, menos interpolação", so that the drone-based value is clear without overclaiming.
37. As a visitor near final contact, I want short proof snippets by cluster, so that I can connect BLK's service paths to real project patterns.
38. As a visitor with pricing concerns, I want the FAQ to explain that cost depends on area, access, deliverables, urgency, and required norms, so that I understand why a generic price anchor is not shown.
39. As a visitor with timeline concerns, I want the FAQ to give a short 5/7/10-day reference range, so that I have an initial expectation before scope confirmation.
40. As a visitor unsure what to request, I want the FAQ to say I can send location and objective first, so that uncertainty does not block contact.
41. As a visitor without technical software, I want the FAQ to confirm I can understand outputs through BLK's visualization platform, so that I am not intimidated by technical file formats.
42. As a visitor needing approval or audit support, I want the FAQ to explain that delivery depends on scope, norms, and the required body, so that expectations are realistic.
43. As a visitor evaluating drone topography, I want the FAQ to explain Ministry of Defense registration for formal use, so that I understand why registered aerolevantamento matters.
44. As a site maintainer, I want homepage content to be centralized in a stable content model, so that copy and card data can be adjusted without editing scattered markup.
45. As a site maintainer, I want carousel state handled by a small testable behavior module, so that timing, pause, focus, reduced motion, and dot-click behavior do not regress.
46. As a site maintainer, I want WhatsApp message building handled by a small testable module, so that CTA variants can share consistent attribution and message formatting.
47. As a site maintainer, I want proof items represented as structured data, so that credentials and client/project proof can remain grouped without hard-coded repetition.
48. As a QA reviewer, I want mobile and desktop tests for the homepage layout, so that hero, CTA, proof, cards, platform, method, FAQ, and final CTA remain visible and usable.
49. As a QA reviewer, I want tests that verify WhatsApp prefill and `whatsapp_click` payloads, so that conversion tracking is not assumed from visual CTA presence alone.
50. As a release reviewer, I want the homepage implementation to pass build, targeted e2e tests, and accessibility smoke checks, so that the new homepage is safe to review.

## Implementation Decisions

- Build the homepage as an **Authority + Triage Homepage**, not as a single-service landing page and not as a full service catalog.
- Keep the implementation in Astro with Tailwind/Flowbite-compatible markup. Do not introduce a frontend framework for this homepage.
- Replace the current homepage composition with a sectioned homepage that renders hero, compact proof, triage cards, deliverables, platform, technical confidence, proof snippets, FAQ, and final CTA in that exact order.
- Use a centralized homepage content model for hero copy, carousel slides, proof groups, triage cards, deliverable groups, platform copy, method steps, proof snippets, FAQ entries, and CTA metadata. This should behave as a deep module because it gives the page a stable content contract and keeps section components simple.
- Use the canonical hero H1 and subheadline from the glossary. Do not substitute a generic topography, drone, or georreferenciamento headline.
- Use **Falar com especialista** as the primary CTA label. The WhatsApp icon/logo carries the channel information; do not use "Chamar no WhatsApp" as the primary homepage copy.
- The hero visual uses the selected prototype direction, **Variant F - Carousel sem setas**: a quiet right-side cluster carousel with dot indicators only.
- The production hero carousel contains five slides matching the five homepage service clusters. Each slide has an image, short tag, title, explanation, compact metrics, alt text, and one dot indicator.
- The hero carousel must auto-cycle every `2000ms` for normal users, pause on hover and focus, stop auto-cycling after any dot click, and disable auto-cycle when `prefers-reduced-motion` is active.
- The hero carousel must not include visible previous/next arrow controls and must not add a visible pause/play control unless later accessibility testing proves it necessary.
- The prototype behavior is useful as visual reference, but production must follow the settled behavior where a dot click stops auto-cycling instead of restarting the timer.
- Extract carousel behavior behind a small interface that can be tested independently from markup. The behavior must distinguish automatic advancement, temporary pause, manual dot selection, and reduced-motion initialization.
- Use **Card-Based Matching** on the homepage. A separate ServiceMatcher, calculator, wizard, or lead form is out of scope for this PRD.
- Each **Homepage Triage Card** has a concise title, service examples, a primary WhatsApp CTA, and a secondary **Ver detalhes** link.
- The primary card action is WhatsApp-first. The secondary card action is the **Detail Path** for users who need more context before contact.
- The five **Detail Path** URLs are part of the route contract, but the full **Cluster Detail Page** implementations are out of scope for this PRD. The homepage must not ship to production with broken detail links; release sequencing must account for the separate cluster-page PRD.
- The **Compact Proof Band** appears directly after the hero and before the triage cards.
- The proof band uses two visual groups only: **Credenciais e Associações** and **Clientes e Projetos Atendidos**.
- The proof band does not show per-logo relationship labels in the UI. Relationship distinctions can exist in data, but the public homepage should stay visually simple.
- Proof-band assets should use normalized monochrome site-ready logos or text fallbacks. Mixed source logos should not be used directly in the homepage component.
- The accepted credential group includes ACONVAP, Enredes, Ministério da Defesa, CREA-SP, and BR-UTM/DECEA.
- The accepted client/project group includes SN Saneamento, Sabesp, Construtora Oliveira Roxo, Sahyoun Properties, Polimix Ambiental, Six Engenharia, Macaw Studio, Sergio Porto, Montante, URBAM, and SJC Mobilidade.
- The deliverables section must use **Decision-First Deliverable Groups** rather than a raw file-format list.
- The four deliverable groups are **Base para Projeto e Obra**, **Base para Regularização e Aprovação**, **Base para Medição e Auditoria**, and **Base Visual para Alinhamento**.
- The **Client Visualization Platform** is a distinct homepage differentiator after deliverables. It is not one of the deliverable groups.
- The homepage should say that orthoimages, point clouds, 3D models, and evidence are organized in a visualization platform for stakeholders who do not have specialized software or hardware.
- Do not mention the default 20-day visualization access window on the homepage. That detail exists in the domain model but is not buyer-relevant on this surface.
- The **Technical Confidence Method** section title is "Como garantimos confiança técnica".
- The method section has five steps: understand the decision, plan capture, capture with traceability, process and validate, deliver according to norms and final use.
- Technical confidence copy must name checkpoints, PEC-PCD, ABNT NBR 13133, INCRA/SIGEF, Ministério da Defesa/SisCLATEN, and aerolevantamento rules where they strengthen trust.
- Public copy should avoid repeated "quando aplicavel" language. Scope standards through the service, use case, approval body, or final use instead.
- Add a light trust badge near the method section using the wording **Categoria A em Aerolevantamento pelo Ministério da Defesa** and link it to the official aerolevantamento page.
- Frame drone topography as **Dense Detail with Validated Accuracy**. Do not claim globally that drone survey is more precise than traditional topography.
- Include the precision copy direction: "Mais detalhe, menos interpolação" with accuracy validated by aerial capture, GNSS, control points, checkpoints, and PEC-PCD.
- Use **Anonymized Cluster Proof** snippets on the homepage. Do not turn the homepage snippets into named case studies.
- Ground proof snippets in the accepted real project patterns for Terras Alpha, Fazenda Itamirim, Colinas de São José, Jambeiro near Tamoios, and the São José dos Campos landfill, but write them as short anonymized proof cards.
- Keep FAQ answers short, usually two to four sentences.
- Keep homepage pricing generic. Do not add starting-price anchors.
- Use the 5/7/10-day delivery range as an initial reference, confirmed after scope.
- Include the FAQ explanation that aerolevantamento and drone-topography products should come from a registered entity so they can support formal technical and legal use.
- Extend the WhatsApp message builder so homepage CTAs can include location, approximate area/perimeter, objective, desired deadline, desired deliverable/output type, selected cluster, CTA location, and attribution.
- Extend attribution handling so first-touch UTM and `gclid` values are preserved unless explicitly absent. The current behavior needs adjustment because current query params can overwrite stored values.
- `whatsapp_click` events must include page path, CTA location, selected cluster when relevant, and available attribution fields.
- The homepage should preserve existing baseline metadata and static rendering behavior. Full SEO/AEO schema expansion is out of scope for this PRD, except for not blocking a later schema PRD.

## Testing Decisions

- Tests should verify external behavior that users, crawlers, or analytics observers can see. Do not test class names, component internals, or implementation-only state unless the state is exposed as a user behavior.
- Unit test the WhatsApp message builder. It should prove that homepage payloads include the lightly qualified fields, selected cluster, CTA location where appropriate, and attribution fields in the final WhatsApp URL.
- Unit test attribution preservation. It should prove first-touch UTM and `gclid` values are kept across navigation and are not overwritten by later empty or unrelated query values.
- Unit test the carousel behavior module if carousel state is extracted. Good tests should prove initial slide selection, timed auto-advance, pause on hover/focus, no auto-start under reduced motion, and permanent stop after dot click.
- E2E test the homepage hero. Prior art exists in the current homepage hero test, but it should be rewritten for the new behavior: canonical H1/subheadline, WhatsApp primary CTA, right-side carousel, dot controls, no arrows, and compact proof immediately below the hero.
- E2E test the five triage cards. The test should prove each accepted cluster appears, each card has **Falar com especialista**, each card has **Ver detalhes**, and card-specific WhatsApp links include the selected cluster context.
- E2E test the page order. It should prove hero, compact proof, triage cards, deliverables, visualization platform, method, proof snippets, FAQ, and final CTA appear in the required sequence.
- E2E test the proof band. It should prove both **Credenciais e Associações** and **Clientes e Projetos Atendidos** are visible, and that the accepted organizations are represented without per-item relationship labels.
- E2E test the carousel interaction. It should prove auto-cycle changes slides, hover/focus pause prevents advancement, dot click selects a slide and stops future auto-cycle, and reduced-motion mode disables auto-cycle.
- E2E test WhatsApp conversion behavior. Prior art exists in the conversion-flow test; extend it to prove homepage CTAs preserve first-touch attribution and add homepage-specific payload fields.
- E2E accessibility smoke should cover the homepage after the new sections land. It should verify visible headings, actionable CTAs, focusable dot controls, useful accessible names, and no obvious keyboard trap.
- Build verification remains required after implementation because the homepage imports image assets and Astro image handling can fail at build time.
- Recommended validation commands for this PRD:
  - `npm run test -- tests/lib/whatsapp.test.ts tests/lib/attribution.test.ts`
  - `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`
  - `npm run test:e2e -- tests/e2e/conversion-flow.spec.ts`
  - `npm run test:e2e -- tests/e2e/accessibility-smoke.spec.ts`
  - `npm run build`

## Out of Scope

- Full **Cluster Detail Page** content and implementation for the five **Detail Path** routes. Those pages need their own PRD and must be full-depth, not placeholders.
- A separate ServiceMatcher, quick calculator, wizard, or form-first matching flow.
- Lead magnet and offer-system work, including dynamic offer routes, forms, lead capture, and lead-magnet analytics.
- Full SEO/AEO schema expansion, including complete Organization graph depth, `FAQPage` strategy across the site, `ProfilePage`, `ImageObject`, `dateModified`, `speakable`, and `llms.txt`.
- Bulk city-generation workflows and city/service rollout content quality rules.
- Full deployment and release QA. Deployment remains governed by the deployment document after implementation is ready.
- Long named case studies. The homepage uses short anonymized proof snippets; named case studies belong on dedicated case or cluster pages.
- A public explanation of the standard 20-day platform access window.
- Legal cleanup around proof relationships. The homepage may use the accepted simple grouping because permission has already been handled by the business.

## Further Notes

- This PRD was produced from the settled grill-with-docs session and the current repository state on 2026-05-26.
- The current homepage implementation is partial and should not be treated as the source of truth for the new homepage.
- The accepted homepage order is: hero, compact proof band, five triage cards, decision-first deliverables, client visualization platform, technical confidence method, anonymized proof snippets, hiring-objection FAQ, and final CTA.
- The selected hero prototype is **Variant F - Carousel sem setas**. The prototype worktree is a reference for visual structure and assets, but production behavior must follow this PRD.
- The prototype asset set includes five cluster visuals for Projeto e Obra, Regularização Rural, Regularização Urbana, Volumetria e Medição, and Monitoramento e Inteligência Geográfica.
- The homepage-specific asset handles are:
  - source proof logos
  - normalized monochrome proof logos
  - source platform screenshots
  - site-ready platform screenshots
- The homepage can be implemented before cluster detail pages, but it should not be released publicly with broken **Ver detalhes** links.
- The issue tracker label required for implementation handoff is `ready-for-agent`.
