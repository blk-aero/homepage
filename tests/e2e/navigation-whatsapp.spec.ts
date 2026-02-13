import { expect, test } from "@playwright/test";

test("header contact links to whatsapp instead of tel", async ({ page }) => {
  await page.goto("/");

  const contact = page.getByTestId("nav-whatsapp-cta");
  await expect(contact).toBeVisible();
  await expect(contact).toContainText("WhatsApp");
  await expect(contact.locator("svg")).toBeVisible();

  const href = await contact.getAttribute("href");
  expect(href).toContain("wa.me/");
  expect(href).not.toContain("tel:");
});

test("mobile menu can be opened to reveal navigation links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menu = page.locator("#main-nav-menu");
  await expect(menu).toBeHidden();

  const openMenu = page.getByRole("button", { name: /abrir menu/i });
  await expect(openMenu).toBeVisible();
  await openMenu.click();

  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: /^Servicos$/i })).toBeVisible();
});

test("floating whatsapp action is removed", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("floating-whatsapp")).toHaveCount(0);
});
