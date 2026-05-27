# Tech Debit

## Homepage PRD Review Follow-ups

Source: pre-PR code review of the homepage PRD implementation, range
`c52a9d8..df5bd2c`.

### Important

- `src/components/WhatsAppCTA.astro`: homepage CTAs render only the label, so
  `Falar com especialista` does not visually communicate WhatsApp as the
  channel. Add the shared WhatsApp brand icon inside the CTA, or add an explicit
  icon option, then cover the hero CTA in e2e.
- `src/components/HomeHeroShowcase.astro`: the hero carousel uses five raw
  1024x1024 PNG assets of roughly 1.1-1.5 MB each. Convert them to WebP/AVIF or
  use Astro image optimization with explicit sizes/srcset, and keep only the
  first visual eager.
- `src/pages/solucoes/[cluster].astro`: the placeholder route nests a `main`
  element inside `BaseLayout`'s existing `main`. Replace the inner landmark with
  a `section` or `div` and extend accessibility smoke coverage to these routes.
- `src/components/HomeHeroShowcase.astro`: carousel behavior is inline in the
  Astro component instead of being extracted behind a small testable behavior
  module. Move the state machine to a small JS/TS module and add unit coverage
  for reduced motion, pause, auto-advance, and manual stop.

### Minor

- `tests/e2e/conversion-flow.spec.ts`: a few visual checks assert Tailwind class
  names directly. Prefer computed style, accessible structure, link behavior, or
  screenshot-level checks for visual requirements.
