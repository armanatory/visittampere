---
id: 6-mobile-validation
title: Theme 4 - Mobile-First Legibility - Fix Critical Viewport Friction
status: done
owner: builder
created: 2026-05-05T05:01:00Z
updated: 2026-05-05T05:15:00Z
---

## Objective
Validate Theme 4: **Mobile-first legibility under real conditions**. Test the prototype on mobile viewport (375px width) and identify/fix the highest-risk UX friction point preventing tourists from using the map on phones.

## Acceptance Criteria
- [x] Prototype tested on mobile viewport (375px, iPhone SE size)
- [x] One critical UX friction point identified and documented
- [x] Fix implemented and verified
- [x] No regressions on desktop view
- [x] Findings documented in `docs/mobile-validation.md`

## Problem Identified

### Popup Close Button Occlusion on Mobile
**Severity:** High
**Impact:** On 375px viewport, the popup header used `flex: justify-content: space-between` in a single row. The close button (×) was placed too close to or overlapping the POI name, especially for longer titles like "Särkänniemi" or "Moomin Museum".

**Root cause:** 
- Header was inflexible row with fixed padding (2rem)
- Close button had no minimum spacing
- Title font size (1.5rem) left little room on narrow screens

## Solution Implemented

### CSS Changes (`css/styles.css`)

1. **Improved close button design:**
   - Fixed size: 32px × 32px
   - Flex centering for proper alignment
   - Added flex-shrink: 0 to prevent compression
   - Visual feedback: background highlight on hover

2. **Header spacing:**
   - Added gap: 0.5rem for consistent spacing between close button and title
   - Better flex alignment with align-items: flex-start

3. **Mobile breakpoint restructure (≤480px):**
   - Changed header to flex-direction: column
   - Title and type badge in separate row from close button
   - Close button positioned at top-right without overlapping text
   - Ensures title text wraps properly with full width

### Result
On 375px viewport:
```
[Type Badge]
[POI Name (wrapped)]        [×]
[Curator Note]
[Contact Details...]
```

On desktop (≥768px):
```
[Type Badge] [POI Name]             [×]
[Details...]
```

## Testing Performed
- Browser DevTools mobile emulation (iPhone SE 375px viewport)
- Verified at breakpoints: 375px, 480px, 768px, 1024px
- Tested with long POI names (Särkänniemi = 13 chars)
- No desktop regression observed

## What's NOT Included
- Real device testing (DevTools only)
- Touch gesture validation
- Network throttling/performance testing
- Accessibility testing (WCAG compliance)
- Filter button hit-target optimization (deemed acceptable for prototype)

## Impact Assessment
- **Positive:** POI details now fully readable on mobile without obstruction
- **Safe:** All existing desktop layout and functionality preserved
- **Cost:** Single CSS change with minimal maintenance burden

## File Modified
- `css/styles.css` — 40 lines added/modified for mobile popup restructuring
