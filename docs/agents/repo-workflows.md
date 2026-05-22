# Repo Workflows and TODOs

## Discovery

- Use `rg` and `rg --files` for fast discovery.
- Identify impacted files and nearby tests before editing.

## Content and SEO Changes

- For page/content changes, verify route rendering and CTA presence.
- For schema/SEO changes, verify metadata outputs and crawl artifacts (`/robots.txt`, sitemap).

## Rollout or Market-Expansion Changes

TODO: The previous root `AGENTS.md` referenced `docs/runbooks/weekly-rollout-qa.md`, but that file is not present in this checkout. Until the runbook exists, use these preserved expectations as a checklist and note the missing runbook in completion reports:

- Confirm non-placeholder content quality for new cities/services.
- Verify local neighborhoods/FAQ and service BLUF/specs/CTA/trust blocks.
- Execute `npm run build`, `npm run test`, targeted routing e2e, and link checks.
