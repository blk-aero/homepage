import { expect, test } from "@playwright/test";

test("footer shows BLK contact and trust details without template social links", async ({ page }) => {
  await page.goto("/");

  const footer = page.locator("footer");
  const footerLogo = footer.getByRole("link", { name: "BLK Aero" }).locator("img");
  await expect(footerLogo).toHaveAttribute("src", /logo_inline_grey_fulltext_aero_nobackground/);
  await expect(footer.getByRole("link", { name: "contato@blk.aero" })).toHaveAttribute("href", "mailto:contato@blk.aero");
  const phoneLink = footer.getByRole("link", { name: "(12) 98806-2737" });
  await expect(phoneLink).toHaveAttribute("href", /wa\.me\/5512988062737/);
  const phoneText = new URL((await phoneLink.getAttribute("href")) || "").searchParams.get("text") || "";
  expect(phoneText).toContain("Olá, quero falar com a BLK.");
  expect(phoneText).not.toContain("CTA:");
  expect(phoneText).not.toContain("orçamento");
  await expect(footer).toContainText("Categoria A em Aerolevantamento pelo Ministério da Defesa");
  const footerLinks = footer
    .getByRole("heading", { name: "Navegação" })
    .locator("xpath=following-sibling::ul[1]")
    .getByRole("link");
  await expect(footerLinks).toHaveText(["Soluções", "Cidades", "Blog", "Política de Privacidade"]);
  await expect(footer.getByRole("link", { name: "Soluções" })).toHaveAttribute("href", "/solucoes");
  await expect(footer.getByRole("link", { name: "Cidades" })).toHaveAttribute("href", "/cidades");
  await expect(footer.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
  await expect(footer.getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute(
    "href",
    "/politica-de-privacidade"
  );
  await expect(footer.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/company/blk-aero");
  await expect(footer.getByRole("link", { name: "YouTube" })).toHaveAttribute("href", "https://www.youtube.com/@blk-aero");
  await expect(footer.getByRole("link", { name: "Facebook" })).toHaveAttribute("href", "https://www.facebook.com/people/BLK-Aerolevantamento/61564931315622/");
  await expect(footer.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/blk.aero/");
  await expect(footer).toContainText(/© \d{4} BLK Gestão Empresarial Ltda\. \(CNPJ: 37\.814\.104-0001\/40\)\. Todos os direitos reservados\./);

  await expect(footer).not.toContainText("Legal");
  await expect(footer).not.toContainText("Sobre a BLK");
  await expect(footer).not.toContainText("contato@blkaero.com.br");
  await expect(footer).not.toContainText("WhatsApp");
  await expect(footer).not.toContainText("São José dos Campos");
  await expect(footer).not.toContainText("Projeto e Obra");
  await expect(footer).not.toContainText("Regularização Rural");
  await expect(footer).not.toContainText("Regularização Urbana");
  await expect(footer).not.toContainText("Volumetria e Medição");
  await expect(footer).not.toContainText("Monitoramento e Inteligência Geográfica");
  await expect(footer).not.toContainText("Follow Us");
  await expect(footer).not.toContainText("GitHub");
  await expect(footer).not.toContainText("Dribbble");
  await expect(footer).not.toContainText("Bitbucket");
  await expect(footer).not.toContainText("00.000.000/0001-00");
});
