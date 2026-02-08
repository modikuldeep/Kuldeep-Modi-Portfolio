import React from "react";
import { cn } from "./utils";

export type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "h-6 w-6 animate-spin rounded-full border-2 border-[var(--neutral-alpha-weak)] border-t-[var(--brand-solid-strong)]",
        className,
      )}
    />
  );
}
