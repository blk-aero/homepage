import { homepageClusters } from "./homepage-clusters";

export const homepageSectionOrder = [
  "hero",
  "compact-proof",
  "triage-cards",
  "deliverables",
  "visualization-platform",
  "technical-confidence",
  "proof-snippets",
  "faq",
  "final-cta"
] as const;

export type HomepageSectionId = (typeof homepageSectionOrder)[number];

export const homepageContent = {
  hero: {
    title: "Do terreno real à decisão segura e auditável",
    subheadline:
      "A BLK transforma áreas, obras e ativos físicos em mapas, medições, peças técnicas e modelos 3D com rastreabilidade visual para reduzir retrabalho, destravar aprovações e tornar decisões técnicas claras para todos os envolvidos.",
    primaryCtaLabel: "Falar com especialista",
    slides: homepageClusters.map((cluster) => ({
      title: cluster.title,
      tag: "Solução BLK",
      description: cluster.summary,
      metric: "Base auditável",
      alt: `Visual representativo de ${cluster.title}`
    }))
  },
  sectionOrder: homepageSectionOrder,
  triageCards: homepageClusters.map((cluster) => ({
    title: cluster.title,
    summary: cluster.summary,
    detailPath: cluster.detailPath
  })),
  proofBand: {
    credentialsTitle: "Credenciais e Associações",
    credentials: ["ACONVAP", "Enredes", "Ministério da Defesa", "CREA-SP", "BR-UTM/DECEA"],
    clientProjectsTitle: "Clientes e Projetos Atendidos",
    clientProjects: [
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
    ]
  },
  deliverables: {
    title: "Bases para decidir com segurança"
  },
  visualizationPlatform: {
    title: "Plataforma visual para alinhar todos os envolvidos"
  },
  technicalConfidence: {
    title: "Como garantimos confiança técnica"
  },
  proofSnippets: {
    title: "Padrões reais de trabalho, apresentados sem expor clientes"
  },
  faq: {
    title: "Dúvidas comuns antes de contratar"
  },
  finalCta: {
    title: "Envie a localização e o objetivo do projeto"
  }
};
