import fs from "node:fs";
import path from "node:path";

const key = process.env.INDEXNOW_KEY;
const siteUrl = process.env.SITE_URL || "https://blk.aero";

if (!key) {
  console.log("INDEXNOW_KEY is not configured. Skipping IndexNow submission.");
  process.exit(0);
}

const sitemapIndex = path.join(process.cwd(), "dist", "sitemap-index.xml");
let urls = [];

if (fs.existsSync(sitemapIndex)) {
  const content = fs.readFileSync(sitemapIndex, "utf-8");
  const sitemapUrls = [...content.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);

  for (const sitemapUrl of sitemapUrls) {
    const sitemapFilename = path.basename(sitemapUrl);
    const sitemapPath = path.join(process.cwd(), "dist", sitemapFilename);
    if (fs.existsSync(sitemapPath)) {
      const subContent = fs.readFileSync(sitemapPath, "utf-8");
      const pageUrls = [...subContent.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);
      urls.push(...pageUrls);
    } else {
      urls.push(sitemapUrl);
    }
  }
} else {
  const sitemap0 = path.join(process.cwd(), "dist", "sitemap-0.xml");
  if (fs.existsSync(sitemap0)) {
    const content = fs.readFileSync(sitemap0, "utf-8");
    urls = [...content.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  }
}

urls = [...new Set(urls)].filter((u) => u.startsWith(siteUrl));

if (urls.length === 0) {
  console.log("No URLs found in sitemaps for domain:", siteUrl);
  process.exit(0);
}

console.log(`Submitting ${urls.length} URLs to IndexNow for domain ${siteUrl}...`);

const payload = {
  host: new URL(siteUrl).hostname,
  key: key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList: urls
};

try {
  const response = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    console.log("IndexNow submission successful! Status:", response.status);
  } else {
    console.error("IndexNow submission failed with status:", response.status, await response.text());
    process.exit(1);
  }
} catch (err) {
  console.error("Error sending IndexNow request:", err);
  process.exit(1);
}
