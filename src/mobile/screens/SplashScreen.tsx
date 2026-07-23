import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import webmAsset from "@/assets/wcc-splash.webm.asset.json";
import videoAsset from "@/assets/wcc-splash.mp4.asset.json";
import posterAsset from "@/assets/wcc-splash-poster.png.asset.json";

// Hard cap so we never trap the user if the video truly fails to load.
const HARD_TIMEOUT_MS = 20000;

export function SplashScreen() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterOnly, setPosterOnly] = useState(!!reduced);
  const [soundOn, setSoundOn] = useState(true);
  const [soundBlocked, setSoundBlocked] = useState(false);
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
        v.muted = false;
        v.defaultMuted = false;
        v.volume = 1;
        v.load();
      } catch {
        /* noop */
      }
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          setSoundBlocked(true);
          v.muted = true;
          setSoundOn(false);
          void v.play().catch(() => {});
        });
      }
    }

    return () => clearTimeout(hardT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const handleError = () => {
    // Only fall back if the video genuinely cannot play.
    setPosterOnly(true);
    window.setTimeout(goHome, 1600);
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !soundOn;
    v.muted = !next;
    v.volume = next ? 1 : 0;
    setSoundOn(next);
    if (next) {
      setSoundBlocked(false);
      void v.play().catch(() => setSoundBlocked(true));
    }
  };

  const startWithSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.defaultMuted = false;
    v.volume = 1;
    setSoundOn(true);
    setSoundBlocked(false);
    void v.play().catch(() => setSoundBlocked(true));
  };

  const fillStyle: CSSProperties = {
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
          poster={posterAsset.url}
          autoPlay
          muted={false}
          playsInline
          preload="auto"
          onEnded={goHome}
          onError={handleError}
          onVolumeChange={(e) => setSoundOn(!(e.currentTarget.muted || e.currentTarget.volume === 0))}
          className="absolute inset-0 h-full w-full"
          style={fillStyle}
        >
          <source src={webmAsset.url} type="video/webm" />
          <source src={videoAsset.url} type="video/mp4" />
        </video>
      )}
      {!posterOnly && (
        <motion.button
          type="button"
          aria-label={soundOn ? "Turn splash sound off" : "Turn splash sound on"}
          onClick={toggleSound}
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35 }}
          className="absolute right-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-black/25 text-white shadow-[0_12px_28px_-14px_rgba(0,0,0,0.7)] backdrop-blur-md"
          style={{ top: "max(12px, env(safe-area-inset-top))" }}
        >
          {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </motion.button>
      )}
      {null}

    </div>
  );
}
