import { Bell } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { user } from "./data";
import logoAsset from "@/assets/wcc-logo-v2.png.asset.json";
import { Img } from "./Img";

export function TopBar({ shadow }: { shadow: boolean }) {
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState(0);
  return (
    <div
      className={`sticky top-0 z-20 flex h-[68px] items-center justify-between bg-white px-4 pb-3 pt-2 transition-shadow duration-300 ${
        shadow ? "shadow-[0_4px_12px_-8px_rgba(0,0,0,0.15)]" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => setBeat((n) => n + 1)}
        className="flex items-center gap-3 text-left"
      >
        <motion.img
          src={logoAsset.url}
          alt="WellnessCareConnect"
          className="h-[52px] w-[52px] object-contain"
          animate={reduce || beat === 0 ? { scale: 1 } : { scale: [1, 1.18, 0.95, 1.12, 0.98, 1] }}
          transition={{ duration: 0.7 }}
          key={beat}
        />
        <div className="leading-tight">
          <div className="text-[17px] font-bold tracking-tight">
            <span style={{ color: "#567257" }}>Wellness</span>{" "}
            <span style={{ color: "#E8912D" }}>Care</span>{" "}
            <span style={{ color: "#3C4F3D" }}>Connect</span>
          </div>
          <div className="text-[10px] font-medium uppercase tracking-[0.16em]" style={{ color: "#6B7280" }}>
            Every health matters
          </div>
        </div>
      </button>
      <div className="flex items-center gap-2.5">
        <motion.button
          type="button"
          aria-label="Notifications"
          whileTap={reduce ? undefined : { scale: 0.94 }}
          className="relative grid h-9 w-9 place-items-center rounded-full"
        >
          <motion.span
            style={{ display: "inline-flex", transformOrigin: "50% 15%" }}
            initial={reduce ? false : { rotate: 0 }}
            animate={reduce ? undefined : { rotate: [0, -15, 12, -8, 0] }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <Bell size={20} style={{ color: "#23291F" }} />
          </motion.span>
          <motion.span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full ring-2 ring-white"
            style={{ backgroundColor: "#E8912D" }}
            initial={reduce ? false : { scale: 1 }}
            animate={reduce ? undefined : { scale: [1, 1.4, 1] }}
            transition={{ duration: 1, delay: 0.4, repeat: 2, repeatType: "loop" }}
          />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Profile"
          whileHover={reduce ? undefined : { scale: 1.06 }}
          whileTap={reduce ? undefined : { scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="h-9 w-9 cursor-pointer overflow-hidden rounded-full"
        >
          <Img src={user.avatar!} alt="You" wrapperClassName="h-full w-full" rounded="rounded-full" />
        </motion.button>
      </div>
    </div>
  );
}
