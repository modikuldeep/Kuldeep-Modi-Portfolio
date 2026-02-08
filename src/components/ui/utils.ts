import classNames from "classnames";

export type SpacingToken = string | number;

const responsiveTokens = new Set(["xs", "s", "m", "l", "xl"]);

export const cn = classNames;

export function spacingValue(token?: SpacingToken) {
  if (token === undefined || token === null) return undefined;
  if (typeof token === "number") {
    return `var(--static-space-${token})`;
  }
  const trimmed = `${token}`.trim();
  if (!trimmed) return undefined;
  if (/^\d+$/.test(trimmed)) {
    return `var(--static-space-${trimmed})`;
  }
  if (responsiveTokens.has(trimmed)) {
    return `var(--responsive-space-${trimmed})`;
  }
  return trimmed;
}

export function spacingClass(prefix: string, token?: SpacingToken) {
  const value = spacingValue(token);
  if (!value) return undefined;
  return `${prefix}-[${value}]`;
}

export function positionClass(prefix: string, token?: SpacingToken) {
  const value = spacingValue(token);
  if (!value) return undefined;
  return `${prefix}-[${value}]`;
}

export function sizeClass(prefix: string, token?: SpacingToken) {
  const value = spacingValue(token);
  if (!value) return undefined;
  return `${prefix}-[${value}]`;
}

const backgroundMap: Record<string, string> = {
  page: "var(--page-background)",
  surface: "var(--surface-background)",
  transparent: "transparent",
  "neutral-strong": "var(--neutral-on-background-strong)",
  "neutral-medium": "var(--neutral-on-background-medium)",
  "neutral-weak": "var(--neutral-on-background-weak)",
  "brand-weak": "var(--brand-on-background-weak)",
  "brand-strong": "var(--brand-on-background-strong)",
  "neutral-border-medium": "var(--neutral-border-medium)",
};

export function colorValue(token?: string) {
  if (!token) return undefined;
  if (token in backgroundMap) return backgroundMap[token];
  return `var(--${token})`;
}

export function colorClass(prefix: string, token?: string) {
  const value = colorValue(token);
  if (!value) return undefined;
  return `${prefix}-[${value}]`;
}

export function radiusClass(token?: string) {
  if (!token) return undefined;
  if (token === "none") return "rounded-none";
  if (token === "full") return "rounded-full";
  if (token.includes("-")) {
    const [size, nest] = token.split("-");
    return `rounded-[var(--radius-${size}-nest-${nest})]`;
  }
  return `rounded-[var(--radius-${token})]`;
}

export function shadowClass(token?: string) {
  if (!token) return undefined;
  return `shadow-[var(--shadow-${token})]`;
}

export type AlignValue = "start" | "center" | "end" | "between" | "around" | "evenly" | "stretch";

export function justifyClass(value?: AlignValue) {
  if (!value) return undefined;
  switch (value) {
    case "start":
      return "justify-start";
    case "center":
      return "justify-center";
    case "end":
      return "justify-end";
    case "between":
      return "justify-between";
    case "around":
      return "justify-around";
    case "evenly":
      return "justify-evenly";
    case "stretch":
      return "justify-stretch";
    default:
      return undefined;
  }
}

export function alignClass(value?: AlignValue) {
  if (!value) return undefined;
  switch (value) {
    case "start":
      return "items-start";
    case "center":
      return "items-center";
    case "end":
      return "items-end";
    case "between":
      return "items-between";
    case "around":
      return "items-around";
    case "evenly":
      return "items-evenly";
    case "stretch":
      return "items-stretch";
    default:
      return undefined;
  }
}

export function textAlignClass(value?: "left" | "center" | "right") {
  if (!value) return undefined;
  if (value === "center") return "text-center";
  if (value === "right") return "text-right";
  return "text-left";
}

export const textVariantClasses: Record<string, string> = {
  "body-default-xs": "text-xs leading-relaxed",
  "body-default-s": "text-sm leading-relaxed",
  "body-default-m": "text-base leading-relaxed",
  "body-default-l": "text-lg leading-relaxed",
  "heading-default-xs": "text-sm font-medium",
  "heading-default-xl": "text-2xl font-medium",
  "heading-strong-l": "text-xl font-semibold",
  "heading-strong-s": "text-lg font-semibold",
  "heading-strong-xs": "text-base font-semibold",
  "heading-strong-xl": "text-3xl font-semibold",
  "display-default-xs": "text-2xl font-semibold",
  "display-strong-xs": "text-2xl font-semibold",
  "display-strong-s": "text-3xl font-semibold",
  "display-strong-m": "text-4xl font-semibold",
  "display-strong-l": "text-4xl font-semibold",
  "display-strong-xl": "text-5xl font-semibold",
  "label-default-m": "text-sm font-medium uppercase tracking-wide",
  "label-default-s": "text-xs font-medium uppercase tracking-wide",
  "label-strong-s": "text-xs font-semibold uppercase tracking-wide",
  "label-strong-m": "text-sm font-semibold uppercase tracking-wide",
  "heading-strong-m": "text-2xl font-semibold",
};

export function textVariantClass(variant?: string) {
  if (!variant) return undefined;
  return textVariantClasses[variant];
}

export function onBackgroundClass(value?: string) {
  if (!value) return undefined;
  switch (value) {
    case "neutral-weak":
      return "text-[var(--neutral-on-background-weak)]";
    case "neutral-medium":
      return "text-[var(--neutral-on-background-medium)]";
    case "neutral-strong":
      return "text-[var(--neutral-on-background-strong)]";
    case "brand-weak":
      return "text-[var(--brand-on-background-weak)]";
    case "brand-strong":
      return "text-[var(--brand-on-background-strong)]";
    default:
      return `text-[var(--${value})]`;
  }
}
