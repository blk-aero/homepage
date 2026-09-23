---
title: Trust, Schema, and AI Discovery - BLK Aero
labels:
  - ready-for-agent
---

# PRD: Trust, Schema, and AI Discovery

## Problem Statement

The site has basic metadata, but it does not yet expose a complete trust and AI
discovery layer. Corporate buyers, search engines, and AI assistants need clear
entity facts, schema relationships, official credentials, and machine-readable
service summaries.

## Goal

Add BLK's trust/entity layer through `/sobre`, `/llms.txt`, and connected
JSON-LD graph helpers without coupling this work to generated local SEO rollout.

## Implemented Baseline

- `SeoHead.astro` can inject a JSON-LD object when provided.
- The current route tests intentionally expect `/sobre` to be absent.
- The homepage includes a visible Ministry of Defense aerolevantamento trust
  badge and footer legal entity text.
- This PRD owns the schema and AI discovery layer; local page rollout, lead
  capture, and marketing operations remain separate PRDs.

## Scope

- Add a `/sobre` page with public entity facts, CNPJ, address, founder/person
  context where appropriate, credentials, and official references.
- Add `/public/llms.txt` with a concise machine-readable summary of BLK's
  services, trust facts, and contact details.
- Add centralized helpers for connected JSON-LD graph output.
- Support schema nodes for:
  - BreadcrumbList.
  - Organization.
  - Person/ProfilePage for `/sobre`.
  - Service.
  - FAQPage.
  - Article when blog detail routes exist.
- Support `mentions: [{ name, sameAs }]` for core concepts such as topography
  and REURB where the source is stable.
- Support `speakable` selectors for commercial pages that expose stable BLUF
  and specs sections.
- Define a strict rule to omit `aggregateRating` until visible verified reviews
  and a live Google Business Profile link are present.

## Out of Scope

- Generated city or service-city page rollout.
- Writing long-form case studies.
- Proof logo curation, which is tracked in `docs/proof-logo-assets-prd.md`.
- Fabricating ratings, reviews, client claims, or endorsements.

## Acceptance Criteria

- `/sobre` renders public trust/entity information and is linked where
  appropriate.
- `/llms.txt` is available from the root domain.
- Pages that pass JSON-LD data to `SeoHead.astro` render valid connected schema.
- Schema tests verify key `@id` links and absence of unverified
  `aggregateRating`.
- Relevant route/content E2E tests and `npm run build` pass.
