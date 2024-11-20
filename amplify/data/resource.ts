import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const CScaleCarbonDataSchema = a.schema({
  CScaleCarbonData: a
    .model({
      year: a.integer(),
      envelope: a.integer(),
      structure: a.integer(),
      interior_fitout: a.integer(),
      mep: a.integer(),
      hardscape: a.integer(),
      pv_array: a.integer(),
    })
    .authorization(allow => allow.guest().to(['read'])),
});

export type Schema = ClientSchema<typeof CScaleCarbonDataSchema>;

export const data = defineData({
  schema: CScaleCarbonDataSchema,
});

/*== USAGE EXAMPLES =============================================================

todo wip...

Using JavaScript or Next.js React Server Components:

"use client"
import { generateClient } from "aws-amplify/data";
import type { CScaleCarbonDataSchema } from "@/amplify/data/resource";

const client = generateClient<CScaleCarbonDataSchema>();

// List all carbon data entries
const { data: carbonData } = await client.models.CScaleCarbonDataSchema.list();

// Get carbon data for a specific year
const { data: yearData } = await client.models.CScaleCarbonDataSchema.get({ year: 2023 });

=========================================================================*/
