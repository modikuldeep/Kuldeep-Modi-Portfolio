import React from "react";
import type { ElementType } from "react";
import {
  AlignValue,
  alignClass,
  cn,
  colorClass,
  justifyClass,
  onBackgroundClass,
  positionClass,
  radiusClass,
  shadowClass,
  sizeClass,
  spacingClass,
  textVariantClass,
  textAlignClass,
} from "./utils";

export type ResponsiveProps = {
  hide?: boolean;
  direction?: "row" | "column";
  columns?: number;
};

export type FlexProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  fillWidth?: boolean;
  fillHeight?: boolean;
  fitHeight?: boolean;
  minHeight?: string | number;
  maxHeight?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  height?: string | number;
  width?: string | number;
  gap?: string | number;
  padding?: string | number;
  paddingX?: string | number;
  paddingY?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  margin?: string | number;
  marginX?: string | number;
  marginY?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  horizontal?: AlignValue;
  vertical?: AlignValue;
  wrap?: boolean;
  direction?: "row" | "column";
  flex?: number;
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static";
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  zIndex?: number;
  background?: string;
  border?: string;
  radius?: string;
  shadow?: string;
  hide?: boolean;
  s?: ResponsiveProps;
  textVariant?: string;
  textAlign?: "left" | "center" | "right";
  onBackground?: string;
  style?: React.CSSProperties;
} & React.ComponentPropsWithoutRef<T>;

const baseFlexClasses = "flex";

function buildFlexClasses({
  direction,
  fillWidth,
  fillHeight,
  fitHeight,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
  height,
  width,
  gap,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginX,
  marginY,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  horizontal,
  vertical,
  wrap,
  flex,
  position,
  top,
  bottom,
  left,
  right,
  zIndex,
  background,
  border,
  radius,
  shadow,
  hide,
  s,
  textVariant,
  textAlign,
  onBackground,
}: FlexProps) {
  const classes = [
    baseFlexClasses,
    direction === "column" ? "flex-col" : "flex-row",
    fillWidth && "w-full",
    fillHeight && "h-full",
    fitHeight && "h-fit",
    sizeClass("h", height),
    sizeClass("w", width),
    sizeClass("min-h", minHeight),
    sizeClass("max-h", maxHeight),
    sizeClass("min-w", minWidth),
    sizeClass("max-w", maxWidth),
    spacingClass("gap", gap),
    spacingClass("p", padding),
    spacingClass("px", paddingX),
    spacingClass("py", paddingY),
    spacingClass("pt", paddingTop),
    spacingClass("pb", paddingBottom),
    spacingClass("pl", paddingLeft),
    spacingClass("pr", paddingRight),
    spacingClass("m", margin),
    spacingClass("mx", marginX),
    spacingClass("my", marginY),
    spacingClass("mt", marginTop),
    spacingClass("mb", marginBottom),
    spacingClass("ml", marginLeft),
    spacingClass("mr", marginRight),
    justifyClass(horizontal),
    alignClass(vertical),
    wrap ? "flex-wrap" : undefined,
    flex !== undefined ? `flex-[${flex}]` : undefined,
    position === "relative" ? "relative" : undefined,
    position === "absolute" ? "absolute" : undefined,
    position === "fixed" ? "fixed" : undefined,
    position === "sticky" ? "sticky" : undefined,
    position === "static" ? "static" : undefined,
    positionClass("top", top),
    positionClass("bottom", bottom),
    positionClass("left", left),
    positionClass("right", right),
    zIndex !== undefined ? `z-[${zIndex}]` : undefined,
    background ? colorClass("bg", background) : undefined,
    border ? "border" : undefined,
    border ? colorClass("border", border) : undefined,
    radiusClass(radius),
    shadowClass(shadow),
    hide ? "hidden" : undefined,
    s?.hide === true ? "s:hidden" : undefined,
    hide && s?.hide === false ? "s:flex" : undefined,
    s?.direction === "column" ? "s:flex-col" : undefined,
    s?.direction === "row" ? "s:flex-row" : undefined,
    textVariantClass(textVariant),
    textAlignClass(textAlign),
    onBackgroundClass(onBackground),
  ];

  return cn(classes);
}

export function Flex<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: FlexProps<T>) {
  const Component = as || "div";
  return (
    <Component className={cn(buildFlexClasses(props), className)} style={props.style}>
      {children}
    </Component>
  );
}

export function Row<T extends ElementType = "div">(props: FlexProps<T>) {
  return <Flex {...props} direction="row" />;
}

export function Column<T extends ElementType = "div">(props: FlexProps<T>) {
  return <Flex {...props} direction="column" />;
}

export type GridProps<T extends ElementType = "div"> = FlexProps<T> & {
  columns?: number;
};

const gridColumnClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export function Grid<T extends ElementType = "div">({ columns = 1, className, ...props }: GridProps<T>) {
  const Component = props.as || "div";
  const gridClass = gridColumnClasses[columns] ?? "grid-cols-1";
  const classes = cn(
    "grid",
    gridClass,
    spacingClass("gap", props.gap),
    props.fillWidth && "w-full",
    props.fillHeight && "h-full",
    className,
  );
  return (
    <Component className={classes} style={props.style}>
      {props.children}
    </Component>
  );
}

export type LineProps = {
  className?: string;
  vert?: boolean;
  background?: string;
  height?: string | number;
  width?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
};

export function Line({
  className,
  vert,
  background = "neutral-alpha-weak",
  height,
  width,
  maxHeight,
  maxWidth,
}: LineProps) {
  const classes = cn(
    "shrink-0",
    vert ? "w-px" : "h-px",
    colorClass("bg", background),
    sizeClass("h", height),
    sizeClass("w", width),
    sizeClass("max-h", maxHeight),
    sizeClass("max-w", maxWidth),
    className,
  );

  return <div className={classes} />;
}
