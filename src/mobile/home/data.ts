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

const UNSPLASH = "https://images.unsplash.com";
const img = (id: string, w = 400) =>
  `${UNSPLASH}/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const user = {
  greeting: "Good morning,",
  name: "Bhupendra",
  avatar: img("photo-1544005313-94ddf0286df2", 120),
  notifications: 3,
};

export const promo = {
  eyebrow: "New here",
  title: "Enjoy 20 percent off your first online consultation.",
  code: "CARE20",
  discount: "20%",
  image: img("photo-1638202993928-7267aad84c31", 500),
};

export type Specialty = { label: string; icon: LucideIcon; doctors: number };
export const specialties: Specialty[] = [
  { label: "General", icon: Stethoscope, doctors: 128 },
  { label: "Cardiology", icon: Heart, doctors: 46 },
  { label: "Pediatrics", icon: Baby, doctors: 72 },
  { label: "Neurology", icon: Brain, doctors: 34 },
  { label: "Dermatology", icon: Sparkles, doctors: 58 },
  { label: "Orthopedics", icon: Bone, doctors: 41 },
  { label: "Eye Care", icon: Eye, doctors: 29 },
  { label: "Mental Health", icon: Smile, doctors: 63 },
];

export type ConsultOption = {
  key: "chat" | "audio" | "video";
  label: string;
  tagline: string;
  icon: LucideIcon;
  priceCad: number;
  popular?: boolean;
};
export const consultOptions: ConsultOption[] = [
  { key: "chat", label: "Chat", tagline: "Message a doctor", icon: MessageCircle, priceCad: 39 },
  { key: "audio", label: "Audio", tagline: "Voice consult", icon: Phone, priceCad: 59 },
  { key: "video", label: "Video", tagline: "Face to face care", icon: Video, priceCad: 79, popular: true },
];

export type Doctor = {
  name: string;
  photo: string;
  specialty: string;
  years: number;
  rating: number;
  reviews: number;
  priceCad: number;
  city: string;
  availability: string;
  verified: boolean;
};
export const doctors: Doctor[] = [
  {
    name: "Dr. Aisha Khan",
    photo: img("photo-1559839734-2b71ea197ec2", 400),
    specialty: "Dermatologist",
    years: 12,
    rating: 4.9,
    reviews: 312,
    priceCad: 89,
    city: "Toronto",
    availability: "Available today",
    verified: true,
  },
  {
    name: "Dr. Marcus Lee",
    photo: img("photo-1612349317150-e413f6a5b16d", 400),
    specialty: "Cardiologist",
    years: 15,
    rating: 4.8,
    reviews: 487,
    priceCad: 119,
    city: "Vancouver",
    availability: "Next slot 5:30 PM",
    verified: true,
  },
  {
    name: "Dr. Sofia Martinez",
    photo: img("photo-1594824476967-48c8b964273f", 400),
    specialty: "Pediatrician",
    years: 9,
    rating: 4.9,
    reviews: 256,
    priceCad: 79,
    city: "Calgary",
    availability: "Available today",
    verified: true,
  },
  {
    name: "Dr. Daniel Tremblay",
    photo: img("photo-1622253692010-333f2da6031d", 400),
    specialty: "Family Physician",
    years: 11,
    rating: 4.9,
    reviews: 342,
    priceCad: 69,
    city: "Montreal",
    availability: "Tomorrow 10:00 AM",
    verified: true,
  },
];

export const services = [
  {
    key: "pharmacy",
    title: "Pharmacy",
    sub: "Order medicines to your door",
    icon: Pill,
    tint: "#EAF0EA",
    iconColor: "#567257",
    image: img("photo-1584308666744-24d5c474f2ae", 300),
  },
  {
    key: "lab",
    title: "Lab tests",
    sub: "Book a home sample pickup",
    icon: FlaskConical,
    tint: "#FDEEDC",
    iconColor: "#E8912D",
    image: img("photo-1579154204601-01588f351e67", 300),
  },
] as const;

export const qa = {
  question: "How do online consultations work?",
  cta: "Ask a doctor for free",
};
