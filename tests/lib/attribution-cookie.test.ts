import { describe, it, expect } from "vitest";

describe("Cookie Attribution Helpers", () => {
  it("parses and validates cookie TTL and values", () => {
    const parseCookie = (cookieString: string, name: string) => {
      const nameEQ = name + "=";
      const ca = cookieString.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
      }
      return null;
    };

    const mockCookie = "blk_cookie_attribution_v1=%7B%22utm_source%22%3A%22google%22%7D; other=123";
    expect(parseCookie(mockCookie, "blk_cookie_attribution_v1")).toBe('{"utm_source":"google"}');
  });
});
