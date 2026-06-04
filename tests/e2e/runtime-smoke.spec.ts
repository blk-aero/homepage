import { expect, test } from "@playwright/test";

const primaryRoutes = [
  "/",
  "/solucoes/",
  "/cidades/",
  "/blog/",
  "/solucoes/projeto-e-obra/"
];

for (const route of primaryRoutes) {
  test(`primary route ${route} has no uncaught page errors`, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    expect(pageErrors).toEqual([]);
  });
}

test("simple cookie notice is dismissed with OK", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/");
  await page.evaluate(() => {
    localStorage.removeItem("blk_cookie_notice_v1");
    window.dataLayer = [];
  });
  await page.reload();

  const notice = page.locator("#cookie-notice");
  await expect(notice).toBeVisible();
  await expect(notice).toContainText("Utilizamos cookies essenciais e tecnologias semelhantes");
  await expect(notice.getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute(
    "href",
    "/politica-de-privacidade"
  );

  await page.getByRole("button", { name: "OK" }).click();
  await expect(notice).toBeHidden();

  const stored = await page.evaluate(() => localStorage.getItem("blk_cookie_notice_v1"));
  expect(stored).toBe("dismissed");
  expect(pageErrors).toEqual([]);
});

test("simple cookie notice still works when localStorage is blocked", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.addInitScript(() => {
    const storageError = new DOMException("Blocked storage", "SecurityError");
    Storage.prototype.getItem = () => {
      throw storageError;
    };
    Storage.prototype.setItem = () => {
      throw storageError;
    };
  });

  await page.goto("/");

  const notice = page.locator("#cookie-notice");
  await expect(notice).toBeVisible();
  await page.getByRole("button", { name: "OK" }).click();
  await expect(notice).toBeHidden();
  expect(pageErrors).toEqual([]);
});

test("dismissed simple cookie notice stays hidden on later page loads", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem("blk_cookie_notice_v1", "dismissed");
    window.dataLayer = [];
  });
  await page.reload();

  await expect(page.locator("#cookie-notice")).toBeHidden();
  expect(pageErrors).toEqual([]);
});

test("gtm consent defaults are granted for the simple cookie notice policy", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/");
  await page.evaluate(() => {
    window.dataLayer = [];
  });
  await page.reload();

  const consentCommand = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    for (const event of events) {
      const values = Array.isArray(event) ? event : Object.values(event);
      if (values[0] === "consent" && values[1] === "default") return values;
    }
    return undefined;
  });

  expect(consentCommand?.[2]).toMatchObject({
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted"
  });
  expect(pageErrors).toEqual([]);
});
