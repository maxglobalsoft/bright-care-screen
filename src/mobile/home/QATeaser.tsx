import { MessagesSquare, ArrowRight } from "lucide-react";
import { qa } from "./data";

export function QATeaser() {
  return (
    <section className="px-4 pt-4">
      <div className="flex items-center gap-3 rounded-2xl bg-[--color-wcc-mist] p-3.5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[--color-wcc-sage]">
          <MessagesSquare size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-medium text-[--color-wcc-ink]">{qa.question}</div>
          <button className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[--color-wcc-orange]">
            {qa.cta} <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
}
