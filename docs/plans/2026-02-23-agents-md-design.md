# AGENTS.md Design

**Date:** 2026-02-23  
**Audience:** AI coding agents only  
**Strictness:** Medium (clear defaults + selected hard requirements)  
**Scope:** Full operational guide (workflow, architecture, deployment, release checks)

## Objectives

Create a repository-specific `AGENTS.md` that enables an AI coding agent to work safely and quickly in this Astro project without relying on implicit conventions.

The document should:
- Define an execution flow for day-to-day development.
- Map the project structure and testing surfaces.
- Encode verification and release checks with evidence-based completion expectations.
- Stay technical and operational (no broad autonomy policy section).

## Proposed Structure

1. Purpose and Scope
- State that guidance is for AI coding agents operating in this repository.
- Clarify medium strictness and expected behavior standards.

2. Repository Map
- Summarize high-signal directories and responsibilities:
  - `src/pages` route definitions
  - `src/content` markdown/yaml content collections
  - `src/lib` shared business logic (consent, datalayer, routes, schema, rollout)
  - `tests/lib` unit tests
  - `tests/e2e` end-to-end coverage
  - `docs/runbooks` operational procedures

3. Required Workflow
- Discovery: inspect affected files and nearby tests first.
- Implementation: keep changes scoped to request.
- Verification: run relevant checks before claiming completion.
- Reporting: include executed commands and outcomes.

4. Hard Requirements
- Never claim success without running relevant verification.
- Prefer targeted tests first, then broader suites as needed.
- Do not edit generated artifacts (`dist`, `.astro`) unless explicitly requested.
- Avoid unrelated refactors while delivering requested change.

5. Default Operating Conventions
- Use `rg`/`rg --files` for search.
- For content/route work, validate route rendering and CTA presence.
- For SEO/schema work, validate robots/sitemap/head impact.
- For rollout-related work, follow weekly QA runbook.

6. Testing Matrix
- `src/lib` changes: related `tests/lib/*` + `npm run test`.
- Route/content changes (`src/pages`, `src/content`): routing e2e + relevant e2e + `npm run build`.
- CTA/navigation/hero behavior changes: relevant conversion/navigation e2e specs.
- Release-sensitive changes: include link check and smoke-style coverage.

7. Deployment and Release Checks
- Cloudflare Pages build assumptions:
  - Build command `npm run build`
  - Output directory `dist`
- Environment variable expectations:
  - Required: `SITE_URL`, `PUBLIC_WHATSAPP_NUMBER`
  - Optional: `PUBLIC_GTM_ID`, `INDEXNOW_KEY`
- Post-deploy validation sequence:
  - `robots.txt`, `sitemap-index.xml`, key routes, GTM preview (if configured), PageSpeed checks.
- Rollout QA reference:
  - `docs/runbooks/weekly-rollout-qa.md`

8. Completion Checklist Format
- Agents must report:
  - commands run,
  - pass/fail status,
  - known unverified areas and why.

## Approaches Considered

1. Compact single-file playbook (recommended)
- Best balance of speed and maintainability for agent use.

2. Policy-first document
- Strong guardrails but slower operational lookup.

3. Workflow-by-job document
- Highly actionable but heavier maintenance burden.

Chosen approach: **Compact single-file playbook**, with clear section ordering optimized for task execution.

## Acceptance Criteria

`AGENTS.md` is complete when it:
- Is unambiguous for AI-agent execution in this repo.
- Uses exact project commands and file locations.
- Includes required verification gates and deployment checks.
- Omits non-technical autonomy policy content.
