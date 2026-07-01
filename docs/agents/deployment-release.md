# Deployment and Release Checks

## GitHub Pages

Source of truth: `DEPLOYMENT.md`.

- Build command: `npm run build`
- Output directory: `dist`
- Workflow: `.github/workflows/astro.yml`
- Runtime: `withastro/action@v6` with Node 24
- Deploy action: `actions/deploy-pages@v5`
- Target URL: `https://blk.aero`
- Optional environment variables: `SITE_URL`, `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_GTM_ID` override
- Optional IndexNow submission: `npm run build` runs `scripts/indexnow.mjs` after `astro build`; set `INDEXNOW_KEY` only when production builds should submit sitemap URLs.

## Post-Deploy Checks

1. Open `/robots.txt` and confirm the sitemap URL is present.
2. Open `/sitemap-index.xml` and confirm expected pages are listed.
3. Validate key routes: `/`, `/solucoes`, `/cidades`, `/blog`, and `/solucoes/projeto-e-obra`.
4. Run GTM preview checks for the configured GTM container.
5. Run PageSpeed checks for primary landing pages on mobile and desktop.
6. Check production cache headers.

Cache headers must be checked against production, not local build output.

```bash
curl -sSI https://blk.aero/
curl -sSI https://blk.aero/_astro/<hashed-asset>
curl -sSI https://blk.aero/fonts/lato/<font-file>.woff2
```

Record whether HTML remains short-lived and whether content-hashed Astro assets and versioned local font files are using long immutable caching. HTML should stay fresh enough for copy and metadata updates; hashed `_astro` assets and versioned `/fonts/lato/` files can use a long immutable policy when the hosting layer supports it.

## Immutable Asset Caching Decision

Latest live check on 2026-06-04:

- HTML: `https://blk.aero/` returns `cache-control: max-age=600`, which keeps HTML short-lived enough for copy and metadata updates.
- Hashed asset example: `https://blk.aero/_astro/index.2NA7DxZg.css` returned `cache-control: max-age=14400` before Cloudflare cache-rule configuration, which was not the desired immutable policy.
- Versioned font example: `https://blk.aero/fonts/lato/lato-v25-latin-400.woff2` returned `cache-control: max-age=14400` before Cloudflare cache-rule configuration, which was not the desired immutable policy.

The current GitHub Pages workflow does not provide a repo-managed custom-header surface. `blk.aero` is served through Cloudflare in front of GitHub Pages/Fastly, so the chosen path is a Cloudflare cache rule for stable static assets:

```text
(http.host eq "blk.aero" and (starts_with(http.request.uri.path, "/_astro/") or starts_with(http.request.uri.path, "/fonts/lato/")))
```

Cloudflare cache-rule settings:

- Cache eligibility: `Eligible for cache`.
- Edge TTL: `Ignore cache-control header and use this TTL`, set to `1 year`.
- Browser TTL: `Override origin`, set to `1 year`.

If the live asset response still shows the origin `max-age=14400`, or if the browser-visible header needs the explicit immutable directive for Lighthouse, add a Cloudflare Cache Response Rule with the same expression and set the browser-visible response header to:

```text
Cache-Control: public, max-age=31536000, immutable
```

Keep HTML on the current short-lived policy. Do not add `_headers` for the current GitHub Pages deployment because GitHub Pages will not consume it; adding one would create false confidence without changing production behavior.

After changing Cloudflare rules, purge Cloudflare cache, then verify production. Edge TTL is not visible in response headers; Browser TTL and Cache Response Rules are visible through `Cache-Control`.

```bash
curl -sSI https://blk.aero/ | egrep -i 'HTTP|cache-control|cf-cache-status|age'
curl -sSI https://blk.aero/_astro/index.2NA7DxZg.css | egrep -i 'HTTP|cache-control|cf-cache-status|age|content-type'
curl -sSI https://blk.aero/fonts/lato/lato-v25-latin-400.woff2 | egrep -i 'HTTP|cache-control|cf-cache-status|age|content-type'
```

Expected result:

- HTML remains short-lived, currently `cache-control: max-age=600`.
- `/_astro/*` and `/fonts/lato/*` return a long browser cache lifetime, ideally `cache-control: public, max-age=31536000, immutable`.
- `cf-cache-status` may be `MISS` immediately after a purge; repeat the asset check to confirm the rule is cache-eligible.

## Weekly Rollout QA

TODO: Restore or replace the old rollout QA runbook before reintroducing generated service, city, blog, case, or offer pages.

- Current active routes are the homepage plus temporary support pages for Soluções, Cidades, Blog, and homepage detail paths.
- Do not reintroduce generated routes, rollout controls, or archived content workflows as incidental cleanup.
- Before any rollout restoration, define the source of truth and validation checklist in a live, non-archived guide.
