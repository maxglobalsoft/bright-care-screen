import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import logoAsset from "@/assets/wcc-logo.jpg.asset.json";
import { GradientCanvas } from "./GradientCanvas";

export function SplashScreen() {
  const navigate = useNavigate();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const showT = setTimeout(() => setVisible(true), 60);
    const delay = reducedMotion ? 1600 : 2400;
    const navT = setTimeout(() => {
      navigate({ to: "/app/home" });
    }, delay);
    return () => {
      clearTimeout(showT);
      clearTimeout(navT);
    };
  }, [navigate, reducedMotion]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <GradientCanvas animate={!reducedMotion} />

      {/* soft radial glow behind logo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 32% at 50% 50%, rgba(251,247,238,0.28) 0%, rgba(251,247,238,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative flex h-full w-full items-center justify-center">
        <img
          src={logoAsset.url}
          alt="WellnessCareConnect"
          className="select-none"
          style={{
            width: "62%",
            maxWidth: 260,
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.92)",
            transition: reducedMotion
              ? "none"
              : "opacity 700ms ease-out, transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.35))",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
