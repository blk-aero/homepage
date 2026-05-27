export type HomepageCluster = {
  slug: string;
  title: string;
  detailPath: string;
  summary: string;
};

export const homepageClusters: HomepageCluster[] = [
  {
    slug: "projeto-e-obra",
    title: "Projeto e Obra",
    detailPath: "/solucoes/projeto-e-obra",
    summary: "Topografia, as-built, bases para arquitetura, engenharia e acompanhamento de obra."
  },
  {
    slug: "regularizacao-rural",
    title: "Regularização Rural",
    detailPath: "/solucoes/regularizacao-rural",
    summary: "Apoio tecnico para INCRA, SIGEF, CAR e documentacao rural."
  },
  {
    slug: "regularizacao-urbana",
    title: "Regularização Urbana",
    detailPath: "/solucoes/regularizacao-urbana",
    summary: "Bases geoespaciais para REURB, loteamentos, cadastro tecnico e aprovacao municipal."
  },
  {
    slug: "volumetria-e-medicao",
    title: "Volumetria e Medição",
    detailPath: "/solucoes/volumetria-e-medicao",
    summary: "Medições, volumes, auditoria de terraplenagem e evidencias contratuais."
  },
  {
    slug: "monitoramento-e-inteligencia-geografica",
    title: "Monitoramento e Inteligência Geográfica",
    detailPath: "/solucoes/monitoramento-e-inteligencia-geografica",
    summary: "Monitoramento, inspeção, due diligence, energia, agro, ambiente e gêmeos digitais."
  }
];
