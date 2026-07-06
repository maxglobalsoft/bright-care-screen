import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { DoctorsScreen } from "@/mobile/doctors/DoctorsScreen";

const searchSchema = z.object({
  specialty: fallback(z.string().optional(), undefined),
});

export const Route = createFileRoute("/doctors")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Find Doctors — WellnessCareConnect" },
      {
        name: "description",
        content:
          "Browse verified Canadian doctors by specialty, rating, and availability. Book chat, audio, or video consultations in minutes.",
      },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const { specialty } = Route.useSearch();
  return (
    <PhoneViewport>
      <DoctorsScreen initialSpecialty={specialty} />
    </PhoneViewport>
  );
}
