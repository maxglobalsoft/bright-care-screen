import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/home")({
  component: HomePlaceholder,
});

function HomePlaceholder() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 px-8 text-center"
      style={{ backgroundColor: "#FBF7EE", color: "#2F4A38" }}
    >
      <div
        className="mb-1 h-10 w-10 rounded-full"
        style={{ background: "linear-gradient(135deg, #567257, #E8912D)" }}
      />
      <h1 className="text-xl font-semibold" style={{ color: "#567257" }}>
        Home — coming next
      </h1>
      <p className="text-sm opacity-70">
        Send the next master prompt to design the home screen.
      </p>
    </div>
  );
}
