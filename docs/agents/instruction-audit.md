# Instruction Audit Notes

## Contradictions

- None found in the current instructions.

## Flagged for Deletion

- `This file defines how AI coding agents should operate in this repository.` This is redundant with the file name.
- `Scope is technical execution only...` This is useful context but does not need to stay in root once the guides are split.
- `Use rg and rg --files for fast discovery.` This is generally known agent behavior and not repo-specific.
- Repeated Cloudflare and rollout details in root `AGENTS.md`. These now live behind links to source-specific guides.

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
