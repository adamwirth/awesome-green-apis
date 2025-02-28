import { ScaleOrdinal } from 'd3-scale';
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
import { getMetricColor, CHART_COLORS } from '@/app/utils/constants/colors';
import { aggregateDataByYear } from '@/app/utils/transformers';

import { BaseChart, BaseChartProps } from './baseChart';

type AreaChartProps = BaseChartProps & { YAxisScale?: ScaleOrdinal<number, string>; };

class AreaChartPlot extends BaseChart<AreaChartProps> {
  // todo keep this in sync with the first page that loads in some better way that'll compile in
  static DEFAULT_AREA_CHART_POINTS = 9;

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
      <ResponsiveContainer width="100%" height={270}>
        <AreaChart data={chartData}>
          <XAxis
            dataKey={String(chartDataRef.xAxis)}
          // label={{ value: chartDataRef.xAxis, position: "insideBottom" }}
          />
          <YAxis
            scale={options?.YAxisScale?.scale || 'auto'}
            tickFormatter={options?.YAxisScale?.tickFormatter}
          >
            <Label
              value="Values"
              angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />

          {chartDataRef.yAxis.map((metric: string | number | symbol, index: number) => (
            <Area
              key={String(metric)}
              type="monotone"
              dataKey={String(metric)}
              name={String(metric)}
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
    const defaultPoints = Array(AreaChartPlot.DEFAULT_AREA_CHART_POINTS).fill(0).map((_, i) => i + 1);

    return defaultPoints.map(point => {
      const dataPoint: { [key: string]: string | number } = {
        [chartDataRef.xAxis]: `Point ${point}`
      };

      chartDataRef.yAxis.forEach(metric => {
        dataPoint[String(metric)] = 0;
      });

      return dataPoint;
    });
  }
}
export default AreaChartPlot;