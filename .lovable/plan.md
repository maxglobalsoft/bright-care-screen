
# WellnessCareConnect — Mobile Home Mockups (3 Concepts)

Goal: a single presentation page showing **3 high-fidelity mobile home screens** inside phone frames, side-by-side and clearly labelled, so Dr. Rajesh Patel can pick a direction. Identical content across all three; only the visual treatment changes.

## Route

- New route: `src/routes/mockups.tsx` → `/mockups`
  - Page title "Mobile App — Home Screen Concepts", subtitle, and 3 phone frames in a responsive row (stacks on small screens, side-by-side from md+).
  - Each phone labelled: **Concept A — Calm Minimal**, **Concept B — Vibrant Gradient**, **Concept C — Warm & Friendly**, with a 1-line mood description below.
- Add a link from the existing homepage (`src/routes/index.tsx`) header/CTA: "View mobile app mockups →".

## Brand tokens (locked, added to `src/styles.css`)

```
--wcc-green-primary: #2E6B53
--wcc-green-deep:    #1F4A3A
--wcc-sage:          #567257
--wcc-green-soft:    #EAF0EA
--wcc-ink:           #2A2420
--wcc-slate:         #6B7269
--wcc-gold:          #C9A24B   /* rating stars only */
--wcc-gradient: linear-gradient(135deg, #1F4A3A 0%, #2E6B53 55%, #567257 100%)
```

Fonts via `@fontsource`: **Sora** (headings) + **Inter** (body). Install with `bun add @fontsource/sora @fontsource/inter`, import in `src/router.tsx` (client-safe).

## Shared content (identical in all 3 phones)

Hardcoded mock data file `src/components/mockups/data.ts`:
- Greeting: "Good morning, Aarav" + avatar; location "Toronto, ON"; bell with "3" badge.
- Search field placeholder: "Search doctors, medicines, symptoms, lab tests".
- 5 quick actions with Lucide icons: Video Consult (Video), Book Appointment (CalendarPlus), Order Medicine (Pill), Lab Tests (FlaskConical), Ask a Free Question (MessageCircleQuestion).
- Upcoming appointment: "Dr. Priya Shah · Cardiologist · Today, 4:30 PM" + Join button.
- Specialty chips: General Physician, Dermatology, Pediatrics, Cardiology, Gynecology, Dentist, ENT, Mental Health.
- Top doctors carousel (3 visible): photo, name, specialty, rating, fee in **CAD ($)** — e.g. "CAD $45", "CAD $60", "CAD $55", Consult button.
- Pharmacy strip ("Order medicines — Free delivery over $35") + Lab tests strip ("Home sample collection") with one image each.
- Health tips carousel (3 cards): "5 signs of vitamin D deficiency", "How to manage seasonal allergies", "Heart-healthy meals under 20 minutes".
- Bottom tab bar (Home active): Home, Consult, Pharmacy, Records, Profile (Lucide icons).

Imagery: real photos via Unsplash source URLs (doctor portraits, family/wellness imagery). No AI-look. Diverse people.

## Phone frame

`src/components/mockups/PhoneFrame.tsx` — 390×844 (iPhone-ish) wrapper with rounded bezel (rounded-[2.75rem]), notch/Dynamic Island pill, status-bar row (time, signal/wifi/battery icons), inner scroll area with hidden scrollbar. Pure CSS, no images. Same frame reused for all 3 concepts so comparison is fair.

## Three concept components

All three render the same content blocks via props/children; styling differs.

1. `ConceptACalmMinimal.tsx` — white surfaces, hairline borders (`border-[color:var(--wcc-green-soft)]`), no shadows, generous spacing (gap-5, p-5), small line icons, sage accents. Quiet stars. Editorial restraint.
2. `ConceptBVibrantGradient.tsx` — gradient greeting band (`bg-[var(--wcc-gradient)]` with white text), quick-action tiles as small gradient cards with white icons, soft shadows (`shadow-lg shadow-[color:var(--wcc-green-primary)]/15`), elevated doctor cards, rounded-2xl. Modern SaaS energy.
3. `ConceptCWarmFriendly.tsx` — warm cream surface (`#FBF7F1`) alongside greens, larger rounded corners (rounded-3xl), warm shadows, bigger photography (16:9 specialty/pharmacy hero), friendly icon chips on warm-tan backgrounds. Approachable.

All three honour: AA contrast, 44pt+ tap targets, Lucide icon family, CAD currency, real English copy.

## Layout & responsiveness on `/mockups`

- Header section: project name, tagline, "Pick a direction — Concept A / B / C".
- Phones row: `grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center`. On large screens, three phones side-by-side. On mobile, they stack.
- Below each phone: concept label, 1-line mood description, and a small "Choose this concept" outline button (visual only — no backend; selection handling is for after client decision).
- Soft neutral page background to make phones pop.

## Out of scope (next milestone, after client picks)

- Inner pages (consult flow, pharmacy, records, profile)
- Wiring "Choose this concept" to persistence
- Dark mode variants
- Actual React Native / Expo build — these are web mockups inside phone frames for client review, per the brief's intent of comparable side-by-side presentation.

## Acceptance check

- `/mockups` renders 3 phone frames side-by-side on desktop, stacked on mobile.
- All 3 contain identical sections in the same order with identical copy and CAD pricing.
- Visual treatments are clearly distinguishable at a glance.
- No console errors; Lucide icons render; Sora/Inter fonts loaded.
