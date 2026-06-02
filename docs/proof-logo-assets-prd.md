---
title: Homepage Proof Logo Asset PRD
labels:
  - ready-for-agent
---

# PRD: Homepage Proof Logo Assets

## Problem Statement

The homepage **Compact Proof Band** currently uses text tags for **Credenciais e Associações** and **Clientes e Projetos Atendidos**. This is release-safe, but it underuses approved logos that can make BLK's **Served Client Proof** more scannable and visually credible.

The available source logos have different formats, sizes, colors, crops, and backgrounds. If they are dropped into the homepage directly, the proof band can become visually uneven and heavier than it needs to be. The update also needs to remove outdated proof items and add the newer approved organizations without creating a dynamic content pipeline for a list that changes only a few times per year.

## Solution

Replace the current text-only proof band with a single **Home Proof Band Component** that renders the homepage's curated **Homepage Proof Content Model**.

The content model should embed the approved proof items directly in the homepage content structure. It should define each item's group, simple display name, source URL, and whether it has a production logo asset or should use the text fallback. The temporary CSV and original files are input material for this update pass, not the durable runtime source of truth.

The component should show all approved items, preserve the two existing visible proof groups, sort items alphabetically inside each group, link each item quietly to its source URL, and use the same quiet proof-item layout for logo-backed and text fallback items.

Logo assets should be manually normalized before they enter the production asset directory. Prefer SVG for clean vector marks. Use optimized raster assets only when SVG is not reliable for the source logo. Rendering should use Astro-native asset handling so the compact proof band stays performance-conscious.

## User Stories

1. As a homepage visitor, I want to see recognizable proof items near the top of the page, so that I can trust BLK before choosing a service path.
2. As a homepage visitor, I want proof items to appear in a compact section, so that credibility does not delay the service triage flow.
3. As a homepage visitor, I want proof items to be visually consistent, so that the section feels curated rather than assembled from mismatched files.
4. As a homepage visitor, I want the proof section to load quickly, so that visual credibility does not slow the first homepage experience.
5. As a homepage visitor, I want proof items to link to their public source quietly, so that I can verify names without being pushed into a separate navigation flow.
6. As a homepage visitor, I want text fallback proof items to look like part of the same section, so that missing logos do not imply weaker proof.
7. As a mobile visitor, I want proof items to wrap cleanly, so that the compact proof band remains readable on small screens.
8. As a desktop visitor, I want proof logos to have similar perceived size, so that no client or credential dominates the section accidentally.
9. As a buyer comparing technical suppliers, I want **Credenciais e Associações** separated from **Clientes e Projetos Atendidos**, so that I can distinguish credentials from served-project proof.
10. As a buyer comparing technical suppliers, I want the proof section to avoid relationship labels, so that the homepage stays clean and does not overexplain direct, indirect, membership, or credential relationships.
11. As a BLK stakeholder, I want all currently approved proof items to appear, so that the homepage reflects the current credibility set.
12. As a BLK stakeholder, I want outdated proof items removed from the visible content, so that the homepage does not present stale or unapproved proof.
13. As a BLK stakeholder, I want simple public display names, so that long legal or social profile names do not clutter the compact proof band.
14. As a BLK stakeholder, I want group ordering and item ordering to be deterministic, so that quarterly updates do not require redesigning the section.
15. As a BLK stakeholder, I want the update to keep the current homepage proof taxonomy, so that this asset pass does not reopen the broader homepage strategy.
16. As a content maintainer, I want proof items embedded in the homepage content model, so that quarterly updates are simple and do not require a separate CSV/register workflow.
17. As a content maintainer, I want original source logos kept separate from production logo assets, so that raw intake files do not accidentally become public page assets.
18. As a content maintainer, I want a documented manual output standard, so that future logo updates match the first production pass.
19. As a developer, I want one component to own the proof band, so that the homepage does not keep duplicated inline proof markup.
20. As a developer, I want Astro-native image rendering for production logo assets, so that image optimization and layout sizing follow the site's existing asset pattern.
21. As a developer, I want tests to verify the approved proof behavior, so that future edits do not regress grouping, ordering, links, fallback rendering, or proof-band placement.
22. As a reviewer, I want tests to avoid brittle assertions about a removed individual item, so that the test suite verifies the approved content contract instead of historical cleanup details.

## Implementation Decisions

- Keep the visible proof taxonomy to two groups: **Credenciais e Associações** and **Clientes e Projetos Atendidos**.
- Use the homepage's curated **Homepage Proof Content Model** as the durable source of truth for proof items.
- Treat the temporary CSV and original logo folder as intake/reference material for this update pass only.
- Do not introduce a runtime CSV parser, CMS, generated data file, or separate tracked proof register.
- Each proof item should include a simple display name, group assignment, source URL, and optional logo asset.
- Each proof group should show all approved items from this pass.
- Items inside each group should sort alphabetically by public display name.
- Proof items with source URLs should render as quiet links, not as prominent CTAs.
- Logo alt text should use the public display name only.
- Text fallback items should use the same quiet proof-item layout as logo-backed items.
- Manually normalize logo assets before production use.
- Prefer SVG for logos that can be represented cleanly as vector assets.
- Use optimized raster assets only when the source logo cannot be reliably represented as SVG.
- Keep normalized production logos in their original colors, tightly cropped, transparent where possible, and consistent in perceived size.
- Keep the proof band performance-conscious by avoiding oversized source files and relying on the site's Astro asset flow.
- Render raster logos with Astro's image component.
- Render SVG logos as Astro SVG component imports where that is the cleanest path.
- Avoid raw HTML image elements unless there is a documented exception.
- Extract the proof band into one **Home Proof Band Component**.
- Replace the existing inline proof section with the new component rather than leaving duplicate markup behind.
- Preserve the proof band's current page location after the hero and before the homepage triage cards.
- Preserve the existing proof-band test hook on the new component root so current page-level tests can stay high-level.
- Add a local asset README that documents the manual normalization and output standard for future quarterly updates.

## Testing Decisions

- Good tests should verify externally visible behavior: group headings, displayed proof items, item order, quiet links, fallback rendering, proof-band placement, and absence of visible relationship labels.
- Good tests should avoid locking onto implementation details such as component internals, import shape, or the exact normalization tool used for manual asset preparation.
- The content model tests should verify the two proof groups, sorted public display names, new approved names, source URLs where present, and text fallback representation.
- The content model tests should not include a brittle assertion that a specific removed historical item is absent. The approved content set should be the source of truth.
- The homepage e2e proof-band test should verify that both group headings render, all approved proof items are visible, source links exist for items with URLs, and relationship labels such as direct client, partner, or supplier do not appear.
- The homepage e2e proof-band test should verify that the proof band remains after the hero and before the triage cards.
- The asset/component change should run the relevant homepage e2e coverage because this affects visible homepage content and conversion-adjacent trust proof.
- The implementation should run the content model unit tests, relevant homepage e2e spec, and a production build to verify Astro asset imports.
- The final manual QA should inspect desktop and mobile rendering for wrapping, perceived logo size, text fallback fit, and proof-band compactness.
- Existing prior art includes the homepage content model tests and the homepage hero/showcase e2e spec.

## Out of Scope

- Creating a CMS, runtime CSV loader, or durable proof-register file outside the homepage content model.
- Generating or inventing logos for items without approved logo assets.
- Using unapproved marks or inferring approval from loose files in an asset folder.
- Creating a reusable image-processing pipeline or adding a heavy image dependency.
- Reworking the broader homepage strategy, triage cards, deliverables, portfolio, FAQ, or final CTA.
- Adding a third visible proof group for partners, suppliers, public entities, or relationship nuance.
- Showing direct-client, indirect-client, partner, supplier, or endorsement labels in the homepage UI.
- Creating case studies or named project detail pages.
- Rewriting the archived proof-logo PRD.

## Further Notes

- The active PRD supersedes the archived proof-logo asset follow-up for current implementation planning.
- The production asset standard should live at `src/assets/homepage/proof-logos/README.md`.
- Normalized production logo assets should live under the homepage proof-logo asset directory, with source/intake files kept out of the runtime page surface.
- The initial intake reference for this pass is `tmp/logos/logos.csv` plus the original files in `tmp/logos`.
- The source/intake CSV has one known text fallback case where no approved logo filename is provided.
- The implementation should remove the existing inline proof markup when the new component is introduced.
