import { Star, BadgeCheck, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { doctors } from "./data";
import { Img } from "./Img";

export function DoctorsRail() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  return (
    <section className="pt-5" data-reveal>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold" style={{ color: "#23291F" }}>Top doctors</h2>
        <button onClick={() => navigate({ to: "/doctors" })} className="text-[13px] font-medium" style={{ color: "#567257" }}>View all</button>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {doctors.map((d) => (
          <motion.div
            key={d.name}
            role="button"
            tabIndex={0}
            initial="rest"
            animate="rest"
            whileHover={reduce ? undefined : "active"}
            whileTap={reduce ? undefined : "active"}
            variants={{ rest: {}, active: {} }}
            className="w-[200px] shrink-0 cursor-pointer rounded-2xl p-3 shadow-[0_2px_10px_-6px_rgba(0,0,0,0.10)]"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #EEF1EE" }}
          >
            <div className="relative overflow-hidden rounded-xl">
              <motion.div
                variants={{ rest: { scale: 1 }, active: { scale: 1.12, transition: { duration: 0.6, ease: "easeOut" } } }}
              >
                <Img src={d.photo} alt={d.name} wrapperClassName="h-[120px]" />
              </motion.div>
              {d.verified && (
                <div className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full shadow" style={{ backgroundColor: "rgba(255,255,255,0.95)" }}>
                  <BadgeCheck size={14} style={{ color: "#567257" }} />
                </div>
              )}
            </div>
            <div className="mt-2 text-[13px] font-semibold" style={{ color: "#23291F" }}>{d.name}</div>
            <div className="text-[11px]" style={{ color: "#6B7280" }}>{d.specialty} · {d.years}y</div>
            <div className="mt-1 flex items-center gap-0.5 text-[11px]" style={{ color: "#23291F" }}>
              {[0, 1, 2, 3, 4].map((k) => (
                <motion.span
                  key={k}
                  variants={{
                    rest: { scale: 1, color: "#CBD5C7" },
                    active: { color: "#E8912D", scale: [1, 1.4, 1], transition: { duration: 0.3, delay: k * 0.07 } },
                  }}
                  style={{ display: "inline-block" }}
                >
                  <Star size={11} style={{ fill: "currentColor", color: "currentColor" }} />
                </motion.span>
              ))}
              <span className="ml-1 font-semibold">{d.rating}</span>
              <span style={{ color: "#6B7280" }}>({d.reviews})</span>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[10.5px]">
              <span className="flex items-center gap-0.5" style={{ color: "#6B7280" }}><MapPin size={10} />{d.city}</span>
              <span style={{ color: "#567257" }}>{d.availability}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="rounded-full px-2 py-0.5 text-[12px] font-bold" style={{ backgroundColor: "#F3F6F2", color: "#23291F" }}>
                CA${d.priceCad}
              </span>
              <motion.button
                className="relative overflow-hidden rounded-full px-4 py-1.5 text-[13px] font-bold shadow-sm"
                variants={{
                  rest: { backgroundColor: "#567257" },
                  active: { backgroundColor: "#3C4F3D" },
                }}
                style={{ color: "#FFFFFF" }}
              >
                <span className="relative z-10" style={{ color: "#FFFFFF" }}>Book</span>
                <motion.span
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)" }}
                  variants={{
                    rest: { x: "-120%" },
                    active: { x: "220%", transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
