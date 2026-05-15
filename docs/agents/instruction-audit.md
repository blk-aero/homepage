# Instruction Audit Notes

## Contradictions

- None found in the current instructions.

## Essentials Kept in Root

- One-sentence project description.
- Generated-output boundary for `dist` and `.astro`.
- Completion verification requirement.
- Links to task-specific guidance files.

## Flagged for Deletion

- `This file defines how AI coding agents should operate in this repository.` This is redundant with the file name.
- `Scope is technical execution only...` This is useful context but does not need to stay in root once the guides are split.
- `Use rg and rg --files for fast discovery.` This is generally known agent behavior and not repo-specific.
- Repeated Cloudflare and rollout details in root `AGENTS.md`. These now live behind links to source-specific guides.
- `Package manager: npm.` npm is the default package manager and is also discoverable from `package-lock.json`.
- `Before editing, identify impacted files and nearby tests...` This belongs in task routing and testing guidance, not the root essentials.
- `Use npm run check:links only with the local site available...` This belongs in testing guidance, where it is already captured.

## Suggested Structure

```text
docs/
  agents/
    repository-map.md
    testing.md
    git-workflow.md
    deployment-release.md
    instruction-audit.md
  runbooks/
    weekly-rollout-qa.md
```
