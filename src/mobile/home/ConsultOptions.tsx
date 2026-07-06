import { useState } from "react";
import { consultOptions } from "./data";

export function ConsultOptions() {
  const [active, setActive] = useState<string | null>("video");
  return (
    <section className="pt-5" data-reveal>
      <style>{`
        @keyframes wcc-price-flash { 0%,100%{transform:scale(1);background-color:#F3F6F2;color:#23291F} 50%{transform:scale(1.15);background-color:#E8912D;color:#FFFFFF} }
        @keyframes wcc-badge-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.12);opacity:.85} }
        @keyframes wcc-icon-bounce { 0%,100%{transform:translateY(0) rotate(0)} 30%{transform:translateY(-6px) rotate(-8deg)} 60%{transform:translateY(0) rotate(6deg)} }
        @keyframes wcc-spark { 0%{offset-distance:0%;opacity:1} 100%{offset-distance:100%;opacity:0} }
        .wcc-consult { transition: transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms ease-out; }
        .wcc-consult:hover, .wcc-consult.tapped { transform: translateY(-4px) scale(1.04); box-shadow: 0 16px 32px -14px rgba(86,114,87,0.35); }
        .wcc-consult.tapped .wcc-price { animation: wcc-price-flash 600ms ease-out; }
        .wcc-consult.tapped .wcc-c-icon { animation: wcc-icon-bounce 500ms cubic-bezier(0.34,1.56,0.64,1); }
        .wcc-badge-load { animation: wcc-badge-pulse 900ms ease-in-out 300ms infinite; }
        /* Energy border: rotating conic on tap */
        @keyframes wcc-energy-rot { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }
        .wcc-energy { position:absolute; inset:-2px; border-radius:18px; padding:2px; background: conic-gradient(from 0deg, #567257, #E8912D, #567257, transparent 70%); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity:0; }
        .wcc-consult.tapped .wcc-energy { opacity:1; animation: wcc-energy-rot 900ms linear; }
        @media (prefers-reduced-motion: reduce) { .wcc-consult *{animation:none!important;transform:none!important} }
      `}</style>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold" style={{ color: "#23291F" }}>Consult now</h2>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {consultOptions.map((o) => {
          const Icon = o.icon;
          const isActive = active === o.key;
          return (
            <button
              key={o.key}
              onClick={() => setActive(o.key)}
              className={`wcc-consult ${isActive ? "tapped" : ""} relative w-[140px] shrink-0 rounded-2xl p-3 text-left shadow-[0_2px_10px_-6px_rgba(0,0,0,0.12)]`}
              style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #EEF1EE" }}
            >
              <span className="wcc-energy pointer-events-none" />
              {o.popular && (
                <span
                  className="wcc-badge-load absolute -right-1 -top-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide shadow"
                  style={{ backgroundColor: "#E8912D", color: "#FFFFFF" }}
                >
                  Most popular
                </span>
              )}
              <div className="wcc-c-icon grid h-10 w-10 place-items-center rounded-xl" style={{ backgroundColor: "#F3F6F2" }}>
                <Icon size={20} style={{ color: "#567257" }} />
              </div>
              <div className="mt-2 text-[14px] font-semibold" style={{ color: "#23291F" }}>{o.label}</div>
              <div className="text-[11px]" style={{ color: "#6B7280" }}>{o.tagline}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="wcc-price rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ backgroundColor: "#F3F6F2", color: "#23291F" }}>
                  CA${o.priceCad}
                </span>
                <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ backgroundColor: "#567257", color: "#FFFFFF" }}>
                  Start
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
