import { createFileRoute } from "@tanstack/react-router";
import { ConceptACalmMinimal } from "@/components/mockups/ConceptACalmMinimal";
import { ConceptBVibrantGradient } from "@/components/mockups/ConceptBVibrantGradient";
import { ConceptCWarmFriendly } from "@/components/mockups/ConceptCWarmFriendly";

export const Route = createFileRoute("/mockups")({
  head: () => ({
    meta: [
      { title: "Mobile App Concepts — WellnessCareConnect" },
      {
        name: "description",
        content:
          "Three home-screen concepts for the WellnessCareConnect mobile app, presented side by side for client selection.",
      },
    ],
  }),
  component: MockupsPage,
});

const concepts = [
  {
    id: "A",
    title: "Concept A — Calm Minimal",
    mood: "Editorial restraint. Lots of white space, hairline borders, sage accents.",
    Component: ConceptACalmMinimal,
  },
  {
    id: "B",
    title: "Concept B — Vibrant Gradient",
    mood: "Modern healthcare SaaS. Gradient band, elevated cards, confident depth.",
    Component: ConceptBVibrantGradient,
  },
  {
    id: "C",
    title: "Concept C — Warm & Friendly",
    mood: "Family-oriented warmth. Cream surface, rounded corners, inviting photography.",
    Component: ConceptCWarmFriendly,
  },
];

function MockupsPage() {
  return (
    <div className="min-h-screen bg-[#F2F4F1] font-inter">
      <header className="mx-auto max-w-7xl px-6 pt-12 pb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-wcc-sage">
          WellnessCareConnect · Every Health Matters
        </p>
        <h1 className="mt-3 font-sora text-3xl font-bold text-wcc-green-deep sm:text-4xl">
          Mobile App — Home Screen Concepts
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-wcc-slate">
          Same content, three visual directions. Pick the one that best fits the brand
          and we'll build the inner pages on top of it.
        </p>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 justify-items-center gap-12 md:grid-cols-2 xl:grid-cols-3">
          {concepts.map(({ id, title, mood, Component }) => (
            <div key={id} className="flex flex-col items-center gap-4">
              <Component />
              <div className="max-w-[360px] text-center">
                <h2 className="font-sora text-base font-bold text-wcc-green-deep">
                  {title}
                </h2>
                <p className="mt-1 text-xs leading-snug text-wcc-slate">{mood}</p>
                <button className="mt-3 rounded-full border border-wcc-green-primary px-5 py-2 text-xs font-semibold text-wcc-green-primary transition hover:bg-wcc-green-primary hover:text-white">
                  Choose Concept {id}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
