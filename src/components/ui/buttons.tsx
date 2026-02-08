import React from "react";
import Link from "next/link";
import type { IconName } from "@/resources/icons";
import { Icon } from "./icon";
import { cn } from "./utils";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "s" | "m" | "l";
  prefixIcon?: IconName;
  suffixIcon?: IconName;
  fillWidth?: boolean;
  href?: string;
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses: Record<string, string> = {
  s: "px-3 py-1.5 text-sm",
  m: "px-4 py-2 text-sm",
  l: "px-5 py-2.5 text-base",
};

const variantClasses: Record<string, string> = {
  primary:
    "bg-[var(--brand-solid-strong)] text-[var(--brand-on-solid-strong)] border border-[var(--solid-border-color-brand)]",
  secondary:
    "bg-[var(--surface-background)] text-[var(--neutral-on-background-strong)] border border-[var(--neutral-alpha-weak)]",
  ghost: "bg-transparent text-[var(--neutral-on-background-strong)]",
};

export function Button({
  variant = "primary",
  size = "m",
  prefixIcon,
  suffixIcon,
  fillWidth,
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-m)] transition",
    sizeClasses[size],
    variantClasses[variant],
    fillWidth && "w-full",
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {prefixIcon && <Icon name={prefixIcon} className="text-current" />}
          {children}
          {suffixIcon && <Icon name={suffixIcon} className="text-current" />}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...props}>
        {prefixIcon && <Icon name={prefixIcon} className="text-current" />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} className="text-current" />}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {prefixIcon && <Icon name={prefixIcon} className="text-current" />}
      {children}
      {suffixIcon && <Icon name={suffixIcon} className="text-current" />}
    </button>
  );
}

export type IconButtonProps = Omit<ButtonProps, "children"> & {
  label?: string;
};

export function IconButton({ label, prefixIcon, className, size = "s", ...props }: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      className={className}
      size={size}
      {...props}
      prefixIcon={prefixIcon}
    />
  );
}

export type ToggleButtonProps = {
  prefixIcon?: IconName;
  label?: string;
  selected?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
};

export function ToggleButton({
  prefixIcon,
  label,
  selected,
  href,
  onClick,
  className,
  ...props
}: ToggleButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-[var(--radius-m)] px-3 py-2 text-sm transition",
    selected
      ? "bg-[var(--brand-alpha-strong)] text-[var(--brand-on-background-strong)]"
      : "text-[var(--neutral-on-background-strong)] hover:bg-[var(--neutral-alpha-weak)]",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {prefixIcon && <Icon name={prefixIcon} />}
        {label && <span>{label}</span>}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...props}>
      {prefixIcon && <Icon name={prefixIcon} />}
      {label && <span>{label}</span>}
    </button>
  );
}
