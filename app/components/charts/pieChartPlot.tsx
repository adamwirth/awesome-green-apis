import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

import { ChartData, Project } from '@/app/types/cscale/project';
import { GET_PIE_COLOR } from "@/app/utils/constants";
import { getCounts, transformCountsToArray } from "@/app/utils/transformers";

// todo generic, extract
interface ChartOptions {
    legend: boolean;
}

interface BarChartPlotProps {
    chartData: ChartData;
    sumKey: keyof Project; // todo best practices on this one?
    options?: ChartOptions;
}

const PieChartPlot = ({ chartData, sumKey, options }: BarChartPlotProps) => {
    if (!chartData || !chartData.data || chartData.data.length === 0) {
        return <div>No data available to render the chart.</div>;
    }
    const legend = options?.legend;
    
    let pieData;
    // e.g., primary_structural_system or primary_use
    {
        const sumKeyCounts = getCounts(chartData.data, sumKey);
        pieData = transformCountsToArray(sumKeyCounts);
    }
    
    return (
        <>
            <ResponsiveContainer width="100%" height="100%" >
                <PieChart width={730} height={250} >
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        fill="#8884d8"
                        label
                    >
                        {
                            pieData.map((_, index: number) => (
                                <Cell key={`cell-${index}`} fill={GET_PIE_COLOR(index)} />
                            ))}
                    </Pie>
                    < Tooltip />
                    {legend ? (< Legend />) : null}
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default PieChartPlot;
