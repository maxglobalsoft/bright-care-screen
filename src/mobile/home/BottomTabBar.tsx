import { Home, Stethoscope, ShoppingBag, User, Video, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

type Tab = { key: string; label: string; icon: LucideIcon };
const tabs: Tab[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "doctors", label: "Doctors", icon: Stethoscope },
  { key: "pharmacy", label: "Pharmacy", icon: ShoppingBag },
  { key: "profile", label: "Profile", icon: User },
];

export function BottomTabBar({ activeTab = "home" }: { activeTab?: string } = {}) {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [active, setActive] = useState(activeTab);
  const [tapKey, setTapKey] = useState<string | null>(null);
  const [fabTaps, setFabTaps] = useState(0);

  const handleTap = (key: string) => {
    setActive(key);
    setTapKey(key);
    setTimeout(() => setTapKey(null), 460);
    if (key === "home") navigate({ to: "/home" });
    else if (key === "doctors") navigate({ to: "/doctors" });
    else if (key === "pharmacy") toast.info("Pharmacy coming soon", { description: "Order medicines to your door — launching next release." });
    else if (key === "profile") toast.info("Profile coming soon", { description: "Manage your account, appointments, and settings." });
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-20" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <style>{`
        @keyframes wcc-tab-sheen {
          0% { transform: translateX(-160%) skewX(-22deg); opacity: 0; }
          18% { opacity: 1; }
          100% { transform: translateX(260%) skewX(-22deg); opacity: 0; }
        }
        @keyframes wcc-tab-conic { to { transform: rotate(360deg); } }
        @keyframes wcc-tab-grad {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes wcc-tab-ripple {
          0% { transform: scale(0.2); opacity: 0.55; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes wcc-fab-glow {
          0%,100% { box-shadow: 0 10px 24px -8px rgba(86,114,87,0.55), 0 0 0 rgba(232,145,45,0); }
          50% { box-shadow: 0 14px 30px -8px rgba(86,114,87,0.7), 0 0 26px rgba(232,145,45,0.55); }
        }

        .wcc-tab-btn { position: relative; isolation: isolate; }
        /* halo behind icon on hover */
        .wcc-tab-halo {
          position: absolute; left: 50%; top: 50%;
          height: 40px; width: 40px; border-radius: 9999px;
          transform: translate(-50%,-50%) scale(0.4);
          background: radial-gradient(circle at 30% 30%, rgba(86,114,87,0.35), rgba(232,145,45,0.25) 55%, transparent 70%);
          opacity: 0; transition: opacity 260ms ease, transform 260ms ease;
          pointer-events: none; z-index: 0;
        }
        .wcc-tab-btn:hover .wcc-tab-halo { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        /* conic ring on hover */
        .wcc-tab-ring {
          position: absolute; left: 50%; top: 50%;
          height: 42px; width: 42px; border-radius: 9999px;
          transform: translate(-50%,-50%);
          background: conic-gradient(from 0deg, transparent 0deg, rgba(232,145,45,0.85) 70deg, transparent 140deg, transparent 360deg);
          -webkit-mask: radial-gradient(circle, transparent 16px, #000 17px);
                  mask: radial-gradient(circle, transparent 16px, #000 17px);
          opacity: 0; transition: opacity 200ms ease;
          pointer-events: none; z-index: 1;
        }
        .wcc-tab-btn:hover .wcc-tab-ring { opacity: 1; animation: wcc-tab-conic 1.6s linear infinite; }
        /* sheen sweep across icon on hover */
        .wcc-tab-sheen {
          position: absolute; left: 50%; top: 50%;
          height: 40px; width: 40px; border-radius: 9999px;
          transform: translate(-50%,-50%);
          overflow: hidden; pointer-events: none; z-index: 2;
        }
        .wcc-tab-sheen::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(115deg, transparent 32%, rgba(255,255,255,0.7) 50%, transparent 68%);
          transform: translateX(-160%) skewX(-22deg); opacity: 0;
        }
        .wcc-tab-btn:hover .wcc-tab-sheen::before { animation: wcc-tab-sheen 1.15s ease-in-out infinite; }

        .wcc-fab { background-size: 220% 220% !important; }
        .wcc-fab:hover { animation: wcc-tab-grad 2.2s ease-in-out infinite, wcc-fab-glow 2.5s ease-in-out infinite; }
        .wcc-fab-ring {
          position: absolute; inset: -3px; border-radius: 9999px;
          background: conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.85) 60deg, transparent 130deg, transparent 360deg);
          -webkit-mask: radial-gradient(circle, transparent 20px, #000 21px);
                  mask: radial-gradient(circle, transparent 20px, #000 21px);
          opacity: 0; transition: opacity 200ms ease; pointer-events: none;
        }
        .wcc-fab:hover .wcc-fab-ring { opacity: 1; animation: wcc-tab-conic 1.4s linear infinite; }
        .wcc-fab-sheen {
          position: absolute; inset: 0; border-radius: 9999px; overflow: hidden; pointer-events: none;
        }
        .wcc-fab-sheen::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(115deg, transparent 32%, rgba(255,255,255,0.75) 50%, transparent 68%);
          transform: translateX(-160%) skewX(-22deg); opacity: 0;
        }
        .wcc-fab:hover .wcc-fab-sheen::before { animation: wcc-tab-sheen 1.1s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .wcc-tab-btn:hover .wcc-tab-halo,
          .wcc-tab-btn:hover .wcc-tab-ring,
          .wcc-tab-btn:hover .wcc-tab-sheen::before,
          .wcc-fab:hover,
          .wcc-fab:hover .wcc-fab-ring,
          .wcc-fab:hover .wcc-fab-sheen::before { animation: none !important; }
        }
      `}</style>

      <div className="relative mx-4">
        <div
          className="relative flex h-[62px] items-center rounded-[28px] px-2"
          style={{ backgroundColor: "#FFFFFF", boxShadow: "0 12px 30px -12px rgba(0,0,0,0.20), 0 4px 10px -6px rgba(0,0,0,0.10)" }}
        >
          <div className="relative z-10 grid w-full grid-cols-5 items-center">
            {tabs.slice(0, 2).map((t) => (
              <TabButton key={t.key} t={t} active={active === t.key} tapped={tapKey === t.key} onTap={handleTap} reduce={!!reduce} />
            ))}

            {/* Center video call button — inline with other tab icons */}
            <div className="flex items-center justify-center">
              <motion.button
                type="button"
                aria-label="Start consultation"
                onClick={() => setFabTaps((n) => n + 1)}
                whileHover={reduce ? undefined : { scale: 1.1, y: -2, rotateX: 10, rotateY: -10 }}
                whileTap={reduce ? undefined : { scale: 0.88 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className="wcc-fab relative grid h-11 w-11 place-items-center overflow-hidden rounded-full"
                style={{
                  background: "linear-gradient(135deg,#567257 0%,#E8912D 50%,#567257 100%)",
                  color: "#FFFFFF",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 10px 24px -8px rgba(86,114,87,0.55), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.15)",
                }}
              >
                <span className="wcc-fab-ring" aria-hidden />
                <span className="wcc-fab-sheen" aria-hidden />
                <Video size={20} className="relative z-10" />
                <AnimatePresence>
                  {!reduce && fabTaps > 0 && (
                    <motion.span
                      key={fabTaps}
                      className="pointer-events-none absolute inset-0 rounded-full"
                      style={{ backgroundColor: "#FFFFFF" }}
                      initial={{ scale: 0, opacity: 0.55 }}
                      animate={{ scale: 2.6, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {tabs.slice(2).map((t) => (
              <TabButton key={t.key} t={t} active={active === t.key} tapped={tapKey === t.key} onTap={handleTap} reduce={!!reduce} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  t,
  active,
  tapped,
  onTap,
  reduce,
}: {
  t: Tab;
  active: boolean;
  tapped: boolean;
  onTap: (key: string) => void;
  reduce: boolean;
}) {
  const Icon = t.icon;
  return (
    <motion.button
      type="button"
      aria-label={t.label}
      onClick={() => onTap(t.key)}
      whileHover={reduce ? undefined : { y: -3, scale: 1.06, rotateX: 10, rotateY: -8 }}
      whileTap={reduce ? undefined : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className="wcc-tab-btn relative flex h-11 cursor-pointer items-center justify-center"
      style={{ transformStyle: "preserve-3d", perspective: 600 }}
    >
      {/* hover-only decorations */}
      {!active && (
        <>
          <span className="wcc-tab-halo" aria-hidden />
          <span className="wcc-tab-ring" aria-hidden />
          <span className="wcc-tab-sheen" aria-hidden />
        </>
      )}

      {/* active pill (persists across tabs via shared layoutId) */}
      {active && (
        <motion.span
          layoutId="wcc-tab-indicator"
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
          className="absolute h-10 w-10 rounded-full"
          style={{
            background: "linear-gradient(135deg,#567257 0%,#3C4F3D 50%,#567257 100%)",
            backgroundSize: "220% 220%",
            boxShadow: "0 6px 14px -6px rgba(86,114,87,0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
            animation: reduce ? undefined : "wcc-tab-grad 2.4s ease-in-out infinite",
          }}
        />
      )}

      {/* tap ripple */}
      <AnimatePresence>
        {tapped && !reduce && (
          <motion.span
            key="ripple"
            className="pointer-events-none absolute h-10 w-10 rounded-full"
            style={{
              background: active
                ? "radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(86,114,87,0.45) 0%, rgba(232,145,45,0.25) 55%, transparent 70%)",
              zIndex: 3,
            }}
            initial={{ scale: 0.2, opacity: 0.6 }}
            animate={{ scale: 2.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <motion.span
        className="relative z-10"
        animate={tapped && !reduce ? { scale: [1, 0.75, 1.3, 1], rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.45, times: [0, 0.25, 0.6, 1] }}
        style={{ color: active ? "#FFFFFF" : "#6B7280" }}
      >
        <Icon size={20} />
      </motion.span>
    </motion.button>
  );
}
