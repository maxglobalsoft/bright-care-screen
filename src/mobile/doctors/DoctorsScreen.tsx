import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  SlidersHorizontal,
  Search,
  Star,
  MapPin,
  ChevronDown,
  Stethoscope,
  Check,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BottomTabBar } from "@/mobile/home/BottomTabBar";
import { Img } from "@/mobile/home/Img";
import {
  allDoctors,
  specialtyFilters,
  specialFilters,
  sortOptions,
  type SortOption,
  type DoctorFull,
} from "./data";

const SAGE = "#567257";
const DEEP = "#3C4F3D";
const ORANGE = "#E8912D";
const MIST = "#F3F6F2";
const INK = "#23291F";
const MUTED = "#6B7280";

type Props = { initialSpecialty?: string };

export function DoctorsScreen({ initialSpecialty }: Props) {
  const reduce = useReducedMotion();
  const navigate = useNavigate();

  const initialChip =
    initialSpecialty && (specialtyFilters as readonly string[]).includes(initialSpecialty)
      ? initialSpecialty
      : "All";

  const [activeSpecialty, setActiveSpecialty] = useState<string>(initialChip);
  const [availableToday, setAvailableToday] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [sort, setSort] = useState<SortOption>("Recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shake, setShake] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtersActive =
    activeSpecialty !== "All" || availableToday || topRated || query.length > 0;

  const list = useMemo<DoctorFull[]>(() => {
    let out = allDoctors.slice();
    if (activeSpecialty !== "All")
      out = out.filter((d) => d.specialty === activeSpecialty);
    if (availableToday) out = out.filter((d) => d.availableToday);
    if (topRated) out = out.filter((d) => d.rating >= 4.8);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case "Price low to high":
        out.sort((a, b) => a.priceCad - b.priceCad);
        break;
      case "Price high to low":
        out.sort((a, b) => b.priceCad - a.priceCad);
        break;
      case "Rating":
        out.sort((a, b) => b.rating - a.rating);
        break;
    }
    return out;
  }, [activeSpecialty, availableToday, topRated, query, sort]);

  const clearFilters = () => {
    setActiveSpecialty("All");
    setAvailableToday(false);
    setTopRated(false);
    setQuery("");
    setShake((n) => n + 1);
  };

  const goDoctor = (id: string) => navigate({ to: "/doctor/$id", params: { id } });

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <div className="h-11 shrink-0" />

      {/* Sticky header */}
      <div
        className="sticky top-0 z-10 flex h-[52px] items-center gap-2 border-b px-3"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#EEF1EE" }}
      >
        <motion.button
          whileTap={reduce ? undefined : { scale: 0.9 }}
          onClick={() => navigate({ to: "/home" })}
          aria-label="Back"
          className="grid h-9 w-9 place-items-center rounded-full"
          style={{ backgroundColor: MIST }}
        >
          <ArrowLeft size={18} style={{ color: INK }} />
        </motion.button>
        <h1 className="flex-1 text-[18px] font-semibold" style={{ color: INK }}>
          Find Doctors
        </h1>
        <motion.button
          whileTap={reduce ? undefined : { scale: 0.9 }}
          aria-label="Filters"
          className="relative grid h-9 w-9 place-items-center rounded-full"
          style={{ backgroundColor: MIST }}
        >
          <SlidersHorizontal size={18} style={{ color: INK }} />
          {filtersActive && (
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
              style={{ backgroundColor: ORANGE }}
            />
          )}
        </motion.button>
      </div>

      <div className="wcc-doc-scroll relative min-h-0 flex-1 overflow-y-auto pb-24">
        <style>{`.wcc-doc-scroll::-webkit-scrollbar{display:none}`}</style>

        {/* Search */}
        <div className="px-4 pt-3">
          <div
            className={`flex items-center gap-2 rounded-[14px] border px-3.5 py-3 transition-all duration-300 ${
              focused
                ? "border-[color:var(--fg)] shadow-[0_0_0_3px_rgba(86,114,87,0.18)]"
                : "border-transparent"
            }`}
            style={{ backgroundColor: MIST, ["--fg" as never]: SAGE }}
          >
            <Search
              size={18}
              style={{ color: focused ? DEEP : SAGE }}
              className="transition-transform duration-300"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search by doctor, specialty or symptom"
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[color:var(--ph)]"
              style={{ color: INK, ["--ph" as never]: MUTED }}
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[...specialtyFilters, ...specialFilters].map((label) => {
            const isSpecial = (specialFilters as readonly string[]).includes(label);
            const active = isSpecial
              ? (label === "Available today" && availableToday) ||
                (label === "Top rated" && topRated)
              : activeSpecialty === label;
            return (
              <motion.button
                key={label}
                whileTap={reduce ? undefined : { scale: [1, 0.9, 1.05, 1] }}
                transition={{ duration: 0.35, times: [0, 0.3, 0.7, 1] }}
                onClick={() => {
                  if (label === "Available today") setAvailableToday((v) => !v);
                  else if (label === "Top rated") setTopRated((v) => !v);
                  else setActiveSpecialty(label);
                }}
                className="relative shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium"
                style={{ color: active ? "#FFFFFF" : INK }}
              >
                {active && (
                  <motion.span
                    layoutId={
                      isSpecial ? `wcc-chip-${label}` : "wcc-chip-active"
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: SAGE }}
                  />
                )}
                {!active && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: MIST }}
                  />
                )}
                <span className="relative">{label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Sort row */}
        <div className="mt-3 flex items-center justify-between px-4">
          <span className="text-[12px]" style={{ color: MUTED }}>
            {loading ? "Loading doctors…" : `${list.length} doctors found`}
          </span>
          <motion.button
            whileTap={reduce ? undefined : { scale: 0.95 }}
            onClick={() => setSortOpen(true)}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium"
            style={{ backgroundColor: MIST, color: INK }}
          >
            Sort: {sort}
            <ChevronDown size={14} />
          </motion.button>
        </div>

        {/* List */}
        <div className="mt-3 flex flex-col gap-3 px-4">
          {loading ? (
            <SkeletonList />
          ) : list.length === 0 ? (
            <EmptyState onClear={clearFilters} shakeKey={shake} reduce={!!reduce} />
          ) : (
            list.map((d, i) => (
              <DoctorCard
                key={d.id}
                d={d}
                index={i}
                reduce={!!reduce}
                onOpen={() => goDoctor(d.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Sort bottom sheet */}
      <AnimatePresence>
        {sortOpen && (
          <>
            <motion.div
              key="ov"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSortOpen(false)}
              className="absolute inset-0 z-30 bg-black/40"
            />
            <motion.div
              key="sh"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute inset-x-0 bottom-0 z-40 rounded-t-3xl bg-white p-4 pb-6"
              style={{ boxShadow: "0 -12px 30px -12px rgba(0,0,0,0.20)" }}
            >
              <div
                className="mx-auto mb-3 h-1 w-10 rounded-full"
                style={{ backgroundColor: "#DDE2DD" }}
              />
              <h3 className="mb-2 text-[15px] font-semibold" style={{ color: INK }}>
                Sort by
              </h3>
              <div className="flex flex-col">
                {sortOptions.map((o) => {
                  const active = sort === o;
                  return (
                    <motion.button
                      key={o}
                      whileTap={reduce ? undefined : { scale: 0.98 }}
                      onClick={() => {
                        setSort(o);
                        setSortOpen(false);
                      }}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-left text-[14px]"
                      style={{
                        color: active ? SAGE : INK,
                        backgroundColor: active ? MIST : "transparent",
                        fontWeight: active ? 600 : 500,
                      }}
                    >
                      {o}
                      {active && <Check size={16} style={{ color: SAGE }} />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomTabBar activeTab="doctors" />
    </div>
  );
}

function SkeletonList() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-2xl border p-3"
          style={{ borderColor: "#EEF1EE", backgroundColor: "#FFFFFF" }}
        >
          <div className="flex gap-3">
            <div
              className="h-[72px] w-[72px] shrink-0 rounded-xl"
              style={{ backgroundColor: MIST }}
            />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 w-2/3 rounded" style={{ backgroundColor: MIST }} />
              <div className="h-2.5 w-1/2 rounded" style={{ backgroundColor: MIST }} />
              <div className="h-2.5 w-1/3 rounded" style={{ backgroundColor: MIST }} />
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
              animation: "wcc-shimmer 1.4s infinite",
            }}
          />
          <style>{`@keyframes wcc-shimmer{100%{transform:translateX(100%)}}`}</style>
        </div>
      ))}
    </>
  );
}

function EmptyState({
  onClear,
  shakeKey,
  reduce,
}: {
  onClear: () => void;
  shakeKey: number;
  reduce: boolean;
}) {
  return (
    <div className="mt-6 flex flex-col items-center gap-3 py-10 text-center">
      <motion.div
        key={shakeKey}
        animate={reduce ? undefined : { rotate: [0, -12, 12, -8, 8, 0] }}
        transition={{ duration: 0.6 }}
        className="grid h-16 w-16 place-items-center rounded-full"
        style={{ backgroundColor: MIST }}
      >
        <Stethoscope size={30} style={{ color: SAGE }} />
      </motion.div>
      <div className="text-[14px] font-semibold" style={{ color: INK }}>
        No doctors match your filters
      </div>
      <motion.button
        whileTap={reduce ? undefined : { scale: 0.95 }}
        onClick={onClear}
        className="text-[13px] font-semibold"
        style={{ color: ORANGE }}
      >
        Clear filters
      </motion.button>
    </div>
  );
}

function DoctorCard({
  d,
  index,
  reduce,
  onOpen,
}: {
  d: DoctorFull;
  index: number;
  reduce: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={reduce ? undefined : "active"}
      whileTap={reduce ? undefined : "active"}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      variants={{ rest: {}, active: { scale: 0.98 } }}
      className="relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-3"
      style={{ borderColor: "#EEF1EE", boxShadow: "0 2px 10px -6px rgba(0,0,0,0.10)" }}
    >
      <motion.span
        variants={{ rest: { scaleY: 0 }, active: { scaleY: 1 } }}
        transition={{ duration: 0.25 }}
        className="absolute left-0 top-0 h-full w-[3px] origin-top"
        style={{ backgroundColor: SAGE }}
      />
      <div className="flex gap-3">
        <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl">
          <motion.div
            className="h-full w-full"
            variants={{ rest: { scale: 1 }, active: { scale: 1.08 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Img src={d.photo} alt={d.name} wrapperClassName="h-full w-full" rounded="rounded-xl" />
          </motion.div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-[15px] font-semibold" style={{ color: INK }}>
                {d.name}
              </div>
              <div className="truncate text-[12px]" style={{ color: MUTED }}>
                {d.specialty} · {d.years}y
              </div>
            </div>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[12px] font-semibold"
              style={{ backgroundColor: MIST, color: INK }}
            >
              CA${d.priceCad}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11.5px]" style={{ color: INK }}>
            {[0, 1, 2, 3, 4].map((k) => (
              <motion.span
                key={k}
                variants={{
                  rest: { color: "#CBD5C7" },
                  active: {
                    color: ORANGE,
                    scale: [1, 1.3, 1],
                    transition: { duration: 0.3, delay: k * 0.06 },
                  },
                }}
                style={{ display: "inline-block" }}
              >
                <Star size={11} style={{ fill: "currentColor", color: "currentColor" }} />
              </motion.span>
            ))}
            <span className="ml-1 font-semibold">{d.rating}</span>
            <span style={{ color: MUTED }}>({d.reviews})</span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1 text-[11.5px]" style={{ color: MUTED }}>
              <MapPin size={11} />
              <span className="truncate">{d.city}</span>
              <span>·</span>
              <span className="truncate" style={{ color: SAGE, fontWeight: 600 }}>
                {d.availability}
              </span>
            </div>
            <BookButton
              reduce={reduce}
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BookButton({
  reduce,
  onClick,
}: {
  reduce: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  const [tap, setTap] = useState(0);
  return (
    <motion.button
      onClick={(e) => {
        setTap((n) => n + 1);
        onClick(e);
      }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      className="relative overflow-hidden rounded-full px-4 py-2 text-[12.5px] font-bold"
      style={{
        backgroundColor: SAGE,
        color: "#FFFFFF",
        boxShadow: "0 6px 14px -8px rgba(86,114,87,0.6)",
      }}
    >
      <motion.span
        key={tap}
        initial={{ backgroundColor: SAGE }}
        animate={{ backgroundColor: tap > 0 ? [SAGE, DEEP, SAGE] : SAGE }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      />
      <AnimatePresence>
        {!reduce && tap > 0 && (
          <motion.span
            key={`sheen-${tap}`}
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pointer-events-none absolute inset-y-0 w-1/2 skew-x-[-20deg]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative">Book</span>
    </motion.button>
  );
}
