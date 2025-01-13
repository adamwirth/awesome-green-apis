import { AirFactor } from "@/app/types/firststreet/air_factor";
import { BurnProbability } from "@/app/types/firststreet/burn_probability";
import { FloodRisk } from "@/app/types/firststreet/flood_risk";
import { MarkdumbData } from "@/app/types/markdumb";
import { ChartData } from "@/app/types/common";

export const airFactor: ChartData<AirFactor> = {
  xAxis: 'fsid',
  yAxis: ['airFactor'],
  chartDescription: 'The property\'s Air Factor, a numeric integer from 1-10 (where 1 = minimal and 10 = extreme) based on risk to the building.',
  data: async () => {
    const data = await import("./firststreet_air_factor_generated.json", {
      with: { type: "json" }
    }) as { default: AirFactor[] };
    return data;
  }
}

export const burnProbability: ChartData<BurnProbability> = {
  xAxis: 'relativeYear',
  yAxis: ['percent', 'emberPercent', 'flamePercent'],
  chartDescription: 'Fire probability details for property, such as percent chance of burn for a given year, and flame/ember projections.',
  data: async () => import("./firststreet_burn_probability_generated.json", { with: { type: "json" } })
};

export const floodRisk: ChartData<FloodRisk> = {
  xAxis: 'relativeYear',
  yAxis: ['mid', 'yMaxMid'],
  chartDescription: 'Risk likelihood (% probability) for flooding to the building footprint broken down by depth threshold and cumulative year.',
  data: async () => import("./firststreet_flood_risk_generated.json", { with: { type: "json" } })
};

/** Overview of the API to be rendered as a TextPlot */
export const explanation: Readonly<MarkdumbData> = Object.freeze([
  {
    content: 'FirstStreet',
    size: 'xxl',
    type: 'h1'
  },
  {
    badgeName: 'graphql',
    type: 'badge'
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
[more for heat, for wind...]`,
    size: 'm',
    type: 'code',
  },
]);