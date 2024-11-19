import { ChartData } from "../common";

export interface Project {
    project_name: number;
    year_completion: number;
    zipcode: string;
    country: string;
    primary_structural_system: string;
    primary_use: string;
    above_floors: number;
    above_floor_sqf: number;
    window_to_wall_ratio: number;
    reference_period: number;
    benchmark_EUI: number;
    refurbish_pc: number;
    EUI_MEP_threshold: number;
    steel_specification: string;
    concrete_specification: string;
    timber_specification: string;
    interior_fitout_specification: string;
    envelope_specification: string;
    all_electric: boolean;
}

export interface ProjectChartData extends ChartData {
    data: () => Promise<any>
}
