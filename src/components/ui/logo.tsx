import React from "react";
import Image from "next/image";
import { cn } from "./utils";

export type LogoProps = {
  wordmark: string;
  size?: "s" | "m" | "l" | "xl";
  className?: string;
};

const sizeClasses: Record<string, string> = {
  s: "h-6",
  m: "h-8",
  l: "h-10",
  xl: "h-12",
};

export function Logo({ wordmark, size = "m", className }: LogoProps) {
  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <Image src={wordmark} alt="Logo" fill className="object-contain" />
    </div>
  );
}
