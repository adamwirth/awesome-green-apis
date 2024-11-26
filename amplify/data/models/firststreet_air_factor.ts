import { a } from "@aws-amplify/backend";

export const AirFactorSchema = a
  .model({
    fsid: a.integer(),
    airFactor: a.integer(),
    factorScale: a.enum(['Minimal', 'Minor', 'Moderate', 'Major', 'Severe', 'Extreme']),
  })
  .authorization(allow => allow.guest().to(['read']));