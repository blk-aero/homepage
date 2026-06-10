import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";

// Mock global fetch
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe("IndexNow Script", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("skips execution if INDEXNOW_KEY is not defined", async () => {
    delete process.env.INDEXNOW_KEY;
    
    // Load script dynamically with cache-busting query
    await import("../../scripts/indexnow.mjs?test1");
    
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  it("submits sitemap URLs when INDEXNOW_KEY is defined", async () => {
    process.env.INDEXNOW_KEY = "test_key_123";
    process.env.SITE_URL = "https://blk.aero";

    // Mock fs checks and reading
    vi.spyOn(fs, "existsSync").mockImplementation((p) => {
      if (typeof p === "string") {
        return p.endsWith("sitemap-index.xml") || p.endsWith("sitemap-0.xml");
      }
      return false;
    });

    vi.spyOn(fs, "readFileSync").mockImplementation((p) => {
      if (typeof p === "string" && p.endsWith("sitemap-index.xml")) {
        return `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <sitemap><loc>https://blk.aero/sitemap-0.xml</loc></sitemap>
        </sitemapindex>`;
      }
      if (typeof p === "string" && p.endsWith("sitemap-0.xml")) {
        return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url><loc>https://blk.aero/</loc></url>
          <url><loc>https://blk.aero/solucoes/</loc></url>
        </urlset>`;
      }
      return "";
    });

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200
    });

    await import("../../scripts/indexnow.mjs?test2");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.indexnow.org/IndexNow",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          host: "blk.aero",
          key: "test_key_123",
          keyLocation: "https://blk.aero/test_key_123.txt",
          urlList: ["https://blk.aero/", "https://blk.aero/solucoes/"]
        })
      })
    );
  });
});
