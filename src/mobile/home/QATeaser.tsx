import { MessagesSquare, ArrowRight, MessageCircle } from "lucide-react";
import { qa } from "./data";

export function QATeaser() {
  return (
    <section className="px-4 pt-4" data-reveal>
      <style>{`
        @keyframes wcc-qa-pop-in { 0%{transform:scale(0) rotate(-30deg);opacity:0} 100%{transform:scale(1) rotate(0);opacity:1} }
        .wcc-qa { transition: transform 300ms ease-out; }
        .wcc-qa:hover, .wcc-qa:active { transform: translateX(4px); }
        .wcc-qa .wcc-qa-pop { opacity: 0; transform: scale(0); }
        .wcc-qa:hover .wcc-qa-pop, .wcc-qa:active .wcc-qa-pop { animation: wcc-qa-pop-in 350ms cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .wcc-qa .wcc-qa-link::after { content:""; display:block; height:1.5px; width:0; background:#E8912D; transition: width 400ms ease-out; }
        .wcc-qa:hover .wcc-qa-link::after, .wcc-qa:active .wcc-qa-link::after { width:100%; }
        @media (prefers-reduced-motion: reduce) { .wcc-qa,.wcc-qa *{transition:none!important;transform:none!important;animation:none!important;opacity:1!important} }
      `}</style>
      <div className="wcc-qa flex items-center gap-3 rounded-2xl bg-[--color-wcc-mist] p-3.5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[--color-wcc-sage]">
          <MessagesSquare size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <MessageCircle size={12} className="wcc-qa-pop text-[--color-wcc-orange]" />
            <div className="text-[12.5px] font-medium text-[--color-wcc-ink]">{qa.question}</div>
          </div>
          <button className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[--color-wcc-orange]">
            <span className="wcc-qa-link">{qa.cta}</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
}
