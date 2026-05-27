import { defineCollection, z } from "astro:content";

const navLink = z.object({
  label: z.string(),
  href: z.string()
});

const footerLink = z.object({
  label: z.string(),
  href: z.string()
});

const footerLinkColumn = z.object({
  title: z.string(),
  links: z.array(footerLink).min(1)
});

const footerSocialLink = z.object({
  label: z.string(),
  href: z.string().url(),
  icon: z.enum(["linkedin", "youtube", "facebook", "instagram"])
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
      language_code: z.string(),
      default_description: z.string(),
      home_title: z.string(),
      home_description: z.string()
    }),
    contact: z.object({
      phone_display: z.string(),
      email: z.string().email(),
      trust_certifications: z.string(),
      footer_summary: z.string(),
      whatsapp: z.object({
        nav_intro: z.string(),
        footer_intro: z.string()
      })
    }),
    navigation: z.object({
      primary_links: z.array(navLink).min(1)
    }),
    footer: z.object({
      link_columns: z.array(footerLinkColumn).min(1),
      social_links: z.array(footerSocialLink).min(1)
    })
  })
});

export const collections = {
  services,
  cities,
  blog,
  cases,
  site
};
