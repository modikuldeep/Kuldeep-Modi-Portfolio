"use client";

import React, { useState } from "react";
import { cn } from "./utils";

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-[var(--neutral-alpha-weak)] px-1 py-0.5 font-mono text-sm">
      {children}
    </code>
  );
}

export type CodeBlockProps = {
  codes: { code: string; language?: string; label?: string }[];
  copyButton?: boolean;
  marginTop?: string | number;
  marginBottom?: string | number;
};

export function CodeBlock({ codes, copyButton }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const code = codes?.[0]?.code ?? "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-m)] border border-[var(--neutral-alpha-weak)] bg-[var(--neutral-background-weak)]">
      {copyButton && (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded bg-[var(--surface-background)] px-2 py-1 text-xs"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      )}
      <pre className="overflow-x-auto p-4 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="rounded-[var(--radius-m)] border border-[var(--neutral-alpha-weak)] bg-[var(--surface-background)] px-4 py-3">
      <summary className="cursor-pointer font-medium">{title}</summary>
      <div className="mt-2 text-sm text-[var(--neutral-on-background-weak)]">{children}</div>
    </details>
  );
}

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>;
}

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export function Feedback({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-m)] border border-[var(--neutral-alpha-weak)] bg-[var(--surface-background)] p-4 text-sm">
      {children}
    </div>
  );
}

export function List({ as = "ul", children }: { as?: "ul" | "ol"; children: React.ReactNode }) {
  const Component = as;
  return (
    <Component className={cn("ml-6 list-disc space-y-2", as === "ol" && "list-decimal")}>
      {children}
    </Component>
  );
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="text-sm leading-relaxed">{children}</li>;
}
