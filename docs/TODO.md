- How to use Google Forms as a free backend for my website's forms to capture leads: `docs/Archive/backlog/lead-capture-offers-prd.md`

- Keep SEO/LLM indexing enrichment outside the Technical Performance PRD except for crawl/render overlap: built HTML should expose primary content, metadata, headings, and links without client JavaScript; OG/Twitter previews, JSON-LD, `/llms.txt`, FAQ schema, and local SEO strategy belong in the discovery/SEO backlog: `docs/Archive/backlog/searchable-coverage-index-prd.md`

- Pending Performance Foundation follow-up: finish shared foundation checks only after the first real non-homepage public template ships. Reference issue: `docs/Archive/issues/005-add-shared-foundation-checks-next-template.md`. Do not implement this against temporary support pages; resume the issue when a real Cluster Detail Page, Searchable Coverage Index, Local Service + City Page, or Lead Capture Offer page exists.

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

## Improve Design
- https://www.youtube.com/shorts/zP_nXzGlk2I
- https://www.youtube.com/watch?v=DNSXlBmukck
- https://www.youtube.com/watch?v=f2mGqlLLqok
- https://github.com/pbakaus/impeccable


## Improve SEO
- Validate target keyword in webpage SEO layout (Page title, URL slug, H1, first sentence)
