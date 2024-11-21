export interface ChartData {
    data: () => Promise<{ default: any[] }>;
    xAxis: string;
    yAxis: [string, string];
}