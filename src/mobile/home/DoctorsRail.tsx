import { Star, BadgeCheck, MapPin } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { doctors } from "./data";
import { Img } from "./Img";

export function DoctorsRail() {
  const [tap, setTap] = useState<{ i: number; x: number; y: number } | null>(null);
  const handleTap = (i: number, e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTap({ i, x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
    setTimeout(() => setTap(null), 1200);
  };
  return (
    <section className="pt-5" data-reveal>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold" style={{ color: "#23291F" }}>Top doctors</h2>
        <button className="text-[13px] font-medium" style={{ color: "#567257" }}>View all</button>
      </div>
      <style>{`
        @keyframes wcc-sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(220%)} }
        @keyframes wcc-star-pop { 0%{transform:scale(1);filter:brightness(1)} 50%{transform:scale(1.4);filter:brightness(1.4) drop-shadow(0 0 4px rgba(232,145,45,0.9))} 100%{transform:scale(1);filter:brightness(1)} }
        @keyframes wcc-spot-zoom { 0%{transform:scale(1)} 100%{transform:scale(1.08)} }
        .wcc-doc { transition: transform 300ms ease-out, box-shadow 300ms ease-out; }
        .wcc-doc:hover, .wcc-doc.tapped { transform: translateY(-3px); box-shadow: 0 14px 28px -12px rgba(0,0,0,0.18); }
        .wcc-doc.tapped .wcc-doc-photo { animation: wcc-spot-zoom 1000ms ease-out forwards; }
        .wcc-doc.tapped .wcc-spot { opacity: 1; }
        .wcc-spot { pointer-events:none; position:absolute; inset:0; opacity:0; transition: opacity 200ms ease-out; }
        .wcc-doc.tapped .wcc-star { animation: wcc-star-pop 400ms ease-out both; }
        .wcc-doc.tapped .wcc-star:nth-child(1){animation-delay:0ms}
        .wcc-doc.tapped .wcc-star:nth-child(2){animation-delay:80ms}
        .wcc-doc.tapped .wcc-star:nth-child(3){animation-delay:160ms}
        .wcc-doc.tapped .wcc-star:nth-child(4){animation-delay:240ms}
        .wcc-doc.tapped .wcc-star:nth-child(5){animation-delay:320ms}
        .wcc-doc.tapped .wcc-book-sweep { animation: wcc-sweep 800ms ease-in-out; }
        .wcc-doc.tapped .wcc-price { border-color:#E8912D; }
        @media (prefers-reduced-motion: reduce) { .wcc-doc *{animation:none!important;transform:none!important} }
      `}</style>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {doctors.map((d, i) => {
          const isTap = tap?.i === i;
          return (
            <div
              key={d.name}
              onClick={(e) => handleTap(i, e)}
              className={`wcc-doc ${isTap ? "tapped" : ""} w-[200px] shrink-0 rounded-2xl p-3 shadow-[0_2px_10px_-6px_rgba(0,0,0,0.10)]`}
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #EEF1EE" }}
            >
              <div className="relative overflow-hidden rounded-xl">
                <Img
                  src={d.photo}
                  alt={d.name}
                  wrapperClassName="h-[120px]"
                  className="wcc-doc-photo"
                />
                <div
                  className="wcc-spot"
                  style={{
                    background: isTap && tap
                      ? `radial-gradient(circle at ${tap.x}% ${tap.y}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 40%)`
                      : "none",
                  }}
                />
                {d.verified && (
                  <div className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full shadow" style={{ backgroundColor: "rgba(255,255,255,0.95)" }}>
                    <BadgeCheck size={14} style={{ color: "#567257" }} />
                  </div>
                )}
              </div>
              <div className="mt-2 text-[13px] font-semibold" style={{ color: "#23291F" }}>{d.name}</div>
              <div className="text-[11px]" style={{ color: "#6B7280" }}>{d.specialty} · {d.years}y</div>
              <div className="mt-1 flex items-center gap-0.5 text-[11px]" style={{ color: "#23291F" }}>
                {[0,1,2,3,4].map((k)=>(
                  <Star key={k} size={11} className="wcc-star" style={{ fill: "#E8912D", color: "#E8912D" }} />
                ))}
                <span className="ml-1 font-semibold">{d.rating}</span>
                <span style={{ color: "#6B7280" }}>({d.reviews})</span>
              </div>
              <div className="mt-0.5 flex items-center justify-between text-[10.5px]">
                <span className="flex items-center gap-0.5" style={{ color: "#6B7280" }}><MapPin size={10}/>{d.city}</span>
                <span style={{ color: "#567257" }}>{d.availability}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className="wcc-price rounded-full px-2 py-0.5 text-[12px] font-bold"
                  style={{ backgroundColor: "#F3F6F2", color: "#23291F", border: "1px solid transparent", transition: "border-color 300ms ease-out" }}
                >
                  CA${d.priceCad}
                </span>
                <button
                  className="relative overflow-hidden rounded-full px-4 py-1.5 text-[13px] font-bold shadow-sm"
                  style={{ backgroundColor: isTap ? "#3C4F3D" : "#567257", color: "#FFFFFF", transition: "background-color 250ms ease-out" }}
                >
                  <span className="relative z-10">Book</span>
                  <span className="wcc-book-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)" }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
