import { createFileRoute } from "@tanstack/react-router";
import { DoctorProfileScreen } from "@/mobile/doctor/DoctorProfileScreen";

export const Route = createFileRoute("/doctor/$id")({
  head: () => ({
    meta: [
      { title: "Doctor Profile — WellnessCareConnect" },
      {
        name: "description",
        content:
          "View doctor details, experience, reviews and book a chat, audio or video consultation on WellnessCareConnect.",
      },
    ],
  }),
  component: DoctorProfileScreen,
});
