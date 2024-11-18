import { ChartData } from '@/app/types/cscale/project';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

interface AreaChartPlotProps {
    chartData: ChartData;
}

const AreaChartPlot = ({ chartData }: AreaChartPlotProps) => {
    if (!chartData || !chartData.data || chartData.data.length === 0) {
        return <div>No data available to render the chart.</div>;
    }

    const leftY = chartData.yAxis[0];
    const rightY = chartData.yAxis[1];

    return (
        <>
            <ResponsiveContainer width="100%" height="100%" >
                <AreaChart data={chartData.data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 15 }}>
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
                    <XAxis dataKey={chartData.xAxis}
                        domain={['auto', 'auto']}
                        type="number"
                        interval="preserveStartEnd" >
                        <Label value={chartData.xAxis} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis dataKey={leftY}
                        yAxisId="left"
                        orientation="left"
                        stroke="url(#colorPv)"
                    // domain={['auto', 'auto']} // Auto domain to handle small ranges
                    // allowDecimals={true} // Allow decimals for finer scale
                    >
                        <Label value={leftY} offset={10} angle={-90} position="insideLeft" />
                    </YAxis>
                    <YAxis yAxisId="right" orientation="right" stroke="white" />
                    <Tooltip />
                    <Area yAxisId="left" type="monotone" dataKey={leftY} stroke="url(#colorPv)" fill="url(#colorUv)" />
                    <Area yAxisId="right" type="monotone" dataKey={rightY} stroke="white" fill="none" />

                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}

export default AreaChartPlot;