# AGENTS.md Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a repository-specific `AGENTS.md` that gives AI coding agents exact workflow, verification, and release guidance for this Astro project.

**Architecture:** The implementation is documentation-only: create a single authoritative `AGENTS.md` at repo root with operational sections ordered for fast execution. The doc encodes hard verification rules, a repo map, command matrix, and deployment/runbook checkpoints sourced from current project files.

**Tech Stack:** Markdown documentation, Astro project scripts, Vitest, Playwright, Cloudflare Pages deployment conventions.

---

### Task 1: Verify source references for command and runbook accuracy

**Files:**
- Modify: `package.json`
- Modify: `DEPLOYMENT.md`
- Modify: `docs/runbooks/weekly-rollout-qa.md`

**Step 1: Write the failing test**

No automated test file is added for this docs task. The failure condition is a missing/incorrect command or check in `AGENTS.md` compared to repository sources.

**Step 2: Run test to verify it fails**

Run: `test -f AGENTS.md && echo "AGENTS exists" || echo "AGENTS missing"`
Expected: `AGENTS missing`

**Step 3: Write minimal implementation**

Collect exact values to be referenced in `AGENTS.md`:
- scripts from `package.json`
- deployment env/checks from `DEPLOYMENT.md`
- rollout QA checks from `docs/runbooks/weekly-rollout-qa.md`

**Step 4: Run test to verify it passes**

Run: `cat package.json DEPLOYMENT.md docs/runbooks/weekly-rollout-qa.md >/dev/null && echo "references loaded"`
Expected: `references loaded`

**Step 5: Commit**

```bash
git add AGENTS.md
git commit -m "docs(agents): add repository operating guide"
```

### Task 2: Create AGENTS.md with required operational sections

**Files:**
- Create: `AGENTS.md`

**Step 1: Write the failing test**

Run: `test -f AGENTS.md && echo "unexpected existing file" || echo "expected missing file"`
Expected: `expected missing file`

**Step 2: Run test to verify it fails**

Run: `rg -n "^# AGENTS|Required Workflow|Testing Matrix|Deployment" AGENTS.md`
Expected: command fails because file does not yet exist.

**Step 3: Write minimal implementation**

Create `AGENTS.md` with these sections:
- Purpose and Scope
- Repository Map
- Required Workflow
- Hard Requirements
- Default Operating Conventions
- Testing Matrix
- Deployment and Release Checks
- Completion Checklist

Include exact commands:
- `npm run dev`, `npm run build`, `npm run test`, `npm run test:e2e`, `npm run check:links`

Include exact deployment/runbook references:
- `DEPLOYMENT.md`
- `docs/runbooks/weekly-rollout-qa.md`

**Step 4: Run test to verify it passes**

Run: `rg -n "^# AGENTS|^## (Purpose and Scope|Repository Map|Required Workflow|Hard Requirements|Testing Matrix|Deployment and Release Checks|Completion Checklist)" AGENTS.md`
Expected: all listed headings found.

**Step 5: Commit**

```bash
git add AGENTS.md
git commit -m "docs(agents): add repository operating guide"
```

### Task 3: Verify document quality and repo consistency

**Files:**
- Modify: `AGENTS.md`

**Step 1: Write the failing test**

Run: `rg -n "dist|\.astro|SITE_URL|PUBLIC_WHATSAPP_NUMBER|check:links" AGENTS.md`
Expected: if any required token is absent, verification fails.

**Step 2: Run test to verify it fails**

Run: `for token in "dist" ".astro" "SITE_URL" "PUBLIC_WHATSAPP_NUMBER" "check:links"; do rg -q "$token" AGENTS.md || echo "missing:$token"; done`
Expected: no `missing:*` output.

**Step 3: Write minimal implementation**

Adjust wording in `AGENTS.md` for any missing required token/checkpoint and ensure technical-only scope.

**Step 4: Run test to verify it passes**

Run: `for token in "dist" ".astro" "SITE_URL" "PUBLIC_WHATSAPP_NUMBER" "check:links"; do rg -q "$token" AGENTS.md || exit 1; done && echo "token verification passed"`
Expected: `token verification passed`

**Step 5: Commit**

```bash
git add AGENTS.md
git commit -m "docs(agents): finalize verification and deployment guidance"
```
