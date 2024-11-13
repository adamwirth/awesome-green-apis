import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

import { ChartData, Project } from '@/app/types/cscale/project';

// todo generic, extract
interface ChartOptions {
    legend: boolean;
}

interface BarChartPlotProps {
    chartData: ChartData;
    sumKey: keyof Project; // todo best practices on this one?
    options?: ChartOptions;
}

// todo extract these helper funcs to utils/
const getCounts = (data: any[], key: string): Record<string, number> => {
    return data.reduce((acc: Record<string, number>, curr) => {
        const value = curr[key];
        if (value) {
            acc[value] = (acc[value] || 0) + 1;
        }
        return acc;
    }, {});
};

// Helper function to transform counts object to array
const transformCountsToArray = (counts: Record<string, number>) => {
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

const PieChartPlot = ({ chartData, sumKey, options }: BarChartPlotProps) => {
    if (!chartData || !chartData.data || chartData.data.length === 0) {
        return <div>No data available to render the chart.</div>;
    }
    const legend = options?.legend;
    // todo extract colors. d3 has color sets
    const colors = [
        "#8884d8",
        "#FA8072",
        "#AF69EE",
        "#3DED97",
        "#3AC7EB",
        "#F9A603",
    ];
    
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
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
