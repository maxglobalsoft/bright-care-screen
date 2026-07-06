import { useState } from "react";
import { specialties } from "./data";

export function SpecialtiesRow() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="pt-5" data-reveal>
      <style>{`
        @keyframes wcc-tile-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .wcc-tile { opacity: 0; animation: wcc-tile-in 400ms ease-out forwards; }
        .wcc-tile:hover, .wcc-tile:active { transform: translateY(-3px); }
        .wcc-tile { transition: transform 250ms ease-out; }
        .wcc-tile:hover .wcc-tile-icon, .wcc-tile:active .wcc-tile-icon { transform: rotateY(180deg); background-color: rgba(232,145,45,0.15); }
        .wcc-tile:hover .wcc-tile-icon > *, .wcc-tile:active .wcc-tile-icon > * { color: #E8912D; }
        .wcc-tile:hover .wcc-tile-count, .wcc-tile:active .wcc-tile-count { transform: translateY(-1px); color: #E8912D; }
        .wcc-tile-icon, .wcc-tile-icon > *, .wcc-tile-count { transition: all 300ms ease-out; transform-style: preserve-3d; }
        @media (prefers-reduced-motion: reduce) { .wcc-tile,.wcc-tile *{animation:none!important;transform:none!important} }
      `}</style>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold text-[--color-wcc-ink]">Specialties</h2>
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
              style={{ animationDelay: `${i * 60}ms` }}
              className="wcc-tile group flex w-[76px] shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-white p-2"
            >
              <div
                className={`wcc-tile-icon grid h-14 w-14 place-items-center rounded-2xl ${isActive ? "bg-[--color-wcc-orange]/15" : "bg-[--color-wcc-mist]"}`}
              >
                <Icon size={24} className={isActive ? "text-[--color-wcc-orange]" : "text-[--color-wcc-sage]"} />
              </div>
              <div className="text-[11px] font-medium leading-tight text-[--color-wcc-ink] text-center">{s.label}</div>
              <div className="wcc-tile-count text-[10px] text-[--color-wcc-muted]">{s.doctors} drs</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
