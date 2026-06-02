# Homepage Proof Logo Assets

This directory is for production-ready logos used by the homepage compact proof band.

## Output Standard

- Use approved proof items only. Do not infer public-use approval from a loose file in `tmp/`.
- Prefer SVG for logos that can be represented cleanly as vector assets.
- Use optimized raster assets only when the source logo cannot be reliably represented as SVG.
- Normalize logos to their original colors, keeping them consistent in perceived size.
- Crop assets tightly and remove unnecessary padding.
- Use transparent backgrounds where possible.
- Keep perceived logo size consistent across wide, tall, and text-heavy marks.
- Avoid shipping oversized source files. Production raster assets should be compressed before use.
- Use lowercase, hyphenated filenames that match the public display name where practical.
- Keep text fallback items in the homepage content model when no approved logo is available.

## Rendering Standard

- Render raster logos through Astro's image component.
- Render SVG logos as Astro SVG component imports when that is the cleanest path.
- Avoid raw HTML image elements unless the implementation documents a specific exception.
- Keep logo-backed and text fallback proof items in the same quiet layout.
- Use the public display name as the accessible name for each proof item.

## Maintenance

This proof list is static homepage content and is expected to change only a few times per year. Update the curated homepage content model and production assets together when proof items change.
