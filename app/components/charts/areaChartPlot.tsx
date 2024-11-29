import {
  Area,
  AreaChart,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { getMetricColor, CHART_COLORS } from '@/app/utils/constants';

import { BaseChart, BaseChartProps } from './baseChart';
import { aggregateDataByYear } from '@/app/utils/transformers';

interface AreaChartProps extends BaseChartProps { };

class AreaChartPlot extends BaseChart<AreaChartProps> {
  constructor(props: AreaChartProps) {
    super(props);
    this.state = {
      data: this.createEmptyDataPoints(),
      isFinishedLoading: false,
      error: null
    };
  }
  componentDidUpdate(prevProps: AreaChartProps) {
    if (prevProps.chartDataRef !== this.props.chartDataRef) {
      // Only update if the chartDataRef has changed
      this.setState({
        data: this.createEmptyDataPoints()
      });
    }
  }
  
  renderChart() {
    const { data, isFinishedLoading } = this.state;
    const { chartDataRef, options } = this.props;

    const chartData = aggregateDataByYear(
      this.isDataReady() ? data! : this.createEmptyDataPoints(),
      chartDataRef
    );

    return (
      <ResponsiveContainer width="100%" height={options?.height || 300}>
        <AreaChart data={chartData}>
          <XAxis
            dataKey={chartDataRef.xAxis}
            // label={{ value: chartDataRef.xAxis, position: "insideBottom" }}
          />
          <YAxis>
            <Label value="Values" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />

          {chartDataRef.yAxis.map((metric: string, index: number) => (
            <Area
              key={metric}
              type="monotone"
              dataKey={metric}
              name={metric}
              stackId="1"
              fill={getMetricColor(index)}
              stroke={getMetricColor(index)}
              fillOpacity={CHART_COLORS.OPACITY.FILL}
              animationDuration={isFinishedLoading ? 1500 : 0}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  private createEmptyDataPoints(): Array<{ [key: string]: string | number }> {
    const { chartDataRef } = this.props;
    const defaultPoints = Array(5).fill(0).map((_, i) => i + 1);

    return defaultPoints.map(point => {
      const dataPoint: { [key: string]: string | number } = {
        [chartDataRef.xAxis]: `Point ${point}`
      };

      chartDataRef.yAxis.forEach(metric => {
        dataPoint[metric] = 0;
      });

      return dataPoint;
    });
  }
}
export default AreaChartPlot;