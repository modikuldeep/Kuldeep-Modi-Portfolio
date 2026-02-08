import React from "react";
import { cn, radiusClass } from "./utils";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
  background?: string;
  border?: string;
  radius?: string;
};

export function Card({ children, className, background = "surface", border, radius = "m" }: CardProps) {
  return (
    <div
      className={cn(
        "border",
        background ? `bg-[var(--${background === "surface" ? "surface-background" : background})]` : undefined,
        border ? `border-[var(--${border})]` : "border-[var(--neutral-alpha-weak)]",
        radiusClass(radius),
        className,
      )}
    >
      {children}
    </div>
  );
}
