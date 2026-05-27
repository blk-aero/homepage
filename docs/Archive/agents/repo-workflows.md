# Repo Workflows and TODOs

## Discovery

- Use `rg` and `rg --files` for fast discovery.
- Identify impacted files and nearby tests before editing.

## Content and SEO Changes

- For page/content changes, verify route rendering and CTA presence.
- For schema/SEO changes, verify metadata outputs and crawl artifacts (`/robots.txt`, sitemap).

## Future Expansion Changes

Future service, city, blog, case, or offer work should start from a new approved PRD or an explicitly restored archived plan. Do not reintroduce generated routes, content collections, or rollout controls as incidental cleanup.

- Confirm the active route contract before adding pages.
- Add focused tests before restoring content collections or dynamic routes.
- Execute `npm run build`, `npm run test`, targeted routing e2e, and link checks.
