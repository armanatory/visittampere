# BLOCKER: Data Accuracy Failures — Step 1 QA Finding

**Date:** 2026-05-05  
**Status:** Blocking all further cycles until resolved  
**Severity:** Critical — breaks product credibility with real users

---

## Summary

QA evaluation (Step 1) discovered that **research data from Step 0 was never integrated into the build.** The prototype currently ships with:

1. **Fabricated restaurant data** — all 6 restaurant names/addresses are invented; zero match the 7 verified venues from Step 0
2. **Multi-kilometre coordinate errors** — Näsinneula (4.73 km off), Särkänniemi (4.68 km off), Pyynikki (2.80 km off)
3. **The founder's explicit concern unresolved** — Näsinneula coordinate error was flagged in the project brief and remains in the live site

---

## Impact

A tourist using the live site will:
- Search for "Itsudemo" or other real restaurants → get zero results
- Click the Näsinneula pin → be routed to an empty location 4.7 km away
- On mobile → see only a blank map (sidebar hidden, no affordance)

**This destroys trust with the target audience** (domestic and foreign tourists).

---

## Root Cause

Workflow step sequence:
- **Step 0 (Researcher)** → Verified correct data for 7 restaurants and 10 landmarks
- **Step 1 (Product Explorer)** → Identified themes to validate
- **Step 2 (Builder)** → Built prototype; **did NOT consume Step 0 data** — kept fabricated data instead
- **Step 3 (Reviewer)** → Did not validate data accuracy against Step 0
- **Step 4 (Deploy)** → Shipped with broken data
- **Step 1 QA (qa-observer)** → Found the failures

**No data-diff validation gate existed between researcher output and builder artifact.**

---

## Remediation Tasks

### Immediate (Required to unblock all further work)

1. **Replace restaurant data** (`data/restaurants.json`)
   - Delete all 6 current entries
   - Add all 7 from Step 0 research output with verified addresses, phone numbers, hours

2. **Fix critical landmark coordinates** (`data/attractions.json`)
   - Näsinneula: `61.504967, 23.743065` + "Särkänniemenraitti 3, 33230 Tampere"
   - Särkänniemi: `61.5053, 23.7439` + "Särkänniemenraitti 3, 33230 Tampere"
   - Pyynikki: `61.49633, 23.73200` + "Näkötornintie 20, 33230 Tampere"

3. **Fix moderate-error attractions**
   - Tampere Cathedral, Moomin Museum, Market Square, Vapriikki (all 0.3–0.7 km offsets)
   - Correct coordinates + address strings against Step 0 reference table

4. **Verify / replace unverified attractions**
   - Remove: Amurin Museum, Lenin Museum, Nuolahalli Art Museum (not in Step 0 verified set)
   - Add (if verified operating): Finlayson Area, Tammerkoski rapids, Tampere Market Hall

### Secondary (UX fixes)

5. **Mobile sidebar affordance**
   - Make sidebar visible on mobile load, or add prominent list icon/label
   - Currently hidden with no affordance → first-time mobile user cannot access restaurant list

6. **(Optional) Navigation integration**
   - Add "Open in Maps" links to Apple Maps / Google Maps
   - Required for tourist GPS navigation; currently missing

---

## Validation Before Completion

All 7 restaurant names and addresses must be **spot-checked against current operating status** (Wolt, Google Maps, or direct verification) to ensure none have closed since Step 0 research (2026-05-05).

All 10+ landmark coordinates must be **verified within 100m of stated address** using Google Maps measure tool or equivalent.

---

## Process Recommendation

Add a **data-diff validation step** in the workflow:
- Between Step 0 (research output) and Step 2 (builder artifact), validate that all corrected data is actually applied
- Fail the build if coordinate drift >50m or restaurant names don't match verified set
- This prevents the same failure mode recurring in future cycles
