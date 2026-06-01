# Deployment and Release Checks

## GitHub Pages

Source of truth: `DEPLOYMENT.md`.

- Build command: `npm run build`
- Output directory: `dist`
- Workflow: `.github/workflows/astro.yml`
- Runtime: `withastro/action@v6` with Node 24
- Deploy action: `actions/deploy-pages@v5`
- Target URL: `https://blk.aero`
- Optional environment variables: `SITE_URL`, `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_GTM_ID`

## Post-Deploy Checks

1. Open `/robots.txt` and confirm the sitemap URL is present.
2. Open `/sitemap-index.xml` and confirm expected pages are listed.
3. Validate key routes: `/`, `/solucoes`, `/cidades`, `/blog`, and `/solucoes/projeto-e-obra`.
4. Run GTM preview checks when `PUBLIC_GTM_ID` is enabled.
5. Run PageSpeed checks for primary landing pages on mobile and desktop.

## Weekly Rollout QA

TODO: Restore or replace the old rollout QA runbook before reintroducing generated service, city, blog, case, or offer pages.

- Current active routes are the homepage plus temporary support pages for Soluções, Cidades, Blog, and homepage detail paths.
- Do not reintroduce generated routes, rollout controls, or archived content workflows as incidental cleanup.
- Before any rollout restoration, define the source of truth and validation checklist in a live, non-archived guide.
