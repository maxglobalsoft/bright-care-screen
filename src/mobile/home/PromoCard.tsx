import { Sparkles } from "lucide-react";
import { promo } from "./data";

export function PromoCard() {
  return (
    <div className="px-4 pt-4">
      <style>{`
        @keyframes wcc-promo-float {
          0%,100% { transform: translateY(0); box-shadow: 0 10px 24px -14px rgba(31,74,58,0.55); }
          50% { transform: translateY(-2px); box-shadow: 0 14px 30px -14px rgba(31,74,58,0.65); }
        }
        .wcc-promo { animation: wcc-promo-float 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .wcc-promo { animation: none; } }
      `}</style>
      <div className="wcc-promo relative overflow-hidden rounded-[18px] bg-gradient-to-br from-[--color-wcc-sage] via-[--color-wcc-green-primary] to-[--color-wcc-green-deep] p-4 text-white">
        <div className="pr-16">
          <div className="text-[11px] font-medium uppercase tracking-wider opacity-80">
            Limited offer
          </div>
          <div className="mt-1 text-[16px] font-semibold leading-snug">{promo.title}</div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[--color-wcc-orange] px-3 py-1 text-[12px] font-bold tracking-wide text-white shadow-sm">
            <Sparkles size={12} /> {promo.code}
          </div>
        </div>
        <div className="pointer-events-none absolute -right-4 -top-2 grid h-24 w-24 place-items-center rounded-full bg-white/10">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-white/15 text-[22px] font-bold">
            {promo.discount}
          </div>
        </div>
      </div>
    </div>
  );
}
