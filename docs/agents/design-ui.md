# Design and UI Guidance

Use `DESIGN.md` for page, section, component, layout, visual style, copy-pattern, and interaction work.

When `DESIGN.md` disagrees with live code, tests, or the repo task guides, trust the live repo first and update the guide as part of the scoped change.

Keep UI work on the existing Astro, Tailwind v4, and Flowbite baseline. Use Flowbite behavior and primitives where they already fit, then apply BLK-specific composition through Tailwind classes and `src/styles/global.css`.

For new UI abstractions, check the current components first:

- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `src/lib/homepage-content.ts`
- `src/lib/homepage-clusters.ts`
- `src/lib/site-config.ts`
- `src/components/WhatsAppCTA.astro`
- `src/components/HomeFinalWhatsAppComposer.astro`
- `src/components/HomeHeroShowcase.astro`
- `src/components/HomeProofBand.astro`
- `src/components/SimpleCookieNotice.astro`
- `src/components/BrandIcon.astro`
