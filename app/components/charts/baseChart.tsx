import * as React from 'react';
import { ScaleType } from 'recharts/types/util/types';
import { Heading, Text } from '@aws-amplify/ui-react';

import { ChartData, ChartDescription, ExtraReactProps } from '@/app/types/common';

export interface BaseChartOptions {
    title: string;
    chartDescription?: ChartDescription;
    height?: string | number;
    width?: string | number;
    colors?: string[]; // todo use
    YAxisScale?: {
      scale: ScaleType;
      tickFormatter?: (value: number) => string;
    };
}

export interface BaseChartProps extends ExtraReactProps {
  chartDataRef: ChartData;
  options: BaseChartOptions;
}

export interface BaseChartState {
  data: any[] | null; // todo some crazy generic typing for this one too
  isFinishedLoading: boolean;
  error: Error | null;
}

export abstract class BaseChart<P extends BaseChartProps> extends React.Component<P, BaseChartState> {
  state: BaseChartState = {
    data: null,
    isFinishedLoading: false,
    error: null
  };

  async componentDidMount() {
    await this.loadData();
  }
  
  protected async loadData() {
    try {
      const { chartDataRef } = this.props;
      const importedData = (await chartDataRef.data()).default;
      this.setState({
        data: importedData,
        isFinishedLoading: true
      });
    } catch (error) {
      this.setState({ 
        error: error as Error, 
        isFinishedLoading: true
      });
    }
  }

  abstract renderChart(): React.ReactNode;

  render() {
    // todo extract title/desc to the same, higher place
    const { options, chartDataRef } = this.props;
    const { error } = this.state;
    const description = chartDataRef?.chartDescription;

    // Defaults to 100%s in the css, don't repeat it here if unseen
    const containerStyle = {
      height: options?.height || undefined,
      width: options?.width || undefined,
    };

    return (
      <div style={containerStyle} className="chart-container">
        {this.customTitle(options)}
        {this.customDescription(description)}
        {error ? (
          <div className="error-container">Error: {error.message}</div>
        ) : (
          this.renderChart()
        )}
      </div>
    );
  }
  
  /**
   * Render a heading within the chart.
   * @param props recharts props, looking for "title"
   * @returns text element to render
   */
  customTitle(props: { title?: string }): React.ReactNode {
    const { title } = props;

    if (!title) return null;
    return <Heading>{title}</Heading>;
  };
  
  
  /**
   * Render a description within the chart.
   * @param props recharts props
   * @returns text element to render
   */
  customDescription(description?: ChartDescription): React.ReactNode {
    if (!description) return null;
    return <Text>{description}</Text>;
  }
  
  isDataReady(): this is BaseChart<P> & { state: { data: NonNullable<BaseChartState['data']> } } {
    return this.state.isFinishedLoading && Array.isArray(this.state.data);
  }

}