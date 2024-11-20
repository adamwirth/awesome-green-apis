"use client";

import { Card, Grid, View, useTheme } from '@aws-amplify/ui-react';
import dynamic from 'next/dynamic';

import Loading from './loading';

import { carbon, explanation, projects } from "@/app/utils/data/cscale/data";

// TODO not sure if I should make this one dynamic or if that is overkill, or if it can be overkill...
import TextPlot from './text';

const StackedBarChartPlot = dynamic(
  () => import('./charts/stackedBarChartPlot'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const PieChartPlot = dynamic(
  () => import('./charts/pieChartPlot'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);


const AreaChartPlot = dynamic(
  () => import('./charts/areaChartPlot'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);


const Charts = () => {
  const { tokens } = useTheme();

  return (
    <View padding={tokens.space.medium}>
      <Grid
        templateColumns={{
          base: '1fr',
          medium: '4fr 3fr'
        }}
        templateRows={{
          base: 'repeat(4, auto)',
          medium: '350px 350px'
        }}
        gap={tokens.space.small}
        marginBottom={tokens.space.medium}
      >
        <Card
          height="350px"
          borderRadius={tokens.radii.medium}
          columnSpan={1}
        >
          <StackedBarChartPlot
            chartDataRef={carbon}
            options={{
              title: 'Carbon Data',
            }}
          />
        </Card>
        <Card
          height={{ "base": "350px", "medium": "100%" }}
          borderRadius={tokens.radii.medium}
          columnSpan={1}
          rowSpan={{ base: 1, medium: 3 }}
        >
          <TextPlot
            data={explanation}
            options={{ height: "100%" }}
          />
        </Card>


        {/* Pie charts container */}
        <Grid
          columnSpan={1}
          templateColumns={'1fr 1fr'}
          gap={tokens.space.small}
        >
          <Card
            height="350px"
            borderRadius={tokens.radii.medium}
          >
            <PieChartPlot
              chartDataRef={projects}
              sumKey={'primary_structural_system'}
              options={(
                {
                  legend: true,
                  title: 'Primary Structural System Stats',
                })} />
          </Card>
          <Card
            height="350px"
            borderRadius={tokens.radii.medium}
          >
            <PieChartPlot
              chartDataRef={projects}
              sumKey={'primary_use'}

              options={{
                title: 'Primary Use Stats',
              }}
            />
          </Card>
        </Grid>

        <Card
          height="250px"
          borderRadius={tokens.radii.medium}
        >
          <AreaChartPlot
            chartDataRef={projects}
            options={{
              title: 'Projects: EUI-MEP Averages',
            }} />
        </Card>
      </Grid>
    </View>
  );
};

export default Charts;