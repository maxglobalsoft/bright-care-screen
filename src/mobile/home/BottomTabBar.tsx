import { Home, Stethoscope, ShoppingBag, User, Video, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

type Tab = { key: string; label: string; icon: LucideIcon };
const tabs: Tab[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "doctors", label: "Doctors", icon: Stethoscope },
  { key: "pharmacy", label: "Pharmacy", icon: ShoppingBag },
  { key: "profile", label: "Profile", icon: User },
];

export function BottomTabBar() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("home");
  const [tapKey, setTapKey] = useState<string | null>(null);
  const [fabTaps, setFabTaps] = useState(0);

  const handleTap = (key: string) => {
    setActive(key);
    setTapKey(key);
    setTimeout(() => setTapKey(null), 360);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-20" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <style>{`
        @keyframes wcc-fab-ring-spin { to { transform: rotate(360deg); } }
        @keyframes wcc-fab-glow {
          0%,100% { box-shadow: 0 10px 24px -8px rgba(86,114,87,0.5), 0 0 0px rgba(232,145,45,0); }
          50% { box-shadow: 0 12px 28px -8px rgba(86,114,87,0.6), 0 0 24px rgba(232,145,45,0.45); }
        }
        .wcc-fab-ring { animation: wcc-fab-ring-spin 6s linear infinite; }
        .wcc-fab-glow { animation: wcc-fab-glow 2.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .wcc-fab-ring, .wcc-fab-glow { animation: none !important; } }
      `}</style>

      <div className="relative mx-4">
        {/* FAB */}
        <div className="pointer-events-none absolute left-1/2 -top-8 z-10 -translate-x-1/2">
          <div className="pointer-events-auto relative h-[60px] w-[60px]">
            <div
              className="wcc-fab-ring absolute -inset-[3px] rounded-full"
              style={{ background: "conic-gradient(from 0deg,#567257,#E8912D,#567257)" }}
            />
            <motion.button
              type="button"
              aria-label="Start consultation"
              onClick={() => setFabTaps((n) => n + 1)}
              whileTap={reduce ? undefined : { scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="wcc-fab-glow absolute inset-0 grid place-items-center overflow-hidden rounded-full"
              style={{ background: "linear-gradient(135deg,#567257 0%,#E8912D 100%)", color: "#FFFFFF" }}
            >
              <Video size={26} />
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
        </div>

        {/* Pill */}
        <div
          className="relative flex h-[62px] items-center rounded-[28px] px-2"
          style={{ backgroundColor: "#FFFFFF", boxShadow: "0 12px 30px -12px rgba(0,0,0,0.20), 0 4px 10px -6px rgba(0,0,0,0.10)" }}
        >
          <div className="relative z-10 grid w-full grid-cols-5 items-center">
            {tabs.slice(0, 2).map((t) => (
              <TabButton key={t.key} t={t} active={active === t.key} tapped={tapKey === t.key} onTap={handleTap} reduce={!!reduce} />
            ))}
            <div />
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
      onClick={() => onTap(t.key)}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="relative flex h-11 cursor-pointer items-center justify-center"
    >
      {active && (
        <motion.span
          layoutId="wcc-tab-indicator"
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
          className="absolute h-10 w-10 rounded-full"
          style={{ backgroundColor: "#567257", boxShadow: "0 6px 14px -6px rgba(86,114,87,0.6)" }}
        />
      )}
      <motion.span
        className="relative z-10"
        animate={tapped && !reduce ? { scale: [1, 0.8, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, times: [0, 0.25, 0.6, 1] }}
        style={{ color: active ? "#FFFFFF" : "#6B7280" }}
      >
        <Icon size={20} />
      </motion.span>
    </motion.button>
  );
}
