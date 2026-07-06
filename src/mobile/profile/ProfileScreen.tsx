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
      {/* Header — solid, centered column */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center"
        style={{
          backgroundColor: "#3C4F3D",
          padding: "24px 16px 56px",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <div className="relative">
          <div
            className="grid place-items-center rounded-full"
            style={{
              width: 96,
              height: 96,
              backgroundColor: "#567257",
              border: "3px solid #FFFFFF",
              color: "#FFFFFF",
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            PS
          </div>
          <motion.button
            whileHover={reduce ? undefined : { scale: 1.15, rotate: -8, boxShadow: "0 6px 16px rgba(232,145,45,0.55)" }}
            whileTap={reduce ? undefined : { scale: 0.88, rotate: 8 }}
            transition={{ type: "spring", stiffness: 420, damping: 16 }}
            onClick={() => toast.info("Photo upload coming soon")}
            aria-label="Edit photo"
            className="absolute bottom-0 right-0 grid place-items-center rounded-full"
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(145deg,#F0A24A,#E8912D 55%,#C0731A)",
              border: "2px solid #3C4F3D",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            <Camera size={16} color="#FFFFFF" />
          </motion.button>
        </div>

        <div style={{ marginTop: 12, color: "#FFFFFF", fontSize: 20, fontWeight: 600 }}>
          Priya Sharma
        </div>

        <div
          style={{
            marginTop: 4,
            color: "rgba(255,255,255,0.75)",
            fontSize: 13,
            fontWeight: 400,
            whiteSpace: "nowrap",
          }}
        >
          +1 555 010 2233 · priya@example.com
        </div>

        <div
          style={{
            marginTop: 10,
            height: 26,
            padding: "0 12px",
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 9999,
            backgroundColor: "rgba(232,145,45,0.16)",
            border: "1px solid #E8912D",
            color: "#E8912D",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          Member since 2026
        </div>
      </motion.div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth: "none" }}>
        {/* Stats row — overlapping cards */}
        <div className="relative flex" style={{ margin: "-40px 16px 0", gap: 12, zIndex: 10 }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.3, ease: "easeOut" }}
              whileHover={reduce ? undefined : { y: -3, boxShadow: "0 8px 20px rgba(35,41,31,0.16)" }}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              onClick={() => {
                if (s.label === "Appointments") navigate({ to: "/doctors" });
                else if (s.label === "Orders") navigate({ to: "/pharmacy" });
                else toast.info(s.label, { description: "Coming in development phase" });
              }}
              className="flex flex-1 cursor-pointer flex-col items-center justify-center"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: "16px 0",
                boxShadow: "0 4px 12px rgba(35,41,31,0.10)",
              }}
            >
              <div style={{ color: "#3C4F3D", fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
              <div style={{ marginTop: 2, color: "#6B7280", fontSize: 12, fontWeight: 400 }}>{s.label}</div>
            </motion.div>
          ))}
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
