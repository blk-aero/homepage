# Instruction Audit

## Contradictions Found

- `AGENTS.md` referenced `docs/runbooks/weekly-rollout-qa.md`, but `docs/runbooks` is absent in this checkout. The current active guides focus on the homepage PRD surface instead of the old rollout workflow.

## Essentials Kept in Root

- One-sentence project description.
- Archive access restriction.
- Scope/editing safety that applies to every task.
- Verification-before-completion requirement.
- Links to the split task guides.

## Moved Out of Root

- Repository map: `docs/agents/repository-map.md`.
- Command list and testing matrix: `docs/agents/testing-verification.md`.
- Cloudflare deployment checks: `docs/agents/deployment-release.md`.
- Discovery, current-surface, and future-expansion workflows: `docs/agents/repo-workflows.md`.

## Flagged for Deletion or Avoidance

- Redundant: broad reminders like "prefer targeted tests first" when a specific test matrix already exists.
- Too vague: "technical execution only" without an operational consequence.
- Overly obvious: generic cleanliness guidance not tied to commands, paths, or repo behavior.

## Suggested Docs Structure

- `docs/agents/`: AI-agent operating guidance.
- `docs/runbooks/`: operational procedures if restored.
- `docs/prd/` or `docs/product/`: product planning material if more active PRDs are added.
