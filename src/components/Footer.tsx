"use client";

import { person, social } from "@/resources";
import { trackSocialClick } from "@/utils/analytics";
import { IconButton, Row, Text } from "@once-ui-system/core";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform: string) => {
    trackSocialClick(platform.toLowerCase());
  };

  return (
    <Row 
      as="footer" 
      fillWidth 
      padding="8" 
      horizontal="center" 
      s={{ direction: "column" }}
      style={{ 
        minHeight: "159px",
        // Prevent layout shifts by reserving space for all content
        containIntrinsicSize: "auto 159px"
      }}
    >
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
        style={{
          // Ensure content doesn't shift when loading
          minHeight: "103px"
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
        </Text>
        <Row gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                  onClick={() => handleSocialClick(item.name)}
                />
              ),
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
