import { test, expect } from "@playwright/test";

test("utm survives internal navigation for whatsapp", async ({ page }) => {
  await page.goto("/blog?utm_source=google&utm_medium=cpc&utm_campaign=teste&gclid=abc123");

  await page.goto("/");

  const href = await page.locator('[data-testid="whatsapp-cta"]').first().getAttribute("href");
  expect(decodeURIComponent(href || "")).toContain("gclid=abc123");
});

test("homepage whatsapp CTA includes CTA location and attribution in URL and click payload", async ({
  page
}) => {
  await page.goto("/?utm_source=google&utm_campaign=home&gclid=abc123");

  const cta = page.locator('[data-testid="whatsapp-cta"]').first();
  await expect(cta).toBeVisible();

  const href = decodeURIComponent((await cta.getAttribute("href")) || "");
  expect(href).toContain("CTA: home-hero.");
  expect(href).toContain("utm_source=google");
  expect(href).toContain("gclid=abc123");

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
});

test("homepage triage section whatsapp CTA includes section location and attribution", async ({
  page
}) => {
  await page.goto("/?utm_source=google&gclid=abc123");

  const triageSection = page.getByTestId("section-triage-cards");
  const cta = triageSection.getByRole("link", { name: "Falar com especialista" });
  await expect(cta).toBeVisible();
  await expect(triageSection.locator("article").getByRole("link", { name: "Falar com especialista" })).toHaveCount(0);

  const href = decodeURIComponent((await cta.getAttribute("href")) || "");
  expect(href).not.toContain("Cluster selecionado:");
  expect(href).toContain("CTA: triage-section.");
  expect(href).toContain("gclid=abc123");

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
  expect(payload.selected_cluster).toBeUndefined();
});

test("homepage final CTA uses shared whatsapp payload behavior", async ({ page }) => {
  await page.goto("/?utm_source=google&gclid=abc123");

  const finalSection = page.getByTestId("section-final-cta");
  const finalCta = page
    .getByTestId("section-final-cta")
    .getByRole("link", { name: "Falar com especialista" });
  const finalHeading = finalSection.getByRole("heading", {
    name: "Envie a localização e o objetivo do projeto"
  });

  await expect(finalCta).toBeVisible();

  const sectionBox = await finalSection.boundingBox();
  const headingBox = await finalHeading.boundingBox();
  const ctaBox = await finalCta.boundingBox();
  expect(sectionBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(ctaBox).not.toBeNull();
  if (sectionBox && headingBox && ctaBox) {
    const sectionCenter = sectionBox.x + sectionBox.width / 2;
    const headingCenter = headingBox.x + headingBox.width / 2;
    const ctaCenter = ctaBox.x + ctaBox.width / 2;
    expect(Math.abs(sectionCenter - headingCenter)).toBeLessThan(4);
    expect(Math.abs(sectionCenter - ctaCenter)).toBeLessThan(4);
    expect(ctaBox.y - (headingBox.y + headingBox.height)).toBeGreaterThanOrEqual(24);
  }

  const href = decodeURIComponent((await finalCta.getAttribute("href")) || "");
  expect(href).toContain("CTA: final-cta.");
  expect(href).toContain("gclid=abc123");

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
});
