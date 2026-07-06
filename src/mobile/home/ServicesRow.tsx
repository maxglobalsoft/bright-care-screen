import { ChevronRight } from "lucide-react";
import { services } from "./data";

export function ServicesRow() {
  return (
    <section className="grid grid-cols-2 gap-3 px-4 pt-5">
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <button
            key={s.key}
            className="flex items-center gap-3 rounded-2xl border border-[#EEF1EE] bg-white p-3 text-left shadow-[0_2px_10px_-6px_rgba(0,0,0,0.08)] transition-transform duration-200 active:-translate-y-0.5"
          >
            <div
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
              style={{ backgroundColor: s.tint }}
            >
              <Icon size={20} style={{ color: s.iconColor }} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-[--color-wcc-ink]">{s.title}</div>
              <div className="truncate text-[11px] text-[--color-wcc-muted]">{s.sub}</div>
            </div>
            <ChevronRight size={16} className="text-[--color-wcc-muted]" />
          </button>
        );
      })}
    </section>
  );
}
