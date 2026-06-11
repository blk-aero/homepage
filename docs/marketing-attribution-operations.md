---
title: Marketing Attribution and Operations
labels:
  - ready-for-agent
---

## Problem Statement

The BLK Aero website lacks a robust, session-spanning marketing attribution framework to understand how ads and campaigns perform. The website relies purely on sessionStorage for first-touch campaign parameters (UTM and GCLID), which is lost when the browser tab is closed or a session expires. Furthermore, there are no tags, triggers, or variables configured inside Google Tag Manager (GTM) or Google Analytics 4 (GA4) to measure primary WhatsApp or secondary email click conversions. Additionally, we need to track visitors' entry landing pages and macro user journeys (e.g. landing on a city page, viewing a solution, and then clicking WhatsApp) to support SEO work, automatically submit new pages to search engines like Bing/Yandex (via IndexNow), and document manual steps to submit sitemaps to Google Search Console (GSC) and register custom dimensions in GA4.

## Solution

1.  **Durable First-Touch Cookie Fallback**: Add a first-party cookie fallback (`blk_cookie_attribution_v1`) with a 7-day TTL to preserve first-touch UTM parameters and GCLID values across browser closures and sessions.
2.  **Macro User Journey Tracking**: Capture the first page a user visits as the `landing_page` (stored in sessionStorage and a 7-day cookie fallback) and the immediate previous path they came from as `previous_page`.
3.  **Enriched dataLayer Events**: Push enriched conversion event payloads (`whatsapp_click`, `email_click`, `social_click`) containing attribution details, landing pages, referrer paths, and event timestamps to the GTM `dataLayer`.
4.  **A/B Testing Head Room**: Place HTML comment placeholders early in the layout `<head>` to reserve slots for future optimization scripts (like VWO or Optimizely).
5.  **GTM Container Recipe JSON**: Export a pre-configured JSON container template containing all dataLayer variables, custom triggers, GA4 event tags, and Meta Pixel Custom HTML tags for easy, one-click GTM import.
6.  **IndexNow Submission Script**: Add an opt-in, environment-gated build utility that reads generated sitemaps and programmatically notifies Bing/Yandex of new or updated pages.
7.  **Minimalist Operations Guide**: Create a guide explaining the conversion payload schema, GSC manual sitemap registration instructions, GA4 manual Custom Dimensions setup steps, page freshness checklists, and post-project backlink cadences.

## User Stories

1.  As a marketing manager, I want campaign parameters (UTM parameters and GCLID) to persist in a first-party cookie for 7 days, so that returning search ad visitors who close their tabs before converting are still attributed to their original campaign.
2.  As a web developer, I want GTM events to include a `landing_page` parameter, so that I can see which SEO entry page (like city pages or home) eventually generated the WhatsApp lead.
3.  As an analyst, I want GTM events to include a `previous_page` parameter, so that I can understand the macro user journey (e.g. Home to City to WhatsApp) immediately within a conversion event.
4.  As a CRM developer, I want every conversion event pushed to the dataLayer to include an ISO 8601 `event_timestamp`, so that I can match conversions precisely in offline database imports.
5.  As a marketing manager, I want the email and social link clicks to push `email_click` and `social_click` events with full attribution context to the dataLayer, so that I can track secondary contact engagement.
6.  As an ad manager, I want an importable GTM Container Recipe containing pre-mapped GA4 event tags, so that I can set up website conversion tracking in Google Analytics in under five minutes.
7.  As an advertiser, I want the GTM Container Recipe to include Meta Pixel custom event placeholders triggered by website clicks, so that I can start optimizing Facebook and Instagram campaigns easily.
8.  As a site editor, I want new and updated pages to be automatically submitted to Bing and Yandex after a build via IndexNow, so that they are indexed by search engines immediately.
9.  As a site builder, I want the IndexNow post-build script to exit safely without errors or API calls if no key is configured in the environment, so that local builds and PR pipelines do not fail.
10. As a marketer, I want clear instructions on how to manually submit the sitemap to Google Search Console, so that I can ensure Google crawls new static city and service pages.
11. As an analyst, I want clear steps on how to register `landing_page` and `previous_page` as Custom Dimensions in GA4, so that I can create custom reports using these dimensions in GA4.
12. As a QA engineer, I want automated E2E tests to verify that GTM dataLayer pushes match the exact required payload structures, so that changes do not break analytics or conversion tracking.
13. As a developer, I want a clean head placeholder comment for A/B testing scripts, so that I can integrate testing platforms in the future without messing up the HTML head structure.

## Implementation Decisions

*   **Attribution Storage Lifecycle**:
    *   On page load, if sessionStorage is empty, the client script will check for the `blk_cookie_attribution_v1` cookie. If found, it hydrates sessionStorage.
    *   If current URL query parameters exist, they are parsed and merged. The first-touch parameters take precedence.
    *   The final merged attribution values are saved back to both sessionStorage and written to `blk_cookie_attribution_v1` (cookie expiration set to 7 days).
*   **Macro Journey State**:
    *   `landing_page` is evaluated once per visitor: checked in sessionStorage, then in cookie `blk_cookie_landing_page_v1`. If both are missing, the current path is saved in both.
    *   `previous_page` is tracked via sessionStorage-based history. On page load, the script updates the session's navigation history, setting `previous_page` to the previously visited path on the same site within the session.
*   **Conversion Event Payloads**:
    All tags pushed to the `dataLayer` for clicks on WhatsApp, email, and social outbound links will match the following JSON structure:
    ```json
    {
      "event": "whatsapp_click",
      "event_timestamp": "2026-06-10T16:15:30.000Z",
      "gclid": "gclid_value_or_null",
      "utm_source": "google",
      "utm_medium": "cpc",
      "utm_campaign": "search_topography",
      "utm_term": "drone topography",
      "utm_content": "ad_version_1",
      "landing_page": "/cidades/sao-jose-dos-campos/",
      "page_path": "/solucoes/projeto-e-obra/",
      "cta_location": "triage-section",
      "whatsapp_greeting_id": "google-cpc-home.home-hero.v1",
      "location": "Rua X, 123",
      "objective": "Regularização de Lote"
    }
    ```
*   **Opt-In IndexNow Build Hook**:
    *   The IndexNow submission script will be placed at `scripts/indexnow.mjs`.
    *   The script reads `dist/sitemap-index.xml` (or `dist/sitemap-0.xml`), extracts all unique URLs, and POSTs them to `https://api.indexnow.org/IndexNow` if the `INDEXNOW_KEY` environment variable is defined.
    *   The test guard rail list in `tests/config/current-surface.test.ts` will be updated to allow this script file path.
*   **GTM Recipe Config**:
    *   A pre-configured JSON container export will be saved to `docs/gtm-container-recipe.json`.
    *   The container declares Data Layer Variables, Custom Event triggers, and corresponding tag configurations for GA4 conversions and Meta Pixel custom HTML tags.

## Testing Decisions

*   **E2E Playwright Tests**:
    *   Tests will intercept the `window.dataLayer` object on a mocked page load.
    *   Test cases will verify GTM event trigger payload properties: `whatsapp_click`, `email_click`, and `social_click`.
    *   Multi-page navigation tests will simulate cookie/session storage clearing and assert that first-touch values are preserved and hydrated.
*   **Vitest Unit Tests**:
    *   A test suite will mock `fs` and `fetch` to assert that the `scripts/indexnow.mjs` script exits cleanly when `INDEXNOW_KEY` is undefined, and issues the correct POST payload when it is defined.
    *   A test suite will validate that `docs/gtm-container-recipe.json` contains valid, parsable JSON matching GTM schema elements.

## Out of Scope

*   Proactive `click_to_call` tracking on `tel:` links (as WhatsApp is the primary contact channel in the target market).
*   Automatic Google Search Console sitemap submission via Google Indexing API (this will remain a manual human task).
*   Server-side Meta Pixel Conversions API (CAPI) integration.
*   Altering WhatsApp visible prefilled texts to show raw UTMs or GCLIDs.

## Further Notes

*   A checklist for manual sitemap registration in Google Search Console and manual custom dimensions setup in GA4 will be provided in the operations guide (`docs/marketing-operations.md`).
