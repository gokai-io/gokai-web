import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"

const components: Components = {
  h1: ({ children }) => (
    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[var(--surface-midnight)] mt-4">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h3 className="font-heading text-xl font-extrabold text-[var(--surface-midnight)] mt-2">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="font-heading text-lg font-bold text-[var(--surface-midnight)]/90">
      {children}
    </h4>
  ),
  h4: ({ children }) => (
    <h5 className="font-heading text-base font-bold text-[var(--surface-midnight)]/90">
      {children}
    </h5>
  ),
  hr: () => <hr className="border-[var(--surface-midnight)]/10 my-2" />,
  p: ({ children }) => (
    <p className="text-[var(--surface-midnight)]/75 leading-[1.8] text-[15px]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-2 pl-5 list-disc marker:text-[var(--surface-midnight)]/40">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-2 pl-5 list-decimal marker:text-[var(--surface-midnight)]/40">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-[var(--surface-midnight)]/75 leading-[1.8] text-[15px]">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-[var(--surface-midnight)]">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="my-4 pl-4 border-l-2 border-[var(--accent-carmine)]/30 text-sm text-[var(--surface-midnight)]/65 italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-[var(--surface-midnight)]/5 px-1.5 py-0.5 text-[13px] font-mono">
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="text-left py-2.5 px-3 font-bold text-[var(--surface-midnight)] border-b-2 border-[var(--surface-midnight)]/12">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-2.5 px-3 text-[var(--surface-midnight)]/75 border-b border-[var(--surface-midnight)]/6">
      {children}
    </td>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[var(--accent-carmine)] underline underline-offset-2 hover:text-[var(--accent-carmine)]/80"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
}

export function TransparenciaDocumentBody({ content }: { content: string }) {
  return (
    <div className="space-y-6">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  )
}
