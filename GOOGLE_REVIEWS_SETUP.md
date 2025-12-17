# Google Reviews Integration - Setup Guide

## Overview

Your website now fetches the 3 most recent Google reviews dynamically instead of using hardcoded testimonials.

## What's Been Changed

### 1. New File: `google-reviews.js`

This file handles fetching and displaying Google reviews with:

- Google Places API integration
- Fallback reviews if API fails
- Loading state management
- Automatic time formatting (منذ X أيام)
- Star rating display

### 2. Updated: `esnnad legal web page.html`

- Added Google Maps JavaScript API script
- Included `google-reviews.js` script
- Replaced hardcoded testimonials with dynamic container (`id="testimonials-container"`)

## Setup Instructions

### Step 1: Get Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Places API"
4. Go to "Credentials" and create an API key
5. **IMPORTANT:** Restrict the API key to prevent abuse:
   - **Application restrictions:** HTTP referrers
     - Add your domain: `yourdomain.com/*`
     - Add localhost for testing: `localhost/*`, `127.0.0.1/*`
   - **API restrictions:** Restrict key to "Places API" only
   - **Set quotas:** Limit requests per day (e.g., 1000/day)

### Step 2: Get Your Google Place ID

1. Go to [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search for your business: "إسناد للاستشارات القانونية والإدارية"
3. Copy the Place ID (format: ChIJ...)

### Step 3: Update Configuration

#### In `esnnad legal web page.html` (line ~1148):

Replace `YOUR_API_KEY` with your actual API key:

```html
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places"
  async
  defer
></script>
```

#### In `google-reviews.js` (lines 6-7):

Replace the placeholder values:

```javascript
const GOOGLE_CONFIG = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  placeId: "YOUR_ACTUAL_PLACE_ID",
};
```

## Features

### ✅ What It Does

- Fetches 3 most recent Google reviews automatically
- Displays star ratings (⭐⭐⭐⭐⭐)
- Shows relative time (منذ 30 يوم)
- Shows reviewer name and profile initials
- Loading spinner while fetching
- Fallback to hardcoded reviews if API fails
- Smooth animations with AOS

### 🔒 Security for Frontend API Keys

**Frontend API keys are visible to users** - this is acceptable IF properly restricted:

✅ **DO THIS:**

1. Apply strict HTTP referrer restrictions in Google Cloud Console
2. Restrict to Places API only (not all Google APIs)
3. Set daily quota limits to prevent abuse
4. Monitor usage in Google Cloud Console
