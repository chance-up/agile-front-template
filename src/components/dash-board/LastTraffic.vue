<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">전일대비/전주대비 Traffic 추이 (00:00 ~ 24:00)</h3>
    <div class="chart-group" id="lastTraffic"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as echarts from 'echarts';
import { drawChart } from '@/utils/chart';
@Component
export default class LastTraffic extends Vue {
  mounted() {
    drawChart('lastTraffic', this.lastTrafficOption);
  }
  // base = new Date();
  // today = new Date(this.base.getTime()).toISOString().slice(0, 10);
  // lastDay = new Date(this.base.getTime() - 86400000).toISOString().slice(0, 10);
  // lastWeek = new Date(this.base.getTime() - 604800000).toISOString().slice(0, 10);
  data1 = [100, 200, 300];
  data2 = [400, 500, 600];
  lastTrafficOption: echarts.EChartsOption = {
    legend: {
      data: ['today, lastDay'],
    },
    tooltip: {
      triggerOn: 'none',
      position: function (pt: any) {
        return [pt[0], 130];
      },
    },
    toolbox: {
      left: 'right',
      itemSize: 20,
      top: -5,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
      },
    },
    xAxis: {
      type: 'time',
      axisPointer: {
        value: new Date().getUTCDay(),
        snap: true,
        lineStyle: {
          color: '#7581BD',
          width: 2,
        },
        label: {
          show: true,
          backgroundColor: '#7581BD',
        },
        handle: {
          show: true,
          color: '#7581BD',
        },
      },
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        inside: true,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n',
      },
      z: 10,
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      height: 148,
    },
    dataZoom: [
      {
        type: 'inside',
        throttle: 50,
      },
    ],
    series: [
      {
        name: 'today',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#0770FF',
        },
        stack: 'a',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(58,77,233,0.8)',
            },
            {
              offset: 1,
              color: 'rgba(58,77,233,0.3)',
            },
          ]),
        },
        data: this.data1,
      },
      {
        name: 'lastDay',
        type: 'line',
        smooth: true,
        stack: 'a',
        symbol: 'circle',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#F2597F',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(213,72,120,0.8)',
            },
            {
              offset: 1,
              color: 'rgba(213,72,120,0.3)',
            },
          ]),
        },
        data: this.data2,
      },
    ],
  };
}
</script>
<style></style>
