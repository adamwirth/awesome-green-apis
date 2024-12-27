import { Card, Grid, View, useTheme } from '@aws-amplify/ui-react';
import dynamic from 'next/dynamic';
import Loading from '../loading';
import { burnProbability, airFactor, floodRisk, explanation } from "@/app/utils/data/firststreet/data";
import TextPlot from '../text';

const StackedBarChartPlot = dynamic(
  () => import('../charts/stackedBarChartPlot'), {
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

const FirstStreetGrid = () => {
  const { tokens } = useTheme();

  return (
    <Grid
      templateColumns={{
        base: '5fr 4fr'
      }}
      templateRows={{
        base: 'repeat(3, auto)',
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
          columnEnd={{ base: 1, medium: 2 }}
          rowEnd={{ base: 2, medium: 4 }}
          borderRadius={tokens.radii.medium}
        >
          <StackedBarChartPlot
            chartDataRef={burnProbability}
            options={{
              title: 'Burn Probability',
            }}
          />
        </Card>
      </View>
      {/* Right Column - Text Plot */}
      <View
        height="100%"
        columnStart={{ base: 1 }}
        columnEnd={{ base: 2, medium: 3 }}
        rowStart={1}
        rowEnd={5} // todo possibly shrink the code text so it goes down to a max of 4
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
        <Card
          height="100%"
          borderRadius={tokens.radii.medium}
        >
          <AreaChartPlot
            chartDataRef={airFactor}
            options={{
              title: 'Air Factor',
              YAxisScale: {
                scale: 'linear',
                // todo extract
                tickFormatter: (value: number): string => {
                  const x: Record<number, string> = {
                    1: "Minimal",
                    2: "Minor",
                    3: "Moderate",
                    4: "Moderate",
                    5: "Major",
                    6: "Major",
                    7: "Severe",
                    8: "Severe",
                    9: "Extreme",
                    10: "Extreme"
                  };
                  return x[value] || `${value}`;
                }
              }
            }
            }
          />
        </Card>
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
            chartDataRef={floodRisk}
            options={{
              title: 'Flood Risk',
            }}
          />
        </Card>
      </View>
    </Grid>
  );
};


export default FirstStreetGrid;