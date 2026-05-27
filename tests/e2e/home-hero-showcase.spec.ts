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

test("compact proof band shows the accepted proof groups without relationship labels", async ({
  page
}) => {
  await page.goto("/");

  const proofBand = page.getByTestId("section-compact-proof");
  await expect(proofBand.getByRole("heading", { name: "Credenciais e Associações" })).toBeVisible();
  await expect(
    proofBand.getByRole("heading", { name: "Clientes e Projetos Atendidos" })
  ).toBeVisible();

  for (const item of ["ACONVAP", "Enredes", "Ministério da Defesa", "CREA-SP", "BR-UTM/DECEA"]) {
    await expect(proofBand).toContainText(item);
  }

  for (const item of [
    "SN Saneamento",
    "Sabesp",
    "Construtora Oliveira Roxo",
    "Sahyoun Properties",
    "Polimix Ambiental",
    "Six Engenharia",
    "Macaw Studio",
    "Sergio Porto",
    "Montante",
    "URBAM",
    "SJC Mobilidade"
  ]) {
    await expect(proofBand).toContainText(item);
  }

  await expect(proofBand).not.toContainText(/cliente direto|parceiro|fornecedor/i);
});

test("homepage triage cards show five clusters with examples and detail actions", async ({
  page
}) => {
  await page.goto("/");

  const cards = page.getByTestId("section-triage-cards");
  const expectedCards = [
    ["Projeto e Obra", "as-built"],
    ["Regularização Rural", "SIGEF"],
    ["Regularização Urbana", "REURB"],
    ["Volumetria e Medição", "terraplenagem"],
    ["Monitoramento e Inteligência Geográfica", "due diligence"]
  ];

  for (const [title, example] of expectedCards) {
    const card = cards.locator("article").filter({ has: page.getByRole("heading", { name: title }) });
    await expect(card).toBeVisible();
    await expect(card).toContainText(example);
    await expect(card.getByRole("link", { name: "Falar com especialista" })).toBeVisible();
    await expect(card.getByRole("link", { name: `Ver detalhes: ${title}` })).toBeVisible();
  }
});

test("homepage deliverables are grouped around buyer decisions", async ({ page }) => {
  await page.goto("/");

  const deliverables = page.getByTestId("section-deliverables");
  for (const group of [
    "Base para Projeto e Obra",
    "Base para Regularização e Aprovação",
    "Base para Medição e Auditoria",
    "Base Visual para Alinhamento"
  ]) {
    await expect(deliverables.getByRole("heading", { name: group })).toBeVisible();
  }

  await expect(deliverables).toContainText(/decisão|aprovação|auditoria|alinhamento/i);
});

test("homepage visualization platform is a separate differentiator after deliverables", async ({
  page
}) => {
  await page.goto("/");

  const deliverables = page.getByTestId("section-deliverables");
  const platform = page.getByTestId("section-visualization-platform");
  await expect(platform).toBeVisible();
  await expect(platform).toContainText("orthoimages");
  await expect(platform).toContainText("nuvens de pontos");
  await expect(platform).toContainText("modelos 3D");
  await expect(platform).toContainText("evidências");
  await expect(platform).toContainText(/sem instalar|software especializado|hardware/i);
  await expect(page.locator("body")).not.toContainText(/20 dias|vinte dias/i);

  const deliverablesBox = await deliverables.boundingBox();
  const platformBox = await platform.boundingBox();
  expect(platformBox?.y ?? 0).toBeGreaterThan(deliverablesBox?.y ?? 0);
});

test("homepage lower proof snippets are anonymized and FAQ handles hiring objections", async ({
  page
}) => {
  await page.goto("/");

  const proof = page.getByTestId("section-proof-snippets");
  for (const cluster of [
    "Projeto e Obra",
    "Regularização Rural",
    "Regularização Urbana",
    "Volumetria e Medição",
    "Monitoramento e Inteligência Geográfica"
  ]) {
    await expect(proof).toContainText(cluster);
  }
  await expect(proof).not.toContainText(
    /Terras Alpha|Fazenda Itamirim|Colinas de São José|Jambeiro|São José dos Campos landfill/i
  );

  const faq = page.getByTestId("section-faq");
  for (const topic of [
    "preço",
    "5/7/10 dias",
    "localização e objetivo",
    "plataforma de visualização",
    "aprovação ou auditoria",
    "entidade registrada"
  ]) {
    await expect(faq).toContainText(topic);
  }
  await expect(faq).not.toContainText(/a partir de R\$|preço inicial/i);
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

test("homepage hero carousel auto-cycles, pauses on hover, and stops after dot click", async ({
  page
}) => {
  await page.goto("/");

  const activeSlide = page.locator("[data-carousel-slide][aria-hidden='false']");
  await expect(activeSlide).toContainText("Projeto e Obra");

  await page.waitForTimeout(2200);
  await expect(activeSlide).toContainText("Regularização Rural");

  await page.getByTestId("home-hero-media").hover();
  await page.waitForTimeout(2200);
  await expect(activeSlide).toContainText("Regularização Rural");

  await page.mouse.move(0, 0);
  await page.getByRole("button", { name: "Mostrar Volumetria e Medição" }).click();
  await expect(activeSlide).toContainText("Volumetria e Medição");
  await expect(page.getByRole("button", { name: "Mostrar Volumetria e Medição" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );

  await page.waitForTimeout(2200);
  await expect(activeSlide).toContainText("Volumetria e Medição");
});

test("homepage hero carousel does not auto-cycle when reduced motion is requested", async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const activeSlide = page.locator("[data-carousel-slide][aria-hidden='false']");
  await expect(activeSlide).toContainText("Projeto e Obra");

  await page.waitForTimeout(2200);
  await expect(activeSlide).toContainText("Projeto e Obra");
});
