import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { services } from "./data";
import { Img } from "./Img";

export function ServicesRow() {
  const reduce = useReducedMotion();
  return (
    <section className="grid grid-cols-2 gap-3 px-4 pt-5" data-reveal>
      {services.map((s) => (
        <motion.button
          key={s.key}
          initial="rest"
          animate="rest"
          whileHover={reduce ? undefined : "hover"}
          whileTap={reduce ? undefined : "tap"}
          variants={{
            rest: { y: 0 },
            hover: { y: -2 },
            tap: { y: [0, 2, -8, 0], transition: { duration: 0.45, times: [0, 0.2, 0.7, 1] } },
          }}
          className="flex flex-col overflow-hidden rounded-2xl text-left shadow-[0_2px_10px_-6px_rgba(0,0,0,0.08)]"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #EEF1EE" }}
        >
          <div className="h-[72px] w-full overflow-hidden">
            <motion.div
              variants={{ rest: { scale: 1 }, tap: { scale: 1.1, transition: { duration: 0.4 } }, hover: { scale: 1.05 } }}
              className="h-full w-full"
            >
              <Img src={s.image} alt={s.title} wrapperClassName="h-[72px] w-full" rounded="rounded-none" />
            </motion.div>
          </div>
          <div className="flex items-center gap-2 p-3">
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold" style={{ color: "#23291F" }}>{s.title}</div>
              <div className="truncate text-[11px]" style={{ color: "#6B7280" }}>{s.sub}</div>
            </div>
            <div className="relative flex items-center">
              <motion.span
                className="absolute right-4 top-1/2 h-0.5 w-1.5 origin-right -translate-y-1/2 rounded-full"
                style={{ backgroundColor: "#E8912D" }}
                variants={{
                  rest: { scaleX: 0, opacity: 0 },
                  tap: { scaleX: 4, opacity: [0.9, 0], transition: { duration: 0.5 } },
                }}
              />
              <motion.span
                variants={{
                  rest: { x: 0, color: "#6B7280" },
                  tap: { x: 8, color: "#E8912D", transition: { duration: 0.4 } },
                  hover: { x: 3, color: "#E8912D" },
                }}
                style={{ display: "inline-flex" }}
              >
                <ChevronRight size={16} />
              </motion.span>
            </div>
          </div>
        </motion.button>
      ))}
    </section>
  );
}
