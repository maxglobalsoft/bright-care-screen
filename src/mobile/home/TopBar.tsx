import { Bell } from "lucide-react";
import { user } from "./data";
import logoAsset from "@/assets/wcc-logo-v2.png.asset.json";
import { Img } from "./Img";

export function TopBar({ shadow }: { shadow: boolean }) {
  return (
    <div
      className={`sticky top-0 z-20 flex items-center justify-between bg-white px-4 pb-3 pt-2 transition-shadow duration-300 ${
        shadow ? "shadow-[0_4px_12px_-8px_rgba(0,0,0,0.15)]" : ""
      }`}
    >
      <style>{`
        @keyframes wcc-bell-swing { 0%,100%{transform:rotate(0)} 15%{transform:rotate(14deg)} 30%{transform:rotate(-12deg)} 45%{transform:rotate(8deg)} 60%{transform:rotate(-6deg)} 75%{transform:rotate(3deg)} }
        @keyframes wcc-dot-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.7} }
        .wcc-bell { animation: wcc-bell-swing 1.4s ease-in-out 400ms 2; transform-origin: 50% 15%; }
        .wcc-bell-dot { animation: wcc-dot-pulse 1.2s ease-in-out 400ms 3; }
        @media (prefers-reduced-motion: reduce) { .wcc-bell,.wcc-bell-dot{animation:none} }
      `}</style>
      <div className="flex items-center gap-2.5">
        <img src={logoAsset.url} alt="" className="h-[34px] w-[34px] object-contain" />
        <div className="leading-tight">
          <div className="text-[12px] text-[--color-wcc-muted]">{user.greeting}</div>
          <div className="text-[15px] font-semibold text-[--color-wcc-ink]">{user.name}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
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
          className="h-[34px] w-[34px] overflow-hidden rounded-full transition-transform duration-200 active:scale-[0.94]"
        >
          <Img src={user.avatar!} alt="You" wrapperClassName="h-full w-full" rounded="rounded-full" />
        </button>
      </div>
    </div>
  );
}
