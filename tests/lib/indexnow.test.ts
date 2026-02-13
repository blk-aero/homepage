import { describe, it, expect } from "vitest";
import { buildIndexNowPayload } from "../../scripts/indexnow.mjs";

describe("indexnow payload", () => {
  it("builds payload with host key and urlList", () => {
    const payload = buildIndexNowPayload({
      host: "example.com",
      key: "abc123",
      keyLocation: "https://example.com/abc123.txt",
      urlList: ["https://example.com/servicos/x"]
    });

    expect(payload.host).toBe("example.com");
    expect(payload.urlList.length).toBe(1);
  });
});
