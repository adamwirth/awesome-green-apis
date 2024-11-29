// components/visualizations/CScaleGrid.tsx
import { Card, Grid, View, useTheme } from '@aws-amplify/ui-react';
import dynamic from 'next/dynamic';
import Loading from '../loading';
import { carbon, explanation, projects } from "@/app/utils/data/cscale/data";
import TextPlot from '../text';

const StackedBarChartPlot = dynamic(
  () => import('../charts/stackedBarChartPlot'),  {
    ssr: false,
    loading: () => <Loading />,
  }
);
const PieChartPlot = dynamic(
  () => import('../charts/pieChartPlot'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);
const AreaChartPlot = dynamic(
  () => import('../charts/areaChartPlot'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const CScaleGrid = () => {
  const { tokens } = useTheme();
  
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        medium: '5fr 4fr'
      }}
      templateRows={{
        base: 'repeat(4, auto)',
        medium: 'repeat(3, 350px)'
      }}
      gap={tokens.space.small}
      marginBottom={tokens.space.medium}
    >
      {/* Left Column */}
      <View
        columnStart={1}
        columnEnd={2}
        rowStart={1}
        rowEnd={2}
      >
        <Card
          height='100%'
          columnStart={1}
          columnEnd={{ base: 1, medium: 2 }}
          rowStart={1}
          rowEnd={{ base: 2, medium: 4 }}
          style={{
            gridRow: '1 / span 1'
          }}
          borderRadius={tokens.radii.medium}
        >
          <StackedBarChartPlot
            chartDataRef={carbon}
            options={{
              title: 'Carbon Data (kgCO2e/m2)',
            }}
          />
        </Card>
      </View>
      {/* Right Column - Text Plot */}
      <View
        height="100%"
        columnStart={{ base: 1, medium: 2 }}
        columnEnd={{ base: 2, medium: 3 }}
        rowStart={1}
        rowEnd={4}
        style={{
          gridRow: '1 / span 3',
        }}
      >
        <Card
          height="100%"
          borderRadius={tokens.radii.medium}
        >
          <TextPlot
            data={explanation}
            options={{ height: "100%" }}
          />
        </Card>
      </View>
      {/* Pie Charts */}
      <View
        columnStart={1}
        columnEnd={2}
        rowStart={2}
        rowEnd={3}
      >
        <Grid
          templateColumns={'1fr 1fr'}
          gap={tokens.space.small}
          height="100%"
        >
          <Card
            height="100%"
            borderRadius={tokens.radii.medium}
          >
            <PieChartPlot
              chartDataRef={projects}
              options={{
                legend: true,
                title: 'Primary Structural System Stats',
                sumKey: 'primary_structural_system'
              }}
            />
          </Card>
          <Card
            height="100%"
            borderRadius={tokens.radii.medium}
          >
            <PieChartPlot
              chartDataRef={projects}
              options={{
                title: 'Primary Use Stats',
                sumKey: 'primary_use'
              }}
            />
          </Card>
        </Grid>
      </View>
      {/* Area Chart */}
      <View
        columnStart={1}
        columnEnd={2}
        rowStart={3}
        rowEnd={4}
      >
        <Card
          height="100%"
          borderRadius={tokens.radii.medium}
        >
          <AreaChartPlot
            chartDataRef={projects}
            options={{
              title: 'Projects: EUI-MEP Averages',
            }}
          />
        </Card>
      </View>
    </Grid>
  );
};


export default CScaleGrid;