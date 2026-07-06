import { useState } from "react";
import { specialties } from "./data";

export function SpecialtiesRow() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="pt-5">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[16px] font-semibold text-[--color-wcc-ink]">Specialties</h2>
        <button className="text-[13px] font-medium text-[--color-wcc-sage]">See all</button>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {specialties.map((s, i) => {
          const Icon = s.icon;
          const isActive = active === i;
          return (
            <button
              key={s.label}
              onClick={() => setActive(i)}
              className="group flex w-[76px] shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-white p-2 transition-transform duration-200 active:-translate-y-0.5"
            >
              <div
                className={`grid h-14 w-14 place-items-center rounded-2xl transition-colors duration-300 ${
                  isActive ? "bg-[--color-wcc-orange]/15" : "bg-[--color-wcc-mist]"
                }`}
              >
                <Icon
                  size={24}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-[--color-wcc-orange]" : "text-[--color-wcc-sage]"
                  }`}
                />
              </div>
              <div className="text-[11px] font-medium leading-tight text-[--color-wcc-ink] text-center">
                {s.label}
              </div>
              <div className="text-[10px] text-[--color-wcc-muted]">{s.doctors} drs</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
