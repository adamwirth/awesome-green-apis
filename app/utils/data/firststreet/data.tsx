import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

import { BurnProbabilityChartData, BurnProbability } from "@/app/types/firststreet/burn_probability";
import { AirFactorChartData, AirFactor } from "@/app/types/firststreet/air_factor";
import { FloodRiskChartData, FloodRisk } from "@/app/types/firststreet/flood_risk";
import { MarkdumbData } from "@/app/types/markdumb";

type InferredBurnProbabilityData = Awaited<ReturnType<BurnProbabilityChartData['data']>>['default'];
type InferredFloodRiskData = Awaited<ReturnType<FloodRiskChartData['data']>>['default'];
type InferredAirFactorData = Awaited<ReturnType<AirFactorChartData['data']>>['default'];

const client = generateClient<Schema>();

export const burnProbability: BurnProbabilityChartData = {
  xAxis: 'relativeYear',
  yAxis: ['percent', 'emberPercent', 'flamePercent'],
  data: async (): Promise<{ default: BurnProbability[] }> => {
    try {
      const { data: burnData } = await client.models.FirstStreetBurnProbability.list();
      return { default: burnData as InferredBurnProbabilityData };
    } catch (error) {
      console.error('Error fetching burn probability data:', error);
      const { default: fallbackData } = await import("./firststreet_burn_probability_generated.json");
      return { default: fallbackData.data };
    }
  }
};

export const airFactor: AirFactorChartData = {
  xAxis: 'fsid',
  yAxis: ['airFactor'],
  data: async (): Promise<{ default: AirFactor[] }> => {
    try {
      const { data: airData } = await client.models.FirstStreetAirFactor.list();
      return { default: airData as InferredAirFactorData };
    } catch (error) {
      console.error('Error fetching air factor data:', error);
      const { default: fallbackData } = await import("./firststreet_air_factor_generated.json");
      // Inferring that the Factor strings in the json are appropriate
      return { default: fallbackData.data as AirFactor[] };
    }
  }
};

export const floodRisk: FloodRiskChartData = {
  xAxis: 'relativeYear',
  yAxis: ['mid', 'yMaxMid'],
  data: async (): Promise<{ default: FloodRisk[] }> => {
    try {
      const { data: floodData } = await client.models.FirstStreetFloodRisk.list();
      return { default: floodData as InferredFloodRiskData };
    } catch (error) {
      console.error('Error fetching flood risk data:', error);
      const { default: fallbackData } = await import("./firststreet_flood_risk_generated.json");
      return { default: fallbackData.data };
    }
  }
};
/** Overview of the API to be rendered as a TextPlot */
export const explanation: Readonly<MarkdumbData> = Object.freeze([
    {
        content: 'FirstStreet',
        size: 'xxl',
        type: 'h1'
    },
    {
        content: 'A comprehensive GraphQL API that provides forward-looking risk assessment data for properties. Using property data from Lightbox (DMP), FirstStreet delivers detailed projections for flooding, heat stress, wind damage, and air quality metrics projected up to 30 years into the future. This enables portfolio managers and property stakeholders to make data-driven decisions based on climate risk factors.',
        size: 'm',
        type: 'p'
    },
    {
        content: `/** Example GraphQL Query and Response */
query PropertyRiskAssessment {
  property(fsid: "1234567") {
    flood {
      probability {
        cumulative {
          mid
          yMaxMid
          relativeYear
        }
      }
    }
    heat {
      riskIndex {
        current
        projected2050
        confidence
      }
    }
    wind {
      annualLoss {
        expected
        worstCase
        probability
      }
    }
  }
}

Response:
{
  "data": {
    "property": {
      "flood": {
        "probability": {
          "cumulative": [
            { "mid": 0.15, "yMaxMid": 0.25, "relativeYear": 2024 },
            { "mid": 0.22, "yMaxMid": 0.35, "relativeYear": 2030 },
            { "mid": 0.45, "yMaxMid": 0.65, "relativeYear": 2050 }
          ]
        }
      }
    }
  }
}
      `,
        size: 'm',
        type: 'code',
    },
]);