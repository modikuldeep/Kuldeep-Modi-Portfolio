"use client";

import { useEffect } from "react";
import { captureRefParamsFromUrl, trackLinkClick } from "@/utils/analytics";

/**
 * Component to automatically track link clicks using Umami data attributes
 * and also programmatically track clicks for links without data attributes.
 * Also captures ref/UTM params from the URL (e.g. ?ref=ref_place) and sends to Umami.
 */
export function LinkTracker() {
  // Capture ref and UTM params from URL on load (e.g. ?ref=ref_place)
  useEffect(() => {
    captureRefParamsFromUrl();
  }, []);

  useEffect(() => {
    // Track clicks on links with data-umami-event attribute
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link) {
        const href = link.getAttribute("href");
        const umamiEvent = link.getAttribute("data-umami-event");
        
        // If link has data-umami-event, Umami will track it automatically
        // But we can also track it programmatically for consistency
        if (href && !href.startsWith("#") && !href.startsWith("javascript:")) {
          const linkText = link.textContent?.trim() || "";
          const location = link.closest("header") 
            ? "header" 
            : link.closest("footer")
            ? "footer"
            : "page";
          
          // Only track if not already tracked by Umami data attribute
          if (!umamiEvent) {
            trackLinkClick(href, linkText, location);
          }
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return null;
}
