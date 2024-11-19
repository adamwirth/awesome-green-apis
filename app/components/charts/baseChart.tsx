import { ChartData } from '@/app/types/common';
import React from 'react';

function SimpleErrorBoundary({ children }: { children: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    return (
      <div className="p-4 text-red-500">
        <p>An error occurred while rendering the chart.</p>
        {error instanceof Error && <pre>{error.message}</pre>}
      </div>
    );
  }
}

export interface ChartOptions {
  height?: string;
  width?: string;
  margin?: any;
  [key: string]: any;
 }

export interface BaseChartProps {
  chartDataRef: {
    data: () => Promise<{default: any[]}>;
    [key: string]: any;
  };
  options?: ChartOptions;
 }

export interface BaseChartState {
  processedData: any | null,
  isLoading: boolean,
  error: Error | null,
};

export class BaseChart<P extends BaseChartProps> extends React.Component<P> {
  state: BaseChartState = {
    processedData: null,
    isLoading: true,
    error: null,
  };

  async loadData() {
    try {
      const { chartDataRef } = this.props;
      const importedData = await chartDataRef.data();
      this.setState({
        processedData: { ...chartDataRef, data: importedData.default },
        isLoading: false
      });
    } catch (error) {
      this.setState({ error: error as Error, isLoading: false });
    }
  }
  
  componentDidMount() {
    this.loadData();
  }

  renderChart(): React.ReactNode {
    throw new Error('renderChart must be implemented');
  }

  render() {
    const { options = {} } = this.props;
    const { processedData, isLoading, error } = this.state;

    const renderContent = () => {
      if (isLoading) return <div>Loading chart...</div>;
      if (error) return <div>Error: {error.message}</div>;
      if (!processedData) return <div>No data available</div>;

      return (
        <div
          style={{
            height: options.height || '100%',
            width: options.width || '100%'
          }}
        >
          {this.renderChart()}
        </div>
      );
    };

    return <SimpleErrorBoundary>{renderContent()}</SimpleErrorBoundary>;
  }
}