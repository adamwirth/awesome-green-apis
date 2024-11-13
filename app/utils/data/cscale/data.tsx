import { Project, ChartData } from "../../../types/cscale/project";

const jsonData = require("./cscale_testset_sorted.json") as Project[];

export const projects: ChartData = {
  xAxis: 'year_completion',
  yAxis: 'benchmark_EUI',
  data: jsonData
};
