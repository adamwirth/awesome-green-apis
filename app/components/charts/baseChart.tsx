import * as React from 'react';

import { Heading } from '@aws-amplify/ui-react';

function SimpleErrorBoundary({ children }: { children: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error(error);
    return (
      <div className="--amplify-colors-font-error">
        <p>An error occurred while rendering the chart.</p>
        {error instanceof Error && <pre>{error.message}</pre>}
      </div>
    );
  }
}

export interface BaseChartOptions {
  height?: string;
  width?: string;
  title: string;
}

export interface BaseChartProps {
  chartDataRef: {
    data: () => Promise<{ default: any[] }>;
  };
  options: BaseChartOptions;
}

export interface BaseChartState {
  processedData: any | null,
  isLoading: boolean,
  error: Error | null,
};

export class BaseChart<P extends BaseChartProps> extends React.Component<P> {
  static defaultProps = {
    options: { title: "" } as BaseChartOptions
  };

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
    const { options } = this.props;
    const { processedData, isLoading, error } = this.state;

    const renderContent = () => {
      if (isLoading) return <div>Loading chart...</div>;
      if (error) return <div>Error: {error.message}</div>;
      if (!processedData) return <div>No data available to render the chart.</div>;

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
}