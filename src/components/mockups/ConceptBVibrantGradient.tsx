import { Bell, MapPin, Search, Star, ChevronRight } from "lucide-react";
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

const gradient =
  "linear-gradient(135deg, #1F4A3A 0%, #2E6B53 55%, #567257 100%)";

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
        className="rounded-b-3xl px-5 pb-6 pt-2 text-white"
        style={{ background: gradient }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={greeting.avatar}
              alt=""
              className="h-10 w-10 rounded-full border-2 border-white/40 object-cover"
            />
            <div>
              <p className="text-[11px] text-white/80">Good morning,</p>
              <p className="font-sora text-[15px] font-bold">{greeting.name}</p>
            </div>
          </div>
          <button className="relative grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
            <Bell size={16} />
            <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-wcc-gold text-[9px] font-bold text-wcc-ink">
              {greeting.notifications}
            </span>
          </button>
        </div>

        <div className="mt-3 flex items-center gap-1 text-[11px] text-white/80">
          <MapPin size={12} /> {greeting.location}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-3 shadow-lg shadow-black/10">
          <Search size={16} className="text-wcc-green-primary" />
          <span className="text-[12px] text-wcc-slate">
            Search doctors, medicines, symptoms…
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
          className="mt-6 overflow-hidden rounded-2xl p-4 text-white shadow-lg shadow-wcc-green-primary/20"
          style={{ background: gradient }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
            Upcoming consult
          </p>
          <div className="mt-2 flex items-center gap-3">
            <img
              src={upcoming.avatar}
              alt=""
              className="h-12 w-12 rounded-full border-2 border-white/30 object-cover"
            />
            <div className="flex-1">
              <p className="font-sora text-[13px] font-bold">{upcoming.doctor}</p>
              <p className="text-[11px] text-white/80">
                {upcoming.specialty} · {upcoming.when}
              </p>
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
            {specialties.map((s, i) => (
              <span
                key={s}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium ${i === 0 ? "text-white shadow-md shadow-wcc-green-primary/30" : "bg-wcc-green-soft text-wcc-green-deep"}`}
                style={i === 0 ? { background: gradient } : undefined}
              >
                {s}
              </span>
            ))}
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
                <img
                  src={d.photo}
                  alt=""
                  className="h-24 w-full rounded-xl object-cover"
                />
                <p className="mt-2 font-sora text-[12px] font-bold text-wcc-ink">
                  {d.name}
                </p>
                <p className="text-[10px] text-wcc-slate">{d.specialty}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-wcc-ink">
                  <Star size={10} className="fill-wcc-gold text-wcc-gold" />
                  {d.rating} · <span className="font-semibold">{d.fee}</span>
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
              <img src={s.image} alt="" className="h-20 w-full object-cover" />
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
                <p className="p-2 text-[11px] font-medium leading-tight text-wcc-ink">
                  {t.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
