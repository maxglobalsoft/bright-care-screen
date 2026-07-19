import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import logoAsset from "@/assets/wcc-logo-v2.png.asset.json";

// ── palette (explicit hex, no tokens) ─────────────────────────────
const NIGHT = "#23291F";
const DAWN = "#3C4F3D";
const SAGE = "#567257";
const ORANGE = "#E8912D";
const MIST = "#F3F6F2";
const WHITE = "#FFFFFF";

// ── timeline (seconds) ────────────────────────────────────────────
const T = {
  ACT1_END: 0.6,
  ACT2_END: 1.2,
  ACT3_END: 1.8,
  ACT4_END: 2.4,
  ACT5_END: 2.8,
};

// ECG spike is at exact horizontal center (x=195 of 390)
const ECG_PATH =
  "M0,80 L60,80 L80,80 L95,72 L110,88 L125,80 L160,80 L180,80 L188,80 L192,20 L198,140 L204,50 L210,80 L230,80 L260,80 L280,72 L295,88 L310,80 L340,80 L390,80";

type Mote = { id: number; fromX: number; fromY: number; size: number; color: string; delay: number };

export function SplashScreen() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [skipped, setSkipped] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  const motes = useMemo<Mote[]>(() => {
    const arr: Mote[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 260 + Math.random() * 140;
      arr.push({
        id: i,
        fromX: Math.cos(angle) * dist,
        fromY: Math.sin(angle) * dist,
        size: 3 + Math.random() * 3,
        color: i % 2 === 0 ? ORANGE : MIST,
        delay: Math.random() * 0.25,
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    const total = reduced ? 1200 : T.ACT5_END * 1000;
    const skipT = setTimeout(() => setCanSkip(true), 1200);
    const navT = setTimeout(() => navigate({ to: "/home" }), total);
    return () => {
      clearTimeout(skipT);
      clearTimeout(navT);
    };
  }, [navigate, reduced]);

  const handleSkip = () => {
    if (!canSkip || skipped) return;
    setSkipped(true);
    navigate({ to: "/home" });
  };

  // ── reduced motion fallback ────────────────────────────────────
  if (reduced) {
    return (
      <div
        className="relative flex h-full w-full items-center justify-center"
        style={{ background: DAWN }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <img src={logoAsset.url} alt="WellnessCareConnect" style={{ width: "55%", maxWidth: 220 }} />
          <div style={{ color: WHITE, fontSize: 18, fontWeight: 700 }}>
            Wellness<span style={{ color: ORANGE }}>Care</span>Connect
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: NIGHT }}
      onClick={handleSkip}
      role="button"
      aria-label="Skip splash"
    >
      {/* ── ACT 2: dawn bloom flood from spike center ─────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "50%",
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: "50%",
          background: DAWN,
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 60 }}
        transition={{ delay: T.ACT1_END, duration: 0.45, ease: "easeOut" }}
      />

      {/* ── ACT 1: ECG heartbeat line ─────────────────────────── */}
      <motion.svg
        aria-hidden
        viewBox="0 0 390 160"
        className="pointer-events-none absolute left-0 right-0"
        style={{ top: "50%", transform: "translateY(-50%)", width: "100%", height: 160 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: T.ACT1_END, duration: 0.3 }}
      >
        {/* glow duplicate */}
        <motion.path
          d={ECG_PATH}
          fill="none"
          stroke={ORANGE}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "blur(12px)", opacity: 0.35 }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: T.ACT1_END, ease: "easeInOut" }}
        />
        {/* main line */}
        <motion.path
          d={ECG_PATH}
          fill="none"
          stroke={ORANGE}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: T.ACT1_END, ease: "easeInOut" }}
        />
        {/* leading tip dot */}
        <motion.circle
          r={3.5}
          fill={WHITE}
          style={{ filter: `drop-shadow(0 0 6px ${ORANGE})` }}
          initial={{ cx: 0, cy: 80, opacity: 1 }}
          animate={{ cx: 390, cy: 80, opacity: [1, 1, 0] }}
          transition={{ duration: T.ACT1_END, ease: "easeInOut", times: [0, 0.9, 1] }}
        />
      </motion.svg>

      {/* ── ACT 2–5: composition (heart + motes + wordmark) ─── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ scale: 1 }}
        animate={{ scale: 1.035 }}
        transition={{ delay: T.ACT4_END, duration: 0.4, ease: "easeOut" }}
      >
        {/* motes converging */}
        {motes.map((m) => (
          <motion.span
            key={m.id}
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left: "50%",
              top: "42%",
              width: m.size,
              height: m.size,
              backgroundColor: m.color,
              marginLeft: -m.size / 2,
              marginTop: -m.size / 2,
              boxShadow: `0 0 6px ${m.color}`,
            }}
            initial={{ x: m.fromX, y: m.fromY, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: [0, 0.8, 0] }}
            transition={{
              delay: T.ACT1_END + 0.05 + m.delay,
              duration: 0.5,
              ease: "easeIn",
              times: [0, 0.5, 1],
            }}
          />
        ))}

        {/* heart logo wrapper */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: "55%", aspectRatio: "1/1", marginTop: "-8%" }}
        >
          {/* echo rings (Act 3) */}
          {[0, 0.14].map((d, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute rounded-full"
              style={{
                inset: 0,
                border: `1.5px solid ${ORANGE}`,
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.9, opacity: [0, 0.45, 0] }}
              transition={{
                delay: T.ACT2_END + d,
                duration: 0.5,
                ease: "easeOut",
                times: [0, 0.2, 1],
              }}
            />
          ))}

          {/* heart born + double-thump */}
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{
              scale: [0.2, 1.06, 1, 1.05, 0.98, 1.03, 1],
              opacity: [0, 1, 1, 1, 1, 1, 1],
            }}
            transition={{
              delay: T.ACT1_END,
              duration: 1.2,
              times: [0, 0.4, 0.5, 0.65, 0.78, 0.9, 1],
              ease: "easeOut",
            }}
            style={{ transformOrigin: "center" }}
          >
            <img
              src={logoAsset.url}
              alt="WellnessCareConnect"
              draggable={false}
              className="h-full w-full select-none object-contain"
              style={{ filter: `drop-shadow(0 10px 22px rgba(0,0,0,0.35))` }}
            />

            {/* light sweep clipped to logo bounds */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{
                WebkitMaskImage: `url(${logoAsset.url})`,
                maskImage: `url(${logoAsset.url})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            >
              <motion.span
                className="absolute top-0 h-full"
                style={{
                  width: "28%",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 100%)",
                  transform: "rotate(-20deg)",
                }}
                initial={{ left: "-40%", opacity: 0 }}
                animate={{ left: "110%", opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: T.ACT2_END + 0.35,
                  duration: 0.45,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.9, 1],
                }}
              />
            </span>
          </motion.div>
        </div>

        {/* ── ACT 4: wordmark letter cascade ─────────────────── */}
        <div className="mt-6 flex flex-col items-center" style={{ minHeight: 80 }}>
          <Wordmark startDelay={T.ACT3_END} />

          {/* slogan */}
          <motion.div
            style={{
              color: MIST,
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0, letterSpacing: "0.35em" }}
            animate={{ opacity: 1, letterSpacing: "0.18em" }}
            transition={{ delay: T.ACT3_END + 0.35, duration: 0.4, ease: "easeOut" }}
            className="mt-3"
          >
            Every Health Matters
          </motion.div>

          {/* progress shimmer */}
          <div
            className="relative mt-3 overflow-hidden"
            style={{ width: 64, height: 2, background: "rgba(255,255,255,0.12)", borderRadius: 2 }}
          >
            <motion.span
              className="absolute top-0 h-full"
              style={{ width: 24, background: ORANGE, borderRadius: 2 }}
              initial={{ left: "-30%" }}
              animate={{ left: "110%" }}
              transition={{ delay: T.ACT3_END + 0.4, duration: 0.55, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── ACT 5: mist exhale ─────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: MIST }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: T.ACT4_END + 0.05, duration: 0.35, ease: "easeIn" }}
      />
    </div>
  );
}

function Wordmark({ startDelay }: { startDelay: number }) {
  // "WellnessCareConnect" with "Care" in orange
  const parts: Array<{ text: string; color: string }> = [
    { text: "Wellness", color: WHITE },
    { text: "Care", color: ORANGE },
    { text: "Connect", color: WHITE },
  ];
  let index = 0;
  return (
    <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.01em", display: "flex" }}>
      {parts.map((p, pi) => (
        <span key={pi} style={{ display: "inline-flex" }}>
          {p.text.split("").map((ch) => {
            const i = index++;
            return (
              <motion.span
                key={`${pi}-${i}`}
                style={{ color: p.color, display: "inline-block" }}
                initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  delay: startDelay + i * 0.022,
                  duration: 0.35,
                  ease: "easeOut",
                }}
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
