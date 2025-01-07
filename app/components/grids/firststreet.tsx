import { airFactor, burnProbability, explanation, floodRisk } from "@/app/utils/data/firststreet/data";
import TextPlot from '../text';
import { GridComponents } from './types';

import AreaChartPlot from '../charts/areaChartPlot';
import StackedBarChartPlot from '../charts/stackedBarChartPlot';

const FirstStreetGrid = (): GridComponents => {
  const mainChart = (
    <StackedBarChartPlot
      key={'firststreet-main-chart'}
      chartDataRef={burnProbability}
      options={{
        title: 'Burn Probability',
      }}
    />
  );
  
  const textPlot = (
    <TextPlot
      key={'firststreet-text-plot'}
      data={explanation}
      options={{ height: "100%" }}
    />
  );
  
  const secondaryChart = (
    <AreaChartPlot
      key={'firststreet-secondary-chart'}
      chartDataRef={airFactor}
      options={{
        title: 'Air Factor',
        YAxisScale: {
          scale: 'linear',
          tickFormatter: (value: number): string => {
            const x: Record<number, string> = {
              1: "Minimal", 2: "Minor",
              3: "Moderate", 4: "Moderate",
              5: "Major", 6: "Major",
              7: "Severe", 8: "Severe",
              9: "Extreme", 10: "Extreme"
            };
            return x[value] || `${value}`;
          }
        }
      }}
    />
  );
  
  const tertiaryChart = (
    <AreaChartPlot
      key={'firststreet-tertiary-chart'}
      chartDataRef={floodRisk}
      options={{
        title: 'Flood Risk',
      }}
    />
  );

  return [ mainChart, textPlot, secondaryChart, tertiaryChart ];
};

export default FirstStreetGrid;