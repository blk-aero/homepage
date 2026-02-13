# Astro Rollout-Control Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current Hugo site with an Astro site that launches phase 1 (3 services, 5 cities, 15 combinations) in 2 weeks, with full tracking/SEO infrastructure and weekly status-based rollout afterward.

**Architecture:** Use Astro content collections + markdown as canonical content, and a JSON control layer for activation. Keep business messaging sourced from `/Users/lupion/Documents/homepage/docs/business-context.md`. Build dynamic service/city/service-city routes from active slugs only, with attribution persistence and GA4 via GTM.

**Tech Stack:** Astro, TypeScript, Tailwind, Flowbite, Zod, Vitest, Playwright, Linkinator, Cloudflare Pages, GTM/GA4.

---

## Public APIs / Interfaces / Types

- `rollout-control.json` schema:
  - `active_services: string[]`
  - `active_cities: string[]`
  - `blocked_combinations?: { service: string; city: string }[]`
- Service content frontmatter (markdown): `slug`, `title`, `primary_keyword`, `summary_bluf`, `whatsapp_prompt`, `specifications[]`, `faqs[]`, `price_anchor`, `updated_at`.
- City content frontmatter (markdown): `slug`, `name`, `state`, `lat`, `lng`, `neighborhoods[]`, `local_faqs[]`, `updated_at`.
- Event contract:
  - `whatsapp_click`: `service`, `city`, `page_path`, `utm_*`, `gclid`
  - `click_to_call`: `service`, `city`, `page_path`
  - `email_click`: `service`, `city`, `page_path`

## Task 1: Bootstrap Astro + Testing Harness

**Files:**
- Create: `/Users/lupion/Documents/homepage/package.json`
- Create: `/Users/lupion/Documents/homepage/astro.config.mjs`
- Create: `/Users/lupion/Documents/homepage/tailwind.config.mjs`
- Create: `/Users/lupion/Documents/homepage/vitest.config.ts`
- Create: `/Users/lupion/Documents/homepage/playwright.config.ts`
- Test: `/Users/lupion/Documents/homepage/tests/config/package-scripts.test.ts`

**Step 1: Write the failing test**
```ts
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("project scripts", () => {
  it("defines required scripts", () => {
    const pkg = JSON.parse(readFileSync("/Users/lupion/Documents/homepage/package.json", "utf8"));
    expect(pkg.scripts).toMatchObject({
      dev: "astro dev",
      build: "astro build",
      preview: "astro preview",
      test: "vitest run",
      "test:e2e": "playwright test"
    });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run /Users/lupion/Documents/homepage/tests/config/package-scripts.test.ts`  
Expected: FAIL with `ENOENT: no such file or directory, open '.../package.json'`

**Step 3: Write minimal implementation**

- Run `npm create astro@latest /Users/lupion/Documents/homepage -- --template minimal --typescript strict --install`
- Run `npm i -D vitest @vitest/coverage-v8 playwright linkinator`
- Add scripts in `package.json` for `dev`, `build`, `preview`, `test`, `test:e2e`, `check:links`

**Step 4: Run test to verify it passes**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/config/package-scripts.test.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/package.json /Users/lupion/Documents/homepage/astro.config.mjs /Users/lupion/Documents/homepage/tailwind.config.mjs /Users/lupion/Documents/homepage/vitest.config.ts /Users/lupion/Documents/homepage/playwright.config.ts /Users/lupion/Documents/homepage/tests/config/package-scripts.test.ts
git commit -m "feat(setup): bootstrap astro app with unit and e2e test harness"
```

## Task 2: Add Rollout Control Layer Parser

**Files:**
- Create: `/Users/lupion/Documents/homepage/data/rollout-control.json`
- Create: `/Users/lupion/Documents/homepage/src/lib/rollout.ts`
- Test: `/Users/lupion/Documents/homepage/tests/lib/rollout.test.ts`

**Step 1: Write the failing test**
```ts
import { describe, it, expect } from "vitest";
import { parseRolloutControl, isServiceActive, isCityActive } from "../../src/lib/rollout";

describe("rollout control", () => {
  const control = parseRolloutControl({
    active_services: ["levantamento-planialtimetrico-para-projeto-arquitetonico"],
    active_cities: ["sao-jose-dos-campos-sp"]
  });

  it("marks active service", () => {
    expect(isServiceActive(control, "levantamento-planialtimetrico-para-projeto-arquitetonico")).toBe(true);
  });

  it("marks inactive city", () => {
    expect(isCityActive(control, "jacarei-sp")).toBe(false);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/rollout.test.ts`  
Expected: FAIL with `Cannot find module '../../src/lib/rollout'`

**Step 3: Write minimal implementation**
```ts
import { z } from "zod";

const rolloutSchema = z.object({
  active_services: z.array(z.string()),
  active_cities: z.array(z.string()),
  blocked_combinations: z.array(z.object({
    service: z.string(),
    city: z.string()
  })).optional()
});

export type RolloutControl = z.infer<typeof rolloutSchema>;

export function parseRolloutControl(input: unknown): RolloutControl {
  return rolloutSchema.parse(input);
}

export function isServiceActive(control: RolloutControl, slug: string): boolean {
  return control.active_services.includes(slug);
}

export function isCityActive(control: RolloutControl, slug: string): boolean {
  return control.active_cities.includes(slug);
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/rollout.test.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/data/rollout-control.json /Users/lupion/Documents/homepage/src/lib/rollout.ts /Users/lupion/Documents/homepage/tests/lib/rollout.test.ts
git commit -m "feat(rollout): add status control parser and active slug helpers"
```

## Task 3: Define Content Collections + Phase-1 Markdown Content

**Files:**
- Create: `/Users/lupion/Documents/homepage/src/content/config.ts`
- Create: `/Users/lupion/Documents/homepage/src/content/services/levantamento-planialtimetrico-para-projeto-arquitetonico.md`
- Create: `/Users/lupion/Documents/homepage/src/content/services/georreferenciamento-de-imovel-rural.md`
- Create: `/Users/lupion/Documents/homepage/src/content/services/viabilidade-de-terraplenagem.md`
- Create: `/Users/lupion/Documents/homepage/src/content/cities/sao-jose-dos-campos-sp.md`
- Create: `/Users/lupion/Documents/homepage/src/content/cities/jacarei-sp.md`
- Create: `/Users/lupion/Documents/homepage/src/content/cities/cacapava-sp.md`
- Create: `/Users/lupion/Documents/homepage/src/content/cities/taubate-sp.md`
- Create: `/Users/lupion/Documents/homepage/src/content/cities/pindamonhangaba-sp.md`
- Test: `/Users/lupion/Documents/homepage/tests/content/phase1-content-files.test.ts`

**Step 1: Write the failing test**
```ts
import { existsSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("phase1 content files", () => {
  it("has all 3 service markdown files", () => {
    expect(existsSync("/Users/lupion/Documents/homepage/src/content/services/levantamento-planialtimetrico-para-projeto-arquitetonico.md")).toBe(true);
    expect(existsSync("/Users/lupion/Documents/homepage/src/content/services/georreferenciamento-de-imovel-rural.md")).toBe(true);
    expect(existsSync("/Users/lupion/Documents/homepage/src/content/services/viabilidade-de-terraplenagem.md")).toBe(true);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/content/phase1-content-files.test.ts`  
Expected: FAIL with expected `true` received `false`

**Step 3: Write minimal implementation**

- Add collection schemas in `src/content/config.ts`.
- Populate all phase-1 markdown files.
- Use business-context-aligned messaging and `price_anchor` (`a partir de ...`).

**Step 4: Run test to verify it passes**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/content/phase1-content-files.test.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/src/content/config.ts /Users/lupion/Documents/homepage/src/content/services /Users/lupion/Documents/homepage/src/content/cities /Users/lupion/Documents/homepage/tests/content/phase1-content-files.test.ts
git commit -m "feat(content): add phase1 service and city collections from business context"
```

## Task 4: Build Active Route Pairing Utility

**Files:**
- Create: `/Users/lupion/Documents/homepage/src/lib/routes.ts`
- Test: `/Users/lupion/Documents/homepage/tests/lib/routes.test.ts`

**Step 1: Write the failing test**
```ts
import { describe, it, expect } from "vitest";
import { buildServiceCityPairs } from "../../src/lib/routes";

describe("route pairing", () => {
  it("builds active cross-product and excludes blocked pairs", () => {
    const pairs = buildServiceCityPairs(
      ["s1", "s2"],
      ["c1", "c2"],
      [{ service: "s2", city: "c1" }]
    );
    expect(pairs).toEqual([
      { service: "s1", city: "c1" },
      { service: "s1", city: "c2" },
      { service: "s2", city: "c2" }
    ]);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/routes.test.ts`  
Expected: FAIL with module not found

**Step 3: Write minimal implementation**
```ts
export function buildServiceCityPairs(
  services: string[],
  cities: string[],
  blocked: { service: string; city: string }[] = []
) {
  const blockedSet = new Set(blocked.map((x) => `${x.service}::${x.city}`));
  return services.flatMap((service) =>
    cities
      .filter((city) => !blockedSet.has(`${service}::${city}`))
      .map((city) => ({ service, city }))
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/routes.test.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/src/lib/routes.ts /Users/lupion/Documents/homepage/tests/lib/routes.test.ts
git commit -m "feat(routing): add active service-city pair builder"
```

## Task 5: Implement Dynamic Routes with Control Filtering

**Files:**
- Create: `/Users/lupion/Documents/homepage/src/pages/servicos/[service].astro`
- Create: `/Users/lupion/Documents/homepage/src/pages/cidades/[city].astro`
- Create: `/Users/lupion/Documents/homepage/src/pages/servicos/[service]/[city].astro`
- Test: `/Users/lupion/Documents/homepage/tests/e2e/routing.spec.ts`

**Step 1: Write the failing test**
```ts
import { test, expect } from "@playwright/test";

test("active route returns 200", async ({ page }) => {
  const res = await page.goto("/servicos/georreferenciamento-de-imovel-rural");
  expect(res?.status()).toBe(200);
});

test("inactive route returns 404", async ({ page }) => {
  const res = await page.goto("/cidades/cidade-inativa-sp");
  expect(res?.status()).toBe(404);
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/routing.spec.ts`  
Expected: FAIL with 404 for active route

**Step 3: Write minimal implementation**

- Implement `getStaticPaths` for all three route files.
- Filter with `rollout-control.json` active lists.
- Render basic page content with H1 and BLUF.

**Step 4: Run test to verify it passes**

Run: `npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/routing.spec.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/src/pages/servicos /Users/lupion/Documents/homepage/src/pages/cidades /Users/lupion/Documents/homepage/tests/e2e/routing.spec.ts
git commit -m "feat(pages): add dynamic service and city routes filtered by rollout control"
```

## Task 6: Attribution Capture and Persistence Utilities

**Files:**
- Create: `/Users/lupion/Documents/homepage/src/lib/attribution.ts`
- Test: `/Users/lupion/Documents/homepage/tests/lib/attribution.test.ts`

**Step 1: Write the failing test**
```ts
import { describe, it, expect } from "vitest";
import { parseAttributionParams } from "../../src/lib/attribution";

describe("attribution parser", () => {
  it("extracts utm and gclid", () => {
    const a = parseAttributionParams("?utm_source=google&utm_campaign=test&gclid=abc123");
    expect(a).toMatchObject({
      utm_source: "google",
      utm_campaign: "test",
      gclid: "abc123"
    });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/attribution.test.ts`  
Expected: FAIL module not found

**Step 3: Write minimal implementation**
```ts
export type Attribution = Partial<Record<
  "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content" | "gclid",
  string
>>;

export function parseAttributionParams(search: string): Attribution {
  const params = new URLSearchParams(search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;
  const out: Attribution = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  return out;
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/attribution.test.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/src/lib/attribution.ts /Users/lupion/Documents/homepage/tests/lib/attribution.test.ts
git commit -m "feat(attribution): add utm and gclid parsing utilities"
```

## Task 7: WhatsApp URL Builder + CTA Component

**Files:**
- Create: `/Users/lupion/Documents/homepage/src/lib/whatsapp.ts`
- Create: `/Users/lupion/Documents/homepage/src/components/WhatsAppCTA.astro`
- Test: `/Users/lupion/Documents/homepage/tests/lib/whatsapp.test.ts`

**Step 1: Write the failing test**
```ts
import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl } from "../../src/lib/whatsapp";

describe("whatsapp url", () => {
  it("includes service city and attribution in text", () => {
    const url = buildWhatsAppUrl("5511999999999", {
      service: "georreferenciamento-de-imovel-rural",
      city: "jacarei-sp",
      attribution: { utm_source: "google", gclid: "abc123" }
    });
    expect(url).toContain("wa.me/5511999999999");
    expect(decodeURIComponent(url)).toContain("georreferenciamento-de-imovel-rural");
    expect(decodeURIComponent(url)).toContain("jacarei-sp");
    expect(decodeURIComponent(url)).toContain("gclid=abc123");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/whatsapp.test.ts`  
Expected: FAIL module not found

**Step 3: Write minimal implementation**

- Implement `buildWhatsAppUrl`.
- Add `WhatsAppCTA.astro` using the builder and emitting `data` attributes for analytics.

**Step 4: Run test to verify it passes**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/whatsapp.test.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/src/lib/whatsapp.ts /Users/lupion/Documents/homepage/src/components/WhatsAppCTA.astro /Users/lupion/Documents/homepage/tests/lib/whatsapp.test.ts
git commit -m "feat(conversion): add whatsapp url builder and cta component"
```

## Task 8: DataLayer Event Helpers + Contact Links

**Files:**
- Create: `/Users/lupion/Documents/homepage/src/lib/datalayer.ts`
- Create: `/Users/lupion/Documents/homepage/src/components/ContactLinks.astro`
- Test: `/Users/lupion/Documents/homepage/tests/lib/datalayer.test.ts`

**Step 1: Write the failing test**
```ts
import { describe, it, expect, vi } from "vitest";
import { pushEvent } from "../../src/lib/datalayer";

describe("datalayer", () => {
  it("pushes event into window.dataLayer", () => {
    const push = vi.fn();
    (globalThis as any).window = { dataLayer: { push } };
    pushEvent({ event: "click_to_call", page_path: "/servicos/x" });
    expect(push).toHaveBeenCalledWith({ event: "click_to_call", page_path: "/servicos/x" });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/datalayer.test.ts`  
Expected: FAIL module not found

**Step 3: Write minimal implementation**
```ts
export function pushEvent(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const dl = (window as any).dataLayer ?? ((window as any).dataLayer = []);
  if (typeof dl.push === "function") dl.push(payload);
}
```

- Add `ContactLinks.astro` to fire `click_to_call` and `email_click`.

**Step 4: Run test to verify it passes**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/datalayer.test.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/src/lib/datalayer.ts /Users/lupion/Documents/homepage/src/components/ContactLinks.astro /Users/lupion/Documents/homepage/tests/lib/datalayer.test.ts
git commit -m "feat(tracking): add dataLayer helper and contact event links"
```

## Task 9: GTM Loader + Consent Mode Baseline

**Files:**
- Create: `/Users/lupion/Documents/homepage/src/components/GtmHead.astro`
- Create: `/Users/lupion/Documents/homepage/src/components/ConsentBanner.astro`
- Create: `/Users/lupion/Documents/homepage/src/lib/consent.ts`
- Test: `/Users/lupion/Documents/homepage/tests/lib/consent.test.ts`

**Step 1: Write the failing test**
```ts
import { describe, it, expect } from "vitest";
import { defaultConsentState } from "../../src/lib/consent";

describe("consent defaults", () => {
  it("starts denied", () => {
    expect(defaultConsentState()).toEqual({
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/consent.test.ts`  
Expected: FAIL module not found

**Step 3: Write minimal implementation**

- Implement `defaultConsentState` and update helpers.
- Render GTM only when `PUBLIC_GTM_ID` is set.
- Add accept/reject banner with reopen mechanism.

**Step 4: Run test to verify it passes**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/consent.test.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/src/components/GtmHead.astro /Users/lupion/Documents/homepage/src/components/ConsentBanner.astro /Users/lupion/Documents/homepage/src/lib/consent.ts /Users/lupion/Documents/homepage/tests/lib/consent.test.ts
git commit -m "feat(consent): add gtm conditional loader and consent mode defaults"
```

## Task 10: SEO Head + JSON-LD Graph Builders + /sobre

**Files:**
- Create: `/Users/lupion/Documents/homepage/src/components/SeoHead.astro`
- Create: `/Users/lupion/Documents/homepage/src/lib/schema.ts`
- Create: `/Users/lupion/Documents/homepage/src/pages/sobre.astro`
- Test: `/Users/lupion/Documents/homepage/tests/lib/schema.test.ts`

**Step 1: Write the failing test**
```ts
import { describe, it, expect } from "vitest";
import { buildServiceGraph } from "../../src/lib/schema";

describe("schema graph", () => {
  it("includes WebPage, Service and BreadcrumbList ids", () => {
    const graph = buildServiceGraph({
      siteUrl: "https://example.com",
      slug: "georreferenciamento-de-imovel-rural",
      title: "Georreferenciamento de Imóvel Rural"
    });
    const types = graph["@graph"].map((n: any) => n["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("Service");
    expect(types).toContain("BreadcrumbList");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/schema.test.ts`  
Expected: FAIL module not found

**Step 3: Write minimal implementation**

- Implement schema builders for Organization, Person (`/sobre`), WebPage, Service, FAQPage, BreadcrumbList.
- Add `sameAs`, `speakable`, `mentions` support fields.
- Wire `SeoHead` into service/city pages.

**Step 4: Run test to verify it passes**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/schema.test.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/src/components/SeoHead.astro /Users/lupion/Documents/homepage/src/lib/schema.ts /Users/lupion/Documents/homepage/src/pages/sobre.astro /Users/lupion/Documents/homepage/tests/lib/schema.test.ts
git commit -m "feat(seo): add json-ld graph builders and sobre entity page"
```

## Task 11: Performance Components (LiteYouTube + LazyIframe)

**Files:**
- Create: `/Users/lupion/Documents/homepage/src/components/LiteYouTube.astro`
- Create: `/Users/lupion/Documents/homepage/src/components/LazyIframe.astro`
- Test: `/Users/lupion/Documents/homepage/tests/e2e/lite-embed.spec.ts`

**Step 1: Write the failing test**
```ts
import { test, expect } from "@playwright/test";

test("lite youtube does not load iframe before click", async ({ page }) => {
  await page.goto("/servicos/viabilidade-de-terraplenagem");
  await expect(page.locator('iframe[src*="youtube-nocookie.com"]')).toHaveCount(0);
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/lite-embed.spec.ts`  
Expected: FAIL because component/route not wired

**Step 3: Write minimal implementation**

- Implement thumbnail-first component that injects iframe only on click.
- Support optional `VideoObject` output when metadata prop is provided.
- Add `LazyIframe` click-to-load behavior.

**Step 4: Run test to verify it passes**

Run: `npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/lite-embed.spec.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/src/components/LiteYouTube.astro /Users/lupion/Documents/homepage/src/components/LazyIframe.astro /Users/lupion/Documents/homepage/tests/e2e/lite-embed.spec.ts
git commit -m "feat(perf): add lite youtube and lazy iframe components"
```

## Task 12: IndexNow + Robots/Sitemap + Link Checker + Deployment Docs

**Files:**
- Create: `/Users/lupion/Documents/homepage/scripts/indexnow.mjs`
- Create: `/Users/lupion/Documents/homepage/src/pages/robots.txt.ts`
- Modify: `/Users/lupion/Documents/homepage/astro.config.mjs`
- Create: `/Users/lupion/Documents/homepage/DEPLOYMENT.md`
- Create: `/Users/lupion/Documents/homepage/docs/runbooks/weekly-rollout-qa.md`
- Test: `/Users/lupion/Documents/homepage/tests/lib/indexnow.test.ts`

**Step 1: Write the failing test**
```ts
import { describe, it, expect } from "vitest";
import { buildIndexNowPayload } from "../../scripts/indexnow";

describe("indexnow payload", () => {
  it("builds payload with host key and urlList", () => {
    const payload = buildIndexNowPayload({
      host: "example.com",
      key: "abc123",
      keyLocation: "https://example.com/abc123.txt",
      urlList: ["https://example.com/servicos/x"]
    });
    expect(payload.host).toBe("example.com");
    expect(payload.urlList.length).toBe(1);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/indexnow.test.ts`  
Expected: FAIL module not found

**Step 3: Write minimal implementation**

- Implement `buildIndexNowPayload`.
- Enable sitemap in Astro config.
- Add robots route referencing sitemap.
- Add `check:links` script with Linkinator.
- Add deployment and weekly rollout QA docs with Cloudflare env vars.

**Step 4: Run test to verify it passes**

Run: `npm run test -- /Users/lupion/Documents/homepage/tests/lib/indexnow.test.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/scripts/indexnow.mjs /Users/lupion/Documents/homepage/src/pages/robots.txt.ts /Users/lupion/Documents/homepage/astro.config.mjs /Users/lupion/Documents/homepage/DEPLOYMENT.md /Users/lupion/Documents/homepage/docs/runbooks/weekly-rollout-qa.md /Users/lupion/Documents/homepage/tests/lib/indexnow.test.ts
git commit -m "feat(ops): add indexnow, sitemap/robots, link checks, and deployment runbooks"
```

## Task 13: End-to-End Validation Gate (Phase 1 Release)

**Files:**
- Modify: `/Users/lupion/Documents/homepage/package.json`
- Create: `/Users/lupion/Documents/homepage/tests/e2e/conversion-flow.spec.ts`
- Create: `/Users/lupion/Documents/homepage/tests/e2e/accessibility-smoke.spec.ts`

**Step 1: Write the failing test**
```ts
import { test, expect } from "@playwright/test";

test("utm survives internal navigation for whatsapp", async ({ page }) => {
  await page.goto("/servicos/georreferenciamento-de-imovel-rural/jacarei-sp?utm_source=google&gclid=abc123");
  await page.goto("/servicos/georreferenciamento-de-imovel-rural");
  const href = await page.locator('[data-testid="whatsapp-cta"]').getAttribute("href");
  expect(decodeURIComponent(href || "")).toContain("gclid=abc123");
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/conversion-flow.spec.ts`  
Expected: FAIL until persistence wiring is complete

**Step 3: Write minimal implementation**

- Wire attribution capture script globally.
- Ensure CTA reads persisted values.
- Add release scripts:
  - `test:unit`
  - `test:e2e`
  - `build`
  - `check:links`

**Step 4: Run test to verify it passes**

Run: `npm run test:e2e -- /Users/lupion/Documents/homepage/tests/e2e/conversion-flow.spec.ts`  
Expected: PASS

**Step 5: Commit**
```bash
git add /Users/lupion/Documents/homepage/package.json /Users/lupion/Documents/homepage/tests/e2e/conversion-flow.spec.ts /Users/lupion/Documents/homepage/tests/e2e/accessibility-smoke.spec.ts
git commit -m "test(release): add phase1 conversion and accessibility smoke gates"
```

## Deferred Post-Rollout Tasks (explicitly deferred)

- Lead magnet pages and `lead_magnet_submit` tracking.
- Strict official-source outbound citation enforcement and stricter RAG formatting checks.
- Quarterly freshness sprint operations (`updated_at` policy automation and checks).

## End-to-End Acceptance Criteria

- `npm run build` passes.
- `npm run preview` serves active routes correctly.
- Active pages only are listed in sitemap.
- WhatsApp/call/email events are pushed correctly.
- UTMs/gclid persist across internal navigation.
- Lighthouse accessibility target and baseline CWV checks meet gate.
- Link checker passes for active URLs.
- Cloudflare deployment docs are complete and accurate.

## Assumptions and Defaults

- Business messaging and service positioning come from `/Users/lupion/Documents/homepage/docs/business-context.md`.
- Phase-1 services are fixed to the 3 approved slugs.
- Pricing display is `a partir de` only.
- Weekly rollout is manual via control file updates and human QA.
- CRM/offline conversion import remains out of scope for phase 1.
- Use frequent commits (one commit per task as listed).
