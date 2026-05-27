# Build a high-performance Astro + Flowbite marketing site with programmatic city/service pages and WhatsApp attribution

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

## Purpose / Big Picture

After this change, a newcomer can run a local development server and see a working, mobile-responsive website that is optimized for Google Search landing traffic in Brazil. The site will have:

1) Core service pages and programmatic city pages (and service+city pages) that are statically generated from markdown content.
2) A consistent Flowbite/Tailwind visual system (so pages look good without custom design work).
3) A frictionless primary conversion path: a single WhatsApp CTA that records a conversion event (GTM/GA4) and passes attribution parameters into the WhatsApp prefilled message.
4) Built-in SEO basics: title/description, canonical URLs, robots.txt, sitemap.xml, and JSON-LD structured data for Organization/LocalBusiness and Service pages.
5) Performance safeguards: responsive images, lazy loading for below-the-fold media, and “lite” YouTube embeds that only load the iframe on click.
6) A “3‑second clarity” hero above the fold: H1 that matches ad intent, a short sub-headline, and a primary CTA visible without scroll (mobile + desktop), with trust signals near the CTA.
7) A measurable, low-friction conversion surface: WhatsApp as primary, plus click‑to‑call/email (and optional form) events tracked in GTM/GA4 for optimization.

8) A secondary “Lead Magnet” conversion path for paid traffic: dedicated offer pages (e.g., checklist/guide PDF) that capture contact info when the visitor is not ready to start a WhatsApp chat immediately.

How to see it working: run the dev server, open the homepage and a city/service page, click the WhatsApp CTA, and confirm (a) a GA4 event fires (via GTM preview or console logging in dev), and (b) the WhatsApp URL includes a prefilled message containing service/city plus UTM parameters. Also confirm /robots.txt and /sitemap.xml load, and view-page-source shows JSON-LD.

## PRD Targets and KPIs (Low Friction + Ad Rank)

### Objective
Build a high-performance, low-friction landing experience that maximizes Google Ads Quality Score / Ad Rank (lower CPC) and increases conversions by matching user intent immediately.

### Success metrics / quality gates
- **Core Web Vitals (mobile):** target **LCP ≤ 2.5s**, **INP < 200ms**, **CLS ≤ 0.1** (p75; validate in PageSpeed Insights after deploy; use Lighthouse as a preflight).
- **Lighthouse Accessibility:** target **≥ 90** (launch blocker; fix contrast, labels, focus order per WCAG 2.2).
- **Time to usable content:** practical target of **< 2 seconds** to see BLUF + primary CTA on typical mobile and desktop.
- **3‑second clarity:** within the first screen, users can answer “What is this?” + “Is it for me?” + “What do I do next?”
- **Copy readability:** short, concrete PT‑BR copy; target an “EF I / Grade 3–5” style (simple words, short sentences, specific outcomes).
- **Google Ads Quality Score:** target **7–10** for priority ad groups (measured in Google Ads; influenced by ad relevance + landing page experience).
- **Tracking coverage:** GTM/GA4 events for `whatsapp_click`, `click_to_call`, `email_click`, and (if implemented) `form_submit`.

### UX requirements to bake into implementation
- **Ad-to-page relevancy (“scent trail”):** page H1 must match the primary keyword/message of the ad group driving traffic.
- **Above-the-fold structure:** headline + subheadline + primary CTA visible without scrolling; secondary contact options present but not competing.
- **AEO extraction:** on commercial pages, put a one-sentence **BLUF** summary immediately under the H1, and use scannable semantic structures (lists and a `<dl>` for specs) so AI agents can reliably extract “what it is / what you deliver / key constraints”.
  - Ensure the BLUF and the specs `<dl>` can be targeted by `speakable` selectors (see JSON-LD rules).
- **Trust + proof near CTA:** testimonials/logos/ratings and at least one visual proof element (before/after, simple diagram, or deliverables preview) on key landing pages.
- **Risk reversal near CTA:** when a service includes a guarantee, render it adjacent to the primary CTA to reduce fear and improve conversions.
- **Differentiation (“Us vs. Others”):** include an explicit comparison block when the service has meaningful tradeoffs vs traditional providers.
- **Fallback capture for “researching” visitors (Ads):** on priority service/service+city pages, include a secondary CTA to an offer page (lead magnet) when the user is not ready to start a WhatsApp chat.
- **Interactive engagement signal:** include a lightweight on-page interactive element (Service Matcher / Quick Calculator) on priority landing pages to increase dwell time and reduce bounce; track interactions in GTM/GA4.


## Progress

- [ ] (2026-02-11) Orient in repository root and determine whether this is a new site or an existing Astro project.
- [ ] (2026-02-11) Create or normalize an Astro + Tailwind project, with a single consistent layout and Flowbite styling primitives.
- [ ] (2026-02-11) Implement the **above-the-fold hero** (H1 + subheadline + primary CTA visible without scroll) and add persistent, clickable **phone/email** in header/footer.
- [ ] (2026-02-11) Add content collections (services, cities, case studies, blog) and sample markdown content, including **headline variants / primary keyword** fields to support ad-to-page relevancy.
- [ ] (2026-02-11) Implement /sobre page as entity verification: visible CNPJ + address + certifications, plus Person schema linked to Organization.
- [ ] (2026-02-11) Implement static generation for service pages, city pages, and service+city pages; include internal linking, **H1 that matches ad intent**, BLUF summary, and `<dl>` specs on service templates.
- [ ] (2026-02-11) Implement WhatsApp CTA component that (a) fires a GTM/GA4 event, and (b) builds the wa.me link with attribution payload.
- [ ] (2026-02-11) Add secondary conversion tracking: `click_to_call`, `email_click`, and (optional) `form_submit`, all via GTM dataLayer; document Google Ads **conversion linker** setup in GTM.
- [ ] (2026-02-11) Add “Lead Magnet” offer pages (PDF/asset opt‑in) as a secondary CTA for paid traffic; track `lead_magnet_submit` and connect the offer to WhatsApp attribution when applicable.
- [ ] (2026-02-11) Implement performance components: responsive images (WebP/AVIF where possible), lite YouTube embed (with optional `VideoObject` schema output), lazy iframe wrapper, and confirm production **minification** is enabled.
- [ ] (2026-02-11) Add SEO + AEO infrastructure: metadata helper, unique titles/descriptions, canonical URLs, robots.txt, sitemap.xml, JSON-LD **schema stacking** (Service/Organization/FAQPage via `@id`), `dateModified` + “Última atualização”, **IndexNow push indexing**, and privacy + consent (cookie banner + Consent Mode v2).
- [ ] (2026-02-11) Add a broken-link / 404 checker (local script or CI) to prevent dead links from shipping.
- [ ] (2026-02-11) Validate end-to-end locally: build, preview, **Lighthouse/PageSpeed** checks (including **Accessibility ≥ 90**), and verify user-visible behaviors; capture concise evidence in this plan.
- [ ] (2026-02-11) Add deployment notes for Cloudflare Pages (build command, output directory, env vars) and basic operational guardrails.

## Surprises & Discoveries

- Observation: (fill in during execution)
  Evidence: (include short terminal output or a specific page URL and the observed result)
- Observation: (fill in during execution)
  Evidence: (include short terminal output or a specific page URL and the observed result)

## Decision Log

- Decision: Use Astro with static output, Tailwind, and Flowbite styling, avoiding React components by default.
  Rationale: The site is primarily a marketing/landing site where performance and SEO matter more than app-like interactivity; limiting JavaScript reduces load time and keeps maintenance low for a solo developer.
  Date/Author: 2026-02-11 / ExecPlan author

- Decision: Generate both city hub pages (/cidades/<slug>/) and service+city pages (/servicos/<service>/<city>/).
  Rationale: People search “<service> em <city>”; service+city pages align with that intent. City hub pages provide a stable “location landing” and internal linking target. This also allows gradual enrichment later (nearest case study rule) without changing routing.
  Date/Author: 2026-02-11 / ExecPlan author

- Decision: Use “thin but not empty” city pages: the page must contain user-visible value beyond the city name and schema.
  Rationale: Schema alone does not cause ranking; near-duplicate doorway pages risk weak indexing. The minimum per page will include logistics/service-area text plus localized FAQs and/or nearest case study linkage.
  Date/Author: 2026-02-11 / ExecPlan author

- Decision: Track conversion as WhatsApp click (proxy), and pass UTMs into the WhatsApp message for manual attribution.
  Rationale: “Chat started” is not reliably detectable from a static site without additional third-party systems; click tracking is reliable and sufficient for early optimization.
  Date/Author: 2026-02-11 / ExecPlan author

- Decision: Treat “above-the-fold clarity” as a hard requirement (Hero + CTA visible without scroll) for all paid-traffic landing pages.
  Rationale: Landing page experience affects both conversion rate and Google Ads Quality Score; users decide quickly whether to stay.
  Date/Author: 2026-02-11 / ExecPlan author

- Decision: Keep copy intentionally simple (EF I / Grade 3–5 style) and avoid generic marketing language.
  Rationale: Simple copy reduces cognitive friction and improves scanability on mobile; it also supports ad-to-page relevancy.
  Date/Author: 2026-02-11 / ExecPlan author

## Outcomes & Retrospective

- (Fill in after major milestones.) Summarize what exists now, what remains, and what you learned.

## Context and Orientation

This repository will become (or already is) a static website project.

Key terms used in this plan:

Astro: A website builder that renders pages at build time into static HTML files. In this plan we use Astro to generate all pages ahead of time, producing fast page loads and SEO-friendly HTML.

Tailwind CSS: A utility-first CSS system. Instead of writing lots of custom CSS, you apply small class names to HTML elements that collectively define the design.

Flowbite: A design system built on Tailwind. It provides pre-designed markup patterns and class combinations so pages look consistent quickly. In this plan we use Flowbite as a styling reference and Tailwind plugin, and we avoid Flowbite React to keep JavaScript minimal.

Content Collections: A way to store content as markdown files in src/content and validate frontmatter fields with a schema. In this plan, services, cities, case studies, and blog posts are collections.

Programmatic pages: Pages that are generated from data (markdown content) rather than written as one-off files. In Astro this is done via dynamic routes that enumerate getStaticPaths.

GTM/GA4: Google Tag Manager and Google Analytics 4. GTM loads tags; GA4 receives events. We fire a custom event on WhatsApp CTA click so Ads can optimize toward it.

Assumptions for the executor:

1) You can run Node.js commands locally. Use Node 20+ (or 18+ if necessary, but prefer 20).
2) You are in the repository root when running commands.
3) If this repo is empty, you will create the Astro project here. If it already contains an Astro project, you will adapt by adding the planned files and ensuring scripts work.

Repository layout at the end (high level):

- package.json and node_modules: Node project metadata and dependencies
- astro.config.mjs: Astro configuration (including sitemap)
- tailwind.config.mjs: Tailwind config (including Flowbite plugin and content paths)
- src/pages: route files that generate the site pages
- src/content: markdown content, organized by collection
- src/components: reusable UI pieces (layout, CTA, embeds)
- public: static assets served as-is (robots.txt, favicon, etc.)
- scripts: optional generators for bulk content creation

## Plan of Work

Milestone 1: Initialize or normalize the Astro + Tailwind + Flowbite foundation.

At the end of this milestone, running `npm run dev` shows a styled homepage whose **first screen** contains: (1) an H1 aligned to the primary ad/keyword, (2) a short subheadline, and (3) a primary CTA visible without scrolling (mobile + desktop). Phone/email are clickable in header/footer, and the global WhatsApp CTA is present.

Work includes: creating the Astro project if needed, installing Tailwind and Flowbite, setting a default layout, implementing the hero and contact affordances, **adding a lightweight interactive module (ServiceMatcher / Quick Calculator) on the homepage or priority landing pages**, and verifying mobile responsiveness + accessibility (tap targets, ARIA labels, focus states, color-contrast ratios aligned to WCAG 2.2, no horizontal scroll), and running a Lighthouse preflight with Accessibility ≥ 90.

Milestone 2: Add content collections and sample content.

At the end of this milestone, the site has sample markdown content for 3 services, 3 cities, 2 case studies, and 2 blog posts. Build-time validation is in place so missing frontmatter fields fail fast.

AEO-related requirement (content layer):

- Service entries include a `specifications` array (key/value pairs) that will be rendered as a `<dl>` on service pages.
- Service and City entries may include `updated_at` so pages can emit `dateModified` and display “Última atualização”.
- **RAG formatting constraint:** in markdown bodies, keep paragraphs short (under ~100 words) so AI systems can chunk/cite reliably.
- **Trustworthiness constraint (regulated claims):** on **service** pages, include at least one outbound link in the body text to an **official primary source** (regulatory body, government portal, or official standard) that substantiates the claim. Examples: INCRA/SIGEF documentation for georreferenciamento, Prefeitura portals for local requirements, ABNT standards references. Prefer the most “official” source available over Wikipedia when validating requirements, definitions, or compliance steps.


Work includes: defining schemas in src/content/config.ts and creating sample markdown entries.

Milestone 3: Implement programmatic pages.

At the end of this milestone, the following routes work in dev and preview builds:

- /servicos/<service-slug>/
- /cidades/<city-slug>/
- /servicos/<service-slug>/<city-slug>/
- /cases/<case-slug>/
- /blog/ and /blog/<post-slug>/
- /sobre/

Each page includes internal links, a consistent CTA, and SEO metadata.

AEO + Entity requirements (templates):

- Service and service+city pages render `summary` as BLUF immediately under the H1 and render `specifications` using `<dl>`, `<dt>`, and `<dd>`.
- If ratings are displayed or `aggregateRating` is emitted, show a user-visible review-source link (e.g., “Ver avaliações no Google”) pointing to `PUBLIC_GOOGLE_MAPS_URL`; the rating/count must match that external source.
- The /sobre page is treated as an entity verification page (visible CNPJ, address matching Google Business Profile, certifications) and includes Person schema linked to the Organization via `@id`.

Milestone 4: Implement attribution and conversion tracking (WhatsApp + secondary contacts).

At the end of this milestone:

**WhatsApp CTA**
1) Opens a wa.me link that includes a prefilled message containing: service, city (when applicable), and attribution parameters captured on landing (UTMs + gclid) **even if the user navigates internally before converting** (read from sessionStorage/cookie, not only the current URL).
2) Fires a GTM/GA4 event named `whatsapp_click` with parameters `service`, `city`, `page_path`, and key attribution fields (`utm_source`, `utm_campaign`, `gclid`, when present).

**Secondary conversion surfaces**
3) Tapping the phone link fires `click_to_call` and opens `tel:` without extra steps.
4) Clicking the email link fires `email_click` and opens `mailto:`.

Work includes: client-side helpers that push event objects into `dataLayer`, and a GTM loader enabled only when `PUBLIC_GTM_ID` is set. GTM setup notes must include enabling the Google Ads **conversion linker** tag (and any required Ads conversion tags) so Ads can attribute clicks reliably.

Milestone 5: Performance and embed hygiene.

At the end of this milestone:

- All portfolio images use responsive sizing and lazy loading below the fold.
- YouTube videos use a “lite embed” that loads the iframe only after user interaction.
- If a page includes a video demo/case walkthrough, it must also emit `VideoObject` JSON-LD (duration, uploadDate, description, and transcript when available) linked to the page’s main entity.
- Other iframes can be wrapped in a lazy loader (click-to-load), avoiding heavy third-party content on initial render.

Milestone 6: SEO infrastructure.

At the end of this milestone:

- /robots.txt exists and references sitemap.xml.
- /sitemap.xml is generated and contains the pages.
- **IndexNow push indexing** is configured so deployments submit updated URLs to Bing (and IndexNow-compatible AI search surfaces) immediately.
- Canonical URLs are set based on the configured site URL.
- JSON-LD is embedded as a connected `@graph` (schema stacking) using `@id` references:
  - Organization/LocalBusiness on the homepage
  - WebPage + Service + FAQPage on service/service+city pages
  - WebPage + FAQPage on city pages
  - WebPage + Article on blog post pages (with `Article.author` referencing the `/sobre` Person `@id`)
- Commercial pages emit freshness signals:
  - `dateModified` in JSON-LD
  - visible “Última atualização” on the page
- Privacy + tracking compliance exists:
  - a minimal privacy policy page
  - a basic cookie consent banner
  - GTM configured for Google Consent Mode v2 (default denied; tags gated on consent).

Milestone 7: Validation and operational notes.

At the end of this milestone:

- `npm run build` and `npm run preview` work.
- A short validation checklist is executed, with evidence captured here (including consent gating checks).
- A DEPLOYMENT.md file explains Cloudflare Pages setup and required environment variables.

## Concrete Steps

All commands below assume the working directory is the repository root.

### Step 0: Inspect current repository state

Run:

  ls
  node -v
  npm -v

If you see a package.json and astro.config.* already, this is an existing Astro project; skip “Step 1A” and jump to “Step 1B”. If the repo is empty or not an Astro project, do “Step 1A”.

### Step 1A: Create a new Astro project in the current directory (only if needed)

If the repository is empty or not an Astro project, create one in place. This plan assumes we want the project root to be the repository root.

Run:

  npm create astro@latest .

When prompted, choose:

- Template: “Minimal” (or “Basics” if “Minimal” is not offered)
- TypeScript: “Strict” (preferred)
- Install dependencies: “Yes”

Then add Tailwind:

  npx astro add tailwind

Install Flowbite:

  npm install flowbite

Add sitemap integration:

  npm install @astrojs/sitemap

### Step 1B: Normalize Tailwind + Flowbite configuration

Ensure tailwind.config.mjs exists and includes Flowbite and the correct “content paths” so Tailwind sees classes in src and in Flowbite.

Edit tailwind.config.mjs to include (adapt paths if your project differs):

  export default {
    content: [
      "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
      "./node_modules/flowbite/**/*.js"
    ],
    theme: {
      extend: {}
    },
    plugins: [
      require("flowbite/plugin")
    ]
  }

If the file uses ES modules, replace require with import-compatible syntax. The simplest approach in Astro projects is usually to keep this file in CommonJS style if the toolchain accepts it. If it fails, convert to:

  import flowbitePlugin from "flowbite/plugin";
  export default {
    content: [...],
    theme: { extend: {} },
    plugins: [flowbitePlugin]
  }

Add a global stylesheet (if not present) at src/styles/global.css, with Tailwind directives:

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

Ensure this stylesheet is imported once in your main layout (we will create a BaseLayout.astro and import it there).

### Step 1C: Add Astro config for sitemap and site URL

Edit astro.config.mjs:

1) Import the sitemap integration.
2) Set site from an environment variable with a safe local default.

Example shape:

  import { defineConfig } from "astro/config";
  import sitemap from "@astrojs/sitemap";

  const site = process.env.SITE_URL || "http://localhost:4321";

  export default defineConfig({
    site,
    integrations: [sitemap()]
  });

Create a .env.example file in repo root:

  SITE_URL="https://example.com"
  PUBLIC_GTM_ID="GTM-XXXXXXX"
  PUBLIC_WHATSAPP_NUMBER="5511999999999"
  PUBLIC_GOOGLE_MAPS_URL="https://www.google.com/maps?cid=YOUR_CID"
  INDEXNOW_KEY="your-indexnow-key"

Do not commit real IDs or numbers. Use placeholders.

### Step 1D: Create the core layout and shared components

Create:

- src/layouts/BaseLayout.astro
- src/components/Header.astro
- src/components/Footer.astro
- src/components/Hero.astro (above-the-fold headline + subheadline + primary CTA; supports a service-specific hero image/result visual, and an optional secondary CTA for lead magnets)
- src/components/TrustBar.astro (logos/testimonials/ratings near CTAs; include an external review-source link when available, e.g. Google Maps)
- src/components/ServiceMatcher.astro (micro-wizard or quick calculator; minimal JS; increases dwell time)
- src/components/ContactLinks.astro (tel/mailto links + tracking hooks)
- src/components/WhatsAppCTA.astro
- src/components/AttributionCapture.astro (runs on page load; stores UTMs/gclid in sessionStorage/cookie so attribution survives navigation)
- src/lib/attribution.ts (shared read/write helpers for attribution parameters)
- src/components/SeoHead.astro

BaseLayout should:

1) Set <html lang="pt-BR">.
2) Include <SeoHead> at the top with title/description/canonical.
3) Include GTM loader only when PUBLIC_GTM_ID is set.
4) Include a sticky header with primary nav plus **clickable phone/email** links (using <ContactLinks>).
5) Include a footer with contact info (including **CNPJ** and a **physical address** that matches the Google Business Profile), links to privacy policy + cookie settings, and a visible external verification link (e.g., “Ver avaliações no Google”) when `PUBLIC_GOOGLE_MAPS_URL` is set.
6) Ensure key landing pages render an above-the-fold **Hero** (H1 + subheadline + primary CTA visible without scroll) and a service-specific **hero image/result visual** for ad relevancy.
7) Include a floating WhatsApp button on all pages (primary CTA label: “Chamar no WhatsApp”).

Implement styling using Tailwind with Flowbite patterns:

- Use a simple container (max width) and padding.
- Use a consistent button style (Flowbite primary button classes).
- Use <details>/<summary> for mobile nav to avoid requiring extra JS for toggles.

Implement WhatsAppCTA as:

- A link (<a>) with href initially set to the base wa.me link using PUBLIC_WHATSAPP_NUMBER.

- **Attribution persistence (required for OCI + multi-page journeys):**
  - On every page load, read URL parameters: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, and `gclid`.
  - If any are present, store them immediately in `sessionStorage` (preferred) under a single key (e.g., `attribution_v1`) so they survive internal navigation.
  - Storage rule: keep the **first non-empty value per field** for the session (first-touch). Only fill missing fields; do not overwrite an existing value unless you explicitly decide to support “last-touch”.
  - Fallback: if `sessionStorage` is unavailable, use a first‑party cookie with a short TTL (e.g., 7 days). Document this in the privacy policy.

- A small inline client script that, on click:
  a) prevents default,
  b) reads attribution from storage (sessionStorage/cookie) and merges with any current URL params (current params can fill missing fields),
  c) builds a short attribution string,
  d) builds the final wa.me link with encoded text,
  e) sends a tracking event to the dataLayer (GTM) and/or gtag if present (including the same attribution values),
  f) then navigates to the final URL.


CTA microcopy requirement (lead filtering):
- WhatsAppCTA must support rendering an optional `price_anchor` note adjacent to the button (above or below) so service pages can show “A partir de …” without duplicating markup across templates.

Additional requirement (lead qualification + better Ads signals):
- The script must also read any page-level context passed via props or data-attributes (e.g., `data-service_suggested` from ServiceMatcher) and prepend a short, explicit intent sentence to the WhatsApp message such as: “Olá! Vi no site que preciso de <serviço>…”.
- The same context must be included in the `whatsapp_click` dataLayer event so Ads/GA4 can segment conversions by suggested service path.


Define the event shapes as:

- event name: `whatsapp_click`
  - parameters: `page_path`, `service` (optional), `city` (optional), `service_suggested` (optional; from ServiceMatcher), `matcher_path` (optional; e.g., “rural”/“urbano”), `utm_source` (optional), `utm_medium` (optional), `utm_campaign` (optional), `utm_term` (optional), `utm_content` (optional), `gclid` (optional)

- event name: `click_to_call`
  - parameters: `page_path`, `phone` (masked/normalized), `service` (optional), `city` (optional)

- event name: `email_click`
  - parameters: `page_path`, `email` (masked/normalized), `service` (optional), `city` (optional)

- event name: `form_submit` (only if/when a form exists)
  - parameters: `page_path`, `service` (optional), `city` (optional)

event name: `lead_magnet_submit` (offer opt-in; required if you implement offers)
  - parameters: `page_path`, `offer_slug`, `related_service` (optional), `related_city` (optional), attribution fields (`utm_*`, `gclid` when present)

- event name: `service_matcher_complete` (only if/when ServiceMatcher exists)
  - parameters: `page_path`, `service_suggested` (optional), `city` (optional), `inputs` (optional; keep minimal)

ServiceMatcher / Quick Calculator (engagement module):

- Implement as a small `<form>` (2–4 fields) that helps the user pick the right service or estimate turnaround (no heavy frameworks).
- Keep logic client-side and minimal; progressive enhancement only.
- On completion:
  - Push `service_matcher_complete` to `dataLayer`.
  - Update the primary WhatsApp CTA payload dynamically:
    - Set `service_suggested` (and any key segmentation such as “rural/urbano”) on the WhatsAppCTA via a shared state or data-attributes.
    - Ensure the *prefilled WhatsApp message* becomes a short pre-qualification (e.g., “Olá! Vi no site que preciso de Topografia Rural…”).
  - Show a clear CTA (e.g., “Chamar no WhatsApp”) with the suggested service/city preselected.

Implementation note (plain language): dataLayer is a global array GTM reads from. Pushing an object into dataLayer is the simplest way to send an event without depending on GA4 scripts being present.

The CTA label must be a single consistent text: “Chamar no WhatsApp”.

### Step 2: Add content collections and sample content

Create src/content/config.ts defining collections:

- services
- cities
- cases
- blog
- offers (lead magnets / low-friction offers for Ads)

Each collection should be defined with a schema requiring the fields we need.

Use these minimal schemas:

services:

- title: string
- slug: string
- primary_keyword: string (used to align H1 to ad group intent)
- headline_variants: array of string (3 headline options for PPC; first item can default to H1)
- summary: string (BLUF: the one-sentence “what it is” answer; rendered immediately under H1)
- promise: string (e.g., “Orçamento em 2h”)
- price_anchor: string (e.g., “A partir de R$ 1.500”; “Starting At” price filter to reduce low-budget WhatsApp clicks)
- guarantee: string (optional; Risk Reversal / “removing fear” copy; render near the primary WhatsApp CTA)
- proof_images: array of { src: string, alt: string, caption?: string } (optional; visual proof assets, distinct from `hero_image`)
- competitor_comparison: array of { feature: string, us: string, them: string } (optional; supports a compact “Us vs. Others” table)
- for_who: string (explicit audience)
- not_for: string (who this is not for)
- hero_image: string (required; file path in /public or Astro assets; must match the service intent)
- hero_image_alt: string (required; concrete description of what the image shows)
- specifications: array of { key: string, value: string } (facts/specs rendered as a definition list `<dl>`)
- faqs: array of { q: string, a: string }
- updated_at: date string (optional; used for freshness signals like `dateModified`)

- mentions: array of { name: string, sameAs: string } (optional; Semantic Anchoring links to Wikipedia/Wikidata)

cities:

- active: boolean (rollout flag; only `active: true` cities are generated/listed initially)
- name: string
- slug: string
- state: string (e.g., “SP”)
- lat: number
- lng: number
- service_area_text: string
- neighborhoods: array of string (recommended; bairros/regions used to add verifiable hyper-local entities to city and service+city pages)
- local_faqs: array of { q: string, a: string }
- updated_at: date string (optional; used for freshness signals like `dateModified`)

cases:

- title: string
- slug: string
- city: string
- service: string (one of the service slugs)
- problem: string
- deliverables: array of string
- timeline: string
- outcome: string
- hero_image: string (path or asset reference)

blog:

- title: string
- slug: string
- published_at: date string
- summary: string
- mentions: array of { name: string, sameAs: string } (optional; Semantic Anchoring links to Wikipedia/Wikidata)


offers (lead magnet landing pages):

- title: string
- slug: string
- summary: string (one-sentence BLUF of what the visitor gets)
- deliverable_label: string (e.g., “Checklist PDF”, “Guia”, “Planilha”)
- deliverable_url: string (relative or absolute; direct download after opt-in)
- related_service: string (optional; service slug)
- related_city: string (optional; city slug)
- fields: array of string (e.g., ["name","email","whatsapp"]; keep minimal)
- updated_at: date string (optional; freshness signals)

Create sample markdown files:

- src/content/services/georreferenciamento-imovel-rural.md
- src/content/services/levantamento-planialtimetrico.md
- src/content/services/reurb-e.md

Schema coverage note: in at least one service markdown, include `price_anchor`, `guarantee`, `proof_images`, and `competitor_comparison` so the templates can be validated end-to-end.

- src/content/cities/jacarei-sp.md (set `active: true` in frontmatter)
- src/content/cities/sao-jose-dos-campos-sp.md (set `active: true` in frontmatter)
- src/content/cities/cachoeira-paulista-sp.md (set `active: true` in frontmatter)

- src/content/cases/case-1.md and case-2.md (tie them to a service and a city)

- src/content/blog/post-1.md and post-2.md

- src/content/offers/checklist-regularizacao-imovel.md

Each markdown should have frontmatter that matches the schema and a body that contains real user-visible copy (PT-BR). Keep the sample content short but not empty; the point is to prove the pipeline works. For services, `hero_image` and `hero_image_alt` are required so the Hero can display a result visual that matches the service intent (and improves Ads landing relevance). **RAG formatting constraint:** keep paragraphs short (under ~100 words). Prefer headings, short lists, and the `<dl>` specs block for facts.

### Step 3: Implement programmatic pages

Create routes:

- src/pages/index.astro
- src/pages/servicos/index.astro
- src/pages/servicos/[slug].astro
- src/pages/cidades/index.astro
- src/pages/cidades/[slug].astro
- src/pages/servicos/[service]/[city].astro
- src/pages/cases/[slug].astro
- src/pages/blog/index.astro
- src/pages/blog/[slug].astro
- src/pages/sobre.astro
- src/pages/contato.astro
- src/pages/politica-de-privacidade.astro

- src/pages/ofertas/index.astro
- src/pages/ofertas/[slug].astro

For each dynamic route file, implement getStaticPaths that reads from the corresponding content collection.

Rollout rule (anti-doorway safeguard):
- For the initial launch on a new domain, generate routes only for cities where `active: true`.
- Start with **10–20 priority cities** that have the best neighborhood/FAQ coverage; progressively flip additional cities to active as content is enriched and the domain earns trust.


Behavior expectations:

/ofertas/:

- Lists offer/lead magnet pages with internal links to /ofertas/<slug>/.

/ofertas/[slug]:

- Loads an offer entry.
- Renders `summary` as BLUF under the H1 using the same stable selector (e.g., `<p id="summary" class="bluf-text">...</p>`).
- Shows a minimal opt-in form (name + one contact field) or a low-friction capture mechanism; after opt-in, reveals the `deliverable_url` (PDF/download).
- Tracks:
  - `lead_magnet_view` on page view (via GTM/GA4, if you choose to implement)
  - `lead_magnet_submit` on opt-in submit (required for Ads optimization)
- Provides an optional WhatsApp CTA as a fallback, preserving UTMs/gclid in the prefilled message.


/servicos/:

- Lists all services with internal links to /servicos/<service-slug>/ (supports navigation and breadcrumb parents).

/cidades/:

- Lists **active** cities with internal links to /cidades/<city-slug>/. (Do not link to inactive pages.)

/servicos/[slug]:

- Loads a service entry.
- Renders `summary` as BLUF immediately under the H1 (one sentence; direct answer).
  - Wrap the BLUF in a stable selector for Speakable markup: e.g., `<p id="summary" class="bluf-text">...</p>`.
- Renders `specifications` as a semantic definition list near the top:

  - `<dl id="specs">` wrapper with `<dt>` for the spec label and `<dd>` for the value.
  - Keep each value short and factual (turnaround, accuracy class, deliverables, required docs, etc.).
  - Style `<dt>` labels as visually distinct (e.g., bold/semibold) to reinforce key/value hierarchy for both readers and parsers.

- Shows promise, for_who / not_for, and FAQs

- **Risk reversal / guarantee:** if `service.guarantee` is present, render it directly under the primary WhatsApp CTA (e.g., a one-line “Garantia: …” note) to remove fear at the decision point.
- **Starting-at price anchor:** if `service.price_anchor` is present, render it as small text immediately above or below the primary WhatsApp CTA (e.g., “A partir de R$ 1.500”) to filter out visitors who cannot afford the service before they click.
- **Visual proof section:** if `service.proof_images` is present, render a dedicated “Veja o Resultado” section with these assets (2–6 images, each with alt text and optional caption). Keep this distinct from case study links.
- **“Us vs. Others” support:** if `service.competitor_comparison` is present, render a compact comparison table (3–6 rows) with columns “Nós” vs “Outros” to make differentiation explicit.

- Optionally render the ServiceMatcher / Quick Calculator module near the top (after the `<dl>` specs) to increase on-page interaction.

- Shows promise, for_who / not_for, and FAQs (rendered as <details> accordions).
- Lists related case studies (filter cases by service).
- Lists top cities (link to /servicos/<service>/<city> for a subset; for the MVP, show all **active** sample cities).
- Shows a visible freshness marker such as “Última atualização: <date>” (use `updated_at` when present, otherwise build date).

/cidades/[slug]:

- Loads a city entry.
- **Generation rule:** only generate this page when the city is `active: true` (staggered rollout).
  - Implementation note: `getStaticPaths` in `src/pages/cidades/[slug].astro` must filter the collection entries with `entry.data.active === true` so inactive rows never become routes (and therefore never appear in the sitemap).
- Starts with a short BLUF paragraph (“Atendemos <city>…”) and the service area text.
- Links to each service+city page for the city.
- Shows localized FAQ list (from `local_faqs`).
- Shows “Última atualização: <date>” (use `updated_at` when present, otherwise build date).

/servicos/[service]/[city]:

- Loads both the service and city.
- **Generation rule:** only generate this page when the target city is `active: true` (staggered rollout).
  - Implementation note: `getStaticPaths` in `src/pages/servicos/[service]/[city].astro` must filter for `city.data.active === true` before returning paths, to prevent “zombie” pages from being built or included by sitemap tooling.
- Sets the H1 to match **ad intent**: prefer `headline_variants[0]` (or a city-templated variant) and ensure it includes the city (e.g., “Georreferenciamento em Jacareí”).
- Renders service `summary` as BLUF immediately under the H1, templated to include the city when appropriate.
  - Use the same stable selector rule as `/servicos/[slug]` (e.g., `<p id="summary" class="bluf-text">...</p>`).
- Renders service `specifications` as `<dl id="specs">` (same rule as /servicos/[slug]), and allow a small city-localized addendum line when needed (e.g., typical turnaround in that region).
- Optionally render the ServiceMatcher / Quick Calculator module near the top to increase dwell time; keep it lightweight and track `service_matcher_complete`.
- **Risk reversal / guarantee:** if `service.guarantee` is present, render it directly under the primary WhatsApp CTA (e.g., “Garantia: …”; above the fold when possible).
- **Starting-at price anchor:** if `service.price_anchor` is present, render it as small text immediately above or below the primary WhatsApp CTA (e.g., “A partir de R$ 1.500”) to reduce low-quality clicks.
- **Visual proof section:** if `service.proof_images` is present, render a “Veja o Resultado” section (localized if needed) with the proof assets.
- **“Us vs. Others” support:** if `service.competitor_comparison` is present, render a compact comparison table on the page.
- Includes a short intro paragraph that is not only a find/replace; include at least one specific operational statement (turnaround, documentation checklist, or coverage).
- If `city.neighborhoods` is present, render a one-sentence coverage line listing a few neighborhoods (limit to ~3–6): “Atendemos todos os bairros de {city}, incluindo {n1}, {n2}, {n3}…”. This adds recognizable local entities and reduces near-duplicate doorway risk.
- Includes a “nearest case study” block if there is a case for that city+service; otherwise show a generic “cases na região” block (filter by service, show 2).
- Shows “Última atualização: <date>” (use a per-page `dateModified` rule described in Step 4).

/sobre:

- Must behave as the “entity verification” page (not generic marketing copy).
- Must include visible trust signals:
  - Company legal name + **CNPJ**
  - **Physical address** (must match Google Business Profile)
  - Primary phone/email
  - A short, concrete list of certifications/registrations relevant to the business (as applicable)
- Must include structured data:
  - `ProfilePage` schema whose `mainEntity` is the founder/owner `Person`, linked to the `Organization` via `@id` (see schema stacking in Step 4). The `Person` node must include **`jobTitle`**, **`knowsAbout`** (aligned to your service keywords), **`sameAs`** (at minimum, a professional LinkedIn profile), and **`worksFor`** pointing to the Organization `@id` (explicit relationship).

/cases/[slug]:

- Shows the case study and images.
- Links back to the service page and city page.

/blog:

- Index lists posts by date.
- Post page renders markdown and includes canonical metadata.
- Render the post `summary` (frontmatter) near the top as a one-sentence BLUF, using the same stable selector used on service pages (e.g., `<p id="summary" class="bluf-text">...</p>`).

### Step 4: Add SEO helpers and JSON-LD structured data

Create src/lib/seo.ts to centralize:

- buildTitle(pageTitle, primaryKeyword?) — ensures titles are unique and include the primary keyword when appropriate
- buildDescription({ summary, primaryKeyword, cityName? }) — keeps meta descriptions unique, specific, and non-generic
- canonicalUrl(path)
- defaultDescription

On every page template, enforce heading hierarchy:

- exactly one H1 (aligned to ad intent / primary keyword)
- H2/H3 used hierarchically for sections (deliverables, FAQs, proof, etc.)

Create src/components/SeoHead.astro to output:

- <title>
- <meta name="description">
- <link rel="canonical">
- Open Graph tags (title, description, url)
- Basic Twitter card tags (summary_large_image, if you have an image)
- JSON-LD script block passed in as a prop (stringified JSON)

JSON-LD rules:

#### Baseline schema types
All pages: include `BreadcrumbList` schema to define hierarchy and context for AI crawlers.

- Represent a real path back to the homepage and a parent collection page, e.g. `Home > Serviços > <Service>` or `Home > Cidades > <City>`.
- Use absolute URLs in `itemListElement[].item` and keep names consistent with on-page navigation.

Homepage: include Organization/LocalBusiness with:

- name (company name)
- url (SITE_URL)
- sameAs (**mandatory**; include `PUBLIC_GOOGLE_MAPS_URL` for your Google Business Profile/Maps entity, plus at least 1 other verified profile URL such as Instagram or LinkedIn — do not ship with an empty array)
- address (if you have it; otherwise omit)
- areaServed (a broad descriptor, such as “Vale do Paraíba, SP, Brasil”)
- knowsAbout (recommended): add 3–5 high-level topics that define the brand’s core offering (e.g., “Topografia”, “Georreferenciamento”, “Regularização Fundiária”, “Fotogrametria”, “Modelagem 3D”). Use plain strings (or `Thing` nodes) and keep them stable over time to reduce “LLM perception drift”.

- identifier fields like CNPJ should be included as text in the visible footer and optionally in JSON-LD as “taxID” if you choose; keep it simple.

Sobre/author page: treat `/sobre` as a `ProfilePage` whose `mainEntity` is the founder `Person`.

Service pages: include Service schema with:

- name
- provider (Organization)
- areaServed can be broad or omitted on the generic service page.
- `mentions` (optional): link key concepts to Wikipedia/Wikidata (Semantic Anchoring; see rule below).

Service+city pages: include Service schema with areaServed as City plus geo coordinates:

- areaServed: { "@type": "City", "name": "<City Name>", "geo": { "@type": "GeoCoordinates", "latitude": ..., "longitude": ... } }

Review + media signals (Service pages and Service+city pages):

- Add `aggregateRating` (only when you have real, verifiable data) to improve rich-result eligibility. The rating and count must match a visible statement on the page (e.g., “5,0 estrelas baseado em 27 avaliações no Google”) **and that statement must link to `PUBLIC_GOOGLE_MAPS_URL`**; source the numbers from Google Business Profile (preferred) or a maintained testimonials dataset. **Do not fabricate ratings**; omit `aggregateRating` if you cannot prove it.
- Add `image` as an `ImageObject` (or an array of `ImageObject`) on the `Service` node so multimodal/AEO agents can understand what the visual represents:
  - Use the hero image first, then append any `proof_images` when present (each with a caption/alt-derived description).
  - `image: [{ "@type": "ImageObject", "url": "<absolute image url>", "caption": "<what the image shows>", "name": "<keyword + city (when applicable)>" }]`

City pages: optional Place/City schema is fine, but do not rely on it; prioritize visible content.

Blog post pages: include `Article` (or `BlogPosting`) schema with:

- `headline`, `description`, `datePublished`, and `dateModified`
- `author: { "@id": personId }` (see `personId` rule below)
- `publisher: { "@id": orgId }`
- `mainEntityOfPage: { "@id": webpageId }` and `url: canonicalUrl`
- `mentions` (optional): link key concepts to Wikipedia/Wikidata (Semantic Anchoring).


#### Semantic Anchoring: `mentions` (Service + Article)
Goal: make key concepts on your pages unambiguous to AI agents by explicitly linking them to canonical definitions (Wikipedia/Wikidata).

Rule:
- Add a `mentions` array to **Service** nodes (service + service+city pages) and to **Article/BlogPosting** nodes (blog posts).
- Each item should be a `Thing` with `name` and `sameAs` pointing to a stable URL.
- Keep it small and intentional (typically 3–10 concepts per page). Prioritize core nouns that define your offer (e.g., “Georreferenciamento”, “Topografia”, “Fotogrametria”, “Geodésia”, “Cadastro Ambiental Rural”).

Implementation options:
- **Preferred:** store the list in content frontmatter (`mentions`) so it is editable per service/post.
- **Alternative:** maintain a small mapping in code (by service slug).

Example shape:
- `mentions: [{ "@type": "Thing", "name": "Topografia", "sameAs": "https://pt.wikipedia.org/wiki/Topografia" }]`

#### Voice/Agent Retrieval: `speakable` (BLUF read-out)
Goal: tell voice assistants/agents exactly which short text on the page is safe to read aloud.

Rule:
- Add a `speakable` property (using `SpeakableSpecification`) on **service** pages and **blog post** pages.
- Target both:
  - the BLUF summary element via stable selectors (e.g., `#summary` and/or `.bluf-text`), and
  - the specs definition list on service/service+city pages (e.g., `#specs`) so assistants can read constraints (time, requirements, deliverables) alongside the definition.

Example shape:
- `speakable: { "@type": "SpeakableSpecification", "cssSelector": ["#summary", ".bluf-text", "#specs"] }`

Template requirement:
- The BLUF paragraph must have the matching selector in the HTML (see Step 3 BLUF selector rule).


Authorship entity rule:

- Define a stable Person id on `/sobre` and reuse it site-wide:
  - `personId = SITE_URL + "/sobre#founder"` (or `"/sobre#<author-slug>"` if you add multiple authors later)
- `/sobre` must behave as a `ProfilePage` and emit both:
  - a `ProfilePage` (or `WebPage` with `@type: ProfilePage`) node, and
  - a `Person` node with `@id: personId` set as `ProfilePage.mainEntity`.
  Blog posts must reference `personId` via `Article.author`. This creates a durable expertise link (E‑E‑A‑T) without duplicating the full Person object on every post.
- The `Person` node must include `jobTitle`, `knowsAbout` (array of the key service topics you want associated with the author), `sameAs` (at minimum, a LinkedIn URL), and `worksFor: { "@id": orgId }` (explicit employment/affiliation link).


#### AEO requirement: schema stacking + `@id` graph links
For pages that target commercial queries (service, city, and service+city pages) **and for blog posts**, emit JSON-LD as a connected graph using stable `@id` references so crawlers/AI agents can follow relationships.

Rules:

- Use `@graph` with stable ids:
  - `orgId = SITE_URL + "/#organization"`
  - `websiteId = SITE_URL + "/#website"`
  - `personId = SITE_URL + "/sobre#founder"` (site-wide author)
  - `articleId = canonicalUrl + "#article"` (blog posts only)
  - `webpageId = canonicalUrl + "#webpage"`
  - `breadcrumbId = canonicalUrl + "#breadcrumb"` (all pages)
  - `serviceId = canonicalUrl + "#service"` (only on service / service+city pages)
  - `faqId = canonicalUrl + "#faq"` (when a page has FAQs)

- Always include a `WebPage` node with `@id: webpageId`, `url: canonicalUrl`, `name`, `dateModified`, and `breadcrumb: { "@id": breadcrumbId }`.
- Always include a `BreadcrumbList` node with `@id: breadcrumbId` and `itemListElement` (`ListItem` objects with `position`, `name`, and `item`).
- On service / service+city pages:
  - Include a `Service` node with `@id: serviceId`, `provider: { "@id": orgId }`, and `dateModified`.
  - Add `mentions` to the `Service` node (see Semantic Anchoring rule above).
  - Generate an `FAQPage` node from the page’s FAQ fields:
    - Service pages: `services.faqs`
    - City pages: `cities.local_faqs`
    - Service+city pages: combine the most relevant FAQs (e.g., service FAQs + top local FAQs; keep it short)
  - In the `WebPage` node, connect everything explicitly:
    - `mainEntity: [{ "@id": serviceId }, { "@id": faqId }]` (when FAQ exists)
    - `about: [{ "@id": orgId }]` (and/or `about: [{ "@id": serviceId }]`)
    - Add `speakable` on the `WebPage` node targeting the BLUF + hard constraints selectors (e.g., `cssSelector: ["#summary", ".bluf-text", "#specs"]`).

- On city pages:
  - Emit `FAQPage` (from `local_faqs`) and link it via the same `WebPage.mainEntity` pattern.

- On blog post pages:
  - Include an `Article` (or `BlogPosting`) node with `@id: articleId`.
  - Set `author: { "@id": personId }` and `publisher: { "@id": orgId }`.
  - Add `mentions` to the `Article/BlogPosting` node when available (see Semantic Anchoring rule above).
  - In the `WebPage` node, link it explicitly:
    - `mainEntity: [{ "@id": articleId }]`
    - `about: [{ "@id": orgId }, { "@id": personId }]`
    - Add `speakable` on the `WebPage` node targeting the BLUF selector (e.g., `cssSelector: ["#summary", ".bluf-text"]`).

#### Freshness signals (commercial pages)
- Add `dateModified` to:
  - the `WebPage` node on every page
  - the `Service` node on service / service+city pages
- Source of truth for `dateModified`:
  1) If the content entry has `updated_at`, use it.
  2) Otherwise, use the build date (the same value that is printed as “Última atualização” in the UI).
- Also show “Última atualização: <date>” visibly on service, city, and service+city pages (footer or near the end of content).

### Step 5: Robots and sitemap

Create public/robots.txt:

- allow all user agents
- reference sitemap URL based on SITE_URL; since robots.txt is static, choose a relative reference if you want to avoid environment mismatch.

A simple approach:

  User-agent: *
  Allow: /
  Sitemap: /sitemap-index.xml

Note: @astrojs/sitemap may generate sitemap-index.xml depending on configuration. After building once, inspect the dist output to confirm the exact filename and adjust robots.txt accordingly. Record the discovered filename in `Surprises & Discoveries` with evidence.

### Step 5B: Real-time indexing with IndexNow (Bing + AI search)

Goal: when you deploy, “push” the updated URLs immediately instead of waiting for crawlers.

1) **Generate an IndexNow key** (32+ chars, lowercase hex is common). Keep it stable for the domain.
2) **Host the key file** at the site root as `{KEY}.txt` containing only the key (UTF‑8). In an Astro project, this means:

- Create `public/{KEY}.txt` with the file contents equal to `{KEY}`.
- After build + deploy, confirm `https://<your-domain>/{KEY}.txt` returns 200.

3) **Submit URL updates on deploy** (recommended: POST a batch).

- Create `scripts/indexnow.mjs` that sends a POST request to the IndexNow endpoint with:
  - `host`: your domain (no protocol)
  - `key`: your key
  - `keyLocation`: the absolute URL to `{KEY}.txt`
  - `urlList`: the list of URLs to submit (at minimum: homepage + any pages changed in the deploy; optionally parse the generated sitemap files and submit those URLs)

4) **Wire it into Cloudflare Pages** (or your CI/CD):

- Option A (simple): set build command to `npm run build && node scripts/indexnow.mjs`
- Option B (cleaner): run the script as a separate “post-build” step in CI.

Notes:
- Use the global endpoint (`https://api.indexnow.org/indexnow`) or Bing’s endpoint (`https://www.bing.com/indexnow`).
- If you do not want to parse the whole sitemap, maintain a short list of “always submit” URLs (home, /servicos/, /cidades/, and any newly created pages).

### Step 6: Performance components

Create:

- src/components/LiteYouTube.astro
- src/components/LazyIframe.astro

LiteYouTube behavior:

- Props:
  - `videoId`, `title`
  - Optional `schema` metadata (only when the page should be discoverable in multimodal/video search):
    - `canonicalUrl` (absolute)
    - `webpageId` (the page’s `WebPage` `@id`)
    - `aboutId` (optional: the page’s main entity `@id`, e.g., `#service` or `#case`)
    - `description`, `uploadDate` (YYYY-MM-DD), `duration` (ISO 8601), `thumbnailUrl` (absolute), `transcript` (string)

- Render a thumbnail image and a play button.
- On click, replace the placeholder with an iframe pointing to https://www.youtube-nocookie.com/embed/<videoId>?autoplay=1
- Set fixed aspect ratio wrapper (16:9) using CSS classes (e.g., aspect-video)
- Do not load the iframe before click.
- If `schema` metadata is provided, also emit a `VideoObject` JSON-LD node:
  - `@id = canonicalUrl + "#video-" + videoId`
  - `isPartOf: { "@id": webpageId }`
  - `about: [{ "@id": aboutId }]` when provided
  - include `name`, `description`, `uploadDate`, `duration`, `thumbnailUrl`, `embedUrl`, and `transcript` when available.

LazyIframe behavior:

- Props: src, title, height (optional)
- Render a button “Carregar conteúdo” and only inject the iframe after click.
- Always include width/height styling so layout does not jump.

Images:

- **Asset filename normalization (multimodal SEO):** do not ship generic filenames like `hero-1.jpg`. For proof/hero images on Service and Service+City pages, use descriptive, slug-like filenames that include the `primary_keyword` and (when applicable) the `city` slug/state, e.g. `levantamento-planialtimetrico-jacarei-sp.jpg`.
- Prefer Astro assets pipeline (astro:assets) or standard <img> with srcset if you are not implementing an image pipeline yet.
- For the MVP, ensure all images have explicit width and height attributes and lazy loading where appropriate.
- Add a short developer note in DEPLOYMENT.md describing the preferred formats: AVIF/WebP and typical max widths.

### Step 7: GTM, Consent Mode v2, and privacy policy

GTM loader:

- Add a component src/components/GtmHead.astro that inserts the GTM <script> in <head> only when PUBLIC_GTM_ID exists.
- Add a noscript fallback in <body> (GTM iframe) only when the ID exists.

Cookie consent banner (basic CMP):

- Implement a lightweight Cookie Consent Banner component (no heavy third-party CMP required for MVP).
- Persist the user’s choice in a first-party cookie or localStorage.
- Provide at least two actions:
  - “Aceitar” (grants analytics + ads storage)
  - “Recusar” (denies analytics + ads storage)
- Provide a link to the privacy policy and a way to reopen/change consent (e.g., “Configurar cookies” link in the footer).

Google Consent Mode v2 (via GTM):

- Configure GTM to respect consent before firing tags.
- Default state must be “denied” until the user accepts:
  - `ad_storage = denied`
  - `analytics_storage = denied`
  - (recommended for v2) `ad_user_data = denied`, `ad_personalization = denied`
- On “Aceitar”, update consent to “granted” for the relevant storages.
- Practical GTM guidance:
  - Use a **Consent Initialization** trigger/tag to set defaults.
  - Gate GA4 + Google Ads tags on consent.
  - Keep the site’s own `dataLayer.push({ event: ... })` calls as-is; GTM decides whether those events become network hits.

Privacy policy page:

- Create src/pages/politica-de-privacidade.astro
- Include clear PT-BR text:
  - what data is collected (analytics events, UTMs, gclid when present)
  - note: UTMs and `gclid` may be temporarily stored in `sessionStorage` (and optionally a short-lived first‑party cookie fallback) to preserve attribution across pages and prefill the WhatsApp message.
  - purpose (measure marketing performance)
  - cookie/consent explanation (and how to change settings)
  - how to contact
  - how to opt out (browser controls)
  - mention WhatsApp is a third-party platform when the user clicks the CTA

Footer:

- Show CNPJ and physical address visibly in the footer.
- Include a “Configurar cookies” link that reopens the consent banner.

### Step 8: Bulk city creation (optional but supported) (optional but supported)

Because the real site needs 102 cities, add a generator script that can create city markdown files from a CSV.

Create:

- data/cities.csv (starter with the 3 sample cities; set `active: true` for these so the initial build generates them)
- scripts/generate-cities.mjs

Script behavior:

- Read data/cities.csv with columns: active (boolean), name, slug, state, lat, lng, neighborhoods (optional; semicolon-separated list)
- For each row, write src/content/cities/<slug>-<state-lower>.md if it does not exist, and include `active: <boolean>` in the frontmatter (default to `false` when missing).
- **Quality gate:** if `active: true` but the row is missing neighborhoods and local FAQs (or other unique city value), downgrade to `active: false` and log a warning; don’t ship thin pages as “active.”
- **Staggered rollout:** in `data/cities.csv`, set `active: true` for only the first **10–20 priority cities** at launch; progressively activate more rows as content is enriched and indexing stabilizes.
- The generated markdown should include minimal frontmatter plus a generic service_area_text, a starter `neighborhoods` list (empty or a few major bairros when available), and a starter local_faqs array.
- The script must be idempotent: do not overwrite existing files, so manual edits are preserved.

Run it:

  node scripts/generate-cities.mjs

### Step 9: Validation

Run:

  npm run lint   (if available; if not, skip)
  npm run build
  npm run preview

Then validate three layers:

**A) UX + relevancy (manual)**
- On mobile viewport, confirm the **Hero** (H1 + subheadline + primary CTA) is visible without scrolling on the homepage and on a service+city page.
- Confirm the H1 matches the page’s primary keyword / ad intent (no generic “we do mapping” phrasing).
- Confirm phone/email links are present in header/footer and are clickable.

**B) Tracking**
- WhatsApp CTA click:
  - if PUBLIC_WHATSAPP_NUMBER is set, the link points to wa.me/<number>
  - the text includes service/city (when applicable) + UTMs/gclid if present in the URL
  - **navigation persistence:** after landing with UTMs/gclid, click to another internal page (no query string) and confirm the WhatsApp CTA still includes the stored UTMs/gclid
  - a `whatsapp_click` event is pushed to `dataLayer` (GTM preview or console in dev)
- Click-to-call fires `click_to_call` and opens `tel:`.
- Email click fires `email_click` and opens `mailto:`.

**C) Technical quality gates**
- Run a quick Lighthouse pass against the preview URL (desktop + mobile preset) and record the headline numbers in `Artifacts and Notes`.
- Confirm **Lighthouse Accessibility ≥ 90** (treat as a launch blocker; fix contrast/ARIA/focus order until it passes).
- Run a broken-link / 404 check (whatever tool you add) and confirm no internal dead links.
- /robots.txt loads and references the sitemap.
- IndexNow key file loads from the deployed domain (200 response on `/{KEY}.txt`) and IndexNow submission runs successfully in build/CI logs.
- /sitemap*.xml exists in the built output and is served in preview.
- View-page-source contains JSON-LD script blocks on relevant pages.

Capture short evidence snippets in `Artifacts and Notes` (below), such as:

- an example WhatsApp link showing encoded UTMs/gclid
- Lighthouse key metrics (LCP/CLS/INP or proxy) and overall score
- the presence of dist/sitemap-index.xml (or similar)
- a JSON-LD snippet showing City geo coordinates

### Step 10: Deployment notes

Create DEPLOYMENT.md with:

- Build command: npm run build
- Output directory: dist
- Required env vars on Cloudflare Pages:
  - SITE_URL
  - PUBLIC_GTM_ID (optional)
  - PUBLIC_WHATSAPP_NUMBER
- Suggested caching defaults (use platform defaults; do not add custom caching until needed)
- Offline Conversion Import (OCI) prep: preserve the Click ID (`gclid`) for leads. When a user starts a WhatsApp chat, the prefilled message contains the `gclid`; the operator should copy it into the CRM/spreadsheet row for that lead (along with date/time and outcome). This enables future Google Ads offline conversion uploads (e.g., “Qualified Lead”, “Won”) so Smart Bidding optimizes to sales outcomes, not just clicks.
- **OCI reliability requirement:** store `gclid` (and UTMs) in `sessionStorage` on first landing (with optional cookie fallback) and have `WhatsAppCTA` read from storage. This prevents losing attribution when the user lands on content (e.g., blog) and later clicks through to a service page to convert.
- **Quarterly Freshness Sprint (every 3 months):** review priority commercial pages (top services + top service+city pages), update at least one concrete element (statistic, regulation link, example, deliverable list, FAQ, or case snippet), and bump `updated_at` so `dateModified` changes. In internal testing across 2026 AI search surfaces, pages that are not refreshed quarterly are materially more likely to lose AI citations; treat freshness as an operational ritual, not just a metadata field.
- Post-deploy checks:
  - Run `pagespeed.web.dev` (mobile + desktop) on the deployed URL and record results in `Artifacts and Notes`
  - Confirm HTTPS is enforced and canonical URLs match the public domain
  - Confirm GTM loads only when configured (no stray tags in staging)
- A short checklist for adding new cities/services/cases by creating new markdown files

## Validation and Acceptance

Acceptance is met when a novice can do the following from a fresh clone:

1) Install and run dev:

   npm install
   npm run dev

   Then open http://localhost:4321 and see a styled homepage where the **Hero** (H1 + subheadline + primary CTA) is visible without scrolling on a mobile viewport, and phone/email links are clickable.

2) Confirm static generation works:

   npm run build
   npm run preview

   Then open:

   http://localhost:4321/servicos/georreferenciamento-imovel-rural
   http://localhost:4321/cidades/jacarei-sp
   http://localhost:4321/servicos/georreferenciamento-imovel-rural/jacarei-sp

   Each must render valid content and share the same layout.

   - On the service and service+city pages, confirm the “Starting At” price anchor (from `price_anchor`) is visible near the primary WhatsApp CTA (small text above/below the button).

3) Confirm attribution + conversion tracking behavior:

   Open a URL with UTMs, for example:

   http://localhost:4321/servicos/georreferenciamento-imovel-rural/jacarei-sp?utm_source=google&utm_medium=cpc&utm_campaign=teste&gclid=abc123

   - Click “Chamar no WhatsApp” and observe a navigation to a wa.me URL whose `text=` payload includes service/city plus the UTM/gclid values.
   - Navigate to another internal page (without the query string) and click “Chamar no WhatsApp” again; confirm the stored UTM/gclid values still appear in the wa.me `text=` payload.
   - In dev, either GTM preview shows the `whatsapp_click` event or console logging indicates the event object was pushed into `dataLayer`.
   - Confirm the cookie consent banner appears and Consent Mode defaults to “denied”. After clicking “Aceitar”, verify GA4/Ads tags are allowed to fire (via GTM preview).
   - Click the phone link and confirm `click_to_call` is pushed and `tel:` opens.
   - Click the email link and confirm `email_click` is pushed and `mailto:` opens.

4) Confirm performance gates (best-effort locally):

   - Run Lighthouse against the preview URL (desktop + mobile preset). Record the key metrics and ensure there are no obvious regressions (e.g., large CLS, very slow LCP). The goal is an “instant” feel and a practical target of <2s to usable content.

5) Confirm SEO artifacts exist:

   - GET /robots.txt returns 200 and references a sitemap.
   - GET /sitemap.xml or /sitemap-index.xml returns 200 (match the actual generated name).
   - View-page-source contains a JSON-LD **@graph** on the homepage and commercial pages (service/city/service+city) with:
     - linked `@id` references (Organization ↔ WebPage ↔ Service ↔ FAQPage)
     - `FAQPage` generated from the relevant `faqs` fields
     - `dateModified` present and consistent with “Última atualização” displayed on the page
   - Titles/descriptions are unique and non-generic; H1 matches the page’s primary keyword.
   - Open /sobre and confirm it contains visible entity trust signals (CNPJ, address, certifications) and includes Person schema linked to the Organization.

6) Confirm link hygiene:

   - A broken-link / 404 check reports no internal dead links.


## Idempotence and Recovery

- All steps are safe to repeat. Re-running npm install is safe. Re-running builds is safe.
- The city generator script must be idempotent and must not overwrite existing markdown files.
- If Tailwind or Flowbite configuration breaks the build, revert tailwind.config.mjs to a minimal Tailwind-only config and re-add Flowbite plugin carefully, validating with `npm run build` after each change.
- If the sitemap filename differs from robots.txt, update robots.txt and note the discovery in `Surprises & Discoveries` with evidence.

## Artifacts and Notes

During execution, paste short evidence here, for example:

- Evidence: WhatsApp link constructed from a service+city page with UTMs.

  Example (encoded) URL:
    https://wa.me/5511999999999?text=Ol%C3%A1%21%20Quero%20or%C3%A7amento%20em%202h.%20Servi%C3%A7o%3A%20georreferenciamento-imovel-rural.%20Cidade%3A%20jacarei-sp.%20utm_source%3Dgoogle%20utm_campaign%3Dteste%20gclid%3Dabc123

- Evidence: sitemap filename produced by build.

  dist/ contains:
    sitemap-index.xml
    sitemap-0.xml

- Evidence: JSON-LD snippet present in view-source.

  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Service","name":"Georreferenciamento ...","areaServed":{"@type":"City","name":"Jacareí","geo":{"@type":"GeoCoordinates","latitude":-23.3,"longitude":-45.9}}}
  </script>

## Interfaces and Dependencies

Dependencies to add (if not already present):

- astro (core framework)
- @astrojs/tailwind (Tailwind integration)
- tailwindcss (CSS system)
- flowbite (Tailwind-based design system)
- @astrojs/sitemap (static sitemap generation)
- zod (usually included with Astro; used for content schemas)
- linkinator (broken link checker; dev dependency)
- lighthouse (optional; for local audits)


Public environment variables:

- PUBLIC_GTM_ID: optional; when set, loads GTM.
- PUBLIC_WHATSAPP_NUMBER: required for CTA; format must be country code + number without punctuation, e.g., 5511999999999.
- PUBLIC_GOOGLE_MAPS_URL: recommended; link to your Google Business Profile / Maps entity (used for external verification links and `sameAs`).

Private environment variable:

- SITE_URL: required for correct canonical URLs and sitemap host; in local dev defaults to http://localhost:4321.

Component interfaces (stable props to implement):

- SeoHead.astro:
  - props: title (string), description (string), canonicalPath (string), jsonLd (object | null)

- Hero.astro:
  - props: h1 (string), subheadline (string), primaryCtaLabel (string), primaryCtaHref (string)
  - props (new): heroImage (string | null), heroImageAlt (string | null)
  - props (optional): guaranteeText (string | null)  (render near the primary CTA; risk reversal / removing fear)
  - props (optional): secondaryCtaLabel (string | null), secondaryCtaHref (string | null)  (use for lead magnet CTAs when needed; keep visually secondary)

- TrustBar.astro:
  - props: items (array of { label: string, href?: string }) — keep lightweight; no heavy sliders


- ServiceMatcher.astro:
  - props: services (array of { slug: string, title: string }), cities (array of { slug: string, name: string }), presetService (string | null), presetCity (string | null)

- ContactLinks.astro:
  - props: phone (string), email (string), service (string | null), city (string | null)

- WhatsAppCTA.astro:
  - props: service (string | null), city (string | null), label (string, default “Chamar no WhatsApp”)
  - props (new): serviceSuggested (string | null), matcherPath (string | null)  (used to pre-qualify the WhatsApp message and enrich `whatsapp_click`)

- LiteYouTube.astro:
  - props: videoId (string), title (string), schema (object | null)
    - schema.canonicalUrl (string, absolute)
    - schema.webpageId (string)
    - schema.aboutId (string | null)
    - schema.description (string | null)
    - schema.uploadDate (string | null)
    - schema.duration (string | null)
    - schema.thumbnailUrl (string | null)
    - schema.transcript (string | null)

- LazyIframe.astro:
  - props: src (string), title (string), height (number | null)


Update note (required for living plans):

- Initial ExecPlan created on 2026-02-11.
- Revised on 2026-02-11 to incorporate PRD requirements for low friction and Ad Rank: above-the-fold hero, readability targets, expanded conversion tracking (call/email), link hygiene, and Lighthouse/PageSpeed validation.
- Revised on 2026-02-12 to add AEO support (BLUF + `<dl>` specs), entity verification requirements for /sobre, Consent Mode v2 + cookie banner, schema stacking via `@id` links (Organization/Service/FAQPage), and freshness signals (`dateModified` + “Última atualização”).
- Revised on 2026-02-12 to strengthen entity validation (`sameAs` mandatory), add multimodal image SEO (filename normalization + `ImageObject`), add neighborhoods to city data for hyper-local uniqueness, add review signals (`AggregateRating` with visible proof constraint), and add OCI prep notes for preserving `gclid` for offline conversion uploads.
- Revised on 2026-02-12 to add `VideoObject` schema support for lite video embeds, set an explicit **INP < 200ms** quality gate, and link Blog `Article.author` to the `/sobre` Person `@id`.
- Revised on 2026-02-12 to add `BreadcrumbList` across all pages, enrich `/sobre` `Person` schema for E‑E‑A‑T (`jobTitle`, `knowsAbout`, `sameAs`), and add RAG-friendly formatting constraints (short paragraphs + visually distinct `<dl>` spec keys).
- Revised on 2026-02-12 to add **IndexNow** (real-time push indexing), upgrade `/sobre` to a `ProfilePage` wrapper for author identity, and add **Lighthouse Accessibility ≥ 90** (WCAG 2.2 contrast) as a hard quality gate.
- Revised on 2026-02-12 to add Semantic Anchoring (`mentions`), make the founder `Person.worksFor` relationship explicit, and add `SpeakableSpecification` targeting the BLUF summary for voice/agent retrieval.
- Revised on 2026-02-12 to add staggered city rollout controls (`active` flag + quality gate), strengthen third-party trust verification (Google Maps / Business Profile links in UI + `sameAs`), and add a lightweight ServiceMatcher / Quick Calculator module to increase dwell time.
- Revised on 2026-02-12 to incorporate Lead Magnet offer pages (secondary CTA), require service-specific hero result visuals, pass ServiceMatcher outcomes into WhatsApp prefill + tracking, expand `speakable` selectors to include the specs `<dl>`, and make `getStaticPaths` filtering for `active: true` explicit to prevent sitemap “zombie” routes.
- Revised on 2026-02-12 to add offer-psychology landing-page fields (`guarantee`, `proof_images`, `competitor_comparison`) and to persist UTMs/`gclid` in sessionStorage (cookie fallback) so OCI attribution survives internal navigation.
