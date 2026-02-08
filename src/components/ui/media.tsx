import React from "react";
import Image from "next/image";
import { cn, radiusClass, spacingClass } from "./utils";

export type MediaProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  radius?: string;
  sizes?: string;
  priority?: boolean;
  enlarge?: boolean;
  className?: string;
  border?: string;
  marginTop?: string | number;
  marginBottom?: string | number;
};

export function Media({
  src,
  alt,
  aspectRatio,
  radius,
  sizes,
  priority,
  className,
  border,
  marginTop,
  marginBottom,
}: MediaProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        radiusClass(radius),
        border ? "border" : undefined,
        border ? `border-[var(--${border})]` : undefined,
        spacingClass("mt", marginTop),
        spacingClass("mb", marginBottom),
        className,
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

export type AvatarProps = {
  src: string;
  alt?: string;
  size?: "s" | "m" | "l" | "xl";
  className?: string;
};

const avatarSizes: Record<string, string> = {
  s: "h-8 w-8",
  m: "h-10 w-10",
  l: "h-12 w-12",
  xl: "h-16 w-16",
};

export function Avatar({ src, alt = "Avatar", size = "m", className }: AvatarProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-full", avatarSizes[size], className)}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

export type AvatarGroupProps = {
  avatars: { src: string }[];
  size?: "s" | "m" | "l";
  reverse?: boolean;
};

export function AvatarGroup({ avatars, size = "m", reverse }: AvatarGroupProps) {
  return (
    <div className={cn("flex -space-x-2", reverse && "flex-row-reverse space-x-reverse")}
    >
      {avatars.map((avatar, index) => (
        <Avatar key={`${avatar.src}-${index}`} src={avatar.src} size={size} />
      ))}
    </div>
  );
}

export type CarouselProps = {
  items: { slide: string; alt: string }[];
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
};

export function Carousel({ items, aspectRatio = "16 / 9", sizes, priority }: CarouselProps) {
  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto">
      {items.map((item, index) => (
        <div key={item.slide} className="min-w-full snap-center">
          <Media
            src={item.slide}
            alt={item.alt}
            aspectRatio={aspectRatio}
            sizes={sizes}
            priority={priority && index === 0}
            radius="m"
          />
        </div>
      ))}
    </div>
  );
}

export type MasonryGridProps = {
  columns?: number;
  s?: { columns?: number };
  children: React.ReactNode;
};

export function MasonryGrid({ columns = 2, s, children }: MasonryGridProps) {
  const columnClass = columns === 2 ? "columns-2" : "columns-1";
  const smallColumns = s?.columns === 1 ? "s:columns-1" : undefined;
  return <div className={cn(columnClass, smallColumns, "gap-6")}>{children}</div>;
}
