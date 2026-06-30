# Repo Workflows and TODOs

## Current Surface

This branch is focused on the homepage PRD plus temporary support pages for Soluções, Cidades, Blog, and the homepage detail paths.

Do not reintroduce generated service, city, blog, case, offer, schema, route, or rollout-control files unless the user explicitly asks for that workflow.

## Public Pages and Performance Foundation

When adding or substantially changing public pages, preserve the repo's Performance Foundation:

- Route local bitmap assets through Astro image handling where practical.
- Size hero and LCP images intentionally for their rendered slot.
- Lazy-load non-critical imagery.
- Reserve stable dimensions for media, embeds, and repeated UI elements.
- Run a lab check for image-heavy pages.

For crawlability, public runtime, deployment, and cache-header checks, follow [testing and verification](testing.md) plus [deployment and release checks](deployment-release.md).

## Restoring Rollout Work

TODO: Add a live rollout QA runbook before restoring market-expansion or generated-content workflows. The previous `docs/runbooks/weekly-rollout-qa.md` reference is not present in this checkout.

Until that exists, treat rollout restoration as a product-scoping task, not a cleanup task.
