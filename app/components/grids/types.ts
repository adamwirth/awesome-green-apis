export type GridComponents = [
  mainChart: React.ReactNode,
  textPlot: React.ReactNode,
  secondaryChart: React.ReactNode,
  tertiaryChart: React.ReactNode
];

// todo add GridOptions for column and row grid edits
// todo more specific typings than React.ReactNode like this
// export interface GridComponents {
//   mainChart: BaseChart<any>;
//   textPlot: typeof TextPlot;
//   secondaryChart: BaseChart<any>;
//   tertiaryChart:  BaseChart<any>;
// }
