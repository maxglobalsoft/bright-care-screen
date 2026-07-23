import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import videoAsset from "@/assets/wcc-splash.mp4.asset.json";
import posterAsset from "@/assets/wcc-splash-poster.png.asset.json";

// Hard cap so we never trap the user if the video truly fails to load.
const HARD_TIMEOUT_MS = 20000;

export function SplashScreen() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterOnly, setPosterOnly] = useState(!!reduced);
  const doneRef = useRef(false);

  const goHome = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    navigate({ to: "/home", replace: true });
  };

  useEffect(() => {
    // Absolute safety net only — do NOT shorten normal playback.
    const hardT = window.setTimeout(goHome, HARD_TIMEOUT_MS);

    if (reduced) {
      const t = window.setTimeout(goHome, 1800);
      return () => {
        clearTimeout(hardT);
        clearTimeout(t);
      };
    }

    // Force playback from the very beginning of the film.
    const v = videoRef.current;
    if (v) {
      try {
        v.currentTime = 0;
      } catch {
        /* noop */
      }
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }

    return () => clearTimeout(hardT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const handleError = () => {
    // Only fall back if the video genuinely cannot play.
    setPosterOnly(true);
    window.setTimeout(goHome, 1600);
  };

  const fillStyle: React.CSSProperties = {
    objectFit: "cover",
    objectPosition: "center",
  };

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#000" }}>
      {posterOnly ? (
        <img
          src={posterAsset.url}
          alt="WellnessCareConnect"
          className="absolute inset-0 h-full w-full"
          style={fillStyle}
        />
      ) : (
        <video
          ref={videoRef}
          src={videoAsset.url}
          poster={posterAsset.url}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={goHome}
          onError={handleError}
          className="absolute inset-0 h-full w-full"
          style={fillStyle}
        />
      )}
    </div>
  );
}
