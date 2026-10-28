# Establish the dependency upgrade constraints

Type: research
Status: resolved
Blocked by: none

## Question

Which compatible Astro, Node, and direct dependency versions can address the current alerts, and which migration constraints affect this site's static build, content collections, images, tests, and deployment?

## Answer

- Astro 7.4.2 is a candidate for the Astro alerts; its Node requirement is at least 22.23.4. GitHub Actions uses Node 24, but the Dockerfile uses Node 20 and needs an update. The version is a candidate, not proof that every alert is fixed.
- The [Astro 6 migration guide](https://docs.astro.build/en/guides/upgrade-to/v6/) describes the Zod 4 and Vite 7 changes and recommends importing Zod from `astro/zod`. This site's `src/content/config.ts` imports `z` from `astro:content`; its schema needs review.
- The [Astro 7 migration guide](https://docs.astro.build/en/guides/upgrade-to/v7/) describes Vite 8 and the stricter Rust compiler. The build must check templates for invalid markup.
- Registry metadata shows `@tailwindcss/vite` 4.3.3 supports Vite 8; the installed 4.1.18 does not declare that support. Vitest and its coverage package have a 4.1.12 release, avoiding a Vitest major upgrade while addressing the known 4.1.11 and 4.1.12 advisory thresholds.
- Astro 7.4.2 depends on Zod 4. The direct Zod 3 dependency should be reviewed for removal or upgrade, including indirect consumers.
- Reinstalling the candidate versions and auditing the resulting dependency tree is still required to identify remaining alerts, compatible fixes, and any build or integration changes. The above version candidates are not a tested upgrade set.
