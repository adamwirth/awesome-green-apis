import { a } from "@aws-amplify/backend";

export const ProjectSchema = a
    .model({
        project_name: a.integer(),
        year_completion: a.integer(),
        zipcode: a.string(),
        country: a.string(),
        primary_structural_system: a.string(),
        primary_use: a.string(),
        above_floors: a.integer(),
        above_floor_sqf: a.integer(),
        window_to_wall_ratio: a.float(),
        reference_period: a.integer(),
        benchmark_EUI: a.integer(),
        refurbish_pc: a.float(),
        EUI_MEP_threshold: a.float(),
        steel_specification: a.string(),
        concrete_specification: a.string(),
        timber_specification: a.string(),
        interior_fitout_specification: a.string(),
        envelope_specification: a.string(),
        all_electric: a.boolean(),
    }).authorization(allow => allow.guest().to(['read']));