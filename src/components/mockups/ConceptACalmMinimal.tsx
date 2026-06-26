import { Bell, MapPin, Search, Star, ChevronRight, Clock } from "lucide-react";
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

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="font-sora text-[15px] font-semibold text-wcc-ink">{title}</h2>
      <button className="flex items-center gap-0.5 text-[11px] font-medium text-wcc-sage">
        See all <ChevronRight size={12} />
      </button>
    </div>
  );
}

function TabBar() {
  return (
    <div className="border-t border-wcc-green-soft bg-white px-2 pb-3 pt-2">
      <div className="flex items-center justify-between">
        {tabs.map((t, i) => {
          const active = i === 0;
          const Icon = t.icon;
          return (
            <div key={t.label} className="flex flex-1 flex-col items-center gap-0.5">
              <Icon
                size={20}
                strokeWidth={active ? 2.2 : 1.6}
                className={active ? "text-wcc-green-primary" : "text-wcc-slate"}
              />
              <span
                className={`text-[10px] ${active ? "font-semibold text-wcc-green-primary" : "text-wcc-slate"}`}
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

export function ConceptACalmMinimal() {
  return (
    <PhoneFrame tabBar={<TabBar />}>
      <div className="px-5 pb-6 pt-2">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <LogoLockup size={28} />
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-wcc-green-soft px-2 py-1 text-[10px] text-wcc-slate">
              <MapPin size={10} /> {greeting.location}
            </span>
            <button className="relative grid h-9 w-9 place-items-center rounded-full border border-wcc-green-soft">
              <Bell size={14} className="text-wcc-ink" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-wcc-green-primary text-[9px] font-semibold text-white">
                {greeting.notifications}
              </span>
            </button>
            <img src={greeting.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
          </div>
        </div>

        {/* Greeting */}
        <div className="mt-5">
          <p className="text-[12px] text-wcc-slate">Good morning,</p>
          <h1 className="font-sora text-[22px] font-bold leading-tight text-wcc-green-deep">
            {greeting.name}.
          </h1>
          <p className="mt-1 text-[11px] text-wcc-slate">{greeting.nudge}</p>
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-wcc-green-soft px-3 py-3">
          <Search size={16} className="text-wcc-slate" />
          <span className="text-[12px] text-wcc-slate">
            Search doctors, medicines, symptoms…
          </span>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid grid-cols-5 gap-2">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.label} className="flex flex-col items-center gap-1.5">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-wcc-green-soft">
                  <Icon size={18} strokeWidth={1.6} className="text-wcc-green-primary" />
                </div>
                <span className="text-center text-[9px] leading-tight text-wcc-ink">
                  {a.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Upcoming */}
        <div className="mt-6 rounded-xl border border-wcc-green-primary/40 bg-wcc-green-soft/40 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-wcc-green-primary">
              Upcoming consult
            </p>
            <span className="flex items-center gap-1 text-[10px] text-wcc-green-deep">
              <Clock size={10} /> {upcoming.countdown}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <img src={upcoming.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-sora text-[13px] font-semibold text-wcc-ink">
                {upcoming.doctor}
              </p>
              <p className="text-[11px] text-wcc-slate">{upcoming.specialty}</p>
              <p className="text-[11px] font-semibold text-wcc-green-deep">{upcoming.when}</p>
            </div>
            <button className="rounded-lg bg-wcc-green-primary px-3 py-1.5 text-[11px] font-semibold text-white">
              Join
            </button>
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-6">
          <SectionHeader title="Browse by specialty" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {specialties.map((s) => {
              const Icon = s.icon;
              return (
                <span
                  key={s.label}
                  className="flex shrink-0 items-center gap-1 rounded-full border border-wcc-green-soft px-3 py-1.5 text-[11px] text-wcc-ink"
                >
                  <Icon size={11} className="text-wcc-green-primary" />
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
                className="w-44 shrink-0 rounded-xl border border-wcc-green-soft p-3"
              >
                <img src={d.photo} alt="" className="h-24 w-full rounded-lg object-cover" />
                <p className="mt-2 font-sora text-[12px] font-semibold text-wcc-ink">
                  {d.name}
                </p>
                <p className="text-[10px] text-wcc-slate">{d.specialty}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-wcc-ink">
                  <Star size={10} className="fill-wcc-gold text-wcc-gold" />
                  {d.rating} ({d.reviews}) · {d.fee}
                </div>
                <button className="mt-2 w-full rounded-md border border-wcc-green-primary py-1 text-[10px] font-semibold text-wcc-green-primary">
                  Consult
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacy + Lab */}
        <div className="mt-6 space-y-3">
          {[pharmacy, lab].map((s) => (
            <div
              key={s.title}
              className="flex items-center gap-3 rounded-xl border border-wcc-green-soft p-3"
            >
              <img src={s.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-sora text-[12px] font-semibold text-wcc-ink">{s.title}</p>
                <p className="text-[10px] text-wcc-slate">{s.sub}</p>
              </div>
              <button className="rounded-md border border-wcc-green-primary px-2.5 py-1 text-[10px] font-semibold text-wcc-green-primary">
                {s.tag}
              </button>
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
                className="w-44 shrink-0 overflow-hidden rounded-xl border border-wcc-green-soft"
              >
                <img src={t.image} alt="" className="h-20 w-full object-cover" />
                <div className="p-2">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-wcc-sage">
                    {t.category} · {t.readTime}
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-wcc-ink">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
