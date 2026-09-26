import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Markdown, safeUrl } from "./markdown";

const render = (md: string) => renderToStaticMarkup(createElement(Markdown, null, md));

describe("Markdown", () => {
  it("renders http(s) links as safe new-tab links, including autolinks", () => {
    const html = render("See [PR](https://github.com/x/y/pull/1) and https://example.com");
    expect(html).toContain('href="https://github.com/x/y/pull/1"');
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');
  });

  it("neutralizes unsafe protocols", () => {
    const html = render("[x](javascript:alert(1)) [y](data:text/html,hi) [z](/internal)");
    expect(html).not.toMatch(/href="(javascript|data|\/internal)/);
  });

  it("never renders raw HTML or scripts", () => {
    const html = render('<script>alert(1)</script>\n\nText <img src=x onerror="alert(1)"> **bold**');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("<img");
    expect(html).toContain("<strong>bold</strong>");
  });

  it("drops markdown images", () => {
    expect(render("![alt](https://example.com/x.png)")).not.toContain("<img");
  });

  it("allows only http and https in safeUrl", () => {
    expect(safeUrl("https://a.b")).toBe("https://a.b");
    expect(safeUrl("http://a.b")).toBe("http://a.b");
    expect(safeUrl("mailto:a@b.c")).toBe("");
    expect(safeUrl("JavaScript:alert(1)")).toBe("");
  });
});
