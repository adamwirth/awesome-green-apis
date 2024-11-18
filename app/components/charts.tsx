'use client'

import { Grid, View, Text, useTheme, Card } from '@aws-amplify/ui-react';

import { explanation, projects } from "../utils/data/cscale/data";

import StackedBarChartPlot from "./charts/stackedBarChartPlot";
import BarChartPlot from "./charts/barChartPlot";
import PieChartPlot from "./charts/pieChartPlot";
import TextPlot from './text';

const Charts = () => {
  const { tokens } = useTheme();

  return (
    <View padding={tokens.space.medium}>
      {/* First section - Two equal columns */}
      <Grid
        templateColumns="1fr 1fr"
        gap={tokens.space.small}
        marginBottom={tokens.space.medium}
      >
        <Card
          height="300px"
          borderRadius={tokens.radii.medium}
        >
          <BarChartPlot />
          
        </Card>
        <Card
          height="300px"
          borderRadius={tokens.radii.medium} >
          <TextPlot data={explanation} />
        </Card>
      </Grid>

      {/* Second section - Three unequal columns */}
      <Grid
        templateColumns="1fr 1fr 2fr"
        gap={tokens.space.small}
        marginBottom={tokens.space.medium}
      >
        <Card
          height="250px"
          borderRadius={tokens.radii.medium}
        >
          <PieChartPlot chartData={projects} sumKey={'primary_structural_system'} options={({legend: true})} />
        </Card>
        <Card
          height="250px"
          borderRadius={tokens.radii.medium}
        >
          {/* <LineChartPlot /> */}
          <PieChartPlot chartData={projects} sumKey={'primary_use'} />
        </Card>
        <Card
          height="250px"
          borderRadius={tokens.radii.medium}
        >
          {/* <RadarChartPlot />*/ }
          <StackedBarChartPlot chartData={projects} />
        </Card>
      </Grid>

      {/* Last section - Stats cards */}
      <Grid
        templateColumns="1fr 1fr 1fr 1fr"
        gap={tokens.space.small}
        marginBottom={tokens.space.medium}
      >
        {[
          { title: 'Total returns', value: '$30,000', change: '+34.5%' },
          { title: 'Total sales', value: '$30,000', change: '+34.5%' },
          { title: 'Total subscriptions', value: '$30,000', change: '+34.5%' },
          { title: 'Total returns', value: '$30,000', change: '+34.5%' }
        ].map((stat, index) => (
          <Card
            key={index}
            padding={tokens.space.medium}
            borderRadius={tokens.radii.medium}
          >
            <Text
              variation="primary"
              fontWeight={tokens.fontWeights.bold}
            >
              {stat.title}
            </Text>
            <Text
              padding={`${tokens.space.medium} 0`}
              fontWeight={tokens.fontWeights.bold}
            >
              {stat.value}
            </Text>
            <Text color={tokens.colors.font.success}>
              {stat.change}
            </Text>
          </Card>
        ))}
      </Grid>
    </View>
  );
};

export default Charts;