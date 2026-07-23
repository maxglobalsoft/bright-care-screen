import type { ReactNode } from "react";

export function PhoneViewport({ children, hideNotch = true }: { children: ReactNode; hideNotch?: boolean }) {
  return (
    <>
      <div className="phone-shell-stage">
        <div
          className="phone-shell-device"
        >
          <div
            className="phone-shell-screen"
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
