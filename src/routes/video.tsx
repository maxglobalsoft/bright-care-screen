import { createFileRoute } from "@tanstack/react-router";
import { PhoneViewport } from "@/mobile/PhoneViewport";
import { VideoLobbyScreen } from "@/mobile/video/VideoLobbyScreen";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Video Consultation — WellnessCareConnect" },
      { name: "description", content: "Instantly connect to a licensed doctor via secure HD video consultation. HIPAA-compliant, end-to-end encrypted." },
    ],
  }),
  component: () => (
    <PhoneViewport>
      <VideoLobbyScreen />
    </PhoneViewport>
  ),
});
