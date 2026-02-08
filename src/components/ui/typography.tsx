import React from "react";
import type { ElementType } from "react";
import { cn, onBackgroundClass, spacingClass, textAlignClass, textVariantClass } from "./utils";

export type TextProps<T extends ElementType = "p"> = {
  as?: T;
  variant?: string;
  onBackground?: string;
  align?: "left" | "center" | "right";
  wrap?: "balance" | "pretty";
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  className?: string;
  style?: React.CSSProperties;
} & React.ComponentPropsWithoutRef<T>;

export function Text<T extends ElementType = "p">({
  as,
  variant,
  onBackground,
  align,
  wrap,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  className,
  style,
  children,
  ...props
}: TextProps<T>) {
  const Component = as || "p";
  return (
    <Component
      {...props}
      className={cn(
        textVariantClass(variant),
        onBackgroundClass(onBackground),
        textAlignClass(align),
        wrap === "balance" ? "text-balance" : undefined,
        wrap === "pretty" ? "text-pretty" : undefined,
        spacingClass("mt", marginTop),
        spacingClass("mb", marginBottom),
        spacingClass("ml", marginLeft),
        spacingClass("mr", marginRight),
        className,
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

export type HeadingProps<T extends ElementType = "h2"> = TextProps<T> & {
  wrap?: "balance" | "pretty";
};

export function Heading<T extends ElementType = "h2">(props: HeadingProps<T>) {
  return <Text {...props} as={props.as || "h2"} />;
}
