<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">전일대비 응답시간 추이 (00:00 ~ 24:00)</h3>
    <div class="chart-group" id="lastResponse"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as echarts from 'echarts';
import { getModule } from 'vuex-module-decorators';
import DashBoardModule from '@/store/modules/DashBoardModule';
@Component
export default class LastResponse extends Vue {
  dashBoardModule = getModule(DashBoardModule, this.$store);
  get lastResponseList() {
    console.log(this.dashBoardModule);
    return this.dashBoardModule.lastResponseList;
  }
  mounted() {
    this.dashBoardModule.getLastResponseList();
  }

  @Watch('lastResponseList')
  changedLastResponseList() {
    if (this.lastResponseList.length) {
      const option: echarts.EChartsOption = {
        // legend: {
        //   data: ['today, lastDay, lastWeek'],
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
          data: this.lastResponseList.map((item) => item.statBaseTm.slice(11, 16)),
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

            data: this.lastResponseList.map((item) => {
              return item.todayCnt as number;
            }),
          },
          {
            name: 'lastDay',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,

            data: this.lastResponseList.map((item) => {
              return item.ystdayCnt;
            }),
          },
        ],
      };

      // drawChart('lastResponse', option);

      const dom = document.getElementById('lastResponse') as HTMLDivElement;
      const myChart = echarts.init(dom);
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  }
}
</script>
<style>
#lastResponse {
  width: 100%;
}
</style>
