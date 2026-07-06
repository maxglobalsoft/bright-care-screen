import { createFileRoute } from "@tanstack/react-router";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { SplashScreen } from "@/mobile/screens/SplashScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WellnessCareConnect" },
      { name: "description", content: "WellnessCareConnect mobile app." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PhoneViewport>
      <SplashScreen />
    </PhoneViewport>
  );
}
