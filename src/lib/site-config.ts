import { getEntry, type CollectionEntry } from "astro:content";

export type SiteConfig = CollectionEntry<"site">["data"];

export async function getSiteConfig(): Promise<SiteConfig> {
  const entry = await getEntry("site", "global");
  if (!entry) {
    throw new Error("Missing site config entry at src/content/site/global.yaml");
  }

  return entry.data;
}
