import { expect, test } from "@playwright/test";

test("footer shows social media and contact details from site config", async ({ page }) => {
  await page.goto("/");

  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "contato@blkaero.com.br" })).toHaveAttribute("href", "mailto:contato@blkaero.com.br");
  await expect(footer).toContainText("(12) 98806-2737");
  await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/StefMa");
  await expect(footer.getByRole("link", { name: "Dribbble" })).toHaveAttribute("href", "https://dribbble.com/#");
  await expect(footer.getByRole("link", { name: "Facebook" })).toHaveAttribute("href", "https://facebook.com/#");
  await expect(footer.getByRole("link", { name: "Twitter" })).toHaveAttribute("href", "https://twitter.com/StefMa91");
  await expect(footer.getByRole("link", { name: "Bitbucket" })).toHaveAttribute("href", "https://bitbucket.org/#");
});
