import { Area, AreaChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BaseChart, BaseChartProps, ChartOptions } from './baseChart';
import { aggregateDataByYear } from '@/app/utils/transformers';
import { LEFT_COLOR, RIGHT_COLOR } from '@/app/utils/constants';
import { Heading } from '@aws-amplify/ui-react';


interface AreaChartOptions extends ChartOptions {
    title?: boolean;
}

interface AreaChartData {
    data: any[];
    options?: AreaChartOptions;
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
        const { options = {} } = this.props;

        // Aggregate data by year
        const aggregatedData = aggregateDataByYear(
            processedData.data,
            processedData.xAxis,
            processedData.yAxis
        );

        return (
            <>
                {this.customTitle(options)}
                <ResponsiveContainer width="100%" height="100%" >
                    <AreaChart
                        data={aggregatedData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
                        height={options.title ? 250 : 350}
                    >
                        {this.customTitle(options)}

                        <XAxis dataKey={processedData.xAxis as string}
                            domain={['auto', 'auto']}
                            type="number" />
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