import { Bell, MapPin, Search, Star, ChevronRight, Heart } from "lucide-react";
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

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="font-sora text-[16px] font-bold text-wcc-green-deep">{title}</h2>
      <button className="flex items-center gap-0.5 text-[11px] font-semibold text-wcc-green-primary">
        See all <ChevronRight size={12} />
      </button>
    </div>
  );
}

function TabBar() {
  return (
    <div className="border-t border-[#EEE5D6] bg-wcc-cream px-2 pb-3 pt-2">
      <div className="flex items-center justify-between">
        {tabs.map((t, i) => {
          const active = i === 0;
          const Icon = t.icon;
          return (
            <div key={t.label} className="flex flex-1 flex-col items-center gap-0.5">
              <div
                className={`grid h-8 w-8 place-items-center rounded-2xl ${active ? "bg-wcc-green-primary text-white" : "text-wcc-slate"}`}
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

export function ConceptCWarmFriendly() {
  return (
    <PhoneFrame tabBar={<TabBar />} surface="#FBF7F1">
      <div className="px-5 pb-6 pt-2">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={greeting.avatar}
              alt=""
              className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm"
            />
            <div>
              <p className="text-[11px] text-wcc-slate">Good morning,</p>
              <p className="font-sora text-[16px] font-bold text-wcc-green-deep">
                {greeting.name} 👋
              </p>
            </div>
          </div>
          <button className="relative grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm">
            <Bell size={16} className="text-wcc-green-deep" />
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#E07856] text-[9px] font-bold text-white">
              {greeting.notifications}
            </span>
          </button>
        </div>

        <div className="mt-3 flex items-center gap-1 text-[11px] text-wcc-slate">
          <MapPin size={12} /> {greeting.location}
        </div>

        {/* Hero search w/ warm illustration tint */}
        <div className="mt-4 rounded-3xl bg-[#F4EADB] p-4">
          <p className="font-sora text-[13px] font-semibold leading-snug text-wcc-green-deep">
            Caring for you and your family,
            <br />
            every step of the way.
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white px-3 py-3 shadow-sm">
            <Search size={16} className="text-wcc-green-primary" />
            <span className="text-[12px] text-wcc-slate">
              Search doctors, medicines…
            </span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid grid-cols-5 gap-2">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.label} className="flex flex-col items-center gap-1.5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F4EADB]">
                  <Icon size={18} strokeWidth={1.8} className="text-wcc-green-deep" />
                </div>
                <span className="text-center text-[9px] leading-tight text-wcc-ink">
                  {a.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Upcoming */}
        <div className="mt-6 rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-wcc-sage">
              Upcoming
            </p>
            <Heart size={12} className="text-[#E07856]" />
          </div>
          <div className="mt-2 flex items-center gap-3">
            <img
              src={upcoming.avatar}
              alt=""
              className="h-14 w-14 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <p className="font-sora text-[13px] font-bold text-wcc-ink">
                {upcoming.doctor}
              </p>
              <p className="text-[11px] text-wcc-slate">{upcoming.specialty}</p>
              <p className="text-[11px] font-semibold text-wcc-green-primary">
                {upcoming.when}
              </p>
            </div>
            <button className="rounded-full bg-wcc-green-primary px-3 py-1.5 text-[11px] font-bold text-white">
              Join
            </button>
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-6">
          <SectionHeader title="Browse by specialty" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {specialties.map((s) => (
              <span
                key={s}
                className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[11px] text-wcc-ink shadow-sm"
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
                className="w-48 shrink-0 overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <img src={d.photo} alt="" className="h-28 w-full object-cover" />
                <div className="p-3">
                  <p className="font-sora text-[12px] font-bold text-wcc-ink">
                    {d.name}
                  </p>
                  <p className="text-[10px] text-wcc-slate">{d.specialty}</p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-wcc-ink">
                    <Star size={10} className="fill-wcc-gold text-wcc-gold" />
                    {d.rating} · <span className="font-semibold">{d.fee}</span>
                  </div>
                  <button className="mt-2 w-full rounded-full bg-wcc-green-primary py-1.5 text-[10px] font-bold text-white">
                    Consult
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacy + Lab big strips */}
        <div className="mt-6 space-y-3">
          {[pharmacy, lab].map((s) => (
            <div
              key={s.title}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <img src={s.image} alt="" className="h-28 w-full object-cover" />
              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="font-sora text-[13px] font-bold text-wcc-green-deep">
                    {s.title}
                  </p>
                  <p className="text-[11px] text-wcc-slate">{s.sub}</p>
                </div>
                <button className="rounded-full border border-wcc-green-primary px-3 py-1 text-[11px] font-semibold text-wcc-green-primary">
                  Open
                </button>
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
                className="w-48 shrink-0 overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <img src={t.image} alt="" className="h-24 w-full object-cover" />
                <p className="p-3 text-[11px] font-medium leading-tight text-wcc-ink">
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
