import { Pill, Leaf, Baby, Sparkles, HeartPulse, Activity, type LucideIcon } from "lucide-react";

export type Category = "All" | "Medicines" | "Vitamins" | "Baby Care" | "Personal Care" | "Devices";
export const categories: Category[] = ["All", "Medicines", "Vitamins", "Baby Care", "Personal Care", "Devices"];

export type Product = {
  id: string;
  name: string;
  pack: string;
  priceCad: number;
  category: Exclude<Category, "All">;
  icon: LucideIcon;
};

export const products: Product[] = [
  { id: "p1", name: "Paracetamol 500mg", pack: "Strip of 10 tablets", priceCad: 4.99, category: "Medicines", icon: Pill },
  { id: "p2", name: "Ibuprofen 200mg", pack: "Bottle of 24 caplets", priceCad: 7.49, category: "Medicines", icon: Pill },
  { id: "p3", name: "Vitamin D3 1000 IU", pack: "60 soft gels", priceCad: 14.99, category: "Vitamins", icon: Leaf },
  { id: "p4", name: "Multivitamin Daily", pack: "90 tablets", priceCad: 19.99, category: "Vitamins", icon: Leaf },
  { id: "p5", name: "Baby Diapers Size 3", pack: "Pack of 46", priceCad: 22.5, category: "Baby Care", icon: Baby },
  { id: "p6", name: "Gentle Baby Wipes", pack: "Pack of 80", priceCad: 6.99, category: "Baby Care", icon: Baby },
  { id: "p7", name: "Moisturizing Lotion", pack: "400 ml bottle", priceCad: 12.99, category: "Personal Care", icon: Sparkles },
  { id: "p8", name: "Toothpaste Fresh Mint", pack: "100 ml tube", priceCad: 3.79, category: "Personal Care", icon: Sparkles },
  { id: "p9", name: "Digital Thermometer", pack: "1 unit + batteries", priceCad: 15.49, category: "Devices", icon: Activity },
  { id: "p10", name: "Blood Pressure Monitor", pack: "Upper-arm cuff", priceCad: 64.99, category: "Devices", icon: HeartPulse },
  { id: "p11", name: "Omega-3 Fish Oil", pack: "120 soft gels", priceCad: 24.99, category: "Vitamins", icon: Leaf },
  { id: "p12", name: "Antiseptic Cream", pack: "30g tube", priceCad: 5.49, category: "Medicines", icon: Pill },
];
