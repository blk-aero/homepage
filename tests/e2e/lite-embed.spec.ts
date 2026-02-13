import { test, expect } from "@playwright/test";

test("lite youtube does not load iframe before click", async ({ page }) => {
  await page.goto("/servicos/viabilidade-de-terraplenagem");

  await expect(page.getByRole("button", { name: /ver video/i })).toBeVisible();
  await expect(page.locator('iframe[src*="youtube-nocookie.com"]')).toHaveCount(0);

  await page.getByRole("button", { name: /ver video/i }).click();
  await expect(page.locator('iframe[src*="youtube-nocookie.com"]')).toHaveCount(1);
});
