import { useState } from "react";
import { TopBar } from "./TopBar";
import { SearchBar } from "./SearchBar";
import { PromoCard } from "./PromoCard";
import { SpecialtiesRow } from "./SpecialtiesRow";
import { ConsultOptions } from "./ConsultOptions";
import { DoctorsRail } from "./DoctorsRail";
import { ServicesRow } from "./ServicesRow";
import { QATeaser } from "./QATeaser";
import { BottomTabBar } from "./BottomTabBar";

export function HomeScreen() {
  const [scrolled, setScrolled] = useState(false);
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      {/* status bar spacer (44px) */}
      <div className="h-11 shrink-0" />
      <div
        className="wcc-scroll relative min-h-0 flex-1 overflow-y-auto pb-24"
        onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 4)}
        style={{ scrollbarWidth: "none" }}
      >
        <style>{`.wcc-scroll::-webkit-scrollbar{display:none}`}</style>
        <TopBar shadow={scrolled} />
        <SearchBar />
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
