import { carbon, explanation, projects } from "@/app/utils/data/cscale/data";
import { Grid } from '@aws-amplify/ui-react';
import { GridComponents } from './types';

import AreaChartPlot from '../charts/areaChartPlot';
import PieChartPlot from '../charts/pieChartPlot';
import BarChartPlot from '../charts/barChartPlot';
import TextPlot from '../text';

const CScaleGrid = (): GridComponents => {
  const mainChart = (
    <BarChartPlot
      key={'cscale-main-chart'}
      chartDataRef={carbon}
      stack={true}
      options={{
        title: 'Carbon Data (kgCO2e/m2)',
      }}
    />
  );

  const textPlot = (
    <TextPlot
      key={'cscale-text-plot'}
      data={explanation}
      options={{ height: "100%" }}
    />
  );

  const secondaryChart = (
    <Grid
      key={'cscale-secondary-chart'}
      templateColumns={'1fr 1fr'}
      gap='0.5rem'
      height="100%"
    >
      <PieChartPlot
        chartDataRef={projects}
        options={{
          legend: true,
          title: 'Primary Structural System Stats',
          sumKey: 'primary_structural_system'
        }}
      />
      <PieChartPlot
        chartDataRef={projects}
        options={{
          title: 'Primary Use Stats',
          sumKey: 'primary_use'
        }}
      />
    </Grid>
  );

  const tertiaryChart = (
    <AreaChartPlot
      key={'cscale-tertiary-chart'}
      chartDataRef={projects}
      options={{
        title: 'Projects: EUI-MEP Averages',
      }}
    />
  );

  return [ mainChart, textPlot, secondaryChart, tertiaryChart ];
};

export default CScaleGrid;