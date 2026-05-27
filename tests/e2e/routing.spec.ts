import { test, expect } from "@playwright/test";

test("active route returns 200", async ({ page }) => {
  const response = await page.goto("/servicos/georreferenciamento-de-imovel-rural");
  expect(response?.status()).toBe(200);
});

test("inactive route returns 404", async ({ page }) => {
  const response = await page.goto("/cidades/cidade-inativa-sp");
  expect(response?.status()).toBe(404);
});

for (const path of ["/sobre", "/politica-de-privacidade"]) {
  test(`${path} route is removed`, async ({ page }) => {
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
  test(`homepage cluster route renders ${route.title}`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { name: route.title })).toBeVisible();
    await expect(page.getByText(/pagina temporaria/i)).toBeVisible();
    await expect(page.getByTestId("whatsapp-cta")).toBeVisible();
  });
}

test("homepage exposes release-safe Ver detalhes links for all cluster routes", async ({ page }) => {
  await page.goto("/");

  for (const route of homepageClusterRoutes) {
    const link = page.getByRole("link", { name: new RegExp(`Ver detalhes.*${route.title}`, "i") });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", route.path);
  }
});
