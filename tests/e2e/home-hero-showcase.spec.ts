import { expect, test } from "@playwright/test";

test("homepage hero uses right-side image and brand strip below", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const heroCopy = page.getByTestId("home-hero-copy");
  const heroImage = page.getByTestId("home-hero-image");
  const heroMedia = page.getByTestId("home-hero-media");
  const brandsStrip = page.getByTestId("home-hero-brands");
  const heroHeading = page.locator("[data-testid='home-hero-copy'] h1");

  await expect(heroCopy).toBeVisible();
  await expect(heroImage).toBeVisible();
  await expect(heroMedia).toBeVisible();
  await expect(brandsStrip).toBeVisible();
  await expect(heroHeading).toBeVisible();

  const copyBox = await heroCopy.boundingBox();
  const mediaBox = await heroMedia.boundingBox();
  const brandsBox = await brandsStrip.boundingBox();
  const headingBox = await heroHeading.boundingBox();

  expect(copyBox).toBeTruthy();
  expect(mediaBox).toBeTruthy();
  expect(brandsBox).toBeTruthy();
  expect(headingBox).toBeTruthy();
  expect((copyBox?.x ?? 0) + 20).toBeLessThan(mediaBox?.x ?? 0);
  expect((headingBox?.x ?? 0) + (headingBox?.width ?? 0)).toBeLessThanOrEqual((mediaBox?.x ?? 0) - 4);
  expect(brandsBox?.y ?? 0).toBeGreaterThan(
    Math.max(
      (copyBox?.y ?? 0) + (copyBox?.height ?? 0),
      (mediaBox?.y ?? 0) + (mediaBox?.height ?? 0)
    ) - 8
  );

  const heroSrc = await heroImage.getAttribute("src");
  expect(heroSrc).toContain("cover-drone-mountain-bw");

  const brandLink = page.getByRole("link", { name: /aconvap/i });
  await expect(brandLink).toBeVisible();
  await expect(brandLink).toHaveAttribute("href", "https://aconvap.com.br/");

  const brandImage = page.getByTestId("brand-aconvap");
  await expect(brandImage).toBeVisible();
  expect(await brandImage.getAttribute("class")).toContain("grayscale");
});

test("homepage renders the authority triage section order with canonical hero copy", async ({
  page
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Do terreno real à decisão segura e auditável" })
  ).toBeVisible();
  await expect(
    page.getByText(
      "A BLK transforma áreas, obras e ativos físicos em mapas, medições, peças técnicas e modelos 3D com rastreabilidade visual para reduzir retrabalho, destravar aprovações e tornar decisões técnicas claras para todos os envolvidos."
    )
  ).toBeVisible();

  const sectionIds = [
    "section-hero",
    "section-compact-proof",
    "section-triage-cards",
    "section-deliverables",
    "section-visualization-platform",
    "section-technical-confidence",
    "section-proof-snippets",
    "section-faq",
    "section-final-cta"
  ];

  const boxes = [];
  for (const sectionId of sectionIds) {
    const section = page.getByTestId(sectionId);
    await expect(section).toBeVisible();
    const box = await section.boundingBox();
    expect(box).toBeTruthy();
    boxes.push(box);
  }

  for (let index = 1; index < boxes.length; index += 1) {
    expect(boxes[index]?.y ?? 0).toBeGreaterThan(boxes[index - 1]?.y ?? 0);
  }
});

test("homepage hero renders five no-arrow cluster carousel slides with labeled dots", async ({
  page
}) => {
  await page.goto("/");

  const clusterNames = [
    "Projeto e Obra",
    "Regularização Rural",
    "Regularização Urbana",
    "Volumetria e Medição",
    "Monitoramento e Inteligência Geográfica"
  ];

  for (const name of clusterNames) {
    await expect(page.getByTestId("home-hero-carousel").getByText(name)).toHaveCount(1);
    await expect(page.getByRole("button", { name: `Mostrar ${name}` })).toBeVisible();
  }

  await expect(page.getByTestId("home-hero-slide")).toHaveCount(5);

  await expect(page.getByRole("button", { name: /anterior|previous/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /proximo|próximo|next/i })).toHaveCount(0);
});
