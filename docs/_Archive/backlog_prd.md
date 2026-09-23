---
title: Next Phase Backlog - BLK Aero
labels:
  - ready-for-agent
---

# PRD: Expansão de Conteúdo, SEO/AEO Local e Captura de Leads

## Problem Statement

BLK Aero's homepage has been upgraded to an Authority + Triage structure, but the surrounding website content is still minimal. Visitors who click "Ver detalhes" on the homepage triage cards land on basic "Em Construção" support pages. 

Furthermore:
1. There is no automated local SEO pipeline to capture geo-targeted traffic (e.g. "levantamento topográfico em Jacareí"), which is essential for scaling Google Ads campaigns in Brazil.
2. The `/cidades` page is a simple placeholder rather than a useful commercial tool where visitors can check if BLK serves their neighborhood.
3. The site lacks secondary conversion paths (Lead Magnet / Offers) to capture contacts from researching visitors who are not ready to open a WhatsApp chat immediately.
4. The site is missing critical E-E-A-T trust markers (formal entity verification on `/sobre`, proper schema.org graph stacking, and an AI discovery layer file `/llms.txt`), which exposes the brand to ad account suspensions and limits ranking potential on AI search engines (AEO).

## Solution

Build out the complete supporting architecture for the BLK Aero marketing site:

1. **Temporary Support Pages**: Create fully styled and functional interim pages for the 5 triage solutions.
2. **Programmatic Local SEO Engine**: Implement content collections for `cities` and `solutions`, generating dynamic `/cidades/[city]` and `/solucoes/[cluster]/[city]` landing pages.
3. **Searchable Coverage Index**: Upgrade the `/cidades` index route into a searchable list of cities and neighborhoods filtered instantaneously via client-side Vanilla JS.
4. **E-E-A-T & AI Discovery Layer**: Implement a comprehensive `/sobre` entity page with Google Perfil-aligned info, a stacked JSON-LD schema graph, and an `/llms.txt` file at the root.
5. **Static Lead Magnet & Webhook System**: Implement a content-driven `/ofertas/[slug]` capture form connected to GTM (respecting Consent Mode v2) and routed to Pipedream.
6. **Performance & Multi-Channel Tracking**: Omit heavy scripts, optimize LCP images natively, lazy load embeds (with `VideoObject` schema), and enforce consistent GTM dataLayer events for calls, emails, and lead forms.

## User Stories

1. As a visitor clicking "Ver detalhes" on a homepage card, I want a functional **Temporary Support Page** for that solution, so that I can understand its basic scope before starting a chat.
2. As a property owner in São José dos Campos looking for georeferencing, I want to find a hyper-local `/solucoes/regularizacao-rural/sao-jose-dos-campos-sp` page on Google, so that I know BLK understands the local municipal cartographic rules.
3. As a local SEO crawler, I want each **Service + City Page** to contain localized FAQs, specific served neighborhoods, and links to local official standards, so that the page is classified as high-quality unique content instead of a doorway page.
4. As an AI search assistant (like Gemini), I want to read a stacked JSON-LD schema `@graph` with clear `@id` anchors linking services, coordinate-based city objects, and organizations, so that I can accurately retrieve BLK for local queries.
5. As a visitor researching local coverage, I want to open `/cidades` and see a map visual of the served region, so that I can immediately verify BLK's geographic footprint.
6. As a mobile visitor, I want a search box on `/cidades` that filters cities and neighborhoods instantly as I type, so that I do not have to scroll through a long list of text.
7. As a mobile visitor, I want the location search to run in JavaScript without reloading the page, so that the search feels fast and responsive.
8. As a corporate buyer, I want a `/sobre` page displaying BLK's CNPJ, physical address matching Google Maps, certifications, and Ministry of Defense registration, so that I can verify the legal legitimacy of the contractor.
9. As a developer auditing the codebase, I want to access `/llms.txt` on the root domain, so that I can see a clean, machine-readable summary of the brand's services, trust facts, and contact details.
10. As a visitor not ready to buy, I want to access `/ofertas` and choose a downloadable checklist, so that I can learn about land regularization rules on my own first.
11. As a visitor filling out a lead magnet form, I want to enter my name, email, and phone, and receive the download link immediately on the screen, so that I don't have to wait for an email to arrive.
12. As a marketing manager, I want lead form submissions to push a `lead_magnet_submit` event to the GTM `dataLayer` containing my contact details, so that I can track Google Ads conversion actions.
13. As a user who denied cookie consent, I want GTM to block sending my email/phone (PII) to Google Ads, so that my privacy preferences are respected in compliance with LGPD.
14. As a commercial operator, I want lead contact details to be sent to a Pipedream webhook, so that they can be automatically saved in our spreadsheets or CRM.
15. As a mobile visitor, I want to tap the phone number in the header/footer and have it open my dialer immediately while firing a `click_to_call` tracking event.
16. As a mobile visitor, I want to tap the email address in the footer and have it open my email app while firing an `email_click` tracking event.
17. As a site visitor, I want all pages to load in under 2 seconds on mobile, so that I don't abandon the site due to slow loading.
18. As a visitor with reduced-motion settings, I want the homepage carousel not to auto-cycle, so that I can read the slides comfortably.
19. As a site maintainer, I want images (like the hero slides and platform screenshots) to be automatically converted to WebP/AVIF and scaled to fit the device, so that I don't have to manually optimize files.
20. As a site builder, I want a simple Markdown template to write new city files, so that I can quickly add more active cities to the site in the future.

## Implementation Decisions

### 1. Unified Route and Component Changes
- Maintain the `/solucoes` structure rather than renaming it back to `/servicos`, keeping the codebase aligned with `src/pages/solucoes/[cluster].astro`.
- Implement dynamic static generation for `/cidades/[slug].astro` and `/solucoes/[cluster]/[city].astro` using Astro's `getStaticPaths`.
- Filter all programmatic routes so only cities marked `active: true` in the content frontmatter are generated and listed in sitemaps, avoiding index pollution.
- Refactor `/cidades/index.astro` to include:
  - An inline, lightweight Vanilla JS script executing client-side filtering on a pre-rendered static list of cities/neighborhoods.
  - A responsive hero section displaying the service area coverage map.

### 2. Schema Graph Stack and AEO Markup
- Implement a centralized SEO metadata helper that injects a connected JSON-LD `@graph` into `SeoHead.astro`.
- Enforce the following schema nodes with explicit `@id` linking:
  - `BreadcrumbList` on all pages mapping the path back to the home page.
  - `ProfilePage` for `/sobre` containing a `Person` node with `jobTitle`, `knowsAbout`, and `worksFor` pointing to the main `Organization`.
  - `Service` schema for Solution + City pages with `areaServed` defined as a `City` type with `geo` coordinates.
  - `FAQPage` embedded on service and city pages to output local questions and answers.
  - `Article` for blog pages, linking `author` to the `/sobre` founder `Person` `@id`.
- Apply a stable selector wrapper `<p id="summary" class="bluf-text">` for the one-sentence BLUF on all commercial templates to support `speakable` search engine markers.
- Implement the standard `/llms.txt` file as a static text file in `/public/llms.txt` explaining the core business details.

### 3. Lead Magnet & Attribution System
- Add a new content collection `offers` defined in `src/content/config.ts`.
- Implement the route `/ofertas/[slug].astro` containing a client-side JavaScript form capturing the user's name, email, and phone.
- Build the GTM tracking handler that pushes the `lead_magnet_submit` event payload only when Consent Mode v2 variables allow it.
- Implement an outbound Pipedream webhook handler inside GTM or as a client script that pushes the captured lead data securely to the target URL.
- Ensure the WhatsApp message builder helper (`src/lib/whatsapp.ts`) and client-side listener (`src/components/WhatsAppCTA.astro`) correctly capture first-touch session-preserved UTM and `gclid` parameters without overwriting them.

### 4. Performance Media Otimization
- Refactor the hero carousel and other major landing pages to use Astro's native `<Image>` component for visual assets (hero pictures, platform mockups).
- Implement a lazy iframe component or a click-to-play placeholder for YouTube videos, accompanied by a generated `VideoObject` JSON-LD schema when a video exists on a page.
- Keep the proof band logos as text tags in the initial rollout, creating a task for the developer to place actual monochrome logo files under `src/assets/homepage/proof-logos/mono/` for a future automatic image-pipeline conversion.

## Testing Decisions

### 1. Unit Tests
- **Attribution Merge**: Add tests verifying that `mergeFirstTouchAttribution` keeps first-click campaign data and only fills in missing values during subsequent visits.
- **WhatsApp Prefill Payload**: Add tests confirming that `buildWhatsAppMessage` includes all qualification fields (area, location, objectives) in the final encoded URL string.

### 2. End-to-End Tests (Playwright)
- **Searchable coverage index**: Write tests proving that entering a city or neighborhood in the `/cidades` search box dynamically hides mismatching cards.
- **Form submission and Consent Gating**: Test that form submissions trigger the correct dataLayer event shape and respect Google Consent Mode v2 configurations (blocking PII when denied).
- **Secondary Contact Clicks**: Test that tapping phone and email links in the header/footer successfully fires `click_to_call` and `email_click` events.
- **Dynamic route indexability**: Test that all dynamically generated city and service pages contain a `BreadcrumbList`, proper H1 hierarchy, freshness markers, and an outbound official-source authority link.

## Out of Scope

- A separate multi-step interactive matcher or calculator widget.
- Full copywriting and translation of long-form case studies (anonymized proof snippets are used instead).
- CRM database direct hosting inside the Astro project (Pipedream webhook will handle routing instead).
- Automatic translation of the site into English or Spanish (target language remains pt-BR).

## Further Notes

- The site uses Flowbite's ESM components for interactive visual controls, avoiding heavy custom scripts or React integrations.
- Deploys continue to run automatically from the GitHub Pages workflow `.github/workflows/astro.yml` targeting the `main` branch.
- The `ready-for-agent` label must be preserved in the frontmatter of this PRD.
