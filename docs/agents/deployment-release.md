# Deployment and Release Checks

## Cloudflare Pages

Source of truth: `DEPLOYMENT.md`.

- Build command: `npm run build`
- Output directory: `dist`
- Required environment variables: `SITE_URL`, `PUBLIC_WHATSAPP_NUMBER`
- Optional environment variables: `PUBLIC_GTM_ID`, `INDEXNOW_KEY`

## Post-Deploy Checks

1. Open `/robots.txt` and confirm the sitemap URL is present.
2. Open `/sitemap-index.xml` and confirm expected pages are listed.
3. Validate key routes: `/`, `/servicos/*`, `/cidades/*`, `/sobre`.
4. Run GTM preview checks when `PUBLIC_GTM_ID` is enabled.
5. Run PageSpeed checks for primary landing pages on mobile and desktop.

## Weekly Rollout QA

Source of truth: `docs/runbooks/weekly-rollout-qa.md`.

- Confirm non-placeholder content quality for new cities/services.
- Verify local neighborhoods/FAQ and service BLUF/specs/CTA/trust blocks.
- Run `npm run build`, `npm run test`, targeted routing e2e, and link checks.
