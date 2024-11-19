import { ChartData } from '@/app/types/common';
import { LEFT_COLOR, RIGHT_COLOR } from '@/app/utils/constants';
import { aggregateDataByYear } from '@/app/utils/transformers';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts';

interface StackedBarChartPlotProps<T extends ChartData> {
    chartData: T;
}

/**
 * Currently takes in a pair of yAxis-es to render with.
 * @todo trendline(s) automatically
 * @todo check for supplied statistics data (before calculating myself)
 */
const StackedBarChartPlot = <T extends ChartData>({ chartData }: StackedBarChartPlotProps<T>) => {
    if (!chartData || !chartData.data || chartData.data.length === 0) {
        return <div>No data available to render the chart.</div>;
    }

    // Aggreegate data by year to calculate averages for supplied yAxis keys
    const aggregatedData = aggregateDataByYear(
        chartData.data, 
        chartData.xAxis as T["xAxis"], 
        chartData.yAxis as T["yAxis"]
    );

    return (
        <>
            <ResponsiveContainer width="100%" height="100%" >
                <BarChart data={aggregatedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00b300" stopOpacity={0.85} />
                            <stop offset="95%" stopColor="#ccffcc" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ccffcc" stopOpacity={0.85} />
                            <stop offset="95%" stopColor="#00b300" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey={chartData.xAxis}
                        domain={['auto', 'auto']}
                        // interval="equidistantPreserveStart"
                        // scale="sequential"
                    />
                    <YAxis
                        yAxisId="left" 
                        orientation="left" 
                        stroke={LEFT_COLOR}
                        // domain={['auto', 'auto']} // Auto domain to handle small ranges
                        // allowDecimals={true} // Allow decimals for finer scale
                    >
                        <Label value={"Averages"} offset={10} angle={-90} position="insideLeft" />
                    </YAxis>
                    <YAxis yAxisId="right" orientation="right" stroke={RIGHT_COLOR} />
                    <Tooltip />
                    <Legend />
                    {/* Dynamically create bars for each yAxis key */}
                    {chartData.yAxis.map((key: string, index: number) => (
                        <Bar
                            key={key}
                            yAxisId={index % 2 === 0 ? "left" : "right"}
                            dataKey={`average_${key}`}
                            stackId="aaa"
                            fill={index % 2 === 0 ? LEFT_COLOR : RIGHT_COLOR}
                            name={`Average ${key}`}
                        />
                    ))}

                </BarChart>
            </ResponsiveContainer>
        </>
    );
}

export default StackedBarChartPlot;