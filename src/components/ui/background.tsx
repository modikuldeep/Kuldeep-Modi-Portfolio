import React from "react";
import { cn, colorValue, spacingClass } from "./utils";

export type FadeProps = {
  to?: "top" | "bottom";
  className?: string;
  fillWidth?: boolean;
  position?: "fixed" | "absolute";
  height?: string | number;
  bottom?: string | number;
  zIndex?: number;
  hide?: boolean;
  s?: { hide?: boolean };
};

export function Fade({
  to = "bottom",
  className,
  fillWidth,
  position,
  height,
  bottom,
  zIndex,
  hide,
  s,
}: FadeProps) {
  const gradient =
    to === "top"
      ? "bg-gradient-to-t from-[var(--page-background)] to-transparent"
      : "bg-gradient-to-b from-[var(--page-background)] to-transparent";
  return (
    <div
      className={cn(
        "pointer-events-none",
        gradient,
        fillWidth && "w-full",
        position === "fixed" && "fixed",
        position === "absolute" && "absolute",
        height ? `h-[var(--static-space-${height})]` : undefined,
        bottom ? `bottom-[var(--static-space-${bottom})]` : undefined,
        zIndex !== undefined ? `z-[${zIndex}]` : undefined,
        hide && "hidden",
        s?.hide && "s:hidden",
        hide && s?.hide === false ? "s:block" : undefined,
        className,
      )}
    />
  );
}

export type BackgroundProps = {
  mask?: { x: number; y: number; radius: number; cursor?: boolean };
  gradient?: {
    display: boolean;
    opacity: number;
    x: number;
    y: number;
    width: number;
    height: number;
    tilt: number;
    colorStart: string;
    colorEnd: string;
  };
  dots?: {
    display: boolean;
    opacity: number;
    size: string;
    color: string;
  };
  grid?: {
    display: boolean;
    opacity: number;
    color: string;
    width: string;
    height: string;
  };
  lines?: {
    display: boolean;
    opacity: number;
    size: string;
    thickness: number;
    angle: number;
    color: string;
  };
  className?: string;
};

export function Background({ gradient, dots, className }: BackgroundProps) {
  const dotColor = dots?.color ? colorValue(dots.color) : "transparent";
  const dotOpacity = dots ? dots.opacity / 100 : 0;
  const dotSize = dots?.size ? `var(--static-space-${dots.size})` : "1px";
  const gradientStart = gradient?.colorStart ? colorValue(gradient.colorStart) : undefined;
  const gradientEnd = gradient?.colorEnd ? colorValue(gradient.colorEnd) : undefined;
  const gradientOpacity = gradient ? gradient.opacity / 100 : 0;

  const backgroundImageParts: string[] = [];
  if (gradient?.display && gradientStart && gradientEnd) {
    backgroundImageParts.push(
      `radial-gradient(circle at ${gradient.x}% ${gradient.y}%, ${gradientStart} ${gradientOpacity * 100}%, ${gradientEnd} 100%)`,
    );
  }
  if (dots?.display && dotColor) {
    backgroundImageParts.push(
      `radial-gradient(${dotColor} ${dotOpacity}, transparent ${dotOpacity})`,
    );
  }

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: backgroundImageParts.length ? backgroundImageParts.join(",") : undefined,
        backgroundSize: dots?.display ? `${dotSize} ${dotSize}` : undefined,
      }}
    />
  );
}

export type RevealFxProps = {
  children: React.ReactNode;
  className?: string;
  fill?: boolean;
  fillWidth?: boolean;
  position?: "absolute" | "relative";
  horizontal?: "start" | "center" | "end" | "between";
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  translateY?: string | number;
  delay?: number;
};

export function RevealFx({
  children,
  className,
  fill,
  fillWidth,
  position = "relative",
  horizontal,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  translateY,
  delay,
}: RevealFxProps) {
  return (
    <div
      className={cn(
        position === "absolute" ? "absolute inset-0" : "relative",
        fill && "h-full w-full",
        fillWidth && "w-full",
        horizontal === "center" ? "flex justify-center" : undefined,
        horizontal === "end" ? "flex justify-end" : undefined,
        horizontal === "between" ? "flex justify-between" : undefined,
        spacingClass("pt", paddingTop),
        spacingClass("pb", paddingBottom),
        spacingClass("pl", paddingLeft),
        spacingClass("pr", paddingRight),
        className,
      )}
      style={{
        transform: translateY ? `translateY(${translateY}px)` : undefined,
        transitionDelay: delay ? `${delay}s` : undefined,
      }}
    >
      {children}
    </div>
  );
}
