import * as React from 'react';
import { Heading } from '@aws-amplify/ui-react';

import { ChartData } from '@/app/types/common';

export interface BaseChartOptions {
    title: string;
    height?: string | number;
    width?: string | number;
    colors?: string[]; // todo use
}

export interface BaseChartProps {
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
    const { options } = this.props;
    const { error } = this.state;

    const containerStyle = {
      height: options?.height || '100%',
      width: options?.width || '100%',
    };

    return (
      <div style={containerStyle}>
                {this.customTitle(options)}
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
  
  isDataReady(): this is BaseChart<P> & { state: { data: NonNullable<BaseChartState['data']> } } {
    return this.state.isFinishedLoading && Array.isArray(this.state.data);
  }

}