import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Mic, MicOff, Video, VideoOff, Wifi, ShieldCheck, User } from "lucide-react";
import { PedestalButton } from "@/mobile/components/PedestalButton";

const specialties = [
  { key: "general", label: "General Physician", wait: "~2 min" },
  { key: "pediatrics", label: "Pediatrics", wait: "~4 min" },
  { key: "cardiology", label: "Cardiology", wait: "~6 min" },
  { key: "dermatology", label: "Dermatology", wait: "~3 min" },
  { key: "mental", label: "Mental Health", wait: "~5 min" },
];

export function VideoLobbyScreen() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [spec, setSpec] = useState("general");
  const [level, setLevel] = useState(0.3);

  useEffect(() => {
    if (!micOn || reduce) return;
    const t = setInterval(() => setLevel(0.25 + Math.random() * 0.55), 220);
    return () => clearInterval(t);
  }, [micOn, reduce]);

  const active = specialties.find((s) => s.key === spec)!;

  return (
    <div className="relative flex h-full w-full flex-col" style={{ backgroundColor: "#0E1F17" }}>
      <div className="h-11 shrink-0" />
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-3 pt-1">
        <motion.button
          whileTap={reduce ? undefined : { scale: 0.9 }}
          onClick={() => navigate({ to: "/home" })}
          aria-label="Back"
          className="grid h-9 w-9 place-items-center rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        >
          <ArrowLeft size={18} color="#FFFFFF" />
        </motion.button>
        <div className="text-[14px] font-bold" style={{ color: "#FFFFFF" }}>Video Consultation</div>
        <div className="flex h-9 w-9 items-center justify-center gap-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
          <Wifi size={14} color="#8FE0B7" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6" style={{ scrollbarWidth: "none" }}>
        {/* Camera preview stage */}
        <div
          className="relative mx-auto mt-2 overflow-hidden rounded-[28px]"
          style={{
            aspectRatio: "3 / 4",
            background:
              "radial-gradient(120% 90% at 50% 20%, #2B4A3A 0%, #14291F 55%, #0B1B14 100%)",
            boxShadow: "0 20px 40px -18px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* corner brackets */}
          {[
            { top: 10, left: 10, borderTop: 2, borderLeft: 2 },
            { top: 10, right: 10, borderTop: 2, borderRight: 2 },
            { bottom: 10, left: 10, borderBottom: 2, borderLeft: 2 },
            { bottom: 10, right: 10, borderBottom: 2, borderRight: 2 },
          ].map((s, i) => (
            <div
              key={i}
              className="pointer-events-none absolute h-6 w-6 rounded-[6px]"
              style={{ ...s, borderColor: "rgba(201,162,75,0.75)", borderStyle: "solid" }}
            />
          ))}

          {/* Live badge */}
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-2.5 py-1"
               style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
            <motion.span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "#EF4444" }}
              animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[10px] font-bold tracking-wider" style={{ color: "#FFFFFF" }}>PREVIEW</span>
          </div>

          {/* Silhouette */}
          <div className="absolute inset-0 grid place-items-center">
            {camOn ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
              >
                {/* pulsing rings */}
                {!reduce && (
                  <>
                    <motion.div
                      className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ border: "1px solid rgba(201,162,75,0.35)" }}
                      animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.6, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ border: "1px solid rgba(143,224,183,0.35)" }}
                      animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.6, repeat: Infinity, delay: 0.9 }}
                    />
                  </>
                )}
                <div
                  className="relative grid h-32 w-32 place-items-center rounded-full text-[42px] font-bold"
                  style={{
                    background: "linear-gradient(135deg,#2E6B53 0%,#1F4A3A 100%)",
                    color: "#FFFFFF",
                    border: "3px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.6)",
                  }}
                >
                  PS
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="grid h-20 w-20 place-items-center rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <VideoOff size={30} color="#9AA39A" />
                </div>
                <div className="text-[12px]" style={{ color: "#9AA39A" }}>Camera off</div>
              </div>
            )}
          </div>

          {/* Mic level meter (bottom bar) */}
          <div className="absolute inset-x-6 bottom-16 flex items-end justify-center gap-1">
            {Array.from({ length: 20 }).map((_, i) => {
              const t = i / 19;
              const active = micOn && t < level + 0.1;
              return (
                <motion.span
                  key={i}
                  className="w-1 rounded-full"
                  animate={{ height: active ? 6 + (1 - Math.abs(t - 0.5) * 2) * 22 : 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  style={{
                    backgroundColor: active
                      ? t < 0.7
                        ? "#8FE0B7"
                        : t < 0.9
                          ? "#E8912D"
                          : "#EF4444"
                      : "rgba(255,255,255,0.14)",
                  }}
                />
              );
            })}
          </div>

          {/* Toggle controls */}
          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3">
            <motion.button
              whileTap={reduce ? undefined : { scale: 0.9 }}
              onClick={() => setMicOn((v) => !v)}
              aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
              className="grid h-11 w-11 place-items-center rounded-full"
              style={{
                backgroundColor: micOn ? "rgba(255,255,255,0.16)" : "#DC4B4B",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {micOn ? <Mic size={18} color="#FFFFFF" /> : <MicOff size={18} color="#FFFFFF" />}
            </motion.button>
            <motion.button
              whileTap={reduce ? undefined : { scale: 0.9 }}
              onClick={() => setCamOn((v) => !v)}
              aria-label={camOn ? "Turn camera off" : "Turn camera on"}
              className="grid h-11 w-11 place-items-center rounded-full"
              style={{
                backgroundColor: camOn ? "rgba(255,255,255,0.16)" : "#DC4B4B",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {camOn ? <Video size={18} color="#FFFFFF" /> : <VideoOff size={18} color="#FFFFFF" />}
            </motion.button>
          </div>
        </div>

        {/* Specialty picker */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[12px] font-semibold tracking-wider" style={{ color: "#9AA39A" }}>SPECIALTY</div>
            <div className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ backgroundColor: "rgba(143,224,183,0.15)" }}>
              <User size={11} color="#8FE0B7" />
              <span className="text-[10.5px] font-semibold" style={{ color: "#8FE0B7" }}>{active.wait} wait</span>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {specialties.map((s) => {
              const on = s.key === spec;
              return (
                <motion.button
                  key={s.key}
                  whileTap={reduce ? undefined : { scale: 0.94 }}
                  onClick={() => setSpec(s.key)}
                  className="shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
                  style={{
                    backgroundColor: on ? "#E8912D" : "rgba(255,255,255,0.08)",
                    color: on ? "#FFFFFF" : "#D6E0D9",
                    border: `1px solid ${on ? "#E8912D" : "rgba(255,255,255,0.14)"}`,
                    boxShadow: on ? "0 6px 14px -8px rgba(232,145,45,0.7)" : "none",
                  }}
                >
                  {s.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Secure notice */}
        <div className="mt-4 flex items-center gap-2 rounded-2xl px-3 py-2.5"
             style={{ backgroundColor: "rgba(143,224,183,0.08)", border: "1px solid rgba(143,224,183,0.18)" }}>
          <ShieldCheck size={16} color="#8FE0B7" />
          <div className="text-[11.5px]" style={{ color: "#D6E0D9" }}>
            End-to-end encrypted. Session is HIPAA-compliant.
          </div>
        </div>

        {/* Connect CTA */}
        <PedestalButton
          onClick={() => navigate({ to: "/video/call" })}
          className="mt-5 h-14 w-full"
        >
          <Video size={16} />
          Connect Now
        </PedestalButton>

        <div className="mt-3 text-center text-[11px]" style={{ color: "#9AA39A" }}>
          Consultation fee CA$ 45 · Refundable if no doctor connects
        </div>
      </div>
    </div>
  );
}
