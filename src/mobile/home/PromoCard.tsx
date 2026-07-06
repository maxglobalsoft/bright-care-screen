import { Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { promo } from "./data";
import { Img } from "./Img";

export function PromoCard() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const applyPromo = () => {
    try { navigator.clipboard?.writeText(promo.code); } catch {}
    toast.success(`Promo ${promo.code} applied`, { description: "20% off will apply at booking." });
    navigate({ to: "/doctors" });
  };
  return (
    <div className="px-4 pt-4" data-reveal>
      <style>{`
        @keyframes wcc-promo-float { 0%,100%{box-shadow:0 10px 24px -14px rgba(31,74,58,0.55)} 50%{box-shadow:0 16px 32px -14px rgba(31,74,58,0.7)} }
        @keyframes wcc-sparkle-fly { 0%{transform:translate(-10%,60%) rotate(0);opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{transform:translate(110%,-20%) rotate(90deg);opacity:0} }
        .wcc-promo { animation: wcc-promo-float 4s ease-in-out infinite; transition: transform 250ms ease-out; }
        .wcc-promo:active { transform: perspective(600px) rotateX(2deg) rotateY(-2deg) scale(0.99); }
        .wcc-sparkle-fly { animation: wcc-sparkle-fly 4s ease-in-out 2s infinite; }
        @media (prefers-reduced-motion: reduce) { .wcc-promo,.wcc-sparkle-fly{animation:none} }
      `}</style>
      <motion.button
        type="button"
        onClick={applyPromo}
        initial="rest"
        animate="rest"
        whileHover={reduce ? undefined : "active"}
        whileTap={reduce ? undefined : "active"}
        variants={{
          rest: { scale: 1, y: 0 },
          active: { scale: 0.985, y: -2, transition: { type: "spring", stiffness: 300, damping: 15 } },
        }}
        className="wcc-promo relative w-full cursor-pointer overflow-hidden rounded-[18px] p-4 text-left"
        style={{ background: "linear-gradient(135deg,#567257 0%,#3C4F3D 100%)", color: "#FFFFFF" }}
      >
        <div className="pr-[104px]">
          <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#FFFFFF", opacity: 0.9 }}>
            {promo.eyebrow}
          </div>
          <div className="mt-1 text-[14px] font-semibold leading-snug" style={{ color: "#FFFFFF" }}>
            Enjoy 20% off your first online consult.
          </div>
          <motion.span
            whileHover={reduce ? undefined : { scale: 1.06, y: -1, boxShadow: "0 8px 18px -6px rgba(232,145,45,0.6)" }}
            whileTap={reduce ? undefined : { scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 14 }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold tracking-wide shadow-sm"
            style={{ backgroundColor: "#E8912D", color: "#FFFFFF" }}
          >
            <Sparkles size={12} /> {promo.code}
          </motion.span>
        </div>
        <div className="pointer-events-none absolute right-2 top-2 bottom-2 w-[96px] overflow-hidden rounded-2xl">
          <Img src={promo.image} alt="" wrapperClassName="absolute inset-0" rounded="rounded-2xl" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg,#3C4F3D 0%,rgba(60,79,61,0.35) 55%,rgba(60,79,61,0) 100%)" }}
          />
        </div>
        <div className="wcc-sparkle-fly pointer-events-none absolute left-0 top-0 h-6 w-6">
          <Sparkles size={16} style={{ color: "#FFFFFF", opacity: 0.9 }} />
        </div>
      </motion.button>
    </div>
  );
}
