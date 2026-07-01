# BLK Aero Design Guide

This is the repo-grounded design guide for the BLK Aero Astro site. Use it when
adding pages, sections, components, or copy so new work stays consistent with
the implemented homepage and with the commercial language in `CONTEXT.md`.

This is not a custom design system that replaces Flowbite. The base system is
Flowbite + Tailwind. This file defines the local rules for composing those
primitives into BLK pages without inventing a second, ambiguous UI language.

Use this file for design intent and implementation recipes. When it disagrees
with live code in `src`, repo task guides in `docs/agents`, or current tests,
trust the live repo first and update this guide as part of the change.

## What Belongs Where

- `DESIGN.md`: visual style, layout, component recipes, page recipes, content
  patterns, interaction guidance, and verification rules.
- `CONTEXT.md`: glossary of BLK website/domain terms only.
- `src/lib/homepage-content.ts`: current homepage content model.
- `src/lib/homepage-clusters.ts`: canonical service-cluster list and routes.
- `src/content/site/global.yaml`: site-wide navigation, footer, contact, and
  metadata content.
- `docs/agents/*`: repository workflow, testing, release, and instruction
  guidance for agents.

If a rule tells agents how to build or lay out UI, put it here. If a rule defines
what a BLK term means, put it in `CONTEXT.md`.

## Repo Baseline and Portable Parts

This guide has two layers:

- **Portable patterns**: using Flowbite as the base system, grounding tokens in
  actual CSS, composing Tailwind section/card/form recipes, keeping static
  content crawlable, and documenting verification.
- **BLK-specific defaults**: brand intent, Astro `BaseLayout`, Lato, the
  gray/white/lime palette, WhatsApp-first contact, geospatial proof, service
  clusters, and homepage copy.

When starting another Flowbite/Tailwind project from this guide, keep the
portable patterns and replace the BLK-specific defaults.

## Design Intent

BLK Aero should feel like a technical, trustworthy geospatial partner that turns
terrain evidence into decisions. The visual language is quiet, structured, and
commercially direct.

- Lead with buyer decisions, deliverables, proof, and contact paths.
- Use technical evidence as support, not as decorative complexity.
- Keep the interface calm: gray/white surfaces, thin borders, restrained lime
  accents, clear hierarchy, and short PT-BR copy.
- Avoid generic brochure pages, equipment-first drone marketing, oversized
  marketing hero sections, and sci-fi/aerospace decoration.

The homepage is an **Authority + Triage Homepage**: it builds trust in BLK Aero
and routes visitors into the right commercial path.

## Technical Stack

- Framework: Astro, static/server-rendered pages.
- Styling: Tailwind CSS v4 through `@tailwindcss/vite`.
- Base UI system: Flowbite CSS/theme/plugin and selected Flowbite ESM behavior.
- Images: local assets imported through Astro `Image` when optimization matters.
- Fonts: self-hosted Lato under `public/fonts/lato`.
- Runtime: minimal client JavaScript, added only for required interactions,
  attribution, consent, and analytics.

Do not add CDN scripts, frontend framework integrations, adapters, or heavy Vite
plugins unless the task explicitly requires it and the runtime allowlist is
updated.

## Flowbite Usage

Flowbite is the base design system. Use it for conventional UI behavior and
primitive structure, then apply BLK styling through Tailwind classes and the
local helpers in `global.css`.

Use Flowbite for:

- Accordion behavior, such as homepage FAQ.
- Collapse behavior, such as mobile navigation.
- Carousel behavior when a carousel is genuinely needed.
- Standard form, button, nav, and card class patterns when they match the local
  visual language.

Do not use Flowbite by:

- Adding CDN imports.
- Copying large Flowbite examples with incompatible colors, shadows, gradients,
  or spacing.
- Introducing dark-mode-only patterns or decorative marketing blocks that do not
  match the current site.
- Duplicating behavior that already exists in a local component.

When a Flowbite example conflicts with this guide, keep the Flowbite behavior but
adapt the presentation to BLK's gray/white/lime system.

## Core Files

Use these before adding new abstractions:

- Layout shell: `src/layouts/BaseLayout.astro`
- Global styles and tokens: `src/styles/global.css`
- Homepage content model: `src/lib/homepage-content.ts`
- Homepage clusters: `src/lib/homepage-clusters.ts`
- Site config: `src/lib/site-config.ts`
- WhatsApp CTAs: `src/components/WhatsAppCTA.astro`
- Final CTA composer: `src/components/HomeFinalWhatsAppComposer.astro`
- Hero carousel: `src/components/HomeHeroShowcase.astro`
- Proof band: `src/components/HomeProofBand.astro`
- Cookie notice: `src/components/SimpleCookieNotice.astro`
- Brand/social icons: `src/components/BrandIcon.astro`

## Design Tokens

The source of truth for implemented tokens is `src/styles/global.css`.

### Typography

The site uses self-hosted **Lato** only.

- `global.css` defines Lato as both `--font-body` and `--font-sans`.
- Self-hosted Lato files currently provide `400` and `700`. Tailwind
  `font-semibold` is used in the UI, but it renders through browser synthesis
  unless a real 600 font file is added.
- Do not introduce Work Sans, JetBrains Mono, external font providers, or a
  second typography system without a deliberate design decision.
- Monospace is allowed only for compact technical labels already expressed that
  way in the UI, such as hero carousel metadata and metric labels.

Typical type scale:

- Hero H1: `text-3xl font-bold leading-tight md:text-5xl`
- Major page H1 outside hero: `text-3xl font-bold leading-tight md:text-4xl`
- Section H2: `text-3xl font-semibold leading-tight text-gray-950`
- Compact card title: `text-base font-semibold leading-snug text-gray-950`
- Standard card title: `text-lg` or `text-xl` with `font-semibold`
- Body copy: `text-base leading-7 text-gray-700`
- Supporting copy: `text-sm leading-6 text-gray-700`
- Eyebrow: `text-sm font-semibold uppercase tracking-wide text-primary-700`
- Small label: `text-xs font-semibold uppercase tracking-wide`

Do not scale font size with viewport width. Keep letter spacing at Tailwind
defaults except for uppercase labels.

### Color

Use Tailwind gray plus the custom primary lime/green scale.

Common primary tokens:

- `primary-50`: `#f7fee7`
- `primary-100`: `#ecfccb`
- `primary-200`: `#d9f99d`
- `primary-600`: `#65a30d`
- `primary-700`: `#4d7c0f`
- `primary-800`: `#3f6212`
- `primary-950`: `#1a2e05`

Core surfaces:

- Page background: `bg-gray-50`
- Standard section/card: `bg-white border border-gray-200`
- Recessed panel/card: `bg-gray-50 border border-gray-200`
- Primary text: `text-gray-950` or `text-gray-900`
- Body/supporting text: `text-gray-700` or `text-gray-600`
- Muted text: `text-gray-500`
- Primary CTA: `bg-primary-700 text-white`, hover/focus `bg-primary-800`
- Secondary CTA: `bg-gray-800 text-white`, hover/focus `bg-gray-900`
- Accent pill: `bg-primary-100 text-primary-950 ring-1 ring-primary-200`
- Final CTA band: `bg-primary-50 border-primary-100`

Use lime/green as emphasis, not as the whole interface. Avoid broad decorative
green gradients and avoid palettes that turn the page into a single hue family.

### Spacing

Use Tailwind's default spacing scale. Local conventions:

- Main shell: `py-8`
- Standard section spacing: `mt-6`
- Final CTA spacing: `mt-10`
- Standard section padding: `p-6 md:p-8`
- Dense panel padding: `p-4 md:p-6`
- Compact card padding: `p-4`
- Standard card padding: `p-5`
- Hero panel padding: `p-6 md:p-8 lg:p-10`
- Full-bleed section padding: `px-4 py-10` or `px-4 py-12 md:py-14`
- Inner full-bleed width: `mx-auto max-w-6xl`

### Radius and Depth

- Small proof/logo controls: `rounded-md`
- Buttons, inputs, cards, media frames: `rounded-lg`
- Major sections: `rounded-xl`
- Status pills and small badges: `rounded-full`

Use borders and tonal layers for hierarchy. Avoid heavy shadows. `shadow-sm` is
reserved for framed software/media previews where the image needs separation
from the page.

## Layout System

`BaseLayout` owns the header, footer, SEO/GTM hooks, cookie notice, and the
`site-main` grid.

The main grid uses:

- Full viewport track for `.full-bleed` sections.
- Centered content track with max width `72rem`.
- Mobile gutters of `1rem`.

Default page structure:

```astro
<BaseLayout title={title} description={description}>
  <section class="surface rounded-xl p-6 md:p-8">
    ...
  </section>

  <section class="full-bleed mt-6 border-y border-gray-200 bg-white px-4 py-10">
    <div class="mx-auto max-w-6xl">
      ...
    </div>
  </section>
</BaseLayout>
```

Use full-bleed sections only when the background band or media surface needs
page-level width. Otherwise stay on the content rail.

## Surface Recipes

### Standard Section

Use for most page sections:

```html
<section class="surface mt-6 rounded-xl p-6 md:p-8">
```

### Recessed Section With Inner Panel

Use when a section needs a framed tool-like area, as the triage section does:

```html
<section class="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 md:p-6">
  <div class="rounded-lg border border-gray-200 bg-white p-6 md:p-8">
```

Only use this when the nested panel has a real structural purpose. Do not stack
decorative cards inside cards.

### Full-Bleed Neutral Band

Use for wide media/proof sections:

```html
<section class="full-bleed mt-6 border-y border-gray-200 bg-white px-4 py-10">
  <div class="mx-auto max-w-6xl">
```

### Full-Bleed CTA Band

Use for conversion-focused composer sections:

```html
<section class="full-bleed mt-10 border-y border-primary-100 bg-primary-50 px-4 py-12 md:py-14">
  <div class="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-center">
```

Do not place a large white card around the whole form.

## Component Recipes

This section is portable as a Flowbite/Tailwind composition baseline, except
where a rule explicitly names BLK, WhatsApp, or existing repo components.

### Buttons

Primary CTA:

```html
class="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold"
```

Secondary CTA:

```html
class="btn-secondary inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold"
```

Rules:

- Use `Falar com especialista` for the primary commercial CTA.
- Use `WhatsAppCTA.astro` for tracked WhatsApp links.
- Include the WhatsApp brand icon for WhatsApp CTAs.
- Keep CTAs concise. Avoid "Chamar no WhatsApp" as hero-level copy.
- Do not put primary buttons on every card if a section-level CTA already owns
  conversion.

### Text Links

Use quiet links for secondary navigation:

```html
class="text-sm font-semibold text-primary-800 hover:underline"
```

Use `Ver detalhes` for card-level detail paths. Include `sr-only` context when
the visible link is repeated.

### Cards

Compact card:

```html
<article class="flex min-h-full flex-col rounded-lg border border-gray-200 bg-gray-50 p-4">
```

Standard card:

```html
<article class="rounded-lg border border-gray-200 bg-gray-50 p-5">
```

Rules:

- Cards are for repeated items, tools, proof snippets, or bounded content.
- Keep headings sized to the card, not hero-scale.
- Use `min-h-full` or fixed aspect ratios where repeated cards need equal
  heights.
- Do not use cards as generic page-section wrappers when a plain section works.

### Tags and Pills

Primary technical tags:

```html
class="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-950 ring-1 ring-primary-200"
```

Neutral portfolio tags:

```html
class="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-700"
```

Rules:

- Use about four tags per deliverable card.
- Keep portfolio tags in Portuguese except for established acronyms.
- Use separate chips instead of slash-combined labels when space allows.
- Borrowed English technical terms may appear when buyer-recognizable;
  `as-built` should be italicized.

### Forms and Inputs

Input/select baseline:

```html
class="mt-2 w-full rounded-lg border border-primary-200 bg-white px-3 py-3 text-sm font-normal text-gray-900 placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100"
```

Rules:

- Label fields visibly.
- Use compact forms for first contact.
- Do not turn the homepage CTA into a long lead form.
- Keep field widths stable across desktop/mobile.

### Accordions

Use Flowbite accordion behavior for FAQ. Presentation should stay minimal:

- Container: border-top and per-item bottom border.
- Button: full-width text-left, `py-5`, `text-base font-semibold`.
- Body: short paragraph, `text-sm leading-6 text-gray-700`.

Do not use heavy boxed accordion cards unless the page context requires it.

### Proof Logo Items

Use the proof-band pattern:

```html
class="inline-flex h-14 min-w-0 items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
```

Rules:

- Prefer approved logo assets from the content model.
- Use text fallback only when no approved public logo exists.
- Keep logos compact and similar in perceived size.
- Link quietly to the public proof source when available.
- Do not turn proof into a large logo wall.

### Media and Image Frames

Use Astro `Image` for local raster assets when responsive sizes, dimensions, or
loading priority matter.

Rules:

- First visible hero image can be `loading="eager"` and `fetchpriority="high"`.
- Below-the-fold images should be lazy-loaded.
- Preserve real app/window context for screenshots.
- Avoid fake decorative chrome, dark presentation frames, or product-tour
  annotations unless a specific page requires them.

## BLK Page Recipes

### BLK Authority + Triage Homepage

Purpose: build trust in BLK Aero and route visitors into the right commercial
path.

Current order:

1. Hero
2. Compact proof
3. Triage cards
4. Deliverables
5. Visualization platform
6. Technical confidence
7. Portfolio
8. FAQ
9. Final CTA

Do not reorder casually. This order supports the persuasion model: promise,
trust, routing, deliverables, visual understanding, method, proof, objections,
conversion.

### Cluster Detail Page

Use for a full-depth service-cluster destination.

Recommended structure:

1. Hero naming the buyer problem and service cluster.
2. Short proof/routing block linking back to the five-cluster system.
3. "When this fits" section with concrete scenarios.
4. Deliverables section using decision-first groups and tags.
5. Method/trust section with standards relevant to that cluster.
6. Portfolio/proof snippets specific to the cluster.
7. FAQ focused on buyer objections for that cluster.
8. Final WhatsApp CTA with selected cluster/objective context.

Rules:

- Do not make cluster pages shallow duplicates of homepage cards.
- Do not turn one cluster into a raw service catalog.
- Keep CTAs section-level and focused on WhatsApp first contact.

### Service Landing Page

Use for one focused BLK offer with specific buyer intent.

Recommended structure:

1. Offer-specific H1 and outcome promise.
2. Who it is for / when to use it.
3. Deliverables and evidence.
4. Method and standards.
5. Proof or example pattern.
6. FAQ.
7. WhatsApp CTA.

Rules:

- Write around the buyer's decision and concrete deliverables.
- Avoid generic capability pages.
- Avoid equipment-first positioning.

### Service + City Page

Use when connecting one service to one active service area.

Rules:

- Add useful local context; do not only swap city names.
- Keep the page crawlable and server-rendered.
- Route to the relevant service/cluster and WhatsApp CTA.
- Avoid doorway-page patterns.

### Searchable Coverage Index

Use for `/cidades` once it becomes a real page.

Rules:

- Keep search lightweight and client-side only if the built index content remains
  crawlable.
- Let users find their city/neighborhood before navigating.
- Avoid heavy search interfaces.

### Blog or Support Index

Use a quiet list/index layout:

- Page H1 and concise intro.
- Simple list or card grid of entries.
- Tags only when they help scanning.
- No oversized marketing hero unless the page is campaign-specific.

### Temporary Support Page

Use only when a route must exist for release safety while the real destination is
out of scope.

Current minimal pattern:

```astro
<BaseLayout title="..." description="...">
  <section class="surface rounded-lg p-6 text-center">
    <h1 class="text-3xl font-bold">Em Construção</h1>
  </section>
</BaseLayout>
```

Do not let temporary pages accumulate into pseudo-content. When the route becomes
important, replace it with the correct page recipe.

## BLK Homepage Section Recipes

### Hero

Canonical promise:

```text
Do terreno real à decisão segura e auditável
```

Canonical subheadline:

```text
A BLK transforma áreas, obras e ativos físicos em mapas, medições, peças técnicas e modelos 3D com rastreabilidade visual para reduzir retrabalho, destravar aprovações e tornar decisões técnicas claras para todos os envolvidos.
```

Rules:

- Combine concise commercial copy with a quiet technical visual.
- Use the right-side service-cluster carousel for the current homepage.
- No arrow controls. Use small dots only.
- Respect reduced motion by disabling auto-cycling when requested.
- Pause on hover/focus and stop after dot click.
- Use real/generated project-evidence imagery from `src/assets/homepage/hero`.
- Keep metrics compact: three small label/value blocks.
- Do not turn the hero into a services grid or a static drone glamour shot.

### Compact Proof Band

Rules:

- Place after hero and before triage cards.
- Group order: `Credenciais e Associações`, then `Clientes e Projetos Atendidos`.
- Use `HomeProofBand.astro`; do not duplicate inline proof markup.
- Source proof items from the homepage proof content model.
- Approved proof logos live under `src/assets/homepage/proof-logos`.
- Use text fallback only when no public logo asset exists.
- Keep proof compact and non-decorative.

### Triage Cards

Section heading:

```text
Escolha a base técnica ideal para o seu projeto
```

Section intro:

```text
Selecione o caminho mais próximo da sua demanda. A BLK ajuda a transformar localização e objetivo em escopo, prazo e entregáveis técnicos.
```

Current clusters:

- `Projeto e Obra`
- `Regularização Rural`
- `Regularização Urbana`
- `Volumetria e Medição`
- `Monitoramento e Inteligência Geográfica`

Rules:

- Keep clusters aligned with `homepageClusters`.
- Cards should summarize buyer outcome, not list every related service.
- Triage cards should not use tags; tags belong in deliverables and portfolio.
- Use one section-level WhatsApp CTA and quiet `Ver detalhes` links.
- Detail paths can lead to temporary pages now and full cluster pages later.

### Deliverables

Eyebrow:

```text
O QUE VOCÊ RECEBE
```

Heading:

```text
Bases técnicas para destravar decisões
```

Current public card labels:

- `Projeto e Obra`
- `Regularização e Aprovação`
- `Medição e Auditoria`
- `Alinhamento Visual`

Rules:

- Show deliverables before method.
- Use decision-first groups, not raw file-format lists.
- Use prose plus about four short tags per card.
- Keep `Planta Ambiental` and `LEPAC` under regularization/approval.
- `MDT` can be used as the homepage-level terrain-model tag without pairing it
  with `MDS`.
- Use `modelo 3D` rather than `maquete 3D` for geospatial delivery examples.

### Visualization Platform

Buyer-facing label:

```text
App de Visualização e Compartilhamento
```

Rules:

- Present the internal client visualization platform publicly with this label.
- Lead with the viewer benefit, not the file repository.
- Explain that stakeholders can inspect orthophotos, point clouds, models,
  evidence, drawings, memorials, and technical files without specialized
  software.
- Use "sem depender de software especializado"; do not imply replacement for
  CAD, GIS, or technical tools.
- Treat the section as proof/differentiation, not as a separate CTA.
- Copy-left and screenshot-right on desktop; stack copy before screenshot on
  mobile.
- Show the real app screenshot cleanly and prominently.
- Avoid download-focused copy such as "baixar arquivos" as a main proof line.
- Do not emphasize the default 20-day access window on the homepage.

### Technical Confidence

Section title:

```text
Como garantimos confiança técnica
```

Rules:

- Explain how BLK earns technical trust.
- Keep method copy tied to buyer decisions.
- Mention GNSS, control points, checkpoints, PEC-PCD, ABNT NBR 13133,
  INCRA/SIGEF, and aerolevantamento rules only where relevant.
- Communicate drone/aerolevantamento advantage as dense detail with validated
  accuracy, not a blanket claim that drone survey is more precise.
- Use `Categoria A em Aerolevantamento` as the public trust-badge wording.
- Use a horizontal stepper on desktop and stacked steps on mobile.

### Portfolio / Proof Snippets

Eyebrow:

```text
PORTFÓLIO
```

Rules:

- Use anonymized cluster proof patterns.
- Keep the intro to a single short sentence.
- Use concrete project patterns rather than generic category labels.
- Show the service-cluster label as a small muted label and the example name as
  the card title.
- Use artifact-shaped skeletons or designed evidence placeholders for the first
  production pass.
- Replace placeholders with curated anonymized real miniatures only after asset
  selection, anonymization, cropping, and client-exposure review.
- Keep cards dimensionally consistent.
- Do not include per-card detail links in the current pass.
- Do not imply named case studies unless public-use permission is clear.
- A named public anchor can appear when BLK is comfortable showing it publicly.

### FAQ

Rules:

- FAQ answers should be short, practical, and buying-focused.
- Avoid price anchors on the homepage.
- Explain that price depends on area, access, deliverables, urgency, and norms.
- Use 5/7/10 days only as an initial timing reference, confirmed after scope.
- Use `App de Visualização e Compartilhamento` wording in the visualization
  answer.
- Explain aerolevantamento registration as a practical risk reducer when formal
  use requires it.

### Final WhatsApp Composer

Heading:

```text
Envie localização e objetivo do projeto
```

Rules:

- Use a compact composer, not a long lead form.
- Fields: `Localização do projeto` and `Objetivo`.
- Location placeholder: `Cidade, bairro, endereço ou link do mapa`.
- Location max length: `300`.
- Objective should be a selector based on buyer objectives, not a raw file-format
  list.
- Include `Ainda não sei, preciso de orientação`.
- Avoid blocking validation in the first pass.
- Desktop: horizontal location, objective, CTA.
- Mobile: stacked controls.
- Use light green full-bleed band, white/near-white controls, darker green
  button.
- Do not wrap the whole composer in a heavy white card.

## BLK Copy Rules

- Write public copy in PT-BR.
- Prefer direct, buyer-facing language over internal taxonomy.
- Name decisions and deliverables before methods and tools.
- Use technical standards confidently but scope them to the service or intended
  use.
- Use `Falar com especialista` for primary commercial CTAs.
- Use `orçamento` carefully; the current contact framing is proposal-led and
  starts by understanding location and objective.
- Keep proof snippets short and anonymized.
- Use exact glossary terms from `CONTEXT.md` for homepage concepts and service
  clusters.
- Prefer "entregas" over "arquivos" when describing the visualization platform
  so it does not read like a download folder.
- Use `PORTFÓLIO`, not `PORTIFOLIO`.

## BLK Assets

- Brand assets: `src/assets/brand`
- Hero assets: `src/assets/homepage/hero`
- Proof logos: `src/assets/homepage/proof-logos`
- Platform screenshot: `src/assets/homepage/platform`
- Self-hosted fonts: `public/fonts/lato`

Asset rules:

- Do not invent logos or imply endorsements.
- Use approved logo/source URLs from the content model.
- Use local optimized assets instead of external image URLs for core page media.
- Keep proof logos visually normalized and compact.
- Avoid dark, blurred, cropped, or atmospheric media when the user needs to
  inspect the actual product, place, output, or proof.

## Accessibility

- Keep semantic headings and section structure.
- Include `sr-only` text where visible labels are repeated or terse.
- Use visible focus states: `focus-visible:outline` or Tailwind focus rings.
- Respect `prefers-reduced-motion` for auto-moving visuals.
- Do not make icon-only controls without accessible labels.
- Keep text readable on all viewport sizes.
- Use fixed dimensions, aspect ratios, or grid tracks for repeated cards,
  media previews, counters, controls, and tool surfaces to avoid layout shift.

## Runtime, Analytics, and Consent Boundaries

- Keep the simple cookie notice.
- Use the Simple Cookie Notice copy defined in `CONTEXT.md`.
- Link the notice's `Política de Privacidade` text to the privacy policy page.
- Keep `OK` as the only notice button label.
- Dismiss the notice only when the visitor clicks `OK`; continued browsing can
  indicate agreement without automatically hiding the notice.
- Keep the privacy policy page in the footer navigation, not the primary nav.
- Use existing GTM, attribution, data-layer, and WhatsApp helpers.
- Do not expose raw UTM/GCLID attribution fields in WhatsApp message text.
- Keep tracking payloads focused on meaningful contact events such as WhatsApp,
  email, and social clicks.
- Use one stable WhatsApp click event name with contextual fields.
- Treat email and social clicks as supporting engagement, not primary
  conversions.
- Reserve lead-capture submit events for actual lead-capture offers.
- New third-party runtime must be justified in
  `docs/agents/public-runtime-allowlist.json` and verified with built-output
  tests.

## Portable Starter Checklist

When reusing this file for a new Flowbite/Tailwind project, replace or remove:

- BLK-specific service clusters.
- BLK-specific hero promise and section copy.
- Proof groups and proof-logo assets.
- WhatsApp-first contact assumptions if the new project uses a different primary
  conversion path.
- Aerolevantamento, PEC-PCD, INCRA/SIGEF, and BLK standards language.
- Local asset paths.

Keep portable:

- Flowbite as base system, local classes as project composition.
- Static/server-rendered content first.
- Token table grounded in actual CSS.
- Section/card/button/form recipes.
- Page-recipe structure, while replacing BLK page types, conversion path, and
  service assumptions.
- Accessibility and runtime boundaries.
- Verification expectations.

## Verification

Follow `docs/agents/testing.md`.

- Docs-only changes: run `git diff --check`.
- For untracked docs, run `git diff --no-index --check /dev/null path/to/file`
  or stage the file before relying on `git diff --check`.
- Page/content changes: run route/content e2e checks, relevant CTA/navigation
  specs, and `npm run build`.
- Crawl/render-sensitive changes: run `npm run test:built`.
- CTA/navigation/hero changes: include relevant Playwright specs for conversion
  flow, navigation WhatsApp behavior, hero showcase, and accessibility.

Do not claim a design or page change is complete without reporting the exact
verification commands and outcomes.
