import { cloneElement, isValidElement, useMemo, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  Phone,
  Star,
  MapPin,
  Video,
  BadgeCheck,
  Calendar,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { Img } from "@/mobile/home/Img";
import { BottomTabBar } from "@/mobile/home/BottomTabBar";
import { allDoctors } from "@/mobile/doctors/data";
import {
  consultTypes,
  defaultTimeSlots,
  disabledSlotIndices,
  buildDateStrip,
  getExtras,
  type ConsultKey,
} from "./profileData";

const SAGE = "#567257";
const DEEP = "#3C4F3D";
const ORANGE = "#E8912D";
const RED = "#EF4444";
const RED_DEEP = "#B91C1C";
const MIST = "#F3F6F2";
const INK = "#23291F";
const MUTED = "#6B7280";

type TabKey = "experience" | "reviews" | "location";

export function DoctorProfileScreen() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const { id } = useParams({ from: "/doctor/$id" });

  const doctor = useMemo(
    () => allDoctors.find((d) => d.id === id) ?? allDoctors[0],
    [id],
  );
  const extras = useMemo(() => getExtras(doctor.id), [doctor.id]);
  const dates = useMemo(() => buildDateStrip(), []);

  const [expanded, setExpanded] = useState(false);
  const [fav, setFav] = useState(false);
  const [favTap, setFavTap] = useState(0);
  const [tab, setTab] = useState<TabKey>("experience");
  const [type, setType] = useState<ConsultKey | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const total = type ? consultTypes.find((c) => c.key === type)!.priceCad : 0;
  const canBook = !!(type && date && slot);

  const handleConfirm = () => {
    if (!canBook) return;
    setConfirmOpen(true);
  };

  const goHome = () => navigate({ to: "/home" });

  return (
    <PhoneViewport>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        <div className="h-11 shrink-0" />

        <div className="wcc-profile-scroll relative min-h-0 flex-1 overflow-y-auto pb-40">
          <style>{`
            .wcc-profile-scroll::-webkit-scrollbar{display:none}
            @keyframes wcc-sheen-sweep {
              0% { transform: translateX(-160%) skewX(-22deg); opacity: 0; }
              18% { opacity: 1; }
              100% { transform: translateX(260%) skewX(-22deg); opacity: 0; }
            }
            @keyframes wcc-grad-shift {
              0%,100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes wcc-conic-spin { to { transform: rotate(360deg); } }
            @keyframes wcc-tap-pulse {
              0% { box-shadow: 0 0 0 0 rgba(86,114,87,0.55); }
              100% { box-shadow: 0 0 0 14px rgba(86,114,87,0); }
            }
            .wcc-3d { position: relative; isolation: isolate; }
            .wcc-3d::after {
              content: ''; position: absolute; inset: 0; pointer-events: none;
              border-radius: inherit; z-index: 5;
              background: linear-gradient(115deg, transparent 32%, rgba(255,255,255,0.65) 50%, transparent 68%);
              transform: translateX(-160%) skewX(-22deg); opacity: 0;
            }
            .wcc-3d:hover::after { animation: wcc-sheen-sweep 1.15s ease-in-out infinite; }
            .wcc-3d:active { animation: wcc-tap-pulse 0.55s ease-out; }
            .wcc-3d-red::after { background: linear-gradient(115deg, transparent 32%, rgba(255,255,255,0.75) 50%, transparent 68%); }
            .wcc-3d-red:active { animation: wcc-tap-pulse 0.55s ease-out; box-shadow: 0 0 0 0 rgba(239,68,68,0.6); }
            .wcc-grad-anim { background-size: 220% 220% !important; }
            .wcc-grad-anim:hover { animation: wcc-grad-shift 2.2s ease-in-out infinite; }
            .wcc-conic-ring::before {
              content: ''; position: absolute; inset: -2px; border-radius: inherit; z-index: 0;
              background: conic-gradient(from 0deg, transparent 0deg, rgba(232,145,45,0.9) 60deg, transparent 120deg, transparent 360deg);
              opacity: 0; transition: opacity 200ms ease;
              -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
              -webkit-mask-composite: xor; mask-composite: exclude; padding: 2px;
            }
            .wcc-conic-ring:hover::before { opacity: 1; animation: wcc-conic-spin 1.6s linear infinite; }
            /* UNIQUE Confirm Booking button — holographic prismatic 3D */
            @keyframes wcc-cta-holo {
              0% { background-position: 0% 50%, 0% 50%; }
              50% { background-position: 100% 50%, 100% 50%; }
              100% { background-position: 0% 50%, 0% 50%; }
            }
            @keyframes wcc-cta-orbit {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes wcc-cta-float {
              0%,100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-1px) scale(1.005); }
            }
            .wcc-cta-holo { cursor: pointer !important; position: relative; isolation: isolate; background-size: 300% 300%, 200% 200% !important; animation: wcc-cta-float 3.2s ease-in-out infinite; }
            .wcc-cta-holo:hover { animation: wcc-cta-holo 2.4s ease-in-out infinite, wcc-cta-float 3.2s ease-in-out infinite; }
            .wcc-cta-holo::before {
              content:''; position:absolute; inset:-3px; border-radius: inherit; z-index:0;
              background: conic-gradient(from 0deg, #C9A24B, #E8912D, #2E6B53, #1F4A3A, #C9A24B);
              opacity: 0; transition: opacity 220ms ease; filter: blur(6px);
            }
            .wcc-cta-holo:hover::before { opacity: 0.9; animation: wcc-cta-orbit 2.6s linear infinite; }
            .wcc-cta-holo::after {
              content:''; position:absolute; inset:0; border-radius: inherit; pointer-events:none; z-index:5;
              background:
                radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.55), transparent 55%),
                radial-gradient(80% 80% at 80% 120%, rgba(0,0,0,0.28), transparent 60%);
              mix-blend-mode: overlay;
            }
            .wcc-cta-holo > .wcc-cta-inner { position:relative; z-index:2; border-radius: inherit; }
            @media (prefers-reduced-motion: reduce) {
              .wcc-3d:hover::after, .wcc-grad-anim:hover, .wcc-conic-ring:hover::before, .wcc-3d:active, .wcc-3d-red:active,
              .wcc-cta-holo, .wcc-cta-holo:hover, .wcc-cta-holo:hover::before { animation: none !important; }
            }

          `}</style>

          {/* HERO */}
          <div className="relative">
            <div
              className="h-[168px] w-full"
              style={{ background: `linear-gradient(135deg, ${SAGE} 0%, ${DEEP} 100%)` }}
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 pt-2">
              <motion.button
                whileTap={reduce ? undefined : { scale: 0.9 }}
                onClick={() => navigate({ to: "/doctors" })}
                aria-label="Back"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/25 backdrop-blur"
              >
                <ArrowLeft size={18} color="#FFFFFF" />
              </motion.button>
              <motion.button
                whileTap={reduce ? undefined : { scale: 0.9 }}
                aria-label="Share"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/25 backdrop-blur"
              >
                <Share2 size={17} color="#FFFFFF" />
              </motion.button>
            </div>

            {/* Photo */}
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 112 }}>
              <div className="relative h-24 w-24">
                <div
                  className="h-24 w-24 overflow-hidden rounded-full"
                  style={{ boxShadow: "0 8px 20px -8px rgba(0,0,0,0.35)", border: "3px solid #FFFFFF" }}
                >
                  <Img
                    src={doctor.photo}
                    alt={doctor.name}
                    wrapperClassName="h-full w-full"
                    rounded="rounded-full"
                  />
                </div>
                <motion.span
                  aria-label="Verified"
                  initial={reduce ? false : { scale: 0, rotate: -20 }}
                  animate={reduce ? undefined : { scale: [0, 1.25, 1], rotate: [0, 0, 0] }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                  className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <BadgeCheck size={20} color={SAGE} fill={SAGE} strokeWidth={0} />
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={reduce ? undefined : { opacity: [0, 0.6, 0] }}
                    transition={{ duration: 1.1, delay: 0.4 }}
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
                    }}
                  />
                </motion.span>
              </div>
            </div>
          </div>

          {/* Name block */}
          <div className="mt-14 px-4 text-center">
            <div className="text-[20px] font-bold" style={{ color: INK }}>
              {doctor.name}
            </div>
            <div className="mt-0.5 text-[13px]" style={{ color: MUTED }}>
              {doctor.specialty} · {doctor.years} years experience
            </div>
          </div>

          {/* Stat pills */}
          <div className="mt-3 flex justify-center gap-2 px-4">
            {[
              { icon: <Star size={12} fill={SAGE} color={SAGE} />, label: `${doctor.rating} rating` },
              { icon: <Heart size={12} color={SAGE} />, label: extras.patients },
              { icon: <BadgeCheck size={12} color={SAGE} />, label: `${doctor.years} yrs exp` },
            ].map((p, i) => (
              <motion.div
                key={p.label}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
                className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                style={{ backgroundColor: MIST, color: INK }}
              >
                {p.icon}
                {p.label}
              </motion.div>
            ))}
          </div>

          {/* Action row */}
          <div className="mt-4 flex items-center justify-center gap-3 px-4" style={{ perspective: 600 }}>
            <ActionCircle icon={<MessageCircle size={18} />} label="Chat" reduce={!!reduce} />
            <ActionCircle icon={<Phone size={18} />} label="Audio" reduce={!!reduce} />
            <motion.button
              onClick={() => {
                setFav((v) => !v);
                setFavTap((n) => n + 1);
              }}
              whileHover={reduce ? undefined : { scale: 1.1, y: -3, rotateX: 10, rotateY: -10 }}
              whileTap={reduce ? undefined : { scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              aria-label="Favourite"
              className={`wcc-3d wcc-conic-ring ${fav ? "wcc-3d-red" : ""} wcc-grad-anim relative grid h-11 w-11 place-items-center overflow-hidden rounded-full`}
              style={{
                transformStyle: "preserve-3d",
                border: `1.5px solid ${fav ? RED : SAGE}`,
                background: fav
                  ? `linear-gradient(135deg, ${RED} 0%, ${RED_DEEP} 100%)`
                  : "linear-gradient(135deg, #FFFFFF 0%, #F6F8F6 100%)",
                boxShadow: fav
                  ? "0 10px 20px -8px rgba(239,68,68,0.55), inset 0 1px 0 rgba(255,255,255,0.35)"
                  : "0 4px 10px -6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <motion.span
                key={favTap}
                animate={reduce || favTap === 0 ? undefined : { scale: [1, 1.5, 1] }}
                transition={{ duration: 0.4 }}
                className="relative z-10 grid place-items-center"
              >
                <Heart
                  size={18}
                  color={fav ? "#FFFFFF" : SAGE}
                  fill={fav ? "#FFFFFF" : "transparent"}
                />
              </motion.span>
              {fav && !reduce && (
                <motion.span
                  key={`ripple-${favTap}`}
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 60%)" }}
                />
              )}
            </motion.button>
          </div>


          {/* ABOUT */}
          <div className="mt-5 px-4">
            <div className="text-[16px] font-semibold" style={{ color: INK }}>
              About
            </div>
            <motion.div
              layout
              transition={{ duration: 0.3 }}
              className="mt-1.5 overflow-hidden text-[13.5px] leading-[1.55]"
              style={{
                color: MUTED,
                maxHeight: expanded ? 400 : 66,
              }}
            >
              {extras.bio}
            </motion.div>
            <motion.button
              whileTap={reduce ? undefined : { scale: 0.96 }}
              onClick={() => setExpanded((v) => !v)}
              className="mt-1 text-[12.5px] font-semibold"
              style={{ color: ORANGE }}
            >
              {expanded ? "Show less" : "Read more"}
            </motion.button>
          </div>

          {/* SEGMENTED TABS */}
          <div className="mt-5 px-4">
            <LayoutGroup id="wcc-profile-tabs">
              <div
                className="relative flex rounded-full p-1"
                style={{ backgroundColor: MIST }}
              >
                {(["experience", "reviews", "location"] as TabKey[]).map((k) => {
                  const active = tab === k;
                  return (
                    <motion.button
                      key={k}
                      onClick={() => setTab(k)}
                      whileHover={reduce || active ? undefined : { scale: 1.04, y: -1, rotateX: 6 }}
                      whileTap={reduce ? undefined : { scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      className="wcc-3d wcc-grad-anim group relative flex-1 overflow-hidden rounded-full py-2 text-[12.5px] font-semibold"
                      style={{ color: active ? "#FFFFFF" : INK, transformStyle: "preserve-3d" }}
                    >
                      {active && (
                        <motion.span
                          layoutId="wcc-tab-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${SAGE} 0%, ${DEEP} 100%)`,
                            boxShadow: "0 6px 14px -6px rgba(86,114,87,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
                          }}
                        />
                      )}
                      {!active && (
                        <span
                          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background: `linear-gradient(135deg, rgba(86,114,87,0.14) 0%, rgba(60,79,61,0.10) 100%)`,
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
                          }}
                        />
                      )}
                      <span className="relative capitalize">{k}</span>
                    </motion.button>
                  );
                })}
              </div>
            </LayoutGroup>

            <div className="mt-3 min-h-[160px]">
              <AnimatePresence mode="wait">
                {tab === "experience" && (
                  <motion.div
                    key="exp"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="relative pl-6"
                  >
                    <motion.span
                      aria-hidden
                      initial={reduce ? false : { scaleY: 0 }}
                      animate={reduce ? undefined : { scaleY: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute left-[7px] top-1 w-0.5 origin-top rounded-full"
                      style={{ backgroundColor: "#DDE6DD", height: "calc(100% - 8px)" }}
                    />
                    <div className="flex flex-col gap-3">
                      {extras.timeline.map((t, i) => (
                        <motion.div
                          key={i}
                          initial={reduce ? false : { opacity: 0, x: -6 }}
                          animate={reduce ? undefined : { opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.1, duration: 0.3 }}
                          className="relative"
                        >
                          <span
                            className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full"
                            style={{
                              backgroundColor: SAGE,
                              boxShadow: "0 0 0 3px #FFFFFF, 0 0 0 4.5px #DDE6DD",
                            }}
                          />
                          <div className="text-[11.5px] font-semibold" style={{ color: SAGE }}>
                            {t.year}
                          </div>
                          <div className="text-[13.5px] font-semibold" style={{ color: INK }}>
                            {t.title}
                          </div>
                          <div className="text-[12px]" style={{ color: MUTED }}>
                            {t.place}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {tab === "reviews" && (
                  <motion.div
                    key="rev"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-2.5"
                  >
                    {extras.reviews.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={reduce ? undefined : { opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 * i, duration: 0.25 }}
                        className="rounded-2xl border p-3"
                        style={{ borderColor: "#EEF1EE", backgroundColor: "#FFFFFF" }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold"
                            style={{ backgroundColor: MIST, color: SAGE }}
                          >
                            {r.initials}
                          </div>
                          <div className="flex-1">
                            <div className="text-[13px] font-semibold" style={{ color: INK }}>
                              {r.name}
                            </div>
                            <div className="mt-0.5 flex gap-0.5">
                              {[0, 1, 2, 3, 4].map((k) => (
                                <motion.span
                                  key={k}
                                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                                  animate={reduce ? undefined : { scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.1 + k * 0.06, duration: 0.2 }}
                                >
                                  <Star
                                    size={11}
                                    color={k < r.rating ? ORANGE : "#CBD5C7"}
                                    fill={k < r.rating ? ORANGE : "#CBD5C7"}
                                  />
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-[12.5px] leading-[1.5]" style={{ color: MUTED }}>
                          {r.text}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {tab === "location" && (
                  <motion.div
                    key="loc"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-2"
                  >
                    <div
                      className="relative h-36 w-full overflow-hidden rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${MIST} 0%, #E4ECE4 100%)`,
                      }}
                    >
                      <svg
                        viewBox="0 0 300 140"
                        className="absolute inset-0 h-full w-full opacity-70"
                      >
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#C4D2C4" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="300" height="140" fill="url(#grid)" />
                        <path
                          d="M0,70 Q80,40 150,80 T300,50"
                          stroke={SAGE}
                          strokeWidth="2"
                          fill="none"
                          opacity="0.55"
                        />
                        <path
                          d="M40,140 L100,80 L180,110 L260,60"
                          stroke={SAGE}
                          strokeWidth="1.5"
                          fill="none"
                          opacity="0.4"
                        />
                      </svg>
                      <motion.button
                        initial={reduce ? false : { scale: 0, y: -6 }}
                        animate={
                          reduce
                            ? undefined
                            : { scale: 1, y: [0, -4, 0] }
                        }
                        transition={{
                          scale: { type: "spring", stiffness: 350, damping: 16, delay: 0.15 },
                          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                        }}
                        whileHover={reduce ? undefined : { scale: 1.2, rotateX: 12, rotateY: -12 }}
                        whileTap={reduce ? undefined : { scale: 0.92 }}
                        aria-label={extras.clinic.name}
                        className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"
                        style={{ transformStyle: "preserve-3d", perspective: 600 }}
                      >
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 -z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${SAGE}55 0%, transparent 70%)`,
                            animation: reduce ? undefined : "wcc-pin-pulse 1.8s ease-out infinite",
                          }}
                        />
                        <div
                          className="grid h-9 w-9 place-items-center rounded-full transition-shadow duration-300 group-hover:shadow-[0_14px_28px_-8px_rgba(86,114,87,0.75)]"
                          style={{
                            background: `linear-gradient(135deg, ${SAGE} 0%, ${DEEP} 100%)`,
                            boxShadow: "0 6px 14px -4px rgba(86,114,87,0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
                          }}
                        >
                          <MapPin size={18} color="#FFFFFF" />
                        </div>
                      </motion.button>
                      <style>{`@keyframes wcc-pin-pulse{0%{transform:translate(-50%,-50%) scale(0.6);opacity:0.8}100%{transform:translate(-50%,-50%) scale(2.4);opacity:0}}`}</style>
                    </div>
                    <div className="text-[13.5px] font-semibold" style={{ color: INK }}>
                      {extras.clinic.name}
                    </div>
                    <div className="text-[12.5px]" style={{ color: MUTED }}>
                      {extras.clinic.address}
                    </div>
                    <motion.button
                      whileTap={reduce ? undefined : { scale: 0.96 }}
                      className="self-start text-[12.5px] font-semibold"
                      style={{ color: ORANGE }}
                    >
                      Open maps →
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* BOOKING */}
          <div className="mt-6 px-4">
            <div className="text-[16px] font-semibold" style={{ color: INK }}>
              Book appointment
            </div>

            {/* Consult type */}
            <div className="mt-3 grid grid-cols-3 items-stretch gap-2" style={{ perspective: 800 }}>
              {consultTypes.map((c) => {
                const active = type === c.key;
                const Icon = c.key === "chat" ? MessageCircle : c.key === "audio" ? Phone : Video;
                return (
                  <motion.button
                    key={c.key}
                    onClick={() => setType(c.key)}
                    whileHover={reduce ? undefined : { y: -3, scale: 1.04, rotateX: 8, rotateY: -6 }}
                    whileTap={reduce ? undefined : { scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="wcc-3d wcc-conic-ring wcc-grad-anim group relative flex h-full min-h-[86px] flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl px-2 py-3"
                    style={{
                      transformStyle: "preserve-3d",
                      background: active
                        ? `linear-gradient(135deg, rgba(86,114,87,0.14) 0%, rgba(60,79,61,0.10) 100%)`
                        : `linear-gradient(135deg, ${MIST} 0%, #E9EEE9 100%)`,
                      border: active ? `2px solid ${SAGE}` : "2px solid transparent",
                      boxShadow: active
                        ? "0 10px 22px -10px rgba(86,114,87,0.55), inset 0 1px 0 rgba(255,255,255,0.6)"
                        : "0 4px 10px -8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.7)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${SAGE}22 0%, ${DEEP}18 100%)`,
                      }}
                    />
                    {active && !reduce && (
                      <motion.span
                        aria-hidden
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.9, 0] }}
                        transition={{ duration: 0.9 }}
                        className="pointer-events-none absolute inset-0 rounded-2xl"
                        style={{
                          background: `conic-gradient(from 0deg, transparent, ${ORANGE}, transparent 40%)`,
                          WebkitMask:
                            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                          WebkitMaskComposite: "xor" as never,
                          maskComposite: "exclude" as never,
                          padding: 2,
                        }}
                      />
                    )}
                    <Icon size={18} color={active ? SAGE : INK} className="relative z-10" />
                    <div className="relative z-10 text-[12px] font-semibold" style={{ color: INK }}>
                      {c.label}
                    </div>
                    <div className="relative z-10 text-[11px] font-bold" style={{ color: SAGE }}>
                      CA${c.priceCad}
                    </div>
                  </motion.button>
                );
              })}
            </div>


            {/* Date strip */}
            <div className="mt-4">
              <div className="mb-2 text-[13px] font-semibold" style={{ color: INK }}>
                Select date
              </div>
              <LayoutGroup id="wcc-date-strip">
                <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]" style={{ perspective: 800 }}>
                  {dates.map((d) => {
                    const active = date === d.key;
                    return (
                      <motion.button
                        key={d.key}
                        onClick={() => setDate(d.key)}
                        whileHover={reduce || active ? undefined : { y: -3, scale: 1.06, rotateX: 8 }}
                        whileTap={reduce ? undefined : { scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 320, damping: 20 }}
                        className="wcc-3d wcc-grad-anim group relative shrink-0 overflow-hidden rounded-2xl px-3 py-2 text-center"
                        style={{ minWidth: 62, color: active ? "#FFFFFF" : INK, transformStyle: "preserve-3d" }}
                      >
                        {active ? (
                          <motion.span
                            layoutId="wcc-date-active"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              background: `linear-gradient(135deg, ${SAGE} 0%, ${DEEP} 100%)`,
                              boxShadow: "0 6px 14px -6px rgba(86,114,87,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
                            }}
                          />
                        ) : (
                          <>
                            <span
                              className="absolute inset-0 rounded-2xl"
                              style={{ background: `linear-gradient(135deg, ${MIST} 0%, #E9EEE9 100%)` }}
                            />
                            <span
                              aria-hidden
                              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                              style={{ background: `linear-gradient(135deg, ${SAGE}22 0%, ${DEEP}18 100%)` }}
                            />
                          </>
                        )}
                        <span className="relative block text-[11.5px] font-semibold">
                          {d.label}
                        </span>
                        <span
                          className="relative block text-[11px]"
                          style={{ color: active ? "rgba(255,255,255,0.85)" : MUTED }}
                        >
                          {d.sub}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            {/* Slots */}
            <div className="mt-4">
              <div className="mb-2 text-[13px] font-semibold" style={{ color: INK }}>
                Available slots
              </div>
              <div className="grid grid-cols-3 gap-2" style={{ perspective: 800 }}>
                {defaultTimeSlots.map((s, i) => {
                  const disabled = disabledSlotIndices.includes(i);
                  const active = slot === s;
                  return (
                    <motion.button
                      key={s}
                      disabled={disabled}
                      onClick={() => !disabled && setSlot(s)}
                      whileHover={reduce || disabled || active ? undefined : { y: -2, scale: 1.05, rotateX: 6 }}
                      whileTap={reduce || disabled ? undefined : { scale: 0.92 }}
                      animate={
                        active && !reduce
                          ? { scale: [1, 0.9, 1.08, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.35 }}
                      className="wcc-3d wcc-grad-anim group relative overflow-hidden rounded-xl py-2 text-[12px] font-semibold"
                      style={{
                        transformStyle: "preserve-3d",
                        background: disabled
                          ? "#F0F1F0"
                          : active
                            ? `linear-gradient(135deg, ${SAGE} 0%, ${DEEP} 100%)`
                            : `linear-gradient(135deg, ${MIST} 0%, #E9EEE9 100%)`,
                        color: disabled ? "#B0B4B0" : active ? "#FFFFFF" : INK,
                        textDecoration: disabled ? "line-through" : "none",
                        cursor: disabled ? "not-allowed" : "pointer",
                        boxShadow: active
                          ? "0 8px 16px -8px rgba(86,114,87,0.55), inset 0 1px 0 rgba(255,255,255,0.25)"
                          : "0 3px 8px -6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
                      }}
                    >
                      {!disabled && !active && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ background: `linear-gradient(135deg, ${SAGE}22 0%, ${DEEP}18 100%)` }}
                        />
                      )}
                      <span className="relative">{s}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky bottom CTA (above tab bar) */}
        <div
          className="absolute inset-x-0 z-10 border-t bg-white px-4 pb-2 pt-3"
          style={{ bottom: 84, borderColor: "#EEF1EE" }}
        >
          <div className="flex items-center gap-3" style={{ perspective: 900 }}>
            <div className="flex shrink-0 flex-col justify-center leading-tight">
              <span className="text-[13px] font-bold" style={{ color: MUTED }}>
                Total
              </span>
              <span className="text-[18px] font-bold" style={{ color: INK }}>
                CA${total}
              </span>
            </div>
            <motion.button
              disabled={!canBook}
              onClick={handleConfirm}
              whileHover={
                reduce || !canBook
                  ? undefined
                  : { scale: 1.04, y: -2, rotateX: 8, rotateY: -6 }
              }
              whileTap={reduce || !canBook ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="wcc-3d wcc-conic-ring wcc-grad-anim group relative inline-flex h-11 flex-1 items-center justify-center overflow-hidden rounded-full px-6 text-[14px] font-bold"
              style={{
                transformStyle: "preserve-3d",
                background: canBook
                  ? `linear-gradient(135deg, ${SAGE} 0%, ${DEEP} 50%, ${SAGE} 100%)`
                  : "#DCE0DC",
                backgroundSize: canBook ? "200% 200%" : undefined,
                backgroundPosition: canBook ? "0% 50%" : undefined,
                color: canBook ? "#FFFFFF" : "#8A918A",
                boxShadow: canBook
                  ? "0 12px 24px -10px rgba(86,114,87,0.65), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.12)"
                  : "none",
                cursor: canBook ? "pointer" : "not-allowed",
                transition: "background-position 600ms ease",
              }}
              onMouseEnter={(e) => {
                if (canBook) (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "100% 50%";
              }}
              onMouseLeave={(e) => {
                if (canBook) (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "0% 50%";
              }}
            >
              <span className="relative z-10 inline-flex items-center justify-center">Confirm Booking</span>
              {canBook && !reduce && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                  }}
                />
              )}
            </motion.button>
          </div>
        </div>

        <BottomTabBar activeTab="doctors" />

        {/* Confirmation sheet */}
        <AnimatePresence>
          {confirmOpen && (
            <ConfirmSheet
              reduce={!!reduce}
              onDone={goHome}
              onClose={() => setConfirmOpen(false)}
              summary={{
                doctor: doctor.name,
                type: consultTypes.find((c) => c.key === type)?.label ?? "",
                date: dates.find((d) => d.key === date)?.label ?? "",
                slot: slot ?? "",
                total,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </PhoneViewport>
  );
}

function ActionCircle({
  icon,
  label,
  reduce,
}: {
  icon: React.ReactNode;
  label: string;
  reduce: boolean;
}) {
  const [hover, setHover] = useState(false);
  const styledIcon = isValidElement<{ color?: string }>(icon)
    ? cloneElement(icon, { color: hover ? "#FFFFFF" : SAGE })
    : icon;
  return (
    <motion.button
      whileHover={reduce ? undefined : { scale: 1.1, y: -3, rotateX: 10, rotateY: -10 }}
      whileTap={reduce ? undefined : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      aria-label={label}
      className="wcc-3d wcc-conic-ring wcc-grad-anim relative grid h-11 w-11 place-items-center overflow-hidden rounded-full"
      style={{
        transformStyle: "preserve-3d",
        border: `1.5px solid ${SAGE}`,
        background: hover
          ? `linear-gradient(135deg, ${SAGE} 0%, ${DEEP} 100%)`
          : "linear-gradient(135deg, #FFFFFF 0%, #F6F8F6 100%)",
        boxShadow: hover
          ? "0 10px 20px -8px rgba(86,114,87,0.55), inset 0 1px 0 rgba(255,255,255,0.35)"
          : "0 4px 10px -6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.7)",
        transition: "background 250ms, box-shadow 250ms",
      }}
    >
      <span className="relative z-10">{styledIcon}</span>
    </motion.button>
  );
}

function ConfirmSheet({
  reduce,
  onDone,
  onClose,
  summary,
}: {
  reduce: boolean;
  onDone: () => void;
  onClose: () => void;
  summary: { doctor: string; type: string; date: string; slot: string; total: number };
}) {
  const confetti = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: 10 + Math.random() * 80,
    delay: Math.random() * 0.25,
    color: i % 2 === 0 ? SAGE : ORANGE,
    x: (Math.random() - 0.5) * 40,
  }));

  return (
    <>
      <motion.div
        key="cov"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="absolute inset-0 z-40 bg-black/45"
      />
      <motion.div
        key="csh"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="absolute inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white p-5 pb-6"
        style={{ boxShadow: "0 -12px 30px -12px rgba(0,0,0,0.25)" }}
      >
        <div
          className="mx-auto mb-4 h-1 w-10 rounded-full"
          style={{ backgroundColor: "#DDE2DD" }}
        />
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full"
          style={{ backgroundColor: MIST }}
        >
          <X size={14} color={INK} />
        </button>

        {/* Confetti */}
        {!reduce &&
          confetti.map((c) => (
            <motion.span
              key={c.id}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 220, x: c.x, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.4, delay: c.delay, ease: "easeIn" }}
              className="pointer-events-none absolute h-1.5 w-1.5 rounded-sm"
              style={{ left: `${c.left}%`, top: 0, backgroundColor: c.color }}
            />
          ))}

        <div className="flex flex-col items-center">
          <motion.div
            initial={reduce ? false : { scale: 0 }}
            animate={reduce ? undefined : { scale: [0, 1.15, 1] }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid h-16 w-16 place-items-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${SAGE} 0%, ${DEEP} 100%)`,
              boxShadow: "0 12px 24px -12px rgba(86,114,87,0.6)",
            }}
          >
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
              <motion.path
                d="M5 12.5 L10 17.5 L19 7.5"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
          <div className="mt-3 text-[18px] font-bold" style={{ color: INK }}>
            Appointment booked!
          </div>
          <div className="mt-2 rounded-xl px-3 py-2 text-center text-[12.5px]" style={{ backgroundColor: MIST, color: INK }}>
            <div className="font-semibold">{summary.doctor}</div>
            <div style={{ color: MUTED }}>
              {summary.type} · {summary.date} · {summary.slot}
            </div>
            <div className="mt-0.5 font-semibold" style={{ color: SAGE }}>
              CA${summary.total}
            </div>
          </div>

          <div className="mt-4 flex w-full gap-2">
            <motion.button
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-3 text-[13px] font-semibold"
              style={{ border: `1.5px solid ${SAGE}`, color: SAGE }}
            >
              <Calendar size={14} />
              Add to calendar
            </motion.button>
            <motion.button
              whileTap={reduce ? undefined : { scale: 0.97 }}
              onClick={onDone}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-3 text-[13px] font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${SAGE} 0%, ${DEEP} 100%)`,
                boxShadow: "0 10px 20px -10px rgba(86,114,87,0.6)",
              }}
            >
              <Check size={14} />
              Done
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
