import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { CarbonDataSchema } from "./models/cscale_carbon_data";
import { ProjectSchema } from "./models/cscale_project";
import { BurnProbabilitySchema } from "./models/firststreet_burn_probability";
import { AirFactorSchema } from "./models/firststreet_air_factor";
import { FloodRiskSchema } from "./models/firststreet_flood_risk";

const schema = a.schema({
  CScaleCarbonData: CarbonDataSchema,
  Project: ProjectSchema,
  FirstStreetBurnProbability: BurnProbabilitySchema,
  FirstStreetAirFactor: AirFactorSchema,
  FirstStreetFloodRisk: FloodRiskSchema,
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
});