import { ChevronRight } from "lucide-react";
import { services } from "./data";
import { Img } from "./Img";

export function ServicesRow() {
  return (
    <section className="grid grid-cols-2 gap-3 px-4 pt-5" data-reveal>
      <style>{`
        .wcc-svc { transition: transform 250ms ease-out, box-shadow 250ms ease-out; }
        .wcc-svc:hover, .wcc-svc:active { transform: translateY(-2px); box-shadow: 0 10px 24px -14px rgba(0,0,0,0.2); }
        .wcc-svc:hover .wcc-svc-img, .wcc-svc:active .wcc-svc-img { transform: scale(1.1); }
        .wcc-svc:hover .wcc-svc-arrow, .wcc-svc:active .wcc-svc-arrow { transform: translateX(4px); }
        .wcc-svc-img, .wcc-svc-arrow { transition: transform 350ms ease-out; }
        @media (prefers-reduced-motion: reduce) { .wcc-svc *{transition:none!important;transform:none!important} }
      `}</style>
      {services.map((s) => (
        <button
          key={s.key}
          className="wcc-svc flex flex-col overflow-hidden rounded-2xl border border-[#EEF1EE] bg-white text-left shadow-[0_2px_10px_-6px_rgba(0,0,0,0.08)]"
        >
          <Img
            src={s.image}
            alt={s.title}
            wrapperClassName="h-[72px] w-full"
            rounded="rounded-none"
            className="wcc-svc-img"
          />
          <div className="flex items-center gap-2 p-3">
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-[--color-wcc-ink]">{s.title}</div>
              <div className="truncate text-[11px] text-[--color-wcc-muted]">{s.sub}</div>
            </div>
            <ChevronRight size={16} className="wcc-svc-arrow text-[--color-wcc-muted]" />
          </div>
        </button>
      ))}
    </section>
  );
}
