import { FC, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChartLine, ChartBar, ChartArea, ChartPie } from "@/components/Charts";
import { CompoundInterestCalculator } from "@/components/Calculators";
import { YouTube } from "@/components/YouTube";

interface ICalloutProps {
  type?: "info" | "warning" | "success" | "error";
  children: ReactNode;
}

const Callout: FC<ICalloutProps> = ({ type = "info", children }) => {
  const styles = {
    info: "bg-blue-500/10 border-blue-500 text-blue-400",
    warning: "bg-yellow-500/10 border-yellow-500 text-yellow-400",
    success: "bg-green-500/10 border-green-500 text-green-400",
    error: "bg-red-500/10 border-red-500 text-red-400",
  };

  return (
    <div
      className={`my-6 p-4 rounded-lg border-r-4 ${styles[type]}`}
    >
      {children}
    </div>
  );
};

interface IImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const CustomImage: FC<IImageProps> = ({ src, alt, caption }) => {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="rounded-lg"
      />
      {caption && (
        <figcaption className="text-center text-sm text-[var(--muted)] mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export const MDXComponents = {
  // Typography
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
  ),
  h4: ({ children }: { children: ReactNode }) => (
    <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="mb-4 leading-relaxed text-[var(--foreground)]">{children}</p>
  ),
  
  // Links
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <Link
      href={href || "#"}
      className="text-[var(--primary)] hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  ),
  
  // Lists
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="mb-4 pr-6 list-disc list-inside space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="mb-4 pr-6 list-decimal list-inside space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="text-[var(--foreground)]">{children}</li>
  ),
  
  // Code
  code: ({ children }: { children: ReactNode }) => (
    <code className="px-2 py-1 bg-[var(--card)] rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="my-6 p-4 bg-[var(--card)] rounded-lg overflow-x-auto">
      {children}
    </pre>
  ),
  
  // Blockquote
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-6 pr-4 border-r-4 border-[var(--primary)] italic text-[var(--muted)]">
      {children}
    </blockquote>
  ),
  
  // Horizontal rule
  hr: () => <hr className="my-8 border-[var(--border)]" />,
  
  // Table
  table: ({ children }: { children: ReactNode }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="border border-[var(--border)] bg-[var(--card)] p-3 text-right font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="border border-[var(--border)] p-3">{children}</td>
  ),
  
  // Custom components
  Callout,
  Image: CustomImage,
  YouTube,
  ChartLine,
  ChartBar,
  ChartArea,
  ChartPie,
  CompoundInterestCalculator,
};
