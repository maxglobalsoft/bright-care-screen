import { createFileRoute } from "@tanstack/react-router";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { DoctorsScreen } from "@/mobile/doctors/DoctorsScreen";

type DoctorsSearch = { specialty?: string };

export const Route = createFileRoute("/doctors")({
  validateSearch: (s: Record<string, unknown>): DoctorsSearch => ({
    specialty: typeof s.specialty === "string" ? s.specialty : undefined,
  }),
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
