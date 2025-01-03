"use client";

import { View, useTheme } from '@aws-amplify/ui-react';
import dynamic from 'next/dynamic';

import Loading from './loading';
import { VisualizationType } from './header';

const CScaleGrid = dynamic(
  () => import('./grids/cscale'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

// todo dynamic load triggered only after the default one has loaded
const FirstStreetGrid = dynamic(
  () => import('./grids/firststreet'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

interface ChartsProps {
  activeView: VisualizationType;
}

const Charts = ({ activeView = 'cscale' }: ChartsProps) => {
  const { tokens } = useTheme();
  return (
    <View padding={tokens.space.medium}>
      {activeView === 'firststreet' && <FirstStreetGrid />}
      {activeView === 'cscale' && <CScaleGrid />}
      {/* Add other ones as I go */}
      {/* {activeView === 'other' && <OtherGrid />} */}
    </View>
  );
};

export default Charts;
