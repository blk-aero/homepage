# Issue tracker: Local Markdown

Issues and specs for this repo live as Markdown files in `docs/issues/`.

## Conventions

- Use one directory per feature: `docs/issues/<feature-slug>/`.
- Store the spec in `docs/issues/<feature-slug>/spec.md`.
- Store each implementation ticket in `docs/issues/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`.
- Record triage state in a `Status:` line near the top of each issue file. See `triage-labels.md` for the values.
- Append comments and conversation history under a `## Comments` heading.

When a skill says to publish to the issue tracker, create a file under `docs/issues/<feature-slug>/`. When it says to fetch a ticket, read the referenced file.

## Wayfinding operations

- **Map:** `docs/issues/<effort>/map.md`.
- **Child ticket:** `docs/issues/<effort>/issues/NN-<slug>.md`, numbered from `01`. Record its type in a `Type:` line (`research`, `prototype`, `grilling`, or `task`) and its state in a `Status:` line.
- **Blocking:** Record dependencies in a `Blocked by: NN, NN` line. A ticket is unblocked when all listed tickets are resolved.
- **Frontier:** Scan child files for open, unblocked, unclaimed tickets; use number order.
- **Claim:** Set `Status: claimed` and save before starting work.
- **Resolve:** Append the answer under `## Answer`, set `Status: resolved`, and add a gist and link to the map's Decisions so far.
