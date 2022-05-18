<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">전일대비 응답시간 추이 (00:00 ~ 24:00)</h3>
    <div class="chart-group" id="lastResponse"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as echarts from 'echarts';
import { drawChart } from '@/utils/chart';
@Component
export default class LastResponse extends Vue {
  mounted() {
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 6; m++) {
        this.trafcStatTrnd.push({
          statBaseTm: `2019-08-01 ${h < 10 ? '0' + h : h}:${m + '0'}:00`,
          todayCnt: this.randomInt(0, 1000),
          lastDayCnt: this.randomInt(0, 1000),
        });
      }
    }
    const option: echarts.EChartsOption = {
      legend: {
        data: ['today, lastDay, lastWeek'],
      },
      tooltip: {
        trigger: 'axis',
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
        type: 'category',
        boundaryGap: false,
        data: this.trafcStatTrnd.map((item: any) => item.statBaseTm.slice(11, 16)),
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        height: 148,
        containLabel: true,
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
          symbol: 'circle',
          symbolSize: 5,

          data: this.trafcStatTrnd.map((item: any) => {
            return item.todayCnt as number;
          }),
        },
        {
          name: 'lastDay',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,

          data: this.trafcStatTrnd.map((item: any) => {
            return item.lastDayCnt;
          }),
        },
      ],
    };

    drawChart('lastResponse', option);
  }
  // base = new Date();
  // today = new Date(this.base.getTime()).toISOString().slice(0, 10);
  // lastDay = new Date(this.base.getTime() - 86400000).toISOString().slice(0, 10);
  // lastWeek = new Date(this.base.getTime() - 604800000).toISOString().slice(0, 10);

  randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  trafcStatTrnd: { statBaseTm: string; todayCnt: number; lastDayCnt: number }[] = [];
}
</script>
<style>
#lastResponse {
  width: 100%;
}
</style>
