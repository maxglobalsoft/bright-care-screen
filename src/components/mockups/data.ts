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
  Heart,
  Baby,
  Brain,
  Smile,
  Ear,
  Bone,
  Eye,
  Activity,
  type LucideIcon,
} from "lucide-react";

export const greeting = {
  name: "Sarah",
  fullName: "Sarah Bennett",
  location: "Toronto, ON",
  notifications: 4,
  nudge: "You have 1 consult today and refills due in 3 days.",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
};

export const quickActions: { label: string; icon: LucideIcon }[] = [
  { label: "Video Consult", icon: Video },
  { label: "Book Appt", icon: CalendarPlus },
  { label: "Medicines", icon: Pill },
  { label: "Lab Tests", icon: FlaskConical },
  { label: "Ask Free", icon: MessageCircleQuestion },
];

export const upcoming = {
  doctor: "Dr. Priya Shah",
  specialty: "Cardiologist · Video",
  when: "Today · 4:30 PM",
  countdown: "in 2h 15m",
  avatar:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=faces",
};

export const specialties: { label: string; icon: LucideIcon }[] = [
  { label: "General", icon: Stethoscope },
  { label: "Cardiology", icon: Heart },
  { label: "Pediatrics", icon: Baby },
  { label: "Dermatology", icon: Smile },
  { label: "Mental Health", icon: Brain },
  { label: "ENT", icon: Ear },
  { label: "Orthopedic", icon: Bone },
  { label: "Eye Care", icon: Eye },
  { label: "Diabetes", icon: Activity },
];

export const doctors = [
  {
    name: "Dr. Aisha Khan",
    specialty: "Dermatologist · 12y",
    rating: 4.9,
    reviews: 312,
    fee: "$45 CAD",
    photo:
      "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Dr. Marcus Lee",
    specialty: "Cardiologist · 15y",
    rating: 4.8,
    reviews: 487,
    fee: "$60 CAD",
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Dr. Sofia Martinez",
    specialty: "Pediatrician · 9y",
    rating: 4.9,
    reviews: 256,
    fee: "$55 CAD",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Dr. James O'Connor",
    specialty: "General Physician · 8y",
    rating: 4.7,
    reviews: 198,
    fee: "$35 CAD",
    photo:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Dr. Nadia Rahman",
    specialty: "Psychiatrist · 11y",
    rating: 4.9,
    reviews: 342,
    fee: "$70 CAD",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Dr. Ethan Walker",
    specialty: "Orthopedic · 14y",
    rating: 4.8,
    reviews: 221,
    fee: "$65 CAD",
    photo:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=faces",
  },
];

export const pharmacy = {
  title: "Order medicines",
  sub: "Free delivery over $35 CAD",
  tag: "Reorder",
  image:
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop",
};

export const lab = {
  title: "Lab tests at home",
  sub: "Sample pickup from $19 CAD",
  tag: "Book slot",
  image:
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
};

export const tips = [
  {
    title: "5 signs of vitamin D deficiency you shouldn't ignore",
    category: "Nutrition",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&h=300&fit=crop",
  },
  {
    title: "How to manage seasonal allergies this spring",
    category: "Allergy",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=500&h=300&fit=crop",
  },
  {
    title: "Heart-healthy meals you can cook in under 20 minutes",
    category: "Cardiology",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=300&fit=crop",
  },
  {
    title: "Mindfulness routines to beat winter burnout",
    category: "Mental Health",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop",
  },
];

export const tabs: { label: string; icon: LucideIcon }[] = [
  { label: "Home", icon: Home },
  { label: "Consult", icon: Stethoscope },
  { label: "Pharmacy", icon: ShoppingBag },
  { label: "Records", icon: FileText },
  { label: "Profile", icon: User },
];
