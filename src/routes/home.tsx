import { createFileRoute } from "@tanstack/react-router";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { HomeScreen } from "@/mobile/home/HomeScreen";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — WellnessCareConnect" },
      {
        name: "description",
        content:
          "Book video, audio, or chat consultations with verified doctors, order medicines, and schedule lab tests — all from the WellnessCareConnect mobile app.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PhoneViewport>
      <HomeScreen />
    </PhoneViewport>
  );
}
