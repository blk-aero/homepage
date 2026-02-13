export type ServiceGraphInput = {
  siteUrl: string;
  slug: string;
  title: string;
};

export function buildServiceGraph(input: ServiceGraphInput) {
  const canonical = `${input.siteUrl.replace(/\/$/, "")}/servicos/${input.slug}`;
  const webpageId = `${canonical}#webpage`;
  const serviceId = `${canonical}#service`;
  const breadcrumbId = `${canonical}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: canonical,
        name: input.title,
        breadcrumb: { "@id": breadcrumbId }
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: input.title,
        url: canonical,
        provider: {
          "@type": "Organization",
          name: "BLK Aero"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${input.siteUrl.replace(/\/$/, "")}/` },
          { "@type": "ListItem", position: 2, name: "Servicos", item: `${input.siteUrl.replace(/\/$/, "")}/servicos` },
          { "@type": "ListItem", position: 3, name: input.title, item: canonical }
        ]
      }
    ]
  };
}
