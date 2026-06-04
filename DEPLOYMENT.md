# Deployment (GitHub Pages)

> [!NOTE]
> This document details production build and deployment settings to GitHub Pages. For local testing and development using Docker & Colima, see [Testing and verification](docs/agents/testing.md#local-development-via-docker--colima).

## Build settings

- Build command: `npm run build`
- Output directory: `dist`

## Environment variables

- `SITE_URL` (optional, defaults to `https://blk.aero` in the GitHub Pages workflow)
- `PUBLIC_WHATSAPP_NUMBER` (optional, uses the site fallback number when unset)
- `PUBLIC_GTM_ID` (optional, overrides the default GTM container in `src/content/site/global.yaml`)

## GitHub Pages workflow

- Workflow: `.github/workflows/astro.yml`
- Build action: `withastro/action@v6`
- Deploy action: `actions/deploy-pages@v5`
- Custom domain artifact: `public/CNAME`
- Target URL: root/custom-domain deployment at `https://blk.aero`. Keep Astro `base` unset.

## Post-deploy checks

1. Open `/robots.txt` and confirm sitemap URL exists.
2. Open `/sitemap-index.xml` and confirm pages are listed.
3. Validate key pages (`/`, `/solucoes`, `/cidades`, `/blog`, `/solucoes/projeto-e-obra`).
4. Run GTM preview for the configured GTM container.
5. Run PageSpeed on mobile and desktop for primary landing pages.
