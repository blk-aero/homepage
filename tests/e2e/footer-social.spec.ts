import { expect, test } from "@playwright/test";

test("footer shows BLK contact and trust details without template social links", async ({ page }) => {
  await page.goto("/");

  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "contato@blkaero.com.br" })).toHaveAttribute("href", "mailto:contato@blkaero.com.br");
  await expect(footer).toContainText("(12) 98806-2737");
  await expect(footer).toContainText("Sao Jose dos Campos, SP");
  await expect(footer).toContainText("Confianca tecnica");
  await expect(footer).toContainText("Categoria A em Aerolevantamento pelo Ministerio da Defesa");
  await expect(footer.getByRole("link", { name: "Politica de privacidade" })).toHaveAttribute("href", "/politica-de-privacidade");
  await expect(footer.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", /wa\.me/);

  await expect(footer).not.toContainText("Follow Us");
  await expect(footer).not.toContainText("GitHub");
  await expect(footer).not.toContainText("Dribbble");
  await expect(footer).not.toContainText("Bitbucket");
  await expect(footer).not.toContainText("00.000.000/0001-00");
});
