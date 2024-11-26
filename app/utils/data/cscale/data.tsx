import { fetchAuthSession } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";

import { type Schema } from "@/amplify/data/resource";

import { CarbonIntensitiesChartData } from "@/app/types/cscale/carbon_intensities";
import { ProjectChartData } from "@/app/types/cscale/project";
import { MarkdumbData } from "@/app/types/markdumb";


type InferredProjectData = Awaited<ReturnType<ProjectChartData['data']>>['default'];
type InferredCarbonData = Awaited<ReturnType<CarbonIntensitiesChartData['data']>>['default'];

const client = generateClient<Schema>();

export const projects: ProjectChartData = {
  xAxis: 'year_completion',
  yAxis: ['benchmark_EUI', 'EUI_MEP_threshold'],
  data: async () => {
    try {
      const session = await fetchAuthSession();
      const { data: projectData } = await client.models.Project.list();
      return { default: projectData as InferredProjectData };
    } catch (error) {
      console.error('Error fetching project data:', error);
      return import("./cscale_testset_sorted.json", { with: { type: "json" }})
    }
  }
};

export const carbon: CarbonIntensitiesChartData = {
  xAxis: 'year',
  yAxis: ['mep', 'pv_array'],
  data: async () => {
    try {
      const session = await fetchAuthSession();
      const { data: carbonData } = await client.models.CScaleCarbonData.list();
      return { default: carbonData as InferredCarbonData };
    } catch (error) {
      console.error('Error fetching carbon data:', error);
      return import("./cscale_yearly_carbon_generated.json", { with: { type: "json" }})
    }
  }
};

/** Overview of the API to be rendered as a TextPlot */
export const explanation: Readonly<MarkdumbData> = Object.freeze([
  {
    content: 'CScale',
    size: 'xxl',
    type: 'h1'
  },
  {
    content: 'An API designed to provide comprehensive carbon intensity data for various building elements and structures based on location and unit inputs. It helps users understand and track carbon emissions across aspects of construction and design.',
    size: 'm',
    type: 'p'
  },
  {
    content: `/** Example Request and Response Overview */
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
    type: 'code',
  },
]);
