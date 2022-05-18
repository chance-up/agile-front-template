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
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 6; m++) {
        this.trafcStatTrnd.push({
          statBaseTm: `2019-08-01 ${h < 10 ? '0' + h : h}:${m + '0'}:00`,
          todayCnt: this.randomInt(0, 1000),
          lastDayCnt: this.randomInt(0, 1000),
          lastWeekCnt: this.randomInt(0, 1000),
        });
      }
    }
    const lastTrafficOption: echarts.EChartsOption = {
      // legend: {
      //   data: ['today, lastDay'],
      // },

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

        axisPointer: {
          type: 'line',
          label: {
            backgroundColor: '#777',
          },
        },
        // axisLabel: {
        //   inside: true,
        //   formatter: '{value}\n',
        // },
      },
      axisPointer: {
        label: {
          backgroundColor: '#777',
        },
      },

      yAxis: {
        type: 'value',
        axisTick: {
          inside: false,
        },
        splitLine: {
          show: true,
        },
        axisLabel: {
          inside: false,
          formatter: '{value}\n',
        },
        z: 10,
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
          data: this.trafcStatTrnd.map((item: any) => item.todayCnt),
        },
        {
          name: 'lastDay',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          data: this.trafcStatTrnd.map((item: any) => item.lastDayCnt),
        },
        {
          name: 'lastWeek',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          data: this.trafcStatTrnd.map((item: any) => {
            return item.lastWeekCnt;
          }),
        },
      ],
    };
    // drawChart('lastTraffic', lastTrafficOption);
    const dom = document.getElementById('lastTraffic') as HTMLDivElement;
    const myChart = echarts.init(dom);
    myChart.setOption(lastTrafficOption);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  }
  // base = new Date();
  // today = new Date(this.base.getTime()).toISOString().slice(0, 10);
  // lastDay = new Date(this.base.getTime() - 86400000).toISOString().slice(0, 10);
  // lastWeek = new Date(this.base.getTime() - 604800000).toISOString().slice(0, 10);

  randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  trafcStatTrnd: { statBaseTm: string; todayCnt: number; lastDayCnt: number; lastWeekCnt: number }[] = [];
}
</script>
<style></style>
