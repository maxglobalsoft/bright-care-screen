import { Star, BadgeCheck, MapPin } from "lucide-react";
import { doctors } from "./data";
import { Img } from "./Img";

export function DoctorsRail() {
  return (
    <section className="pt-5" data-reveal>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold text-[--color-wcc-ink]">Top doctors</h2>
        <button className="text-[13px] font-medium text-[--color-wcc-sage]">View all</button>
      </div>
      <style>{`
        @keyframes wcc-sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes wcc-star-pop { 0%{transform:scale(1);filter:brightness(1)} 50%{transform:scale(1.35);filter:brightness(1.3)} 100%{transform:scale(1);filter:brightness(1)} }
        @keyframes wcc-sparkle { 0%,100%{transform:scale(1);filter:drop-shadow(0 0 0 rgba(232,145,45,0))} 50%{transform:scale(1.6);filter:drop-shadow(0 0 6px rgba(232,145,45,0.9))} }
        @keyframes wcc-badge-shimmer { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.5) drop-shadow(0 0 4px rgba(86,114,87,0.6))} }
        @keyframes wcc-price-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        .wcc-doc { transition: transform 300ms ease-out, box-shadow 300ms ease-out; }
        .wcc-doc:hover, .wcc-doc:active { transform: translateY(-3px); }
        .wcc-doc:hover .wcc-doc-photo, .wcc-doc:active .wcc-doc-photo { transform: scale(1.08); }
        .wcc-doc:hover .wcc-book-sweep, .wcc-doc:active .wcc-book-sweep { animation: wcc-sweep 700ms ease-in-out; }
        .wcc-doc:hover .wcc-star, .wcc-doc:active .wcc-star { animation: wcc-star-pop 500ms ease-out both; }
        .wcc-doc:hover .wcc-star:nth-child(2){animation-delay:80ms} .wcc-doc:hover .wcc-star:nth-child(3){animation-delay:160ms}
        .wcc-doc:hover .wcc-star:nth-child(4){animation-delay:240ms} .wcc-doc:hover .wcc-star:nth-child(5){animation:wcc-sparkle 700ms ease-out 320ms both}
        .wcc-doc:hover .wcc-badge, .wcc-doc:active .wcc-badge { animation: wcc-badge-shimmer 900ms ease-in-out; }
        .wcc-doc:hover .wcc-price, .wcc-doc:active .wcc-price { border-color: #E8912D; animation: wcc-price-pulse 600ms ease-out; }
        @media (prefers-reduced-motion: reduce) { .wcc-doc *{animation:none!important;transform:none!important} }
      `}</style>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {doctors.map((d) => (
          <div
            key={d.name}
            className="wcc-doc w-[200px] shrink-0 rounded-2xl border border-[#EEF1EE] bg-white p-3 shadow-[0_2px_10px_-6px_rgba(0,0,0,0.10)] transition-shadow duration-300 hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.18)]"
          >
            <div className="relative">
              <Img
                src={d.photo}
                alt={d.name}
                wrapperClassName="h-[120px]"
                className="wcc-doc-photo transition-transform duration-500"
              />
              {d.verified && (
                <div className="wcc-badge absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-white/95 shadow">
                  <BadgeCheck size={14} className="text-[--color-wcc-sage]" />
                </div>
              )}
            </div>
            <div className="mt-2 text-[13px] font-semibold text-[--color-wcc-ink]">{d.name}</div>
            <div className="text-[11px] text-[--color-wcc-muted]">{d.specialty} · {d.years}y</div>
            <div className="mt-1 flex items-center gap-0.5 text-[11px] text-[--color-wcc-ink]">
              {[0,1,2,3,4].map((i)=>(
                <Star key={i} size={11} className="wcc-star fill-[--color-wcc-orange] text-[--color-wcc-orange]" />
              ))}
              <span className="ml-1 font-semibold">{d.rating}</span>
              <span className="text-[--color-wcc-muted]">({d.reviews})</span>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[10.5px]">
              <span className="flex items-center gap-0.5 text-[--color-wcc-muted]"><MapPin size={10}/>{d.city}</span>
              <span className="text-[--color-wcc-sage]">{d.availability}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="wcc-price rounded-full border border-transparent bg-[--color-wcc-mist] px-2 py-0.5 text-[12px] font-bold text-[--color-wcc-ink] transition-colors duration-300">
                CA${d.priceCad}
              </span>
              <button className="relative overflow-hidden rounded-full bg-[--color-wcc-sage] px-4 py-1.5 text-[13px] font-bold text-white shadow-sm">
                <span className="relative z-10">Book</span>
                <span className="wcc-book-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[--color-wcc-green-deep] to-transparent" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
