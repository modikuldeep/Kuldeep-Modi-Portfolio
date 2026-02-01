/**
 * Umami Analytics Utility
 * 
 * Helper functions for tracking events with Umami analytics
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number>) => void;
    };
  }
}

/**
 * Wait for Umami to be ready before tracking
 */
function waitForUmami(callback: () => void, maxAttempts = 50): void {
  if (typeof window === 'undefined') return;

  if (window.umami) {
    callback();
    return;
  }

  let attempts = 0;
  const checkInterval = setInterval(() => {
    attempts++;
    if (window.umami) {
      clearInterval(checkInterval);
      callback();
    } else if (attempts >= maxAttempts) {
      clearInterval(checkInterval);
      console.warn('Umami not loaded after maximum attempts');
    }
  }, 100);
}

/**
 * Track a custom event with Umami
 * @param eventName - Name of the event (e.g., 'button-click', 'download-file')
 * @param eventData - Optional data to attach to the event
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number>
): void {
  if (typeof window === 'undefined') return;

  waitForUmami(() => {
    if (window.umami) {
      try {
        window.umami.track(eventName, eventData);
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Umami event tracked:', eventName, eventData);
        }
      } catch (error) {
        console.error('Error tracking Umami event:', error);
      }
    }
  });
}

/**
 * Track button clicks
 * @param buttonName - Name/identifier of the button
 * @param location - Where the button is located (e.g., 'header', 'footer', 'home-page')
 */
export function trackButtonClick(buttonName: string, location?: string): void {
  trackEvent('button-click', {
    button: buttonName,
    ...(location && { location }),
  });
}

/**
 * Track link clicks
 * @param linkUrl - URL of the link
 * @param linkText - Text of the link
 * @param location - Where the link is located
 */
export function trackLinkClick(
  linkUrl: string,
  linkText?: string,
  location?: string
): void {
  trackEvent('link-click', {
    url: linkUrl,
    ...(linkText && { text: linkText }),
    ...(location && { location }),
  });
}

/**
 * Track social media clicks
 * @param platform - Social media platform (e.g., 'github', 'linkedin', 'email')
 */
export function trackSocialClick(platform: string): void {
  trackEvent('social-click', {
    platform,
  });
}

/**
 * Track project views
 * @param projectName - Name of the project
 * @param projectSlug - Slug/URL of the project
 */
export function trackProjectView(projectName: string, projectSlug: string): void {
  trackEvent('project-view', {
    project: projectName,
    slug: projectSlug,
  });
}

/**
 * Track blog post views
 * @param postTitle - Title of the blog post
 * @param postSlug - Slug/URL of the blog post
 */
export function trackBlogView(postTitle: string, postSlug: string): void {
  trackEvent('blog-view', {
    title: postTitle,
    slug: postSlug,
  });
}

/**
 * Track form submissions
 * @param formName - Name/identifier of the form
 * @param success - Whether the submission was successful
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent('form-submit', {
    form: formName,
    success: success ? 1 : 0,
  });
}

/**
 * Track file downloads
 * @param fileName - Name of the file
 * @param fileType - Type of file (e.g., 'pdf', 'image', 'resume')
 */
export function trackDownload(fileName: string, fileType?: string): void {
  trackEvent('file-download', {
    file: fileName,
    ...(fileType && { type: fileType }),
  });
}

/**
 * Track page navigation
 * @param pageName - Name of the page
 * @param pagePath - Path/URL of the page
 */
export function trackPageView(pageName: string, pagePath: string): void {
  trackEvent('page-view', {
    page: pageName,
    path: pagePath,
  });
}

/**
 * Track email clicks
 * @param emailAddress - Email address (can be masked for privacy)
 */
export function trackEmailClick(emailAddress?: string): void {
  trackEvent('email-click', {
    ...(emailAddress && { email: emailAddress }),
  });
}

/**
 * Track theme toggle
 * @param theme - Theme selected ('light' | 'dark' | 'system')
 */
export function trackThemeToggle(theme: string): void {
  trackEvent('theme-toggle', {
    theme,
  });
}

/** Query param names to capture as referral/attribution (e.g. ?ref=ref_place) */
const REF_PARAM_KEYS = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/**
 * Read ref and UTM params from the current URL (client-side only).
 * @returns Object with present params only (e.g. { ref: 'ref_place' })
 */
export function getRefParamsFromUrl(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  for (const key of REF_PARAM_KEYS) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  return result;
}

/**
 * Capture ref (and optional UTM) params from the URL and send to Umami as a single event.
 * Call once on app load (e.g. in a layout client component) so landings like ?ref=ref_place are tracked.
 */
export function captureRefParamsFromUrl(): void {
  if (typeof window === 'undefined') return;
  const refParams = getRefParamsFromUrl();
  if (Object.keys(refParams).length === 0) return;
  trackEvent('ref-landing', refParams);
}
