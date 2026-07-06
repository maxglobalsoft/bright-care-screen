import {
  Stethoscope,
  Heart,
  Baby,
  Brain,
  Sparkles,
  Bone,
  Eye,
  Smile,
  MessageCircle,
  Phone,
  Video,
  Pill,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

export const user = {
  greeting: "Good morning,",
  name: "Bhupendra",
  avatar: null as string | null,
  notifications: 3,
};

export const promo = {
  title: "Get 20% off your first consultation",
  code: "CARE20",
  discount: "20%",
};

export type Specialty = { label: string; icon: LucideIcon; doctors: number };
export const specialties: Specialty[] = [
  { label: "General", icon: Stethoscope, doctors: 128 },
  { label: "Cardiology", icon: Heart, doctors: 46 },
  { label: "Pediatrics", icon: Baby, doctors: 72 },
  { label: "Neurology", icon: Brain, doctors: 34 },
  { label: "Dermatology", icon: Sparkles, doctors: 58 },
  { label: "Orthopedics", icon: Bone, doctors: 41 },
  { label: "Ophthalmology", icon: Eye, doctors: 29 },
  { label: "Mental Health", icon: Smile, doctors: 63 },
];

export type ConsultOption = {
  key: "chat" | "audio" | "video";
  label: string;
  icon: LucideIcon;
  priceCad: number;
  popular?: boolean;
};
export const consultOptions: ConsultOption[] = [
  { key: "chat", label: "Chat", icon: MessageCircle, priceCad: 29 },
  { key: "audio", label: "Audio", icon: Phone, priceCad: 39 },
  { key: "video", label: "Video", icon: Video, priceCad: 49, popular: true },
];

export type Doctor = {
  name: string;
  initials: string;
  specialty: string;
  years: number;
  rating: number;
  reviews: number;
  priceCad: number;
  city: string;
  availability: string;
  verified: boolean;
  hue: string; // gradient placeholder color
};
export const doctors: Doctor[] = [
  {
    name: "Dr. Aisha Khan",
    initials: "AK",
    specialty: "Dermatologist",
    years: 12,
    rating: 4.9,
    reviews: 312,
    priceCad: 45,
    city: "Toronto",
    availability: "Available today",
    verified: true,
    hue: "#F5C7A9",
  },
  {
    name: "Dr. Marcus Lee",
    initials: "ML",
    specialty: "Cardiologist",
    years: 15,
    rating: 4.8,
    reviews: 487,
    priceCad: 60,
    city: "Vancouver",
    availability: "Next slot 5:30 PM",
    verified: true,
    hue: "#B7D4C0",
  },
  {
    name: "Dr. Sofia Martinez",
    initials: "SM",
    specialty: "Pediatrician",
    years: 9,
    rating: 4.9,
    reviews: 256,
    priceCad: 55,
    city: "Calgary",
    availability: "Available today",
    verified: true,
    hue: "#F7D9DA",
  },
  {
    name: "Dr. Nadia Rahman",
    initials: "NR",
    specialty: "Psychiatrist",
    years: 11,
    rating: 4.9,
    reviews: 342,
    priceCad: 70,
    city: "Montreal",
    availability: "Tomorrow 10:00 AM",
    verified: true,
    hue: "#C9C4EA",
  },
];

export const services = [
  {
    key: "pharmacy",
    title: "Pharmacy",
    sub: "Order medicines",
    icon: Pill,
    tint: "#EAF0EA",
    iconColor: "#567257",
  },
  {
    key: "lab",
    title: "Lab Tests",
    sub: "Book at home",
    icon: FlaskConical,
    tint: "#FDEEDC",
    iconColor: "#E8912D",
  },
] as const;

export const qa = {
  question: "How do online consultations work?",
  cta: "Ask a doctor free",
};
