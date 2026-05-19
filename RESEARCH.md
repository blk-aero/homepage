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

### Implementation Principles for This Site

1. Use Astro static rendering for SEO-critical pages.
2. Keep H1, BLUF, specs, CTAs, image alt text, internal links, and schema in initial HTML.
3. Use JavaScript for enhancement only: calculators, interaction tracking, lazy embeds, and UI polish.
4. For single-page experiences, preserve page-source quality: title, description, canonical, JSON-LD, real headings, and crawlable links.
5. Treat city/service page scale carefully. Publish fewer stronger pages before many thin pages.
6. Prefer proof-rich local content over keyword stuffing.
7. Keep reference-inspired visual polish, but avoid hiding the actual content behind client-side rendering.
8. Build a machine-readable AI discovery layer with `llms.txt`, clear crawler policy, and schema that links entities by stable `@id` values.
