# Homepage Proof Logo Assets

This directory is for production-ready logos used by the homepage compact proof band.

## Output Standard

- Use approved proof items only. Do not infer public-use approval from a loose file in `tmp/`.
- Prefer SVG for logos that can be represented cleanly as vector assets.
- Use optimized raster assets only when the source logo cannot be reliably represented as SVG.
- Normalize logos to their original colors, keeping them consistent in perceived size.
- Crop assets tightly and remove unnecessary padding.
- Use transparent backgrounds where possible.
- For primarily white or very light marks, use an approved readable color variant for white backgrounds instead of shipping an invisible original-white mark.
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

## Why Pre-Normalize

The chosen approach for this static proof band is:

1. Manually or temporarily pre-normalize approved source logos into small production assets.
2. Commit those normalized assets.
3. Render raster assets through Astro's `<Image />` component so the site build can inspect dimensions and emit optimized production files.

This keeps the visual and performance decisions resolved for future additions:

- Pre-trimmed logos have cleaner intrinsic dimensions, so Astro can inject stable `width` and `height` attributes and the browser can reserve space before the asset loads. This protects the proof band from image-driven CLS.
- The compact proof band renders logos at small sizes such as `max-h-9`. A normalized raster bound around `420x140` gives enough source density for high-DPI displays without shipping oversized raw files.
- Normalized PNG sources remain easy to inspect and edit in the repo, while Astro's build optimizer emits smaller production assets from those imports. In the current build, raster proof logos are emitted as WebP.
- SVG remains preferred for clean, small vector marks, but very large or complex SVGs should be pre-rasterized when browser parse/rasterization cost outweighs the benefit of keeping the source vector in the runtime page.
- Runtime-only fixes such as CSS filters, visual cropping, or forced sizing do not solve source payload size, transparent padding, or huge SVG parsing cost. They also make future visual alignment harder to audit.

The decision is therefore to use temporary pre-rendering normalization plus Astro build-time optimization, not raw checked-in source files and not runtime-only CSS treatment.

## Temporary Normalization Script Notes

Do not keep a reusable normalization script or image-processing dependency in this project just for these static proof logos. When adding or replacing logos, recreate a short temporary local script, run it against the approved files, commit only the normalized production assets and this README, then delete the script and any direct image-processing dependency.

The previous temporary script used this production recipe:

- Read approved intake files from `tmp/logos`.
- Map each approved source filename to the production filename explicitly. Do not glob every file in `tmp/logos`.
- Keep clean, reasonably small SVG marks as SVG.
- Convert oversized SVGs and non-PNG raster files such as JPG or AVIF to optimized transparent PNG.
- Trim transparent padding before resizing.
- Resize raster outputs to fit inside `420x140` with `fit: "inside"` and no enlargement.
- Export PNGs with high compression, using compression level `9` and quality around `90`.
- Preserve original colors for normal marks.
- For primarily white or very light marks, use an approved readable variant for white backgrounds instead of blindly inverting colors or shipping an invisible original-white mark.
- After generating assets, verify perceived size across wide, tall, and text-heavy marks in the compact proof band.
