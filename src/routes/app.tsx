import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PhoneViewport } from "@/mobile/PhoneViewport";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "WellnessCareConnect" },
      { name: "description", content: "WellnessCareConnect mobile app preview." },
    ],
  }),
  component: AppShell,
});

function AppShell() {
  return (
    <PhoneViewport>
      <Outlet />
    </PhoneViewport>
  );
}
