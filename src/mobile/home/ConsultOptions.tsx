import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { consultOptions } from "./data";

export function ConsultOptions() {
  const reduce = useReducedMotion();
  return (
    <section className="pt-5" data-reveal>
      <style>{`
        @keyframes wcc-consult-spark { to { transform: rotate(360deg); } }
        .wcc-consult-spark {
          position: absolute; inset: -2px; border-radius: 18px; padding: 2px; pointer-events: none;
          background: conic-gradient(from 0deg, transparent 0deg, #E8912D 30deg, #567257 60deg, transparent 120deg, transparent 360deg);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0;
        }
        .wcc-consult-active .wcc-consult-spark { opacity: 1; animation: wcc-consult-spark 700ms linear; }
        @media (prefers-reduced-motion: reduce) { .wcc-consult-spark { animation: none !important; } }
      `}</style>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold" style={{ color: "#23291F" }}>Consult now</h2>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {consultOptions.map((o, i) => {
          const Icon = o.icon;
          return (
            <motion.button
              key={o.key}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
              whileHover={reduce ? undefined : "active"}
              whileTap={reduce ? undefined : "active"}
              variants={{ rest: { scale: 1 }, active: { scale: 1.04 } }}
              onTapStart={(_, info) => {
                const el = (info?.point ? document.elementFromPoint(info.point.x, info.point.y) : null) as HTMLElement | null;
                const card = el?.closest(".wcc-consult-card") as HTMLElement | null;
                if (!card) return;
                card.classList.add("wcc-consult-active");
                setTimeout(() => card.classList.remove("wcc-consult-active"), 750);
              }}
              className="wcc-consult-card relative w-[140px] shrink-0 cursor-pointer rounded-2xl p-3 text-left shadow-[0_2px_10px_-6px_rgba(0,0,0,0.12)]"
              style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #EEF1EE" }}
            >
              <span className="wcc-consult-spark" />
              {o.popular && (
                <span
                  className="absolute -right-1 -top-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide shadow"
                  style={{ backgroundColor: "#E8912D", color: "#FFFFFF" }}
                >
                  Most popular
                </span>
              )}
              <motion.div
                className="grid h-10 w-10 place-items-center rounded-xl"
                style={{ backgroundColor: "#F3F6F2" }}
                variants={{
                  rest: { y: 0 },
                  active: { y: [0, -6, 0, -3, 0], transition: { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] } },
                }}
              >
                <Icon size={20} style={{ color: "#567257" }} />
              </motion.div>
              <div className="mt-2 text-[14px] font-semibold" style={{ color: "#23291F" }}>{o.label}</div>
              <div className="text-[11px]" style={{ color: "#6B7280" }}>{o.tagline}</div>
              <div className="mt-2 flex items-center justify-between">
                <motion.span
                  className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  variants={{
                    rest: { backgroundColor: "#F3F6F2", color: "#23291F" },
                    active: {
                      backgroundColor: ["#F3F6F2", "#E8912D", "#F3F6F2"],
                      color: ["#23291F", "#FFFFFF", "#23291F"],
                      transition: { duration: 0.4, times: [0, 0.5, 1] },
                    },
                  }}
                >
                  CA${o.priceCad}
                </motion.span>
                <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ backgroundColor: "#567257", color: "#FFFFFF" }}>
                  Start
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
