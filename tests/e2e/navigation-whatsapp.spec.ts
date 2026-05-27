import { expect, test } from "@playwright/test";

test("header contact links to whatsapp instead of tel", async ({ page }) => {
  await page.goto("/");

  const contact = page.getByTestId("nav-whatsapp-cta");
  await expect(contact).toBeVisible();
  await expect(contact).toContainText("WhatsApp");
  const icon = contact.locator("svg");
  await expect(icon).toBeVisible();
  await expect(icon.locator("path")).toHaveCount(1);
  await expect(icon.locator("path")).toHaveAttribute("d", /M17\.472 14\.382c-.297-.149-1\.758-.867-2\.03-.967/);

  const href = await contact.getAttribute("href");
  expect(href).toContain("wa.me/");
  expect(href).not.toContain("tel:");
});

test("header uses vanilla Flowbite navbar spacing and logo size", async ({ page }) => {
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  const logo = nav.getByRole("link", { name: "BLK Aero" }).locator("img");
  const menu = page.locator("#main-nav-menu ul");
  const mobileMenuButton = nav.locator('button[aria-controls="main-nav-menu"]');

  await expect(nav).toHaveClass(/max-w-screen-xl/);
  await expect(nav).toHaveClass(/p-4/);
  await expect(logo).toHaveClass(/h-7/);
  await expect(logo).not.toHaveClass(/h-8/);
  await expect(logo).not.toHaveClass(/md:h-9/);
  await expect(menu).toHaveClass(/mt-4/);
  await expect(menu).toHaveClass(/font-medium/);
  await expect(menu).toHaveClass(/md:space-x-8/);
  await expect(mobileMenuButton).toHaveClass(/p-2/);
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
  await expect(menu.getByRole("link", { name: /^Soluções$/i })).toHaveAttribute("href", "/solucoes");
  await expect(menu.getByRole("link", { name: /^Cidades$/i })).toHaveAttribute("href", "/cidades");
  await expect(menu.getByRole("link", { name: /^Blog$/i })).toHaveAttribute("href", "/blog");
  await expect(menu.getByRole("link", { name: /^Servicos$/i })).toHaveCount(0);
});

test("floating whatsapp action is removed", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("floating-whatsapp")).toHaveCount(0);
});
