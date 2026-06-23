import Image from "next/image";
import ReactMarkdown from "react-markdown";

/** Tudósítás markdown törzs – egységes tipográfia. */
export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="markdown-body space-y-5 text-lg leading-relaxed text-graphite-700">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="pt-2 font-serif text-2xl font-semibold text-graphite-900">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="pt-1 font-serif text-xl font-semibold text-graphite-900">{children}</h3>
          ),
          p: ({ children }) => <p>{children}</p>,
          ul: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null;
            return (
              <figure className="my-8 overflow-hidden rounded-2xl border border-cream-300/70 shadow-premium">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={src}
                    alt={alt ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </div>
                {alt ? (
                  <figcaption className="border-t border-cream-200 bg-cream-50 px-4 py-3 text-sm text-graphite-500">
                    {alt}
                  </figcaption>
                ) : null}
              </figure>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gold-400 bg-gold-50/60 px-5 py-4 font-serif italic text-graphite-700">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => <strong className="font-semibold text-graphite-900">{children}</strong>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
