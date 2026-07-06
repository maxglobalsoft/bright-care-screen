import { Home, Stethoscope, ShoppingBag, User, Video, type LucideIcon } from "lucide-react";
import { useState } from "react";

type Tab = { key: string; label: string; icon: LucideIcon };
const tabs: Tab[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "doctors", label: "Doctors", icon: Stethoscope },
  { key: "pharmacy", label: "Pharmacy", icon: ShoppingBag },
  { key: "profile", label: "Profile", icon: User },
];

export function BottomTabBar() {
  const [active, setActive] = useState("home");
  const [squash, setSquash] = useState<string | null>(null);
  const [rippling, setRippling] = useState(false);
  const [fabPulse, setFabPulse] = useState(false);

  const activeIndex = tabs.findIndex((t) => t.key === active);

  const handleTap = (key: string) => {
    setActive(key);
    setSquash(key);
    setTimeout(() => setSquash(null), 380);
  };
  const handleFab = () => {
    setRippling(true);
    setFabPulse(true);
    setTimeout(() => setRippling(false), 650);
    setTimeout(() => setFabPulse(false), 500);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-20" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <style>{`
        @keyframes wcc-jelly { 0%,100%{transform:scale(1,1)} 30%{transform:scale(1.25,0.8)} 60%{transform:scale(0.9,1.15)} }
        @keyframes wcc-fab-glow {
          0%,100% { box-shadow: 0 10px 24px -8px rgba(86,114,87,0.6), 0 0 0 0 rgba(232,145,45,0.35); }
          50% { box-shadow: 0 14px 32px -8px rgba(232,145,45,0.7), 0 0 0 14px rgba(232,145,45,0); }
        }
        @keyframes wcc-ring-spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes wcc-ripple { 0%{transform:scale(1);opacity:0.55} 100%{transform:scale(2.6);opacity:0} }
        @keyframes wcc-fab-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
        .wcc-fab { animation: wcc-fab-glow 2.5s ease-in-out infinite; }
        .wcc-fab-ring { animation: wcc-ring-spin 6s linear infinite; }
        .wcc-ripple { animation: wcc-ripple 650ms ease-out; }
        .wcc-fab-pulse { animation: wcc-fab-pulse 500ms cubic-bezier(0.34,1.56,0.64,1); }
        .wcc-jelly { animation: wcc-jelly 380ms cubic-bezier(0.34,1.56,0.64,1); }
        .wcc-pill-morph { transition: left 450ms cubic-bezier(0.68,-0.2,0.32,1.4), width 450ms cubic-bezier(0.68,-0.2,0.32,1.4); }
        @media (prefers-reduced-motion: reduce) { .wcc-fab,.wcc-fab-ring,.wcc-ripple,.wcc-fab-pulse,.wcc-jelly,.wcc-pill-morph{animation:none!important;transition:none!important} }
      `}</style>

      <div className="relative mx-4">
        {/* Floating center FAB */}
        <div className="pointer-events-none absolute left-1/2 -top-8 z-10 -translate-x-1/2">
          <div className="pointer-events-auto relative h-[60px] w-[60px]">
            <div
              className="wcc-fab-ring absolute -inset-[3px] rounded-full"
              style={{ background: "conic-gradient(from 0deg,#567257,#E8912D,#567257)" }}
            />
            <button
              type="button"
              aria-label="Start consultation"
              onClick={handleFab}
              className="wcc-fab absolute inset-0 grid place-items-center overflow-hidden rounded-full transition-transform active:scale-95"
              style={{ background: "linear-gradient(135deg,#567257 0%,#E8912D 100%)", color: "#FFFFFF" }}
            >
              <Video size={26} className={fabPulse ? "wcc-fab-pulse" : ""} />
              {rippling && (
                <span className="wcc-ripple pointer-events-none absolute inset-0 rounded-full" style={{ backgroundColor: "#FFFFFF" }} />
              )}
            </button>
          </div>
        </div>

        {/* Floating pill bar */}
        <div
          className="relative flex h-[62px] items-center rounded-[28px] px-2"
          style={{ backgroundColor: "#FFFFFF", boxShadow: "0 12px 30px -12px rgba(0,0,0,0.20), 0 4px 10px -6px rgba(0,0,0,0.10)" }}
        >
          {/* Liquid morph indicator */}
          {(() => {
            const slotPct = 100 / 5; // 5 slots (2 tabs + center + 2 tabs)
            const slotIdx = activeIndex < 2 ? activeIndex : activeIndex + 1; // skip center slot (index 2)
            const isCompact = tabs[activeIndex].label.length > 0;
            const width = isCompact ? 92 : 44;
            return (
              <div
                className="wcc-pill-morph absolute top-1/2 h-11 -translate-y-1/2 rounded-full"
                style={{
                  left: `calc(${slotPct * slotIdx}% + ${slotPct / 2}% - ${width / 2}px)`,
                  width: `${width}px`,
                  backgroundColor: "#567257",
                  boxShadow: "0 6px 14px -6px rgba(86,114,87,0.6)",
                }}
              />
            );
          })()}

          <div className="relative z-10 grid w-full grid-cols-5 items-center">
            {tabs.slice(0, 2).map((t) => (
              <TabButton key={t.key} t={t} active={active === t.key} squash={squash === t.key} onTap={handleTap} />
            ))}
            <div />
            {tabs.slice(2).map((t) => (
              <TabButton key={t.key} t={t} active={active === t.key} squash={squash === t.key} onTap={handleTap} />
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
  squash,
  onTap,
}: {
  t: Tab;
  active: boolean;
  squash: boolean;
  onTap: (key: string) => void;
}) {
  const Icon = t.icon;
  return (
    <button
      type="button"
      onClick={() => onTap(t.key)}
      className="flex h-11 items-center justify-center gap-1.5 px-1"
    >
      <Icon
        size={20}
        className={squash ? "wcc-jelly" : ""}
        style={{ color: active ? "#FFFFFF" : "#6B7280" }}
      />
      {active && (
        <span className="text-[11px] font-semibold" style={{ color: "#FFFFFF" }}>
          {t.label}
        </span>
      )}
    </button>
  );
}
