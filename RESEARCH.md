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

### Implementation Principles for This Site

1. Use Astro static rendering for SEO-critical pages.
2. Keep H1, BLUF, specs, CTAs, image alt text, internal links, and schema in initial HTML.
3. Use JavaScript for enhancement only: calculators, interaction tracking, lazy embeds, and UI polish.
4. For single-page experiences, preserve page-source quality: title, description, canonical, JSON-LD, real headings, and crawlable links.
5. Treat city/service page scale carefully. Publish fewer stronger pages before many thin pages.
6. Prefer proof-rich local content over keyword stuffing.
7. Keep reference-inspired visual polish, but avoid hiding the actual content behind client-side rendering.
