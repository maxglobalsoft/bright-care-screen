import { createFileRoute } from "@tanstack/react-router";
import { SplashScreen } from "@/mobile/screens/SplashScreen";

export const Route = createFileRoute("/app/")({
  component: SplashScreen,
});
