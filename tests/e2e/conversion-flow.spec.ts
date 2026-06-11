import { test, expect } from "@playwright/test";

function whatsappTextFromHref(href: string | null): string {
  return new URL(href || "").searchParams.get("text") || "";
}

function visibleWhatsAppText(text: string): string {
  return text.replace(/[\u200E\u00A0\u200B\u200C\u200D\u2800]/g, "");
}

test("utm survives internal navigation in whatsapp click analytics", async ({ page }) => {
  await page.goto("/blog?utm_source=google&utm_medium=cpc&utm_campaign=teste&gclid=abc123");
  const blogUrl = page.url();

  await page.goto("/", { referer: blogUrl });

  const cta = page.locator('[data-testid="whatsapp-cta"]').first();
  const href = await cta.getAttribute("href");
  expect(whatsappTextFromHref(href)).not.toContain("gclid");

  await cta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "whatsapp_click");
  });

  expect(payload).toMatchObject({
    gclid: "abc123",
    utm_source: "google"
  });
  expect(payload.event_timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  expect(payload.landing_page).toBe("/blog");
  expect(payload.previous_page).toBe("/blog");
});

test("first-touch attribution wins over later conflicting campaign params", async ({ page }) => {
  await page.goto("/?utm_source=google&utm_medium=cpc&utm_campaign=home&gclid=first-click");
  const firstTouchUrl = page.url();
  await page.goto(
    "/?utm_source=linkedin&utm_medium=social&utm_campaign=retargeting&utm_content=later&gclid=second-click",
    { referer: firstTouchUrl }
  );

  const cta = page.locator('[data-testid="whatsapp-cta"]').first();
  const text = whatsappTextFromHref(await cta.getAttribute("href"));
  expect(text).not.toContain("utm_source");
  expect(text).not.toContain("gclid");

  await cta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "whatsapp_click");
  });

  expect(payload).toMatchObject({
    cta_location: "home-hero",
    whatsapp_greeting_id: "google-cpc-home.home-hero.v1",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "home",
    utm_content: "later",
    gclid: "first-click"
  });
  expect(payload.event_timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  expect(payload.landing_page).toBe("/");
  expect(payload.previous_page).toBe("/");
});

test("homepage whatsapp CTA keeps message simple while click payload keeps attribution", async ({
  page
}) => {
  await page.goto("/?utm_source=google&utm_medium=cpc&utm_campaign=home&gclid=abc123");

  const cta = page.locator('[data-testid="whatsapp-cta"]').first();
  await expect(cta).toBeVisible();

  const text = whatsappTextFromHref(await cta.getAttribute("href"));
  expect(visibleWhatsAppText(text)).toContain("Oi, quero falar com a BLK.");
  expect(text).not.toContain("CTA:");
  expect(text).not.toContain("utm_source");
  expect(text).not.toContain("gclid");
  expect(text).not.toContain("orçamento");

  await cta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "whatsapp_click");
  });

  expect(payload).toMatchObject({
    event: "whatsapp_click",
    page_path: "/",
    cta_location: "home-hero",
    utm_source: "google",
    gclid: "abc123"
  });
  expect(payload.event_timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  expect(payload.landing_page).toBe("/");
  expect(payload.previous_page).toBe("");
});

test("homepage triage section whatsapp CTA includes section location and attribution", async ({
  page
}) => {
  await page.goto("/?utm_source=google&gclid=abc123");

  const triageSection = page.getByTestId("section-triage-cards");
  const cta = triageSection.getByRole("link", { name: "Falar com especialista" });
  await expect(cta).toBeVisible();
  await expect(triageSection.locator("article").getByRole("link", { name: "Falar com especialista" })).toHaveCount(0);

  const text = whatsappTextFromHref(await cta.getAttribute("href"));
  expect(visibleWhatsAppText(text)).toContain("Oi, gostaria de falar com a BLK.");
  expect(text).not.toContain("Cluster selecionado:");
  expect(text).not.toContain("CTA:");
  expect(text).not.toContain("gclid");

  await cta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find(
      (event) => event.event === "whatsapp_click" && event.cta_location === "triage-section"
    );
  });

  expect(payload).toMatchObject({
    event: "whatsapp_click",
    page_path: "/",
    cta_location: "triage-section",
    gclid: "abc123"
  });
  expect(payload.event_timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  expect(payload.landing_page).toBe("/");
  expect(payload.previous_page).toBe("");
  expect(payload.selected_cluster).toBeUndefined();
});

test("homepage final CTA composer uses shared whatsapp payload behavior", async ({ page }) => {
  await page.goto("/?utm_source=google&gclid=abc123");

  const finalSection = page.getByTestId("section-final-cta");
  const finalHeading = finalSection.getByRole("heading", {
    name: "Envie localização e objetivo do projeto"
  });
  const location = finalSection.getByLabel("Localização do projeto");
  const objective = finalSection.getByLabel("Objetivo");
  const finalCta = finalSection.getByRole("link", { name: "Falar com especialista" });

  await expect(finalHeading).toBeVisible();
  await expect(finalSection).toContainText(
    "Com essas duas informações, a BLK já consegue orientar o escopo inicial e indicar o próximo passo pelo WhatsApp."
  );
  await expect(location).toHaveAttribute("maxlength", "300");
  await expect(objective).toContainText("Ainda não sei, preciso de orientação");
  await expect(finalCta).toBeVisible();

  await expect(objective).toHaveValue("");
  const initialText = whatsappTextFromHref(await finalCta.getAttribute("href"));
  expect(visibleWhatsAppText(initialText)).toContain("Oi, quero falar com a BLK.");
  expect(initialText).not.toContain("CTA:");
  expect(initialText).not.toContain("Objetivo:");
  expect(initialText).not.toContain("gclid");

  const sectionBox = await finalSection.boundingBox();
  const headingBox = await finalHeading.boundingBox();
  const ctaBox = await finalCta.boundingBox();
  const locationBox = await location.boundingBox();
  const objectiveBox = await objective.boundingBox();
  expect(sectionBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(ctaBox).not.toBeNull();
  expect(locationBox).not.toBeNull();
  expect(objectiveBox).not.toBeNull();
  if (locationBox && objectiveBox && ctaBox) {
    expect(Math.abs(locationBox.y - objectiveBox.y)).toBeLessThan(12);
    expect(Math.abs(objectiveBox.y - ctaBox.y)).toBeLessThan(24);
  }

  const formBackground = await finalSection.locator("form").evaluate((node) => getComputedStyle(node).backgroundColor);
  const sectionBackground = await finalSection.evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(sectionBackground).not.toBe("rgb(255, 255, 255)");
  expect(formBackground).toBe("rgba(0, 0, 0, 0)");

  await location.fill("São José dos Campos - https://maps.app.goo.gl/exemplo");
  await objective.selectOption("Regularização Rural");

  const text = whatsappTextFromHref(await finalCta.getAttribute("href"));
  expect(text).not.toContain("CTA:");
  expect(text).not.toContain("gclid");
  expect(text).toContain("Localização: São José dos Campos - https://maps.app.goo.gl/exemplo.");
  expect(text).toContain("Objetivo: Regularização Rural.");

  await finalCta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find(
      (event) => event.event === "whatsapp_click" && event.cta_location === "final-cta"
    );
  });

  expect(payload).toMatchObject({
    event: "whatsapp_click",
    page_path: "/",
    cta_location: "final-cta",
    gclid: "abc123"
  });
  expect(payload.location).toBeUndefined();
  expect(payload.objective).toBeUndefined();
  expect(payload.event_timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  expect(payload.landing_page).toBe("/");
  expect(payload.previous_page).toBe("");
});

test("footer email click pushes supporting contact analytics", async ({ page }) => {
  await page.goto("/?utm_source=google&gclid=abc123");

  const email = page.getByRole("link", { name: "contato@blk.aero" });
  await email.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "email_click");
  });

  expect(payload).toMatchObject({
    event: "email_click",
    email: "contato@blk.aero",
    cta_location: "footer",
    page_path: "/",
    utm_source: "google",
    gclid: "abc123"
  });
  expect(payload.event_timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  expect(payload.landing_page).toBe("/");
  expect(payload.previous_page).toBe("");
});

test("privacy policy email click pushes supporting contact analytics", async ({ page }) => {
  await page.goto("/politica-de-privacidade?utm_source=privacy-test");

  const email = page.getByRole("link", { name: "contato@blk.aero" }).last();
  await email.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "email_click");
  });

  expect(payload).toMatchObject({
    event: "email_click",
    email: "contato@blk.aero",
    page_path: "/politica-de-privacidade",
    utm_source: "privacy-test"
  });
  expect(payload.event_timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  expect(payload.landing_page).toBe("/politica-de-privacidade");
  expect(payload.previous_page).toBe("");
});

test("footer social click pushes supporting contact analytics", async ({ page }) => {
  await page.goto("/?utm_source=linkedin&utm_medium=social");

  const social = page.locator("footer").getByRole("link", { name: "LinkedIn" });
  await social.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "social_click");
  });

  expect(payload).toMatchObject({
    event: "social_click",
    social_platform: "LinkedIn",
    outbound_url: "https://www.linkedin.com/company/blk-aero",
    page_path: "/",
    utm_source: "linkedin",
    utm_medium: "social"
  });
  expect(payload.event_timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  expect(payload.landing_page).toBe("/");
  expect(payload.previous_page).toBe("");
});

test("cross-session cookie fallback preserves attribution after sessionStorage is cleared", async ({
  page
}) => {
  await page.goto("/blog?utm_source=google&utm_medium=cpc&utm_campaign=teste&gclid=abc123");

  const attributionCookie = (await page.context().cookies()).find(
    (cookie) => cookie.name === "blk_cookie_attribution_v1"
  );
  expect(attributionCookie).toBeDefined();
  const secondsUntilExpiry = (attributionCookie?.expires || 0) - Date.now() / 1000;
  expect(secondsUntilExpiry).toBeGreaterThan(6.8 * 24 * 60 * 60);
  expect(secondsUntilExpiry).toBeLessThan(7.1 * 24 * 60 * 60);

  await page.evaluate(() => sessionStorage.clear());

  const blogUrl = page.url();
  await page.goto("/", { referer: blogUrl });

  const cta = page.locator('[data-testid="whatsapp-cta"]').first();
  await cta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "whatsapp_click");
  });

  expect(payload).toMatchObject({
    gclid: "abc123",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "teste"
  });
  expect(payload.event_timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  expect(payload.landing_page).toBe("/blog");
  expect(payload.previous_page).toBe("/blog");
});

test("attribution cookie refreshes to a rolling seven day expiry", async ({ page }) => {
  const oneDayFromNow = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
  await page.context().addCookies([
    {
      name: "blk_cookie_attribution_v1",
      value: encodeURIComponent(JSON.stringify({ utm_source: "seeded", gclid: "old-click" })),
      domain: "127.0.0.1",
      path: "/",
      expires: oneDayFromNow,
      httpOnly: false,
      secure: true,
      sameSite: "Lax"
    }
  ]);

  await page.goto("/");

  const cta = page.locator('[data-testid="whatsapp-cta"]').first();
  await cta.dispatchEvent("click");

  const refreshedCookie = (await page.context().cookies()).find(
    (cookie) => cookie.name === "blk_cookie_attribution_v1"
  );
  expect(refreshedCookie).toBeDefined();
  const secondsUntilExpiry = (refreshedCookie?.expires || 0) - Date.now() / 1000;
  expect(secondsUntilExpiry).toBeGreaterThan(6.8 * 24 * 60 * 60);
  expect(secondsUntilExpiry).toBeLessThan(7.1 * 24 * 60 * 60);

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "whatsapp_click");
  });
  expect(payload).toMatchObject({
    utm_source: "seeded",
    gclid: "old-click"
  });
});

test("external referrer does not populate previous_page analytics", async ({ page }) => {
  await page.goto("/blog?utm_source=google&gclid=abc123");
  await page.goto("/", { referer: "https://example.com/campaign" });

  const cta = page.locator('[data-testid="whatsapp-cta"]').first();
  await cta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "whatsapp_click");
  });

  expect(payload).toMatchObject({
    event: "whatsapp_click",
    page_path: "/",
    gclid: "abc123"
  });
  expect(payload.previous_page).toBe("");
});
