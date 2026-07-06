import type { ReactNode } from "react";

export function PhoneViewport({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-950 p-6">
      <div
        className="relative rounded-[3rem] bg-neutral-900 p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        style={{ width: 375, height: 812 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-black">
          {/* notch */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-6 w-32 -translate-x-1/2 rounded-full bg-neutral-900" />
          {children}
        </div>
      </div>
    </div>
  );
}
