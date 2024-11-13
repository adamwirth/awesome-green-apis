import { ChartData } from '@/app/types/cscale/project';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

interface AreaChartPlotProps {
    chartData: ChartData;
}

const AreaChartPlot = ({ chartData }: AreaChartPlotProps) => {
    if (!chartData || !chartData.data || chartData.data.length === 0) {
        return <div>No data available to render the chart.</div>;
    }
    
    chartData.data = chartData.data.map(v => { v.EUI_MEP_threshold = v.EUI_MEP_threshold * 100; return v;})

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
                    domain={[2022, 2030]} tickCount={8} 
                    type="number"
                     interval="preserveStartEnd" >
                        <Label value={chartData.xAxis} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis dataKey={chartData.yAxis}
                    domain={['auto', 'auto']} // Auto domain to handle small ranges
                    allowDecimals={true} // Allow decimals for finer scale
                     >
                        <Label value={chartData.yAxis} offset={10} angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Area key={chartData.data[0]['EUI_MEP_threshold']} type="monotone" dataKey={chartData.data[0]['EUI_MEP_threshold']} stroke="blue" fill="purple" />
                    {Object.keys(chartData.data[0])
                        // Omit identical keys
                        .filter(key => [chartData.yAxis].includes(key))
                        .map(key => (
                            <Area key={key} type="monotone" dataKey={key} stackId={key} stroke="url(#colorPv)" fill="url(#colorUv)" />
                        ))}
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}

export default AreaChartPlot;