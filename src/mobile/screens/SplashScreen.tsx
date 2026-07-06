import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import logoAsset from "@/assets/wcc-logo-v2.png.asset.json";

const TOKENS = {
  SAGE: "#567257",
  ORANGE: "#E8912D",
  MIST: "#F3F6F2",
  MUTED: "#9AA39A",
};

const TIMING = {
  ENTRANCE_MS: 800,
  RING_SAGE_DELAY: 700,
  RING_ORANGE_DELAY: 900,
  RING_DURATION: 900,
  SHINE_DELAY: 1100,
  SHINE_DURATION: 500,
  BREATHE_START: 1600,
  EXIT_START: 2200,
  EXIT_DURATION: 350,
};

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
    const fadeT = setTimeout(() => setFadingOut(true), TIMING.EXIT_START);
    const navT = setTimeout(
      () => navigate({ to: "/home" }),
      TIMING.EXIT_START + TIMING.EXIT_DURATION,
    );
    return () => {
      clearTimeout(fadeT);
      clearTimeout(navT);
    };
  }, [navigate]);

  const particles = useMemo<Particle[]>(
    () => [
      { left: 12, size: 3, color: TOKENS.SAGE, duration: 12, delay: 0, drift: -8 },
      { left: 22, size: 2, color: TOKENS.ORANGE, duration: 14, delay: 2, drift: 6 },
      { left: 38, size: 4, color: TOKENS.SAGE, duration: 11, delay: 4, drift: -10 },
      { left: 52, size: 3, color: TOKENS.ORANGE, duration: 13, delay: 1, drift: 8 },
      { left: 66, size: 2, color: TOKENS.SAGE, duration: 12, delay: 3, drift: -6 },
      { left: 78, size: 4, color: TOKENS.ORANGE, duration: 14, delay: 5, drift: 10 },
      { left: 88, size: 3, color: TOKENS.SAGE, duration: 13, delay: 2.5, drift: -8 },
    ],
    [],
  );

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        opacity: fadingOut ? 0 : 1,
        transition: `opacity ${TIMING.EXIT_DURATION}ms ease-out`,
        background: `linear-gradient(180deg, #FFFFFF 0%, ${TOKENS.MIST} 100%)`,
      }}
    >
      <style>{`
        @keyframes wcc-logo-in {
          0%   { transform: perspective(800px) rotateX(4deg) scale(0.55); opacity: 0; filter: drop-shadow(0 4px 8px rgba(86,114,87,0)); }
          50%  { opacity: 1; }
          81%  { transform: perspective(800px) rotateX(1deg) scale(1.04); opacity: 1; filter: drop-shadow(0 14px 22px rgba(86,114,87,0.18)); }
          100% { transform: perspective(800px) rotateX(0deg) scale(1); opacity: 1; filter: drop-shadow(0 10px 18px rgba(86,114,87,0.15)); }
        }
        @keyframes wcc-breathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.02); }
        }
        @keyframes wcc-ring {
          0%   { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          20%  { opacity: 0.25; }
          100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
        }
        @keyframes wcc-shine {
          0%   { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          20%  { opacity: 0.85; }
          80%  { opacity: 0.85; }
          100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }
        @keyframes wcc-dot {
          0%, 60%, 100% { transform: translateY(0) scale(0.75); opacity: 0.4; }
          30%           { transform: translateY(-4px) scale(1); opacity: 1; }
        }
        @keyframes wcc-float {
          0%   { transform: translate3d(0, 0, 0); opacity: 0; }
          10%  { opacity: 0.15; }
          90%  { opacity: 0.15; }
          100% { transform: translate3d(var(--drift), -120%, 0); opacity: 0; }
        }
      `}</style>

      {/* radial sage glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 620,
          height: 620,
          background: `radial-gradient(circle, ${TOKENS.SAGE}0F 0%, ${TOKENS.SAGE}00 60%)`,
        }}
      />

      {/* particles */}
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
          {/* sage ring */}
          {!reducedMotion && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: "100%",
                height: "100%",
                border: `2px solid ${TOKENS.SAGE}`,
                transform: "translate(-50%, -50%) scale(0.5)",
                opacity: 0,
                animation: `wcc-ring ${TIMING.RING_DURATION}ms ease-out ${TIMING.RING_SAGE_DELAY}ms 1 forwards`,
                willChange: "transform, opacity",
              }}
            />
          )}
          {/* orange ring */}
          {!reducedMotion && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: "100%",
                height: "100%",
                border: `2px solid ${TOKENS.ORANGE}`,
                transform: "translate(-50%, -50%) scale(0.5)",
                opacity: 0,
                animation: `wcc-ring ${TIMING.RING_DURATION}ms ease-out ${TIMING.RING_ORANGE_DELAY}ms 1 forwards`,
                willChange: "transform, opacity",
              }}
            />
          )}

          {/* breathing wrapper (starts after entrance) */}
          <div
            className="relative flex h-full w-full items-center justify-center"
            style={
              reducedMotion
                ? undefined
                : {
                    animation: `wcc-breathe 3s ease-in-out ${TIMING.BREATHE_START}ms infinite`,
                    willChange: "transform",
                  }
            }
          >
            {/* entrance wrapper */}
            <div
              className="relative flex h-full w-full items-center justify-center"
              style={
                reducedMotion
                  ? undefined
                  : {
                      animation: `wcc-logo-in ${TIMING.ENTRANCE_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1) both`,
                      willChange: "transform, opacity, filter",
                      transformOrigin: "center",
                    }
              }
            >
              <img
                src={logoAsset.url}
                alt="WellnessCareConnect"
                className="h-full w-full select-none object-contain"
                draggable={false}
              />

              {/* shine sweep */}
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
                      width: "55%",
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,220,180,0.35) 30%, rgba(255,255,255,0.9) 50%, rgba(255,220,180,0.35) 70%, rgba(255,255,255,0) 100%)",
                      animation: `wcc-shine ${TIMING.SHINE_DURATION}ms ease-in-out ${TIMING.SHINE_DELAY}ms 1 both`,
                      willChange: "transform, opacity",
                    }}
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* loading dots */}
      <div
        className="absolute left-1/2 flex -translate-x-1/2 items-end gap-2"
        style={{ bottom: 96, height: 12 }}
        aria-label="Loading"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block rounded-full"
            style={{
              width: 6,
              height: 6,
              backgroundColor: TOKENS.SAGE,
              animation: reducedMotion
                ? undefined
                : `wcc-dot 1.2s ease-in-out ${i * 0.15}s infinite`,
              opacity: reducedMotion ? 0.7 : undefined,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* version */}
      <div
        className="absolute left-1/2 -translate-x-1/2 tracking-wide"
        style={{ bottom: 24, fontSize: 10, color: TOKENS.MUTED }}
      >
        v1.0
      </div>
    </div>
  );
}
