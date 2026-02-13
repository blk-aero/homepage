import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, "") ?? "http://localhost:4321";
  const content = [`User-agent: *`, `Allow: /`, `Sitemap: ${siteUrl}/sitemap-index.xml`].join("\n");

  return new Response(content, {
    headers: {
      "content-type": "text/plain; charset=utf-8"
    }
  });
};
