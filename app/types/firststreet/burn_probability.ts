import { ChartData } from "@/app/types/common";

export interface BurnProbability {
    fsid: number;
    relativeYear: number;
    percent: number;
    emberPercent: number;
    flamePercent: number;
    yAxisHeight: number;
    point: number;
    emberYAxisHeight: number;
    emberPoint: number;
    flameYAxisHeight: number;
    flamePoint: number;
}

export interface BurnProbabilityChartData extends ChartData {
    data: () => Promise<{ default: BurnProbability[] }>;
}