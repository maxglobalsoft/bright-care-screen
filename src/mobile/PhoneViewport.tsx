import type { ReactNode } from "react";

export function PhoneViewport({ children, hideNotch = true }: { children: ReactNode; hideNotch?: boolean }) {
  return (
    <>
      {/* MOBILE: full-bleed shell, no bezel */}
      <div className="phone-shell-mobile md:hidden">
        <div className="relative h-full w-full overflow-hidden bg-white" style={{ minWidth: 0, minHeight: 0 }}>
          {children}
        </div>
      </div>

      {/* DESKTOP: decorative bezel showcase, portrait phone locked via calc/min */}
      <div className="hidden md:flex min-h-screen w-full items-center justify-center bg-[#EFEFEC] p-6">
        <div
          className="relative rounded-[3rem] bg-neutral-900 p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
          style={{
            width: "min(390px, calc((100dvh - 3rem) * 0.4621))",
            height: "min(844px, calc(100dvh - 3rem))",
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white"
            style={{ minWidth: 0, minHeight: 0 }}
          >
            {hideNotch ? null : (
              <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-[26px] w-[110px] -translate-x-1/2 rounded-full bg-neutral-900" />
            )}
            {children}
          </div>

        </div>
      </div>
    </>
  );
}
