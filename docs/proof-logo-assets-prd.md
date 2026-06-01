---
title: Proof Logo Asset Follow-Up - BLK Aero
labels:
  - ready-for-agent
---

# PRD: Proof Logo Asset Curation

## Problem Statement

The homepage proof band currently uses text tags for credentials, associations, clients, and project references. This is release-safe, but it does not yet use curated logo assets that could strengthen visual trust.

## Goal

Create a small, verified logo-asset pipeline for public proof items without blocking the SEO/local expansion backlog.

## Scope

- Collect approved monochrome logo files for proof items BLK is allowed to show publicly.
- Store normalized assets under `src/assets/homepage/proof-logos/mono/`.
- Keep the current text-tag fallback for proof items without approved logo assets.
- Preserve the existing proof groups: `Credenciais e Associações` and `Clientes e Projetos Atendidos`.

## Out of Scope

- Inventing logos or using unapproved marks.
- Changing proof copy, proof group taxonomy, or client relationship wording.
- Replacing the current homepage proof band before assets are available.
- Adding a heavy image-processing or design dependency.

## Acceptance Criteria

- Each logo asset has an approved source and public-use status recorded in the implementation notes or source data.
- Logo rendering keeps consistent perceived size and a restrained monochrome treatment.
- Text fallback remains available for any proof item without an approved logo.
- Homepage visual tests still verify the proof band groups and labels.
