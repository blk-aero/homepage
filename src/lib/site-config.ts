import { getEntry, type CollectionEntry } from "astro:content";

export type SiteConfig = CollectionEntry<"site">["data"];

const socialLabelOverrides: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  youtube: "YouTube"
};

const toSocialLabel = (icon: string): string => {
  const normalized = icon.trim().toLowerCase();
  const override = socialLabelOverrides[normalized];
  if (override) return override;

  return normalized
    .split(/[-_\s]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const normalizeSiteConfig = (config: SiteConfig): SiteConfig => ({
  ...config,
  footer: {
    ...config.footer,
    social_links: config.footer.social_links.map((social) => ({
      ...social,
      label: social.label ?? toSocialLabel(social.icon ?? "social")
    }))
  }
});

export async function getSiteConfig(): Promise<SiteConfig> {
  const entry = await getEntry("site", "global");
  if (!entry) {
    throw new Error("Missing site config entry at src/content/site/global.yaml");
  }

  return normalizeSiteConfig(entry.data);
}
