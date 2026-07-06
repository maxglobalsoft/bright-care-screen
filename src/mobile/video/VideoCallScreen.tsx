import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare,
  Volume2, SwitchCamera, Signal, Send,
} from "lucide-react";

type Msg = { id: number; from: "me" | "doc"; text: string; ts: number };

const openingMessages: Msg[] = [
  { id: 1, from: "doc", text: "Hello Priya, I can see and hear you clearly. How are you feeling today?", ts: Date.now() },
];

export function VideoCallScreen() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"connecting" | "live">("connecting");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>(openingMessages);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Connecting → Live
  useEffect(() => {
    const t = setTimeout(() => setPhase("live"), 2400);
    return () => clearTimeout(t);
  }, []);

  // Call timer
  useEffect(() => {
    if (phase !== "live") return;
    const i = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [phase]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs.length, chatOpen]);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const endCall = () => {
    toast.success("Call ended", { description: `Duration ${mmss} · Summary saved to Records` });
    setTimeout(() => navigate({ to: "/home" }), 300);
  };

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setMsgs((m) => [...m, { id: Date.now(), from: "me", text: t, ts: Date.now() }]);
    setDraft("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        { id: Date.now() + 1, from: "doc", text: "Noted. Please continue.", ts: Date.now() },
      ]);
    }, 900);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ backgroundColor: "#050B08" }}>
      {/* Doctor tile fills screen */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 60% at 50% 30%, #24493A 0%, #10241B 55%, #050B08 100%)",
          }}
        />
        {/* animated ambient glow */}
        {!reduce && (
          <motion.div
            className="absolute left-1/2 top-[28%] h-[420px] w-[420px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,162,75,0.22), transparent 60%)", filter: "blur(20px)" }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        )}

        {/* Doctor avatar center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative"
          >
            {phase === "connecting" && !reduce && (
              <>
                {[0, 0.6, 1.2].map((delay) => (
                  <motion.div
                    key={delay}
                    className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ border: "1.5px solid rgba(201,162,75,0.55)" }}
                    animate={{ scale: [1, 2.2, 2.2], opacity: [0.7, 0, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay }}
                  />
                ))}
              </>
            )}
            <div
              className="grid h-36 w-36 place-items-center rounded-full text-[44px] font-bold"
              style={{
                background: "linear-gradient(135deg,#C9A24B 0%,#8A6B2A 100%)",
                color: "#FFFFFF",
                border: "3px solid rgba(255,255,255,0.24)",
                boxShadow: "0 20px 40px -12px rgba(0,0,0,0.7)",
              }}
            >
              DS
            </div>
            {phase === "live" && !reduce && (
              <motion.div
                className="absolute -inset-1 rounded-full"
                style={{ border: "2px solid #8FE0B7" }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.05, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
          </motion.div>
          <div className="mt-5 text-[20px] font-bold" style={{ color: "#FFFFFF" }}>
            Dr. Sarah Chen
          </div>
          <div className="mt-0.5 text-[12px]" style={{ color: "#B8C4BC" }}>
            General Physician · MBBS, MD
          </div>
          <AnimatePresence mode="wait">
            {phase === "connecting" ? (
              <motion.div
                key="conn"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-center gap-2 rounded-full px-3 py-1"
                style={{ backgroundColor: "rgba(201,162,75,0.18)", border: "1px solid rgba(201,162,75,0.4)" }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "#C9A24B" }}
                  animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-[11px] font-semibold" style={{ color: "#C9A24B" }}>
                  Connecting…
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="live"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 rounded-full px-3 py-1"
                style={{ backgroundColor: "rgba(143,224,183,0.16)", border: "1px solid rgba(143,224,183,0.4)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#8FE0B7" }} />
                <span className="text-[11px] font-semibold tabular-nums" style={{ color: "#8FE0B7" }}>
                  LIVE · {mmss}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Top status bar */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-14">
        <div className="flex items-center gap-2 rounded-full px-3 py-1.5"
             style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)" }}>
          <Signal size={12} color="#8FE0B7" />
          <span className="text-[10.5px] font-semibold" style={{ color: "#FFFFFF" }}>HD · Encrypted</span>
        </div>
        <motion.button
          whileTap={reduce ? undefined : { scale: 0.9 }}
          onClick={() => toast.info("Camera flipped")}
          className="grid h-9 w-9 place-items-center rounded-full"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)" }}
          aria-label="Switch camera"
        >
          <SwitchCamera size={16} color="#FFFFFF" />
        </motion.button>
      </div>

      {/* Self-view PIP */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={{ top: -10, left: -10, right: 10, bottom: 10 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 280, damping: 22 }}
        className="absolute right-3 z-20 h-[128px] w-[92px] overflow-hidden rounded-2xl"
        style={{
          top: 96,
          background: "linear-gradient(160deg,#1F4A3A 0%,#0B1B14 100%)",
          border: "1.5px solid rgba(255,255,255,0.25)",
          boxShadow: "0 12px 24px -10px rgba(0,0,0,0.6)",
        }}
      >
        {camOn ? (
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="grid h-14 w-14 place-items-center rounded-full text-[16px] font-bold"
              style={{ backgroundColor: "#2E6B53", color: "#FFFFFF" }}
            >
              PS
            </div>
          </div>
        ) : (
          <div className="grid h-full w-full place-items-center">
            <VideoOff size={20} color="#9AA39A" />
          </div>
        )}
        <div className="absolute bottom-1 left-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
             style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "#FFFFFF" }}>
          You
        </div>
        {!micOn && (
          <div className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full" style={{ backgroundColor: "#DC4B4B" }}>
            <MicOff size={10} color="#FFFFFF" />
          </div>
        )}
      </motion.div>

      {/* Chat overlay */}
      <AnimatePresence>
        {chatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatOpen(false)}
              className="absolute inset-0 z-30"
              style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="absolute inset-x-0 bottom-0 z-40 flex max-h-[70%] flex-col rounded-t-3xl"
              style={{ backgroundColor: "#0F221A", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="mx-auto mt-2 h-1 w-10 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
              <div className="px-5 pb-2 pt-3 text-[14px] font-bold" style={{ color: "#FFFFFF" }}>Chat with Dr. Chen</div>
              <div ref={scrollRef} className="min-h-[200px] flex-1 space-y-2 overflow-y-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
                {msgs.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[75%] rounded-2xl px-3 py-2 text-[12.5px]"
                      style={{
                        backgroundColor: m.from === "me" ? "#2E6B53" : "rgba(255,255,255,0.08)",
                        color: "#FFFFFF",
                      }}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t px-3 py-2.5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type a message…"
                  className="flex-1 rounded-full px-3 py-2 text-[13px] outline-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#FFFFFF" }}
                />
                <motion.button
                  whileTap={reduce ? undefined : { scale: 0.9 }}
                  onClick={send}
                  aria-label="Send"
                  className="grid h-10 w-10 place-items-center rounded-full"
                  style={{ backgroundColor: "#E8912D" }}
                >
                  <Send size={16} color="#FFFFFF" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom control bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-4" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
        <div
          className="mx-auto flex items-center justify-around rounded-full px-4 py-3"
          style={{
            backgroundColor: "rgba(6,16,12,0.7)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 20px 40px -12px rgba(0,0,0,0.8)",
          }}
        >
          <ControlButton
            active={micOn}
            onClick={() => setMicOn((v) => !v)}
            iconOn={<Mic size={20} color="#FFFFFF" />}
            iconOff={<MicOff size={20} color="#FFFFFF" />}
            label={micOn ? "Mute" : "Unmute"}
            offColor="#DC4B4B"
          />
          <ControlButton
            active={camOn}
            onClick={() => setCamOn((v) => !v)}
            iconOn={<Video size={20} color="#FFFFFF" />}
            iconOff={<VideoOff size={20} color="#FFFFFF" />}
            label={camOn ? "Video" : "Video off"}
            offColor="#DC4B4B"
          />
          <ControlButton
            active
            onClick={() => toast.info("Speaker on")}
            iconOn={<Volume2 size={20} color="#FFFFFF" />}
            iconOff={<Volume2 size={20} color="#FFFFFF" />}
            label="Speaker"
          />
          <ControlButton
            active={chatOpen}
            onClick={() => setChatOpen((v) => !v)}
            iconOn={<MessageSquare size={20} color="#FFFFFF" />}
            iconOff={<MessageSquare size={20} color="#FFFFFF" />}
            label="Chat"
            highlight
          />
          <motion.button
            whileTap={reduce ? undefined : { scale: 0.9 }}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            onClick={endCall}
            aria-label="End call"
            className="ml-1 grid h-14 w-14 place-items-center rounded-full"
            style={{
              background: "linear-gradient(135deg,#EF4444 0%,#B91C1C 100%)",
              boxShadow: "0 10px 22px -8px rgba(220,68,68,0.7), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            <PhoneOff size={22} color="#FFFFFF" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function ControlButton({
  active,
  onClick,
  iconOn,
  iconOff,
  label,
  offColor,
  highlight,
}: {
  active: boolean;
  onClick: () => void;
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
  label: string;
  offColor?: string;
  highlight?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      whileTap={reduce ? undefined : { scale: 0.88 }}
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full"
      style={{
        backgroundColor: active
          ? highlight
            ? "#E8912D"
            : "rgba(255,255,255,0.14)"
          : offColor ?? "rgba(255,255,255,0.14)",
        border: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      {active ? iconOn : iconOff}
    </motion.button>
  );
}
