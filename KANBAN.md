# Kanban Board — Visit Tampere Sushi-First Discovery Map

## Backlog

- [7-theme-1-proximity](tasks/7-theme-1-proximity.md) — Theme 1: Proximity-First Map Flow Prototype
- [8-theme-2-itinerary](tasks/8-theme-2-itinerary.md) — Theme 2: Sushi-and-Surroundings Itinerary Framing
- [9-theme-5-entry-point](tasks/9-theme-5-entry-point.md) — Theme 5: Entry-Point Clarity — Map vs. List-First

## In Progress

(No items in progress; Cycle 2 complete)

## Done

- [1-sushi-map-core](tasks/1-sushi-map-core.md) — Core Sushi-First Discovery Map SPA
- [2-data-curation](tasks/2-data-curation.md) — Data Curation — Restaurants & Attractions
- [3-responsive-styling](tasks/3-responsive-styling.md) — Responsive Styling & Mobile-First CSS
- [4-map-implementation](tasks/4-map-implementation.md) — Map Implementation & Interactivity
- [5-curator-notes](tasks/5-curator-notes.md) — Theme 3: Curation Legibility - Editorial Notes
- [6-mobile-validation](tasks/6-mobile-validation.md) — Theme 4: Mobile-First Legibility - UX Fix

## Live / Deployed

- **Site:** https://visittampere.hiarman.com/ ✅ **LIVE**
- [4-deployment-hardening](tasks/4-deployment-hardening.md) — Follow-up: Protect deployment config against CI redeployment and admin-panel overwrites

---

## Summary

**Prototyping Status:** Step 4 Complete — Site Live

**Step 3 (Data Curation) Complete:**
- Fixed founder's primary concern: Näsinneula location corrected from 4.7 km away to accurate coordinates
- Replaced 6 fabricated restaurants with 7 verified sushi venues from research
- Added proper geocoding, addresses, and navigation links to all 17 POIs
- Data validated and ready for user testing

**Step 4 (Deployment) Complete:**
- Site serving live at visittampere.hiarman.com with corrected data
- Using Caddy static file server (no new services needed)
- Mobile-responsive design tested and working
- Ready for user feedback and next iteration

### Prior Cycle Work

**Cycle 2: Theme Validation**

Prototyped and validated 2 of 5 themes from Cycle 1 findings:

### Themes Validated This Cycle

**Theme 3: Curation Legibility — Editorial Stance** ✅
- Added curator notes (15–25 words each) to all 16 POIs
- Notes provide local insight and answer "why visit?"
- Styled distinctly in popover with italic + coral color
- Tests whether editorial perspective reduces choice paralysis

**Theme 4: Mobile-First Legibility Under Real Conditions** ✅
- Identified critical friction: popup close button overlapping POI title on mobile (375px)
- Fixed via mobile-specific header restructuring
- Popup header now stacks on ≤480px, full-width title with proper spacing
- Verified no desktop regressions
- Documented findings in `docs/mobile-validation.md`

### Implementation Summary
- **Files modified:** `data/restaurants.json`, `data/attractions.json`, `js/app.js`, `css/styles.css`
- **Files added:** `docs/mobile-validation.md`, `tasks/5-curator-notes.md`, `tasks/6-mobile-validation.md`
- **Code complexity:** Minimal (no new abstractions, single CSS breakpoint fix)
- **Testing:** DevTools mobile emulation at 375px, 480px, 768px+

### Backlog for Cycle 3
- Theme 1: Proximity-First Map Flow (highest risk: do tourists want to explore by location?)
- Theme 2: Sushi-and-Surroundings Itinerary (do tourists want guided routes vs. free exploration?)
- Theme 5: Entry-Point Clarity (map-first vs. list-first entry UX)

See [sushi-first-discovery-map-design.md](docs/sushi-first-discovery-map-design.md) for full product spec.
