import { createFileRoute } from "@tanstack/react-router";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { ProfileScreen } from "@/mobile/profile/ProfileScreen";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — WellnessCareConnect" },
      { name: "description", content: "View your health stats, appointments, orders, and account settings on WellnessCareConnect." },
    ],
  }),
  component: () => (
    <PhoneViewport>
      <ProfileScreen />
    </PhoneViewport>
  ),
});
