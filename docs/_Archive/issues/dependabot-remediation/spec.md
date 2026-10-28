# Dependabot remediation

Status: ready-for-agent

## Problem Statement

The site owner faces 49 open Dependabot alerts, including critical Astro alerts, and additional findings from npm audit. Vulnerable packages appear in both direct and indirect dependencies. The site needs a maintainable upgrade that preserves its static build and visitor experience.

## Solution

Upgrade affected dependencies and their necessary integrations, verify the site and dependency tree, and account for every original alert. When no compatible fix is available, document the evidence and dismiss the alert with an accurate reason. Review new audit findings as part of the same work.

- Simplest sufficient:
  - Understand the goal and current behavior; stop at the first sufficient option: no change, reuse, minimal additions.
  - Sufficient means meeting explicit requirements, correctness, and operational constraints; favor maintainability over brevity.
  - Fix root causes across affected areas.
  - Add only for current needs or blocking uncertainty; justify complexity with a concrete limitation and the smallest useful check.

## User Stories

1. As a site owner, I want the critical Astro alerts addressed, so that the site uses a patched framework.
2. As a site owner, I want all original alerts accounted for, so that none are overlooked.
3. As a site owner, I want new audit findings assessed, so that an upgrade does not leave known issues unreviewed.
4. As a maintainer, I want parent packages upgraded first, so that indirect vulnerabilities are fixed at their source.
5. As a maintainer, I want compatible targeted overrides when parent upgrades are unavailable, so that I can address remaining vulnerable dependencies.
6. As a maintainer, I want overrides documented and tested, so that their purpose and compatibility are clear.
7. As a site owner, I want alerts without a compatible fix dismissed with evidence, so that their status reflects an informed decision.
8. As a maintainer, I want fixed and dismissed alerts reported separately, so that dismissal is not mistaken for a fix.
9. As a developer, I want a compatible Node version for local Docker development, so that I can run the upgraded site.
10. As a maintainer, I want the GitHub Pages build to remain compatible, so that the site can be deployed.
11. As a visitor, I want existing routes, content, images, and interactions to keep working, so that the upgrade does not disrupt the site.
12. As a maintainer, I want clean installation and release checks to pass, so that the result is reproducible.
13. As a maintainer, I want the alert states checked after the change reaches the default branch, so that GitHub can confirm its dependency analysis.
14. As a reviewer, I want one tested change when practical, so that I can review the remediation together.

## Implementation Decisions

- Preserve the vanilla Astro, Tailwind v4, Flowbite, and static GitHub Pages architecture. Upgrade Astro to a patched compatible release and update only the direct packages and integrations needed for security and compatibility; prefer updates within existing major versions when sufficient.
- Update the local Docker Node environment to support the chosen Astro version, and confirm compatibility with the Node version used by the deployment workflow.
- Review content collection schemas and Astro's Zod integration, template validity, image handling, and the Vite and Tailwind integration as part of the framework migration. Remove or upgrade a direct dependency only after checking its actual uses and consumers.
- Refresh the lockfile and inspect the resulting dependency tree. Prefer a parent upgrade to fix an indirect dependency; use a documented targeted override only when a patched version is compatible and passes the site's checks.
- Assess all original alerts and newly discovered npm audit findings. When no compatible fix or override exists, record the affected dependency path, available fixes, site exposure, and accurate GitHub dismissal reason. Dismissal is not a fix.
- Prepare one tested change for review; split it only if compatibility problems require it. Confirm GitHub alert states after the change reaches the default branch.

## Testing Decisions

- Apply [verification planning](/Users/lupion/Documents/_CoS/03-toolkit/agents-configs/_skills/external/akita-skills/verification-planning/SKILL.md) before implementation and close its evidence path in the final report.
- Prefer existing high-level verification seams and test externally observable behavior, not implementation details. Add tests only when existing checks do not cover a material regression.
- Run a clean install and npm audit against the final dependency tree. Report findings and the exact commands and outcomes.
- Use the existing unit and content-surface checks for configuration and schema changes, and the existing build and built-output checks for rendering, crawlability, and deployment artifacts.
- Use the existing browser tests for relevant routes and interactions, and the existing local-server link check. Verify both the deployment Node environment and local Docker development where available.
- Follow the repository's release verification guide, including the opt-in IndexNow behavior. Record any checks that cannot run and their impact.
- After the changes reach the default branch, compare GitHub's alert states with the original baseline and report fixed, dismissed, and still-open alerts separately.

### Evidence path and budget

| Claim | Owner | Preferred evidence and limits |
| --- | --- | --- |
| The final lockfile installs and the audit findings are addressed or documented. | Upgrade ticket implementer | Run `npm ci` and `npm audit` on the final candidate; inspect dependency paths and advisory ranges for remaining findings. Audit data can change and does not prove exploitability. |
| The site still builds and behaves as intended. | Upgrade ticket implementer | Run `npm run test`, `npm run test:built` (includes the build), relevant `npm run test:e2e` scopes, and `npm run check:links` against the current preview server. These checks cover selected behaviors, not every visitor scenario. |
| Deployment and local development can use the upgraded dependencies. | Upgrade ticket implementer | Verify the deployment Node version and exercise a fresh Docker build and startup when available. A local build does not prove a production deployment; record unavailable environments as a limitation. |
| GitHub has accounted for each original alert. | Alert-outcomes ticket implementer | After the change reaches the default branch and GitHub has rescanned it, compare each baseline alert with GitHub's state and report fixed, dismissed, and still open. A local audit cannot prove GitHub's state. |

Run the link check with a preview or dev server at its configured address. Keep IndexNow disabled for ordinary local builds unless submission is explicitly intended. Reuse results only while the relevant code, lockfile, environment, and inputs remain unchanged; repeat or broaden checks when these change or a failure requires it. If Docker or browser infrastructure is unavailable, report the missing evidence and use the closest available check as a limited alternative, not as proof of the unavailable environment. No new verification affordance is currently required; if existing checks cannot expose a material risk, propose the smallest temporary or durable support and get approval before adding dependencies, persistent diagnostics, or evidence-only structural changes.

## Out of Scope

- Unrelated features, redesign, and restoration of archived or generated content.
- Dismissing an alert as a substitute for an available compatible fix.

## Further Notes

The baseline is the 49 open alerts recorded on 28 October 2026 in the accompanying wayfinder map. Package versions and advisory data can change; verify them again during implementation. The candidate Astro upgrade and its indirect dependency fixes have not yet been tested.
