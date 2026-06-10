# BLK Aero - Marketing Operations & Setup Guide

This guide details the specifications for conversion payloads, sitemap indexing, and campaign custom reporting configurations.

---

## 1. Offline Conversion Import Payload Schema

All conversion events (`whatsapp_click`, `email_click`, `social_click`) are pushed directly to GTM's `window.dataLayer` in this structure:

```json
{
  "event": "whatsapp_click",
  "event_timestamp": "2026-06-10T16:15:30.000Z", // Precise conversion date/time (ISO 8601)
  "gclid": "gclid_value_or_null",                 // Google Click ID (Google Ads conversion matching)
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "search_topography",
  "utm_term": "drone topography",
  "utm_content": "ad_version_1",
  "landing_page": "/cidades/sao-jose-dos-campos/", // Entry URL where session started
  "page_path": "/solucoes/projeto-e-obra/",        // Page path where click occurred
  "cta_location": "triage-section",
  "whatsapp_greeting_id": "google-cpc-home.home-hero.v1",
  // Form qualifiers (only present for the Final WhatsApp Composer):
  "location": "Rua X, 123",
  "objective": "Regularização Rural"
}
```

---

## 2. Google Search Console (GSC) Sitemap Submission
To ensure Google crawls and indexes new static city and service pages:
1. Log in to [Google Search Console](https://search.google.com/search-console).
2. Register your domain `https://blk.aero` (use DNS verification or HTML file upload).
3. Go to the **Sitemaps** section under Indexing.
4. Input the sitemap path: `sitemap-index.xml` and click **Submit**.
5. Confirm that the status updates to **Success**.

---

## 3. Google Analytics 4 (GA4) Custom Dimensions Setup
To report on macro user journeys natively in GA4, register the custom event parameters:
1. Log in to your Google Analytics 4 property admin dashboard.
2. Navigate to **Admin** -> **Data Display** -> **Custom Definitions**.
3. Under the **Custom Dimensions** tab, click **Create Custom Dimension**.
4. Configure the **Landing Page** dimension:
   - **Dimension Name**: `Landing Page`
   - **Scope**: `Event`
   - **Description**: `First page visited in the session`
   - **Event Parameter**: `landing_page`
5. Configure the **Previous Page** dimension:
   - **Dimension Name**: `Previous Page`
   - **Scope**: `Event`
   - **Description**: `Page path visited right before converting`
   - **Event Parameter**: `previous_page`
6. Click **Save**. Note: These custom dimensions will start populating in reports within 24-48 hours.

---

## 4. Quarterly Freshness Workflow
Every 90 days, verify the following details on the site:
*   **Regulatory Standing**: Confirm the Brazilian Ministry of Defense Categoria A registration remains active, and update any references in FAQs if rules change.
*   **ABNT Standards & Norms**: Check if topographic standards like ABNT NBR 13133 have had any revisions.
*   **Served Client Proof**: Update the Gray normalized logos list in `src/content/site/global.yaml` with any new approved clients.

---

## 5. Post-Project PR & Backlink Workflow
Upon completing major projects, execute the following to boost local SEO authority:
1.  **Anonymized Portfolio Card**: Publish a new portfolio card listing technical deliverables (e.g., "MDT", "BIM 3D", "LEPAC") on the homepage.
2.  **GBP Update**: Post a project map screenshot and brief description on Google Business Profile, linking back to the relevant solution card (e.g. `/solucoes/projeto-e-obra/`).
3.  **Backlink Request**: Ask partners or clients if they can link back to `blk.aero` from their project directories or blogs to pass authority.
