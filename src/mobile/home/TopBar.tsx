import { Bell } from "lucide-react";
import { user } from "./data";
import logoAsset from "@/assets/wcc-logo-v2.png.asset.json";
import { Img } from "./Img";
import { useState } from "react";

export function TopBar({ shadow }: { shadow: boolean }) {
  const [beat, setBeat] = useState(false);
  return (
    <div
      className={`sticky top-0 z-20 flex items-center justify-between bg-white px-4 pb-3 pt-2 transition-shadow duration-300 ${
        shadow ? "shadow-[0_4px_12px_-8px_rgba(0,0,0,0.15)]" : ""
      }`}
    >
      <style>{`
        @keyframes wcc-bell-swing { 0%,100%{transform:rotate(0)} 15%{transform:rotate(14deg)} 30%{transform:rotate(-12deg)} 45%{transform:rotate(8deg)} 60%{transform:rotate(-6deg)} 75%{transform:rotate(3deg)} }
        @keyframes wcc-dot-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.7} }
        @keyframes wcc-heartbeat { 0%,100%{transform:scale(1)} 20%{transform:scale(1.18)} 40%{transform:scale(0.95)} 60%{transform:scale(1.12)} 80%{transform:scale(0.98)} }
        .wcc-bell { animation: wcc-bell-swing 1.4s ease-in-out 400ms 2; transform-origin: 50% 15%; }
        .wcc-bell-dot { animation: wcc-dot-pulse 1.2s ease-in-out 400ms 3; }
        .wcc-heart-beat { animation: wcc-heartbeat 700ms ease-in-out; }
        @media (prefers-reduced-motion: reduce) { .wcc-bell,.wcc-bell-dot,.wcc-heart-beat{animation:none} }
      `}</style>
      <button
        type="button"
        onClick={() => { setBeat(true); setTimeout(() => setBeat(false), 720); }}
        className="flex items-center gap-2.5 text-left"
      >
        <img
          src={logoAsset.url}
          alt="WellnessCareConnect"
          className={`h-11 w-11 object-contain ${beat ? "wcc-heart-beat" : ""}`}
        />
        <div className="leading-tight">
          <div className="text-[16px] font-semibold tracking-tight">
            <span className="text-[--color-wcc-sage]">Wellness</span>{" "}
            <span className="text-[--color-wcc-orange]">Care</span>{" "}
            <span className="text-[--color-wcc-green-deep]">Connect</span>
          </div>
          <div className="text-[9px] font-medium uppercase tracking-[0.14em] text-[--color-wcc-muted]">
            Every health matters
          </div>
        </div>
      </button>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-9 w-9 place-items-center rounded-full transition-transform duration-200 active:scale-[0.94]"
        >
          <Bell size={20} className="wcc-bell text-[--color-wcc-ink]" />
          <span className="wcc-bell-dot absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[--color-wcc-orange] ring-2 ring-white" />
        </button>
        <button
          type="button"
          aria-label="Profile"
          className="h-9 w-9 overflow-hidden rounded-full transition-transform duration-200 active:scale-[0.94]"
        >
          <Img src={user.avatar!} alt="You" wrapperClassName="h-full w-full" rounded="rounded-full" />
        </button>
      </div>
    </div>
  );
}
