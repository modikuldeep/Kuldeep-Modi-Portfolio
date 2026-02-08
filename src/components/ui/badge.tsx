import React from "react";
import Link from "next/link";
import { cn } from "./utils";

export type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export function Badge({ children, className, href }: BadgeProps) {
  const badge = (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--neutral-alpha-weak)] bg-[var(--surface-background)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--neutral-on-background-strong)]",
        className,
      )}
    >
      {children}
    </span>
  );

  if (href) {
    return <Link href={href}>{badge}</Link>;
  }

  return badge;
}
