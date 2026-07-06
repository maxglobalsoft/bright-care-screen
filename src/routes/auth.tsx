import { createFileRoute } from "@tanstack/react-router";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { AuthScreen } from "@/mobile/auth/AuthScreen";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — WellnessCareConnect" },
      { name: "description", content: "Log in or create your WellnessCareConnect account to book consultations and manage your care." },
    ],
  }),
  component: () => (
    <PhoneViewport>
      <AuthScreen />
    </PhoneViewport>
  ),
});
