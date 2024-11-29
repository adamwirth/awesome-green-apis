export const LEFT_COLOR = "#FFCF96"; // rosy
export const RIGHT_COLOR = "#B5DEFF"; // soft blue
const PIE_COLORS = [
        "#8884d8",
        "#FA8072",
        "#AF69EE",
        "#3DED97",
        "#3AC7EB",
        "#F9A603",
    ];
export const GET_PIE_COLOR = (index: number) => PIE_COLORS[index % PIE_COLORS.length];

export const CHART_COLORS = {
    // Primary colors
    PRIMARY: '#82ca9d',
    SECONDARY: '#8884d8',
    TERTIARY: '#ffc658',
    
    // Semantic colors for different metrics
    METRIC_COLORS: [
      '#82ca9d', // green
      '#8884d8', // purple
      '#ffc658', // yellow
      '#ff8042', // orange
      '#0088fe', // blue
    ] as const,
    
    // Opacity levels
    OPACITY: {
      FILL: 0.6,
      STROKE: 1.0
    }
  } as const;
  
  export const getMetricColor = (index: number): string => {
    return CHART_COLORS.METRIC_COLORS[index % CHART_COLORS.METRIC_COLORS.length];
  };