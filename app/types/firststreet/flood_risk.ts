import { ChartData } from "@/app/types/common";

export interface FloodRisk {
    fsid: string;
    relativeYear: number;
    mid: number;
    yMaxMid: number;
}

export interface FloodRiskChartData extends ChartData {
    data: () => Promise<{ default: FloodRisk[] }>;
}