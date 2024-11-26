import { a } from "@aws-amplify/backend";

export const CarbonDataSchema = a
    .model({
        year: a.integer(),
        envelope: a.integer(),
        structure: a.integer(),
        interior_fitout: a.integer(),
        mep: a.integer(),
        hardscape: a.integer(),
        pv_array: a.integer(),
    })
    .authorization(allow => allow.guest().to(['read']));