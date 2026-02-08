"use client";

import React, { useEffect, useState } from "react";
import { cn } from "./utils";

type HeadingItem = { id: string; text: string; level: number };

export function HeadingNav({ className }: { className?: string }) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("article h2, article h3"));
    const items = elements
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        level: el.tagName === "H3" ? 3 : 2,
      }));
    setHeadings(items);
  }, []);

  if (!headings.length) return null;

  return (
    <nav className={cn("flex flex-col gap-2 text-sm", className)}>
      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-on-background-weak)]">
        On this page
      </span>
      <ul className="flex flex-col gap-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "ml-4" : undefined}>
            <a href={`#${heading.id}`} className="text-[var(--neutral-on-background-strong)]">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
