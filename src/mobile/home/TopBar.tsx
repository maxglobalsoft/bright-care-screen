import { Bell, Search, X } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { user } from "./data";
import logoAsset from "@/assets/wcc-logo-v2.png.asset.json";
import { Img } from "./Img";

export function TopBar({ shadow }: { shadow: boolean }) {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [beat, setBeat] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const submit = () => {
    setSearchOpen(false);
    navigate({ to: "/doctors" });
  };

  return (
    <div
      className={`sticky top-0 z-20 flex items-center gap-2 bg-white px-3 pb-3 pt-2 transition-shadow duration-300 ${
        shadow ? "shadow-[0_4px_12px_-8px_rgba(0,0,0,0.15)]" : ""
      }`}
      style={{ minHeight: 96 }}
    >
      <button
        type="button"
        onClick={() => setBeat((n) => n + 1)}
        aria-label="WellnessCareConnect"
        className="shrink-0"
      >
        <motion.img
          src={logoAsset.url}
          alt="WellnessCareConnect — Every health matters"
          className="h-[84px] w-[84px] object-contain"
          animate={reduce || beat === 0 ? { scale: 1 } : { scale: [1, 1.12, 0.97, 1.06, 1] }}
          transition={{ duration: 0.7 }}
          key={beat}
        />
      </button>

      <div className="flex-1" />

      <div className="flex shrink-0 items-center gap-1">
        <motion.button
          type="button"
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
          whileHover={reduce ? undefined : { scale: 1.06, y: -1 }}
          whileTap={reduce ? undefined : { scale: 0.88 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
        >
          <Search size={20} style={{ color: "#23291F" }} />
        </motion.button>

        <motion.button
          type="button"
          aria-label="Notifications"
          onClick={() =>
            toast.info(`${user.notifications} new notifications`, {
              description: "You have upcoming appointments and reminders.",
            })
          }
          whileHover={reduce ? undefined : { scale: 1.06, y: -1 }}
          whileTap={reduce ? undefined : { scale: 0.88 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full"
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
          onClick={() => navigate({ to: "/profile" })}
          whileHover={reduce ? undefined : { scale: 1.06 }}
          whileTap={reduce ? undefined : { scale: 0.88 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-full"
        >
          <Img src={user.avatar!} alt="You" wrapperClassName="h-full w-full" rounded="rounded-full" />
        </motion.button>
      </div>

      {/* Search popup */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(20,25,20,0.45)", backdropFilter: "blur(4px)" }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              className="w-full max-w-[340px] rounded-2xl bg-white p-3 shadow-2xl"
            >
              <div className="flex items-center gap-2 rounded-xl border border-[--color-wcc-sage] bg-[--color-wcc-mist] px-3 py-2.5">
                <Search size={18} className="text-[--color-wcc-green-deep]" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submit();
                  }}
                  placeholder="Search doctors, symptoms, medicines"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-[--color-wcc-ink] outline-none placeholder:text-[--color-wcc-muted]"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="grid h-7 w-7 place-items-center rounded-full text-[--color-wcc-muted] hover:bg-black/5"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Cardiology", "Pediatrics", "Dermatology", "Lab tests", "Pharmacy"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQuery(s);
                      submit();
                    }}
                    className="rounded-full border border-black/10 px-3 py-1 text-[12px] text-[--color-wcc-ink] hover:bg-[--color-wcc-mist]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
