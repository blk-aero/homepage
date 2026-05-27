# Alignment and Grilling Document - BLK Aero

This document consolidates all open questions, gaps, and decisions regarding UX, conversion, digital marketing, privacy compliance, advanced SEO/AEO, and operations. These points were identified during the transition of the archived PRDs and research docs (`docs/Archive/`) into the current `docs/backlog_prd.md`.

This file serves as the **single source of truth for all outstanding design decisions**, removing the need to consult the files in `/Archive` for future backlog work.

---

## 1. UX & Conversion Elements

### 1.1 The "ServiceMatcher" / Quick Calculator
*   **Source**: `docs/Archive/draft_prd.md` (Milestone 1, Step 1D)
*   **Context**: The original PRD specified a lightweight client-side interactive module (ServiceMatcher / Quick Calculator) containing a 2-4 field form to increase on-page dwell time, reduce bounce rates, and dynamically pre-fill the WhatsApp CTA message.
*   **Gap**: The current `backlog_prd.md` omits this engagement tool, relying solely on static cards.
*   **Decision**: Should we reintroduce the ServiceMatcher on the solution cluster landing pages?
    *   *Recommendation*: Yes, reintroduce it as an optional interactive module at the top of the cluster pages, firing a `service_matcher_complete` event to GTM.

### 1.2 Risk Reversal & Guarantees
*   **Source**: `docs/Archive/initial_prd.md` (Milestone 4, Step 1D)
*   **Context**: A core marketing principle requires placing a guarantee or risk-reversal statement (e.g., "Automatic re-flight within 48h due to weather conditions at no extra cost") directly adjacent to or below the primary CTA buttons to reduce user friction.
*   **Gap**: Omitted from the CTA component specifications in the new PRD.
*   **Decision**: Should we standardize rendering a short guarantee note above/below all `WhatsAppCTA` and Lead Magnet form buttons?
    *   *Recommendation*: Yes, add a `guarantee` field in the solutions frontmatter and render it directly under the CTA buttons.

### 1.3 "Us vs. Others" Comparison Table
*   **Source**: `docs/Archive/draft_prd.md` (Step 2, `competitor_comparison`)
*   **Context**: The draft PRD required a concrete 3-6 row comparison table explicitly showing trade-offs of the BLK method (drone + GNSS control points) against traditional topography or low-accuracy drone flights.
*   **Gap**: Omitted or treated as an optional detail, reducing landing page conversion strength.
*   **Decision**: Should the comparison table be a mandatory block on all solution pages?
    *   *Recommendation*: Yes, it prevents the programmatic pages from looking like generic local SEO doorway pages by adding real commercial persuasion.

---

## 2. Narrative Alignment

### 2.1 The Single-Page Narrative Arc
*   **Source**: `docs/Archive/RESEARCH.md` (AutoSite competitor benchmark) and `docs/Archive/DESIGN.md`
*   **Context**: High-converting engineering landing pages must follow a linear narrative arc: *Problem (BLUF) → Work Method → Concrete Deliverables → Differentiators (Us vs. Others) → Proof Snippets → Objection FAQs → Final CTA*.
*   **Gap**: The new PRD lists the elements but does not enforce the exact vertical section ordering in the page layout.
*   **Decision**: Should we enforce a strict section ordering for the Solution and Solution+City page templates?
    *   *Recommendation*: Yes, hardcode the vertical layout structure to match the researched high-converting competitor pattern.

### 2.2 Lighthouse Accessibility Gates
*   **Source**: `docs/Archive/initial_prd.md` (PRD Targets / KPIs)
*   **Context**: Previous specs established a strict launch blocker of `Lighthouse Accessibility >= 90` to ensure WCAG 2.2 color contrast, keyboard focus order on carousels, and ARIA labels.
*   **Gap**: The new backlog focus is limited to load speeds and Core Web Vitals, omitting the accessibility constraint.
*   **Decision**: Maintain `Lighthouse Accessibility >= 90` as a strict release gate?
    *   *Recommendation*: Yes, the automated accessibility test in Playwright (`accessibility-smoke.spec.ts`) must remain active.

---

## 3. Advanced SEO & AEO Data

### 3.1 Semantic Anchoring (`mentions` via Wikidata/Wikipedia)
*   **Source**: `docs/Archive/initial_prd.md` (AEO Schema rules)
*   **Context**: To prevent "LLM perception drift" on AI search engines, core concepts like "Topografia" and "REURB" must have a `mentions` array in the JSON-LD linking to Wikidata entities (e.g., Wikidata Q188554 for topography).
*   **Gap**: Missing clear mappings between markdown frontmatter and JSON-LD output.
*   **Decision**: Implement a `mentions: [{name: string, sameAs: string}]` array in the solutions collection config?
    *   *Recommendation*: Yes, map it in the solutions schema and automatically inject it into the `Service` JSON-LD.

### 3.2 Speakable Schema (`SpeakableSpecification`)
*   **Source**: `docs/Archive/initial_prd.md` (AEO requirements)
*   **Context**: Voice search and AI crawlers need to know exactly which DOM elements to read. The schema should define a `speakable` node targeting the `#summary` selector (BLUF) and `#specs` selector (definition list).
*   **Gap**: The new PRD specifies the HTML IDs but omits the JSON-LD Speakable schema configuration.
*   **Decision**: Should we inject the `speakable` node into the page metadata block?
    *   *Recommendation*: Yes, target the selectors `["#summary", "#specs"]` in the structured data helper.

### 3.3 Real-time IndexNow Integration
*   **Source**: `docs/Archive/remaining_prd_work.md` (IndexNow verification)
*   **Context**: Since programmatic pages are generated frequently, deploys should automatically notify Bing/Yandex about URL changes using IndexNow.
*   **Gap**: The previous script `scripts/indexnow.mjs` was removed. We need to implement a clean post-build notification workflow.
*   **Decision**: Reintroduce the IndexNow execution step in the post-build pipeline?
    *   *Recommendation*: Yes, write a lightweight post-build script that reads `sitemap.xml` and submits updated URLs using the env key.

---

## 4. Marketing & Google Ads Integration

### 4.1 Offline Conversion Import (OCI) Strategy
*   **Source**: Google Ads Smart Bidding / Value-Based Bidding best practices
*   **Context**: Optimizing campaigns only for initial WhatsApp clicks leads to low-budget spam. Capturing the `gclid` (Google Click ID) in the session cookie and Pipedream webhook allows the business to upload CRM stages (e.g., "Qualified Lead") back to Google Ads to train the bidding algorithm.
*   **Gap**: The backlog captures the `gclid` but lacks the payload structure facilitating OCI.
*   **Decision**: Should we design the Pipedream webhook payload specifically to support Google Ads conversion uploads?
    *   *Recommendation*: Yes, the payload pushed to Pipedream should include `gclid`, timestamp, and conversion category.

### 4.2 Keyword Scent Trail (Ad-to-Page Relevancy)
*   **Source**: Google Ads Landing Page Experience / Quality Score
*   **Context**: The page H1 and H2s must match the search intent of the ad group keywords driving traffic to keep Quality Scores high (lowering CPC).
*   **Gap**: Programmatic pages need to support dynamic headline swapping based on ad group parameters.
*   **Decision**: Should we allow the dynamic templates to swap H1 headlines based on an optional query string parameter?
    *   *Recommendation*: Yes, allow the template to check `?head=N` and load a headline from the solution's `headline_variants` array.

### 4.3 Offer Framing (Lead Magnets)
*   **Source**: B2B Lead Generation heuristics
*   **Context**: Lead magnets must solve a narrow problem and reveal the next problem that our core service solves (e.g., a checklist for rural land documentation).
*   **Gap**: The new PRD treats lead magnets as generic files.
*   **Decision**: Should we enforce that the download page dynamically links the offer to its related solution?
    *   *Recommendation*: Yes, the `offers` collection must have a relationship field pointing to a `solution` slug so that CTA fallback buttons route to the correct WhatsApp pre-fill.

---

## 5. Route Alignment: "Interim" vs. "Full-Depth" Pages

*   **Source**: `docs/Archive/remaining_prd_work.md` (strict warnings against thin pages)
*   **Context**: Having "interim" or thin pages can ruin Google Ads Quality Scores and bounce rates. We decided to build "Temporary Support Pages" for the 5 clusters to avoid broken links.
*   **Gap**: The "temporary" pages must not be low-quality placeholders.
*   **Decision**: What is the minimum acceptable content threshold for a temporary support page?
    *   *Recommendation*: Enforce a strict content gate: minimum 300 words of authentic copy, the specs `<dl>`, the comparison table, and at least 3 cluster FAQs. No "lorem ipsum" or "coming soon" placeholders allowed.

---

## 6. AI-Search (RAG) Content Constraints

### 6.1 Paragraph Length Restrictions
*   **Source**: `docs/Archive/initial_prd.md` (RAG formatting constraints)
*   **Context**: For AI indexers to easily chunk and cite BLK content, markdown bodies must keep paragraphs short (under ~100 words) and use clean subheadings.
*   **Gap**: Omitted from writing guidelines in the backlog.
*   **Decision**: Enforce paragraph length limits as a PR review gate?
    *   *Recommendation*: Yes, add a rule to the agent guides verifying paragraph constraints before merging content.

---

## 7. E-E-A-T & Trust Requirements

### 7.1 Mandatory Official Outbound Links
*   **Source**: `docs/Archive/initial_prd.md` (Trustworthiness constraint)
*   **Context**: Services under legal regulations must link out to official primary sources (e.g., SIGEF/INCRA, ABNT standards, federal law portals) to validate claims.
*   **Gap**: The specific outbound targets for each cluster are not defined.
*   **Decision**: Map the mandatory outbound links for each solution cluster:
    *   *Recommendation*:
        *   *Regularização Rural*: Link to SIGEF/INCRA government portal.
        *   *Projeto e Obra*: Link to ABNT NBR 13133 documentation.
        *   *Regularização Urbana*: Link to Federal Law 13.465 (REURB guidelines).
        *   *Volumetria*: Link to official DER-SP measurement rules.
        *   *Monitoramento*: Link to environmental standards (IBAMA/CETESB).

### 7.2 Verification of Reviews (Strict Ratings)
*   **Source**: `docs/Archive/initial_prd.md` (AEO requirements)
*   **Context**: Do not fabricate ratings. If `aggregateRating` is present in the schema, it must correspond to visible reviews on the page, and the page must link to the Google Business Profile to prove authenticity.
*   **Gap**: Omitted from structured data rules.
*   **Decision**: Should we omit `aggregateRating` entirely until a live Google Maps CID is connected?
    *   *Recommendation*: Yes, keep it omitted in the schema until live reviews are linked.

---

## 8. SEO Freshness Sprints

### 8.1 Quarterly Freshness Sprints
*   **Source**: `docs/Archive/draft_prd.md` (Freshness signals)
*   **Context**: AI search platforms prioritize pages with recent updates. A routine task should update at least one page element (statistics, FAQs, or regulations) every 3 months.
*   **Gap**: Only the schema `dateModified` tag was automated; the operational writing schedule was omitted.
*   **Decision**: Add the quarterly refresh cycle to the operational manual?
    *   *Recommendation*: Yes, document this schedule in the deployment or SEO guide.

---

## 9. Technical Failsafes for Attribution

### 9.1 First-Party Cookie Fallback (7-Day TTL)
*   **Source**: `docs/Archive/initial_prd.md` (Attribution persistence)
*   **Context**: `sessionStorage` is cleared when the tab closes. To preserve Google Ads click IDs (`gclid`) if a user returns directly days later, the script should use a first-party cookie with a 7-day TTL as a fallback.
*   **Gap**: The backlog currently only specifies `sessionStorage`.
*   **Decision**: Upgrade the persistence script to use both `sessionStorage` and a short-term cookie fallback?
    *   *Recommendation*: Yes, implement a dual-storage system (cookie + sessionStorage) to maximize OCI attribution matching.

---

## 10. Doorway Page Prevention (SEO Quality Gates)

### 10.1 Active City Rollout Gates
*   **Source**: `docs/Archive/draft_prd.md` (SEO Quality Gate)
*   **Context**: If a programmatic city page lacks local data (e.g., list of served neighborhoods, local FAQs), it must be set to `active: false` or skipped in the build to avoid thin doorway penalties.
*   **Gap**: Build-time verification logic is missing.
*   **Decision**: Implement a build-time gate that skips city page generation if the neighborhood list has fewer than 3 entries?
    *   *Recommendation*: Yes, reject the generation of city pages during the build if they fail the minimum content checks.

---

## 11. Off-Page SEO & Authority Building

### 11.1 Backlink & Post-Project PR Strategy
*   **Source**: BLK Aero brand improvement guidelines
*   **Context**: Technical on-page SEO is insufficient without backlink authority. We must write a project-specific blog post for major completions and target industry directory listings (e.g., MundoGEO).
*   **Gap**: Omitted from the tech backlog.
*   **Decision**: Create a workflow task in the post-delivery process to generate blog posts for backlink outreach?
    *   *Recommendation*: Yes, add this step to the content marketing pipeline.

---

## 12. Campaign Profitability Segmentation

*   **Source**: Ad campaign hierarchy best practices
*   **Context**: Google Ads budgets should prioritize high-value services (e.g., rural georeferencing) over low-margin local services.
*   **Gap**: Programmatic page structures must align with campaign grouping structures.
*   **Decision**: Align URL taxonomies so campaigns can isolate traffic categories?
    *   *Recommendation*: Ensure `/solucoes/[cluster]/[city]` is structured cleanly so that ad groups can target specific clusters without mixing traffic.

---

## 13. High-Converting Page Layout Elements

*   **Source**: Conversion Rate Optimization (CRO) frameworks
*   **Context**: Landing pages must display clear headings,CTAs above the fold, clean designs, trust badges, and testimonials to convert visitors.
*   **Gap**: Temporary support page specs focus on technical code rather than visual trust zones.
*   **Decision**: Make a compact testimonial or trust badge block mandatory in the upper section of all solution pages?
    *   *Recommendation*: Yes, embed a simplified testimonial block into the cluster layout template.

---

## 14. Lead Nurturing Email Automations

*   **Source**: Marketing Automation Report (RD Station / Pipedream)
*   **Context**: Lead magnet downloads should trigger an automated email nurturing flow to warm up cold B2B prospects.
*   **Gap**: The backlog stops at webhook capture.
*   **Decision**: Add a task in Pipedream to push leads to a mailing list (e.g. Mailchimp, RD Station) and start a 3-step automated email sequence?
    *   *Recommendation*: Yes, include the email marketing platform integration in the Pipedream webhook setup.

---

## 15. A/B Testing & Constraint Optimization

*   **Source**: CRO Iteration heuristics
*   **Context**: Headlines, images, and CTAs must be split-tested over time to optimize the highest-friction funnel step (the constraint).
*   **Gap**: The backlog treats the landing pages as static, one-off deliveries.
*   **Decision**: Design the Astro components so that split-testing scripts can be injected dynamically in the future?
    *   *Recommendation*: Yes, build pages modularly with clean entry points for conversion tracking tools.
