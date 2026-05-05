---
id: 5-curator-notes
title: Theme 3 - Curation Legibility - Add Editorial Notes to POI Data
status: done
owner: builder
created: 2026-05-05T05:01:00Z
updated: 2026-05-05T05:15:00Z
---

## Objective
Validate Theme 3: **Curation legibility — editorial stance**. Test whether adding brief curator notes to each point-of-interest (restaurant and attraction) improves user understanding of why each location matters.

## Acceptance Criteria
- [x] Each restaurant has a 1-2 sentence curator note (15–25 words)
- [x] Each attraction has a 1-2 sentence curator note (15–25 words)
- [x] Curator notes displayed prominently in POI popover above description
- [x] Notes styled distinctly (italic, different color, visual separation)
- [x] No data loss or breaking changes to existing fields

## Implementation Details

### Data Changes
- Added `curator_note` field to all 6 restaurants in `data/restaurants.json`
- Added `curator_note` field to all 10 attractions in `data/attractions.json`
- Notes provide local insight: why tourists should visit, unique selling point, or context

**Example notes:**
- Kaski: "Award-winning chef combines Japanese technique with Nordic ingredients."
- Enpalu: "Authentic omakase experience with seasonal fish sourced directly from Japan."
- Tampere Cathedral: "Essential landmark with dramatic frescoes; 5-min walk from market square."
- Pyynikki Park: "Iconic tower with lake views; scenic walk from downtown, best at sunset."

### UI Changes
- Modified `showPOIDetails()` in `js/app.js` to render curator_note field
- Curator note displayed immediately after title badge, before contact info
- Applied distinct styling in `.popup-curator-note` CSS class

### Styling
**Visual Design:**
- Font: italic, 0.9rem
- Color: coral/sushi orange (`var(--primary-sushi)`)
- Background: light coral tint with 3px left border
- Padding: 0.75rem with rounded corners
- Creates visual hierarchy: Title > Curator Note > Details > Description

## Validation Goal
Through this prototype, we validate:
1. Do brief curator notes help tourists understand "why" to visit each POI?
2. Does editorial stance reduce choice paralysis in sidebar list?
3. Does styling make curator perspective clearly distinct from factual details?

## Known Limitations
- Notes are static and in English only (no localization)
- No filtering by curator perspective (e.g., "family-friendly," "romantic")
- No curator/author attribution

## Next Steps
- Deploy to test environment
- Gather user feedback on note helpfulness and accuracy
- Iterate on note content based on real tourist behavior
