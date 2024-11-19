import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { GET_PIE_COLOR } from "@/app/utils/constants";
import { getCounts, transformCountsToArray } from "@/app/utils/transformers";
import { BaseChart, BaseChartProps, ChartOptions } from "./baseChart";
import { Heading } from "@aws-amplify/ui-react";

interface PieChartData {
    data: () => Promise<{ default: any[] }>;
    sumKey?: string;
    xAxis?: string;
    yAxis?: string[];
}

interface PieChartOptions extends ChartOptions {
    legend?: boolean;
    label?: boolean;
}

interface PieChartPlotProps extends BaseChartProps {
    chartDataRef: PieChartData;
    sumKey: string;
    options?: PieChartOptions;
}


class PieChartPlot extends BaseChart<PieChartPlotProps> {

    renderChart() {
        const { processedData } = this.state;
        const { sumKey, options = {} } = this.props;

        const legend = options.legend;

        // e.g., primary_structural_system or primary_use
        const sumKeyCounts = getCounts(processedData.data, sumKey);
        const pieData = transformCountsToArray(sumKeyCounts);

        return (
            <>
                {this.customTitle(options)}
                <ResponsiveContainer width="100%" height="100%" >
                    <PieChart width={730} height={options.title ? 200 : 250} >
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            fill="#8884d8"
                            label={options.label}
                        >
                            {
                                pieData.map((_, index: number) => (
                                    <Cell key={`cell-${index}`} fill={GET_PIE_COLOR(index)} />
                                ))
                            }
                        </Pie>
                        < Tooltip />
                        {legend ? (< Legend />) : null}
                    </PieChart>
                </ResponsiveContainer>
            </>
        )
    }
}

export default PieChartPlot;
