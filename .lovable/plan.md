# Splash Screen v2 — Correct Logo + Full Master Prompt Spec

## What went wrong last time
- I built the splash at `/app` with a dark WebGL shader background.
- I reused the old `wcc-logo.jpg` asset (rejected logo).
- The master prompt actually asked for: route `/`, **light** premium gradient, floating particles, specific logo animation sequence, sage loading dots, redirect to `/home`.

## Fixes

### 1. Swap the logo asset
- Upload the new file `WellnessCareConnect_LOGO_tight_4K_App-2.png` via `lovable-assets` and create a new pointer `src/assets/wcc-logo-v2.png.asset.json`.
- Leave the old `wcc-logo.jpg.asset.json` in place for now (still referenced by the old `/mockups` LogoLockup); do not touch mockups this turn.

### 2. Move splash to `/` and add `/home`
- Replace `src/routes/index.tsx` (currently the placeholder) with the Splash screen.
- Create `src/routes/home.tsx` — white bg, centered text "Home Screen — coming next" in sage `#567257`, 18px.
- Delete the interim files from the previous turn: `src/routes/app.tsx`, `src/routes/app.index.tsx`, `src/routes/app.home.tsx`, `src/mobile/screens/GradientCanvas.tsx`, `src/mobile/shaders/gradient.vert.ts`, `src/mobile/shaders/gradient.frag.ts`.
- Keep `src/mobile/PhoneViewport.tsx` but resize to **390×844** with safe areas for status bar and home indicator, soft neutral backdrop around it on desktop.

### 3. Splash composition (matches master prompt exactly)
File: `src/mobile/screens/SplashScreen.tsx`

- **Background layers (bottom → top):**
  1. Linear gradient white → `#F3F6F2` (top to bottom).
  2. Large radial glow of `#567257` at 6% opacity centered behind logo.
  3. 7 tiny particles (2–4px dots, sage & warm orange `#E8912D` at 15% opacity) drifting slowly upward on a 10–14s loop with staggered delays. Pure CSS keyframes, transform+opacity only.

- **Logo (new asset), 78% of frame width, centered, no white box, `object-contain`:**
  - 0.0–0.5s: scale 0.6 → 1.0 with spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`), opacity 0 → 1.
  - 0.4s: circular ring behind logo, conic/linear sage→orange gradient, expands from 40% → 140% and fades 0.6 → 0 over 700ms (heartbeat).
  - 0.6–1.1s: diagonal white shine strip masked to logo bounding box, translateX left → right, 500ms.
  - 1.1s onward: infinite breathing loop, scale 1.0 ↔ 1.015 over 3s ease-in-out.

- **Bottom UI:**
  - Three 6px sage dots pulsing in sequence (0/150/300ms stagger, 1.2s cycle), 96px from bottom.
  - `v1.0` text, 10px, muted gray `#9AA39A`, 24px from bottom.

- **Auto-redirect:**
  - At 1600ms trigger a whole-screen 300ms opacity fade-out, then `navigate({ to: '/home' })`. Cleanup timers on unmount.
  - `prefers-reduced-motion: reduce` → skip all entry/shine/breathing/particles, show final logo state immediately, still redirect at 1600ms.

- **Quality:** All motion via transform/opacity only. No scrollbars (`overflow-hidden`). Status bar area kept clean (nothing overlapping top 44px safe area).

### 4. Brand tokens
Add to `src/styles.css` `:root`:
- `--wcc-sage: #567257;`
- `--wcc-orange: #E8912D;`
- `--wcc-mist: #F3F6F2;`
- `--wcc-muted: #9AA39A;`

These become the project-wide sage/orange tokens for all future screens.

## Files changed
- **New:** `src/assets/wcc-logo-v2.png.asset.json`, `src/routes/home.tsx`
- **Rewritten:** `src/routes/index.tsx` (now splash), `src/mobile/PhoneViewport.tsx` (390×844 + safe areas), `src/mobile/screens/SplashScreen.tsx` (full new animation), `src/styles.css` (tokens)
- **Deleted:** `src/routes/app.tsx`, `src/routes/app.index.tsx`, `src/routes/app.home.tsx`, `src/mobile/screens/GradientCanvas.tsx`, `src/mobile/shaders/*.ts`
- **Untouched:** `/mockups` and existing web mockup components (old logo stays there for now)

## Out of scope
- Real home screen content (next master prompt).
- Removing the old logo asset — will do that once nothing references it.

Approve and I'll rebuild.
