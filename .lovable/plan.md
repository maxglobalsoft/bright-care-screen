# Splash Screen — WellnessCareConnect Mobile

## Scope
Build only the **Splash Screen** and a placeholder **Home** route inside the mobile app shell. Everything lives in a phone-frame viewport (375×812) for browser preview; structure mirrors what will port to Expo/React Native later.

## Routes
- `src/routes/app.tsx` — mobile shell layout, centers a phone frame, renders `<Outlet />`.
- `src/routes/app.index.tsx` — Splash screen (auto-navigates to `/app/home` after 2.4s).
- `src/routes/app.home.tsx` — minimal placeholder ("Home — coming next") using the sage/orange tokens.

## Splash screen composition
- **Background:** Three.js WebGL canvas running a custom GLSL fragment shader with flowing/blending color blobs animated on `uTime`. Palette biased to sage `#567257` with warm orange `#E8912D` accents and soft cream highlights. Full-bleed inside the phone frame, behind everything.
- **Logo:** Centered `WellnessCareConnect_LOGO_tight_4K_App.png` (uploaded asset), ~62% frame width, subtle scale-in (0.92 → 1) + fade-in (0 → 1) over 700ms with a soft glow ring pulse.
- **Wordmark (optional, faint):** Not shown — the tight logo already contains brand mark. Keep clean.
- **Status bar area:** kept clean (no clock overlay on top of shader).
- **Auto-redirect:** `setTimeout` at 2400ms → `navigate({ to: '/app/home' })`. Cleared on unmount.
- **Reduced motion:** if `matchMedia('(prefers-reduced-motion: reduce)')` matches → skip shader animation, show static gradient + logo, redirect at 1600ms.
- **Performance:** shader uses transform/opacity only for logo; `requestAnimationFrame` cleaned up on unmount; no scrollbars; DPR capped at 2.

## Design tokens (added to `src/styles.css`)
- `--wcc-sage: #567257`
- `--wcc-orange: #E8912D`
- `--wcc-cream: #FBF7EE` (splash safe fallback bg)

## Files to create
- `src/routes/app.tsx`
- `src/routes/app.index.tsx`
- `src/routes/app.home.tsx`
- `src/mobile/PhoneViewport.tsx` — phone frame wrapper (375×812, rounded, drop shadow, notch).
- `src/mobile/screens/SplashScreen.tsx` — logo + auto-redirect + reduced-motion handling.
- `src/mobile/screens/GradientCanvas.tsx` — Three.js scene: fullscreen quad + custom fragment shader.
- `src/mobile/shaders/gradient.frag.ts` — GLSL fragment shader string (blobs, warp, sage/orange mix).
- `src/mobile/shaders/gradient.vert.ts` — passthrough vertex shader.

## Asset
- Reuse the uploaded logo pointer already present in the project. If a new tight 4K PNG is preferred, upload via chat and I'll swap the asset pointer. For this build I'll use the existing `src/assets/wcc-logo.jpg.asset.json` unless you upload the new one before I start.

## Dependencies to install
- `three` and `@types/three` (WebGL rendering)
- No `expo-*` packages this round — the mobile app is previewed as a web build inside the phone frame; Expo-specific porting happens once screens are approved.

## Technical notes
- Shader: two animated metaball-like fields sampled with smoothstep, mixed between sage and orange, softened with a cream vignette. Time-driven only; no mouse input.
- Renderer: `THREE.WebGLRenderer({ antialias: true, alpha: true })`, resize observer on the canvas parent.
- Fallback: if `WebGLRenderingContext` unavailable → CSS radial-gradient background with the same palette.
- Navigation from splash uses TanStack Router `useNavigate` (this is still the web preview shell); the same component ports to Expo Router later with a one-line swap.

## Out of scope (later turns)
- Real Home screen content, tab bar, and inner pages
- Actual Expo project export
- Backend / admin wiring

Send the go-ahead (and upload the new tight 4K logo PNG if you want it swapped in) and I'll build it.
