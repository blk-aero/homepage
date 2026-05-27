import { test, expect } from "@playwright/test";

test("utm survives internal navigation for whatsapp", async ({ page }) => {
  await page.goto(
    "/servicos/georreferenciamento-de-imovel-rural/jacarei-sp?utm_source=google&utm_medium=cpc&utm_campaign=teste&gclid=abc123"
  );

  await page.goto("/servicos/georreferenciamento-de-imovel-rural");

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

  await cta.click();

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

test("homepage triage card whatsapp CTA includes selected cluster and card location", async ({
  page
}) => {
  await page.goto("/?utm_source=google&gclid=abc123");

  const card = page
    .getByTestId("section-triage-cards")
    .locator("article")
    .filter({ has: page.getByRole("heading", { name: "Regularização Rural" }) });
  const cta = card.getByRole("link", { name: "Falar com especialista" });
  await expect(cta).toBeVisible();

  const href = decodeURIComponent((await cta.getAttribute("href")) || "");
  expect(href).toContain("Cluster selecionado: Regularização Rural.");
  expect(href).toContain("CTA: triage-card-regularizacao-rural.");
  expect(href).toContain("gclid=abc123");

  await cta.click();

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find(
      (event) =>
        event.event === "whatsapp_click" && event.selected_cluster === "Regularização Rural"
    );
  });

  expect(payload).toMatchObject({
    event: "whatsapp_click",
    page_path: "/",
    selected_cluster: "Regularização Rural",
    cta_location: "triage-card-regularizacao-rural",
    gclid: "abc123"
  });
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

  await expect(finalSection).toHaveClass(/bg-gray-50/);
  await expect(finalSection).toHaveClass(/border-y/);
  await expect(finalSection).toHaveClass(/text-center/);
  await expect(finalSection).toHaveClass(/py-14/);
  await expect(finalHeading).toHaveClass(/text-gray-900/);
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

  await finalCta.click();

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
