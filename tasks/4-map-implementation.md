---
id: 4-map-implementation
title: Map Implementation & Interactivity
status: done
owner: builder
created: 2026-05-05T00:00:00Z
updated: 2026-05-05T00:00:00Z
---

## Description

Implement the core map interface using Leaflet, including POI layers, marker interactions, layer toggling, and list-to-map coordination. This handles all geographic and interactive features of the discovery map.

## Acceptance Criteria

- [ ] Leaflet map initializes centered on Tampere (61.4973, 23.7619) with zoom level 13
- [ ] OpenStreetMap tiles load without errors
- [ ] Restaurant POI layer with coral markers (32px, distinct visual weight)
- [ ] Attraction POI layer with blue markers (28px, secondary visual weight)
- [ ] All 6 restaurants rendered as markers on map
- [ ] All 10 attractions rendered as markers on map
- [ ] Clicking a marker opens info popover with POI details
- [ ] Clicking a list item pans map to POI (animate: true) and highlights marker
- [ ] Layer checkboxes toggle restaurant and attraction layers independently
- [ ] Search filters list and map markers show/hide based on filter
- [ ] Markers have hover effects (scale up, cursor: pointer)
- [ ] POI list highlights active (selected) item with background color
- [ ] Sidebar and map coordinate state (activePOI, filteredPOIs)
- [ ] State persists across layer toggles and sidebar operations
- [ ] Mobile: sidebar closes after POI selection
- [ ] No console errors or missing tile requests

## Map Initialization

```javascript
// Center: Tampere city center
const center = [61.4973, 23.7619];
const initialZoom = 13;

// Tile layer: OSM (free, no API key)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19,
  minZoom: 11
}).addTo(map);
```

## Marker Creation

### Restaurant Marker
- Icon: Custom div-based (no image asset)
- Size: 32px × 32px
- Color: #E8704A (coral)
- Border: 2px white
- Anchor point: center
- Popup anchor: center-top

### Attraction Marker
- Icon: Custom div-based
- Size: 28px × 28px
- Color: #2196F3 (blue)
- Border: 2px white
- Anchor point: center
- Popup anchor: center-top

Both markers styled with CSS classes (`.poi-marker.restaurant`, `.poi-marker.attraction`) for consistency with overall design.

## Layer Management

**FeatureGroup approach:**
- `markerLayers.restaurants` — FeatureGroup for all restaurant markers
- `markerLayers.attractions` — FeatureGroup for all attraction markers
- Both added to map by default
- Removed/added on layer checkbox toggle

**State syncing:**
- Layer checkbox state in `js/app.js`: `document.getElementById('layer-restaurants').checked`
- Toggle event listener removes/adds layer from map
- No re-fetch; layers persist in memory

## List-to-Map Coordination

**Flow:**
1. User clicks list item → calls `highlightPOI(poiId)`
2. `highlightPOI()` sets `activePOI`, finds marker, pans map
3. `map.setView([lat, lng], 15, {animate: true})` centers POI
4. POI details shown in popover via `showPOIDetails()`
5. List re-renders with `.active` class on selected item
6. Mobile: sidebar collapses after selection

## Search & Filter Logic

**`applyFilters()`:**
- Filter by `currentFilter` (all / restaurants / attractions)
- Filter by search term (name, address match)
- Update `filteredPOIs` array
- Call `renderPOIList()` to update sidebar
- Markers remain on map (layer visibility separate concern)

**`currentFilter` values:**
- "all" — show all POIs
- "restaurants" — show only restaurants
- "attractions" — show only attractions

**Search term:**
- Case-insensitive substring match
- Matches against `name` and `address` fields
- Applied independently of `currentFilter`

## State Machine

**Key state variables:**
- `restaurants[]` — all restaurant data (loaded from JSON)
- `attractions[]` — all attraction data (loaded from JSON)
- `allPOIs[]` — combined array (restaurants + attractions)
- `filteredPOIs[]` — subset matching search + filter criteria
- `currentFilter` — "all" | "restaurants" | "attractions"
- `searchTerm` — user input (lowercased)
- `activePOI` — currently selected POI object (null if none)
- `markerLayers` — Leaflet FeatureGroup objects (keyed by type)
- `markers` — Map objects storing references to Leaflet markers (keyed by id)

## Event Handlers

**Marker click:**
- Calls `showPOIDetails(poi)` (displays popover)
- Calls `highlightPOI(poi.id)` (updates list, pans map)

**List item click:**
- Same as marker click

**Search input:**
- Updates `searchTerm`
- Calls `applyFilters()`

**Filter button click:**
- Updates `currentFilter`
- Calls `applyFilters()`

**Layer checkbox:**
- Toggle: calls `markerLayers[type].remove()` or `.addTo(map)`
- State persists in checkbox element (not in app state)

**Popover close:**
- Calls `closePOIDetails()`
- Sets `activePOI = null`
- Re-renders list (removes `.active` class)

## Data Loading

**`loadData()`:**
- Fetches `data/restaurants.json` and `data/attractions.json` via fetch API
- Adds `type_category` field to each POI (for filtering)
- Combines into `allPOIs[]`
- Runs in parallel with Promise.all()
- Error handling: logs to console (non-blocking)

## Files

- `js/app.js` (single file, ~250 lines)

## Implementation Notes

- Vanilla JavaScript (no jQuery, no framework)
- Fetch API for data loading (ES6+, widely supported)
- Event delegation not needed (handlers attached to specific elements)
- No external state management library (single class manages all state)
- Map instance stored as `this.map` for access across methods

## Testing Checklist

- [ ] Map loads and centers on Tampere
- [ ] All 6 restaurant markers visible and clickable
- [ ] All 10 attraction markers visible and clickable
- [ ] Clicking marker shows correct POI details
- [ ] Clicking list item pans map to correct location
- [ ] Search filters list and shows matching POIs only
- [ ] Filter buttons toggle POI visibility correctly
- [ ] Layer checkboxes add/remove layers correctly
- [ ] Sidebar scrolls when list exceeds viewport height
- [ ] List highlights active POI with background color
- [ ] Popover closes on × button click
- [ ] Popover closes on overlay click
- [ ] Mobile: sidebar collapses after POI selection
- [ ] No JavaScript errors in console
- [ ] Markers visible at all zoom levels (11–19)
- [ ] Map zoom/pan works on desktop and mobile

## Constraints

- No Google Maps API (use OSM + Leaflet only)
- No third-party libraries except Leaflet
- No real-time data updates
- No marker clustering (POI count too small)
- No routing or navigation (deferred to future)
