import { Star, BadgeCheck, MapPin } from "lucide-react";
import { doctors } from "./data";

export function DoctorsRail() {
  return (
    <section className="pt-5">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[16px] font-semibold text-[--color-wcc-ink]">Top doctors</h2>
        <button className="text-[13px] font-medium text-[--color-wcc-sage]">View all</button>
      </div>
      <style>{`
        @keyframes wcc-sheen {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(220%); }
        }
        .wcc-doc:active .wcc-doc-photo { transform: scale(1.03); }
        .wcc-doc:active .wcc-sheen { animation: wcc-sheen 700ms ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .wcc-doc:active .wcc-sheen { animation: none; }
          .wcc-doc:active .wcc-doc-photo { transform: none; }
        }
      `}</style>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {doctors.map((d) => (
          <div
            key={d.name}
            className="wcc-doc w-[200px] shrink-0 rounded-2xl border border-[#EEF1EE] bg-white p-3 shadow-[0_2px_10px_-6px_rgba(0,0,0,0.10)]"
          >
            <div className="relative h-[110px] overflow-hidden rounded-xl">
              <div
                className="wcc-doc-photo flex h-full w-full items-center justify-center text-[28px] font-bold text-white transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${d.hue}, #567257)`,
                }}
              >
                {d.initials}
              </div>
              {d.verified && (
                <div className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-white/95 shadow">
                  <BadgeCheck size={14} className="text-[--color-wcc-sage]" />
                </div>
              )}
            </div>
            <div className="mt-2 text-[13px] font-semibold text-[--color-wcc-ink]">{d.name}</div>
            <div className="text-[11px] text-[--color-wcc-muted]">
              {d.specialty} · {d.years}y
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-[--color-wcc-ink]">
              <Star size={12} className="fill-[--color-wcc-orange] text-[--color-wcc-orange]" />
              <span className="font-semibold">{d.rating}</span>
              <span className="text-[--color-wcc-muted]">({d.reviews})</span>
              <span className="ml-auto flex items-center gap-0.5 text-[--color-wcc-muted]">
                <MapPin size={10} /> {d.city}
              </span>
            </div>
            <div className="mt-1 text-[10.5px] text-[--color-wcc-sage]">{d.availability}</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-[13px] font-bold text-[--color-wcc-ink]">CA${d.priceCad}</div>
              <button className="relative overflow-hidden rounded-full bg-[--color-wcc-sage] px-3.5 py-1 text-[11px] font-semibold text-white">
                <span className="relative z-10">Book</span>
                <span className="wcc-sheen pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-white/40" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
