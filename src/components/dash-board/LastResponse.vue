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
        legend: {
          show: true,
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
              show: false,
              yAxisIndex: 'none',
            },
            restore: {},
          },
        },
        backgroundColor: '#fff',
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
          top: 40,
          left: 5,
          right: 20,
          bottom: 20,
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
            name: '금일',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,

            data: this.lastResponseList.map((item) => {
              return item.todayCnt as number;
            }),
          },
          {
            name: '전일',
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
  background-color: white;
  height: 290px;
  padding: 10px;
  margin: 10px;
}
</style>
