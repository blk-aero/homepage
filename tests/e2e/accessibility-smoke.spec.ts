import { test, expect } from "@playwright/test";

test("primary pages expose headings and actionable CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.goto("/servicos/georreferenciamento-de-imovel-rural");
  await expect(page.getByTestId("whatsapp-cta")).toBeVisible();
});
