import { Signal, Wifi, BatteryFull } from "lucide-react";
import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  surface = "#FFFFFF",
}: {
  children: ReactNode;
  surface?: string;
}) {
  return (
    <div
      className="relative shrink-0 rounded-[2.75rem] bg-neutral-900 p-[10px] shadow-2xl"
      style={{ width: 360, height: 740 }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[2.25rem]"
        style={{ backgroundColor: surface }}
      >
        {/* Status bar */}
        <div className="relative flex h-9 items-center justify-between px-6 pt-2 text-[11px] font-semibold text-wcc-ink">
          <span>9:41</span>
          <div className="absolute left-1/2 top-1.5 h-5 w-24 -translate-x-1/2 rounded-full bg-neutral-900" />
          <div className="flex items-center gap-1">
            <Signal size={12} />
            <Wifi size={12} />
            <BatteryFull size={14} />
          </div>
        </div>

        {/* Scroll area */}
        <style>{`.wcc-scroll::-webkit-scrollbar{display:none}`}</style>
        <div
          className="wcc-scroll h-[calc(100%-36px-64px)] overflow-y-auto font-inter"
          style={{ scrollbarWidth: "none" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
