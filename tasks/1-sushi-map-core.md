---
id: 1-sushi-map-core
title: Core Sushi-First Discovery Map SPA
status: done
owner: builder
created: 2026-05-05T00:00:00Z
updated: 2026-05-05T00:00:00Z
---

## Description

Build the complete, functional Sushi-First Discovery Map single-page application (SPA) for the Visit Tampere venture. This is the primary deliverable for Cycle 1 and serves as the data validation gating layer for future directions (Sushi Trail, Day-Plan Builder).

## Acceptance Criteria

- [ ] Interactive Leaflet map displaying Tampere with zoom/pan controls
- [ ] Sushi restaurant POI layer (6 entries) with coral markers, clickable
- [ ] Attraction POI layer (10 entries) with blue markers, clickable
- [ ] Sidebar with searchable, filterable list (All / Restaurants / Attractions)
- [ ] List-to-map coordination: click list item → map pans and highlights
- [ ] Info popover on marker/list click with: name, type, address, phone (if available), URL (if available), hours, description
- [ ] Layer toggle controls (bottom-right desktop, integrated mobile)
- [ ] Mobile-first responsive design (480px / 768px breakpoints)
- [ ] Desktop sidebar (320px, always visible ≥768px)
- [ ] Mobile sidebar (collapsible from left, 280px, toggle on <768px)
- [ ] Touch-friendly interactions (44px minimum tap targets)
- [ ] No external data sources or APIs (except OSM tiles)
- [ ] No user accounts, persistence, or analytics
- [ ] Works offline once loaded (all data in local JSON)

## Scope

### Included
1. **Data layer**: `data/restaurants.json`, `data/attractions.json` (hand-curated)
2. **HTML structure**: `index.html` (semantic, no dependencies)
3. **CSS styling**: `css/styles.css` (mobile-first, responsive, warm sushi colors)
4. **JavaScript**: `js/app.js` (Leaflet integration, state management, event handling)
5. **Product spec**: `docs/sushi-first-discovery-map-design.md`
6. **Developer docs**: `README.md` (setup, customization, deployment)
7. **Kanban summary**: `KANBAN.md` (auto-generated task list)

### Deliberately Out of Scope (Cycle 1)
- Bilingual UI (English + Finnish labels)
- Real-time data feeds or restaurant APIs
- User accounts, bookmarks, or saved lists
- Advanced filtering (price, distance, ratings)
- Route planning or turn-by-turn directions
- Progressive Web App (PWA) features
- 3D/WebGL visualizations
- Recommendation algorithms
- Sushi Trail (guided itinerary)
- Day-Plan Builder (personalized daily plan)

## Implementation Notes

### Tech Stack
- **Map**: Leaflet 1.9.4 + OpenStreetMap tiles (free, no API key)
- **Frontend**: Vanilla JavaScript (no framework)
- **Styling**: Plain CSS3 with CSS custom properties (variables)
- **Data**: Static JSON files

### Key Design Decisions
1. **Marker icons**: Custom div-based Leaflet icons (CSS-styled) instead of image assets
2. **Popup overlay**: Full-screen modal (mobile) vs. inline (future desktop enhancement)
3. **State machine**: `SushiDiscoveryMap` class as single source of truth (filteredPOIs, activePOI, etc.)
4. **Color scheme**: Warm coral (#E8704A) for restaurants; contrasting blue (#2196F3) for attractions
5. **Sidebar**: CSS-based toggle on mobile (no libraries); fixed layout on desktop

### Data Schema
**Restaurants** (6 entries):
- Required: id, name, type, lat, lng, address, hours, description
- Optional: phone, url

**Attractions** (10 entries):
- Required: id, name, lat, lng, address, hours, admission, description
- Optional: url

### Responsive Breakpoints
- **Mobile (≤480px)**: Single-column, collapsible sidebar
- **Tablet (481–767px)**: Sidebar overlay, same behavior as mobile
- **Desktop (≥768px)**: Two-column fixed layout (320px sidebar + map)

## Testing Checklist

- [ ] Map loads and centers on Tampere
- [ ] Markers appear for all restaurants and attractions
- [ ] Clicking a marker shows popover with correct info
- [ ] Clicking a list item centers map and highlights popover
- [ ] Search filters by name and address correctly
- [ ] Filter buttons toggle layers correctly
- [ ] Layer checkboxes add/remove layers from map
- [ ] Sidebar opens/closes on mobile without JavaScript errors
- [ ] Mobile viewport <768px: sidebar hidden by default
- [ ] Desktop viewport ≥768px: sidebar always visible
- [ ] Touch interactions work on mobile (pinch zoom, tap)
- [ ] Popover close button (×) dismisses details
- [ ] Clicking overlay background closes popover
- [ ] No console errors or warnings
- [ ] Page works offline once loaded

## Files Created
- `index.html` (275 lines)
- `css/styles.css` (350+ lines)
- `js/app.js` (250+ lines)
- `data/restaurants.json` (6 entries)
- `data/attractions.json` (10 entries)
- `docs/sushi-first-discovery-map-design.md`
- `README.md`
- `KANBAN.md`
- `tasks/1-sushi-map-core.md` (this file)

## Assumptions

1. **Tampere has ≥6 sushi restaurants** for non-trivial map validation
2. **Interactive map + state management = "heavy JS"** per cycle brief
3. **OSM tiles and npm libraries permitted** under "no external sources" (infrastructure, not data)
4. **English-only UI acceptable** for Cycle 1 (bilingual deferred)

## What Would Invalidate This

- Tampere sushi restaurant count <4 → mission premise is niche-invalid, escalate
- OSM tiles or Leaflet unavailable → escalate for external sources ruling
- Cannot host for <$5/month → escalate for infrastructure plan
- Marker interaction model breaks on specific browsers → fix and re-test

## Handoff Notes

The map is now live and can be deployed to GitHub Pages, Netlify Free, or any static host. The next cycle can:
1. Validate restaurant/attraction data with real visitors
2. Add bilingual UI (English + Finnish)
3. Implement advanced filtering or search
4. Build Sushi Trail (guided multi-restaurant itinerary)
5. Build Day-Plan Builder (personalized daily itinerary)

All POI data is curated and stored locally; future cycles can expand counts or add seasonal data without code changes.
