import ReactMarkdown, { type Components } from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

/** Only absolute http(s) URLs survive; everything else (javascript:, data:, relative) becomes inert. */
export function safeUrl(url: string) {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

const components: Components = {
  a: ({ href, children }) =>
    href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-strong">
        {children}
      </a>
    ) : (
      <span>{children}</span>
    ),
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="grid gap-3 text-sm leading-relaxed text-ink-secondary [&_code]:rounded [&_code]:bg-surface-raised [&_code]:px-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        skipHtml
        disallowedElements={["img"]}
        unwrapDisallowed
        urlTransform={safeUrl}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
