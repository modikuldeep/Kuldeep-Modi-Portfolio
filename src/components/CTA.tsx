"use client";

import { Button, Column, Row, Text } from "@/components/ui";
import type { IconName } from "@/resources/icons";
import classNames from "classnames";

export interface CTAProps {
  /** Main CTA heading text */
  title: string;
  /** Optional supporting/description text */
  description?: string;
  /** Button label */
  buttonText: string;
  /** Link URL – when set, button acts as a link (internal or external) */
  href?: string;
  /** Click handler – used when href is not set */
  onClick?: () => void;
  /** Optional button variant (e.g. "primary" | "secondary") */
  variant?: "primary" | "secondary" | "ghost";
  /** Optional button size */
  size?: "s" | "m" | "l";
  /** Optional icon name for the button (e.g. "arrowRight", "arrowUpRightFromSquare") */
  buttonIcon?: IconName;
  /** Optional alignment: "center" | "start" (left) */
  align?: "center" | "start";
  /** Optional className for the wrapper */
  className?: string;
}

export function CTA({
  title,
  description,
  buttonText,
  href,
  onClick,
  variant = "primary",
  size = "m",
  buttonIcon = "arrowRight",
  align = "center",
  className,
}: CTAProps) {
  const content = (
    <Column
      as="section"
      gap="m"
      padding="l"
      radius="l"
      horizontal={align === "center" ? "center" : "start"}
      vertical={align === "center" ? "center" : "start"}
      data-border="rounded"
      className={classNames(
        "border border-[var(--brand-alpha-medium)] bg-[var(--brand-alpha-weak)]",
        className,
      )}
    >
      <Column gap="8" horizontal={align === "center" ? "center" : "start"} maxWidth="m">
        <Text as="h2" variant="heading-strong-m" onBackground="neutral-strong">
          {title}
        </Text>
        {description && (
          <Text variant="body-default-m" onBackground="neutral-weak" align={align}>
            {description}
          </Text>
        )}
      </Column>
      <Row>
        <Button
          href={href}
          onClick={onClick}
          variant={variant}
          size={size}
          suffixIcon={buttonIcon}
          type={href ? undefined : "button"}
        >
          {buttonText}
        </Button>
      </Row>
    </Column>
  );

  return content;
}
