export type AxisKey<T> = keyof T;
export type YAxisTuple<T> = 
    | [AxisKey<T>] 
    | [AxisKey<T>, AxisKey<T>] 
    | [AxisKey<T>, AxisKey<T>, AxisKey<T>];

/**
 * @description One xAxis, sometimes several yAxises(sp?).
 * @template T - The incoming chart data.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ChartData<T = any> {
    xAxis: keyof T;
    yAxis: YAxisTuple<T>;
    data: () => Promise<{ default: Array<T> }>;
}

export function isValidYAxis<T>(yAxis: Array<keyof T>): yAxis is YAxisTuple<T> {
    return yAxis.length >= 1 && yAxis.length <= 3;
}

export interface ExtraReactProps {
  secondKey?: string; // For iteration of childrens' parent nodes
}