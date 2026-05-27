import { test, expect } from "@playwright/test";

for (const path of ["/sobre", "/politica-de-privacidade"]) {
  test(`${path} route is removed`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
  });
}

const temporaryRoutes = [
  "/solucoes",
  "/cidades",
  "/blog",
  "/solucoes/projeto-e-obra",
  "/solucoes/regularizacao-rural",
  "/solucoes/regularizacao-urbana",
  "/solucoes/volumetria-e-medicao",
  "/solucoes/monitoramento-e-inteligencia-geografica"
];

for (const path of temporaryRoutes) {
  test(`${path} renders the temporary construction page`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { name: "Em Construção" })).toBeVisible();
    await expect(page.getByTestId("whatsapp-cta")).toHaveCount(0);
  });
}

for (const path of [
  "/servicos/georreferenciamento-de-imovel-rural",
  "/servicos/georreferenciamento-de-imovel-rural/jacarei-sp",
  "/cidades/jacarei-sp",
  "/blog/post-1",
  "/cases/case-1",
  "/ofertas/guia-georreferenciamento"
]) {
  test(`${path} legacy route is removed`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
  });
}

const homepageClusterRoutes = [
  { path: "/solucoes/projeto-e-obra", title: "Projeto e Obra" },
  { path: "/solucoes/regularizacao-rural", title: "Regularização Rural" },
  { path: "/solucoes/regularizacao-urbana", title: "Regularização Urbana" },
  { path: "/solucoes/volumetria-e-medicao", title: "Volumetria e Medição" },
  {
    path: "/solucoes/monitoramento-e-inteligencia-geografica",
    title: "Monitoramento e Inteligência Geográfica"
  }
];

for (const route of homepageClusterRoutes) {
  test(`homepage exposes release-safe Ver detalhes link for ${route.title}`, async ({ page }) => {
    await page.goto("/");

    const link = page.getByRole("link", { name: new RegExp(`Ver detalhes.*${route.title}`, "i") });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", route.path);
  });
}

test("top navigation points to temporary hub pages", async ({ page }) => {
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  await expect(nav.getByRole("link", { name: "Soluções" })).toHaveAttribute("href", "/solucoes");
  await expect(nav.getByRole("link", { name: "Cidades" })).toHaveAttribute("href", "/cidades");
  await expect(nav.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
});
