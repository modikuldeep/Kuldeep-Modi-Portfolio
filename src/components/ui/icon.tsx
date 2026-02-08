import React from "react";
import type { IconName } from "@/resources/icons";
import { iconLibrary } from "@/resources/icons";
import { cn } from "./utils";

export type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
  title?: string;
};

export function Icon({ name, className, size = 18, title }: IconProps) {
  const Component = iconLibrary[name];
  if (!Component) return null;
  return <Component className={cn("shrink-0", className)} size={size} title={title} />;
}
