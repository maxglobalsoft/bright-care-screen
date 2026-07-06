import { MessagesSquare, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { qa } from "./data";

export function QATeaser() {
  const reduce = useReducedMotion();
  return (
    <section className="px-4 pt-4" data-reveal>
      <motion.button
        type="button"
        initial="rest"
        animate="rest"
        whileHover={reduce ? undefined : "active"}
        whileTap={reduce ? undefined : "active"}
        variants={{ rest: { x: 0 }, active: { x: 6 } }}
        className="flex w-full items-center gap-3 rounded-2xl p-3.5 text-left"
        style={{ backgroundColor: "#F3F6F2" }}
      >
        <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: "#FFFFFF", color: "#567257" }}>
          <motion.span
            style={{ display: "inline-flex" }}
            variants={{
              rest: { scale: 1 },
              active: { scale: [1, 1.3, 1], transition: { duration: 0.4 } },
            }}
          >
            <MessagesSquare size={18} />
          </motion.span>
          <motion.span
            className="absolute h-1 w-1 rounded-full"
            style={{ left: 28, top: 8, backgroundColor: "#E8912D" }}
            variants={{
              rest: { y: 0, opacity: 0, scale: 0 },
              active: { y: -14, opacity: [0, 1, 0], scale: [0, 1, 1], transition: { duration: 0.7, delay: 0.06 } },
            }}
          />
          <motion.span
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{ left: 32, top: 6, backgroundColor: "#567257" }}
            variants={{
              rest: { y: 0, opacity: 0, scale: 0 },
              active: { y: -14, opacity: [0, 1, 0], scale: [0, 1, 1], transition: { duration: 0.8, delay: 0.18 } },
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-medium" style={{ color: "#23291F" }}>{qa.question}</div>
          <div className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-semibold" style={{ color: "#E8912D" }}>
            <span className="relative inline-block">
              {qa.cta}
              <motion.span
                className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left"
                style={{ backgroundColor: "#E8912D" }}
                variants={{
                  rest: { scaleX: 0 },
                  active: { scaleX: 1, transition: { duration: 0.35, ease: "easeOut" } },
                }}
              />
            </span>
            <ArrowRight size={12} />
          </div>
        </div>
      </motion.button>
    </section>
  );
}
