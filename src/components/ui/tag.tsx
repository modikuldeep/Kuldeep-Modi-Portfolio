import React from "react";
import type { IconName } from "@/resources/icons";
import { Icon } from "./icon";
import { cn } from "./utils";

export type TagProps = {
  children: React.ReactNode;
  size?: "s" | "m" | "l";
  prefixIcon?: IconName;
  className?: string;
};

const sizeClasses: Record<string, string> = {
  s: "px-2 py-1 text-xs",
  m: "px-3 py-1 text-sm",
  l: "px-3 py-1.5 text-sm",
};

export function Tag({ children, size = "m", prefixIcon, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-m)] border border-[var(--neutral-alpha-weak)] bg-[var(--surface-background)]",
        sizeClasses[size],
        className,
      )}
    >
      {prefixIcon && <Icon name={prefixIcon} />}
      {children}
    </span>
  );
}
