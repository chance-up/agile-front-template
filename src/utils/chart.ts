import * as echarts from 'echarts';

export const drawChart = (id: string, option: echarts.EChartsOption) => {
  const dom = document.getElementById(id) as HTMLDivElement;
  const myChart = echarts.init(dom);
  myChart.setOption(option);
};
