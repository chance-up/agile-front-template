<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">Error stats (24Hour)</h3>
    <div class="chart-group error-stats">
      <div id="errorStatsPie" class="error-pie" data-echart-responsive="true">실패율</div>
      <div id="errorStateBar" class="error-chart" data-echart-responsive="true">Critical/Major/Minor</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { drawChart } from '@/utils/chart';
import * as echarts from 'echarts';
@Component
export default class ErrorStats extends Vue {
  mounted() {
    drawChart('errorStatsPie', this.errorStatsOption);
    drawChart('errorStateBar', this.errorChartOption);
  }
  errorStatsOption: echarts.EChartsOption = {
    title: {
      text: '실패율',
      left: 'center',
      top: 'bottom',
      textStyle: {
        color: 'black',
        fontSize: '13',
        fontWeight: 400,
      },
    },
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: 'white',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,

        label: {
          show: true,
          position: 'center',
          formatter: '15' + '%',
          color: 'red',
          fontSize: '18',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 15, name: '실패율' },
          { value: 85, name: '성공률' },
        ],
      },
    ],
    color: ['red', 'pink'],
  };
  errorChartOption: echarts.EChartsOption = {
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: 'white',
    xAxis: {
      type: 'value',
      max: 30,
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      data: ['Critical', 'Major', 'Minor'],
      type: 'category',
      axisLine: { show: false },
      axisLabel: { show: true },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        data: [2, 5, 1],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.5)',
        },
        label: {
          show: true,
          position: 'right',
          valueAnimation: true,
        },
      },
    ],
    color: ['red', 'pink'],
  };
}
</script>
<style></style>
