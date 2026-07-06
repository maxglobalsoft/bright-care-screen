
# Home Screen — WellnessCareConnect Mobile App

Replace the `/home` placeholder with the full Home Screen inside the existing 390×844 `PhoneViewport`. Splash and its 2.2s redirect stay untouched. Aligned with the signed MGS proposal (Online Doctor Consultation & Healthcare Marketplace — mobile app scope: consult, doctors, pharmacy, lab, records/profile).

## Files

**New**
- `src/mobile/home/data.ts` — editable content arrays (user, specialties, consultOptions, doctors, promo, quickLinks, tips) — CMS-ready
- `src/mobile/home/TopBar.tsx` — sticky bar with emblem, greeting, bell (orange dot), avatar
- `src/mobile/home/SearchBar.tsx` — rounded 14px, mist bg, sage focus glow
- `src/mobile/home/PromoCard.tsx` — sage gradient, CARE20 chip, floating shadow anim
- `src/mobile/home/SpecialtiesRow.tsx` — horizontal scroll, 8 tiles, icon→orange flip on tap
- `src/mobile/home/ConsultOptions.tsx` — Chat/Audio/Video cards, gradient border trace on active
- `src/mobile/home/DoctorsRail.tsx` — horizontal doctor cards with Book sheen
- `src/mobile/home/ServicesRow.tsx` — Pharmacy + Lab half-width cards
- `src/mobile/home/QATeaser.tsx` — Ask-a-doctor card
- `src/mobile/home/BottomTabBar.tsx` — 5 tabs with center floating Consult FAB
- `src/mobile/home/HomeScreen.tsx` — composes all sections; owns scroll + sticky shadow logic

**Rewritten**
- `src/routes/home.tsx` — renders `<PhoneViewport><HomeScreen/></PhoneViewport>`, sets head meta ("Home — WellnessCareConnect")

**Untouched**
- Splash, PhoneViewport, styles.css tokens (`--wcc-sage`, `--wcc-orange`, `--wcc-mist`, `--wcc-muted`), all `/mockups` code

## Layout (top → bottom, inside 390×844 safe area)

```text
┌──────────────────────────── 390 ──┐
│ 44px status-bar safe area         │
│ TopBar  emblem  greeting   🔔 ◯   │ sticky, white, shadow-on-scroll
│ SearchBar (mist, sage focus glow) │
│ PromoCard  20% off  [CARE20]  🎨  │ sage→deep-green gradient
│ Specialties  ▸  ▸  ▸  (8 tiles)   │ horizontal scroll
│ Consult now  Chat  Audio  Video★  │
│ Top doctors  ▸  ▸  ▸  (4 cards)   │
│ Pharmacy │ Lab Tests              │ 2 half cards
│ Q&A teaser  Ask a doctor free →   │
│ (bottom padding for tab bar)      │
│                                   │
│ Home  Doctors  ⓥ  Pharmacy  Profile │ fixed BottomTabBar + FAB
│ home indicator safe area          │
└───────────────────────────────────┘
```

Scroll container: single vertical scroll between TopBar (sticky top) and BottomTabBar (fixed bottom). 16px horizontal padding on all sections; horizontal rails use `-mx-4 px-4` with `overflow-x-auto` and hidden scrollbars.

## Content (data.ts sketch)

- `user`: `{ name: "Bhupendra", greeting: "Good morning,", avatar: null }`
- `specialties`: 8 items — General Physician, Cardiology, Pediatrics, Neurology, Dermatology, Orthopedics, Ophthalmology, Mental Health — each `{ label, icon (lucide), doctorCount }`
- `consultOptions`: Chat CA$29, Audio CA$39, Video CA$49 (popular)
- `doctors`: 4 sample Canadian doctors — Toronto, Vancouver, Calgary, Montreal — `{ name, specialty, years, rating, reviews, priceCad, availability, verified }`
- `promo`: `{ title, code: "CARE20", discount: "20%" }`
- `services`: Pharmacy, Lab Tests
- `qa`: sample question + CTA

Photo/illustration slots use gradient placeholders (initials for doctors, icon for promo art) — no external image URLs so nothing breaks offline.

## Interactions (transform/opacity only, 60fps, reduced-motion respected)

- Tap scale 0.96 on TopBar icons and tabs
- PromoCard: 4s ease-in-out shadow-y translate loop (±2px)
- Specialty tile tap: `translateY(-2px)` + icon color transitions sage→orange
- Consult card active/press: pseudo-element border with sage→orange conic-gradient mask, 400ms trace
- Doctor card tap: photo scales 1.03; Book button gets 600ms shine sweep (masked gradient translate)
- Bottom tab tap: icon pop `scale(0.9→1.1→1)` 250ms; active dot indicator
- Center Consult FAB: 3s slow glow pulse (box-shadow opacity), floats 8px above bar
- `@media (prefers-reduced-motion: reduce)`: disable all loops, keep static styling

## Technical notes

- All colors via existing tokens (`bg-[--wcc-sage]`, etc.) — no new tokens
- Icons via `lucide-react` (Stethoscope, Heart, Baby, Brain, Sparkles, Bone, Eye, Smile, Bell, Search, MessageCircle, Phone, Video, Pill, FlaskConical, Home, User, ShoppingBag)
- Sticky shadow: `useState` + `onScroll` on scroll container, apply `shadow-sm` after >4px
- BottomTabBar uses `position: absolute; bottom: 0` inside the phone frame (not page-fixed), with safe-area bottom padding for the home indicator
- No routing yet on tab items / buttons (other routes come next) — buttons are visual, tabs highlight Home as active
- No horizontal page overflow: rails clip inside phone frame width

## Out of scope (future master prompts)
- Doctors, Consult, Pharmacy, Profile route pages
- Real booking flow, search results, notifications page
- Backend / auth wiring
