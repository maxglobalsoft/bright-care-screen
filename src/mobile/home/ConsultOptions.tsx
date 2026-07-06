import { useState } from "react";
import { consultOptions } from "./data";

export function ConsultOptions() {
  const [active, setActive] = useState<string | null>("video");
  return (
    <section className="pt-5">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[16px] font-semibold text-[--color-wcc-ink]">Consult now</h2>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {consultOptions.map((o) => {
          const Icon = o.icon;
          const isActive = active === o.key;
          return (
            <button
              key={o.key}
              onClick={() => setActive(o.key)}
              className="relative w-[128px] shrink-0 rounded-2xl bg-white p-3 text-left shadow-[0_2px_10px_-6px_rgba(0,0,0,0.12)] transition-transform duration-200 active:-translate-y-0.5"
              style={
                isActive
                  ? {
                      backgroundImage:
                        "linear-gradient(white,white), linear-gradient(120deg,#567257,#E8912D)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      border: "1.5px solid transparent",
                    }
                  : { border: "1.5px solid #EEF1EE" }
              }
            >
              {o.popular && (
                <span className="absolute -right-1 -top-1 rounded-full bg-[--color-wcc-orange] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow">
                  Popular
                </span>
              )}
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[--color-wcc-mist]">
                <Icon size={20} className="text-[--color-wcc-sage]" />
              </div>
              <div className="mt-2 text-[14px] font-semibold text-[--color-wcc-ink]">{o.label}</div>
              <div className="text-[11px] text-[--color-wcc-muted]">from CA${o.priceCad}</div>
              <div className="mt-2 inline-flex rounded-full bg-[--color-wcc-sage] px-3 py-1 text-[11px] font-semibold text-white">
                Start
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
