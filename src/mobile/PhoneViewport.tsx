import type { ReactNode } from "react";

export function PhoneViewport({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EFEFEC] p-6">
      <div
        className="relative rounded-[3rem] bg-neutral-900 p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
        style={{ width: 390, height: 844 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white">
          {/* status bar safe area (44px) - kept clean */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-[26px] w-[110px] -translate-x-1/2 rounded-full bg-neutral-900" />
          {children}
          {/* home indicator */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-30 h-[5px] w-[130px] -translate-x-1/2 rounded-full bg-neutral-900/80" />
        </div>
      </div>
    </div>
  );
}
