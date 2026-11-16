## Rural acquisition implementation — 2026-11-10

Home: BLK. Kind: Working file/context. Canonical implementation checklist: this section of `docs/TODO.md`. Next transition: start **Repair the shared WhatsApp action**. This is the implementation handoff from the completed [acquisition decision map](../../../../00-inbox/_BACKLOG/build-blk-s-website-local-seo-and-google-ads-growth-system/map.md); no application or account change is included in this planning update.

Use the accepted [website specification](../../../../00-inbox/_BACKLOG/build-blk-s-website-local-seo-and-google-ads-growth-system/issues/06-focused-website.md), [Portuguese copy](../../../../00-inbox/_BACKLOG/build-blk-s-website-local-seo-and-google-ads-growth-system/references/focused-homepage-copy.md), [measurement specification](../../../../00-inbox/_BACKLOG/build-blk-s-website-local-seo-and-google-ads-growth-system/issues/05-enquiry-attribution-and-measurement.md), and [campaign matrix](../../../../00-inbox/_BACKLOG/build-blk-s-website-local-seo-and-google-ads-growth-system/references/campaign-matrix-proposal.md) as the decision sources. Keep their rules in those documents; this checklist owns repository work and completion evidence.

| Order | Implementation task | Dependency and status |
| --- | --- | --- |
| 1 | [Repair the shared WhatsApp action](#repair-the-shared-whatsapp-action) | Ready. Reuse the existing contact/runtime findings below |
| 2 | [Focus the homepage on rural regularization](#focus-the-homepage-on-rural-regularization) | Ready for content work; contact acceptance uses the repaired action |
| 3 | [Build the shared local template and Bragança page](#build-the-shared-local-template-and-bragança-page) | Uses the focused offer and repaired contact flow; local source collection can proceed alongside them |
| 4 | [Complete the other five required city pages](#complete-the-other-five-required-city-pages) | Uses the checked template; each city needs its own useful content and release evidence |

GTM/GA4/Ads configuration, billing, campaign creation, and live launch acceptance remain in the [parent task](../../../../00-inbox/_BACKLOG/build-blk-s-website-local-seo-and-google-ads-growth-system/task.md#implementation-handoff). Repository event tests do not prove live Google conversion delivery. Keep the other five paid campaigns paused under the [Bragança-first runbook](../../../../00-inbox/_BACKLOG/build-blk-s-website-local-seo-and-google-ads-growth-system/references/launch-runbook-proposal.md).

### Repair the shared WhatsApp action

- [ ] Reproduce and fix the existing [stored-attribution finding](#contact-runtime-reliability--first-priority) and [Enter/form finding](#contact-conversion--first-priority). Source checked on 10 November: `BaseLayout.astro` still accepts parsed `null` before `Object.keys`, and final-form submission only calls `preventDefault()`. The final composer still uses an anchor. These are source findings; runtime reproduction belongs to this task.
- [ ] Make malformed attribution JSON, unsupported value shapes, blocked storage, and malformed cookie encoding fall back safely. Reuse the existing attribution/WhatsApp helpers where sufficient. Keep valid first-touch behavior and direct link fallback. The custom seven-day source cookie remains diagnostic; Google's native action owns the agreed 30-day conversion window.
- [ ] Use one intentional activation path for pointer, keyboard, and form submission, with empty or completed optional fields. Preserve the current message when opening WhatsApp. One action emits one `whatsapp_click`; a second deliberate activation may emit a second raw event. Tracking failure must not block contact.
- [ ] Keep free-text fields and the composed message out of analytics. Add meaningful regression cases to the existing conversion/runtime suites for the failing inputs and Enter behavior. Do not add qualification, a required form, CRM, or a custom conversion-counting system.
- [ ] Verify with `npm run test:e2e -- tests/e2e/runtime-smoke.spec.ts tests/e2e/conversion-flow.spec.ts tests/e2e/navigation-whatsapp.spec.ts`. If shared library code changes, run its related unit tests and `npm run test`, as required by the [verification guide](agents/testing.md). Record exact commands and outcomes in the implementation handoff.

### Focus the homepage on rural regularization

- [ ] Apply the accepted copy and page journey to the existing Astro homepage. Use one static rural visual, visibly marked as an illustration, and five WhatsApp CTA positions. Keep municipality/situation optional. Retain the technical/partner boundary and keep starting price and response SLA internal.
- [ ] Remove the broad service journey, placeholder portfolio, and identifying platform screenshot from the active page. Confirm evidence for any retained credential. Use the existing style and components; a verified client case is a later improvement.
- [ ] Apply the agreed informational-notice behavior. Measurement starts with the page; dismissal only hides the notice. Align its text with the actual tracking and do not treat dismissal as consent. Reuse the existing [notice finding](#consent-and-runtime-policy); the user's decision resolves its old opt-in-versus-notice question.
- [ ] Update content, route, and UI expectations to the focused offer. The old five-service carousel is replaced, so its separate timer/pause cleanup is not a requirement to retain that component. Keep unrelated audit items outside this task.
- [ ] Run the relevant content unit checks, `npm run test:built`, and navigation/conversion/accessibility checks from the verification guide. Review narrow/mobile and desktop layouts and compare a mobile performance run under the same conditions. Record the result and any unresolved release issue.

### Build the shared local template and Bragança page

- [ ] Build one reusable template within the existing site, starting with `/regularizacao-rural/braganca-paulista/` from the campaign matrix. Include useful local information/media, sale and inheritance sections, the shared technical offer, and the same five contact positions. Reuse `#venda` and `#heranca` destinations only when their navigation/contact checks pass.
- [ ] Prepare Bragança coverage facts, local sources, and captioned media. Record source dates, publication rights, and page/template/media versions. A city-name substitution is insufficient; do not imply a local office or a completed local client job without evidence.
- [ ] Capture the existing per-URL search/link evidence before changing unfinished routes. Keep their paths, make the intended unfinished pages crawlable with `noindex`, omit them from the sitemap/navigation, and provide a useful link to the focused homepage. Preserve the privacy route and completed pages. Apply the exact route treatment from the website specification.
- [ ] Use the [local-page release guide](#local-page-release-guide) below. Update the current-surface and built-output expectations for this authorized, bounded local-page release. This is the first real non-homepage template, so apply shared rendering/performance checks to it without restoring archived rollout files.
- [ ] Run `npm run test -- tests/config/current-surface.test.ts`, `npm run test:built`, and the relevant routing, conversion, navigation, and accessibility e2e checks. Run `npm run check:links` against the tested preview. The page needs live destination and measurement acceptance before its ads run.

### Complete the other five required city pages

- [ ] Use the same template for **Caçapava, Taubaté, Pindamonhangaba, Atibaia, and Extrema**, with each URL taken from the campaign matrix. Keep one page per city; the earlier coherent-group option was not selected.
- [ ] Prepare useful local content and media for each page, record its source/version evidence, and apply the same release guide. Complete pages can be published for organic discovery while their campaigns stay paused. Their unfinished work does not block Bragança.
- [ ] Verify each city's destination and contact path before its own campaign activation. São José dos Campos and Jacareí remain deferred campaign locations. Keep the actual São José dos Campos business base accurate.

### Local-page release guide

This is the live source-and-validation guide for the six explicitly selected city pages. It satisfies the bounded page-release planning need described in [repo workflows](agents/repo-workflows.md) and [release guidance](agents/deployment-release.md). Broader generated-content rollouts still need their own scope and checks.

For each page release, record the URL/city, content and template versions, source/media references, reviewer, build or commit, release date, check results, and any remaining issue in the implementation evidence. A planned page is not a published or accepted page.

1. **Source and content:** Use the campaign matrix's city/URL mapping and the accepted website/offer decisions. Check real coverage, useful local information, media captions/rights, clear technical scope, and the optional contact fields.
2. **Rendered page:** Check crawlable copy, title/description, self-canonical, headings, internal links, intended indexing state, and sitemap membership. Check unfinished routes separately; do not block crawling of a page whose `noindex` must be read.
3. **Contact and data:** Test all five CTA positions and empty/completed form submission on desktop, mobile, and keyboard. Check one event per action and direct fallback. Inspect controlled payloads; the account task also checks automatic collectors so WhatsApp message text cannot leak through `link_url`.
4. **Shared foundation:** Check responsive image sizing, reserved media dimensions, lazy loading below the fold, focus/labels/contrast, no horizontal overflow, and no blocked contact controls. Extend the existing built-output/runtime checks to this real local template.
5. **Release and ads:** Follow the verification guide and review the deployed route. Record real Tag Assistant/GA4/Ads acceptance under the parent measurement task. Check the exact ad final URL, anchor behavior, and click-identifier preservation. A locally passing test suite alone does not authorize spend.

Historical backlog items below remain available. The current acquisition decisions take precedence over older broad-service, lead-capture, consent-gate, grouped-city, and bulk-discovery suggestions.

- How to use Google Forms as a free backend for my website's forms to capture leads: `docs/_Archive/backlog/lead-capture-offers-prd.md`

- Keep SEO/LLM indexing enrichment outside the Technical Performance PRD except for crawl/render overlap: built HTML should expose primary content, metadata, headings, and links without client JavaScript; OG/Twitter previews, JSON-LD, `/llms.txt`, FAQ schema, and local SEO strategy belong in the discovery/SEO backlog: `docs/_Archive/backlog/searchable-coverage-index-prd.md`

- Pending Performance Foundation follow-up: finish shared foundation checks only after the first real non-homepage public template ships. Reference issue: `docs/_Archive/issues/005-add-shared-foundation-checks-next-template.md`. Do not implement this against temporary support pages; resume the issue when a real Cluster Detail Page, Searchable Coverage Index, Local Service + City Page, or Lead Capture Offer page exists.

- Feedback: test having either less content in the main page and this be distributed in other 'tabs' or have a index nav button to move to the correct tab

- **Task: Create a Competitor Comparison Landing Page:** Build a dedicated landing page titled `[Competitor Name] Alternative` featuring a concise value proposition and a prominent Call-to-Action button above the fold, followed by an H2 section styled `[Competitor Name] vs [Your Brand]: Comparison` containing a direct features comparison table. This captures high-intent traffic from users actively looking to switch or researching options, while the specific formatting and structured table optimize the page to rank at the top of Google searches and get cited directly within AI search engine snippets. _(Ref: https://www.youtube.com/shorts/ZsIXK86RdwI)_

## Runtime Performance Audit Follow-Up

- Replace Flowbite runtime JS for nav collapse, FAQ accordion, and hero carousel with small local handlers. Current build emits shared layout JS on every route plus homepage carousel JS; the main sources are `src/layouts/BaseLayout.astro` and `src/components/HomeHeroShowcase.astro`.

- Move or gate attribution/contact tracking so placeholder routes without conversion elements do not load the full tracking chunk from `src/layouts/BaseLayout.astro`.

- Reduce proof-logo image variants if retina logo quality is not materially needed. `src/components/HomeProofBand.astro` currently emits 152w and 304w for each logo.

## Ponytail Audit Follow-Up

- `delete:` Remove the unused `homepageSectionOrder` export and `HomepageSectionId` type; the order is only stored in `homepageContent` and has no consumer, so it adds configuration surface without changing rendering. [src/lib/homepage-content.ts]
- `shrink:` Remove the `isBrandIconName` runtime guard and `brand-icons.ts` type predicate; `src/content/config.ts` already constrains footer icons to the same four-name union, so the layout can pass the validated icon directly to `BrandIcon`. [src/lib/brand-icons.ts, src/layouts/BaseLayout.astro, src/content/config.ts]

Audit estimate: -13 lines, -0 dependencies possible.

## Ponytail Audit Follow-Up — Additional Findings

- `delete:` Remove the unused `contact.whatsapp.nav_intro` and `contact.whatsapp.footer_intro` schema/config fields; no runtime code reads them, so they add content-model surface without behavior. [src/content/config.ts, src/content/site/global.yaml]
- `delete:` Remove the unused `@vitest/coverage-v8` development dependency; no package script or test imports the coverage provider. [package.json, package-lock.json]
- `shrink:` Inline the one-use `isExternalHref` predicate or share a single URL helper with the navigation path; `BaseLayout.astro` currently repeats the same `/^https?:\\/\\//` test in two forms. [src/layouts/BaseLayout.astro]

Audit estimate: -6 lines, -1 dependency possible.

## Ponytail Audit Follow-Up — Current Scan

- `delete:` Remove `summary` from `HomepageCluster` and its five values; the cluster summary is never read because homepage cards use the separate `summaries` map in `homepage-content.ts`. [src/lib/homepage-clusters.ts, src/lib/homepage-content.ts]

Audit estimate: -6 lines, -0 dependencies possible.

## Ponytail Audit Follow-Up — 2026-07-31

- `delete:` Remove the direct `playwright` development dependency and its lockfile entry; the Playwright config imports `@playwright/test`, which already supplies the matching Playwright runtime, and no source file imports the direct package. [package.json, package-lock.json, playwright.config.ts]
- `delete:` Remove the unused `src/lib/datalayer.ts` helper and its isolated unit test; production tracking pushes directly to `window.dataLayer` from `src/layouts/BaseLayout.astro`, leaving this module with no runtime consumer. [src/lib/datalayer.ts, tests/lib/datalayer.test.ts]

Audit estimate: -20 lines, -1 dependency possible.

## Ponytail Audit Follow-Up — 2026-09-13

### Runtime performance and duplication

- `src/components/GtmHead.astro:L11-L18` — remove the eager third-party GTM script from the document head → keep the consent/dataLayer bootstrap inline and append the loader after first paint/idle; `BaseLayout.astro` renders this component on every public and placeholder route, so every page currently downloads and parses GTM before interaction requires it.
- `src/layouts/BaseLayout.astro:L236` — remove the inline attribution key list and `readCurrentParams` implementation → call the tested `parseAttributionParams(window.location.search)` helper from `src/lib/attribution.ts`; both paths extract the same six keys, so one parser preserves behavior and removes duplicated client logic.
- `src/components/GtmHead.astro:L2-L7` — remove the second `getSiteConfig()` lookup → pass the already-resolved GTM ID from `BaseLayout.astro` into a typed prop; the layout loads the same site entry at `src/layouts/BaseLayout.astro:L28` and is the only caller of `GtmHead`.

### Dead surface and interaction quality

- `src/components/HomeHeroShowcase.astro:L34-L47` — remove the unused secondary-CTA props, external-href check, and conditional link → keep the primary-CTA-only interface; the sole caller passes no secondary prop, so this branch cannot render.
- `src/components/HomeHeroShowcase.astro:L253` — replace unconditional `start()` on `focusout` with a related-target containment check → `focusout` bubbles when focus moves between the carousel’s dot buttons, so the current handler can restart auto-rotation while keyboard focus remains inside the carousel.
- `src/components/HomeHeroShowcase.astro:L94` — remove the unused `data-carousel-item`/`data-active` attributes and matching `data-active` writes → use the existing `aria-hidden` and `hidden` state; the component constructs Flowbite’s carousel directly, queries only `[data-carousel-slide]`, and no test or other source reads these attributes.

### Configuration consistency

- `src/layouts/BaseLayout.astro:L60` — remove the hard-coded `lang="pt-BR"` → bind `siteConfig.meta.language_code`; the validated schema and `src/content/site/global.yaml:L3` already carry the locale, so future locale changes do not silently leave the document language stale.

## Ponytail Audit Follow-Up — 2026-09-27

### Dead API and render surface

- `src/layouts/BaseLayout.astro:L18-L25,L68` and `src/components/SeoHead.astro:L6-L18` — remove the unused `jsonLd` prop and JSON-LD emission path → keep the SEO component limited to title, description, and canonical metadata until a real page needs structured data; no current page passes `jsonLd`, and the active TODO explicitly places JSON-LD in the SEO backlog. Check: `npm run test:built` after the removal.
- `src/layouts/BaseLayout.astro:L188` — remove the `"note" in column` branch → render the known footer column shape directly; `src/content/config.ts` permits only `title` and `links`, the synthetic Contact column has the same shape, and no source/config entry provides `note`. Check: `npm run test:e2e -- tests/e2e/footer-social.spec.ts`.

### Validation duplication

- `src/content/config.ts:L3-L16` — replace the identical `navLink` and `footerLink` schemas with one shared `siteLink` schema → both currently validate exactly `{ label, href }`, so one definition preserves the content contract while removing a future divergence point. Check: `npm run test:built`.

Audit estimate: -10 lines, -0 dependencies possible.

## Simplify Audit Follow-Up — 2026-10-11

### Consent and runtime policy

- `src/components/GtmHead.astro:L8-L18`, `src/components/SimpleCookieNotice.astro:L23-L51`, and `src/lib/consent.ts:L10-L17` — reconcile the cookie UI with the runtime policy: GTM loads immediately and all consent categories default to `granted`, while the only user action stores a dismissal. If this is a consent gate, default to denied and load or update tags after explicit consent; if continued browsing is the intended basis, remove the consent-state wording and dismissal-as-consent expectation. Check: `npm run test:e2e -- tests/e2e/runtime-smoke.spec.ts`.

### Proof-band contract and test drift

- `tests/e2e/home-hero-showcase.spec.ts:L253,L274` conflicts with `src/lib/homepage-content.ts:L17-L143` and `tests/lib/homepage-content.test.ts:L174-L178`: the e2e suite expects 18 rendered proof images, while the active content model and unit test define 20 logo-backed items. Update the assertion to the current contract or derive it from the rendered data so future logo additions do not create stale failures. Check: `npm run test:e2e -- tests/e2e/home-hero-showcase.spec.ts`.
- `src/components/HomeProofBand.astro:L31-L65` and `src/lib/homepage-content.ts:L17-L21` — replace `item.logo as keyof typeof proofLogoAssets` with a shared literal logo-name type or registry. The current cast bypasses compile-time validation and turns a misspelled asset name into a runtime build error. Check: `npm run test:built`.

### Configuration consistency

- `src/layouts/BaseLayout.astro:L35,L196` — move the hard-coded legal entity and CNPJ into the validated site config (`src/content/config.ts` and `src/content/site/global.yaml`) so footer legal data shares the same source of truth as the brand, contact, and locale values. Check: `npm run test:e2e -- tests/e2e/footer-social.spec.ts`.

### Dependency maintenance

- `package.json` and `package-lock.json` — review the locked build dependency tree before the next release: `npm audit --omit=dev --audit-level=high` currently reports 12 production-tree vulnerabilities, including a critical Astro advisory and high-severity `sharp`, `vite`, `postcss`, and related transitive advisories. Plan compatible updates and verification instead of running `npm audit fix --force`, which proposes a breaking Astro major upgrade.

## Simplify Audit Follow-Up — 2026-10-25

### Contact runtime reliability — first priority

- `src/layouts/BaseLayout.astro:L246-L256,L302-L342` — validate stored attribution before use. `JSON.parse` can return `null`, which makes `Object.keys(stored)` throw outside the parse error handler. This stops the shared script during the first WhatsApp link update, before contact listeners and the final composer are set up. Arrays and scalar values also pass through without a valid attribution shape. Use one small reader for session storage and cookie data that accepts only known attribution keys with string values and falls back to an empty object. Handle invalid cookie percent encoding in the cookie reader, including the landing-page fallback. Check: extend `tests/e2e/runtime-smoke.spec.ts` and `tests/e2e/conversion-flow.spec.ts` with stored JSON `null`, arrays, scalar values, and malformed cookie encoding; confirm no page errors, working composer updates, and valid first-touch fallback.

### Attribution storage efficiency

- `src/layouts/BaseLayout.astro:L320-L342,L358-L375,L456-L487` — separate attribution reads from persistence. Each `readAttribution()` call parses storage and current URL parameters, then writes session storage and a cookie when attribution is present. Setup calls it once per WhatsApp link, once for the final composer, and again at the end; every composer input/change repeats the writes. Resolve attribution once per page and reuse it for link and form updates. Refresh persistence at defined points, such as page initialization and contact clicks, while keeping first-touch merging, cookie fallback, and rolling seven-day expiry. Check: run `npm run test:e2e -- tests/e2e/conversion-flow.spec.ts` and count storage/cookie writes during setup and typing; unchanged form input must not write attribution again.

## Simplify Audit Follow-Up — 2026-11-01

### Contact conversion — first priority

- `src/components/HomeFinalWhatsAppComposer.astro:L34-L71` and `src/layouts/BaseLayout.astro:L465-L483` — make form submission use the WhatsApp action. The form has one text input and an anchor instead of a submit button. Pressing Enter in the input can submit the form, but the submit handler only calls `preventDefault()`. It neither opens WhatsApp nor records the contact event. Route form submission and CTA activation through one action that reads the current fields, builds the URL, and records one event. Keep the existing link fallback. Check: extend `tests/e2e/conversion-flow.spec.ts` to press Enter in the location input and activate the CTA by keyboard; each action must open the expected URL with current field values and record exactly one `whatsapp_click` event.

### Carousel control and runtime efficiency

- `src/components/HomeHeroShowcase.astro:L183-L188,L225-L258` — provide an explicit pause/resume control and stop the interval while the document is hidden. The carousel starts a repeating timer for users without reduced motion, with no visibility handler. Hover and focus pause it only temporarily; clicking a slide dot stops it but also changes the selected slide, and there is no control to resume rotation. Reuse the existing `start()` and `stop()` functions with a user pause state and a document visibility check. Returning to the page must preserve a user pause and must not create a second timer. This is separate from the existing focus-transfer finding. Check: extend `tests/e2e/home-hero-showcase.spec.ts` to cover pause/resume, no slide changes while hidden, visibility restoration, and reduced motion; confirm each resume creates at most one interval.

## Improve Design
- https://www.youtube.com/shorts/zP_nXzGlk2I
- https://www.youtube.com/watch?v=DNSXlBmukck
- https://www.youtube.com/watch?v=f2mGqlLLqok
- https://github.com/pbakaus/impeccable


## Improve SEO

- **Agreed initial local-page scope — reconciled 10 November 2026:** Keep the homepage as the general rural service page and create **six separate city pages** using one template: Bragança Paulista, Caçapava, Taubaté, Pindamonhangaba, Atibaia, and Extrema. Bragança receives the first spend; each other city page is required before its own campaign activates. The earlier city-group option was not selected. Follow the [implementation sequence](#rural-acquisition-implementation--2026-11-10), [local-page release guide](#local-page-release-guide), and [campaign matrix](../../../../00-inbox/_BACKLOG/build-blk-s-website-local-seo-and-google-ads-growth-system/references/campaign-matrix-proposal.md). Further cities and neighborhood pages remain later work. Implementation is still pending.

- Validate target keyword in webpage SEO layout (Page title, URL slug, H1, first sentence)
