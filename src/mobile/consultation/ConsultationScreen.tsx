import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Video,
  Paperclip,
  Send,
  FileText,
  Download,
  Image as ImageIcon,
  File as FileIcon,
  Mic,
  MicOff,
  VideoOff,
  MessageSquare,
  Volume2,
  PhoneOff,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { BottomTabBar } from "@/mobile/home/BottomTabBar";
import { Img } from "@/mobile/home/Img";
import { allDoctors } from "@/mobile/doctors/data";

// Literal hex — no tokens, no CSS vars
const SAGE = "#567257";
const DEEP = "#3C4F3D";
const ORANGE = "#E8912D";
const MIST = "#F3F6F2";
const INK = "#23291F";
const MUTED = "#6B7280";
const WHITE = "#FFFFFF";
const RED = "#DC4B4B";

type Msg =
  | { id: string; kind: "doc"; text: string; time: string }
  | { id: string; kind: "me"; text: string; time: string }
  | { id: string; kind: "rx"; time: string }
  | { id: string; kind: "system"; text: string };

const now = () => {
  const d = new Date();
  const h = d.getHours() % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, "0");
  const p = d.getHours() >= 12 ? "PM" : "AM";
  return `${h}:${m} ${p}`;
};

const seed = (): Msg[] => [
  { id: "s1", kind: "doc", text: "Hello! I'm reviewing your booking details now.", time: "10:02 AM" },
  { id: "s2", kind: "doc", text: "Can you describe what you've been feeling over the last few days?", time: "10:02 AM" },
  { id: "s3", kind: "me", text: "Hi doctor. Mild sore throat with a low fever since Sunday.", time: "10:04 AM" },
  { id: "s4", kind: "me", text: "No cough, but a bit of fatigue in the afternoons.", time: "10:04 AM" },
  { id: "s5", kind: "doc", text: "Thanks for sharing. Any allergies or medication you're currently on?", time: "10:05 AM" },
  { id: "s6", kind: "me", text: "No allergies. Just multivitamins.", time: "10:06 AM" },
  { id: "s7", kind: "rx", time: "10:08 AM" },
  { id: "s8", kind: "doc", text: "Take plenty of fluids and rest. I'll follow up tomorrow.", time: "10:08 AM" },
];

export function ConsultationScreen() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const { id } = useParams({ from: "/consultation/$id" });
  const doctor = useMemo(
    () => allDoctors.find((d) => d.id === id) ?? allDoctors[0],
    [id],
  );

  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);

  const threadRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const showToast = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(null), 2000);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const t = now();
    setMessages((m) => [
      ...m,
      { id: `me-${Date.now()}`, kind: "me", text, time: t },
    ]);
    setInput("");
    // typing then doctor reply
    window.setTimeout(() => setTyping(true), 500);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: `doc-${Date.now()}`,
          kind: "doc",
          text: "Thank you for the details. Please continue the medication and rest well.",
          time: now(),
        },
      ]);
    }, 2000);
  };

  return (
    <PhoneViewport>
      <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ backgroundColor: WHITE }}>
        <style>{`
          .wcc-cons-scroll::-webkit-scrollbar{display:none}
          @keyframes wcc-online-pulse {
            0%,100% { box-shadow: 0 0 0 0 rgba(232,145,45,0.55); }
            50% { box-shadow: 0 0 0 6px rgba(232,145,45,0); }
          }
          @keyframes wcc-dot-bounce {
            0%,60%,100% { transform: translateY(0); opacity: 0.5; }
            30% { transform: translateY(-4px); opacity: 1; }
          }
          @keyframes wcc-ring-out {
            0% { transform: scale(0.6); opacity: 0.55; }
            100% { transform: scale(1.9); opacity: 0; }
          }
          .wcc-online-dot { animation: wcc-online-pulse 2s ease-out infinite; }
          .wcc-typing-dot { animation: wcc-dot-bounce 1.2s ease-in-out infinite; }
          .wcc-ring { animation: wcc-ring-out 2s ease-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .wcc-online-dot, .wcc-typing-dot, .wcc-ring { animation: none !important; }
          }
        `}</style>

        {/* status bar spacer */}
        <div className="h-11 shrink-0" style={{ backgroundColor: DEEP }} />

        {/* HEADER */}
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.2, 0.9, 0.25, 1] as [number, number, number, number] }}
          className="relative z-10 shrink-0 px-3 pb-3 pt-2"
          style={{ backgroundColor: DEEP }}
        >
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileTap={reduce ? undefined : { scale: 0.9 }}
              whileHover={reduce ? undefined : { scale: 1.05 }}
              onClick={() => navigate({ to: "/doctor/$id", params: { id: doctor.id } })}
              className="grid h-9 w-9 place-items-center rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", color: WHITE }}
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </motion.button>

            <div className="relative">
              <Img
                src={doctor.photo}
                alt={doctor.name}
                rounded="rounded-full"
                wrapperClassName="h-10 w-10 ring-2"
                className=""
              />
              <span
                className="wcc-online-dot absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full"
                style={{ backgroundColor: ORANGE, border: `2px solid ${DEEP}` }}
              />
            </div>

            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[14px] font-semibold" style={{ color: WHITE }}>
                {doctor.name}
              </div>
              <div className="flex items-center gap-1.5 truncate text-[11px]" style={{ color: "rgba(255,255,255,0.75)" }}>
                <span>{doctor.specialty}</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ORANGE }} />
                  Online
                </span>
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={reduce ? undefined : { scale: 0.9 }}
              whileHover={reduce ? undefined : { scale: 1.06 }}
              onClick={() => setCallOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full"
              style={{
                backgroundColor: ORANGE,
                color: WHITE,
                boxShadow: "0 8px 18px -6px rgba(232,145,45,0.6)",
              }}
              aria-label="Start video call"
            >
              <Video size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* THREAD */}
        <div
          ref={threadRef}
          className="wcc-cons-scroll min-h-0 flex-1 overflow-y-auto px-3 pb-3 pt-4"
          style={{ backgroundColor: WHITE }}
        >
          {/* Date divider */}
          <div className="mb-3 flex justify-center">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-medium"
              style={{ backgroundColor: MIST, color: MUTED }}
            >
              Today
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <AnimatePresence initial={true}>
              {messages.map((m, i) => (
                <MessageRow
                  key={m.id}
                  m={m}
                  index={i}
                  reduce={!!reduce}
                  doctorPhoto={doctor.photo}
                  onDownload={() => showToast("Prescription downloaded ✓")}
                />
              ))}
            </AnimatePresence>

            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-end gap-2"
              >
                <Img
                  src={doctor.photo}
                  alt=""
                  rounded="rounded-full"
                  wrapperClassName="h-6 w-6 shrink-0"
                />
                <div
                  className="flex items-center gap-1 rounded-2xl rounded-bl-md px-3 py-2.5"
                  style={{ backgroundColor: MIST, boxShadow: "0 1px 2px rgba(35,41,31,0.04)" }}
                >
                  {[0, 1, 2].map((k) => (
                    <span
                      key={k}
                      className="wcc-typing-dot inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: MUTED, animationDelay: `${k * 0.15}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="h-2" />
        </div>

        {/* INPUT BAR */}
        <div
          className="relative z-10 shrink-0 px-3 pt-2"
          style={{
            backgroundColor: WHITE,
            borderTop: `1px solid ${MIST}`,
            paddingBottom: "calc(84px + env(safe-area-inset-bottom))",
          }}
        >
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileTap={reduce ? undefined : { scale: 0.9 }}
              whileHover={reduce ? undefined : { scale: 1.06 }}
              onClick={() => setSheetOpen(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
              style={{ color: MUTED }}
              aria-label="Attach"
            >
              <Paperclip size={18} />
            </motion.button>

            <div
              className="flex flex-1 items-center rounded-full px-4"
              style={{ backgroundColor: MIST, height: 40 }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message…"
                className="w-full bg-transparent text-[13.5px] outline-none placeholder:font-normal"
                style={{ color: INK }}
              />
            </div>

            <motion.button
              type="button"
              whileTap={reduce ? undefined : { scale: 0.9 }}
              whileHover={reduce ? undefined : { scale: 1.06 }}
              onClick={sendMessage}
              disabled={!input.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
              style={{
                backgroundColor: ORANGE,
                color: WHITE,
                boxShadow: "0 8px 16px -6px rgba(232,145,45,0.55)",
                opacity: input.trim() ? 1 : 0.55,
              }}
              aria-label="Send message"
            >
              <Send size={16} />
            </motion.button>
          </div>
        </div>

        {/* Bottom tab bar (identical component) */}
        <BottomTabBar activeTab="doctors" />

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key="toast"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 rounded-full px-4 py-2 text-[12.5px] font-semibold"
              style={{
                bottom: 132,
                backgroundColor: DEEP,
                color: WHITE,
                boxShadow: "0 10px 24px -10px rgba(0,0,0,0.35)",
              }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Attachment sheet */}
        <AnimatePresence>
          {sheetOpen && (
            <AttachmentSheet
              reduce={!!reduce}
              onClose={() => setSheetOpen(false)}
              onPick={(label) => {
                setSheetOpen(false);
                showToast(`${label} added ✓`);
              }}
            />
          )}
        </AnimatePresence>

        {/* Video call overlay */}
        <AnimatePresence>
          {callOpen && (
            <VideoCallOverlay
              reduce={!!reduce}
              doctorName={doctor.name}
              doctorSpecialty={doctor.specialty}
              doctorPhoto={doctor.photo}
              onClose={(duration) => {
                setCallOpen(false);
                setMessages((m) => [
                  ...m,
                  {
                    id: `sys-${Date.now()}`,
                    kind: "system",
                    text: `Video call ended · ${duration}`,
                  },
                ]);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </PhoneViewport>
  );
}

/* -------------------------- MESSAGE ROW -------------------------- */

function MessageRow({
  m,
  index,
  reduce,
  doctorPhoto,
  onDownload,
}: {
  m: Msg;
  index: number;
  reduce: boolean;
  doctorPhoto: string;
  onDownload: () => void;
}) {
  const delay = Math.min(index * 0.05, 0.35);
  const enter = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.32, ease: [0.2, 0.9, 0.25, 1] as [number, number, number, number], delay },
      };

  if (m.kind === "system") {
    return (
      <motion.div {...enter} className="my-1 flex justify-center">
        <span
          className="rounded-full px-3 py-1 text-[11px] font-medium"
          style={{ backgroundColor: MIST, color: MUTED }}
        >
          {m.text}
        </span>
      </motion.div>
    );
  }

  if (m.kind === "rx") {
    return (
      <motion.div {...enter} className="flex items-end gap-2">
        <Img
          src={doctorPhoto}
          alt=""
          rounded="rounded-full"
          wrapperClassName="h-6 w-6 shrink-0"
        />
        <div
          className="relative flex-1 overflow-hidden rounded-2xl rounded-bl-md px-3 py-3"
          style={{
            backgroundColor: WHITE,
            boxShadow: "0 4px 14px -6px rgba(35,41,31,0.12), 0 0 0 1px rgba(35,41,31,0.05)",
            borderLeft: `4px solid ${ORANGE}`,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
              style={{ backgroundColor: ORANGE, color: WHITE }}
            >
              <FileText size={16} />
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[13px] font-semibold" style={{ color: INK }}>
                Digital Prescription
              </div>
              <div className="truncate text-[11.5px]" style={{ color: MUTED }}>
                Amoxicillin 500mg — 5 days
              </div>
            </div>
          </div>
          <motion.button
            type="button"
            whileTap={reduce ? undefined : { scale: 0.95 }}
            whileHover={reduce ? undefined : { scale: 1.02 }}
            onClick={onDownload}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-[12.5px] font-semibold"
            style={{
              backgroundColor: SAGE,
              color: WHITE,
              boxShadow: "0 6px 14px -6px rgba(86,114,87,0.55)",
            }}
          >
            <Download size={14} />
            Download PDF
          </motion.button>
          <div className="mt-1.5 text-right text-[10.5px]" style={{ color: MUTED }}>
            {m.time}
          </div>
        </div>
      </motion.div>
    );
  }

  if (m.kind === "doc") {
    return (
      <motion.div {...enter} className="flex items-end gap-2">
        <Img
          src={doctorPhoto}
          alt=""
          rounded="rounded-full"
          wrapperClassName="h-6 w-6 shrink-0"
        />
        <div className="flex max-w-[78%] flex-col">
          <div
            className="rounded-2xl rounded-bl-md px-3.5 py-2 text-[13.5px] leading-snug"
            style={{
              backgroundColor: MIST,
              color: INK,
              boxShadow: "0 1px 2px rgba(35,41,31,0.04)",
            }}
          >
            {m.text}
          </div>
          <div className="mt-0.5 pl-1 text-[10.5px]" style={{ color: MUTED }}>
            {m.time}
          </div>
        </div>
      </motion.div>
    );
  }

  // me
  return (
    <motion.div {...enter} className="flex justify-end">
      <div className="flex max-w-[78%] flex-col items-end">
        <div
          className="rounded-2xl rounded-br-md px-3.5 py-2 text-[13.5px] leading-snug"
          style={{
            backgroundColor: SAGE,
            color: WHITE,
            boxShadow: "0 4px 12px -6px rgba(86,114,87,0.4)",
          }}
        >
          {m.text}
        </div>
        <div className="mt-0.5 pr-1 text-[10.5px]" style={{ color: MUTED }}>
          {m.time}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------- ATTACHMENT SHEET -------------------------- */

function AttachmentSheet({
  reduce,
  onClose,
  onPick,
}: {
  reduce: boolean;
  onClose: () => void;
  onPick: (label: string) => void;
}) {
  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 z-40"
        style={{ backgroundColor: "rgba(35,41,31,0.45)" }}
      />
      <motion.div
        key="sheet"
        initial={reduce ? { opacity: 0 } : { y: 260, opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 260, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="absolute inset-x-0 bottom-0 z-40 rounded-t-3xl p-5"
        style={{
          backgroundColor: WHITE,
          boxShadow: "0 -12px 30px -12px rgba(0,0,0,0.25)",
          paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
        }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full" style={{ backgroundColor: "#E1E6E1" }} />
        <div className="mb-3 text-[15px] font-bold" style={{ color: INK }}>
          Attach
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "Photo", icon: ImageIcon, color: SAGE },
            { key: "Document", icon: FileIcon, color: ORANGE },
          ].map(({ key, icon: Icon, color }) => (
            <motion.button
              key={key}
              type="button"
              whileTap={reduce ? undefined : { scale: 0.96 }}
              whileHover={reduce ? undefined : { scale: 1.02 }}
              onClick={() => onPick(key)}
              className="flex flex-col items-center gap-2 rounded-2xl px-3 py-4"
              style={{ backgroundColor: MIST }}
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-full"
                style={{ backgroundColor: color, color: WHITE }}
              >
                <Icon size={18} />
              </div>
              <span className="text-[12.5px] font-semibold" style={{ color: INK }}>
                {key}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}

/* -------------------------- VIDEO CALL OVERLAY -------------------------- */

function VideoCallOverlay({
  reduce,
  doctorName,
  doctorSpecialty,
  doctorPhoto,
  onClose,
}: {
  reduce: boolean;
  doctorName: string;
  doctorSpecialty: string;
  doctorPhoto: string;
  onClose: (durationLabel: string) => void;
}) {
  const [phase, setPhase] = useState<"connecting" | "live">("connecting");
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("live"), 2500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "live") return;
    const i = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(i);
  }, [phase]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const endCall = () => onClose(fmt(elapsed));

  return (
    <motion.div
      key="call"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.2, 0.9, 0.25, 1] as [number, number, number, number] }}
      className="absolute inset-0 z-50 flex flex-col overflow-hidden"
      style={{
        background:
          phase === "connecting"
            ? DEEP
            : `linear-gradient(160deg, ${DEEP} 0%, ${SAGE} 100%)`,
      }}
    >
      {phase === "connecting" ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="relative grid place-items-center">
            {!reduce &&
              [0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="wcc-ring absolute h-28 w-28 rounded-full"
                  style={{
                    border: `2px solid ${ORANGE}`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            <div className="relative">
              <Img
                src={doctorPhoto}
                alt={doctorName}
                rounded="rounded-full"
                wrapperClassName="h-28 w-28"
              />
            </div>
          </div>
          <div className="mt-6 text-[16px] font-semibold" style={{ color: WHITE }}>
            {doctorName}
          </div>
          <div className="mt-1 text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
            {doctorSpecialty}
          </div>
          <ConnectingLabel />
        </div>
      ) : (
        <>
          {/* Doctor "video" — soft-lit avatar on gradient */}
          <div className="relative flex-1">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={reduce ? undefined : { scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div
                  className="pointer-events-none absolute -inset-6 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
                    filter: "blur(4px)",
                  }}
                />
                <Img
                  src={doctorPhoto}
                  alt={doctorName}
                  rounded="rounded-3xl"
                  wrapperClassName="h-56 w-44"
                />
              </motion.div>
            </div>

            {/* name pill top-left */}
            <div
              className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[12px] font-semibold"
              style={{ backgroundColor: "rgba(35,41,31,0.55)", color: WHITE, backdropFilter: "blur(6px)" }}
            >
              {doctorName} · {doctorSpecialty}
            </div>

            {/* timer pill top-center */}
            <div
              className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full px-3 py-1.5 text-[12px] font-semibold tabular-nums"
              style={{ backgroundColor: "rgba(35,41,31,0.55)", color: WHITE, backdropFilter: "blur(6px)" }}
            >
              {fmt(elapsed)}
            </div>

            {/* self-view PiP */}
            <motion.div
              drag={!reduce}
              dragMomentum={false}
              dragElastic={0.15}
              dragConstraints={{ left: -140, right: 140, top: 0, bottom: 380 }}
              whileDrag={{ scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="absolute right-4 top-16 flex h-28 w-20 flex-col items-center justify-end overflow-hidden rounded-2xl p-2"
              style={{
                background: `linear-gradient(160deg, ${SAGE} 0%, ${DEEP} 100%)`,
                boxShadow: "0 12px 28px -10px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.15) inset",
                touchAction: "none",
              }}
            >
              <span className="text-[10px] font-semibold" style={{ color: WHITE }}>
                You
              </span>
            </motion.div>
          </div>

          {/* CONTROL BAR */}
          <div
            className="mx-auto mb-6 flex items-center gap-3 rounded-full px-4 py-3"
            style={{
              backgroundColor: "rgba(35,41,31,0.6)",
              backdropFilter: "blur(10px)",
              marginBottom: "calc(24px + env(safe-area-inset-bottom))",
            }}
          >
            <CallCtrl
              reduce={reduce}
              on={!muted}
              iconOn={<Mic size={16} />}
              iconOff={<MicOff size={16} />}
              activeBg={"rgba(255,255,255,0.14)"}
              offBg={RED}
              onClick={() => setMuted((v) => !v)}
              label="Mic"
            />
            <CallCtrl
              reduce={reduce}
              on={!videoOff}
              iconOn={<Video size={16} />}
              iconOff={<VideoOff size={16} />}
              activeBg={"rgba(255,255,255,0.14)"}
              offBg={RED}
              onClick={() => setVideoOff((v) => !v)}
              label="Video"
            />
            <CallCtrl
              reduce={reduce}
              on={true}
              iconOn={<MessageSquare size={16} />}
              iconOff={<MessageSquare size={16} />}
              activeBg={"rgba(255,255,255,0.14)"}
              offBg={"rgba(255,255,255,0.14)"}
              onClick={() => onClose(fmt(elapsed))}
              label="Chat"
            />
            <CallCtrl
              reduce={reduce}
              on={speakerOn}
              iconOn={<Volume2 size={16} />}
              iconOff={<Volume2 size={16} />}
              activeBg={SAGE}
              offBg={"rgba(255,255,255,0.14)"}
              onClick={() => setSpeakerOn((v) => !v)}
              label="Speaker"
            />
            <motion.button
              type="button"
              whileTap={reduce ? undefined : { scale: 0.9 }}
              whileHover={reduce ? undefined : { scale: 1.06 }}
              onClick={endCall}
              className="grid h-12 w-12 place-items-center rounded-full"
              style={{
                backgroundColor: RED,
                color: WHITE,
                boxShadow: "0 10px 22px -8px rgba(220,75,75,0.65)",
              }}
              aria-label="End call"
            >
              <PhoneOff size={18} />
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
}

function CallCtrl({
  reduce,
  on,
  iconOn,
  iconOff,
  activeBg,
  offBg,
  onClick,
  label,
}: {
  reduce: boolean;
  on: boolean;
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
  activeBg: string;
  offBg: string;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      type="button"
      whileTap={reduce ? undefined : { scale: 0.9 }}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full"
      style={{ backgroundColor: on ? activeBg : offBg, color: WHITE }}
      aria-label={label}
    >
      {on ? iconOn : iconOff}
    </motion.button>
  );
}

function ConnectingLabel() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const i = window.setInterval(
      () => setDots((d) => (d.length >= 3 ? "" : d + ".")),
      400,
    );
    return () => window.clearInterval(i);
  }, []);
  return (
    <div className="mt-6 text-[13px] font-medium tabular-nums" style={{ color: "rgba(255,255,255,0.85)" }}>
      Connecting{dots}
    </div>
  );
}
