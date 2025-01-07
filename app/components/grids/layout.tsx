import React from 'react';
import { Card, Grid, View, useTheme } from '@aws-amplify/ui-react';
import { GridComponents } from './types';


const GridLayout = ({ children }: { children: GridComponents }) => {
  const [ mainChart, textPlot, secondaryChart, tertiaryChart ] = children;
  const { tokens } = useTheme();

  // TODO extract these and change them per Grid
  const gridComponents = [
    { component: mainChart, gridProps: { columnStart: 1, columnEnd: 2, rowStart: 1, rowEnd: 2 } },
    { component: textPlot, gridProps: { 
        height: "100%",
        columnStart: { base: 1 },
        columnEnd: { base: 2, medium: 3 },
        rowStart: 1,
        rowEnd: 5
    }},
    { component: secondaryChart, gridProps: { columnStart: 1, columnEnd: 2, rowStart: 2, rowEnd: 3 } },
    { component: tertiaryChart, gridProps: { columnStart: 1, columnEnd: 2, rowStart: 3, rowEnd: 4 } }
  ];

  return (
    <View padding={tokens.space.medium}>
      <Grid
        templateColumns={{ base: '5fr 4fr' }}
        templateRows={{
          base: 'repeat(3, auto)',
          medium: 'repeat(3, 350px)'
        }}
        gap={tokens.space.small}
        marginBottom={tokens.space.medium}
      >
        {gridComponents.map((item, index: number) => (
          <View
            // Need a key in this wrapping element, but didn't want to make a truly new one
            key={((item.component as any).key as string) + index}
            {...item.gridProps}
          >
            <Card height="100%" borderRadius={tokens.radii.medium}>
              {item.component}
            </Card>
          </View>
        ))}
      </Grid>
    </View>
  );
};

export default GridLayout;