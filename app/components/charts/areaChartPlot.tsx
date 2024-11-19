import { Area, AreaChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BaseChart, BaseChartProps } from './baseChart';
import { aggregateDataByYear } from '@/app/utils/transformers';
import { LEFT_COLOR, RIGHT_COLOR } from '@/app/utils/constants';

interface AreaChartData {
    data: any[];
    [key: string]: any;
}

interface AreaChartPlotProps extends BaseChartProps {
    chartDataRef: {
        data: () => Promise<{ default: AreaChartData[] }>;
        xAxis: string;
        yAxis: string[];
    };
}

class AreaChartPlot extends BaseChart<AreaChartPlotProps> {
    renderChart() {
        const { processedData } = this.state;

        if (!processedData || !processedData.data || processedData.data.length === 0) {
            return <div>No data available to render the chart.</div>;
        }

        // Aggregate data by year
        const aggregatedData = aggregateDataByYear(
            processedData.data,
            processedData.xAxis,
            processedData.yAxis
        );

        return (
            <>
                <ResponsiveContainer width="100%" height="100%" >
                    <AreaChart data={aggregatedData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 15 }}>
                        <XAxis dataKey={processedData.xAxis as string}
                            domain={['auto', 'auto']}
                            type="number" >
                        </XAxis>
                        <Tooltip />

                        {processedData.yAxis.map((key: string, index: number) => (
                            <Area
                                key={key}
                                yAxisId={index % 2 === 0 ? "left" : "right"}
                                dataKey={`average_${key}`}
                                stackId="ccc"
                                fill={index % 2 === 0 ? LEFT_COLOR : RIGHT_COLOR}
                                name={`Average ${key}`}
                            />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </>
        );
    }
}

export default AreaChartPlot;