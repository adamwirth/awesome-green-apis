type Axis = [string] | [string, string] | [string, string, string];

/**
 * @description One xAxis, sometimes several yAxises(sp?).
 */
export interface ChartData {
    data: () => Promise<{ default: any[] }>;
    xAxis: string;
    yAxis: Axis;
}
