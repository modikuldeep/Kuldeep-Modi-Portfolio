# Umami Analytics Integration

Umami analytics has been integrated into your portfolio to track user interactions and events.

## Setup

The Umami script is automatically loaded in `src/app/layout.tsx` with your website ID: `69727e07-4cbc-4962-bb38-45096e3af218`

## Available Tracking Functions

All tracking functions are available in `src/utils/analytics.ts`:

### Basic Event Tracking

```typescript
import { trackEvent } from '@/utils/analytics';

// Track a custom event
trackEvent('custom-event', {
  category: 'engagement',
  action: 'click',
  value: 1
});
```

### Pre-built Tracking Functions

#### Button Clicks
```typescript
import { trackButtonClick } from '@/utils/analytics';

trackButtonClick('contact-button', 'header');
trackButtonClick('download-resume', 'home');
```

#### Link Clicks
```typescript
import { trackLinkClick } from '@/utils/analytics';

trackLinkClick('https://example.com', 'Learn More', 'footer');
```

#### Social Media Clicks
```typescript
import { trackSocialClick } from '@/utils/analytics';

trackSocialClick('github');
trackSocialClick('linkedin');
trackSocialClick('email');
```

#### Project Views
```typescript
import { trackProjectView } from '@/utils/analytics';

trackProjectView('Sales CRM', 'sales-and-manufacturing-crm');
```

#### Blog Post Views
```typescript
import { trackBlogView } from '@/utils/analytics';

trackBlogView('Building API Abstraction Layer', 'building-unified-api-abstraction-layer');
```

#### File Downloads
```typescript
import { trackDownload } from '@/utils/analytics';

trackDownload('resume.pdf', 'pdf');
trackDownload('project-image.png', 'image');
```

#### Theme Toggle
```typescript
import { trackThemeToggle } from '@/utils/analytics';

trackThemeToggle('dark');
trackThemeToggle('light');
```

#### Email Clicks
```typescript
import { trackEmailClick } from '@/utils/analytics';

trackEmailClick('contact@example.com');
```

## Usage Examples

### In a Component

```typescript
'use client';

import { trackButtonClick } from '@/utils/analytics';
import { Button } from '@once-ui-system/core';

export function MyComponent() {
  const handleClick = () => {
    trackButtonClick('my-button', 'component-name');
    // Your other logic here
  };

  return <Button onClick={handleClick}>Click Me</Button>;
}
```

### Tracking Navigation

```typescript
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/utils/analytics';

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname, pathname);
    }
  }, [pathname]);

  return null;
}
```

## Already Implemented

The following components already have tracking enabled:

- ✅ **ThemeToggle** - Tracks theme changes
- ✅ **Footer** - Tracks social media clicks
- ✅ **Home Page** - Tracks button clicks and social clicks

## Viewing Analytics

Visit your Umami dashboard at: https://cloud.umami.is

### Where to Find Events

In your Umami dashboard, custom events (like button clicks, link clicks, etc.) are found in the **Events** section:

1. **Navigate to Events**: 
   - Click on your website in the dashboard
   - Look for the **"Events"** tab or section in the navigation
   - Or go directly to: `https://cloud.umami.is/[your-website-id]/events`

2. **View Event Details**:
   - You'll see a list of all tracked events (e.g., `button-click`, `social-click`, `theme-toggle`)
   - Click on an event name to see:
     - Event count over time
     - Event properties (like `button`, `location`, `platform`, etc.)
     - Breakdown by property values

3. **Filter Events**:
   - Use the date range picker to filter by time period
   - Click on property values to filter by specific attributes
   - Example: Filter `button-click` events where `button` equals `"about-page"`

### Event Names You'll See

Based on the current implementation, you should see these events:

- **`button-click`** - When buttons are clicked
  - Properties: `button`, `location`
  
- **`link-click`** - When links are clicked (automatically tracked)
  - Properties: `url`, `text`, `location`
  
- **`social-click`** - When social media icons are clicked
  - Properties: `platform` (github, linkedin, email, whatsapp)
  
- **`theme-toggle`** - When theme is changed
  - Properties: `theme` (light, dark)
  
- **`project-view`** - When project pages are viewed
  - Properties: `project`, `slug`
  
- **`blog-view`** - When blog posts are viewed
  - Properties: `title`, `slug`

### Troubleshooting

If you don't see events:

1. **Check Browser Console**: Open browser DevTools (F12) and check the Console tab. You should see logs like:
   ```
   Umami event tracked: button-click {button: "about-page", location: "home"}
   ```

2. **Verify Umami is Loaded**: In the console, type:
   ```javascript
   window.umami
   ```
   You should see an object with a `track` method.

3. **Check Network Tab**: In DevTools Network tab, filter by "umami" and verify requests are being sent to Umami's API.

4. **Wait a Few Minutes**: Events may take a few minutes to appear in the dashboard.

5. **Check Event Names**: Make sure you're looking for the exact event names (case-sensitive):
   - `button-click` (not `button_click` or `ButtonClick`)
   - `social-click` (not `social_click`)
   - etc.

## Adding More Tracking

To add tracking to any component:

1. Import the tracking function you need
2. Call it in your event handler
3. That's it! The event will appear in your Umami dashboard

Example:
```typescript
import { trackButtonClick } from '@/utils/analytics';

<Button onClick={() => trackButtonClick('contact', 'header')}>
  Contact Me
</Button>
```
