import {
  Video,
  CalendarPlus,
  Pill,
  FlaskConical,
  MessageCircleQuestion,
  Home,
  Stethoscope,
  ShoppingBag,
  FileText,
  User,
  type LucideIcon,
} from "lucide-react";

export const greeting = {
  name: "Aarav",
  location: "Toronto, ON",
  notifications: 3,
  avatar:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
};

export const quickActions: { label: string; icon: LucideIcon }[] = [
  { label: "Video Consult", icon: Video },
  { label: "Book Appointment", icon: CalendarPlus },
  { label: "Order Medicine", icon: Pill },
  { label: "Lab Tests", icon: FlaskConical },
  { label: "Ask a Free Question", icon: MessageCircleQuestion },
];

export const upcoming = {
  doctor: "Dr. Priya Shah",
  specialty: "Cardiologist",
  when: "Today, 4:30 PM",
  avatar:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=faces",
};

export const specialties = [
  "General Physician",
  "Dermatology",
  "Pediatrics",
  "Cardiology",
  "Gynecology",
  "Dentist",
  "ENT",
  "Mental Health",
];

export const doctors = [
  {
    name: "Dr. Aisha Khan",
    specialty: "Dermatologist",
    rating: 4.9,
    fee: "CAD $45",
    photo:
      "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Dr. Marcus Lee",
    specialty: "Cardiologist",
    rating: 4.8,
    fee: "CAD $60",
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Dr. Sofia Martinez",
    specialty: "Pediatrician",
    rating: 4.9,
    fee: "CAD $55",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces",
  },
];

export const pharmacy = {
  title: "Order medicines",
  sub: "Free delivery over $35",
  image:
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop",
};

export const lab = {
  title: "Lab tests at home",
  sub: "Home sample collection",
  image:
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop",
};

export const tips = [
  {
    title: "5 signs of vitamin D deficiency",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=240&fit=crop",
  },
  {
    title: "How to manage seasonal allergies",
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=240&fit=crop",
  },
  {
    title: "Heart-healthy meals under 20 minutes",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=240&fit=crop",
  },
];

export const tabs: { label: string; icon: LucideIcon }[] = [
  { label: "Home", icon: Home },
  { label: "Consult", icon: Stethoscope },
  { label: "Pharmacy", icon: ShoppingBag },
  { label: "Records", icon: FileText },
  { label: "Profile", icon: User },
];
