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
    title: "Bases para decidir com segurança",
    groups: [
      {
        title: "Base para Projeto e Obra",
        description:
          "Levantamentos, as-built e bases visuais para orientar decisões de arquitetura, engenharia e obra."
      },
      {
        title: "Base para Regularização e Aprovação",
        description:
          "Peças e evidências para apoiar processos rurais, urbanos, cadastrais, legais e municipais."
      },
      {
        title: "Base para Medição e Auditoria",
        description:
          "Medições, volumes e registros comparáveis para auditoria, pagamento e controle de avanço."
      },
      {
        title: "Base Visual para Alinhamento",
        description:
          "Mapas, modelos e evidências para alinhar gestão, engenharia, jurídico, clientes e contratados."
      }
    ]
  },
  visualizationPlatform: {
    title: "Plataforma visual para alinhar todos os envolvidos",
    description:
      "orthoimages, nuvens de pontos, modelos 3D e evidências ficam organizados em um ambiente visual para engenharia, jurídico, gestão, clientes e contratados discutirem a mesma base sem instalar software especializado ou depender de hardware pesado.",
    highlights: [
      "Inspeção visual de áreas, obras e ativos",
      "Evidências reunidas no mesmo contexto espacial",
      "Acesso mais claro para stakeholders não técnicos"
    ]
  },
  technicalConfidence: {
    title: "Como garantimos confiança técnica",
    framing:
      "Mais detalhe, menos interpolação: a captura aérea gera uma base densa, e a precisão é validada com GNSS, pontos de controle, checkpoints e PEC-PCD conforme o uso final.",
    trustBadge: {
      label: "Categoria A em Aerolevantamento pelo Ministério da Defesa",
      href: "https://www.gov.br/defesa/pt-br/assuntos/aerolevantamento"
    },
    steps: [
      {
        title: "Entender a decisão",
        description: "Mapeamos o objetivo, o órgão envolvido, o prazo e o uso técnico esperado."
      },
      {
        title: "Planejar a captura",
        description:
          "Definimos voo, GNSS, pontos de controle e checkpoints conforme escala, relevo e norma aplicável."
      },
      {
        title: "Capturar com rastreabilidade",
        description:
          "Registramos campo, imagens e bases para manter evidência auditável da origem dos dados."
      },
      {
        title: "Processar e validar",
        description:
          "Conferimos consistência, PEC-PCD, ABNT NBR 13133, INCRA/SIGEF e requisitos técnicos do escopo."
      },
      {
        title: "Entregar conforme normas e uso final",
        description:
          "Organizamos peças, mapas e modelos com atenção a Ministério da Defesa/SisCLATEN e regras de aerolevantamento quando o uso formal exige."
      }
    ]
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
