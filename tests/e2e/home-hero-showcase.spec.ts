import { expect, test } from "@playwright/test";

test("homepage hero uses right-side image carousel", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const heroCopy = page.getByTestId("home-hero-copy");
  const activeSlide = page.locator("[data-carousel-slide][aria-hidden='false']");
  const heroImage = activeSlide.getByTestId("home-hero-image");
  const heroMedia = page.getByTestId("home-hero-media");
  const heroHeading = page.locator("[data-testid='home-hero-copy'] h1");

  await expect(heroCopy).toBeVisible();
  await expect(heroImage).toBeVisible();
  await expect(heroMedia).toBeVisible();
  await expect(page.getByTestId("home-hero-brands")).toHaveCount(0);
  await expect(heroHeading).toBeVisible();

  const copyBox = await heroCopy.boundingBox();
  const mediaBox = await heroMedia.boundingBox();
  const headingBox = await heroHeading.boundingBox();

  expect(copyBox).toBeTruthy();
  expect(mediaBox).toBeTruthy();
  expect(headingBox).toBeTruthy();
  expect((copyBox?.x ?? 0) + 20).toBeLessThan(mediaBox?.x ?? 0);
  expect((headingBox?.x ?? 0) + (headingBox?.width ?? 0)).toBeLessThanOrEqual((mediaBox?.x ?? 0) - 4);

  await expect(activeSlide).toContainText("Base visual auditável");
  await expect(activeSlide).toContainText("Projeto / obra / compatibilização");
  await expect(activeSlide).toContainText("Terreno real para projetar, alinhar e executar");
  await expect(activeSlide).toContainText("DXF + curvas");

  const heroSrc = await heroImage.getAttribute("src");
  expect(heroSrc).toContain("blk-hero-e-projeto-obra");
  await expect(heroImage).toHaveAttribute("width", /[1-9]\d*/);
  await expect(heroImage).toHaveAttribute("height", /[1-9]\d*/);
});

test("homepage stays in light theme when the OS prefers dark mode", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(page.getByTestId("section-hero")).toBeVisible();

  const bodyBackground = await page.locator("body").evaluate((node) => getComputedStyle(node).backgroundColor);
  const heroBackground = await page
    .getByTestId("section-hero")
    .evaluate((node) => getComputedStyle(node).backgroundColor);
  const mediaBackground = await page
    .getByTestId("home-hero-media")
    .evaluate((node) => getComputedStyle(node).backgroundColor);

  expect(bodyBackground).toBe("oklch(0.985 0.002 247.839)");
  expect(heroBackground).toBe("rgb(255, 255, 255)");
  expect(mediaBackground).toBe("oklch(0.985 0.002 247.839)");
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
    "section-portfolio",
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
  const triageCards = page.getByTestId("section-triage-cards");
  await expect(proofBand.getByRole("heading", { name: "Credenciais e Associações" })).toBeVisible();
  await expect(
    proofBand.getByRole("heading", { name: "Clientes e Projetos Atendidos" })
  ).toBeVisible();

  const proofLinks = [
    ["ACONVAP", "https://www.aconvap.com.br/"],
    ["BR-UTM", "https://br-utm.decea.mil.br/"],
    ["CREA-SP", "https://www.creasp.org.br/"],
    ["Enredes", "https://enredes.com.br/"],
    ["INCRA", "https://www.gov.br/incra/pt-br"],
    ["Ministério da Defesa", "https://www.gov.br/defesa/pt-br/assuntos/aerolevantamento"],
    ["UNICAMP", "https://unicampventures.org.br/"],
    ["Construtora Oliveira Roxo", "https://www.instagram.com/construtoraoliveiraroxo/"],
    ["Lia Blanco Arquitetura", "https://www.instagram.com/blancolia/"],
    ["Lucas Diniz Arquitetura", "https://www.instagram.com/lucasdinizarquitetura/"],
    ["Macaw Studio", "https://macawstudio.myportfolio.com/"],
    ["Mobilidade Urbana SJC", "https://www.sjc.sp.gov.br/secretarias/mobilidade-urbana/"],
    ["Montante", "https://montante.com.br/"],
    ["Polimix Ambiental", "https://www.polimixambiental.com.br/"],
    ["Sahyoun Properties", "https://sahyounproperties.com/"],
    ["Sergio Porto Engenharia", "https://www.sergioporto.com.br/"],
    ["Six Engenharia", "https://sixengenharia.com.br/"],
    ["SN Saneamento", "http://snsaneamento.com.br"],
    ["URBAM", "https://www.urbam.com.br/"]
  ];

  for (const [name, href] of proofLinks) {
    const link = proofBand.getByRole("link", { name });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", href);
  }

  await expect(proofBand.getByRole("link", { name: "Lia Blanco Arquitetura" })).toContainText(
    "Lia Blanco Arquitetura"
  );
  await expect(proofBand.getByRole("img")).toHaveCount(18);
  await expect(proofBand).not.toContainText(
    /cliente direto|cliente indireto|parceiro|fornecedor|supplier|endorsement/i
  );

  const heroBox = await page.getByTestId("section-hero").boundingBox();
  const proofBox = await proofBand.boundingBox();
  const triageBox = await triageCards.boundingBox();
  expect(heroBox).toBeTruthy();
  expect(proofBox).toBeTruthy();
  expect(triageBox).toBeTruthy();
  expect(proofBox?.y ?? 0).toBeGreaterThan(heroBox?.y ?? 0);
  expect(triageBox?.y ?? 0).toBeGreaterThan(proofBox?.y ?? 0);
});

test("homepage triage cards route by outcome with one section CTA and discrete detail links", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const cards = page.getByTestId("section-triage-cards");
  const innerPanel = page.getByTestId("triage-inner-panel");
  await expect(
    cards.getByRole("heading", { name: "Escolha a base técnica ideal para o seu projeto" })
  ).toBeVisible();
  await expect(
    cards.getByText(
      "Selecione o caminho mais próximo da sua demanda. A BLK ajuda a transformar localização e objetivo em escopo, prazo e entregáveis técnicos."
    )
  ).toBeVisible();
  await expect(innerPanel).toBeVisible();

  const expectedCards = [
    ["Projeto e Obra", "projetar, compatibilizar ou acompanhar"],
    ["Regularização Rural", "análise documental e geoespacial"],
    ["Regularização Urbana", "aprovação e alinhamento"],
    ["Volumetria e Medição", "comparáveis, verificáveis"],
    ["Monitoramento e Inteligência Geográfica", "acompanhados ao longo do tempo"]
  ];

  for (const [title, example] of expectedCards) {
    const card = cards.locator("article").filter({ has: page.getByRole("heading", { name: title }) });
    await expect(card).toBeVisible();
    await expect(card).toContainText(example);
    await expect(card.getByRole("link", { name: "Falar com especialista" })).toHaveCount(0);
    await expect(
      card.getByRole("link", { name: new RegExp(`Ver detalhes.*${title}`, "i") })
    ).toContainText("Ver detalhes");
  }

  await expect(cards.getByRole("link", { name: "Falar com especialista" })).toHaveCount(1);
  await expect(cards).not.toContainText(/\b(SIGEF|REURB|as-built|due diligence)\b/i);

  const sectionBackground = await cards.evaluate((node) => getComputedStyle(node).backgroundColor);
  const innerBackground = await innerPanel.evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(sectionBackground).not.toBe("rgba(0, 0, 0, 0)");
  expect(innerBackground).toBe("rgb(255, 255, 255)");
});

test("homepage deliverables show approved decision-first groups and tags", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const deliverables = page.getByTestId("section-deliverables");
  await expect(deliverables).toContainText("O QUE VOCÊ RECEBE");
  await expect(
    deliverables.getByRole("heading", { name: "Bases técnicas para destravar decisões" })
  ).toBeVisible();
  await expect(deliverables).toContainText(
    "A entrega não é só uma pasta de arquivos. É uma base técnica organizada pelo uso"
  );

  for (const group of [
    "Projeto e Obra",
    "Regularização e Aprovação",
    "Medição e Auditoria",
    "Alinhamento Visual"
  ]) {
    await expect(deliverables.getByRole("heading", { name: group })).toBeVisible();
  }

  for (const tag of [
    "DXF",
    "curvas de nível",
    "levantamento planialtimétrico",
    "memorial",
    "LEPAC",
    "perímetro",
    "planta ambiental",
    "volumetria",
    "corte / aterro",
    "comparativos",
    "relatório",
    "ortofoto",
    "nuvem de pontos",
    "modelo 3D",
    "MDT"
  ]) {
    await expect(deliverables).toContainText(tag);
  }
  await expect(deliverables.locator("em", { hasText: "as-built" })).toBeVisible();

  for (const trigger of [
    "Projetar, compatibilizar ou executar obra",
    "Regularizar, aprovar ou defender limites",
    "Medir, auditar ou pagar avanço físico",
    "Alinhar quem não usa software técnico"
  ]) {
    await expect(deliverables).toContainText(trigger);
  }

  const articles = deliverables.locator("article");
  await expect(articles).toHaveCount(4);
  const firstBox = await articles.nth(0).boundingBox();
  const secondBox = await articles.nth(1).boundingBox();
  const thirdBox = await articles.nth(2).boundingBox();
  expect(firstBox).toBeTruthy();
  expect(secondBox).toBeTruthy();
  expect(thirdBox).toBeTruthy();
  expect(Math.abs((firstBox?.y ?? 0) - (secondBox?.y ?? 0))).toBeLessThan(8);
  expect(thirdBox?.y ?? 0).toBeGreaterThan((firstBox?.y ?? 0) + 40);
});

test("homepage visualization platform is a separate differentiator after deliverables", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const deliverables = page.getByTestId("section-deliverables");
  const platform = page.getByTestId("section-visualization-platform");
  await expect(platform).toBeVisible();
  await expect(platform).toContainText("App de Visualização e Compartilhamento");
  await expect(
    platform.getByRole("heading", {
      name: "Visualize e compartilhe o projeto sem depender de software especializado"
    })
  ).toBeVisible();
  await expect(platform).toContainText("Ortofotos");
  await expect(platform).toContainText("nuvens de pontos");
  await expect(platform).toContainText("modelos 3D");
  await expect(platform).toContainText("evidências");
  await expect(platform).toContainText(/sem instalar|software especializado|hardware/i);
  const platformImage = platform.getByRole("img", { name: /App de Visualização e Compartilhamento/i });
  await expect(platformImage).toBeVisible();
  await expect(platformImage).toHaveAttribute("width", /[1-9]\d*/);
  await expect(platformImage).toHaveAttribute("height", /[1-9]\d*/);
  await expect(platform.getByRole("link", { name: /download|baixar/i })).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText(/20 dias|vinte dias/i);

  const deliverablesBox = await deliverables.boundingBox();
  const platformBox = await platform.boundingBox();
  expect(platformBox?.y ?? 0).toBeGreaterThan(deliverablesBox?.y ?? 0);

  const headingBox = await platform
    .getByRole("heading", {
      name: "Visualize e compartilhe o projeto sem depender de software especializado"
    })
    .boundingBox();
  const imageBox = await platformImage.boundingBox();
  expect(imageBox?.x ?? 0).toBeGreaterThan(headingBox?.x ?? 0);
  expect(imageBox?.width ?? 0).toBeGreaterThan(300);
});

test("homepage full-bleed sections do not create horizontal overflow", async ({
  page
}) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1280, height: 900 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    await expect(page.getByTestId("section-visualization-platform")).not.toHaveClass(/w-screen/);
    await expect(page.getByTestId("section-final-cta")).not.toHaveClass(/w-screen/);

    const overflow = await page.evaluate(() => ({
      documentScrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      bodyScrollWidth: document.body.scrollWidth
    }));

    expect(overflow.documentScrollWidth).toBeLessThanOrEqual(overflow.viewportWidth);
    expect(overflow.bodyScrollWidth).toBeLessThanOrEqual(overflow.viewportWidth);
  }
});

test("homepage portfolio uses proof-shaped placeholders and FAQ uses app terminology", async ({
  page
}) => {
  await page.goto("/");

  const portfolio = page.getByTestId("section-portfolio");
  await expect(page.getByTestId("section-proof-snippets")).toHaveCount(0);
  await expect(portfolio).toContainText("PORTFÓLIO");
  await expect(portfolio.getByRole("heading", { name: "Exemplos de projeto e evidência entregue" })).toBeVisible();
  for (const text of [
    "Terreno em Condomínio",
    "Parcelamento em Chácaras",
    "REURB-E",
    "Viabilidade de Platô para Galpões",
    "Aterro Sanitário de São José dos Campos",
    "INCRA/SIGEF",
    "LEPAC",
    "ritmo de uso"
  ]) {
    await expect(portfolio).toContainText(text);
  }
  await expect(portfolio.locator("[data-testid='portfolio-skeleton']")).toHaveCount(5);
  await expect(portfolio.getByRole("link")).toHaveCount(0);

  const faq = page.getByTestId("section-faq");
  await expect(faq.locator("[data-accordion='collapse']")).toBeVisible();
  for (const topic of [
    "preço",
    "5/7/10 dias",
    "localização e objetivo",
    "App de Visualização e Compartilhamento",
    "aprovação ou auditoria",
    "entidade registrada"
  ]) {
    await expect(faq).toContainText(topic);
  }
  await expect(faq).not.toContainText(/a partir de R\$|preço inicial/i);
});

test("homepage ships without prototype-only markers or switchers", async ({ page }) => {
  await page.goto("/");

  const prototypeAttributes = await page.evaluate(() =>
    Array.from(document.querySelectorAll("*")).flatMap((element) =>
      Array.from(element.attributes)
        .map((attribute) => attribute.name)
        .filter((name) => name.startsWith("data-prototype") || name.startsWith("data-homepage-prototype"))
    )
  );
  expect(prototypeAttributes).toEqual([]);
  await expect(page.getByText(/PrototypeSwitcher|homepage prototype|variant switcher/i)).toHaveCount(0);
  expect(page.url()).not.toContain("variant=");
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
    await expect(page.getByTestId("home-hero-slide").filter({ hasText: name })).toHaveCount(1);
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

  const carouselInterval = 5200;
  const carouselWait = carouselInterval + 200;
  await expect(page.getByTestId("home-hero-carousel")).toHaveAttribute(
    "data-carousel-interval",
    String(carouselInterval)
  );

  const activeSlide = page.locator("[data-carousel-slide][aria-hidden='false']");
  await expect(activeSlide).toContainText("Projeto e Obra");

  await page.waitForTimeout(carouselWait);
  await expect(activeSlide).toContainText("Regularização Rural");

  await page.getByTestId("home-hero-media").hover();
  await page.waitForTimeout(carouselWait);
  await expect(activeSlide).toContainText("Regularização Rural");

  await page.mouse.move(0, 0);
  await page.getByRole("button", { name: "Mostrar Volumetria e Medição" }).click();
  await expect(activeSlide).toContainText("Volumetria e Medição");
  await expect(page.getByRole("button", { name: "Mostrar Volumetria e Medição" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );

  await page.waitForTimeout(carouselWait);
  await expect(activeSlide).toContainText("Volumetria e Medição");
});

test("homepage hero carousel does not auto-cycle when reduced motion is requested", async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const activeSlide = page.locator("[data-carousel-slide][aria-hidden='false']");
  await expect(activeSlide).toContainText("Projeto e Obra");

  await page.waitForTimeout(5400);
  await expect(activeSlide).toContainText("Projeto e Obra");
});
