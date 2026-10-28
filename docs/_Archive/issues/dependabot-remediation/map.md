## Destination

Identify a tested upgrade path that addresses all 49 Dependabot alerts open on 28 October 2026, plus vulnerabilities found by npm audit during the work. Dismiss an alert when no compatible fix is available, with an accurate reason and supporting evidence.

## Notes

- Use the simplest sufficient change and fix dependency root causes where practical.
- Target one tested change; split it if compatibility problems require it.
- Preserve the static Astro site and its build, tests, and deployment. Review the Node 20 Docker environment alongside GitHub Actions on Node 24.
- GitHub alerts are tracked against the default branch; verify their final state after the changes reach that branch.
- The original alert numbers are 30, 33, 36, 39, 41, 43–47, 49–50, 52–64, 66, 68–72, and 74–91, excluding 48, 51, 65, 67, and 73.

## Decisions so far

- [Establish the dependency upgrade constraints](issues/01-upgrade-constraints.md): Astro 7 needs a newer Docker Node version, Vite-compatible Tailwind, and content and compiler migration checks; the final dependency tree remains untested.
- [Choose the remediation strategy](issues/02-remediation-strategy.md): Upgrade affected parents, use tested targeted overrides when needed, and document and dismiss alerts without a compatible fix.
- [Choose verification and delivery](issues/03-verification-and-delivery.md): Use clean installation, audit, build, site checks, and default-branch alert verification.

## Not yet specified

- The indirect dependencies that remain vulnerable after the selected parent upgrades and the compatible fixes available for them.
- What compatibility changes and validation are needed after the target dependency versions are known.

## Out of scope

- Unrelated feature work and site redesign.
