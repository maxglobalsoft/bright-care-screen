import { Bell } from "lucide-react";
import { user } from "./data";
import logoAsset from "@/assets/wcc-logo-v2.png.asset.json";

export function TopBar({ shadow }: { shadow: boolean }) {
  return (
    <div
      className={`sticky top-0 z-20 flex items-center justify-between bg-white px-4 pb-3 pt-2 transition-shadow duration-200 ${
        shadow ? "shadow-[0_4px_12px_-8px_rgba(0,0,0,0.15)]" : ""
      }`}
    >
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
          className="relative grid h-9 w-9 place-items-center rounded-full transition-transform active:scale-95"
        >
          <Bell size={20} className="text-[--color-wcc-ink]" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[--color-wcc-orange] ring-2 ring-white" />
        </button>
        <button
          type="button"
          aria-label="Profile"
          className="h-[34px] w-[34px] overflow-hidden rounded-full bg-gradient-to-br from-[--color-wcc-sage] to-[--color-wcc-green-deep] text-[13px] font-semibold text-white grid place-items-center transition-transform active:scale-95"
        >
          {user.name.charAt(0)}
        </button>
      </div>
    </div>
  );
}
