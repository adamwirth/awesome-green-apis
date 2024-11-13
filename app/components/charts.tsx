'use client'

import { Grid, View, Text, useTheme } from '@aws-amplify/ui-react';

import { projects } from "../utils/data/cscale/data";

import StackedBarChartPlot from "./charts/stackedBarChartPlot";
import BarChartPlot from "./charts/barChartPlot";
import PieChartPlot from "./charts/pieChartPlot";
import LineChartPlot from "./charts/lineChartPlot";
import RadarChartPlot from './charts/radarChartPlot';

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
        <View
          backgroundColor={tokens.colors.neutral[100]}
          height="300px"
          borderRadius={tokens.radii.medium}
        >
          <StackedBarChartPlot chartData={projects} />
        </View>
        <View
          backgroundColor={tokens.colors.neutral[100]}
          height="300px"
          borderRadius={tokens.radii.medium}>
          <BarChartPlot />
        </View>
      </Grid>

      {/* Second section - Three equal columns */}
      <Grid
        templateColumns="1fr 1fr 1fr"
        gap={tokens.space.small}
        marginBottom={tokens.space.medium}
      >
        <View
          backgroundColor={tokens.colors.neutral[90]}
          height="250px"
          borderRadius={tokens.radii.medium}
        >
          <PieChartPlot chartData={projects} sumKey={'primary_structural_system'} options={({legend: true})} />
        </View>
        <View
          backgroundColor={tokens.colors.neutral[90]}
          height="250px"
          borderRadius={tokens.radii.medium}
        >
          {/* <LineChartPlot /> */}
          <PieChartPlot chartData={projects} sumKey={'primary_use'} />
        </View>
        <View
          backgroundColor={tokens.colors.neutral[90]}
          height="250px"
          borderRadius={tokens.radii.medium}
        >
          <RadarChartPlot />
        </View>
      </Grid>

      {/* Third section - Stats cards */}
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
          <View
            key={index}
            backgroundColor={tokens.colors.neutral[80]}
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
            <Text color={tokens.colors.green[40]}>
              {stat.change}
            </Text>
          </View>
        ))}
      </Grid>
    </View>
  );
};

export default Charts;