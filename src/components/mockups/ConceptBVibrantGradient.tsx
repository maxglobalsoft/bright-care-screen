import { Bell, MapPin, Search, Star, ChevronRight, Clock, Plus } from "lucide-react";
import {
  greeting,
  quickActions,
  upcoming,
  specialties,
  doctors,
  pharmacy,
  lab,
  tips,
  tabs,
} from "./data";
import { PhoneFrame } from "./PhoneFrame";
import { LogoLockup } from "./LogoLockup";

const gradient = "linear-gradient(135deg, #1F4A3A 0%, #2E6B53 55%, #567257 100%)";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="font-sora text-[15px] font-bold text-wcc-ink">{title}</h2>
      <button className="flex items-center gap-0.5 text-[11px] font-semibold text-wcc-green-primary">
        See all <ChevronRight size={12} />
      </button>
    </div>
  );
}

function TabBar() {
  return (
    <div className="border-t border-wcc-green-soft bg-white px-2 pb-3 pt-2 shadow-[0_-4px_20px_-8px_rgba(46,107,83,0.25)]">
      <div className="flex items-center justify-between">
        {tabs.map((t, i) => {
          const active = i === 0;
          const Icon = t.icon;
          return (
            <div key={t.label} className="flex flex-1 flex-col items-center gap-0.5">
              <div
                className={`grid h-7 w-7 place-items-center rounded-lg ${active ? "text-white" : "text-wcc-slate"}`}
                style={active ? { background: gradient } : undefined}
              >
                <Icon size={16} strokeWidth={2} />
              </div>
              <span
                className={`text-[10px] ${active ? "font-bold text-wcc-green-deep" : "text-wcc-slate"}`}
              >
                {t.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ConceptBVibrantGradient() {
  return (
    <PhoneFrame tabBar={<TabBar />} surface="#F6F8F6">
      {/* Gradient greeting band */}
      <div
        className="relative overflow-hidden rounded-b-3xl px-5 pb-6 pt-3 text-white"
        style={{ background: gradient }}
      >
        {/* Watermark + motif */}
        <Plus
          size={140}
          className="pointer-events-none absolute -right-6 -top-6 text-white/5"
          strokeWidth={3}
        />
        <div className="relative flex items-center justify-between">
          <LogoLockup size={28} tone="light" />
          <div className="flex items-center gap-2">
            <button className="relative grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur">
              <Bell size={14} />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-wcc-gold text-[9px] font-bold text-wcc-ink">
                {greeting.notifications}
              </span>
            </button>
            <img
              src={greeting.avatar}
              alt=""
              className="h-9 w-9 rounded-full border-2 border-white/40 object-cover"
            />
          </div>
        </div>

        <div className="relative mt-4">
          <p className="text-[11px] text-white/80">Good morning,</p>
          <p className="font-sora text-[22px] font-bold leading-tight">
            {greeting.name}.
          </p>
          <p className="mt-1 text-[11px] text-white/80">{greeting.nudge}</p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-white/80">
            <MapPin size={11} /> {greeting.location}
          </div>
        </div>

        <div className="relative mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-3 shadow-lg shadow-black/10">
          <Search size={16} className="text-wcc-green-primary" />
          <span className="text-[12px] text-wcc-slate">
            Search doctors, medicines, symptoms, lab tests
          </span>
        </div>
      </div>

      <div className="px-5 pb-6 pt-5">
        {/* Quick actions */}
        <div className="grid grid-cols-5 gap-2">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.label} className="flex flex-col items-center gap-1.5">
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-md shadow-wcc-green-primary/30"
                  style={{ background: gradient }}
                >
                  <Icon size={18} strokeWidth={2} />
                </div>
                <span className="text-center text-[9px] font-medium leading-tight text-wcc-ink">
                  {a.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Upcoming */}
        <div
          className="relative mt-6 overflow-hidden rounded-2xl p-4 text-white shadow-lg shadow-wcc-green-primary/20"
          style={{ background: gradient }}
        >
          <Plus
            size={100}
            className="pointer-events-none absolute -right-4 -bottom-6 text-white/10"
            strokeWidth={3}
          />
          <div className="relative flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
              Upcoming consult
            </p>
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px]">
              <Clock size={10} /> {upcoming.countdown}
            </span>
          </div>
          <div className="relative mt-2 flex items-center gap-3">
            <img
              src={upcoming.avatar}
              alt=""
              className="h-12 w-12 rounded-full border-2 border-white/30 object-cover"
            />
            <div className="flex-1">
              <p className="font-sora text-[13px] font-bold">{upcoming.doctor}</p>
              <p className="text-[11px] text-white/80">{upcoming.specialty}</p>
              <p className="text-[11px] font-semibold">{upcoming.when}</p>
            </div>
            <button className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-bold text-wcc-green-deep">
              Join
            </button>
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-6">
          <SectionHeader title="Browse by specialty" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {specialties.map((s, i) => {
              const Icon = s.icon;
              const active = i === 0;
              return (
                <span
                  key={s.label}
                  className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium ${active ? "text-white shadow-md shadow-wcc-green-primary/30" : "bg-wcc-green-soft text-wcc-green-deep"}`}
                  style={active ? { background: gradient } : undefined}
                >
                  <Icon size={11} />
                  {s.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Doctors */}
        <div className="mt-6">
          <SectionHeader title="Top doctors near you" />
          <div className="flex gap-3 overflow-x-auto pb-1">
            {doctors.map((d) => (
              <div
                key={d.name}
                className="w-44 shrink-0 rounded-2xl bg-white p-3 shadow-md shadow-wcc-green-primary/10"
              >
                <img src={d.photo} alt="" className="h-24 w-full rounded-xl object-cover" />
                <p className="mt-2 font-sora text-[12px] font-bold text-wcc-ink">
                  {d.name}
                </p>
                <p className="text-[10px] text-wcc-slate">{d.specialty}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-wcc-ink">
                  <Star size={10} className="fill-wcc-gold text-wcc-gold" />
                  {d.rating} ({d.reviews}) ·{" "}
                  <span className="font-semibold">{d.fee}</span>
                </div>
                <button
                  className="mt-2 w-full rounded-lg py-1 text-[10px] font-bold text-white"
                  style={{ background: gradient }}
                >
                  Consult
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacy + Lab */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {[pharmacy, lab].map((s) => (
            <div
              key={s.title}
              className="overflow-hidden rounded-2xl bg-white shadow-md shadow-wcc-green-primary/10"
            >
              <div className="relative">
                <img src={s.image} alt="" className="h-20 w-full object-cover" />
                <span
                  className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
                  style={{ background: gradient }}
                >
                  {s.tag}
                </span>
              </div>
              <div className="p-2.5">
                <p className="font-sora text-[12px] font-bold text-wcc-ink">{s.title}</p>
                <p className="text-[10px] text-wcc-slate">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-6">
          <SectionHeader title="Health tips" />
          <div className="flex gap-3 overflow-x-auto pb-1">
            {tips.map((t) => (
              <div
                key={t.title}
                className="w-44 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md shadow-wcc-green-primary/10"
              >
                <img src={t.image} alt="" className="h-20 w-full object-cover" />
                <div className="p-2">
                  <p className="text-[9px] font-bold uppercase tracking-wide text-wcc-green-primary">
                    {t.category} · {t.readTime}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium leading-tight text-wcc-ink">
                    {t.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
