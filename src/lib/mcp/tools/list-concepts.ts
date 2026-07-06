import { defineTool } from "@lovable.dev/mcp-js";

const concepts = [
  {
    id: "calm-minimal",
    name: "Concept A — Calm Minimal",
    description:
      "Clean, airy layout with generous white space, soft green accents, and thin iconography.",
  },
  {
    id: "vibrant-gradient",
    name: "Concept B — Vibrant Gradient",
    description:
      "Deep green gradient header, high-contrast cards, and decorative plus-sign motifs.",
  },
  {
    id: "warm-friendly",
    name: "Concept C — Warm Friendly",
    description:
      "Cream surface, rounded corners, and a welcoming hero greeting card for a friendly feel.",
  },
];

export default defineTool({
  name: "list_mockup_concepts",
  title: "List mockup concepts",
  description:
    "List the three WellnessCareConnect mobile homepage mockup concepts available at /mockups.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(concepts, null, 2) }],
    structuredContent: { concepts },
  }),
});
