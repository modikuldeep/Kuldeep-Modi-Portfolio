"use client";

import React, { JSX } from "react";
import { Heading, Flex, IconButton, useToast } from "@/components/ui";

import styles from "@/components/HeadingLink.module.scss";

interface HeadingLinkProps extends React.ComponentProps<typeof Flex> {
  id: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({
  id,
  level,
  as,
  children,
  style,
  ...props
}) => {
  const { addToast } = useToast();

  const copyURL = (id: string): void => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(
      () => {
        addToast({
          title: "Link copied to clipboard.",
        });
      },
      () => {
        addToast({
          title: "Failed to copy link.",
        });
      },
    );
  };

  const variantMap = {
    1: "display-strong-xs",
    2: "heading-strong-xl",
    3: "heading-strong-l",
    4: "heading-strong-m",
    5: "heading-strong-s",
    6: "heading-strong-xs",
  } as const;

  const resolvedLevel = level || (as ? Number(as.replace("h", "")) : 2);
  const variant = variantMap[resolvedLevel as keyof typeof variantMap];
  const asTag = (as || `h${resolvedLevel}`) as keyof JSX.IntrinsicElements;

  return (
    <Flex
      style={style}
      onClick={() => copyURL(id)}
      className={styles.control}
      vertical="center"
      gap="4"
      {...props}
    >
      <Heading className={styles.text} id={id} variant={variant} as={asTag}>
        {children}
      </Heading>
      <IconButton
        className={styles.visibility}
        size="s"
        icon="openLink"
        variant="ghost"
        tooltip="Copy"
      />
    </Flex>
  );
};
