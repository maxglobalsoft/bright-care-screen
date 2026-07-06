import { useEffect, useRef, useState } from "react";
import { TopBar } from "./TopBar";
import { SearchBar } from "./SearchBar";
import { PromoCard } from "./PromoCard";
import { SpecialtiesRow } from "./SpecialtiesRow";
import { ConsultOptions } from "./ConsultOptions";
import { DoctorsRail } from "./DoctorsRail";
import { ServicesRow } from "./ServicesRow";
import { QATeaser } from "./QATeaser";
import { BottomTabBar } from "./BottomTabBar";
import { QuickActions } from "./QuickActions";

export function HomeScreen() {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity 500ms ease-out, transform 500ms ease-out";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, i * 80);
            io.unobserve(e.target);
          }
        });
      },
      { root, threshold: 0.12 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <div className="h-11 shrink-0" />
      <div
        ref={scrollRef}
        className="wcc-scroll relative min-h-0 flex-1 overflow-y-auto pb-24"
        onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 4)}
        style={{ scrollbarWidth: "none" }}
      >
        <style>{`.wcc-scroll::-webkit-scrollbar{display:none}`}</style>
        <TopBar shadow={scrolled} />
        <SearchBar />
        <QuickActions />
        <PromoCard />
        <SpecialtiesRow />
        <ConsultOptions />
        <DoctorsRail />
        <ServicesRow />
        <QATeaser />
      </div>
      <BottomTabBar />
    </div>
  );
}
