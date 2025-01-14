import { useMemo } from 'react';

import { VisualizationType } from './header';
import GridLayout from './grids/layout';

import CScaleGrid from './grids/cscale';
import FirstStreetGrid from './grids/firststreet';

interface ChartsProps {
  activeView: VisualizationType;
}

const Charts = ({ activeView = 'cscale' }: ChartsProps) => {
  const GridComponents = activeView === 'firststreet' ? FirstStreetGrid : CScaleGrid;
  // todo idk about the method calling stuff, im being cute
  const children = useMemo(() => GridComponents(), [GridComponents]);

  return (
    <GridLayout children={children} />
  );
};

export default Charts;
