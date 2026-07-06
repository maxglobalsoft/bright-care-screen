import { motion, useReducedMotion } from "framer-motion";
import { specialties } from "./data";

export function SpecialtiesRow() {
  const reduce = useReducedMotion();
  return (
    <section className="pt-5" data-reveal>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold" style={{ color: "#23291F" }}>Specialties</h2>
        <button className="text-[13px] font-medium" style={{ color: "#567257" }}>See all</button>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {specialties.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.button
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
              whileHover={reduce ? undefined : "active"}
              whileTap={reduce ? undefined : "active"}
              variants={{
                rest: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
                active: { y: -8, boxShadow: "0 12px 28px rgba(86,114,87,0.25)" },
              }}
              className="flex w-[76px] shrink-0 cursor-pointer flex-col items-center gap-1.5 rounded-2xl p-2"
              style={{ perspective: 600 }}
            >
              <motion.div
                className="relative"
                style={{ width: 56, height: 56, transformStyle: "preserve-3d" }}
                variants={{
                  rest: { rotateY: 0 },
                  active: { rotateY: 180, transition: { duration: 0.4, ease: "easeOut" } },
                }}
              >
                <div
                  className="absolute inset-0 grid place-items-center rounded-2xl"
                  style={{ backgroundColor: "#F3F6F2", backfaceVisibility: "hidden" }}
                >
                  <Icon size={24} style={{ color: "#567257" }} />
                </div>
                <div
                  className="absolute inset-0 grid place-items-center rounded-2xl"
                  style={{
                    backgroundColor: "#E8912D",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Icon size={24} style={{ color: "#FFFFFF" }} />
                </div>
              </motion.div>
              <div className="text-[11px] font-medium leading-tight text-center" style={{ color: "#23291F" }}>{s.label}</div>
              <motion.div
                className="text-[10px]"
                variants={{
                  rest: { y: 0, color: "#6B7280" },
                  active: { y: -3, color: "#567257" },
                }}
              >
                {s.doctors} drs
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
