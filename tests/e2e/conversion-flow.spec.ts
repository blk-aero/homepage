import { test, expect } from "@playwright/test";

test("utm survives internal navigation for whatsapp", async ({ page }) => {
  await page.goto(
    "/servicos/georreferenciamento-de-imovel-rural/jacarei-sp?utm_source=google&utm_medium=cpc&utm_campaign=teste&gclid=abc123"
  );

  await page.goto("/servicos/georreferenciamento-de-imovel-rural");

  const href = await page.locator('[data-testid="whatsapp-cta"]').first().getAttribute("href");
  expect(decodeURIComponent(href || "")).toContain("gclid=abc123");
});
