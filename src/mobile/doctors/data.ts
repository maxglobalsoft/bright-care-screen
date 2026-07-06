const UNSPLASH = "https://images.unsplash.com";
const img = (id: string, w = 240) =>
  `${UNSPLASH}/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const specialtyFilters = [
  "All",
  "General",
  "Cardiology",
  "Pediatrics",
  "Neurology",
  "Dermatology",
  "Orthopedics",
  "Mental Health",
] as const;

export const specialFilters = ["Available today", "Top rated"] as const;

export type SortOption =
  | "Recommended"
  | "Price low to high"
  | "Price high to low"
  | "Rating";
export const sortOptions: SortOption[] = [
  "Recommended",
  "Price low to high",
  "Price high to low",
  "Rating",
];

export type DoctorFull = {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  years: number;
  rating: number;
  reviews: number;
  priceCad: number;
  city: string;
  availability: string;
  availableToday: boolean;
};

export const allDoctors: DoctorFull[] = [
  {
    id: "1",
    name: "Dr. Aisha Khan",
    photo: img("photo-1559839734-2b71ea197ec2"),
    specialty: "Dermatology",
    years: 12,
    rating: 4.9,
    reviews: 312,
    priceCad: 89,
    city: "Toronto",
    availability: "Available today",
    availableToday: true,
  },
  {
    id: "2",
    name: "Dr. Marcus Lee",
    photo: img("photo-1612349317150-e413f6a5b16d"),
    specialty: "Cardiology",
    years: 15,
    rating: 4.8,
    reviews: 487,
    priceCad: 119,
    city: "Vancouver",
    availability: "Next slot tomorrow 10:00 AM",
    availableToday: false,
  },
  {
    id: "3",
    name: "Dr. Sofia Martinez",
    photo: img("photo-1594824476967-48c8b964273f"),
    specialty: "Pediatrics",
    years: 9,
    rating: 4.9,
    reviews: 256,
    priceCad: 79,
    city: "Calgary",
    availability: "Available today",
    availableToday: true,
  },
  {
    id: "4",
    name: "Dr. Daniel Tremblay",
    photo: img("photo-1622253692010-333f2da6031d"),
    specialty: "General",
    years: 11,
    rating: 4.7,
    reviews: 342,
    priceCad: 69,
    city: "Montreal",
    availability: "Next slot tomorrow 10:00 AM",
    availableToday: false,
  },
  {
    id: "5",
    name: "Dr. Priya Nair",
    photo: img("photo-1651008376811-b90baee60c1f"),
    specialty: "Neurology",
    years: 14,
    rating: 4.8,
    reviews: 401,
    priceCad: 129,
    city: "Ottawa",
    availability: "Available today",
    availableToday: true,
  },
  {
    id: "6",
    name: "Dr. Ethan Wright",
    photo: img("photo-1537368910025-700350fe46c7"),
    specialty: "Orthopedics",
    years: 18,
    rating: 4.9,
    reviews: 522,
    priceCad: 109,
    city: "Edmonton",
    availability: "Next slot tomorrow 9:15 AM",
    availableToday: false,
  },
  {
    id: "7",
    name: "Dr. Amara Okafor",
    photo: img("photo-1614608682850-e0d6ed316d47"),
    specialty: "Mental Health",
    years: 8,
    rating: 4.7,
    reviews: 198,
    priceCad: 99,
    city: "Toronto",
    availability: "Available today",
    availableToday: true,
  },
  {
    id: "8",
    name: "Dr. Liam Nguyen",
    photo: img("photo-1622902046580-2b47f47f5471"),
    specialty: "General",
    years: 6,
    rating: 4.6,
    reviews: 132,
    priceCad: 59,
    city: "Vancouver",
    availability: "Next slot tomorrow 2:00 PM",
    availableToday: false,
  },
];
