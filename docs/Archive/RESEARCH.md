# Research Notes

## Reference Page SEO Learnings

Date: 2026-05-19

This note captures practical lessons from reference pages reviewed while shaping the Astro + Flowbite site. The goal is to separate useful patterns from risky or non-replicable implementation choices.

### Summary

The strongest reusable pattern is not a special SEO technology. The useful pattern is a clear commercial page architecture:

1. A focused headline that matches the search or ad intent.
2. Concrete service/product vocabulary in headings, body copy, image text, and CTAs.
3. Strong internal linking between related service, city, and supporting content pages.
4. Visual proof and domain-specific examples.
5. A low-friction conversion path, usually WhatsApp or a short contact form.

For this project, keep the best parts of those references but implement them with Astro-rendered HTML, real metadata, sitemap output, canonical URLs, and structured data.

### HC2 and GGES

Reference pages:

- `https://www.hc2solucoes.com.br/`
- `https://www.gges.com.br/`

Observed pattern:

- Keyword-targeted URLs, titles, headings, and body copy.
- Many crawlable internal links between related service pages.
- Large lists of regions/cities and related pages.
- Basic metadata and sitemap coverage.
- Aggressive exact-match keyword repetition.

Learning:

These pages appear to rank because they execute standard SEO mechanics at scale: exact-match service pages, internal linking, and crawlable static content. This is simple and replicable, but the city/region blocks can drift toward doorway-page risk if the page does not provide unique local value.

Application here:

- Use programmatic service and service+city pages, but keep them useful.
- Each city/service page should include local proof, neighborhoods, FAQs, delivery constraints, and CTA context.
- Avoid publishing thin pages that only swap a city name.

### RenovaGeo

Reference page:

- `https://www.renovageo.com.br/`

Observed pattern:

- Strong product/category positioning around GNSS, RTK, SLAM, batimetry, software, and mapping equipment.
- Good commercial vocabulary and product specificity.
- Current live HTML is mostly a JavaScript app shell, with content rendered client-side.
- Routes share very similar server HTML.
- Sitemap behavior was not a strong reference at the time of review.

Learning:

RenovaGeo is useful as a product-positioning reference, not as a technical SEO reference. Its strongest signal is specific vocabulary and concrete product taxonomy, not a special HTML/CSS trick.

Application here:

- Use concrete technical terms on service pages: deliverables, equipment, accuracy, file formats, process, constraints, and use cases.
- Keep these terms visible in server-rendered HTML, not only in client-side JavaScript.

### AutoSite

Reference page:

- `https://www.autosite.com.br/`

Observed pattern on 2026-05-19:

- Hosted on Hostinger Horizons.
- Server HTML is a Vite/React-style app shell with `div#root`.
- Server title was `Hostinger Horizons`.
- No server-rendered H1, body copy, internal links, images, JSON-LD, or meta description.
- `robots.txt` and `sitemap.xml` returned the same app shell HTML instead of real crawl files.
- Real page copy appears only inside the JavaScript bundle.
- The JavaScript bundle still contained unused demo/template content.

Useful content/story pattern:

- Strong positioning: "Inovação aplicada para resolver os problemas reais da obra".
- Good problem framing: before, during, and after execution.
- Concrete domain vocabulary: BIM, nuvem de pontos, monitoramento de obra, locação robotizada, realidade virtual.
- Visual-first sections and repeated CTAs.
- Contact flow aimed at qualified leads.

Learning:

AutoSite is a good single-page narrative and visual reference, but a weak SEO implementation reference. Copy the story structure, not the technical architecture.

Application here:

- Build single-page sections with a strong narrative arc:
  - Hero with problem/solution clarity.
  - Problems by project phase.
  - Concrete solutions and deliverables.
  - Differentiators.
  - CTA/contact block.
- Keep all key copy, headings, images, links, metadata, and schema visible in Astro-generated HTML.
- Ensure `robots.txt` and `sitemap.xml` are real files/routes, not SPA fallbacks.

### Ranqia

Reference pages:

- `https://www.ranqia.ai/`
- `https://www.ranqia.ai/robots.txt`
- `https://www.ranqia.ai/sitemap.xml`
- `https://www.ranqia.ai/llms.txt`

Observed pattern on 2026-05-19:

- Strong conventional SEO metadata: title, description, canonical, robots meta, Open Graph, Twitter card, locale, and `hreflang`.
- Structured data includes `Organization`, `WebSite`, and `FAQPage`.
- FAQ content is present both in visible page content and JSON-LD.
- `robots.txt` references the sitemap and `llms.txt`, and explicitly names AI crawlers.
- `llms.txt` gives a concise machine-readable summary of brand positioning, services, market context, people, FAQs, and canonical links.
- Sitemap includes `lastmod`, `changefreq`, `priority`, and alternate language links.
- Brand/entity signals are clear: `sameAs`, LinkedIn/GitHub references, people, `knowsAbout`, and market/domain vocabulary.

Learning:

Ranqia is a useful reference for GEO/AEO execution because it combines standard SEO hygiene with machine-readable AI context. The most transferable pattern is not the exact design or copy, but the layered retrieval surface: normal page metadata, structured data, sitemap freshness, crawler instructions, and a dedicated `llms.txt` file.

The `robots.txt` should not be copied verbatim. The reviewed file had both managed crawler restrictions and later manual allow rules for some of the same AI crawlers. For this project, use a clean policy that clearly states which crawlers are allowed and links to `llms.txt`.

Application here:

- Expand `SeoHead.astro` with robots meta, OG image, Twitter card metadata, locale, and optional `hreflang`.
- Add `/llms.txt` with BLK Aero context: services, service areas, trust facts, canonical URLs, contact path, and FAQ-style answers.
- Improve `robots.txt` with sitemap and `llms.txt` references plus an explicit, non-conflicting AI crawler policy.
- Expand schema generation to include linked `Organization`/`LocalBusiness`, `WebSite`, `WebPage`, `Service`, `FAQPage`, `BreadcrumbList`, `Person`/`ProfilePage`, and `Article` where relevant.
- Wire service and city `updated_at` into visible "Ultima atualizacao" text and JSON-LD `dateModified`.
- Emit service `faqs` and city `local_faqs` as visible FAQ content and `FAQPage` JSON-LD.
- Emit service `mentions` as `Thing` entities with `sameAs` URLs.
- Add `speakable` selectors for BLUF and spec sections so answer engines can reliably extract concise summaries.
- Treat `/sobre` as an entity verification page, not just an about page: visible trust data plus Person schema linked to Organization.

### Hosting Platform Learning (Free + Reliable + Dev Branch Testing)

Date: 2026-05-19

Context:

- The site is currently hosted on GitHub Pages, which works for `main` deployment but does not provide first-class dev branch preview flows for remote QA.
- The goal is high reliability with a free-tier option and easy branch/PR preview URLs.

Decision:

- Prefer **Cloudflare Pages** as the primary hosting option for this Astro static site.

Why:

- Native branch and PR preview deployments are a strong fit for remote testing of `dev` and feature branches.
- Static sites benefit from Cloudflare's globally distributed edge delivery model.
- Free plan is generally practical for static workloads; key operational cap is monthly build volume, not static request count.

Tradeoff comparison:

- **Cloudflare Pages**: best balance for free + reliable static delivery + branch previews.
- **Vercel**: excellent preview workflow, but hobby-tier limits can be tighter for frequent CI/deploy usage.
- **Render**: viable, but free-tier constraints and operational model are usually less favorable for this static-site use case.
- **GitHub Pages**: stable for simple production publishing, but weaker for branch preview-based QA workflows.

Application here:

- Keep production delivery on a static-first platform with branch preview support.
- Use branch preview URLs as part of PR QA checklists before merge.
- If free-tier constraints become a bottleneck later (build volume/concurrency), reassess Vercel or paid Cloudflare options based on observed deployment frequency.

## Design Direction References

Date: 2026-05-19

This note captures design inputs that should inform the homepage and related BLK marketing surfaces. It complements `DESIGN.md`: keep Flowbite/Tailwind as the implementation baseline, but use these references to sharpen visual language, proof presentation, and cross-format consistency.

### Inputs to consider

- Google Stitch project: `https://stitch.withgoogle.com/projects/2641120899099524100`
  - Atlas access was attempted, but ChatGPT Atlas did not expose tab scripting in this environment and the project could not be inspected directly.
  - Treat the project as the source location for the BLK design exploration. The visual direction below is derived from the provided `/Users/lupion/Downloads/design.png` reference and should be considered the self-contained summary until the Stitch project is reviewed manually.
- YouTube design video: `https://www.youtube.com/watch?v=DNSXlBmukck`
  - User-provided takeaways are incorporated below so this research note is self-contained.
- Local design research report: `/Users/lupion/Downloads/deep-research-report.md`
  - Useful for design-token thinking, accessibility gates, cross-format color consistency, and avoiding palette drift between website, slides, PDFs, and social assets.
- Visual reference image: `/Users/lupion/Downloads/design.png`
  - Useful for BLK-specific visual direction: technical white space, point-cloud/contour imagery, lime measurement marks, report/portal examples, and brand/proposal/social layouts.

### AI-design caution from the YouTube reference

The video should be treated as a warning against generic AI-generated design rather than as a source of visual components to copy.

Relevant takeaways:

- AI design tools can make websites look alike by overusing common patterns such as purple gradients and generic SaaS hero sections.
- Intricate hover effects, animation excess, and scroll-jacking can distract from the core product message.
- Founders still need to act as human editors. AI can accelerate design production, but the business owner must protect originality, clarity, and strategic intent.
- The video notes a multi-year surge in web animations, but the relevant lesson here is not "add more motion"; it is to use motion only when it clarifies the product or proof.
- Core principle: do not outsource thinking to LLMs or AI design tools.
- Why it matters for BLK: a generic AI-designed landing page would weaken credibility. The site is a customer-acquisition surface for technical trust, so it needs BLK-specific evidence, real deliverables, and disciplined visual language instead of trendy effects.

Application here:

- Avoid generic AI-site signatures: purple/blue gradients, floating glass cards, abstract glowing blobs, overanimated hover states, scroll-jacking, and template SaaS copy.
- Use animation sparingly: subtle reveal or hover feedback is fine; anything that competes with the message, evidence, CTA, or technical content should be removed.
- Keep the homepage grounded in BLK's actual domain: terrain, maps, point clouds, reports, QC, standards, client visualization, and proof of delivery.
- Treat AI-generated mockups as drafts that must be edited back toward BLK's real positioning and assets.

### Design-token and accessibility learnings

The local report argues for a token-based color system rather than one-off swatches. The transferable pattern is:

1. Define primitive ramps first: neutrals, brand lime, charcoal, and any supporting accent ramps.
2. Map those primitives into semantic roles: page background, surface, text, muted text, border, primary action, focus ring, success/warning/error, proof badge, and technical measurement mark.
3. Export the same tokens across website, slides, PDF/proposal templates, and social templates so the BLK brand does not drift by format.
4. Validate text contrast, UI indicator contrast, focus states, and color-blind readability before treating a palette as approved.
5. Do not rely on color alone. Pair lime/green validation cues with labels, icons, borders, or numeric evidence.

Application here:

- Keep the site light, technical, and high-contrast; use lime as a precise measurement/action accent, not as a full-page flood.
- Keep neutral surfaces doing most of the work: white, gray, charcoal, hairline borders, and measured spacing.
- Reserve saturated lime for CTA accents, coordinate/measurement marks, validation cues, and selected states.
- Treat slide decks, proposal PDFs, social posts, and the website as one system. A future token file or style export should be able to drive all of them.

### Visual direction from the BLK Stitch/image reference

The Stitch/image reference points to a strong BLK-native visual system. It should be treated as a directional board for the website, reports, platform, proposals, and social surfaces.

Self-contained reference summary:

- Brand promise direction: "terrain to decision", "evidence to confidence", and "real terrain / reliable evidence / better decisions".
- Logo use: preserve the BLK mark, clear space, charcoal + lime identity, and simple no-distortion rules.
- Color system: near-white backgrounds, deep charcoal typography, gray technical linework, and saturated BLK green/lime for accents, measurement marks, CTAs, and validation cues.
- Typography direction: clean technical sans-serif, high readability, strong uppercase section labels, large confident headlines, and restrained metadata text.
- Graphic system: contour lines, coordinate grids, crosshairs, measuring marks, point-cloud topography, orthomosaic references, boundary annotations, north arrows, scale bars, and elevation ticks.
- Service-card direction: compact cards with technical thumbnails for topographic mapping, volumetry/stockpile, rural regularization, REURB/urban mapping, construction monitoring, environmental/ESG, energy/infrastructure, and asset due diligence.
- Report/deliverable direction: technical-report covers and internal pages that show execution summary, survey methodology, results, orthomosaic, contour map, volumetry, metadata, QC, traceability, and audit readiness.
- Platform direction: "single source of truth" portal showing orthomosaic, 3D point cloud, quality control, checkpoint counts, change analysis, cut/fill volumes, deliverables, reports, users, and settings.
- Proposal/social direction: concise evidence-led statements, point-cloud terrain backgrounds, coordinate overlays, lime markers, and report/proposal mockups.

- Large white/near-white canvas with disciplined grid spacing.
- Black/charcoal typography and logo usage, with lime as a precise technical accent.
- Point-cloud terrain, contour lines, orthomosaic snippets, crosshairs, coordinate labels, scale bars, elevation ticks, and measuring marks as recurring graphics.
- Technical panels that look like reports, dashboards, maps, QC readouts, and proposal pages rather than generic SaaS cards.
- Evidence-first visual language: terrain, measurements, metadata, accuracy, traceability, audit readiness, and deliverables.
- Platform/portal visuals should show actual delivery value: orthomosaic, 3D point cloud, quality-control values, change analysis, volume summaries, deliverable organization, and export/report affordances.
- Social/proposal visuals can reuse the same graphic system: point-cloud backgrounds, coordinate overlays, lime markers, concise claims, and report-like composition.

Application here:

- The homepage hero and proof sections should use real/credible geospatial visuals, not generic drone stock imagery.
- Service cards and cluster pages can use light technical illustrations from the same grammar: contours for topography, parcel boundaries for regularization, cut/fill heatmaps for volumetry, and point-cloud/digital-twin frames for 3D/monitoring.
- The client visualization platform should be represented with a dashboard-like surface showing orthomosaic + point cloud + QC/deliverables, matching the portal panel in the reference image.
- Avoid decorative gradients, abstract blobs, and purely atmospheric imagery. Visuals should make the deliverable inspectable or the method credible.
- Use compact technical metadata blocks for values such as accuracy, area, dates, checkpoints, PEC-PCD, volume, coordinates, and deliverables.

### Cross-format brand implications

The visual reference is not only a website direction; it also suggests a shared BLK system for proposals, technical reports, social posts, and platform screens.

Use one graphic language across formats:

- Website: hero, proof band, triage cards, deliverables, platform preview, and method section.
- Reports/PDFs: cover pages, execution summary, survey methodology, orthomosaic/contour/volumetry pages, metadata, QC, traceability, and audit-ready appendices.
- Platform: overview, maps, orthomosaic, 3D point cloud, QC/CCP, deliverables, reports, users, settings.
- Social/proposal assets: concise evidence-led statements, point-cloud terrain, coordinates, lime measurement marks, and report/proposal mockups.

Design success criteria:

- A non-technical buyer understands what BLK delivers and why it matters.
- A technical reviewer sees enough signs of rigor: standards, checkpoints, PEC-PCD, QC, metadata, file outputs, and traceability.
- The page feels like a geospatial evidence company, not a generic drone-video company.
- The design remains Flowbite/Tailwind-friendly: use clean sections, tables, badges, buttons, grids, tabs/accordions where useful, and restrained cards for repeated items.

### Implementation Principles for This Site

1. Use Astro static rendering for SEO-critical pages.
2. Keep H1, BLUF, specs, CTAs, image alt text, internal links, and schema in initial HTML.
3. Use JavaScript for enhancement only: calculators, interaction tracking, lazy embeds, and UI polish.
4. For single-page experiences, preserve page-source quality: title, description, canonical, JSON-LD, real headings, and crawlable links.
5. Treat city/service page scale carefully. Publish fewer stronger pages before many thin pages.
6. Prefer proof-rich local content over keyword stuffing.
7. Keep reference-inspired visual polish, but avoid hiding the actual content behind client-side rendering.
8. Build a machine-readable AI discovery layer with `llms.txt`, clear crawler policy, and schema that links entities by stable `@id` values.
9. Keep the design system token-driven so web, proposals, reports, social graphics, and platform surfaces share the same BLK color, typography, and graphic grammar.
10. Use BLK-specific technical imagery: point clouds, contours, orthomosaics, coordinate marks, scale/elevation references, QC readouts, and report/portal surfaces.
