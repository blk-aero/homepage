# Git Workflow

Use Git for trunk-based development with stacked commits. Maintain atomic commits and clean pull requests without rewriting active development history.

## Building a Stack

Create sequential branches for each atomic change:

```bash
git checkout -b <branch-name>
git commit -m "<message>"
```

## Modifying Earlier Work

When a previous commit needs updates, ask for the target commit hash, stage the changes, and use:

```bash
git commit --fixup <target-hash>
```

Assume `rebase.updateRefs = true` and `rebase.autoSquash = true` are enabled globally.

## Preparing for Review

When ready to open pull requests, polish the stack with:

```bash
git rebase -i main
```

Git will organize fixups and update branch pointers.

## Syncing with Main

If `main` updates, rebase the bottom of the stack onto `main`; `updateRefs` will carry the rest of the stacked branches along.

## Constraints

- Do not suggest `git commit --amend` for mid-stack commits during active coding.
- Do not suggest interactive rebasing for mid-stack commits during active coding, except for the review-prep autosquash step above.
- Use the fixup workflow for modifications to previous steps.
