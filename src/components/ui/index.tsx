import React, { type CSSProperties } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { iconLibrary, type IconName } from "@/resources/icons";

const breakpointPrefix = {
  xs: "sm",
  s: "md",
  m: "lg",
} as const;

type ResponsiveOptions = {
  hide?: boolean;
  direction?: "row" | "column";
  columns?: number;
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static";
  style?: CSSProperties;
};

type SpacingValue = number | string;

type LayoutProps = {
  as?: React.ElementType;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  fillWidth?: boolean;
  fillHeight?: boolean;
  fill?: boolean;
  fitWidth?: boolean;
  fitHeight?: boolean;
  horizontal?: "start" | "center" | "end" | "between";
  vertical?: "start" | "center" | "end";
  center?: boolean;
  align?: "start" | "center" | "end";
  wrap?: boolean;
  gap?: SpacingValue;
  padding?: SpacingValue;
  paddingX?: SpacingValue;
  paddingY?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  paddingRight?: SpacingValue;
  margin?: SpacingValue;
  marginX?: SpacingValue;
  marginY?: SpacingValue;
  marginTop?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  marginRight?: SpacingValue;
  maxWidth?: SpacingValue;
  minWidth?: SpacingValue;
  minHeight?: SpacingValue;
  maxHeight?: SpacingValue;
  height?: SpacingValue;
  width?: SpacingValue;
  radius?: string;
  background?: string;
  onBackground?: string;
  border?: string;
  shadow?: string;
  flex?: number;
  zIndex?: number;
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static";
  top?: SpacingValue;
  bottom?: SpacingValue;
  left?: SpacingValue;
  right?: SpacingValue;
  textVariant?: string;
  transition?: string;
  hide?: boolean;
  s?: ResponsiveOptions;
  m?: ResponsiveOptions;
  xs?: ResponsiveOptions;
} & React.HTMLAttributes<HTMLElement>;

type ButtonVariant = "secondary" | "ghost" | "primary";

type ButtonProps = {
  href?: string;
  prefixIcon?: IconName | string;
  suffixIcon?: IconName | string;
  arrowIcon?: boolean;
  size?: "s" | "m" | "l";
  weight?: "default";
  variant?: ButtonVariant;
  label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

type IconButtonProps = {
  href?: string;
  icon?: IconName | string;
  size?: "s" | "m" | "l" | "xl";
  variant?: ButtonVariant;
  tooltip?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ToggleButtonProps = {
  href?: string;
  prefixIcon?: IconName | string;
  selected?: boolean;
  label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type TextProps = {
  as?: React.ElementType;
  variant?: string;
  onBackground?: string;
  wrap?: "balance" | "nowrap";
  align?: "start" | "center" | "end";
  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  marginRight?: SpacingValue;
  padding?: SpacingValue;
  paddingX?: SpacingValue;
  paddingY?: SpacingValue;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export type MediaProps = {
  src: string;
  alt?: string;
  sizes?: string;
  radius?: string;
  border?: string;
  enlarge?: boolean;
  priority?: boolean;
  cursor?: "interactive";
  aspectRatio?: string;
  marginTop?: SpacingValue;
  marginBottom?: SpacingValue;
  className?: string;
  style?: CSSProperties;
};

const pxValue = (value?: SpacingValue) => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") {
    return `${value}px`;
  }
  if (value === "s" || value === "m" || value === "l" || value === "xl" || value === "xs") {
    return `var(--responsive-space-${value})`;
  }
  if (/^\d+$/.test(value)) {
    return `${value}px`;
  }
  return value;
};

const spacingClass = (prefix: string, value?: SpacingValue) => {
  const cssValue = pxValue(value);
  return cssValue ? `${prefix}-[${cssValue}]` : undefined;
};

const colorClass = (prefix: "bg" | "text" | "border", token?: string) => {
  if (!token) return undefined;
  if (token === "transparent") return prefix === "border" ? "border-transparent" : `${prefix}-transparent`;
  if (prefix === "text" && token.startsWith("neutral-")) {
    return `${prefix}-[color:var(--neutral-on-background-${token.split("-")[1]})]`;
  }
  if (prefix === "border" && token.startsWith("neutral-")) {
    return `${prefix}-[color:var(--neutral-border-${token.split("-")[1]})]`;
  }
  const tokenMap: Record<string, string> = {
    "brand-alpha-weak": "--brand-alpha-weak",
    "brand-alpha-medium": "--brand-alpha-medium",
    "brand-alpha-strong": "--brand-alpha-strong",
    "neutral-alpha-weak": "--neutral-alpha-weak",
    "neutral-alpha-medium": "--neutral-alpha-medium",
    "neutral-alpha-strong": "--neutral-alpha-strong",
    "neutral-strong": "--neutral-background-strong",
    "neutral-medium": "--neutral-background-medium",
    "neutral-weak": "--neutral-background-weak",
    page: "--page-background",
    surface: "--surface-background",
    "brand-weak": "--brand-on-background-weak",
    "brand-medium": "--brand-on-background-medium",
    "brand-strong": "--brand-on-background-strong",
    "accent-weak": "--accent-on-background-weak",
    "accent-medium": "--accent-on-background-medium",
    "accent-strong": "--accent-on-background-strong",
  };
  const variable = tokenMap[token] || `--${token}`;
  return `${prefix}-[color:var(${variable})]`;
};

const textVariantClass = (variant?: string) => {
  switch (variant) {
    case "display-strong-xl":
      return "font-heading text-4xl md:text-5xl font-semibold";
    case "display-strong-l":
      return "font-heading text-3xl md:text-4xl font-semibold";
    case "display-strong-m":
      return "font-heading text-2xl md:text-3xl font-semibold";
    case "display-strong-s":
      return "font-heading text-xl md:text-2xl font-semibold";
    case "display-strong-xs":
      return "font-heading text-lg md:text-xl font-semibold";
    case "display-default-xs":
      return "font-heading text-lg font-normal";
    case "heading-strong-xl":
      return "font-heading text-3xl md:text-4xl font-semibold";
    case "heading-strong-l":
      return "font-heading text-2xl font-semibold";
    case "heading-strong-m":
      return "font-heading text-xl font-semibold";
    case "heading-strong-s":
      return "font-heading text-lg font-semibold";
    case "heading-strong-xs":
      return "font-heading text-base font-semibold";
    case "heading-default-xl":
      return "font-heading text-2xl font-normal";
    case "heading-default-xs":
      return "font-heading text-base font-normal";
    case "body-default-l":
      return "font-body text-lg";
    case "body-default-m":
      return "font-body text-base";
    case "body-default-s":
      return "font-body text-sm";
    case "body-default-xs":
      return "font-body text-xs";
    case "label-default-s":
      return "font-label text-xs uppercase tracking-wide";
    case "label-default-m":
      return "font-label text-sm uppercase tracking-wide";
    case "label-strong-s":
      return "font-label text-xs font-semibold uppercase tracking-wide";
    case "label-strong-m":
      return "font-label text-sm font-semibold uppercase tracking-wide";
    default:
      return undefined;
  }
};

const radiusClass = (radius?: string) => {
  if (!radius) return undefined;
  const map: Record<string, string> = {
    full: "rounded-full",
    "m": "rounded-md",
    "m-4": "rounded-lg",
    "l": "rounded-lg",
    "l-4": "rounded-xl",
  };
  return map[radius] || "rounded-lg";
};

const shadowClass = (shadow?: string) => {
  if (!shadow) return undefined;
  const map: Record<string, string> = {
    l: "shadow-lg",
    m: "shadow-md",
    s: "shadow-sm",
  };
  return map[shadow] || "shadow-md";
};

const positionClass = (position?: string) => {
  if (!position) return undefined;
  return position === "static" ? "static" : position;
};

const justifyClass = (horizontal?: LayoutProps["horizontal"]) => {
  if (!horizontal) return undefined;
  const map: Record<string, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  };
  return map[horizontal];
};

const alignClass = (vertical?: LayoutProps["vertical"]) => {
  if (!vertical) return undefined;
  const map: Record<string, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };
  return map[vertical];
};

const applyResponsive = (
  options: ResponsiveOptions | undefined,
  prefix: keyof typeof breakpointPrefix,
  baseClasses: string[],
  baseDisplay: "flex" | "block" | "grid",
  defaultDirection?: "row" | "column",
) => {
  if (!options) return;
  const breakpoint = breakpointPrefix[prefix];

  if (options.hide) {
    const baseIndex = baseClasses.indexOf(baseDisplay);
    if (baseIndex !== -1) {
      baseClasses.splice(baseIndex, 1);
    }
    baseClasses.push("hidden", `${breakpoint}:${baseDisplay}`);
  }

  if (options.direction && defaultDirection) {
    const baseDirClass = options.direction === "column" ? "flex-col" : "flex-row";
    const defaultDirClass = defaultDirection === "column" ? "flex-col" : "flex-row";
    baseClasses.push(baseDirClass, `${breakpoint}:${defaultDirClass}`);
  }

  if (options.position) {
    const defaultPosition = baseClasses.find((cls) =>
      ["relative", "absolute", "fixed", "sticky", "static"].includes(cls),
    );
    if (defaultPosition) {
      baseClasses.splice(baseClasses.indexOf(defaultPosition), 1);
      baseClasses.push(options.position, `${breakpoint}:${defaultPosition}`);
    }
  }
};

const applyResponsiveVisibility = (
  options: ResponsiveOptions | undefined,
  prefix: keyof typeof breakpointPrefix,
  baseClasses: string[],
  baseDisplay: "flex" | "block" | "grid",
  hide?: boolean,
) => {
  if (!hide || !options || options.hide !== false) return;
  const breakpoint = breakpointPrefix[prefix];
  baseClasses.push(baseDisplay, `${breakpoint}:hidden`);
};

const applyOffsetClass = (prefix: string, value?: SpacingValue) => {
  const cssValue = pxValue(value);
  return cssValue ? `${prefix}-[${cssValue}]` : undefined;
};

const baseLayoutClasses = (props: LayoutProps) => {
  const topClass = applyOffsetClass("top", props.top);
  const topPrefix =
    props.s?.style?.top === "auto"
      ? breakpointPrefix.s
      : props.xs?.style?.top === "auto"
        ? breakpointPrefix.xs
        : props.m?.style?.top === "auto"
          ? breakpointPrefix.m
          : undefined;
  const classes = [
    props.fillWidth && "w-full",
    props.fillHeight && "h-full",
    props.fill && "w-full h-full",
    props.fitWidth && "w-fit",
    props.fitHeight && "h-fit",
    props.wrap && "flex-wrap",
    spacingClass("gap", props.gap),
    spacingClass("p", props.padding),
    spacingClass("px", props.paddingX),
    spacingClass("py", props.paddingY),
    spacingClass("pt", props.paddingTop),
    spacingClass("pb", props.paddingBottom),
    spacingClass("pl", props.paddingLeft),
    spacingClass("pr", props.paddingRight),
    spacingClass("m", props.margin),
    spacingClass("mx", props.marginX),
    spacingClass("my", props.marginY),
    spacingClass("mt", props.marginTop),
    spacingClass("mb", props.marginBottom),
    spacingClass("ml", props.marginLeft),
    spacingClass("mr", props.marginRight),
    spacingClass("max-w", props.maxWidth),
    spacingClass("min-w", props.minWidth),
    spacingClass("min-h", props.minHeight),
    spacingClass("max-h", props.maxHeight),
    spacingClass("h", props.height),
    spacingClass("w", props.width),
    radiusClass(props.radius),
    colorClass("bg", props.background),
    colorClass("text", props.onBackground),
    colorClass("border", props.border),
    props.border && "border",
    shadowClass(props.shadow),
    props.flex !== undefined && `flex-[${props.flex}]`,
    props.zIndex !== undefined && `z-[${props.zIndex}]`,
    positionClass(props.position),
    topClass && (topPrefix ? `${topPrefix}:${topClass}` : topClass),
    applyOffsetClass("bottom", props.bottom),
    applyOffsetClass("left", props.left),
    applyOffsetClass("right", props.right),
    textVariantClass(props.textVariant),
    props.center && "items-center justify-center",
  ];

  if (props.align) {
    classes.push(
      props.align === "center" ? "text-center" : props.align === "end" ? "text-right" : "text-left",
    );
  }

  return classes;
};

const baseStyle = (props: LayoutProps): CSSProperties | undefined => {
  if (!props.s?.style && !props.xs?.style && !props.m?.style) return props.style;
  return { ...props.style };
};

const renderElement = (Component: React.ElementType, props: LayoutProps, className: string) => {
  const { as, children, ...rest } = props;
  return React.createElement(
    Component,
    {
      ...rest,
      className,
    },
    children,
  );
};

export const Flex = ({ as = "div", hide, ...props }: LayoutProps) => {
  const classes = [
    "flex",
    "flex-row",
    justifyClass(props.horizontal),
    alignClass(props.vertical),
    ...baseLayoutClasses(props),
  ];

  const responsiveShow =
    props.s?.hide === false || props.m?.hide === false || props.xs?.hide === false;

  if (hide && !responsiveShow) {
    classes.push("hidden");
  }

  applyResponsive(props.s, "s", classes, "flex", "row");
  applyResponsive(props.m, "m", classes, "flex", "row");
  applyResponsive(props.xs, "xs", classes, "flex", "row");
  applyResponsiveVisibility(props.s, "s", classes, "flex", hide);
  applyResponsiveVisibility(props.m, "m", classes, "flex", hide);
  applyResponsiveVisibility(props.xs, "xs", classes, "flex", hide);

  return renderElement(as, { ...props, as, style: baseStyle(props) }, classNames(classes, props.className));
};

export const Row = ({ as = "div", hide, ...props }: LayoutProps) => {
  const classes = [
    "flex",
    "flex-row",
    justifyClass(props.horizontal),
    alignClass(props.vertical),
    ...baseLayoutClasses(props),
  ];

  const responsiveShow =
    props.s?.hide === false || props.m?.hide === false || props.xs?.hide === false;

  if (hide && !responsiveShow) {
    classes.push("hidden");
  }

  applyResponsive(props.s, "s", classes, "flex", "row");
  applyResponsive(props.m, "m", classes, "flex", "row");
  applyResponsive(props.xs, "xs", classes, "flex", "row");
  applyResponsiveVisibility(props.s, "s", classes, "flex", hide);
  applyResponsiveVisibility(props.m, "m", classes, "flex", hide);
  applyResponsiveVisibility(props.xs, "xs", classes, "flex", hide);

  return renderElement(as, { ...props, as, style: baseStyle(props) }, classNames(classes, props.className));
};

export const Column = ({ as = "div", hide, ...props }: LayoutProps) => {
  const classes = [
    "flex",
    "flex-col",
    alignClass(props.horizontal),
    justifyClass(props.vertical),
    ...baseLayoutClasses(props),
  ];

  const responsiveShow =
    props.s?.hide === false || props.m?.hide === false || props.xs?.hide === false;

  if (hide && !responsiveShow) {
    classes.push("hidden");
  }

  applyResponsive(props.s, "s", classes, "flex", "column");
  applyResponsive(props.m, "m", classes, "flex", "column");
  applyResponsive(props.xs, "xs", classes, "flex", "column");
  applyResponsiveVisibility(props.s, "s", classes, "flex", hide);
  applyResponsiveVisibility(props.m, "m", classes, "flex", hide);
  applyResponsiveVisibility(props.xs, "xs", classes, "flex", hide);

  return renderElement(as, { ...props, as, style: baseStyle(props) }, classNames(classes, props.className));
};

export const Grid = ({ as = "div", hide, ...props }: LayoutProps & { columns?: number | string }) => {
  const columns = props.columns || 1;
  const classes = [
    "grid",
    `grid-cols-[${columns}]`,
    ...baseLayoutClasses(props),
  ];

  if (props.s?.columns) {
    classes.push(`grid-cols-[${props.s.columns}]`, `md:grid-cols-[${columns}]`);
  }

  if (hide) {
    classes.push("hidden");
  }

  return renderElement(as, { ...props, as, style: baseStyle(props) }, classNames(classes, props.className));
};

export const MasonryGrid = ({ columns = 2, s, className, children }: { columns?: number; s?: ResponsiveOptions; className?: string; children?: React.ReactNode }) => {
  const baseCols = s?.columns || columns;
  const classes = [
    `columns-[${baseCols}]`,
    "gap-4",
    s?.columns ? `md:columns-[${columns}]` : null,
  ];
  return <div className={classNames(classes, className)}>{children}</div>;
};

export const Line = ({
  vert,
  maxWidth,
  maxHeight,
  height,
  width,
  background = "neutral-alpha-medium",
  className,
}: {
  vert?: boolean;
  maxWidth?: SpacingValue;
  maxHeight?: SpacingValue;
  height?: SpacingValue;
  width?: SpacingValue;
  background?: string;
  className?: string;
}) => {
  const classes = [
    vert ? "w-px" : "h-px",
    vert ? spacingClass("max-h", maxHeight) : spacingClass("max-w", maxWidth),
    height && spacingClass("h", height),
    width && spacingClass("w", width),
    colorClass("bg", background),
  ];
  return <div className={classNames(classes, className)} />;
};

export const Text = ({
  as = "p",
  variant,
  onBackground,
  wrap,
  align,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
  paddingX,
  paddingY,
  className,
  style,
  children,
  ...rest
}: TextProps) => {
  const classes = [
    textVariantClass(variant),
    colorClass("text", onBackground),
    wrap === "balance" && "text-balance",
    wrap === "nowrap" && "whitespace-nowrap",
    align === "center" && "text-center",
    align === "end" && "text-right",
    spacingClass("m", margin),
    spacingClass("mt", marginTop),
    spacingClass("mb", marginBottom),
    spacingClass("ml", marginLeft),
    spacingClass("mr", marginRight),
    spacingClass("p", padding),
    spacingClass("px", paddingX),
    spacingClass("py", paddingY),
  ];
  return React.createElement(
    as,
    { className: classNames(classes, className), style, ...rest },
    children,
  );
};

export const Heading = ({
  as = "h2",
  variant,
  onBackground,
  wrap,
  align,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
  paddingX,
  paddingY,
  className,
  style,
  children,
  ...rest
}: TextProps) => {
  const classes = [
    textVariantClass(variant),
    colorClass("text", onBackground),
    wrap === "balance" && "text-balance",
    wrap === "nowrap" && "whitespace-nowrap",
    align === "center" && "text-center",
    align === "end" && "text-right",
    spacingClass("m", margin),
    spacingClass("mt", marginTop),
    spacingClass("mb", marginBottom),
    spacingClass("ml", marginLeft),
    spacingClass("mr", marginRight),
    spacingClass("p", padding),
    spacingClass("px", paddingX),
    spacingClass("py", paddingY),
  ];
  return React.createElement(
    as,
    { className: classNames(classes, className), style, ...rest },
    children,
  );
};

export const HeadingNav = ({ className, ...props }: LayoutProps) => {
  return (
    <Column as="nav" className={classNames("sticky top-[24px]", className)} {...props} />
  );
};

export const Icon = ({
  name,
  onBackground,
  className,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
}: {
  name: IconName | string;
  onBackground?: string;
  className?: string;
  paddingLeft?: SpacingValue;
  paddingRight?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingBottom?: SpacingValue;
}) => {
  const IconComponent = iconLibrary[name as IconName];
  if (!IconComponent) return null;
  return (
    <IconComponent
      className={classNames(
        "h-5 w-5",
        colorClass("text", onBackground),
        spacingClass("pl", paddingLeft),
        spacingClass("pr", paddingRight),
        spacingClass("pt", paddingTop),
        spacingClass("pb", paddingBottom),
        className,
      )}
    />
  );
};

const renderIcon = (icon?: IconName | string, className?: string) => {
  if (!icon) return null;
  const IconComponent = iconLibrary[icon as IconName];
  if (!IconComponent) return null;
  return <IconComponent className={className} aria-hidden="true" />;
};

const sizeClasses = {
  s: "text-xs px-3 py-1.5",
  m: "text-sm px-4 py-2",
  l: "text-base px-5 py-2.5",
};

const iconButtonSizes = {
  s: "h-7 w-7",
  m: "h-8 w-8",
  l: "h-10 w-10",
  xl: "h-12 w-12",
};

const buttonVariantClasses = (variant?: ButtonVariant, selected?: boolean) => {
  switch (variant) {
    case "ghost":
      return classNames(
        "border border-transparent",
        selected && "bg-[var(--neutral-alpha-weak)]",
        "text-[color:var(--neutral-on-background-strong)]",
      );
    case "primary":
      return "bg-[color:var(--brand-solid-strong)] text-[color:var(--brand-on-solid-strong)] border border-transparent";
    case "secondary":
    default:
      return "bg-[color:var(--surface-background)] text-[color:var(--neutral-on-background-strong)] border border-[color:var(--neutral-alpha-medium)]";
  }
};

const buttonBaseClasses = "inline-flex items-center justify-center gap-2 rounded-full transition";

export const Button = ({
  href,
  prefixIcon,
  suffixIcon,
  arrowIcon,
  size = "m",
  variant = "secondary",
  label,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const content = (
    <span className="inline-flex items-center gap-2">
      {renderIcon(prefixIcon, "h-4 w-4")}
      {label || children}
      {arrowIcon ? renderIcon("arrowRight", "h-4 w-4") : renderIcon(suffixIcon, "h-4 w-4")}
    </span>
  );

  const classes = classNames(buttonBaseClasses, sizeClasses[size], buttonVariantClasses(variant), className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};

export const IconButton = ({
  href,
  icon,
  size = "m",
  variant = "secondary",
  tooltip,
  className,
  ...rest
}: IconButtonProps) => {
  const classes = classNames(
    "inline-flex items-center justify-center rounded-full",
    iconButtonSizes[size],
    buttonVariantClasses(variant),
    className,
  );
  const content = renderIcon(icon, "h-4 w-4");
  const ariaLabel = rest["aria-label"] || tooltip;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} aria-label={ariaLabel} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};

export const ToggleButton = ({
  href,
  prefixIcon,
  selected,
  label,
  className,
  children,
  ...rest
}: ToggleButtonProps) => {
  const content = (
    <span className="inline-flex items-center gap-2">
      {renderIcon(prefixIcon, "h-4 w-4")}
      {label || children}
    </span>
  );

  const classes = classNames(
    buttonBaseClasses,
    "px-3 py-1.5 text-sm",
    buttonVariantClasses("ghost", selected),
    selected && "font-semibold",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};

export const Badge = ({
  className,
  children,
  background = "brand-alpha-weak",
  onBackground = "neutral-strong",
  textVariant,
  arrow,
  paddingX,
  paddingY,
  href,
}: {
  className?: string;
  children?: React.ReactNode;
  background?: string;
  onBackground?: string;
  textVariant?: string;
  arrow?: boolean;
  paddingX?: SpacingValue;
  paddingY?: SpacingValue;
  href?: string;
}) => {
  const classes = classNames(
    "inline-flex items-center rounded-full text-xs",
    spacingClass("px", paddingX),
    spacingClass("py", paddingY),
    colorClass("bg", background),
    colorClass("text", onBackground),
    textVariantClass(textVariant),
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <span className={classes}>{children}</span>;
};

export const Tag = ({
  size = "m",
  prefixIcon,
  className,
  children,
}: {
  size?: "s" | "m" | "l";
  prefixIcon?: IconName | string;
  className?: string;
  children?: React.ReactNode;
}) => {
  const sizes = {
    s: "text-xs px-2 py-1",
    m: "text-sm px-3 py-1.5",
    l: "text-sm px-3.5 py-2",
  };
  return (
    <span
      className={classNames(
        "inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-background)] text-[color:var(--neutral-on-background-strong)] border border-[color:var(--neutral-alpha-medium)]",
        sizes[size],
        className,
      )}
    >
      {renderIcon(prefixIcon, "h-3.5 w-3.5")}
      {children}
    </span>
  );
};

export const Card = ({
  className,
  children,
  href,
  direction = "column",
  ...props
}: LayoutProps & { href?: string; direction?: "row" | "column" }) => {
  const classes = [
    "flex",
    direction === "row" ? "flex-row" : "flex-col",
    "rounded-xl border border-[color:var(--neutral-alpha-weak)] bg-[color:var(--surface-background)]",
    ...baseLayoutClasses(props),
    className,
  ];

  applyResponsive(props.s, "s", classes, "flex", direction);
  applyResponsive(props.m, "m", classes, "flex", direction);
  applyResponsive(props.xs, "xs", classes, "flex", direction);

  const resolvedClasses = classNames(classes);

  const { style, id } = props;

  if (href) {
    return (
      <Link href={href} className={resolvedClasses} style={style} id={id}>
        {children}
      </Link>
    );
  }

  return (
    <div className={resolvedClasses} {...props}>
      {children}
    </div>
  );
};

export const Avatar = ({
  src,
  size = "m",
  className,
  style,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
}: {
  src: string;
  size?: "s" | "m" | "l" | "xl";
  className?: string;
  style?: CSSProperties;
  marginLeft?: SpacingValue;
  marginRight?: SpacingValue;
  marginTop?: SpacingValue;
  marginBottom?: SpacingValue;
}) => {
  const sizes = {
    s: "h-8 w-8",
    m: "h-10 w-10",
    l: "h-12 w-12",
    xl: "h-16 w-16",
  };
  return (
    <Image
      src={src}
      alt=""
      width={64}
      height={64}
      className={classNames(
        "rounded-full object-cover",
        sizes[size],
        spacingClass("ml", marginLeft),
        spacingClass("mr", marginRight),
        spacingClass("mt", marginTop),
        spacingClass("mb", marginBottom),
        className,
      )}
      style={style}
    />
  );
};

export const AvatarGroup = ({
  avatars,
  size = "m",
  reverse,
}: {
  avatars: { src: string }[];
  size?: "s" | "m" | "l";
  reverse?: boolean;
}) => {
  const ordered = reverse ? [...avatars].reverse() : avatars;
  const sizes = {
    s: "h-7 w-7",
    m: "h-9 w-9",
    l: "h-11 w-11",
  };

  return (
    <div className="flex items-center">
      {ordered.map((avatar, index) => (
        <div
          key={`${avatar.src}-${index}`}
          className={classNames(
            "rounded-full border-2 border-[color:var(--page-background)]",
            sizes[size],
            index > 0 && "-ml-2",
          )}
        >
          <Image
            src={avatar.src}
            alt=""
            width={48}
            height={48}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export const Media = ({
  src,
  alt = "",
  sizes,
  radius,
  border,
  priority,
  cursor,
  aspectRatio,
  marginTop,
  marginBottom,
  className,
  style,
}: MediaProps) => {
  return (
    <div
      className={classNames(
        "overflow-hidden",
        radiusClass(radius),
        border && "border",
        colorClass("border", border),
        cursor === "interactive" && "cursor-pointer",
        spacingClass("mt", marginTop),
        spacingClass("mb", marginBottom),
      )}
      style={{ aspectRatio, ...style }}
    >
      <Image
        src={src}
        alt={alt}
        width={960}
        height={540}
        sizes={sizes}
        priority={priority}
        className={classNames("w-full h-full object-cover", className)}
      />
    </div>
  );
};

export const Carousel = ({
  items,
  aspectRatio = "16 / 9",
  sizes,
  priority,
}: {
  items: { slide: string; alt?: string }[];
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-[color:var(--neutral-alpha-weak)]">
      <div className="flex snap-x snap-mandatory overflow-x-auto">
        {items.map((item, index) => (
          <div
            key={`${item.slide}-${index}`}
            className="w-full shrink-0 snap-center"
            style={{ aspectRatio }}
          >
            <Image
              src={item.slide}
              alt={item.alt || ""}
              width={1200}
              height={675}
              sizes={sizes}
              priority={priority && index === 0}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Logo = ({ wordmark, size = "m" }: { wordmark: string; size?: "s" | "m" | "l" | "xl" }) => {
  const sizes = {
    s: 20,
    m: 24,
    l: 32,
    xl: 40,
  };
  const height = sizes[size] || 24;
  return <Image src={wordmark} alt="Logo" width={height * 4} height={height} priority />;
};

export const SmartLink = ({
  href,
  children,
  prefixIcon,
  suffixIcon,
  className,
  ...props
}: {
  href: string;
  children?: React.ReactNode;
  prefixIcon?: IconName | string;
  suffixIcon?: IconName | string;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const content = (
    <span className="inline-flex items-center gap-2">
      {renderIcon(prefixIcon, "h-4 w-4")}
      {children}
      {renderIcon(suffixIcon, "h-4 w-4")}
    </span>
  );
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classNames("inline-flex items-center gap-2", className)} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classNames("inline-flex items-center gap-2", className)} {...props}>
      {content}
    </a>
  );
};

export const Fade = ({
  className,
  to = "bottom",
  height,
  position,
  zIndex,
  ...props
}: LayoutProps & {
  to?: "bottom" | "top";
  height?: SpacingValue;
  position?: LayoutProps["position"];
  zIndex?: number;
}) => {
  const classes = [
    "pointer-events-none",
    positionClass(position),
    applyOffsetClass("h", height),
    zIndex !== undefined && `z-[${zIndex}]`,
    to === "top"
      ? "bg-gradient-to-t from-[color:var(--page-background)] to-transparent"
      : "bg-gradient-to-b from-[color:var(--page-background)] to-transparent",
    ...baseLayoutClasses(props),
    className,
  ];

  applyResponsive(props.s, "s", classes, "block");
  applyResponsive(props.m, "m", classes, "block");
  applyResponsive(props.xs, "xs", classes, "block");
  applyResponsiveVisibility(props.s, "s", classes, "block", props.hide);
  applyResponsiveVisibility(props.m, "m", classes, "block", props.hide);
  applyResponsiveVisibility(props.xs, "xs", classes, "block", props.hide);

  return <div className={classNames(classes)} {...props} />;
};

export const RevealFx = ({
  className,
  delay,
  translateY,
  children,
  ...props
}: LayoutProps & {
  delay?: number;
  translateY?: SpacingValue;
}) => {
  const style: CSSProperties = {
    ...(props.style || {}),
    animationDelay: delay ? `${delay}s` : undefined,
    "--reveal-translate": translateY ? pxValue(translateY) : undefined,
  } as CSSProperties;

  return (
    <div
      className={classNames(
        "reveal-fx",
        ...baseLayoutClasses(props),
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export const Background = ({
  gradient,
  dots,
  mask,
  grid,
  lines,
  className,
}: {
  gradient?: {
    display?: boolean;
    opacity?: number;
    colorStart?: string;
    colorEnd?: string;
  };
  dots?: {
    display?: boolean;
    opacity?: number;
    size?: SpacingValue;
    color?: string;
  };
  mask?: {
    cursor?: boolean;
    x?: number;
    y?: number;
    radius?: number;
  };
  grid?: {
    display?: boolean;
    opacity?: number;
    width?: string;
    height?: string;
    color?: string;
  };
  lines?: {
    display?: boolean;
    opacity?: number;
    size?: SpacingValue;
    thickness?: number;
    angle?: number;
    color?: string;
  };
  className?: string;
}) => {
  const gradientStyle = gradient?.display
    ? `linear-gradient(180deg, var(--${gradient.colorStart}), var(--${gradient.colorEnd}))`
    : undefined;
  const dotsSize = dots?.size ? pxValue(dots.size) : "4px";
  const dotColor = dots?.color ? `var(--${dots.color})` : "transparent";
  const dotsStyle = dots?.display
    ? `radial-gradient(${dotColor} 1px, transparent 1px)`
    : undefined;
  const backgroundImage = [gradientStyle, dotsStyle].filter(Boolean).join(", ");

  return (
    <div
      className={classNames("absolute inset-0 -z-10", className)}
      style={{
        backgroundImage: backgroundImage || undefined,
        backgroundSize: dots?.display ? `${dotsSize} ${dotsSize}` : undefined,
        opacity: gradient?.opacity ? gradient.opacity / 100 : undefined,
      }}
    />
  );
};

export const Spinner = () => {
  return <div className="h-6 w-6 animate-spin rounded-full border-2 border-[color:var(--neutral-alpha-medium)] border-t-transparent" />;
};

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={classNames(
        "w-full rounded-full border border-[color:var(--neutral-alpha-medium)] bg-[color:var(--surface-background)] px-4 py-2 text-sm",
        className,
      )}
      {...props}
    />
  );
};

export const PasswordInput = ({
  className,
  label,
  errorMessage,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
}) => {
  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <Input type="password" className={className} {...props} />
      {errorMessage && <p className="text-xs text-[color:var(--danger-on-background-weak)]">{errorMessage}</p>}
    </div>
  );
};

export const InlineCode = ({ children }: { children?: React.ReactNode }) => {
  return (
    <code className="rounded bg-[color:var(--neutral-alpha-weak)] px-1.5 py-0.5 font-code text-sm">
      {children}
    </code>
  );
};

export const CodeBlock = ({
  codes,
  copyButton,
}: {
  codes: { code: string; language?: string; label?: string }[];
  copyButton?: boolean;
}) => {
  const code = codes?.[0]?.code || "";
  return (
    <pre className="relative overflow-x-auto rounded-xl border border-[color:var(--neutral-alpha-weak)] bg-[color:var(--neutral-background-weak)] p-4 text-sm">
      {copyButton && (
        <button
          type="button"
          className="absolute right-3 top-3 rounded-full bg-[color:var(--surface-background)] px-2 py-1 text-xs"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          Copy
        </button>
      )}
      <code className="font-code text-[color:var(--neutral-on-background-strong)]">{code}</code>
    </pre>
  );
};

export const AccordionGroup = ({ children }: { children?: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>;
};

export const Accordion = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  return (
    <details className="rounded-lg border border-[color:var(--neutral-alpha-weak)] bg-[color:var(--surface-background)] px-4 py-2">
      <summary className="cursor-pointer font-semibold">{title}</summary>
      <div className="mt-2 text-sm text-[color:var(--neutral-on-background-weak)]">{children}</div>
    </details>
  );
};

export const Table = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
};

export const Feedback = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="rounded-xl border border-[color:var(--brand-alpha-weak)] bg-[color:var(--brand-alpha-weak)] p-4 text-sm">
      {children}
    </div>
  );
};

export const List = ({ as = "ul", children }: { as?: "ul" | "ol"; children?: React.ReactNode }) => {
  const Component = as;
  return (
    <Component className={classNames("ml-5 space-y-2", as === "ol" ? "list-decimal" : "list-disc")}>
      {children}
    </Component>
  );
};

export const ListItem = ({
  children,
  className,
  marginTop,
  marginBottom,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement> & { marginTop?: SpacingValue; marginBottom?: SpacingValue }) => {
  return (
    <li
      className={classNames(
        "text-[color:var(--neutral-on-background-weak)]",
        spacingClass("mt", marginTop),
        spacingClass("mb", marginBottom),
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
};

export const Schema = ({
  as,
  baseURL,
  path,
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  as: "webPage" | "blogPosting";
  baseURL: string;
  path: string;
  title: string;
  description: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
  author?: { name: string; url: string; image: string };
}) => {
  const schemaType = as === "blogPosting" ? "BlogPosting" : "WebPage";
  const data = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: title,
    name: title,
    description,
    url: `${baseURL}${path}`,
    image: image ? `${baseURL}${image}` : undefined,
    datePublished,
    dateModified,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: author.url,
          image: author.image,
        }
      : undefined,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
};

export const Meta = {
  generate: ({
    title,
    description,
    baseURL,
    path,
    image,
  }: {
    title: string;
    description: string;
    baseURL: string;
    path: string;
    image?: string;
  }) => {
    const url = `${baseURL}${path}`;
    const imageUrl = image ? (image.startsWith("http") ? image : `${baseURL}${image}`) : undefined;
    return {
      title,
      description,
      metadataBase: new URL(baseURL),
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        images: imageUrl ? [{ url: imageUrl }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  },
};

export { ToastProvider, useToast, ThemeProvider, useTheme } from "./hooks";
