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
