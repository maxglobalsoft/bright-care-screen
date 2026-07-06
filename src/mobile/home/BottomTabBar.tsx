import { Home, Stethoscope, ShoppingBag, User, Video } from "lucide-react";
import { useState } from "react";

const tabs = [
  { key: "home", label: "Home", icon: Home },
  { key: "doctors", label: "Doctors", icon: Stethoscope },
  { key: "pharmacy", label: "Pharmacy", icon: ShoppingBag },
  { key: "profile", label: "Profile", icon: User },
];

export function BottomTabBar() {
  const [active, setActive] = useState("home");
  const [popKey, setPopKey] = useState<string | null>(null);
  const [rippling, setRippling] = useState(false);

  const handleTap = (key: string) => {
    setActive(key);
    setPopKey(key);
    setTimeout(() => setPopKey(null), 320);
  };
  const handleFab = () => {
    setRippling(true);
    setTimeout(() => setRippling(false), 600);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-20">
      <style>{`
        @keyframes wcc-tab-pop { 0%{transform:scale(1)} 40%{transform:scale(0.85)} 65%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .wcc-tab-pop { animation: wcc-tab-pop 320ms cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes wcc-fab-glow {
          0%,100% { box-shadow: 0 8px 22px -8px rgba(86,114,87,0.65), 0 0 0 0 rgba(86,114,87,0.35); }
          50% { box-shadow: 0 10px 26px -8px rgba(86,114,87,0.85), 0 0 0 10px rgba(86,114,87,0); }
        }
        .wcc-fab { animation: wcc-fab-glow 2.5s ease-in-out infinite; }
        @keyframes wcc-ripple { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(2.4);opacity:0} }
        .wcc-ripple { animation: wcc-ripple 600ms ease-out; }
        @keyframes wcc-dot-slide { from{transform:translateY(4px);opacity:0} to{transform:translateY(0);opacity:1} }
        .wcc-active-dot { animation: wcc-dot-slide 250ms ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .wcc-tab-pop,.wcc-fab,.wcc-ripple,.wcc-active-dot { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 -top-6 z-10 -translate-x-1/2">
        <button
          type="button"
          aria-label="Start consultation"
          onClick={handleFab}
          className="wcc-fab pointer-events-auto relative grid h-14 w-14 place-items-center overflow-visible rounded-full bg-gradient-to-br from-[--color-wcc-sage] to-[--color-wcc-green-deep] text-white transition-transform active:scale-95"
        >
          <Video size={22} />
          {rippling && (
            <span className="wcc-ripple pointer-events-none absolute inset-0 rounded-full bg-[--color-wcc-sage]" />
          )}
        </button>
      </div>

      <div className="relative flex h-[68px] items-end justify-around bg-white pb-4 pt-2 shadow-[0_-8px_20px_-14px_rgba(0,0,0,0.25)]">
        {tabs.slice(0, 2).map((t) => (
          <TabButton key={t.key} t={t} active={active === t.key} popping={popKey === t.key} onTap={handleTap} />
        ))}
        <div className="w-14" />
        {tabs.slice(2).map((t) => (
          <TabButton key={t.key} t={t} active={active === t.key} popping={popKey === t.key} onTap={handleTap} />
        ))}
      </div>
    </div>
  );
}

function TabButton({
  t,
  active,
  popping,
  onTap,
}: {
  t: { key: string; label: string; icon: typeof Home };
  active: boolean;
  popping: boolean;
  onTap: (key: string) => void;
}) {
  const Icon = t.icon;
  return (
    <button type="button" onClick={() => onTap(t.key)} className="flex w-16 flex-col items-center gap-0.5">
      <Icon
        size={20}
        className={`${active ? "text-[--color-wcc-sage]" : "text-[--color-wcc-muted]"} ${popping ? "wcc-tab-pop" : ""}`}
      />
      <span className={`text-[10px] ${active ? "font-semibold text-[--color-wcc-sage]" : "text-[--color-wcc-muted]"}`}>
        {t.label}
      </span>
      <span
        key={active ? "on" : "off"}
        className={`h-1 w-1 rounded-full ${active ? "wcc-active-dot bg-[--color-wcc-sage]" : "bg-transparent"}`}
      />
    </button>
  );
}
