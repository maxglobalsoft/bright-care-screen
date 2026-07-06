import { createFileRoute } from "@tanstack/react-router";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { VideoCallScreen } from "@/mobile/video/VideoCallScreen";

export const Route = createFileRoute("/video/call")({
  head: () => ({
    meta: [
      { title: "Live Video Call — WellnessCareConnect" },
      { name: "description", content: "Secure HD video consultation in progress with your WellnessCareConnect doctor." },
    ],
  }),
  component: () => (
    <PhoneViewport>
      <VideoCallScreen />
    </PhoneViewport>
  ),
});
