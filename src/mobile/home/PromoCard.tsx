import { Sparkles } from "lucide-react";
import { promo } from "./data";
import { Img } from "./Img";

export function PromoCard() {
  return (
    <div className="px-4 pt-4" data-reveal>
      <style>{`
        @keyframes wcc-promo-hue { 0%,100%{filter:hue-rotate(0deg)} 50%{filter:hue-rotate(-8deg)} }
        @keyframes wcc-promo-float { 0%,100%{box-shadow:0 10px 24px -14px rgba(31,74,58,0.55)} 50%{box-shadow:0 16px 32px -14px rgba(31,74,58,0.7)} }
        @keyframes wcc-sparkle { 0%{transform:translate(-10%,60%) rotate(0);opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{transform:translate(110%,-20%) rotate(90deg);opacity:0} }
        .wcc-promo { animation: wcc-promo-hue 9s ease-in-out infinite, wcc-promo-float 4s ease-in-out infinite; }
        .wcc-promo:active { transform: perspective(600px) rotateX(2deg) rotateY(-2deg); box-shadow: 0 20px 40px -14px rgba(31,74,58,0.8); }
        .wcc-promo { transition: transform 250ms ease-out; }
        .wcc-sparkle { animation: wcc-sparkle 4s ease-in-out infinite; animation-delay: 2s; }
        @media (prefers-reduced-motion: reduce) { .wcc-promo,.wcc-sparkle{animation:none} }
      `}</style>
      <div className="wcc-promo relative overflow-hidden rounded-[18px] bg-gradient-to-br from-[--color-wcc-sage] via-[--color-wcc-green-primary] to-[--color-wcc-green-deep] p-4 text-white">
        <div className="pr-[110px]">
          <div className="text-[11px] font-medium uppercase tracking-wider opacity-80">{promo.eyebrow}</div>
          <div className="mt-1 text-[15px] font-semibold leading-snug">{promo.title}</div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[--color-wcc-orange] px-3 py-1 text-[12px] font-bold tracking-wide text-white shadow-sm">
            <Sparkles size={12} /> {promo.code}
          </div>
        </div>
        <div className="pointer-events-none absolute right-2 top-2 bottom-2 w-[112px] overflow-hidden rounded-2xl">
          <Img src={promo.image} alt="" wrapperClassName="absolute inset-0" rounded="rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-[--color-wcc-green-deep] via-[--color-wcc-green-primary]/40 to-transparent" />
        </div>
        <div className="wcc-sparkle pointer-events-none absolute left-0 top-0 h-6 w-6">
          <Sparkles size={16} className="text-white/80" />
        </div>
      </div>
    </div>
  );
}
