import { MessagesSquare, ArrowRight } from "lucide-react";
import { useState } from "react";
import { qa } from "./data";

export function QATeaser() {
  const [tap, setTap] = useState(false);
  return (
    <section className="px-4 pt-4" data-reveal>
      <style>{`
        @keyframes wcc-type-underline { 0%{width:0} 100%{width:100%} }
        @keyframes wcc-bubble-rise { 0%{transform:translateY(0) scale(0);opacity:0} 30%{opacity:1} 100%{transform:translateY(-14px) scale(1);opacity:0} }
        @keyframes wcc-icon-pop { 0%,100%{transform:scale(1)} 40%{transform:scale(1.2)} }
        .wcc-qa { transition: transform 300ms ease-out; }
        .wcc-qa:hover, .wcc-qa.tapped { transform: translateX(4px); }
        .wcc-qa.tapped .wcc-qa-line { animation: wcc-type-underline 500ms ease-out forwards; }
        .wcc-qa.tapped .wcc-qa-icon { animation: wcc-icon-pop 400ms cubic-bezier(0.34,1.56,0.64,1); }
        .wcc-bubble { position:absolute; border-radius:9999px; opacity:0; }
        .wcc-qa.tapped .wcc-bubble-1 { animation: wcc-bubble-rise 700ms ease-out 60ms forwards; }
        .wcc-qa.tapped .wcc-bubble-2 { animation: wcc-bubble-rise 800ms ease-out 180ms forwards; }
        @media (prefers-reduced-motion: reduce) { .wcc-qa,.wcc-qa *{animation:none!important;transform:none!important;opacity:1!important} }
      `}</style>
      <button
        type="button"
        onClick={() => { setTap(true); setTimeout(() => setTap(false), 900); }}
        className={`wcc-qa ${tap ? "tapped" : ""} flex w-full items-center gap-3 rounded-2xl p-3.5 text-left`}
        style={{ backgroundColor: "#F3F6F2" }}
      >
        <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: "#FFFFFF", color: "#567257" }}>
          <MessagesSquare className="wcc-qa-icon" size={18} />
          <span className="wcc-bubble wcc-bubble-1 h-1.5 w-1.5" style={{ left: 26, top: 6, backgroundColor: "#E8912D" }} />
          <span className="wcc-bubble wcc-bubble-2 h-2 w-2" style={{ left: 30, top: 4, backgroundColor: "#567257" }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-medium" style={{ color: "#23291F" }}>{qa.question}</div>
          <div className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-semibold" style={{ color: "#E8912D" }}>
            <span className="relative inline-block">
              {qa.cta}
              <span
                className="wcc-qa-line absolute -bottom-0.5 left-0 h-[1.5px] w-0"
                style={{ backgroundColor: "#E8912D" }}
              />
            </span>
            <ArrowRight size={12} />
          </div>
        </div>
      </button>
    </section>
  );
}
