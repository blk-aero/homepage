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

test("cookie consent banner pushes denied defaults and granted acceptance", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/");
  await page.evaluate(() => {
    localStorage.removeItem("blk_cookie_consent_v1");
    window.dataLayer = [];
  });
  await page.reload();

  const banner = page.locator("#cookie-banner");
  await expect(banner).toBeVisible();

  const deniedEvent = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "consent_update");
  });

  expect(deniedEvent).toMatchObject({
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  await page.getByRole("button", { name: "Aceitar" }).click();
  await expect(banner).toBeHidden();

  const consentState = await page.evaluate(() => ({
    stored: localStorage.getItem("blk_cookie_consent_v1"),
    grantedEvent: Array.isArray(window.dataLayer)
      ? window.dataLayer.findLast?.((event) => event.event === "consent_update")
      : undefined
  }));

  expect(consentState.stored).toBe("accepted");
  expect(consentState.grantedEvent).toMatchObject({
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted"
  });
  expect(pageErrors).toEqual([]);
});

test("accepted cookie consent is re-applied on later page loads", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem("blk_cookie_consent_v1", "accepted");
    window.dataLayer = [];
  });
  await page.reload();

  await expect(page.locator("#cookie-banner")).toBeHidden();

  const consentEvent = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "consent_update");
  });

  expect(consentEvent).toMatchObject({
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted"
  });
  expect(pageErrors).toEqual([]);
});

test("rejected cookie consent is re-applied on later page loads", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem("blk_cookie_consent_v1", "rejected");
    window.dataLayer = [];
  });
  await page.reload();

  await expect(page.locator("#cookie-banner")).toBeHidden();

  const consentEvent = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "consent_update");
  });

  expect(consentEvent).toMatchObject({
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
  expect(pageErrors).toEqual([]);
});
