import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PhoneViewport } from "@/mobile/PhoneViewport";

export const Route = createFileRoute("/doctor/$id")({
  head: () => ({
    meta: [
      { title: "Doctor Profile — WellnessCareConnect" },
      {
        name: "description",
        content: "Doctor profile and booking on WellnessCareConnect.",
      },
    ],
  }),
  component: DoctorProfilePage,
});

function DoctorProfilePage() {
  const navigate = useNavigate();
  return (
    <PhoneViewport>
      <div className="relative flex h-full w-full flex-col bg-white">
        <div className="h-11 shrink-0" />
        <div className="flex h-[52px] items-center gap-2 border-b px-3" style={{ borderColor: "#EEF1EE" }}>
          <button
            onClick={() => navigate({ to: "/doctors" })}
            aria-label="Back"
            className="grid h-9 w-9 place-items-center rounded-full"
            style={{ backgroundColor: "#F3F6F2" }}
          >
            <ArrowLeft size={18} style={{ color: "#23291F" }} />
          </button>
          <h1 className="text-[18px] font-semibold" style={{ color: "#23291F" }}>Doctor Profile</h1>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 text-center">
          <p className="text-[15px] font-semibold" style={{ color: "#567257" }}>
            Doctor Profile — coming next
          </p>
        </div>
      </div>
    </PhoneViewport>
  );
}
