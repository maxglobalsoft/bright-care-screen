import { Video, Pill, FlaskConical, MessageCircle, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

type Action = { key: string; label: string; icon: LucideIcon };
const actions: Action[] = [
  { key: "consult", label: "Consult now", icon: Video },
  { key: "meds", label: "Order meds", icon: Pill },
  { key: "lab", label: "Lab test", icon: FlaskConical },
  { key: "ask", label: "Ask free", icon: MessageCircle },
];

const particles = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2;
  return {
    x: Math.cos(angle) * 26,
    y: Math.sin(angle) * 26,
    color: i % 2 === 0 ? "#567257" : "#E8912D",
  };
});

export function QuickActions() {
  const reduce = useReducedMotion();
  return (
    <section className="px-4 pt-3" data-reveal>
      <div className="grid grid-cols-4 gap-2">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <motion.button
              key={a.key}
              whileTap={reduce ? undefined : "tap"}
              whileHover={reduce ? undefined : "hover"}
              initial="rest"
              animate="rest"
              variants={{
                rest: { scale: 1 },
                hover: { y: -2 },
                tap: { scale: [1, 0.92, 1.06, 1], transition: { duration: 0.4, times: [0, 0.25, 0.65, 1] } },
              }}
              className="relative flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl px-2 py-3"
              style={{ backgroundColor: "#F3F6F2" }}
            >
              <motion.span
                className="relative grid h-9 w-9 place-items-center rounded-full shadow-sm"
                style={{ color: "#567257" }}
                variants={{
                  rest: { backgroundColor: "#FFFFFF" },
                  tap: {
                    backgroundColor: ["#FFFFFF", "#E8912D", "#FFFFFF"],
                    transition: { duration: 0.45, times: [0, 0.5, 1] },
                  },
                }}
              >
                <Icon size={16} />
                {!reduce && particles.map((p, i) => (
                  <motion.span
                    key={i}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[3px] w-[3px] rounded-full"
                    style={{ backgroundColor: p.color, marginLeft: -1.5, marginTop: -1.5 }}
                    variants={{
                      rest: { x: 0, y: 0, opacity: 0, scale: 0 },
                      tap: {
                        x: p.x,
                        y: p.y,
                        opacity: [1, 1, 0],
                        scale: [0, 1, 1],
                        transition: { duration: 0.45, times: [0, 0.5, 1] },
                      },
                    }}
                  />
                ))}
              </motion.span>
              <span className="text-[12px] font-semibold leading-tight text-center" style={{ color: "#23291F" }}>
                {a.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
