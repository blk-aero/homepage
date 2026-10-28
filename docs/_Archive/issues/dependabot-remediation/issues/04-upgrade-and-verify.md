# 04: Upgrade and verify vulnerable dependencies

**What to build:** A site that uses compatible patched dependencies, preserves its existing behavior, and has an assessed dependency audit. Prefer parent upgrades; use documented, compatible, tested overrides only when needed. Record evidence for alerts without a compatible fix.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Upgrade Astro and the necessary direct and indirect dependencies, keeping existing major versions where sufficient, and update the Node environment and integrations needed for compatibility.
- [ ] Preserve the static site, existing routes, content, images, and interactions.
- [ ] Run a clean install and audit; assess the original alerts and newly found audit vulnerabilities, and document remaining findings and any proposed dismissal reasons.
- [ ] Run the applicable build, unit, built-output, browser, link, and environment checks; report exact commands, results, and any limitations.
- [ ] Prepare one tested change for review, splitting only if compatibility problems require it.
- [ ] Apply the spec's verification evidence path using the [verification-planning skill](/Users/lupion/Documents/_CoS/03-toolkit/agents-configs/_skills/external/akita-skills/verification-planning/SKILL.md); report each owned claim as established, limited, or refuted, with evidence and uncertainty.

## Parent

Dependabot remediation spec.
