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
  site
};
