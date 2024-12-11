import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, Tooltip } from 'recharts';

import { CHART_COLORS, getMetricColor } from '@/app/utils/constants/colors';
import { BaseChartProps, BaseChart } from './baseChart';

type RadarChartProps = BaseChartProps;

class RadarChartPlot extends BaseChart<RadarChartProps> {
    renderChart() {
        const { data, isFinishedLoading } = this.state;
        const { chartDataRef, options } = this.props;

        // Only use empty points if we're still loading or if data load failed
        const chartData = this.isDataReady()
            ? data!
            : this.createEmptyDataPoints()

        const xAxis = chartDataRef?.xAxis || chartDataRef.xAxis;
        const yAxis = chartDataRef?.yAxis || chartDataRef.yAxis;

        return (
            <ResponsiveContainer width="100%" height={350}>
                <RadarChart outerRadius={90} data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey={String(xAxis)} />

                    {yAxis.map((metric: string | symbol | number, index: number) => {
                        const color = options?.colors?.[index] || getMetricColor(index);

                        return (
                            <Radar
                                key={String(metric)}
                                name={String(metric)}
                                dataKey={String(metric)}
                                stroke={color}
                                fill={color}
                                fillOpacity={CHART_COLORS.OPACITY.FILL}
                                // Add loading animation if data isn't loaded
                                animationDuration={isFinishedLoading ? 1500 : 0}
                            />
                        );
                    })}
                    <Legend />
                    <Tooltip />
                </RadarChart>
            </ResponsiveContainer>
        );
    }

    private createEmptyDataPoints() {
        const { chartDataRef } = this.props;

        // For loading state, might want fewer placeholder points
        // todo update... probably just hard-code it too its small
        const defaultCategories = ['Category 1', 'Category 2', 'Category 3'];

        return defaultCategories.map(category => {
            // todo avoid empty supertype like this
            const dataPoint: { [key: string]: string | number } = {
                [chartDataRef.xAxis]: category
            };

            chartDataRef.yAxis.forEach(metric => {
                dataPoint[String(metric)] = 0;
            });

            return dataPoint;
        });
    }
}
export default RadarChartPlot;