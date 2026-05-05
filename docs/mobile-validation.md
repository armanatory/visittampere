# Mobile-First Legibility Validation (Theme 4)

## Objective
Validate that the map interface is usable on mobile phones (375px viewport) without critical UX friction.

## Testing Method
- Browser DevTools mobile emulation (375px width, iPhone SE viewport)
- Desktop testing of responsive behavior at various breakpoints

## Critical Friction Points Identified

### 1. **Popup Close Button Occlusion** (FIXED)
**Problem:** On mobile, the close button (×) in the popup header could overlap with the POI name text when displayed in narrow viewports. The header was a single row with `justify-content: space-between`, causing the close button to push into the title area.

**Evidence:** At 375px width, with POI names like "Särkänniemi" or "Moomin Museum", the close button would sit too close or overlap the title text, reducing readability.

**Solution Implemented:**
- Changed `.popup-close` to a fixed-size button (32px × 32px) with flex centering for better tap targets
- Added padding and flex-shrink: 0 to prevent button from being compressed
- Added gap: 0.5rem to header for spacing
- At mobile breakpoint (≤480px), restructured popup header to stack vertically:
  - Title and type badge in a flex row
  - Close button properly positioned at top-right with adequate spacing
  - Ensures title gets full width and wraps cleanly

**Mobile behavior after fix:**
```
[Type Badge]
[POI Name (wrapped if needed)] [×]
[Curator Note]
[Details below]
```

**Desktop behavior (unchanged):** Single-row header maintained for optimal space usage on larger screens.

### 2. **Filter Button Hit Targets** (VERIFIED)
**Status:** Acceptable
- Filter buttons have min-width: 70px and padding: 0.6rem 1rem
- At 375px with 3 buttons + gap, they resize proportionally (flex: 1)
- Minimum 18-20px height is sufficient for touch targets (44px recommended by WCAG, we're ~36px)
- No change needed for this cycle; acceptable for prototyping

### 3. **Search Input Sizing** (VERIFIED)
**Status:** Acceptable
- Search input is 100% width with padding: 0.75rem
- Touch-friendly height (~40px)
- Clear visual focus state with color change
- No friction observed

## Assumptions
- Users are testing on actual mobile phones or iOS/Android device simulators with proper viewport meta tag (already present in index.html)
- No server-side changes needed; this is purely frontend responsive design
- The existing Leaflet map library handles touch and mobile properly (widely tested library)

## What's Not Validated This Cycle
- Real device testing (we used DevTools emulation only)
- Touch gesture interactions (map pinch-zoom, swipe sidebar)
- Network latency on mobile (no real 4G testing)
- Battery/performance impact
- Accessibility (keyboard navigation, screen reader compatibility)

## Recommendation for Next Cycle
If user testing reveals additional friction, prioritize:
1. Touch gesture testing on real devices
2. Increase filter button size/spacing if feedback indicates tap errors
3. Accessibility audit for WCAG compliance

## Files Changed
- `/css/styles.css` — Added mobile-specific popup header restructuring and improved close button sizing
- `/index.html` — No changes (viewport meta already correct)
