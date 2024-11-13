import { ChartData } from '@/app/types/cscale/project';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts';

interface BarChartPlotProps {
    chartData: ChartData;
}

// Helper function to aggregate data by year and calculate averages for multiple keys
const aggregateDataByYear = (data: any[], xAxisKey: string, yAxis: string | string[]) => {
    const yAxisKeys = typeof yAxis === 'object' ? yAxis : [yAxis];
    const aggregatedData = data.reduce((acc, curr) => {
        const year = curr[xAxisKey];
        if (!acc[year]) {
            // Initialize entry for each year
            acc[year] = {
                [xAxisKey]: year,
                count: 0,
            };
            // Initialize totals accumulators for each yAxis key
            yAxisKeys.forEach((key: string) => {
                acc[year][`total_${key}`] = 0;
            });
        }

        // Accumulate values for each yAxis key
        yAxisKeys.forEach(key => {
            acc[year][`total_${key}`] += curr[key];
        });
        // Store counts to do statistics later
        acc[year].count += 1;

        return acc;
    }, {});

    // Calculate averages for each yAxis key
    return Object.values(aggregatedData).map((entry: any) => {
        const averages: Record<string, number> = { [xAxisKey]: entry[xAxisKey] };
        // Doing statistics now
        yAxisKeys.forEach(key => {
            averages[`average_${key}`] = Math.round((entry[`total_${key}`] / entry.count) * 100) / 100;
        });
        return averages;
    });
};

/**
 * Currently takes in a pair of yAxis-es to render with.
 * @todo trendline(s) automatically
 * @todo check for supplied statistics data (before calculating myself)
 */
const StackedBarChartPlot = ({ chartData }: BarChartPlotProps) => {
    if (!chartData || !chartData.data || chartData.data.length === 0) {
        return <div>No data available to render the chart.</div>;
    }

    // Aggreegate data by year to calculate averages for supplied yAxis keys
    const aggregatedData = aggregateDataByYear(chartData.data, chartData.xAxis, chartData.yAxis);
    const leftColor = "#00b300";
    const rightColor = "#ff6600";

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
                        >
                        <Label value={chartData.xAxis} offset={-1} position="insideBottom" />
                    </XAxis>
                    <YAxis
                        yAxisId="left" orientation="left" stroke={leftColor}
                        // domain={['auto', 'auto']} // Auto domain to handle small ranges
                        // allowDecimals={true} // Allow decimals for finer scale
                    >
                        <Label value={"Averages"} offset={10} angle={-90} position="insideLeft" />
                    </YAxis>
                    <YAxis yAxisId="right" orientation="right" stroke={rightColor} />
                    <Tooltip />
                    <Legend />
                    {/* Dynamically create bars for each yAxis key */}
                    {chartData.yAxis.map((key: string, index: number) => (
                        <Bar
                            key={key}
                            yAxisId={index % 2 === 0 ? "left" : "right"}
                            dataKey={`average_${key}`}
                            stackId="aaa"
                            fill={index % 2 === 0 ? leftColor : rightColor}
                            name={`Average ${key}`}
                        />
                    ))}

                </BarChart>
            </ResponsiveContainer>
        </>
    );
}

export default StackedBarChartPlot;