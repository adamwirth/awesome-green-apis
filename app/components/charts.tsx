"use client";

import { Card, Grid, View, useTheme } from '@aws-amplify/ui-react';
import dynamic from 'next/dynamic';

import Loading from './loading';

import { carbon, explanation, projects } from "@/app/utils/data/cscale/data";

import TextPlot from './text';
// TODO not sure if I should make this one dynamic or if that is overkill, or if it can be overkill...
// const TextPlot = dynamic(
//   () => import('./text'),
//   {
//     ssr: false,
//     loading: () => <Loading />,
//   }
// )

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
          columnSpan={{ base: 1, medium: 1 }}
        >
          <StackedBarChartPlot
            chartDataRef={carbon}
            options={{
              title: 'Carbon Data',
              height: '350px',
              margin: { top: 20, right: 40, left: 10, bottom: 20 }
            }}
          />
        </Card>
        <Card
          height={{ "base": "350px", "medium": "100%" }}
          borderRadius={tokens.radii.medium}
          columnSpan={{ base: 1, medium: 1 }}
          rowSpan={{ base: 1, medium: 3 }}
        >
          <TextPlot
            data={explanation}
            options={{ height: "100%" }}
          />
        </Card>


        {/* Pie charts container */}
        <Grid
          columnSpan={{ base: 1, medium: 1 }}
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
                  height: '100%',
                  margin: { top: 20, right: 40, left: 10, bottom: 20 }
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
                height: '100%',
                margin: { top: 20, right: 40, left: 10, bottom: 20 }
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
              title: 'Projects',
              height: '100%',
              margin: { top: 20, right: 40, left: 10, bottom: 0 }
            }} />
        </Card>
      </Grid>
    </View>
  );
};

export default Charts;