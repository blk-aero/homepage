import { test, expect } from "@playwright/test";

test("active route returns 200", async ({ page }) => {
  const response = await page.goto("/servicos/georreferenciamento-de-imovel-rural");
  expect(response?.status()).toBe(200);
});

test("inactive route returns 404", async ({ page }) => {
  const response = await page.goto("/cidades/cidade-inativa-sp");
  expect(response?.status()).toBe(404);
});
