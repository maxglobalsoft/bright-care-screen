import { defineTool } from "@lovable.dev/mcp-js";
import { specialties } from "@/components/mockups/data";

export default defineTool({
  name: "list_specialties",
  title: "List specialties",
  description: "List the medical specialties featured in the WellnessCareConnect mockups.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const labels = specialties.map((s) => s.label);
    return {
      content: [{ type: "text", text: labels.join(", ") }],
      structuredContent: { specialties: labels },
    };
  },
});
