import { MessagesSquare, ArrowRight } from "lucide-react";
import { qa } from "./data";

export function QATeaser() {
  return (
    <section className="px-4 pt-4" data-reveal>
      <style>{`
        .wcc-qa { transition: transform 300ms ease-out; }
        .wcc-qa:hover, .wcc-qa:active { transform: translateX(4px); }
        .wcc-qa .wcc-qa-link::after { content:""; display:block; height:1.5px; width:0; background:#E8912D; transition: width 400ms ease-out; }
        .wcc-qa:hover .wcc-qa-link::after, .wcc-qa:active .wcc-qa-link::after { width:100%; }
        @media (prefers-reduced-motion: reduce) { .wcc-qa,.wcc-qa *{transition:none!important;transform:none!important} }
      `}</style>
      <div className="wcc-qa flex items-center gap-3 rounded-2xl bg-[--color-wcc-mist] p-3.5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[--color-wcc-sage]">
          <MessagesSquare size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-medium text-[--color-wcc-ink]">{qa.question}</div>
          <button className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[--color-wcc-orange]">
            <span className="wcc-qa-link">{qa.cta}</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
}
