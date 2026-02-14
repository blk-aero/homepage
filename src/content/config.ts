import { defineCollection, z } from "astro:content";

const navLink = z.object({
  label: z.string(),
  href: z.string()
});

const homeServiceCard = z.object({
  title: z.string(),
  description: z.string(),
  href: z.string()
});

const footerSocialLink = z
  .object({
    href: z.string().url(),
    icon: z.string().optional(),
    label: z.string().optional()
  })
  .refine((value) => Boolean(value.label || value.icon), {
    message: "footer social link requires label or icon"
  });

const footerQuickLink = z.object({
  text: z.string(),
  href: z.string()
});

const footerQuickLinksColumn = z.object({
  title: z.string(),
  links: z.array(footerQuickLink)
});

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    primary_keyword: z.string(),
    summary_bluf: z.string(),
    whatsapp_prompt: z.string(),
    guarantee: z.string().optional(),
    lead_magnet_href: z.string().optional(),
    proof_images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional()
        })
      )
      .optional(),
    competitor_comparison: z
      .array(
        z.object({
          feature: z.string(),
          us: z.string(),
          them: z.string()
        })
      )
      .optional(),
    specifications: z.array(
      z.object({
        key: z.string(),
        value: z.string()
      })
    ),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string()
      })
    ),
    price_anchor: z.string(),
    updated_at: z.string().optional(),
    mentions: z
      .array(
        z.object({
          name: z.string(),
          sameAs: z.string().url()
        })
      )
      .optional()
  })
});

const cities = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    state: z.string(),
    lat: z.number(),
    lng: z.number(),
    neighborhoods: z.array(z.string()),
    local_faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string()
      })
    ),
    updated_at: z.string().optional()
  })
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    updated_at: z.string().optional()
  })
});

const cases = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    service_slug: z.string(),
    city_slug: z.string(),
    updated_at: z.string().optional()
  })
});

const site = defineCollection({
  type: "data",
  schema: z.object({
    meta: z.object({
      brand_name: z.string(),
      legal_name: z.string(),
      language_code: z.string(),
      default_description: z.string(),
      home_title: z.string(),
      home_description: z.string(),
      about_title: z.string(),
      about_description: z.string()
    }),
    contact: z.object({
      phone_display: z.string(),
      email: z.string().email(),
      cnpj: z.string(),
      address_city: z.string(),
      address_state: z.string(),
      address_country: z.string(),
      trust_title: z.string(),
      trust_certifications: z.string(),
      about_certifications: z.string(),
      privacy_label: z.string(),
      privacy_path: z.string(),
      footer_summary: z.string(),
      about_intro: z.string(),
      about_trust_title: z.string(),
      whatsapp: z.object({
        nav_intro: z.string(),
        footer_intro: z.string()
      })
    }),
    navigation: z.object({
      primary_links: z.array(navLink).min(1)
    }),
    home: z.object({
      hero: z.object({
        h1: z.string(),
        subheadline: z.string(),
        primary_cta_label: z.string(),
        primary_cta_href: z.string(),
        secondary_cta_label: z.string(),
        secondary_cta_href: z.string()
      }),
      service_cards: z.array(homeServiceCard).min(1),
      lead_magnet: z.object({
        title: z.string(),
        description: z.string(),
        href: z.string(),
        label: z.string()
      })
    }),
    footer: z.object({
      social_title: z.string(),
      social_links: z.array(footerSocialLink),
      quicklinks: z.object({
        column1: footerQuickLinksColumn,
        column2: footerQuickLinksColumn,
        column3: footerQuickLinksColumn
      })
    }),
    legacy_hugo: z.record(z.string(), z.unknown())
  })
});

export const collections = {
  services,
  cities,
  blog,
  cases,
  site
};
