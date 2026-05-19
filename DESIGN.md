# BLK Design System

Agent-first brand guidance for BLK Aerolevantamento. Use this file before creating or editing pages, sections, visual assets, prompts, CTAs, navigation, proof blocks, or service content in this repository.

This file is an operating manual first and a brand-book source second. It should be strict enough for agents to produce consistent pages without inventing a new visual direction.

## How To Use This File

This file is the canonical design and page-generation guide for this project. It must contain enough business, UI, logo, and image-generation direction for an agent to create BLK pages without opening local files outside the repository.

Project dependencies and references:
- Flowbite `^4.0.1`, used for light-theme component patterns: https://flowbite.com/docs/customize/theming/
- Flowbite color guidance: https://flowbite.com/docs/customize/colors/
- Tailwind CSS `^4.1.18`, used as the native utility system: https://tailwindcss.com/docs

Repo-owned brand assets:
- Canonical square logo: `src/assets/brand/logo_square_color_fulltext_aero_nobackground.svg`
- Navigation logo: `src/assets/brand/logo_inline_grey_fulltext_aero_nobackground.svg`
- Favicon: `src/assets/brand/favicon.png`
- Static/public logo copies: `static/images/logos/`

If this file conflicts with older design notes or page drafts, follow this file.

## Brand Positioning

BLK turns real terrain and physical assets into auditable maps, technical documents, and 3D as-is models using drones, GNSS, field control points, and geographic intelligence.

Mission:
- Deliver an auditable geospatial base that reduces technical and financial risk in construction, regularization, environmental, infrastructure, and investment decisions.
- Combine fast drone capture with GNSS/control-point validation, processing discipline, and clear technical deliverables.

Core promise:
- BLK sells auditable decisions, not just files.
- Every page should connect field capture to reduced risk, reduced rework, faster engineering/legal/financial decisions, and traceable evidence.

Value proposition:
- Method: drone plus conventional survey control to avoid relying on interpolated terrain.
- Result: high-fidelity deliverables with typical 3-5 cm precision when scope, field conditions, and control support it.
- Business value: less rework, faster schedules, clearer approvals, stronger technical records, and better investment decisions.

Default message:
- Terrain to decision.
- Evidence to confidence.
- Real-world capture, QC, and documentation for decisions that need to hold up.

Primary operating regions:
- State of Sao Paulo
- southern Minas Gerais
- southern Rio de Janeiro

Outside core regions, prioritize higher-ticket, recurring, or high-value consulting work.

Primary proof points:
- drone capture plus GNSS/control points
- typical precision of 3-5 cm when scope supports it
- QC reports, memorials, CAD/GIS files, orthomosaics, point clouds, models, and repeatable evidence
- traceability for legal, engineering, construction, environmental, and financial workflows

Preferred business language:
- decision auditavel
- base geoespacial auditavel
- reducao de risco
- reducao de retrabalho
- aceleracao de cronograma
- rastreabilidade
- controle de qualidade
- evidencia tecnica
- single source of truth

Avoid:
- "just drone footage"
- "beautiful aerial images"
- vague innovation claims
- flashy technology language without concrete deliverables
- treating maps as decoration

## Audience And Offers

Build pages for B2B buyers who need evidence, speed, and accountability.

Main offer clusters:
- Topographic survey for architecture, engineering, construction, and approvals.
- Volumetry for viability, earthwork control, recurring audits, and disputes.
- Rural georeferencing, regularization, CAR, INCRA/SIGEF support, and rural engineering.
- REURB cadastral and municipal approval support.
- Environmental and ESG monitoring, hydrology, protected areas, MRV evidence, and licensing support.
- Energy and infrastructure inspection, including solar and transmission assets.
- Asset due diligence for banks, insurers, funds, real estate, and M&A.
- 3D/as-built capture, point clouds, scan-to-BIM, and digital twins.
- Recurring monitoring products with history, alerts, comparison, governance, and SLA logic.

Product principle:
- Minimum point project: files plus memorial plus QC.
- Higher-value consulting project: alternatives, simulations, recommendations, and impact narrative.
- Recurring product: history, alerts, comparisons, and source-of-truth governance.

Common deliverables:
- orthophoto/orthomosaic
- MDT/MDS when applicable
- contour lines and terrain sections
- CAD/GIS files such as DXF and GeoPackage
- point clouds such as LAS/LAZ/E57
- technical report, memorial, QC report, and measurement tables
- comparison surfaces, volumes, timelines, and validation snapshots

Buying information to request in CTAs:
- location
- approximate area or perimeter
- project objective
- desired deadline
- required deliverables or approval body
- recurrence needs, if monitoring is involved

Page copy should make the economic/legal/technical decision clear:
- problem
- method
- deliverable
- proof
- CTA

## UI System

Use Flowbite light theme patterns and Tailwind CSS utilities as natively as possible. Do not invent a bespoke component language unless the existing repo needs it.

Default UI direction:
- light, clean, technical B2B interface
- Flowbite-compatible buttons, cards, badges, forms, nav, accordions, tables, alerts, and modals
- Tailwind utility classes over custom CSS
- restrained borders, clear hierarchy, compact sections, high readability

Do:
- use `bg-white`, `bg-gray-50`, `border-gray-200`, `text-gray-900`
- use `text-gray-500` and `text-gray-600` for secondary text
- use `bg-lime-700 text-white` for primary CTAs
- use `hover:bg-lime-800` for primary CTA hover
- use `bg-lime-100 text-lime-900` for soft accents, chips, and validation cues
- use `border-lime-700`, `ring-lime-300`, and `text-lime-700` for focus, selected states, and measured highlights
- use Flowbite/Tailwind spacing and rounded utilities such as `rounded-lg`, `p-6`, `gap-6`, `max-w-7xl`, `mx-auto`
- keep UI colors tied to Tailwind names, not custom hex values

Avoid:
- custom olive palettes from older brand drafts for UI components
- decorative gradients as the main visual system
- neon green floods
- dark-first dashboard styling unless the specific page requires it
- one-off arbitrary color values such as `#476800`
- UI styles that cannot be expressed with normal Tailwind/Flowbite conventions

### Color Contract

Primary UI color:
- Tailwind/Flowbite lime
- default CTA: `bg-lime-700 text-white`
- hover: `hover:bg-lime-800`
- soft accent: `bg-lime-100 text-lime-900`
- subtle line/focus: `border-lime-700`, `ring-lime-300`, `text-lime-700`

Neutral structure:
- page background: `bg-gray-50`
- cards/panels: `bg-white border border-gray-200`
- main text: `text-gray-900`
- supporting text: `text-gray-600`
- metadata: `text-gray-500`
- dividers: `border-gray-200`

Logo colors are fixed:
- logo charcoal: `#434343`
- logo lime: `#39ff14`

Use logo lime only for the logo and occasional visual-measurement marks in generated imagery. Do not make the whole UI use `#39ff14`.

### Typography Contract

Use Lato across body and headings.

Do:
- load Lato weights needed by the page
- use Lato for `body`, headings, labels, cards, CTAs, and navigation
- use Tailwind font size and weight utilities for hierarchy
- use compact, direct headings
- use monospace only for coordinates, dimensions, timestamps, QC values, numeric tables, file formats, and measurement readouts

Avoid:
- Inter as the default UI font
- decorative or editorial type
- negative letter spacing
- viewport-scaled font sizing

Recommended hierarchy:
- Hero H1: `text-3xl md:text-5xl font-bold leading-tight`
- Section H2: `text-2xl md:text-3xl font-bold`
- Card title: `text-base md:text-lg font-semibold`
- Body: `text-base leading-7`
- Metadata/labels: `text-xs font-semibold uppercase tracking-wide text-gray-500`
- Numeric data: `font-mono text-sm`

Current repo note:
- Existing CSS may still use Poppins for headings. Future work should update or override that to Lato when implementing this design system.

## Logo Usage

Use the SVG logo as the canonical source. Preserve its geometry, colors, proportions, clear space, and square outer frame.

Repo asset roles:
- `src/assets/brand/logo_square_color_fulltext_aero_nobackground.svg`: canonical square mark for brand anchors, compact layouts, and logo-reference checks.
- `src/assets/brand/logo_inline_grey_fulltext_aero_nobackground.svg`: navigation/header mark.
- `src/assets/brand/favicon.png`: favicon and touch icon.
- `static/images/logos/`: public/static copies when a page or config needs a path from `static/images`.

Do:
- use the canonical SVG when possible
- keep logo charcoal and lime unchanged
- place logo on white or very light neutral backgrounds
- preserve clear space around the mark
- use the square logo for compact brand anchors and favicon-like placements
- use inline logo variants for navigation when available

Do not:
- recolor the logo
- rotate, skew, stretch, outline, or add shadows/effects
- crop the square mark
- place logo on noisy photo backgrounds
- use the logo lime as a broad background wash
- recreate the logo with live text

## Layout Principles

Layouts should feel like technical documents, GIS portals, validation reports, and engineering annexes adapted for conversion-focused web pages.

Do:
- keep sections full-width with constrained inner content
- use clear grids and predictable card layouts
- make hero sections immediately explain problem, method, deliverable, and CTA
- place proof near CTA: precision, deliverables, QC, timeline, or client/partner proof
- use technical metadata blocks for coordinates, accuracy, area, volume, dates, and deliverables
- keep card corners restrained: `rounded-lg` or less unless existing Flowbite component requires otherwise
- keep dense data scannable with tables, definition lists, badges, and compact panels

Avoid:
- marketing-only hero sections with no concrete deliverable
- nested cards inside cards
- oversized decorative cards
- split layouts where the visual is generic decoration
- abstract SaaS illustrations unrelated to survey/geospatial evidence

## Component Rules

Buttons:
- Primary: `inline-flex items-center justify-center rounded-lg bg-lime-700 px-5 py-3 text-sm font-semibold text-white hover:bg-lime-800 focus:outline-none focus:ring-4 focus:ring-lime-300`
- Secondary: `inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200`
- Ghost: `inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100`

Cards and panels:
- `bg-white border border-gray-200 rounded-lg`
- use light shadows only when Flowbite component patterns already use them
- prefer borders and spacing over heavy shadow

Badges:
- Evidence/QC/selected: `bg-lime-100 text-lime-900`
- Neutral metadata: `bg-gray-100 text-gray-700`
- Warning/error only when there is a real semantic state

Tables:
- use light headers, borders, and compact text
- use monospace for numeric measurement columns
- avoid zebra stripes unless needed for dense data

Forms:
- Flowbite/Tailwind defaults
- focus states use lime ring/border
- label text must be explicit and concise

## Image-Making System

### Why Image Drift Happens

The old design notes describe the desired direction but do not force generator behavior. Words like "illustration", "sketch", "drone", "technical", and "modern" can produce stock vector art, drone photos, generic 3D renders, cartoon sketches, or soft SaaS illustrations.

Agents must treat BLK visuals as production assets with a contract, not as decorative image prompts.

### Visual Definition

BLK visuals use forensic geospatial drafting.

The style combines:
- topographic contour mapping
- monochrome point-cloud reconstruction
- architectural and engineering drawing logic
- survey annotation marks
- cartographic layout structure
- grid overlays and registration marks
- measurement labels and QC cues

The result should feel:
- measured
- precise
- technical
- calm
- auditable
- evidence-first

It should not feel:
- playful
- decorative
- painterly
- cinematic
- sci-fi
- generic SaaS
- stock-photo-led

### Default Asset Workflow

When a page needs a new visual:

1. Identify the image role: hero, service card, report/proposal, social cover, proof image, or UI mockup.
2. Pick the matching service archetype from this file.
3. Use the matching prompt template exactly, replacing only bracketed placeholders.
4. Include the shared negative prompt.
5. Reject the output unless it passes the checklist below.
6. Save with a descriptive slug if the asset becomes a repo image.

Default method:
- AI-generated raster visual with strict prompt and negative prompt.

Exception:
- Use SVG/CSS for simple icons, line marks, small technical glyphs, and UI-only primitives.

### Mandatory Visual Ingredients

Every major BLK visual must include at least four of these:
- thin charcoal/gray linework
- contour lines
- sparse point-cloud dots
- survey grid
- crosshair or registration mark
- coordinate label
- scale bar
- north arrow
- dimension line
- polygon boundary with nodes
- section cut
- QC/validation mark
- subtle lime measurement cue

Every service card visual must include:
- one dominant spatial form
- one support layer such as contour, grid, or point field
- one validation cue such as a marker, node, polygon, or annotation
- minimal lime accent only when useful

### Forbidden Outputs

Reject visuals that look like:
- stock drone photography
- generic drone silhouette art
- undraw-style vector illustration
- cartoon, comic, or playful sketch
- pencil/charcoal hand drawing
- painterly texture
- glossy 3D render
- futuristic sci-fi HUD
- colorful heatmap decoration without real data meaning
- gradient blob background
- generic construction stock art
- lush landscape wallpaper
- decorative satellite imagery with no annotation

### Shared Negative Prompt

Use this with all generated raster visuals:

```text
Avoid stock photography, generic drone photo, cartoon illustration, undraw vector style, playful icon set, painterly sketch, pencil shading, watercolor, glossy 3D render, cinematic lighting, sci-fi HUD, neon glow, colorful gradient blobs, decorative bokeh, generic SaaS illustration, people posing, smiling workers, oversized drone, photoreal landscape wallpaper, heavy shadows, saturated color fills, cluttered composition, illegible labels.
```

## Prompt Templates

### Hero Visual Prompt

```text
Create a wide hero visual for BLK Aerolevantamento, a B2B geospatial survey company that turns real terrain and physical assets into auditable maps, technical documents, and 3D as-is evidence.

Subject: [service or page topic].
Visual style: forensic geospatial drafting, technical survey report, GIS validation sheet, monochrome point-cloud terrain reconstruction, clean engineering annex.
Composition: light Flowbite-style interface background, mostly white and light gray, thin charcoal contour lines, sparse point-cloud dots forming terrain or asset geometry, subtle grid overlay, crosshair registration marks, scale bar, coordinate labels, small QC/validation mark, minimal lime accent only on measurement or validation cues.
Mood: precise, calm, auditable, technical, decision-ready.
Typography in image: minimal, small, technical labels only; no large marketing slogans inside the image.
Color: mostly monochrome charcoal/gray/white with restrained lime measurement accents.
Output: polished professional raster image suitable for a website hero, not a generic illustration.

[Add service-specific archetype details here.]

Negative prompt: [paste shared negative prompt]
```

### Service Category Card Prompt

```text
Create a compact service category visual for BLK Aerolevantamento.

Service: [service name].
Visual style: forensic geospatial drafting, technical linework, monochrome cartographic/engineering graphic.
Composition: one dominant spatial form, one support layer, one validation cue.
Required ingredients: [choose from contour lines, point-cloud dots, cadastral polygon, grid, crosshair, coordinate labels, scale bar, dimension lines, QC mark].
Color: white/light gray background, charcoal linework, very small lime accent on selected node or validation mark.
No people, no decorative drone, no stock photo, no generic flat illustration.
Output: clean rectangular visual that can sit inside a Flowbite card.

Negative prompt: [paste shared negative prompt]
```

### Report Or Proposal Visual Prompt

```text
Create a technical report/proposal visual for BLK Aerolevantamento.

Document type: [technical proposal, topographic survey report, QC annex, volumetry report, asset due diligence sheet].
Visual style: clean Flowbite-like document layout plus forensic geospatial drafting.
Composition: white page or dashboard surface, thin gray borders, Lato-like neutral typography, small metadata blocks, coordinate labels, measurement table, map/terrain panel, QC status badge, minimal lime accent for validated or selected state.
Imagery: include a monochrome point-cloud/contour/asset-outline panel that looks derived from measured field data.
Mood: audit-ready, professional, quiet, precise.
Do not make a marketing brochure or glossy sales deck.

Negative prompt: [paste shared negative prompt]
```

### Social Or Cover Prompt

```text
Create a vertical social/proposal cover visual for BLK Aerolevantamento.

Topic: [topic].
Visual style: technical geospatial evidence, monochrome drafting, point-cloud reconstruction, survey annotations.
Composition: strong but minimal cover, white/light gray technical background, charcoal title area, one measured terrain/asset graphic, coordinate or scale cue, small lime validation accent.
Mood: data that builds confidence, from terrain to decision.
Keep copy minimal and legible. Avoid busy backgrounds.

Negative prompt: [paste shared negative prompt]
```

## Service Visual Archetypes

Topographic survey:
- contour terrain, elevation profile, sparse point cloud, benchmark marker, scale/elevation labels
- use for: levantamento topografico, planialtimetrico, architecture/engineering base

Volumetry:
- cut/fill terrain sections, stockpile outline, before/after surface comparison, volume labels, section lines
- use for: terraplenagem, earthwork, stockpile, audit, viability

Rural regularization:
- parcel polygon, perimeter nodes, coordinate labels, north arrow, boundary lines, legal/technical sheet logic
- use for: georreferenciamento, INCRA/SIGEF, CAR, rural property

REURB:
- cadastral grid, lot boundaries, street alignment, blocks, parcel IDs, validation nodes
- use for: urban regularization, LEPAC, municipal approval support

Construction monitoring:
- simplified site massing, phase overlays, timeline marks, progress comparison, QC status
- use for: recurring site monitoring, measurement validation, bank/investor evidence

Environmental/ESG:
- monitored zones, protected boundaries, terrain contours, drainage lines, vegetation clusters, MRV comparison marks
- use for: licensing, APP, hydrology, ESG, carbon evidence

Energy/infrastructure:
- corridor line, towers/panels simplified as measured assets, inspection markers, anomaly points, georeferenced asset inventory
- use for: solar, transmission, linear infrastructure

Asset due diligence:
- asset outline, measured perimeter, condition markers, verification stamps, dimensions, location evidence
- use for: banks, insurers, funds, M&A, guarantees

3D/as-built:
- point-cloud massing, facade/terrain slice, orthographic view, LOD note, scan-to-BIM cue
- use for: as-is documentation, point clouds, digital twins, BIM-ready deliverables

Platform/portal:
- GIS dashboard, map panel, project list, QC status, timeline comparison, reports, export controls
- use for: SaaS/portal/source-of-truth visuals

## Page Generation Rules

Before building or editing a page, decide:
- target audience
- service or offer
- decision being supported
- proof needed near CTA
- image role and visual archetype
- exact CTA

Every service page should answer:
- What risk or decision is this solving?
- What method makes the result trustworthy?
- What does BLK deliver?
- What proof supports the claim?
- What should the user send next?

Recommended page structure:
- Hero: H1, short BLUF, primary CTA, proof metric/deliverable, service-specific technical visual.
- Problem: concrete buyer pain, not generic market copy.
- Method: drone + GNSS/control points + processing/QC.
- Deliverables: files, reports, maps, models, memorials, timelines.
- Proof: precision, QC, examples, process, partner/client proof, or comparison.
- FAQ: practical buying objections.
- CTA: ask for location, area, objective, deadline, or perimeter.

CTA language should be concrete:
- "Enviar localizacao e area para escopo"
- "Pedir prazo e entregaveis"
- "Enviar perimetro para volumetria"
- "Validar requisitos do projeto"
- "Solicitar proposta tecnica"

Avoid vague CTAs:
- "Saiba mais"
- "Conheca nossas solucoes"
- "Transforme seu negocio"

## Content Voice

Voice:
- technical
- calm
- specific
- commercial but not hype-driven
- evidence-first
- practical

Sentence pattern:
- short claims
- concrete nouns
- visible deliverables
- direct buyer value

Good:
- "Entregamos DXF, curvas de nivel, ortomosaico e relatorio de precisao para reduzir retrabalho no projeto."
- "A volumetria compara superficies e quantifica corte/aterro antes da decisao de compra ou execucao."
- "O monitoramento recorrente cria historico auditavel para medicao, contrato e governanca."

Bad:
- "Tecnologia de ponta para transformar seu futuro."
- "Imagens incriveis com drones."
- "Solucoes inovadoras para todos os segmentos."

## Asset Acceptance Checklist

A generated BLK visual passes only if:
- it looks like measured geospatial/engineering evidence
- it includes at least four mandatory ingredients
- lime appears only as a controlled signal/validation/measurement accent
- it is mostly monochrome
- it avoids stock photo, cartoon, 3D gloss, sci-fi, and generic vector styles
- service meaning is visible without reading the page copy
- labels/marks are small and technical, not fake marketing slogans
- it could plausibly appear in a report, GIS portal, proposal, or technical annex
- it supports the page decision instead of decorating the section

Reject and regenerate if:
- the visual could belong to any generic drone company
- the drone is the main subject instead of the measured result
- it looks like a stock illustration library
- it uses decorative gradients or saturated green areas
- it lacks contours, point clouds, grids, coordinates, measurements, or validation cues

## Implementation Notes For Agents

When implementing this design in code:
- prefer existing Astro/Tailwind/Flowbite patterns in the repo
- keep edits scoped to the requested page or component
- avoid unrelated refactors
- use Tailwind classes before custom CSS
- if CSS tokens are updated, remove Poppins and make Lato the heading/body font
- keep generated artifacts out of `dist` and `.astro`
- follow `AGENTS.md` verification rules for touched areas

Docs-only changes:
- `git diff --check` is sufficient unless page/code files are also edited.

Page/content changes:
- run targeted route rendering and CTA checks from `AGENTS.md`.

SEO/schema changes:
- verify metadata and crawl artifacts as described in `AGENTS.md`.
