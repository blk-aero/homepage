import { homepageClusters } from "./homepage-clusters";

export const homepageSectionOrder = [
  "hero",
  "compact-proof",
  "triage-cards",
  "deliverables",
  "visualization-platform",
  "technical-confidence",
  "portfolio",
  "faq",
  "final-cta"
] as const;

export type HomepageSectionId = (typeof homepageSectionOrder)[number];

export type HomepageProofItem = {
  name: string;
  href: string;
  logo?: string;
};

export type HomepageProofGroup = {
  title: string;
  items: HomepageProofItem[];
};

const homepageProofGroups = [
  {
    title: "Credenciais e Associações",
    items: [
      {
        name: "ACONVAP",
        href: "https://www.aconvap.com.br/",
        logo: "aconvap.png"
      },
      {
        name: "BR-UTM",
        href: "https://br-utm.decea.mil.br/",
        logo: "br-utm.png"
      },
      {
        name: "CREA-SP",
        href: "https://www.creasp.org.br/",
        logo: "crea-sp.png"
      },
      {
        name: "Enredes",
        href: "https://enredes.com.br/",
        logo: "enredes.png"
      },
      {
        name: "INCRA",
        href: "https://www.gov.br/incra/pt-br",
        logo: "incra.png"
      },
      {
        name: "Ministério da Defesa",
        href: "https://www.gov.br/defesa/pt-br/assuntos/aerolevantamento",
        logo: "ministerio-defesa.png"
      },
      {
        name: "UNICAMP",
        href: "https://unicampventures.org.br/",
        logo: "unicamp.png"
      }
    ]
  },
  {
    title: "Clientes e Projetos Atendidos",
    items: [
      {
        name: "Construtora Oliveira Roxo",
        href: "https://www.instagram.com/construtoraoliveiraroxo/",
        logo: "oliveira-roxo.png"
      },
      {
        name: "Lia Blanco Arquitetura",
        href: "https://www.instagram.com/blancolia/"
      },
      {
        name: "Lucas Diniz Arquitetura",
        href: "https://www.instagram.com/lucasdinizarquitetura/",
        logo: "lucas-diniz.png"
      },
      {
        name: "Macaw Studio",
        href: "https://macawstudio.myportfolio.com/",
        logo: "macaw-studio.png"
      },
      {
        name: "Mobilidade Urbana SJC",
        href: "https://www.sjc.sp.gov.br/secretarias/mobilidade-urbana/",
        logo: "pmsjc.png"
      },
      {
        name: "Montante",
        href: "https://montante.com.br/",
        logo: "montante.png"
      },
      {
        name: "Polimix Ambiental",
        href: "https://www.polimixambiental.com.br/",
        logo: "polimix-ambiental.png"
      },
      {
        name: "Sahyoun Properties",
        href: "https://sahyounproperties.com/",
        logo: "sahyoun-properties.svg"
      },
      {
        name: "Sergio Porto Engenharia",
        href: "https://www.sergioporto.com.br/",
        logo: "sergio-porto.png"
      },
      {
        name: "Six Engenharia",
        href: "https://sixengenharia.com.br/",
        logo: "six-engenharia.png"
      },
      {
        name: "SN Saneamento",
        href: "http://snsaneamento.com.br",
        logo: "sergio-nogueira.png"
      },
      {
        name: "URBAM",
        href: "https://www.urbam.com.br/",
        logo: "urbam.png"
      }
    ]
  }
] satisfies HomepageProofGroup[];

export const homepageContent = {
  hero: {
    title: "Do terreno real à decisão segura e auditável",
    subheadline:
      "A BLK transforma áreas, obras e ativos físicos em mapas, medições, peças técnicas e modelos 3D com rastreabilidade visual para reduzir retrabalho, destravar aprovações e tornar decisões técnicas claras para todos os envolvidos.",
    primaryCtaLabel: "Falar com especialista",
    slides: [
      {
        title: "Projeto e Obra",
        imageId: "projeto-obra",
        tag: "Base visual auditável",
        panelLabel: "Projeto / obra / compatibilização",
        panelTitle: "Terreno real para projetar, alinhar e executar",
        description:
          "Base topográfica, leitura 3D e referências claras para reduzir dúvida entre escritório, campo e obra.",
        alt: "Terreno técnico com curvas de nível, nuvem de pontos e marcadores para projeto e obra",
        objectPosition: "center 46%",
        metrics: [
          ["base", "DXF + curvas"],
          ["obra", "as built"],
          ["decisão", "compatibilização"]
        ]
      },
      {
        title: "Regularização Rural",
        imageId: "regularizacao-rural",
        tag: "Perímetro defensável",
        panelLabel: "Rural / vértices / memoriais",
        panelTitle: "Limites, relevo e peças técnicas em uma base única",
        description:
          "Perímetro, confrontações e evidência visual para conduzir regularização com menos retrabalho documental.",
        alt: "Mapa rural técnico com curvas de nível, perímetro e pontos de vértice",
        objectPosition: "center 50%",
        metrics: [
          ["limites", "vértices"],
          ["peças", "memorial"],
          ["base", "SIGEF / CAR"]
        ]
      },
      {
        title: "Regularização Urbana",
        imageId: "regularizacao-urbana",
        tag: "Cadastro compreensível",
        panelLabel: "Urbano / lotes / quadras",
        panelTitle: "Leitura clara de lotes, vias e ocupação urbana",
        description:
          "Mapa, cadastro e evidência visual para alinhar prefeitura, jurídico, engenharia e beneficiários.",
        alt: "Mapa urbano técnico com lotes, quadras, linhas cadastrais e pontos de controle",
        objectPosition: "center 48%",
        metrics: [
          ["cadastro", "lotes"],
          ["processo", "REURB"],
          ["alinhamento", "prefeitura"]
        ]
      },
      {
        title: "Volumetria e Medição",
        imageId: "volumetria-medicao",
        tag: "Medição verificável",
        panelLabel: "Volume / corte / aterro",
        panelTitle: "Volumes e comparativos que podem ser auditados",
        description:
          "Superfícies, seções e comparativos para medir estoque, corte, aterro e evolução de obra com rastreabilidade.",
        alt: "Análise técnica de volumetria com curvas de nível e linhas de medição",
        objectPosition: "center 54%",
        metrics: [
          ["volume", "corte / aterro"],
          ["controle", "estoque"],
          ["prova", "comparativo"]
        ]
      },
      {
        title: "Monitoramento e Inteligência Geográfica",
        imageId: "monitoramento-inteligencia",
        tag: "Mudança acompanhada",
        panelLabel: "Monitoramento / histórico / alerta",
        panelTitle: "Evolução do território acompanhada por evidência",
        description:
          "Histórico visual, mapas comparativos e indicadores para acompanhar risco, obra, ativos e território ao longo do tempo.",
        alt: "Mapa técnico de monitoramento com grade, curvas de nível e camadas geográficas",
        objectPosition: "center 42%",
        metrics: [
          ["tempo", "recorrência"],
          ["sinais", "alertas"],
          ["gestão", "governança"]
        ]
      }
    ]
  },
  sectionOrder: homepageSectionOrder,
  triageCards: {
    heading: "Escolha a base técnica ideal para o seu projeto",
    intro:
      "Selecione o caminho mais próximo da sua demanda. A BLK ajuda a transformar localização e objetivo em escopo, prazo e entregáveis técnicos.",
    cards: homepageClusters.map((cluster) => {
      const summaries: Record<string, string> = {
        "Projeto e Obra":
          "Quando a decisão depende de uma base confiável para projetar, compatibilizar ou acompanhar a execução.",
        "Regularização Rural":
          "Quando limites, confrontações e peças técnicas precisam sustentar análise documental e geoespacial.",
        "Regularização Urbana":
          "Quando cadastro, ocupação, lotes e vias precisam virar uma base clara para aprovação e alinhamento.",
        "Volumetria e Medição":
          "Quando volumes, evolução ou medições precisam ser comparáveis, verificáveis e fáceis de auditar.",
        "Monitoramento e Inteligência Geográfica":
          "Quando áreas, ativos ou riscos precisam ser acompanhados ao longo do tempo com evidência visual."
      };

      return {
        title: cluster.title,
        summary: summaries[cluster.title],
        detailPath: cluster.detailPath
      };
    })
  },
  proofBand: {
    groups: homepageProofGroups
  },
  deliverables: {
    eyebrow: "O QUE VOCÊ RECEBE",
    title: "Bases técnicas para destravar decisões",
    intro:
      "A entrega não é só uma pasta de arquivos. É uma base técnica organizada pelo uso: projetar, aprovar, medir ou alinhar pessoas em torno do mesmo território.",
    groups: [
      {
        trigger: "Projetar, compatibilizar ou executar obra",
        title: "Projeto e Obra",
        description:
          "Relevo, bases técnicas e leitura visual para reduzir dúvida entre escritório, campo e obra.",
        tags: ["DXF", "curvas de nível", "levantamento planialtimétrico", "as-built"]
      },
      {
        trigger: "Regularizar, aprovar ou defender limites",
        title: "Regularização e Aprovação",
        description:
          "Peças e evidências para apoiar processos rurais, urbanos, cadastrais, legais e municipais.",
        tags: ["memorial", "LEPAC", "perímetro", "planta ambiental"]
      },
      {
        trigger: "Medir, auditar ou pagar avanço físico",
        title: "Medição e Auditoria",
        description:
          "Volumes, superfícies e registros comparáveis para controle, pagamento e auditoria.",
        tags: ["volumetria", "corte / aterro", "comparativos", "relatório"]
      },
      {
        trigger: "Alinhar quem não usa software técnico",
        title: "Alinhamento Visual",
        description:
          "Mapas, modelos e evidências para alinhar gestão, engenharia, jurídico, clientes e contratados.",
        tags: ["ortofoto", "nuvem de pontos", "modelo 3D", "MDT"]
      }
    ]
  },
  visualizationPlatform: {
    eyebrow: "App de Visualização e Compartilhamento",
    title: "App de Visualização e Compartilhamento",
    headline: "Visualize e compartilhe o projeto sem depender de software especializado",
    description:
      "Ortofotos, nuvens de pontos, modelos 3D, evidências, plantas, memoriais e arquivos técnicos ficam organizados em um ambiente visual para engenharia, jurídico, gestão, clientes e contratados discutirem a mesma base sem instalar software especializado ou depender de hardware pesado.",
    imageAlt:
      "App de Visualização e Compartilhamento da BLK com entregáveis técnicos organizados no mapa",
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
  portfolio: {
    eyebrow: "PORTFÓLIO",
    title: "Exemplos de projeto e evidência entregue",
    intro:
      "Uma amostra dos tipos de entrega que a BLK organiza para projeto, regularização, medição e gestão territorial.",
    cards: [
      {
        cluster: "Projeto e Obra",
        title: "Terreno em Condomínio",
        description:
          "Base técnica para projeto arquitetônico e alinhamento visual antes de obra ou implantação.",
        artifact: "topografia",
        tags: ["topografia", "modelo 3D", "curvas de nível"]
      },
      {
        cluster: "Regularização Rural",
        title: "Parcelamento em Chácaras",
        description:
          "Organização de perímetro, peças técnicas e bases para regularização rural e análise documental.",
        artifact: "plantas e memoriais",
        tags: ["INCRA/SIGEF", "CAR", "plantas", "memoriais"]
      },
      {
        cluster: "Regularização Urbana",
        title: "REURB-E",
        description:
          "Base cadastral e ambiental para reduzir exigências e apoiar aprovação urbana.",
        artifact: "LEPAC",
        tags: ["LEPAC", "planta ambiental", "planta de perímetro"]
      },
      {
        cluster: "Volumetria e Medição",
        title: "Viabilidade de Platô para Galpões",
        description:
          "Simulações de terraplenagem para comparar cenários e apoiar decisão de compra.",
        artifact: "cenários",
        tags: ["simulação de cenários", "movimentação de terra", "decisão de compra"]
      },
      {
        cluster: "Monitoramento e Inteligência Geográfica",
        title: "Aterro Sanitário de São José dos Campos",
        description:
          "Série visual e métrica para acompanhar capacidade, tendência de uso e gestão do ativo.",
        artifact: "série visual",
        tags: ["previsão", "ritmo de uso", "gestão de ativo"]
      }
    ]
  },
  faq: {
    title: "Dúvidas comuns antes de contratar",
    items: [
      {
        question: "Como funciona o preço?",
        answer:
          "O preço depende de área, acesso, entregáveis, urgência e normas exigidas. A proposta vem depois de entendermos localização e objetivo."
      },
      {
        question: "Qual prazo devo considerar?",
        answer:
          "Use 5/7/10 dias como referência inicial para escopos simples, médios e mais completos. O prazo final é confirmado depois do escopo."
      },
      {
        question: "E se eu não souber exatamente o que pedir?",
        answer:
          "Envie localização e objetivo primeiro. A BLK ajuda a traduzir a demanda em entregáveis técnicos."
      },
      {
        question: "Preciso de software técnico para entender a entrega?",
        answer:
          "Não necessariamente. O App de Visualização e Compartilhamento ajuda stakeholders sem software especializado a entender mapas, modelos e evidências."
      },
      {
        question: "Serve para aprovação ou auditoria?",
        answer:
          "Depende do escopo, das normas e do órgão ou contrato envolvido. A entrega é planejada para o uso final esperado."
      },
      {
        question: "Por que aerolevantamento registrado importa?",
        answer:
          "Produtos de drone para uso formal devem vir de entidade registrada quando o escopo exige. Isso reduz risco técnico e legal."
      }
    ]
  },
  finalCta: {
    title: "Envie localização e objetivo do projeto",
    supportCopy:
      "Com essas duas informações, a BLK já consegue orientar o escopo inicial e indicar o próximo passo pelo WhatsApp.",
    location: {
      label: "Localização do projeto",
      placeholder: "Cidade, bairro, endereço ou link do mapa",
      maxLength: 300
    },
    objectives: [
      "Projeto e Obra",
      "Regularização Rural",
      "Regularização Urbana",
      "Volumetria e Medição",
      "Monitoramento e Inteligência Geográfica",
      "Ainda não sei, preciso de orientação"
    ]
  }
};
