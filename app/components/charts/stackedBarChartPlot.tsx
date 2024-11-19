import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Label, 
  Legend 
} from 'recharts';
import { LEFT_COLOR, RIGHT_COLOR } from '@/app/utils/constants';
import { aggregateDataByYear } from '@/app/utils/transformers';

import { BaseChart, BaseChartProps, ChartOptions } from './baseChart';
import { ChartData } from '@/app/types/common';

interface StackedBarChartProps extends BaseChartProps {
  chartDataRef: {
    data: () => Promise<{default: any[]}>;
    xAxis: string;
    yAxis: string[];
  };
  options?: ChartOptions & {
    margin?: { 
      top?: number;
      right?: number;
      left?: number;
      bottom?: number;
    };
  };
 }

/**
 * Currently takes in a pair of yAxis-es to render with.
 * @todo trendline(s) automatically
 * @todo check for supplied statistics data (before calculating myself)
 */
export class StackedBarChart extends BaseChart<StackedBarChartProps> {
  
  renderChart() {
    const { processedData } = this.state;
    const { options = {} } = this.props;

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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={aggregatedData}
          margin={options?.margin || { top: 10, right: 30, left: 0, bottom: 15 }}
        >
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
          <XAxis
            dataKey={processedData.xAxis}
            domain={['auto', 'auto']}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke={LEFT_COLOR}
          >
            <Label 
              value={"Averages"} 
              offset={10} 
              angle={-90} 
              position="insideLeft" 
            />
          </YAxis>
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke={RIGHT_COLOR} 
          />
          <Tooltip />
          <Legend />
          
          {processedData.yAxis.map((key: string, index: number) => (
            <Bar
              key={key}
              yAxisId={index % 2 === 0 ? "left" : "right"}
              dataKey={`average_${key}`}
              stackId="aaa"
              fill={index % 2 === 0 ? LEFT_COLOR : RIGHT_COLOR}
              name={`Average ${key}`}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export const StackedBarChartPlot = (props: {chartDataRef: ChartData, options?: any}) => {
  return <StackedBarChart {...props} />;
};