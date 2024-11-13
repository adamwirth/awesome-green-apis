import { Project, ChartData } from "../../../types/cscale/project";

const jsonData = require("./cscale_testset_sorted.json") as Project[];

export const projects: ChartData = {
  xAxis: 'year_completion',
  yAxis: ['benchmark_EUI', 'EUI_MEP_threshold',
    //  'window_to_wall_ratio'
    ],
  data: jsonData
};
