---
id: 3-responsive-styling
title: Responsive Styling & Mobile-First CSS
status: done
owner: builder
created: 2026-05-05T00:00:00Z
updated: 2026-05-05T00:00:00Z
---

## Description

Implement responsive CSS layout with mobile-first approach, warm sushi-themed color scheme, and touch-friendly interactions. This covers the sidebar, header, map controls, and info popovers across all viewport sizes.

## Acceptance Criteria

- [ ] Mobile-first CSS (base styles for ≤480px, media queries for larger)
- [ ] Responsive breakpoints: 480px, 768px
- [ ] Header with gradient background (sushi warm colors)
- [ ] Sidebar: collapsible on mobile (<768px), fixed on desktop (≥768px)
- [ ] Sidebar toggle button (×) visible only on mobile
- [ ] Search box and filter buttons styled consistently
- [ ] POI list items with left border (coral for restaurants, blue for attractions)
- [ ] Map controls (layer checkboxes) positioned bottom-right on desktop, integrated on mobile
- [ ] Info popover styled with proper contrast and readability
- [ ] All interactive elements have hover/focus states
- [ ] Touch targets minimum 44px (WCAG mobile standard)
- [ ] Smooth transitions and animations (no jarring layout shifts)
- [ ] Sushi color scheme: coral (#E8704A) for restaurants, blue (#2196F3) for attractions
- [ ] CSS variables used for colors (maintainability)
- [ ] No external CSS frameworks (plain CSS3 only)

## Color Palette

```css
--primary-sushi: #E8704A;           /* Warm coral for restaurants */
--primary-sushi-light: #F5A17A;     /* Light variant for hover */
--secondary-attraction: #2196F3;    /* Blue for attractions */
--secondary-attraction-light: #64B5F6;
--text-primary: #212121;
--text-secondary: #666666;
--bg-light: #FAFAFA;
--bg-white: #FFFFFF;
--border-color: #E0E0E0;
```

## Layout Structure

### Header
- Gradient background (coral to light coral)
- White text
- Centered title and subtitle
- Padding: 1.5rem on desktop, 1rem on mobile

### Main Layout
- Flexbox container (flex-direction: row on desktop, column on mobile)
- Sidebar (left, 320px on desktop; 280px collapsible on mobile)
- Map container (flex: 1, fills remaining space)

### Sidebar
**Desktop (≥768px):**
- Fixed width 320px
- Always visible
- Border-right with subtle shadow
- Scrollable POI list

**Mobile (<768px):**
- Position absolute (left: 0)
- Width 280px or 75vw
- Transform translate (-100%) by default
- Transform translate (0) when .open class added
- Smooth CSS transition (300ms ease)

### Search & Filter
- Input box: full width, 1px border, rounded corners
- Filter buttons: flexbox row, equal width, touch-friendly padding
- Active state: filled background with primary color

### POI List
- Scrollable (flex: 1, overflow-y: auto)
- List items: padding 1rem, border-bottom separator
- Left border indicator (4px): coral for restaurants, blue for attractions
- Hover state: light gray background
- Active state: light coral/blue background

### Map Controls
- Fixed position (bottom-right on desktop, integrated on mobile)
- Rounded corners, subtle shadow
- Checkbox labels with 18px checkbox size
- Vertical flex layout (gap: 0.75rem)

### Info Popover
- Modal overlay: fixed, full viewport, semi-transparent dark background
- Content box: centered, max-width 500px on desktop, 90vw on mobile
- Close button (×): top-right corner, hover effect
- Content sections: info rows with label/value pairs
- Links: styled with primary color, hover underline

## Responsive Behavior

### ≤480px (Mobile)
- Single column layout
- Sidebar overlays map (width 75vw)
- Header reduced font size
- Popover max-width 95%
- Touch-optimized button sizes

### 481px–767px (Tablet)
- Single column layout
- Sidebar overlay same as mobile
- Wider popover (90vw)

### ≥768px (Desktop)
- Two-column layout
- Sidebar always visible (320px)
- Popover max-width 500px
- Hover states on interactive elements

## Animations & Transitions

- Sidebar toggle: 300ms ease (smooth slide)
- Button hover: 200ms color/background change
- Marker hover: 200ms scale (1.0 → 1.15)
- Popover overlay: fade-in (opacity 0 → 1, 150ms)

## Files

- `css/styles.css` (single file, ~400 lines with media queries)

## Implementation Notes

- No CSS-in-JS or preprocessors (vanilla CSS3)
- Use CSS custom properties (--variable-name) for colors
- Use Flexbox for layout (no Grid for simplicity)
- Media queries organized at end of file (mobile-first approach)
- No rounded corners on map (natural boundary)
- Subtle shadows for depth (not excessive)

## Testing Checklist

- [ ] Chrome DevTools device emulation: 375px (iPhone SE), 768px (iPad), 1024px (desktop)
- [ ] Safari mobile viewport
- [ ] Firefox responsive design mode
- [ ] Sidebar toggles correctly on mobile
- [ ] Sidebar hides when window resized > 768px
- [ ] All buttons are 44px+ tap target
- [ ] Popover readable and properly centered
- [ ] No horizontal scroll on any viewport
- [ ] Touch zoom works on map
- [ ] Transitions smooth (no jank)

## Constraints

- No external CSS libraries (Bootstrap, Tailwind, etc.)
- No CSS animations beyond simple transitions
- No custom fonts (system fonts only)
- Graceful degradation for older browsers (no CSS Grid, no custom properties fallback)
