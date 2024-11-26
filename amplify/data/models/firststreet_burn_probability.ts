import { a } from "@aws-amplify/backend";

export const BurnProbabilitySchema = a
  .model({
    fsid: a.integer(),
    relativeYear: a.integer(),
    percent: a.float(),
    emberPercent: a.float(),
    flamePercent: a.float(),
    yAxisHeight: a.float(),
    point: a.float(),
    emberYAxisHeight: a.float(),
    emberPoint: a.float(),
    flameYAxisHeight: a.float(),
    flamePoint: a.float(),
  })
  .authorization(allow => allow.guest().to(['read']));