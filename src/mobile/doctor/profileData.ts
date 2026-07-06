export type TimelineEntry = { year: string; title: string; place: string };
export type Review = { initials: string; name: string; rating: number; text: string };
export type ProfileExtras = {
  patients: string;
  bio: string;
  timeline: TimelineEntry[];
  reviews: Review[];
  clinic: { name: string; address: string };
};

export const consultTypes = [
  { key: "chat", label: "Chat", priceCad: 39 },
  { key: "audio", label: "Audio", priceCad: 59 },
  { key: "video", label: "Video", priceCad: 79 },
] as const;
export type ConsultKey = (typeof consultTypes)[number]["key"];

export const defaultTimeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:30 AM", "1:00 PM", "2:30 PM", "3:00 PM",
  "5:00 PM", "6:30 PM",
];

// disabled indices (stable, "2 random")
export const disabledSlotIndices = [3, 7];

export function buildDateStrip(): { key: string; label: string; sub: string }[] {
  const out: { key: string; label: string; sub: string }[] = [];
  const now = new Date();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
    const sub = `${d.getDate()} ${months[d.getMonth()]}`;
    out.push({ key: d.toISOString().slice(0, 10), label, sub });
  }
  return out;
}

const bios: Record<string, string> = {
  default:
    "A compassionate clinician focused on evidence-based care, preventive wellness and clear patient communication. Trained across leading Canadian hospitals with an emphasis on outcomes that matter to you.",
};

export const profileExtras: Record<string, ProfileExtras> = {
  "1": {
    patients: "480+ patients",
    bio: "Board-certified dermatologist with a decade of experience treating chronic skin conditions, acne, eczema and cosmetic concerns. Known for a gentle, personalised approach and modern in-office procedures.",
    timeline: [
      { year: "2013", title: "MD Dermatology", place: "University of Toronto" },
      { year: "2016", title: "Senior Registrar", place: "Toronto General Hospital" },
      { year: "2020", title: "Consultant Dermatologist", place: "Sage Skin Clinic" },
    ],
    reviews: [
      { initials: "MK", name: "Maya K.", rating: 5, text: "Warm, thorough and my skin cleared up in weeks. Highly recommend." },
      { initials: "JR", name: "Jordan R.", rating: 5, text: "Explained every step clearly and answered follow-ups fast." },
      { initials: "AS", name: "Aarav S.", rating: 4, text: "Very professional. Booking was smooth and video call quality was great." },
    ],
    clinic: { name: "Sage Skin Clinic", address: "212 Bloor St W, Toronto, ON" },
  },
  "2": {
    patients: "620+ patients",
    bio: "Interventional cardiologist focused on preventive cardiology, hypertension and arrhythmia care. Combines lifestyle coaching with the latest diagnostic tools for lasting heart health.",
    timeline: [
      { year: "2010", title: "MD Cardiology", place: "UBC Faculty of Medicine" },
      { year: "2014", title: "Cardiology Fellow", place: "St. Paul's Hospital" },
      { year: "2019", title: "Consultant Cardiologist", place: "Pacific Heart Institute" },
    ],
    reviews: [
      { initials: "EL", name: "Emma L.", rating: 5, text: "Truly listens. Helped my mom get her blood pressure under control." },
      { initials: "DP", name: "Devon P.", rating: 5, text: "Best cardiologist I've seen. Clear plan, no rush." },
      { initials: "SN", name: "Sara N.", rating: 4, text: "Great video consult. Follow-up notes arrived within an hour." },
    ],
    clinic: { name: "Pacific Heart Institute", address: "1081 Burrard St, Vancouver, BC" },
  },
};

export function getExtras(id: string): ProfileExtras {
  return (
    profileExtras[id] ?? {
      patients: "300+ patients",
      bio: bios.default,
      timeline: [
        { year: "—", title: "Medical Degree", place: "Canadian Medical School" },
        { year: "—", title: "Residency", place: "Teaching Hospital" },
        { year: "—", title: "Consultant", place: "Wellness Care Clinic" },
      ],
      reviews: [
        { initials: "AB", name: "Alex B.", rating: 5, text: "Fantastic doctor. Kind, knowledgeable and to the point." },
        { initials: "RM", name: "Riya M.", rating: 5, text: "Booked easily, joined on time, felt heard through the whole call." },
        { initials: "TK", name: "Tomás K.", rating: 4, text: "Helpful advice and a clear plan for follow-up care." },
      ],
      clinic: { name: "Wellness Care Clinic", address: "45 Wellness Ave, Toronto, ON" },
    }
  );
}
