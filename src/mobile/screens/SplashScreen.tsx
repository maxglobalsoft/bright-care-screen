import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import videoAsset from "@/assets/wcc-splash.mp4.asset.json";
import posterAsset from "@/assets/wcc-splash-poster.png.asset.json";

const MIST = "#F3F6F2";
const SKIP_GATE_MS = 1500;
const HARD_TIMEOUT_MS = 12000;
const STALL_MS = 2500;

export function SplashScreen() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canSkip, setCanSkip] = useState(false);
  const [muted, setMuted] = useState(true);
  const [posterOnly, setPosterOnly] = useState(!!reduced);
  const doneRef = useRef(false);

  const goHome = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    navigate({ to: "/home", replace: true });
  };

  useEffect(() => {
    const skipT = window.setTimeout(() => setCanSkip(true), SKIP_GATE_MS);
    const hardT = window.setTimeout(goHome, HARD_TIMEOUT_MS);

    if (reduced) {
      const t = window.setTimeout(goHome, 1200);
      return () => {
        clearTimeout(skipT);
        clearTimeout(hardT);
        clearTimeout(t);
      };
    }

    // Stall watchdog: if first frame never arrives
    let firstFrame = false;
    const stallT = window.setTimeout(() => {
      if (!firstFrame) {
        setPosterOnly(true);
        window.setTimeout(goHome, 1200);
      }
    }, STALL_MS);

    const v = videoRef.current;
    const onPlaying = () => {
      firstFrame = true;
      clearTimeout(stallT);
    };
    v?.addEventListener("playing", onPlaying);

    return () => {
      clearTimeout(skipT);
      clearTimeout(hardT);
      clearTimeout(stallT);
      v?.removeEventListener("playing", onPlaying);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const handleContainerTap = () => {
    if (!canSkip) return;
    goHome();
  };

  const handleError = () => {
    setPosterOnly(true);
    window.setTimeout(goHome, 1200);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden flex items-center justify-center"
      style={{ background: MIST }}
      onClick={handleContainerTap}
      role="button"
      aria-label="Splash — tap to skip after intro"
    >
      {posterOnly ? (
        <img
          src={posterAsset.url}
          alt="WellnessCareConnect"
          className="h-full w-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
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
          className="h-full w-full"
          style={{ objectFit: "cover", objectPosition: "center", background: MIST }}
        />
      )}

      {canSkip && !posterOnly && (
        <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 z-10">
          <motion.button
            type="button"
            onClick={toggleSound}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full"
            style={{
              width: 30,
              height: 30,
              background: "rgba(35,41,31,0.35)",
              color: "#FFFFFF",
              backdropFilter: "blur(6px)",
            }}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </motion.button>
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goHome();
            }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full"
            style={{
              height: 30,
              padding: "0 12px",
              background: "rgba(35,41,31,0.35)",
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 600,
              backdropFilter: "blur(6px)",
            }}
          >
            Skip ›
          </motion.button>
        </div>
      )}
    </div>
  );
}
