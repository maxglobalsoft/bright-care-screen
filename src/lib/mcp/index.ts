import { defineMcp } from "@lovable.dev/mcp-js";
import listConceptsTool from "./tools/list-concepts";
import listDoctorsTool from "./tools/list-doctors";
import listSpecialtiesTool from "./tools/list-specialties";

export default defineMcp({
  name: "wellnesscareconnect-mockups-mcp",
  title: "WellnessCareConnect Mockups MCP",
  version: "0.1.0",
  instructions:
    "Tools for the WellnessCareConnect mobile homepage mockup showcase. Use `list_mockup_concepts` to see the three design concepts, `list_specialties` for the specialty chips, and `list_doctors` to browse or filter the sample doctors.",
  tools: [listConceptsTool, listDoctorsTool, listSpecialtiesTool],
});
