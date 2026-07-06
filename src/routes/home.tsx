import { createFileRoute } from "@tanstack/react-router";
import { PhoneViewport } from "@/mobile/PhoneViewport";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [{ title: "Home — WellnessCareConnect" }],
  }),
  component: Home,
});

function Home() {
  return (
    <PhoneViewport>
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p style={{ color: "#567257", fontSize: 18 }}>Home Screen — coming next</p>
      </div>
    </PhoneViewport>
  );
}
