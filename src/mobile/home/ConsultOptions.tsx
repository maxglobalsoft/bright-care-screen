import { useState } from "react";
import { consultOptions } from "./data";

export function ConsultOptions() {
  const [active, setActive] = useState<string | null>("video");
  return (
    <section className="pt-5" data-reveal>
      <style>{`
        @keyframes wcc-price-pulse { 0%,100%{transform:scale(1);background-color:#F3F6F2;color:#0F1B12} 50%{transform:scale(1.15);background-color:#E8912D;color:#ffffff} }
        @keyframes wcc-btn-sheen { 0%{transform:translateX(-120%)} 100%{transform:translateX(220%)} }
        @keyframes wcc-badge-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.12);opacity:.85} }
        .wcc-consult { transition: transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms ease-out; }
        .wcc-consult:hover, .wcc-consult:active { transform: translateY(-4px) scale(1.03); box-shadow: 0 16px 32px -14px rgba(86,114,87,0.35); }
        .wcc-consult:hover .wcc-price, .wcc-consult:active .wcc-price { animation: wcc-price-pulse 600ms ease-out; }
        .wcc-consult:hover .wcc-btn-sheen, .wcc-consult:active .wcc-btn-sheen { animation: wcc-btn-sheen 700ms ease-in-out; }
        .wcc-badge-load { animation: wcc-badge-pulse 900ms ease-in-out 300ms infinite; }
        @media (prefers-reduced-motion: reduce) { .wcc-consult *,.wcc-badge-load{animation:none!important;transform:none!important} }
      `}</style>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold text-[--color-wcc-ink]">Consult now</h2>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {consultOptions.map((o) => {
          const Icon = o.icon;
          const isActive = active === o.key;
          return (
            <button
              key={o.key}
              onClick={() => setActive(o.key)}
              className="wcc-consult relative w-[140px] shrink-0 rounded-2xl bg-white p-3 text-left shadow-[0_2px_10px_-6px_rgba(0,0,0,0.12)] transition-all duration-250 hover:-translate-y-0.5 active:-translate-y-0.5"
              style={
                isActive
                  ? {
                      backgroundImage: "linear-gradient(white,white), linear-gradient(120deg,#567257,#E8912D)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      border: "1.5px solid transparent",
                    }
                  : { border: "1.5px solid #EEF1EE" }
              }
            >
              {o.popular && (
                <span className="wcc-badge-load absolute -right-1 -top-1 rounded-full bg-[--color-wcc-orange] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow">
                  Most popular
                </span>
              )}
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[--color-wcc-mist]">
                <Icon size={20} className="text-[--color-wcc-sage]" />
              </div>
              <div className="mt-2 text-[14px] font-semibold text-[--color-wcc-ink]">{o.label}</div>
              <div className="text-[11px] text-[--color-wcc-muted]">{o.tagline}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="wcc-price rounded-full bg-[--color-wcc-mist] px-2 py-0.5 text-[11px] font-semibold text-[--color-wcc-ink]">
                  CA${o.priceCad}
                </span>
                <span className="relative overflow-hidden rounded-full bg-[--color-wcc-sage] px-3 py-1 text-[11px] font-semibold text-white">
                  <span className="relative z-10">Start</span>
                  <span className="wcc-btn-sheen pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-white/40" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
