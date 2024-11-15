import { MarkdumbData } from "@/app/types/markdumb";
import { Project, ChartData } from "../../../types/cscale/project";

const jsonData = require("./cscale_testset_sorted.json") as Project[];

export const projects: ChartData = {
  xAxis: 'year_completion',
  yAxis: ['benchmark_EUI', 'EUI_MEP_threshold',
    //  'window_to_wall_ratio'
    ],
  data: jsonData
};

/** Overview of the API to be rendered as a TextPlot */
export const explanation: MarkdumbData = [
  {
      content: 'CScale',
      size: 'xl',
  },
  {
      content: 'CScale\'s API designed to provide comprehensive carbon intensity data for various building elements and structures based on location and unit preferences. It helps users understand and track carbon emissions across multiple aspects of construction and design.',
      size: 'm',
  },
  {
      content: `
/** Example Request and Response Overview */
{
  location: {
      latitude: 37.7749,
      longitude: -122.4194
  },
  region: "USA",
  unit_system: "Metric",
  filterby: {
      maxCarbonIntensity: 500,
      minStructureIntensity: 100
  }
}

Response:
{
  envelope: {
      cladding: { value: 120, unit: "kgCO2e/m2" },
      glazing: { value: 85, unit: "kgCO2e/m2" },
      roofing: { value: 150, unit: "kgCO2e/m2" }
  },
  structure: {
      Concrete: { value: 300, unit: "kgCO2e/m2" },
      Steel: { value: 400, unit: "kgCO2e/m2" }
  },
  mep: { value: 200, unit: "kgCO2e/m2" },
  hardscape: { value: 180, unit: "kgCO2e/m2" }
}
      `,
      size: 'm',
      code: true,
  },
];
