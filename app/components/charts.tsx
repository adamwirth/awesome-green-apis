"use client";

import { Grid, View, useTheme, Card } from '@aws-amplify/ui-react';

import { carbon, explanation, projects } from "../utils/data/cscale/data";

import StackedBarChartPlot from "./charts/stackedBarChartPlot";
import PieChartPlot from "./charts/pieChartPlot";
import TextPlot from './text';

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
          
        columnSpan={{ base: 1, medium: 1 }}
          borderRadius={tokens.radii.medium}
        >
          <StackedBarChartPlot chartData={carbon} />

        </Card>
        <Card
          borderRadius={tokens.radii.medium}
          height={{'base': "350px", "medium": "100%"}}
            
          columnSpan={{ base: 1, medium: 1 }}
          rowSpan={{ base: 1, medium: 3 }}
        >
          <TextPlot data={explanation} options={{ height: "100%" }} />
        </Card>


      {/* Pie charts container */}
      <Grid
        columnSpan={{ base: 1, medium: 1 }}
        templateColumns={'1fr 1fr'}
        gap={tokens.space.small }
      >
          <Card
            height="350px"
            borderRadius={tokens.radii.medium}
          >
            <PieChartPlot chartData={projects} sumKey={'primary_structural_system'} options={({ legend: true })} />
          </Card>
          <Card
            height="350px"
            borderRadius={tokens.radii.medium}
          >
            <PieChartPlot chartData={projects} sumKey={'primary_use'} />
          </Card>
        </Grid>
        
        <Card
          height="250px"
          borderRadius={tokens.radii.medium}
        >
          <StackedBarChartPlot chartData={projects} />
        </Card>

        {/* <Grid
          columnSpan={{ base: 1, medium: 1 }}
          templateColumns={'2fr 2fr'}
          gap={tokens.space.small }
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
         */}
      </Grid>
    </View>
  );
};

export default Charts;