import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import logoAsset from "@/assets/wcc-logo-v2.png.asset.json";

type Mode = "login" | "signup";
type Stage = "form" | "otp";

export function AuthScreen() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [stage, setStage] = useState<Stage>("form");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (stage === "otp") otpRefs.current[0]?.focus();
  }, [stage]);

  const sendOtp = () => {
    if (mode === "login" && phone.trim().length < 6) {
      toast.error("Enter a valid phone number");
      return;
    }
    if (mode === "signup" && (name.trim().length < 2 || phone.trim().length < 6)) {
      toast.error("Please fill in your details");
      return;
    }
    setOtp(["", "", "", ""]);
    setStage("otp");
    toast.success("OTP sent", { description: "Use 1234 to continue." });
  };

  const verify = () => {
    if (otp.some((d) => d === "")) {
      toast.error("Enter the 4-digit code");
      return;
    }
    toast.success(mode === "login" ? "Welcome back ✓" : "Account created ✓");
    setTimeout(() => navigate({ to: "/profile" }), 400);
  };

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[i] = d;
      return next;
    });
    if (d && i < 3) otpRefs.current[i + 1]?.focus();
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setStage("form");
  };

  return (
    <div className="relative flex h-full w-full flex-col" style={{ backgroundColor: "#F3F6F2" }}>
      <div className="h-11 shrink-0" style={{ backgroundColor: "#3C4F3D" }} />
      {/* Header */}
      <div
        className="relative px-6 pb-10 pt-4"
        style={{
          backgroundColor: "#3C4F3D",
          borderBottomLeftRadius: 36,
          borderBottomRightRadius: 36,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <motion.img
            src={logoAsset.url}
            alt="WellnessCareConnect logo"
            className="h-16 w-auto object-contain"
            animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.6 }}
          />
          <div className="mt-1 text-[18px] font-bold" style={{ color: "#FFFFFF" }}>
            Wellness<span style={{ color: "#E8912D" }}> Care </span>Connect
          </div>
          <div className="mt-0.5 text-[10px] font-semibold tracking-[0.16em]" style={{ color: "#FFFFFF" }}>
            EVERY HEALTH MATTERS
          </div>
        </motion.div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8 pt-6" style={{ scrollbarWidth: "none" }}>
        {/* Segmented tabs */}
        <div className="relative flex rounded-full p-1" style={{ backgroundColor: "#FFFFFF" }}>
          {(["login", "signup"] as Mode[]).map((m) => {
            const active = mode === m;
            return (
              <motion.button
                key={m}
                onClick={() => switchMode(m)}
                whileTap={reduce ? undefined : { scale: 0.96 }}
                className="relative z-10 flex-1 rounded-full py-2 text-[13px] font-bold"
                style={{ color: active ? "#FFFFFF" : "#23291F" }}
              >
                {active && (
                  <motion.span
                    layoutId="auth-tab"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "#567257" }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{m === "login" ? "Login" : "Sign Up"}</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${stage}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            {stage === "form" ? (
              <div className="flex flex-col gap-3">
                {mode === "signup" && (
                  <>
                    <Field label="Full name" value={name} onChange={setName} placeholder="e.g. Priya Sharma" />
                    <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
                  </>
                )}
                <Field label="Phone number" value={phone} onChange={setPhone} placeholder="+1 555 123 4567" type="tel" />
                <motion.button
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  onClick={sendOtp}
                  className="mt-3 rounded-2xl py-3 text-[14px] font-bold"
                  style={{ backgroundColor: "#E8912D", color: "#FFFFFF" }}
                >
                  {mode === "login" ? "Send OTP" : "Create Account"}
                </motion.button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-[13px]" style={{ color: "#23291F" }}>Enter the 4-digit code</div>
                <div className="text-[11px]" style={{ color: "#6B7280" }}>Sent to {phone}</div>
                <div className="mt-4 flex gap-3">
                  {otp.map((d, i) => (
                    <motion.input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      value={d}
                      onChange={(e) => setDigit(i, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !d && i > 0) otpRefs.current[i - 1]?.focus();
                      }}
                      inputMode="numeric"
                      maxLength={1}
                      whileFocus={{ scale: 1.05 }}
                      className="h-14 w-12 rounded-2xl text-center text-[20px] font-bold outline-none"
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#23291F",
                        border: `2px solid ${d ? "#567257" : "#EEF1EE"}`,
                      }}
                    />
                  ))}
                </div>
                <motion.button
                  whileTap={reduce ? undefined : { scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => toast.success("Code resent", { description: "Use 1234 to continue." })}
                  className="mt-4 text-[12px] font-semibold"
                  style={{ color: "#567257" }}
                >
                  Resend code
                </motion.button>
                <motion.button
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  onClick={verify}
                  className="mt-4 w-full rounded-2xl py-3 text-[14px] font-bold"
                  style={{ backgroundColor: "#567257", color: "#FFFFFF" }}
                >
                  Verify & Continue
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: "#EEF1EE" }} />
          <span className="text-[11px]" style={{ color: "#6B7280" }}>or continue with</span>
          <div className="h-px flex-1" style={{ backgroundColor: "#EEF1EE" }} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "google", label: "Google", glyph: "G" },
            { key: "facebook", label: "Facebook", glyph: "f" },
          ].map((s) => (
            <motion.button
              key={s.key}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              onClick={() => toast.info(`${s.label} sign-in`, { description: "Available at launch." })}
              className="flex items-center justify-center gap-2 rounded-2xl py-2.5"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #EEF1EE" }}
            >
              <span
                className="grid h-6 w-6 place-items-center rounded-full text-[13px] font-bold"
                style={{ backgroundColor: s.key === "google" ? "#F3F6F2" : "#3C4F3D", color: s.key === "google" ? "#DC4B4B" : "#FFFFFF" }}
              >
                {s.glyph}
              </span>
              <span className="text-[13px] font-semibold" style={{ color: "#23291F" }}>{s.label}</span>
            </motion.button>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px]" style={{ color: "#6B7280" }}>
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold" style={{ color: "#6B7280" }}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-2xl px-4 py-3 text-[13px] outline-none placeholder:text-[#6B7280]"
        style={{ backgroundColor: "#FFFFFF", color: "#23291F", border: "1px solid #EEF1EE" }}
      />
    </label>
  );
}
