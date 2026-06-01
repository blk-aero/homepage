import { test, expect } from "@playwright/test";

function whatsappTextFromHref(href: string | null): string {
  return new URL(href || "").searchParams.get("text") || "";
}

function visibleWhatsAppText(text: string): string {
  return text.replace(/[\u200E\u00A0\u200B\u200C\u200D\u2800]/g, "");
}

test("utm survives internal navigation in whatsapp click analytics", async ({ page }) => {
  await page.goto("/blog?utm_source=google&utm_medium=cpc&utm_campaign=teste&gclid=abc123");

  await page.goto("/");

  const cta = page.locator('[data-testid="whatsapp-cta"]').first();
  const href = await cta.getAttribute("href");
  expect(whatsappTextFromHref(href)).not.toContain("gclid");

  await cta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "whatsapp_click");
  });

  expect(payload).toMatchObject({
    gclid: "abc123",
    utm_source: "google"
  });
});

test("first-touch attribution wins over later conflicting campaign params", async ({ page }) => {
  await page.goto("/?utm_source=google&utm_medium=cpc&utm_campaign=home&gclid=first-click");
  await page.goto(
    "/?utm_source=linkedin&utm_medium=social&utm_campaign=retargeting&utm_content=later&gclid=second-click"
  );

  const cta = page.locator('[data-testid="whatsapp-cta"]').first();
  const text = whatsappTextFromHref(await cta.getAttribute("href"));
  expect(text).not.toContain("utm_source");
  expect(text).not.toContain("gclid");

  await cta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "whatsapp_click");
  });

  expect(payload).toMatchObject({
    cta_location: "home-hero",
    whatsapp_greeting_id: "google-cpc-home.home-hero.v1",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "home",
    utm_content: "later",
    gclid: "first-click"
  });
});

test("homepage whatsapp CTA keeps message simple while click payload keeps attribution", async ({
  page
}) => {
  await page.goto("/?utm_source=google&utm_medium=cpc&utm_campaign=home&gclid=abc123");

  const cta = page.locator('[data-testid="whatsapp-cta"]').first();
  await expect(cta).toBeVisible();

  const text = whatsappTextFromHref(await cta.getAttribute("href"));
  expect(visibleWhatsAppText(text)).toContain("Oi, quero falar com a BLK.");
  expect(text).not.toContain("CTA:");
  expect(text).not.toContain("utm_source");
  expect(text).not.toContain("gclid");
  expect(text).not.toContain("orçamento");

  await cta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find((event) => event.event === "whatsapp_click");
  });

  expect(payload).toMatchObject({
    event: "whatsapp_click",
    page_path: "/",
    cta_location: "home-hero",
    utm_source: "google",
    gclid: "abc123"
  });
});

test("homepage triage section whatsapp CTA includes section location and attribution", async ({
  page
}) => {
  await page.goto("/?utm_source=google&gclid=abc123");

  const triageSection = page.getByTestId("section-triage-cards");
  const cta = triageSection.getByRole("link", { name: "Falar com especialista" });
  await expect(cta).toBeVisible();
  await expect(triageSection.locator("article").getByRole("link", { name: "Falar com especialista" })).toHaveCount(0);

  const text = whatsappTextFromHref(await cta.getAttribute("href"));
  expect(visibleWhatsAppText(text)).toContain("Oi, gostaria de falar com a BLK.");
  expect(text).not.toContain("Cluster selecionado:");
  expect(text).not.toContain("CTA:");
  expect(text).not.toContain("gclid");

  await cta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find(
      (event) => event.event === "whatsapp_click" && event.cta_location === "triage-section"
    );
  });

  expect(payload).toMatchObject({
    event: "whatsapp_click",
    page_path: "/",
    cta_location: "triage-section",
    gclid: "abc123"
  });
  expect(payload.selected_cluster).toBeUndefined();
});

test("homepage final CTA composer uses shared whatsapp payload behavior", async ({ page }) => {
  await page.goto("/?utm_source=google&gclid=abc123");

  const finalSection = page.getByTestId("section-final-cta");
  const finalHeading = finalSection.getByRole("heading", {
    name: "Envie localização e objetivo do projeto"
  });
  const location = finalSection.getByLabel("Localização do projeto");
  const objective = finalSection.getByLabel("Objetivo");
  const finalCta = finalSection.getByRole("link", { name: "Falar com especialista" });

  await expect(finalHeading).toBeVisible();
  await expect(finalSection).toContainText(
    "Com essas duas informações, a BLK já consegue orientar o escopo inicial e indicar o próximo passo pelo WhatsApp."
  );
  await expect(location).toHaveAttribute("maxlength", "300");
  await expect(objective).toContainText("Ainda não sei, preciso de orientação");
  await expect(finalCta).toBeVisible();

  await expect(objective).toHaveValue("");
  const initialText = whatsappTextFromHref(await finalCta.getAttribute("href"));
  expect(visibleWhatsAppText(initialText)).toContain("Oi, quero falar com a BLK.");
  expect(initialText).not.toContain("CTA:");
  expect(initialText).not.toContain("Objetivo:");
  expect(initialText).not.toContain("gclid");

  const sectionBox = await finalSection.boundingBox();
  const headingBox = await finalHeading.boundingBox();
  const ctaBox = await finalCta.boundingBox();
  const locationBox = await location.boundingBox();
  const objectiveBox = await objective.boundingBox();
  expect(sectionBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(ctaBox).not.toBeNull();
  expect(locationBox).not.toBeNull();
  expect(objectiveBox).not.toBeNull();
  if (locationBox && objectiveBox && ctaBox) {
    expect(Math.abs(locationBox.y - objectiveBox.y)).toBeLessThan(12);
    expect(Math.abs(objectiveBox.y - ctaBox.y)).toBeLessThan(24);
  }

  const formBackground = await finalSection.locator("form").evaluate((node) => getComputedStyle(node).backgroundColor);
  const sectionBackground = await finalSection.evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(sectionBackground).not.toBe("rgb(255, 255, 255)");
  expect(formBackground).toBe("rgba(0, 0, 0, 0)");

  await location.fill("São José dos Campos - https://maps.app.goo.gl/exemplo");
  await objective.selectOption("Regularização Rural");

  const text = whatsappTextFromHref(await finalCta.getAttribute("href"));
  expect(text).not.toContain("CTA:");
  expect(text).not.toContain("gclid");
  expect(text).toContain("Localização: São José dos Campos - https://maps.app.goo.gl/exemplo.");
  expect(text).toContain("Objetivo: Regularização Rural.");

  await finalCta.dispatchEvent("click");

  const payload = await page.evaluate(() => {
    const events = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    return events.find(
      (event) => event.event === "whatsapp_click" && event.cta_location === "final-cta"
    );
  });

  expect(payload).toMatchObject({
    event: "whatsapp_click",
    page_path: "/",
    cta_location: "final-cta",
    location: "São José dos Campos - https://maps.app.goo.gl/exemplo",
    objective: "Regularização Rural",
    gclid: "abc123"
  });
});
