import { useState } from "react";
import { specialties } from "./data";

export function SpecialtiesRow() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="pt-5" data-reveal>
      <style>{`
        @keyframes wcc-tile-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wcc-count-up { 0%{transform:translateY(6px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        .wcc-tile { opacity: 0; animation: wcc-tile-in 400ms ease-out forwards; transition: transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms ease-out; perspective: 600px; }
        .wcc-tile:hover, .wcc-tile.tapped { transform: translateY(-6px); box-shadow: 0 14px 28px -14px rgba(86,114,87,0.5); }
        .wcc-flip { position: relative; width: 56px; height: 56px; transform-style: preserve-3d; transition: transform 500ms cubic-bezier(0.34,1.56,0.64,1); }
        .wcc-tile:hover .wcc-flip, .wcc-tile.tapped .wcc-flip { transform: rotateY(180deg); }
        .wcc-face { position:absolute; inset:0; display:grid; place-items:center; border-radius:16px; backface-visibility:hidden; -webkit-backface-visibility:hidden; }
        .wcc-face-back { transform: rotateY(180deg); box-shadow: 0 6px 14px -6px rgba(232,145,45,0.55); }
        .wcc-tile.tapped .wcc-count { animation: wcc-count-up 350ms ease-out; color:#E8912D; font-weight:600; }
        @media (prefers-reduced-motion: reduce) { .wcc-tile,.wcc-flip,.wcc-count{animation:none!important;transform:none!important} }
      `}</style>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold" style={{ color: "#23291F" }}>Specialties</h2>
        <button className="text-[13px] font-medium" style={{ color: "#567257" }}>See all</button>
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
              className={`wcc-tile ${isActive ? "tapped" : ""} flex w-[76px] shrink-0 flex-col items-center gap-1.5 rounded-2xl p-2`}
            >
              <div className="wcc-flip">
                <div className="wcc-face" style={{ backgroundColor: "#F3F6F2" }}>
                  <Icon size={24} style={{ color: "#567257" }} />
                </div>
                <div className="wcc-face wcc-face-back" style={{ backgroundColor: "#E8912D" }}>
                  <Icon size={24} style={{ color: "#FFFFFF" }} />
                </div>
              </div>
              <div className="text-[11px] font-medium leading-tight text-center" style={{ color: "#23291F" }}>{s.label}</div>
              <div className="wcc-count text-[10px]" style={{ color: "#6B7280" }}>{s.doctors} drs</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
