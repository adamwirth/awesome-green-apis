"use client";

import { Grid, View, useTheme, Card } from '@aws-amplify/ui-react';

import { carbon, explanation, projects } from "@/app/utils/data/cscale/data";

import { StackedBarChartPlot } from "./charts/stackedBarChartPlot";
import PieChartPlot from "./charts/pieChartPlot";
import TextPlot from "./text";

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
          minHeight={{ "medium": "350px" }}
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
          minHeight={{ "medium": "350px" }}
          borderRadius={tokens.radii.medium}
          columnSpan={{ base: 1, medium: 1 }}
          rowSpan={{ base: 1, medium: 3 }}
        >
          <TextPlot data={explanation} options={{ height: "100%" }} />
        </Card>


        {/* Pie charts container */}
        <Grid
          columnSpan={{ base: 1, medium: 1 }}
          templateColumns={'1fr 1fr'}
          gap={tokens.space.small}
        >
          <Card
            height="350px"
            minHeight={{ "medium": "350px" }}
            borderRadius={tokens.radii.medium}
          >
            <PieChartPlot chartDataRef={projects} sumKey={'primary_structural_system'} options={({ legend: true })} />
          </Card>
          <Card
            height="350px"
            minHeight={{ "medium": "350px" }}
            borderRadius={tokens.radii.medium}
          >
            <PieChartPlot chartDataRef={projects} sumKey={'primary_use'} />
          </Card>
        </Grid>

        <Card
          height="250px"
          minHeight={{ "medium": "250px" }}
          borderRadius={tokens.radii.medium}
        >
          <StackedBarChartPlot chartDataRef={projects} />
        </Card>
      </Grid>
    </View>
  );
};

export default Charts;