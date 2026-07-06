import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { services } from "./data";
import { Img } from "./Img";

export function ServicesRow() {
  const [tap, setTap] = useState<string | null>(null);
  return (
    <section className="grid grid-cols-2 gap-3 px-4 pt-5" data-reveal>
      <style>{`
        @keyframes wcc-depth { 0%{transform:translateY(0)} 20%{transform:translateY(2px)} 60%{transform:translateY(-6px)} 100%{transform:translateY(0)} }
        @keyframes wcc-arrow-shoot { 0%{transform:translateX(0);opacity:1} 60%{transform:translateX(10px);opacity:1} 100%{transform:translateX(2px);opacity:1} }
        @keyframes wcc-trail { 0%{transform:scaleX(0);opacity:0.9} 100%{transform:scaleX(1);opacity:0} }
        .wcc-svc { transition: transform 250ms ease-out, box-shadow 250ms ease-out, border-color 300ms ease-out; }
        .wcc-svc:hover { box-shadow: 0 14px 28px -16px rgba(0,0,0,0.25); border-color:#567257; }
        .wcc-svc.tapped { animation: wcc-depth 500ms cubic-bezier(0.34,1.56,0.64,1); border-color:#567257; box-shadow: 0 14px 28px -16px rgba(0,0,0,0.25); }
        .wcc-svc-img { transition: transform 400ms ease-out; }
        .wcc-svc:hover .wcc-svc-img, .wcc-svc.tapped .wcc-svc-img { transform: scale(1.1); }
        .wcc-svc.tapped .wcc-svc-arrow { animation: wcc-arrow-shoot 500ms ease-out; color:#E8912D; }
        .wcc-svc.tapped .wcc-svc-trail { animation: wcc-trail 500ms ease-out; }
        @media (prefers-reduced-motion: reduce) { .wcc-svc *{animation:none!important;transform:none!important} }
      `}</style>
      {services.map((s) => (
        <button
          key={s.key}
          onClick={() => { setTap(s.key); setTimeout(() => setTap(null), 600); }}
          className={`wcc-svc ${tap === s.key ? "tapped" : ""} flex flex-col overflow-hidden rounded-2xl text-left shadow-[0_2px_10px_-6px_rgba(0,0,0,0.08)]`}
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #EEF1EE" }}
        >
          <Img
            src={s.image}
            alt={s.title}
            wrapperClassName="h-[72px] w-full overflow-hidden"
            rounded="rounded-none"
            className="wcc-svc-img"
          />
          <div className="flex items-center gap-2 p-3">
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold" style={{ color: "#23291F" }}>{s.title}</div>
              <div className="truncate text-[11px]" style={{ color: "#6B7280" }}>{s.sub}</div>
            </div>
            <div className="relative">
              <span
                className="wcc-svc-trail absolute right-4 top-1/2 h-0.5 w-3 origin-right -translate-y-1/2 rounded-full"
                style={{ backgroundColor: "#E8912D", opacity: 0 }}
              />
              <ChevronRight size={16} className="wcc-svc-arrow" style={{ color: "#6B7280" }} />
            </div>
          </div>
        </button>
      ))}
    </section>
  );
}
