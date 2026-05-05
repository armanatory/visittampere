# Sushi-First Discovery Map — Product Specification

## Overview

The Sushi-First Discovery Map is a single-page application (SPA) that centers sushi restaurants as the primary point-of-interest (POI) layer and complements them with Tampere attractions as a secondary contextual layer. It is designed for sushi-loving tourists seeking to explore dining options and nearby attractions in Tampere.

### Key Design Philosophy

- **Map-centric interaction model**: The map is the primary UI element; the sidebar provides filterable search and list-based navigation
- **Mobile-first responsive design**: Optimized for touch interactions; sidebar collapses on mobile, layers remain accessible
- **No external data feeds**: All POI data is hand-curated and stored locally as JSON
- **Warm, appetizing color scheme**: Sushi restaurants use coral/salmon tones; attractions use contrasting blue tones

## Interaction Model

### Map Layer

The map displays two overlaid POI layers:

1. **Sushi Restaurants** (primary): Displayed with warm coral markers (#E8704A), larger visual weight (32px)
2. **Attractions** (secondary): Displayed with blue markers (#2196F3), slightly smaller (28px)

**User interactions:**
- Click any marker to open a detailed info popover
- Pan and zoom freely (standard Leaflet controls)
- Toggle layer visibility via checkboxes (map-controls panel, bottom-right on desktop, integrated on mobile)
- On map click, sidebar item highlights; POI details appear in a fullscreen overlay (mobile) or inline (future enhancement)

### Sidebar / List Panel

**Desktop (≥768px):**
- Fixed 320px width, left side, always visible
- Search box filters by name and address
- Filter buttons: All, Restaurants, Attractions
- Scrollable list of matching POIs
- Click list item → map pans to POI, marker highlights

**Mobile (<768px):**
- Collapsible slide-out panel from left edge (280px width)
- Toggle button (×) in header
- Same search and filter controls
- Sidebar collapses on POI selection
- Full width of viewport when open

### Info Popover

Triggered by clicking a marker or list item:

**Content:**
- POI name and type/category badge
- Address
- Phone (if available, clickable tel: link)
- Website URL (if available, opens in new tab)
- Hours of operation
- Brief description (text)

**Styling:**
- Restaurants: Coral badge with restaurant-specific label (e.g., "Sushi Bar", "Japanese Restaurant")
- Attractions: Blue badge with admission status (e.g., "Free Admission", "Paid Admission")

**Dismissal:**
- Click overlay background
- Click × button
- Mobile: Sidebar close also closes popover

## Data Schema

### Restaurant POI

```json
{
  "id": "r001",
  "name": "Kaski",
  "type": "Sushi & Modern",
  "lat": 61.4952,
  "lng": 23.7631,
  "address": "Kalevantie 30, Tampere",
  "phone": "+358 3 212 3232",
  "url": "https://www.kaski.fi",
  "hours": "Tue-Thu 11:00-22:00, Fri-Sat 11:00-23:00, Sun 12:00-21:00",
  "description": "Upscale Finnish restaurant with sushi offerings and Nordic fusion cuisine"
}
```

### Attraction POI

```json
{
  "id": "a001",
  "name": "Moomin Museum",
  "lat": 61.5042,
  "lng": 23.7512,
  "address": "Yliopistonkatu 55, Tampere",
  "url": "https://www.moomin.com/en/moomin-museum",
  "hours": "Daily 10:00-18:00 (vary by season)",
  "admission": "paid",
  "description": "Interactive museum dedicated to the beloved Moomin characters and their creator Tove Jansson"
}
```

**Required fields:**
- `id`: Unique identifier (string, e.g., "r001" for restaurants, "a001" for attractions)
- `name`: POI name (string)
- `lat`, `lng`: WGS84 coordinates (numbers)
- `address`: Human-readable address (string)
- `hours`: Operating hours summary (string)
- `description`: Brief description for popover (string, 150–250 chars recommended)

**Optional fields:**
- `phone`: Phone number with country code (restaurants)
- `url`: Website URL (all POIs)
- `type`: Restaurant cuisine/style (restaurants only)
- `admission`: "free" or "paid" (attractions only)

## Color Scheme & Styling

### Restaurant POI
- **Primary color**: `#E8704A` (warm coral/salmon) — appetizing, sushi-themed
- **Light variant**: `#F5A17A`
- **Marker size**: 32px diameter
- **Visual weight**: Primary (larger, first draw order)

### Attraction POI
- **Primary color**: `#2196F3` (medium blue)
- **Light variant**: `#64B5F6`
- **Marker size**: 28px diameter
- **Visual weight**: Secondary (smaller, below restaurants)

### Background & UI
- **Light background**: `#FAFAFA`
- **White (cards/panels)**: `#FFFFFF`
- **Text primary**: `#212121`
- **Text secondary**: `#666666`
- **Border color**: `#E0E0E0`
- **Shadows**: Subtle (2–4px offset, ~10–15% opacity)

## Responsive Breakpoints

### Mobile (≤480px)
- Single-column layout: map fullscreen with collapsible sidebar overlay
- Header: 1.1rem title, 0.75rem subtitle
- Sidebar width: 75% of viewport
- Touch-friendly button sizing (minimum 44px tap target)
- Simplified map controls (stacked layout)

### Tablet (481px–767px)
- Sidebar overlay from left, 280px width
- Same behavior as mobile

### Desktop (≥768px)
- Two-column layout: 320px sidebar + map
- Sidebar always visible
- Header: 2rem title, 1rem subtitle
- Map controls positioned bottom-right
- Hover states on interactive elements

## Known Constraints

1. **No real-time data**: POI data is hand-curated and does not update from external sources
2. **Static POI set**: Cycle 1 ships with ~6 restaurants and ~10 attractions (curated manually)
3. **No user accounts or persistence**: No login, no saved lists, no user data
4. **No external APIs**: Uses only OSM tiles (free tier) and Leaflet JS library
5. **No analytics or tracking**: Respects privacy; no external telemetry
6. **Single language fallback**: Currently English text with Finnish attribute names; bilingual UI deferred to future cycle
7. **Markers only**: No info windows on the map itself; all POI details shown in overlay

## Technology Stack

- **Map library**: Leaflet 1.9.4 (open-source, no API key required)
- **Tile provider**: OpenStreetMap (free, no rate limits for web)
- **Frontend**: Vanilla JavaScript (no framework)
- **Styling**: Plain CSS3 with CSS variables
- **Data**: Local JSON files (restaurants.json, attractions.json)
- **Hosting**: Static site (GitHub Pages, Netlify Free, or similar)

## Future Enhancements (Out of Scope for Cycle 1)

- [ ] Bilingual UI (English + Finnish)
- [ ] Real-time hours/status updates
- [ ] User ratings or reviews
- [ ] Advanced filtering (price range, cuisine type, distance)
- [ ] Route planning and turn-by-turn directions
- [ ] Save/bookmark functionality
- [ ] Progressive Web App features
- [ ] Sushi Trail (guided multi-restaurant itinerary)
- [ ] Day-Plan Builder (personalized daily itinerary)
