# Visit Tampere — Sushi-First Discovery Map

A single-page application (SPA) that helps sushi-loving tourists discover sushi restaurants and attractions in Tampere, Finland.

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development; some browsers block local file access)

### Installation

1. Clone or download this repository
2. Start a local web server:
   - **Python 3**: `python -m http.server 8000`
   - **Python 2**: `python -m SimpleHTTPServer 8000`
   - **Node.js (http-server)**: `npx http-server`
   - **PHP**: `php -S localhost:8000`

3. Open your browser to `http://localhost:8000`

## Project Structure

```
.
├── index.html                  # Main HTML entry point
├── css/
│   └── styles.css              # Responsive CSS (mobile-first)
├── js/
│   └── app.js                  # Main SPA logic (Leaflet map, state management)
├── data/
│   ├── restaurants.json        # Sushi restaurant POIs (~6 entries)
│   └── attractions.json        # Tampere attractions (~10 entries)
├── docs/
│   └── sushi-first-discovery-map-design.md  # Detailed product spec
├── README.md                   # This file
└── KANBAN.md                   # Task status summary
```

## Features

### Map Interface
- Interactive map centered on Tampere (OpenStreetMap + Leaflet)
- Click markers to view POI details in a popover
- Pan and zoom controls (standard Leaflet)
- Toggle restaurant and attraction layers independently

### Sidebar (List View)
- **Desktop** (≥768px): Fixed 320px sidebar, always visible
- **Mobile** (<768px): Collapsible slide-out from left edge
- Search by POI name or address
- Filter: All, Restaurants only, Attractions only
- Click list items to navigate map and view details

### Info Popover
- POI name, type/category
- Address (clickable, reveals location)
- Phone number (if available; clickable tel: link)
- Website URL (if available; opens in new tab)
- Hours of operation
- Brief description

### Responsive Design
- **Mobile-first**: optimized for phones and tablets
- **Desktop**: two-column layout (sidebar + map)
- Touch-friendly interactions
- Adaptive font sizes and button targets

## Data Format

### Adding / Editing POIs

**Restaurants** (`data/restaurants.json`):
```json
{
  "id": "r001",
  "name": "Restaurant Name",
  "type": "Cuisine Type (e.g., Sushi Bar)",
  "lat": 61.4973,
  "lng": 23.7619,
  "address": "Street Address, Tampere",
  "phone": "+358 3 XXX XXXX",
  "url": "https://example.com",
  "hours": "Mon-Sun HH:MM-HH:MM",
  "description": "Brief description (150-250 chars)"
}
```

**Attractions** (`data/attractions.json`):
```json
{
  "id": "a001",
  "name": "Attraction Name",
  "lat": 61.4973,
  "lng": 23.7619,
  "address": "Street Address, Tampere",
  "url": "https://example.com",
  "hours": "Mon-Sun HH:MM-HH:MM",
  "admission": "free" or "paid",
  "description": "Brief description (150-250 chars)"
}
```

## Styling & Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
--primary-sushi: #E8704A;           /* Restaurant marker color */
--secondary-attraction: #2196F3;    /* Attraction marker color */
--text-primary: #212121;
--bg-white: #FFFFFF;
```

### Map Center & Zoom
Edit `js/app.js`, line ~50:
```javascript
this.map = L.map('map').setView([61.4973, 23.7619], 13);
//                              latitude, longitude,  zoom level
```

### Default Map Tiles
The map uses OpenStreetMap tiles (free, no API key). To use a different tile provider, edit `js/app.js`, line ~54.

## Constraints (Cycle 1)

- **No real-time data**: POI data is static; hand-curated updates only
- **No external APIs**: OSM tiles and Leaflet JS only
- **No user accounts**: Stateless, no persistence
- **No analytics**: Privacy-first; no external telemetry
- **No PWA features**: Progressive Web App functionality deferred
- **Limited POI set**: ~6 restaurants + ~10 attractions (sufficient for MVP validation)

## Deployment

### GitHub Pages
1. Fork or push this repo to GitHub
2. Enable GitHub Pages in repo settings (main branch / root directory)
3. Access at `https://<username>.github.io/<repo-name>`

### Netlify (Free Tier)
1. Drag-and-drop folder to [netlify.com/drop](https://netlify.com/drop)
2. Instant deployment; custom domain available

### Self-Hosted
1. Upload files to web server via FTP or Git
2. Ensure CORS headers allow tile requests (usually automatic for static hosts)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

## Future Enhancements

See `docs/sushi-first-discovery-map-design.md` for planned features:
- Bilingual UI (English + Finnish)
- Advanced filtering (price, distance, rating)
- Sushi Trail (guided multi-restaurant itinerary)
- Day-Plan Builder (personalized daily itinerary)

## Development Notes

### State Management
The `SushiDiscoveryMap` class in `js/app.js` manages all state:
- `filteredPOIs`: Current list view (respects search + filter)
- `activePOI`: Currently selected POI (highlights in list, centers map)
- `isSidebarOpen`: Mobile sidebar visibility
- `currentFilter` / `searchTerm`: Filter and search state

### Event Flow
1. User clicks marker or list item → `highlightPOI()`
2. `highlightPOI()` sets `activePOI`, calls `showPOIDetails()`, updates list
3. Filter/search changes → `applyFilters()`, re-renders list
4. Layer toggle → adds/removes marker layer group from map

## Troubleshooting

**Map not loading?**
- Ensure you're serving files over HTTP (not file://)
- Check browser console for CORS errors
- Verify tile server is accessible (https://tile.osm.org/)

**Markers not appearing?**
- Check `data/restaurants.json` and `data/attractions.json` are valid JSON
- Verify `lat` and `lng` fields are numbers (not strings)
- Ensure coordinates are within Tampere bounds (~61.4–61.5, ~23.7–23.8)

**Sidebar not showing on mobile?**
- Click the × button in the top-left header to open sidebar
- Verify viewport meta tag is present in `index.html`

## License

MIT License. See LICENSE file for details.

## Support

For issues, feedback, or data corrections, please contact the project maintainers.
