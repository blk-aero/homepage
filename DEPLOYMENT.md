# Deployment (Cloudflare Pages)

## Build settings
- Build command: `npm run build`
- Output directory: `dist`

## Environment variables
- `SITE_URL` (required)
- `PUBLIC_WHATSAPP_NUMBER` (required)
- `PUBLIC_GTM_ID` (optional)

## Post-deploy checks
1. Open `/robots.txt` and confirm sitemap URL exists.
2. Open `/sitemap-index.xml` and confirm pages are listed.
3. Validate key pages (`/`, `/solucoes`, `/cidades`, `/blog`, `/solucoes/projeto-e-obra`).
4. Run GTM preview if `PUBLIC_GTM_ID` is enabled.
5. Run PageSpeed on mobile and desktop for primary landing pages.
