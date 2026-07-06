import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import logoAsset from "@/assets/wcc-logo-v2.png.asset.json";

const SAGE = "#567257";
const ORANGE = "#E8912D";
const MIST = "#F3F6F2";
const MUTED = "#9AA39A";

type Particle = {
  left: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  drift: number;
};

export function SplashScreen() {
  const navigate = useNavigate();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  useEffect(() => {
    const fadeT = setTimeout(() => setFadingOut(true), 1600);
    const navT = setTimeout(() => navigate({ to: "/home" }), 1900);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(navT);
    };
  }, [navigate]);

  const particles = useMemo<Particle[]>(
    () => [
      { left: 12, size: 3, color: SAGE, duration: 12, delay: 0, drift: -8 },
      { left: 22, size: 2, color: ORANGE, duration: 14, delay: 2, drift: 6 },
      { left: 38, size: 4, color: SAGE, duration: 11, delay: 4, drift: -10 },
      { left: 52, size: 3, color: ORANGE, duration: 13, delay: 1, drift: 8 },
      { left: 66, size: 2, color: SAGE, duration: 12, delay: 3, drift: -6 },
      { left: 78, size: 4, color: ORANGE, duration: 14, delay: 5, drift: 10 },
      { left: 88, size: 3, color: SAGE, duration: 13, delay: 2.5, drift: -8 },
    ],
    [],
  );

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 300ms ease-out",
        background: `linear-gradient(180deg, #FFFFFF 0%, ${MIST} 100%)`,
      }}
    >
      <style>{`
        @keyframes wcc-logo-in {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes wcc-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.015); }
        }
        @keyframes wcc-ring {
          0% { transform: translate(-50%, -50%) scale(0.4); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
        @keyframes wcc-shine {
          0% { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          15% { opacity: 0.75; }
          100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }
        @keyframes wcc-dot {
          0%, 60%, 100% { transform: scale(0.7); opacity: 0.35; }
          30% { transform: scale(1); opacity: 1; }
        }
        @keyframes wcc-float {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          100% { transform: translate3d(var(--drift), -120%, 0); opacity: 0; }
        }
      `}</style>

      {/* radial sage glow behind center */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 620,
          height: 620,
          background: `radial-gradient(circle, ${SAGE}0F 0%, ${SAGE}00 60%)`,
        }}
      />

      {/* floating particles */}
      {!reducedMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {particles.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                bottom: -10,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                opacity: 0.15,
                ["--drift" as string]: `${p.drift}px`,
                animation: `wcc-float ${p.duration}s linear ${p.delay}s infinite`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      )}

      {/* logo stack */}
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className="relative flex items-center justify-center"
          style={{ width: "78%", aspectRatio: "1 / 1" }}
        >
          {/* heartbeat ring */}
          {!reducedMotion && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: "72%",
                height: "72%",
                background: `conic-gradient(from 0deg, ${SAGE}, ${ORANGE}, ${SAGE})`,
                WebkitMask:
                  "radial-gradient(circle, transparent 58%, black 60%, black 68%, transparent 70%)",
                mask: "radial-gradient(circle, transparent 58%, black 60%, black 68%, transparent 70%)",
                transform: "translate(-50%, -50%) scale(0.4)",
                opacity: 0,
                animation: "wcc-ring 700ms ease-out 400ms 1 forwards",
                willChange: "transform, opacity",
              }}
            />
          )}

          {/* breathing wrapper */}
          <div
            className="relative flex h-full w-full items-center justify-center"
            style={
              reducedMotion
                ? undefined
                : {
                    animation:
                      "wcc-logo-in 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both, wcc-breathe 3s ease-in-out 1100ms infinite",
                    willChange: "transform, opacity",
                  }
            }
          >
            <img
              src={logoAsset.url}
              alt="WellnessCareConnect"
              className="h-full w-full select-none object-contain"
              draggable={false}
            />

            {/* diagonal shine */}
            {!reducedMotion && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{
                  WebkitMaskImage: `url(${logoAsset.url})`,
                  maskImage: `url(${logoAsset.url})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              >
                <span
                  className="absolute top-0 h-full"
                  style={{
                    left: 0,
                    width: "35%",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)",
                    animation: "wcc-shine 500ms ease-in-out 600ms 1 both",
                    willChange: "transform, opacity",
                  }}
                />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* loading dots */}
      <div
        className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
        style={{ bottom: 96 }}
        aria-label="Loading"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block rounded-full"
            style={{
              width: 6,
              height: 6,
              backgroundColor: SAGE,
              animation: reducedMotion
                ? undefined
                : `wcc-dot 1.2s ease-in-out ${i * 0.15}s infinite`,
              opacity: reducedMotion ? 0.7 : undefined,
            }}
          />
        ))}
      </div>

      {/* version */}
      <div
        className="absolute left-1/2 -translate-x-1/2 tracking-wide"
        style={{ bottom: 24, fontSize: 10, color: MUTED }}
      >
        v1.0
      </div>
    </div>
  );
}
