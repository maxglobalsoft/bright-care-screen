import { Video, Pill, FlaskConical, MessageCircle, type LucideIcon } from "lucide-react";
import { useState } from "react";

type Action = { key: string; label: string; icon: LucideIcon };
const actions: Action[] = [
  { key: "consult", label: "Consult now", icon: Video },
  { key: "meds", label: "Order meds", icon: Pill },
  { key: "lab", label: "Lab test", icon: FlaskConical },
  { key: "ask", label: "Ask free", icon: MessageCircle },
];

export function QuickActions() {
  const [pressed, setPressed] = useState<string | null>(null);
  return (
    <section className="px-4 pt-3" data-reveal>
      <style>{`
        .wcc-qa-chip { transition: transform 250ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 250ms ease-out; }
        .wcc-qa-chip:hover, .wcc-qa-chip:active { transform: translateY(-3px); box-shadow: 0 8px 18px -12px rgba(86,114,87,0.5); }
        .wcc-qa-icon { transition: transform 400ms ease-out, background-color 300ms ease-out, color 300ms ease-out; transform-style: preserve-3d; }
        .wcc-qa-chip:hover .wcc-qa-icon, .wcc-qa-chip.pressed .wcc-qa-icon { transform: rotateY(180deg); background-color: #E8912D; color: #ffffff; }
        @media (prefers-reduced-motion: reduce){ .wcc-qa-chip,.wcc-qa-icon{transition:none!important;transform:none!important} }
      `}</style>
      <div className="grid grid-cols-4 gap-2">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.key}
              onClick={() => { setPressed(a.key); setTimeout(() => setPressed(null), 500); }}
              className={`wcc-qa-chip ${pressed === a.key ? "pressed" : ""} flex flex-col items-center gap-1.5 rounded-2xl bg-[--color-wcc-mist] px-2 py-3`}
            >
              <span className="wcc-qa-icon grid h-9 w-9 place-items-center rounded-full bg-white text-[--color-wcc-sage] shadow-sm">
                <Icon size={16} />
              </span>
              <span className="text-[12px] font-semibold text-[--color-wcc-ink] leading-tight text-center">{a.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
