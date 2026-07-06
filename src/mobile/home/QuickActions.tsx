import { Video, Pill, FlaskConical, MessageCircle, type LucideIcon } from "lucide-react";
import { useState } from "react";

type Action = { key: string; label: string; icon: LucideIcon };
const actions: Action[] = [
  { key: "consult", label: "Consult now", icon: Video },
  { key: "meds", label: "Order meds", icon: Pill },
  { key: "lab", label: "Lab test", icon: FlaskConical },
  { key: "ask", label: "Ask free", icon: MessageCircle },
];

// Radial burst particle positions
const particles = [
  { x: 0, y: -22, c: "#567257" },
  { x: 20, y: -12, c: "#E8912D" },
  { x: 22, y: 10, c: "#567257" },
  { x: 0, y: 22, c: "#E8912D" },
  { x: -22, y: 10, c: "#567257" },
  { x: -20, y: -12, c: "#E8912D" },
];

export function QuickActions() {
  const [pressed, setPressed] = useState<string | null>(null);
  return (
    <section className="px-4 pt-3" data-reveal>
      <style>{`
        @keyframes wcc-chip-lift { 0%{transform:translateY(0)} 40%{transform:translateY(-6px)} 100%{transform:translateY(0)} }
        @keyframes wcc-particle { 0%{transform:translate(0,0) scale(0);opacity:1} 60%{opacity:1} 100%{transform:translate(var(--tx),var(--ty)) scale(1);opacity:0} }
        .wcc-qa-chip { transition: transform 250ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 250ms ease-out; }
        .wcc-qa-chip:hover { transform: translateY(-3px); box-shadow: 0 8px 18px -12px rgba(86,114,87,0.5); }
        .wcc-qa-chip.pressed { animation: wcc-chip-lift 400ms cubic-bezier(0.34,1.56,0.64,1); }
        .wcc-qa-icon { transition: transform 250ms ease-out; }
        .wcc-qa-chip.pressed .wcc-qa-icon { transform: scale(1.15); }
        .wcc-particle { animation: wcc-particle 500ms ease-out forwards; }
        @media (prefers-reduced-motion: reduce){ .wcc-qa-chip,.wcc-qa-icon,.wcc-particle{animation:none!important;transform:none!important} }
      `}</style>
      <div className="grid grid-cols-4 gap-2">
        {actions.map((a) => {
          const Icon = a.icon;
          const isPressed = pressed === a.key;
          return (
            <button
              key={a.key}
              onClick={() => { setPressed(a.key); setTimeout(() => setPressed(null), 500); }}
              className={`wcc-qa-chip ${isPressed ? "pressed" : ""} relative flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3`}
              style={{ backgroundColor: "#F3F6F2" }}
            >
              <span
                className="wcc-qa-icon relative grid h-9 w-9 place-items-center rounded-full shadow-sm"
                style={{ backgroundColor: "#FFFFFF", color: "#567257" }}
              >
                <Icon size={16} />
                {isPressed && (
                  <span className="pointer-events-none absolute inset-0">
                    {particles.map((p, i) => (
                      <span
                        key={i}
                        className="wcc-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: p.c, ["--tx" as never]: `${p.x}px`, ["--ty" as never]: `${p.y}px` }}
                      />
                    ))}
                  </span>
                )}
              </span>
              <span className="text-[12px] font-semibold leading-tight text-center" style={{ color: "#23291F" }}>
                {a.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
