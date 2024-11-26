import { a } from "@aws-amplify/backend";

export const FloodRiskSchema = a
  .model({
    fsid: a.string(),
    relativeYear: a.integer(),
    mid: a.float(),
    yMaxMid: a.float(),
  })
  .authorization(allow => allow.guest().to(['read']));
