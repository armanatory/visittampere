# Task 4: Deployment Hardening — Protect Live Static-Site Config

**Status:** BLOCKED (waiting for founder action)  
**Created:** 2026-05-05 (Step 4 — Steward)  
**Priority:** HIGH (blocks next CI deploy without risking downtime)  

---

## Issue Summary

Visit Tampere is now **live at `https://visittampere.hiarman.com/`** and serving users. However, the Caddy configuration that enables static-file serving is untracked in git and vulnerable to being overwritten by the admin panel. This task documents the two critical follow-ups.

---

## Risk 1: Untracked Caddy Config (CI Redeployment Risk)

### What's at risk?
File: `/opt/ventures/studio/runtime/caddy/missions.caddy`  
Current state: Lives on disk, working perfectly, **but not committed to git**

### How it breaks?
1. Founder pushes to `main` (or clicks "Run workflow" in GitHub)
2. CI runs `scripts/bootstrap.sh` on the VPS
3. Bootstrap sees `missions.caddy` exists on disk (line 232: `if [[ ! -f "$CADDY_CONF_PATH" ]]`)
4. Bootstrap **does not overwrite** it (which is good)
5. **BUT** — if VPS is freshly provisioned, bootstrap creates a blank file
6. The live `file_server` block disappears
7. Site goes to 503 ("Mission not running")

### How to fix
**Action Required: Founder or steward with git permissions**

```bash
cd /opt/ventures/studio
git add runtime/caddy/missions.caddy
git commit -m "chore: track Visit Tampere static-site Caddy configuration

The configuration enables direct file serving without a backend
service. Without this commit, a fresh VPS provision would reset
the site to 503. This change is necessary to ensure the
prototype remains live across CI deployments."
git push origin main
```

**Why this is safe:** `runtime/` is managed by Steward and contains infrastructure config, not user-facing code. Bootstrap is designed to be idempotent and preserve this file once committed.

---

## Risk 2: Admin Panel Overwrites Config (Admin-Action Risk)

### What's at risk?
Function: `src/admin/server.py` lines 4541-4574 (`render_caddy_snippet()`)

Current behavior:
- Reads all missions from `ledger/`
- Generates default Caddy blocks for each
- For any mission with `port: 0`, outputs: `respond "Mission not running..." 503`
- Visit Tampere has `port: 0` → 503 is the default

### How it breaks?
Any admin-panel action that calls `rewrite_caddy_and_reload()`:
- Creating a new mission
- Editing an existing mission (changing domain, port, name)
- Enabling/disabling any mission

Trigger: Admin panel → code regenerates missions.caddy → overwrites the `file_server` block → Caddy reloads → site goes 503

### How to fix
**Action Required: Builder role in next cycle**

Update `render_caddy_snippet()` to recognize `kind: static-site`:

```python
# Around line 4560 in src/admin/server.py
if port_int > 0:
    lines.append(f"    reverse_proxy 127.0.0.1:{port_int}")
elif mission.get("kind") == "static-site":
    # Serve static files directly from the mission's repo working tree.
    # No backend service needed; Caddy handles file serving natively.
    repo_path = str(INSTALL_DIR / "runtime" / "repos" / slug)
    lines.append(f"    root * {repo_path}")
    lines.append("    file_server")
    lines.append('    header { Cache-Control "no-store" }')
else:
    lines.append(f'    respond "Mission \\'{slug}\\' is not yet running. '
                 f'Set a port in the admin panel once a service is bound." 503')
```

**Why this is needed:** Once this fix lands, the admin panel becomes aware that `static-site` missions don't need a port or backend service. Future static-site missions can be created and edited without risk.

---

## Workaround (Until Builder Fix Lands)

**Do not:**
- ❌ Create or edit any missions in the admin panel
- ❌ Change any domain or port settings
- ❌ Trigger actions that regenerate Caddy config

**Safe to do:**
- ✅ Edit `/opt/ventures/studio/ledger/projects/visittampere/mission.md` directly (manual file edits don't trigger Caddy regeneration)
- ✅ Browse the live site at visittampere.hiarman.com
- ✅ Test with users
- ✅ Approve/reject escalations (doesn't touch missions.caddy)
- ✅ View and manage other non-Tampere missions in admin panel (as long as no creates/edits to Visit Tampere itself)

---

## What Founders Should Do Right Now

1. **Commit the Caddy config** (Risk 1 mitigation):
   ```bash
   git add runtime/caddy/missions.caddy && git commit -m "..."
   ```

2. **Create a Builder task** (Risk 2 mitigation):
   - Assign the `render_caddy_snippet()` update to the next cycle
   - Reference this task for context
   - Target effort: ~30 minutes (small, scoped change)

3. **Hold on admin-panel changes** until Builder fix is merged:
   - If you need to modify any mission config, edit `mission.md` files directly
   - Avoid the admin panel UI for mission CRUD until the fix is live

4. **Test the site** with real users:
   - Data is now live and accurate (Step 3 corrections)
   - Sushi-discovery UX is working
   - Gather feedback for future iterations

---

## Timeline

- **Now:** Risk 1 can be fixed with one git command
- **Next CI run:** If Risk 1 not fixed, downtime risk during redeployment
- **Next Builder cycle:** Risk 2 can be fixed with a small PR
- **After Builder fix:** Admin panel becomes safe for static-site mission changes

---

## Related Files

- `/opt/ventures/studio/ledger/projects/visittampere/mission.md` — mission config (kind: static-site, port: 0)
- `/opt/ventures/studio/runtime/caddy/missions.caddy` — live Caddy config (untracked)
- `/opt/ventures/studio/src/admin/server.py` lines 4541-4574 — function needing update
- `/opt/ventures/studio/ledger/projects/visittampere/workflows/prototyping/step4-summary.md` — detailed deployment info

---

## Success Criteria

✅ `runtime/caddy/missions.caddy` is committed to git  
✅ `src/admin/server.py` includes static-site branch in `render_caddy_snippet()`  
✅ Admin panel can be used without risk to Visit Tampere site  
✅ Site remains live at visittampere.hiarman.com across CI deployments  
