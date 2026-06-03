---
title: Guard third-party runtime additions
labels:
  - ready-for-agent
---

# Guard third-party runtime additions

## What to build

Add a guardrail that prevents public pages from gaining new third-party runtime
scripts, trackers, maps, chat widgets, video embeds, or similar dependencies
without an explicit business-purpose exception. Current approved operational
scripts should be represented intentionally rather than treated as accidental
runtime drift.

## Acceptance criteria

- [ ] The current public-page runtime script inventory is captured by a check or
      allowlist.
- [ ] New third-party runtime additions require a named business-purpose
      exception.
- [ ] The guardrail does not remove existing operational or analytics scripts
      unless measurement shows they are harmful or no longer purposeful.
- [ ] Relevant page behavior remains covered by existing tests.

## Test intent

- Behavior: Public pages do not gain unapproved third-party runtime dependencies.
  Public interface: Build output, script inventory, or config test.
  Why this matters: Third-party scripts are a recurring performance risk, and
  PageSpeed reports third-party request chains even when current TBT is healthy.
  Evidence: Build/script inventory check or config test, plus relevant behavior
  specs remaining green.
  Refactor-safe because: The check focuses on the public runtime contract rather
  than how components import local scripts.

## Commit stack

- Commit 1: Add a script inventory or allowlist check. Validation: focused
  config/test run.
- Commit 2: Document exception expectations for future third-party runtime
  additions. Validation: `git diff --check`.

## Blocked by

None - can start immediately.
