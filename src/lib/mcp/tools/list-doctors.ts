import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { doctors } from "@/components/mockups/data";

export default defineTool({
  name: "list_doctors",
  title: "List doctors",
  description:
    "List the sample doctors shown in the WellnessCareConnect mockups, optionally filtered by a case-insensitive substring match on name or specialty.",
  inputSchema: {
    filter: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Optional case-insensitive substring to match name or specialty."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ filter }) => {
    const rows = doctors.map(({ name, specialty, rating, reviews, fee }) => ({
      name,
      specialty,
      rating,
      reviews,
      fee,
    }));
    const filtered = filter
      ? rows.filter(
          (d) =>
            d.name.toLowerCase().includes(filter.toLowerCase()) ||
            d.specialty.toLowerCase().includes(filter.toLowerCase()),
        )
      : rows;
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
      structuredContent: { doctors: filtered },
    };
  },
});
