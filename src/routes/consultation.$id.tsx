import { createFileRoute } from "@tanstack/react-router";
import { ConsultationScreen } from "@/mobile/consultation/ConsultationScreen";

export const Route = createFileRoute("/consultation/$id")({
  head: () => ({
    meta: [
      { title: "Consultation — WellnessCareConnect" },
      {
        name: "description",
        content:
          "Live chat and video consultation with your doctor on WellnessCareConnect.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConsultationScreen,
});
