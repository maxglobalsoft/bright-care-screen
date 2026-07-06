import { createFileRoute } from "@tanstack/react-router";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { PharmacyScreen } from "@/mobile/pharmacy/PharmacyScreen";

export const Route = createFileRoute("/pharmacy")({
  head: () => ({
    meta: [
      { title: "Pharmacy — WellnessCareConnect" },
      { name: "description", content: "Order medicines, vitamins, baby care, and personal care essentials with free delivery over CA$ 35." },
    ],
  }),
  component: () => (
    <PhoneViewport>
      <PharmacyScreen />
    </PhoneViewport>
  ),
});
