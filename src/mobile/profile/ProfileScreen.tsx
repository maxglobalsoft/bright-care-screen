import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Calendar,
  FileText,
  ShoppingBag,
  CreditCard,
  Bell,
  LifeBuoy,
  LogOut,
  Camera,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { BottomTabBar } from "@/mobile/home/BottomTabBar";


type MenuRow = {
  key: string;
  label: string;
  icon: LucideIcon;
  action: "nav-doctors" | "nav-pharmacy" | "toast" | "toggle" | "logout" | "support";
  info?: string;
};

const menu: MenuRow[] = [
  { key: "appts", label: "My Appointments", icon: Calendar, action: "nav-doctors" },
  { key: "records", label: "Medical Records", icon: FileText, action: "toast", info: "Coming in development phase" },
  { key: "orders", label: "My Orders", icon: ShoppingBag, action: "nav-pharmacy" },
  { key: "pay", label: "Payment Methods", icon: CreditCard, action: "toast", info: "Coming in development phase" },
  { key: "notif", label: "Notifications", icon: Bell, action: "toggle" },
  { key: "help", label: "Help & Support", icon: LifeBuoy, action: "support" },
];

export function ProfileScreen() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [notif, setNotif] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  const stats = [
    { label: "Appointments", value: 12 },
    { label: "Orders", value: 8 },
    { label: "Reports", value: 5 },
  ];

  const handle = (row: MenuRow) => {
    switch (row.action) {
      case "nav-doctors":
        navigate({ to: "/doctors" });
        break;
      case "nav-pharmacy":
        navigate({ to: "/pharmacy" });
        break;
      case "toast":
        toast.info(row.label, { description: row.info });
        break;
      case "support":
        toast.info("Help & Support", { description: "support@wellnesscareconnect.com" });
        break;
      case "logout":
        setShowLogout(true);
        break;
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col" style={{ backgroundColor: "#F3F6F2" }}>
      <div className="h-11 shrink-0" style={{ background: "linear-gradient(180deg,#2E4030 0%,#3C4F3D 100%)" }} />
      {/* Header — refined hero */}
      <div
        className="relative overflow-hidden px-5 pb-16 pt-5"
        style={{
          background: "linear-gradient(160deg,#2E4030 0%,#3C4F3D 55%,#567257 130%)",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        {/* soft decorative glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(232,145,45,0.28), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.10), transparent 70%)" }}
        />

        <div className="relative flex items-center gap-4">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative"
          >
            <div
              className="grid h-[72px] w-[72px] place-items-center rounded-full text-[22px] font-bold"
              style={{
                background: "linear-gradient(145deg,#7A9679,#4A6249)",
                color: "#FFFFFF",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.25), 0 8px 20px -8px rgba(0,0,0,0.5)",
                border: "2px solid rgba(255,255,255,0.9)",
              }}
            >
              PS
            </div>
            <motion.button
              whileTap={reduce ? undefined : { scale: 0.9 }}
              onClick={() => toast.info("Photo upload coming soon")}
              aria-label="Edit photo"
              className="absolute -bottom-0.5 -right-0.5 grid h-7 w-7 place-items-center rounded-full"
              style={{
                background: "linear-gradient(145deg,#F5A94A,#D97B1F)",
                border: "2px solid #3C4F3D",
                boxShadow: "0 3px 8px -2px rgba(0,0,0,0.4)",
              }}
            >
              <Camera size={12} color="#FFFFFF" />
            </motion.button>
          </motion.div>

          {/* Identity */}
          <div className="min-w-0 flex-1">
            <div className="truncate text-[17px] font-bold leading-tight" style={{ color: "#FFFFFF" }}>
              Priya Sharma
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[9.5px] font-semibold"
                style={{
                  background: "rgba(232,145,45,0.18)",
                  color: "#F5C989",
                  border: "1px solid rgba(232,145,45,0.35)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F5A94A" }} />
                Member since 2026
              </span>
            </div>
            <div className="mt-1.5 truncate text-[10.5px]" style={{ color: "rgba(255,255,255,0.72)" }}>
              +1 555 010 2233
            </div>
            <div className="truncate text-[10.5px]" style={{ color: "rgba(255,255,255,0.72)" }}>
              priya@example.com
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth: "none" }}>
        {/* Stats — floating card */}
        <div className="-mt-10 px-4">
          <div
            className="grid grid-cols-3 overflow-hidden rounded-2xl"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 12px 32px -14px rgba(35,41,31,0.28), 0 2px 6px -2px rgba(35,41,31,0.08)",
            }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 260, damping: 22 }}
                className="px-3 py-3.5 text-center"
                style={{ borderLeft: i === 0 ? "none" : "1px solid #EEF2EC" }}
              >
                <div className="text-[19px] font-bold leading-none" style={{ color: "#3C4F3D" }}>{s.value}</div>
                <div className="mt-1 text-[10.5px] font-medium" style={{ color: "#6B7280" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="mx-4 mt-5 overflow-hidden rounded-2xl" style={{ backgroundColor: "#FFFFFF" }}>
          {menu.map((row, i) => {
            const Icon = row.icon;
            return (
              <motion.button
                key={row.key}
                onClick={() => handle(row)}
                whileTap={reduce ? undefined : { scale: 0.98, backgroundColor: "#F3F6F2" }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                style={{ borderTop: i === 0 ? "none" : "1px solid #F3F6F2" }}
              >
                <div className="grid h-9 w-9 place-items-center rounded-full" style={{ backgroundColor: "#EAF0EA" }}>
                  <Icon size={16} color="#567257" />
                </div>
                <span className="flex-1 text-[13.5px] font-semibold" style={{ color: "#23291F" }}>{row.label}</span>
                {row.action === "toggle" ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); setNotif((v) => !v); }}
                    aria-label="Toggle notifications"
                    className="relative h-6 w-11 rounded-full transition-colors"
                    style={{ backgroundColor: notif ? "#567257" : "#EEF1EE" }}
                  >
                    <motion.span
                      layout
                      className="absolute top-0.5 h-5 w-5 rounded-full"
                      style={{ backgroundColor: "#FFFFFF", left: notif ? 22 : 2, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                ) : (
                  <ChevronRight size={16} color="#6B7280" />
                )}
              </motion.button>
            );
          })}
          <motion.button
            onClick={() => setShowLogout(true)}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
            style={{ borderTop: "1px solid #F3F6F2" }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-full" style={{ backgroundColor: "#FFF0F0" }}>
              <LogOut size={16} color="#DC4B4B" />
            </div>
            <span className="flex-1 text-[13.5px] font-semibold" style={{ color: "#DC4B4B" }}>Log Out</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showLogout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogout(false)}
              className="absolute inset-0 z-30"
              style={{ backgroundColor: "rgba(35,41,31,0.5)" }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="absolute left-1/2 top-1/2 z-40 w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-6"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="text-center text-[16px] font-bold" style={{ color: "#23291F" }}>Log out?</div>
              <div className="mt-1 text-center text-[12px]" style={{ color: "#6B7280" }}>
                You'll need to sign in again to access your account.
              </div>
              <div className="mt-5 flex gap-3">
                <motion.button
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  onClick={() => setShowLogout(false)}
                  className="flex-1 rounded-2xl py-2.5 text-[13px] font-bold"
                  style={{ backgroundColor: "#F3F6F2", color: "#23291F" }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  onClick={() => {
                    setShowLogout(false);
                    toast.success("Logged out");
                    setTimeout(() => navigate({ to: "/auth" }), 200);
                  }}
                  className="flex-1 rounded-2xl py-2.5 text-[13px] font-bold"
                  style={{ backgroundColor: "#DC4B4B", color: "#FFFFFF" }}
                >
                  Log out
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomTabBar activeTab="profile" />
    </div>
  );
}
