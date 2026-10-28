# Choose the remediation strategy

Type: grilling
Status: resolved
Blocked by: 01

## Question

Given the upgrade constraints and remaining dependency paths, which smallest maintainable set of parent upgrades or other fixes should be used, and what evidence is needed before dismissing an alert without a compatible fix?

## Answer

- Upgrade Astro to a patched compatible release and update the direct dependencies and Node environment needed for that upgrade. Keep other upgrades within their current major versions when sufficient.
- Audit the resulting dependency tree. Prefer upgrading the parent dependency to remove a vulnerable indirect dependency.
- If the parent has no compatible fix, use a targeted npm override when a patched version is compatible with the parent and passes the site's checks. Document the reason for the override.
- If no compatible fix or override is available, dismiss the alert with an accurate GitHub dismissal reason and evidence of the affected dependency path, available fixes, and site exposure. Do not describe dismissal as a fix.
- Include new npm audit findings in the same assessment. Target one tested change, splitting it only if compatibility problems make that necessary.
