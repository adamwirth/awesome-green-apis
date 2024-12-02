import { BaseChart, BaseChartProps } from './baseChart';
import {
  Bar,
  BarChart,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { getMetricColor, CHART_COLORS } from '@/app/utils/constants';
import { aggregateDataByYear } from '@/app/utils/transformers';

// todo avoid empty supertype like this
interface StackedBarChartProps extends BaseChartProps{};

class StackedBarChart extends BaseChart<StackedBarChartProps> {
  
  // todo keep this in sync with the first page that loads in some better way that'll compile in
  static DEFAULT_STACKED_BAR_CHART_POINTS = 14;
  
  renderChart() {
    const { data, isFinishedLoading } = this.state;
    const { chartDataRef } = this.props;

    // Ensure we're working with an array
    const chartData = this.isDataReady()
      ? data!
      : this.createEmptyDataPoints();
      
    // Aggregate data by year
    // todo pass by reference or whatever the term is to not make somethin new
    // todo but also just remove these
    const processedData = aggregateDataByYear(
      chartData,
      chartDataRef
    );

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={processedData}>
          <XAxis
            dataKey={chartDataRef.xAxis}
            // label={{ value: chartDataRef.xAxis, position: 'insideBottom' }}
          />
          <YAxis>
            <Label value="Values" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          
          {chartDataRef.yAxis.map((metric: string, index: number) => (
            <Bar
              key={metric}
              dataKey={metric}
              name={metric}
              stackId="stack"
              fill={getMetricColor(index)}
              fillOpacity={CHART_COLORS.OPACITY.FILL}
              animationDuration={isFinishedLoading ? 1500 : 0}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  private createEmptyDataPoints(): Array<{ [key: string]: string | number }> {
    // todo generalize these mthods and have them become passed in as defaults per company package
    const { chartDataRef } = this.props;
    const defaultPoints = Array(StackedBarChart.DEFAULT_STACKED_BAR_CHART_POINTS).fill(0).map((_, i) => i + 1);
    
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

export default StackedBarChart;
