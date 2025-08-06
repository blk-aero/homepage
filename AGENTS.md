# **AGENTS.md \- AI Developer Guide**

This document provides instructions and context for AI agents (like Gemini or Codex) working on the BLK Aero HUGO website. Adhering to these guidelines is crucial for maintaining the project's architecture and standards.

## **1. Project Overview & Goals**

* **Objective:** To build a high-performance, SEO-optimized website for BLK Aero, a drone survey company targeting the Brazilian market.
* **Technology Stack:**
  * **Framework:** HUGO (Static Site Generator)
  * **Theme:** hugo-fresh (used as a base, not to be modified directly)
  * **Styling:** SASS (Bulma CSS framework)
  * **Deployment:** GitHub Actions to GitHub Pages

## **2. Development Environment**

* **Local Server:** The project uses Docker for a consistent development environment. To run the local server, use the following command from the project root:
  docker compose \-f docker-compose.dev.yml up

* **Previewing:** The server will be available at http://localhost:1313. Changes to files will trigger a live reload.

## **3. Codebase Navigation & Key Files**

When implementing new features or making changes, refer to these key locations:

* **Global Configuration:** hugo.yaml is the single source of truth for site parameters, navigation, and content for static sections (like the homepage hero and testimonials).
* **Styling:** All custom styles **must** be placed in assets/scss/.
  * \_variables.scss: For changing colors, fonts, and other SASS variables.
  * main.scss: The main entry point for CSS generation.
  * **DO NOT** modify any files inside the themes/hugo-fresh/ directory.
* **Data-Driven Content:**
  * data/clients.yaml: Contains the content for client-specific pages.
  * data/cidades.csv: Contains the content and schema data for city-specific pages.
* **HTML Structure (Layouts):**
  * layouts/partials/: Contains reusable HTML components (header, footer, etc.).
  * layouts/cliente/single.html: The template for client-specific pages.
  * layouts/cidade/single.html: The template for city-specific pages.

## **4. Coding Standards & Best Practices**

1. **Theme Integrity:** Never edit files directly within the themes/hugo-fresh directory. All customizations must be done through overrides in the root assets/, layouts/, and static/ directories.
2. **Data-First Approach:** For scalable content like client and city pages, always use the data files in /data. Do not create individual markdown files in /content for these pages.
3. **SEO is Paramount:** When creating or modifying page templates, ensure that title tags, meta descriptions, and structured data are correctly implemented. For city pages, the LocalBusiness schema from schema.org is a mandatory requirement.
4. **Analytics:** All user-facing interactive elements (buttons, links) that are part of our KPIs must have corresponding event tracking configured. This is managed through GTM; your role is to ensure the HTML elements have stable and unique IDs or classes for GTM to target.
5. **Performance:** Optimize all images for the web. Use HUGO Pipes to minify CSS and JS assets. Ensure that any new features do not negatively impact the Lighthouse performance scores.

## **5. Task Workflow**

1. Before starting any task, review the following sections in README.md for context and specific requirements:
    - **3. Project Requirements**
    - **4. Technical Design & Architecture**
    - **5. Tasks**
2. Use GitFlow:
    - Branch from develop → feature/<ID>-short‑desc
    - Open PRs back to develop.
    - Commit messages must follow Commitizen conventional commits, starting with
    the task ID: `feat(Task 1.1): implement ads_session context manager`
3. Do not start a later task until all dependencies listed in the table are merged.

## **5. Key Project Documents**


* prd.md: The "what" and "why" of the project.
* requirements.md: User stories and acceptance criteria.
* design.md: The technical architecture and implementation details.
* tasks.md: The implementation plan and list of tasks.

## 6. Agent Etiquette

- Prefer incremental PRs (< 400 LOC) to ease review.
- Update relevant README.md sections if you add or change tasks/design.
- Explain any schema or migration scripts in PR description.
