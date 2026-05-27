import { test, expect } from "@playwright/test";

test("service page renders lead magnet and differentiation blocks", async ({ page }) => {
  await page.goto("/servicos/georreferenciamento-de-imovel-rural");
  await expect(page.getByRole("link", { name: /baixar guia/i }).first()).toBeVisible();
  await expect(page.getByText(/Garantia:/i)).toBeVisible();
  await expect(page.getByRole("table", { name: /nós vs outros/i })).toBeVisible();
});

test("/sobre renders trust entity details", async ({ page }) => {
  await page.goto("/sobre");
  await expect(page.getByText(/Endereço|Endereco/i).first()).toBeVisible();
  await expect(page.getByText(/Categoria A em Aerolevantamento/i).first()).toBeVisible();
  await expect(page.getByText("00.000.000/0001-00")).toHaveCount(0);
});

test("mock blog and case routes are available", async ({ page }) => {
  expect((await page.goto("/blog/post-1"))?.status()).toBe(200);
  expect((await page.goto("/cases/case-1"))?.status()).toBe(200);
});
