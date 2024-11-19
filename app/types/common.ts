export interface ChartData {
    xAxis: string;
    yAxis: [string, string];
    data: () => Promise<any>;
}