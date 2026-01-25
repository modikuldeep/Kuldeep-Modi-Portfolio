# How to Find Button and Link Click Events in Umami Dashboard

## Where to Find Events

### Step 1: Access Your Dashboard
1. Go to https://cloud.umami.is
2. Log in to your account
3. Select your website from the list

### Step 2: Navigate to Events Section

**Option A: Via Navigation Menu**
- Look for an **"Events"** tab or button in the top navigation
- Click on it to view all custom events

**Option B: Direct URL**
- Your events page URL format: `https://cloud.umami.is/[your-website-id]/events`
- Replace `[your-website-id]` with your actual website ID: `69727e07-4cbc-4962-bb38-45096e3af218`

### Step 3: View Event Details

Once in the Events section, you'll see:

1. **Event List**: A list of all tracked events:
   - `button-click` - Button interactions
   - `link-click` - Link clicks
   - `social-click` - Social media clicks
   - `theme-toggle` - Theme changes
   - And any other custom events

2. **Event Properties**: Click on an event name to see:
   - **Count**: How many times the event occurred
   - **Properties**: Breakdown by event data (e.g., `button: "about-page"`, `location: "home"`)
   - **Timeline**: When events occurred over time

### Step 4: Filter Events

- **By Date Range**: Use the date picker at the top
- **By Property**: Click on property values to filter (e.g., filter `button-click` where `button` = `"about-page"`)
- **Search**: Use the search bar to find specific events

## Event Names You Should See

Based on your current implementation:

### Button Clicks
- **Event**: `button-click`
- **Properties**: 
  - `button`: Name of the button (e.g., "about-page")
  - `location`: Where it was clicked (e.g., "home", "header")

### Link Clicks  
- **Event**: `link-click`
- **Properties**:
  - `url`: The clicked URL
  - `text`: Link text (if available)
  - `location`: Where the link is located (e.g., "header", "footer", "page")

### Social Media Clicks
- **Event**: `social-click`
- **Properties**:
  - `platform`: Social platform (e.g., "github", "linkedin", "email", "whatsapp")

### Theme Toggle
- **Event**: `theme-toggle`
- **Properties**:
  - `theme`: Selected theme ("light" or "dark")

## Troubleshooting: Not Seeing Events?

### 1. Check Browser Console
Open DevTools (F12) → Console tab. You should see:
```
Umami event tracked: button-click {button: "about-page", location: "home"}
```

If you don't see these logs, the tracking isn't firing.

### 2. Verify Umami is Loaded
In the browser console, type:
```javascript
window.umami
```
You should see an object. If it's `undefined`, Umami hasn't loaded yet.

### 3. Check Network Requests
1. Open DevTools → Network tab
2. Filter by "umami" or "api"
3. Click a button/link
4. You should see a request to Umami's API

### 4. Wait for Processing
- Events may take 1-2 minutes to appear in the dashboard
- Refresh the dashboard after clicking buttons/links

### 5. Verify Event Names
Events are case-sensitive. Make sure you're looking for:
- `button-click` (not `ButtonClick` or `button_click`)
- `link-click` (not `LinkClick` or `link_click`)
- `social-click` (not `SocialClick`)

### 6. Check if Events are Enabled
Some Umami instances require events to be enabled. Check your Umami settings to ensure custom events are enabled.

## Testing Your Tracking

1. Open your portfolio in a browser
2. Open DevTools Console (F12)
3. Click a button or link
4. You should see: `Umami event tracked: [event-name]`
5. Wait 1-2 minutes
6. Check your Umami dashboard Events section

## Quick Test Commands

Test tracking manually in the browser console:
```javascript
// Test button click tracking
window.umami?.track('button-click', { button: 'test-button', location: 'test' });

// Test link click tracking  
window.umami?.track('link-click', { url: '/test', location: 'test' });

// Test social click tracking
window.umami?.track('social-click', { platform: 'github' });
```

If these work, you'll see the events in your dashboard within 1-2 minutes.
