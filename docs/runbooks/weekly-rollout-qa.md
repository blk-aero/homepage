# Weekly Rollout QA

## Before activating new cities/services
1. Confirm markdown content exists and is not placeholder-only.
2. Confirm city neighborhoods and local FAQs are present.
3. Confirm service page has BLUF, specs, CTA, and trust blocks.

## Validation commands
1. `npm run build`
2. `npm run test`
3. `npm run test:e2e -- tests/e2e/routing.spec.ts`
4. `npm run check:links` (with preview server running)

## Manual checks
1. Hero + CTA visible on mobile first screen.
2. `/servicos/<service>` and `/servicos/<service>/<city>` load and show CTA.
3. `/cidades/<city>` renders local FAQ content.
4. `/sobre` displays trust entity details (CNPJ/address).
