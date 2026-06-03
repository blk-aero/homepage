---
title: Normalize Production Proof Logo Assets
labels:
  - ready-for-agent
---

# Normalize Production Proof Logo Assets

## Parent

`docs/proof-logo-assets-prd.md`

## What to build

Prepare production-ready **Proof Logo Assets** for the approved proof items that have logo files. The output should follow the manual standard documented beside the homepage proof-logo assets: original color treatment, approved readable variants for primarily white marks, tight crop, consistent perceived size, transparent backgrounds where possible, and performance-conscious file sizes.

Prefer SVG when the mark can be represented cleanly as vector. Use optimized raster assets only when SVG is not reliable for the source logo. Keep intake/source files out of the runtime homepage surface.

## Acceptance criteria

- [ ] Production logo assets exist for all approved logo-backed proof items in the content model.
- [ ] SVG is used for clean vector logos where practical.
- [ ] Optimized raster assets are used only where vector output is not reliable.
- [ ] Assets are cropped tightly and normalized using original colors or approved readable variants for primarily white marks.
- [ ] Assets avoid oversized source-file payloads.
- [ ] The production asset directory remains separate from temporary intake files.

## Test intent

- Behavior: Production proof-logo assets are present, appropriately formatted, and ready for homepage use without relying on ignored intake files.
  Public interface: Repository file tree and documented asset standard.
  Why this matters: The visible proof band should look balanced and remain performance-conscious.
  Evidence: `find src/assets/homepage/proof-logos -type f | sort`, file size/format inspection, and `git diff --check`.
  Refactor-safe because: It verifies durable production assets and documentation rather than any particular normalization tool.

## Commit stack

- Commit 1: Add normalized production logo assets. Validation: `find src/assets/homepage/proof-logos -type f | sort` and file size/format inspection.
- Commit 2: Update the asset README only if normalization reveals a needed standard clarification. Validation: `git diff --check`.

## Blocked by

- `docs/issues/001-define-homepage-proof-content-model.md`
