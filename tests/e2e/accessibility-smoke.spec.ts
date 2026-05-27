import { test, expect } from "@playwright/test";

test("primary pages expose headings and actionable CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByTestId("whatsapp-cta").first()).toBeVisible();

  for (const path of ["/solucoes", "/cidades", "/blog", "/solucoes/projeto-e-obra"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: "Em Construção" })).toBeVisible();
  }
});

test("homepage method section exposes technical confidence signals and trust badge", async ({
  page
}) => {
  await page.goto("/");

  const method = page.getByTestId("section-technical-confidence");
  await expect(
    method.getByRole("heading", { name: "Como garantimos confiança técnica" })
  ).toBeVisible();

  for (const step of [
    "Entender a decisão",
    "Planejar a captura",
    "Capturar com rastreabilidade",
    "Processar e validar",
    "Entregar conforme normas e uso final"
  ]) {
    await expect(method).toContainText(step);
  }

  for (const signal of [
    "GNSS",
    "pontos de controle",
    "checkpoints",
    "PEC-PCD",
    "ABNT NBR 13133",
    "INCRA/SIGEF",
    "Ministério da Defesa/SisCLATEN"
  ]) {
    await expect(method).toContainText(signal);
  }

  await expect(method).toContainText("Mais detalhe, menos interpolação");
  const badge = method.getByRole("link", {
    name: "Categoria A em Aerolevantamento pelo Ministério da Defesa"
  });
  await expect(badge).toBeVisible();
  await expect(badge).toHaveAttribute("href", /gov\.br|defesa/i);
});
