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
6. Check production cache headers.

Cache headers must be checked against production, not local build output.

```bash
curl -sSI https://blk.aero/
curl -sSI https://blk.aero/_astro/<hashed-asset>
```

Record whether HTML remains short-lived and whether content-hashed Astro assets are candidates for long immutable caching. HTML should stay fresh enough for copy and metadata updates; hashed `_astro` assets can use a long immutable policy when the hosting layer supports it.

## Immutable Asset Caching Decision

Latest live check on 2026-06-03:

- HTML: `https://blk.aero/` returns `cache-control: max-age=600`, which keeps HTML short-lived enough for copy and metadata updates.
- Hashed asset example: `https://blk.aero/_astro/index.CkMKgfOo.css` returns `cache-control: max-age=14400`, which is not the desired immutable policy.

The current GitHub Pages workflow does not provide a repo-managed custom-header surface. `blk.aero` is served through Cloudflare in front of GitHub Pages/Fastly, so the chosen path is a Cloudflare cache rule or response-header rule for `https://blk.aero/_astro/*` that sets:

```text
Cache-Control: public, max-age=31536000, immutable
```

Keep HTML on the current short-lived policy. Do not add `_headers` for the current GitHub Pages deployment because GitHub Pages will not consume it; adding one would create false confidence without changing production behavior.

## Weekly Rollout QA

TODO: Restore or replace the old rollout QA runbook before reintroducing generated service, city, blog, case, or offer pages.

- Current active routes are the homepage plus temporary support pages for Soluções, Cidades, Blog, and homepage detail paths.
- Do not reintroduce generated routes, rollout controls, or archived content workflows as incidental cleanup.
- Before any rollout restoration, define the source of truth and validation checklist in a live, non-archived guide.
