import React from "react";
import Link from "next/link";
import type { IconName } from "@/resources/icons";
import { Icon } from "./icon";
import { cn } from "./utils";

export type SmartLinkProps = {
  href: string;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function SmartLink({
  href,
  prefixIcon,
  suffixIcon,
  className,
  children,
  target,
  rel,
  ...props
}: SmartLinkProps) {
  const content = (
    <span className="inline-flex items-center gap-2">
      {prefixIcon && <Icon name={prefixIcon} />}
      {children}
      {suffixIcon && <Icon name={suffixIcon} />}
    </span>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cn("text-[var(--brand-on-background-strong)]", className)}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={target ?? "_blank"}
      rel={rel ?? "noopener noreferrer"}
      className={cn("text-[var(--brand-on-background-strong)]", className)}
      {...props}
    >
      {content}
    </a>
  );
}
