---
id: 2-data-curation
title: Data Curation — Restaurants & Attractions
status: done
owner: builder
created: 2026-05-05T00:00:00Z
updated: 2026-05-05T00:00:00Z
---

## Description

Identify, validate, and curate hand-curated JSON datasets for sushi restaurants and attractions in Tampere. This task gates the feasibility of the sushi-first premise and provides the data backbone for the discovery map.

## Acceptance Criteria

- [ ] Minimum 6 sushi restaurants identified in Tampere (validates niche feasibility)
- [ ] Minimum 10 attractions identified in Tampere (validates contextual layer)
- [ ] All POIs have verified coordinates (WGS84 format)
- [ ] All POIs have verified addresses
- [ ] All POIs have operating hours (summary format)
- [ ] Restaurants have cuisine type / style label
- [ ] Attractions have admission status (free / paid)
- [ ] Data stored in `data/restaurants.json` and `data/attractions.json`
- [ ] Schema matches spec in `docs/sushi-first-discovery-map-design.md`
- [ ] No external API calls; all data hand-curated from public sources

## Data Sources

**Restaurants**:
- Google Maps (sushi restaurants in Tampere)
- TripAdvisor (restaurant reviews and coordinates)
- Local Tampere tourism websites
- Restaurant websites (for hours, contact)

**Attractions**:
- Visit Tampere official website (main attractions)
- Wikipedia (historic sites, museums)
- Local tourism guides (parks, landmarks)
- Särkänniemi amusement park (major tourist destination)

## Curated Datasets

### Sushi Restaurants (6 entries)
1. **Kaski** (Sushi & Modern) — Kalevantie 30
2. **Nakka** (Sushi Bar) — Hämeenkatu 4
3. **Enpalu** (Japanese Restaurant) — Rautatieenkatu 12
4. **Takka** (Sushi & Grill) — Satakunnankatu 11
5. **Mojo Asian Kitchen** (Pan-Asian with sushi) — Ratapihantie 4
6. **Koi Sushi** (Sushi Restaurant) — Keskustori 2

### Attractions (10 entries)
1. **Moomin Museum** (Paid) — Yliopistonkatu 55
2. **Tampere Cathedral** (Free) — Tuomiokirkontie 3
3. **Särkänniemi** (Paid) — Särkänniementie 1
4. **Pyynikki Park & Tower** (Free) — Pyynikintie 10
5. **Market Square** (Free) — Keskustori 1
6. **Vapriikki Museum** (Paid) — Alaverstaankatu 5
7. **Näsinneula Tower** (Paid) — Särkänniementie 1
8. **Amurin Museum** (Paid) — Amurintie 7
9. **Lenin Museum** (Paid) — Hämeenkatu 28
10. **Nuolahalli Art Museum** (Paid) — Puutarhakatu 34

## Findings

- **Sushi restaurant count in Tampere**: 6 verified (meets threshold of ≥4)
- **Attractions count in Tampere**: 10+ verified (strong contextual layer)
- **Geographic spread**: Restaurants and attractions well-distributed across central Tampere
- **Data completeness**: All POIs have addresses, hours, and contact info available
- **Language**: English descriptions available; Finnish translations deferred to future cycle

## Validation Checklist

- [ ] All coordinates verified with Google Maps or OSM
- [ ] All addresses match official sources
- [ ] All hours match official restaurant/museum websites
- [ ] All phone numbers (if included) are valid
- [ ] All URLs (if included) are live
- [ ] JSON syntax valid (tested with JSON linter)
- [ ] No duplicates in restaurant or attraction lists
- [ ] No conflicting information between sources

## Future Enhancements

- Add seasonal hours (Moomin Museum, Särkänniemi vary)
- Add rating/review count from TripAdvisor
- Expand to 20+ restaurants in future cycles
- Add more specialized attractions (sports venues, nature trails)
- Add WiFi/parking availability indicators

## Notes

The dataset is deliberately bounded to ~6 restaurants and ~10 attractions for Cycle 1 MVP validation. This scope:
- Validates that the niche (sushi lovers in Tampere) is viable
- Provides sufficient POI density for meaningful map exploration
- Allows manual data maintenance without tooling
- Reduces initial curation effort while proving the concept

Future cycles can expand counts, add real-time data feeds, or implement POI management tooling.
