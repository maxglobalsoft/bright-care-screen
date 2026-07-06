# Plan: Mobile App Splash Screen (Expo + Three.js 3D)

## Important context
This current Lovable project is a **web app** (TanStack Start). Lovable does not build native mobile apps directly — but we can build an **Expo (React Native) web-compatible** app inside this project so you preview it here, and later export it to native iOS/Android via Expo.

## Step 1 — Project scaffold
- Add Expo + React Native Web dependencies (`expo`, `react-native`, `react-native-web`, `expo-router`, `expo-gl`, `expo-three`, `three`).
- Set up a mobile-shell route (`/app`) that renders a phone-frame viewport (375×812) for realistic preview in the browser.
- Create `src/mobile/` folder for all screens (splash, home, inner pages) — kept separate from existing web mockup code.

## Step 2 — Splash screen
- **Component:** `src/mobile/screens/SplashScreen.tsx`
- **3D animation:** Three.js WebGL canvas rendering an animated gradient shader (custom fragment shader with flowing color blobs) as background.
- **Logo:** Your PNG logo centered, with subtle scale + fade-in, plus a soft glow.
- **Duration:** Fixed ~2.5s, then auto-navigate to `/app/home`.
- **Fallback:** CSS gradient if WebGL unavailable.

## Step 3 — Waiting on your inputs
Before I build, I need from you:
1. **Logo PNG file** (upload it in chat).
2. **Master prompt** describing the exact gradient colors, animation feel (flowing/pulsing/rotating), mood, and any brand tokens.

## Step 4 — Homepage (next turn)
Once splash is approved, you'll send the homepage prompt and I'll build it in the same `src/mobile/` structure, wired to navigate from splash.

## Technical notes
- Three.js + custom WGSL-like GLSL fragment shader for the 3D gradient (WebGL, works in browser and Expo).
- Animation loop uses `requestAnimationFrame`, cleaned up on unmount.
- Splash duration and gradient colors exposed as constants for easy tweaking.
- Existing web mockup routes (`/`, concept pages) remain untouched.

## Deliverable this round
Only the splash screen. Homepage and inner pages come in follow-up prompts as you described.

**Ready when you upload the logo PNG + send the master prompt.**