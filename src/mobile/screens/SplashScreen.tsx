import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import videoAsset from "@/assets/wcc-splash.mp4.asset.json";
import posterAsset from "@/assets/wcc-splash-poster.png.asset.json";

const HARD_TIMEOUT_MS = 20000;
const STALL_MS = 3500;

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
    const hardT = window.setTimeout(goHome, HARD_TIMEOUT_MS);

    if (reduced) {
      const t = window.setTimeout(goHome, 1600);
      return () => {
        clearTimeout(hardT);
        clearTimeout(t);
      };
    }

    let firstFrame = false;
    const stallT = window.setTimeout(() => {
      if (!firstFrame) {
        setPosterOnly(true);
        window.setTimeout(goHome, 1400);
      }
    }, STALL_MS);

    const v = videoRef.current;
    const onPlaying = () => {
      firstFrame = true;
      clearTimeout(stallT);
    };
    v?.addEventListener("playing", onPlaying);

    return () => {
      clearTimeout(hardT);
      clearTimeout(stallT);
      v?.removeEventListener("playing", onPlaying);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const handleError = () => {
    setPosterOnly(true);
    window.setTimeout(goHome, 1400);
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
          onStalled={handleError}
          className="absolute inset-0 h-full w-full"
          style={fillStyle}
        />
      )}
    </div>
  );
}
