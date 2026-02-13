import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export function buildIndexNowPayload({ host, key, keyLocation, urlList }) {
  return {
    host,
    key,
    keyLocation,
    urlList
  };
}

async function readUrlsFromSitemap(filePath) {
  try {
    const xml = await readFile(filePath, "utf8");
    return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  } catch {
    return [];
  }
}

async function main() {
  const siteUrl = (process.env.SITE_URL || "http://localhost:4321").replace(/\/$/, "");
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.error("INDEXNOW_KEY is required");
    process.exit(1);
  }

  const host = new URL(siteUrl).host;
  const keyLocation = `${siteUrl}/${key}.txt`;
  const fallbackUrls = [`${siteUrl}/`, `${siteUrl}/servicos/`, `${siteUrl}/cidades/`];
  const sitemapUrls = await readUrlsFromSitemap(resolve("dist", "sitemap-index.xml"));
  const urlList = sitemapUrls.length > 0 ? sitemapUrls : fallbackUrls;

  const payload = buildIndexNowPayload({ host, key, keyLocation, urlList });
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("IndexNow submission failed:", response.status, text);
    process.exit(1);
  }

  console.log(`IndexNow submitted ${payload.urlList.length} URLs for ${host}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
