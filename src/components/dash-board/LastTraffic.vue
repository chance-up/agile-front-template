<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">전일대비/전주대비 Traffic 추이 (00:00 ~ 24:00)</h3>
    <div class="chart-group" id="lastTraffic"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as echarts from 'echarts';
import { drawChart } from '@/utils/chart';
import { getModule } from 'vuex-module-decorators';
import DashBoardModule from '@/store/modules/DashBoardModule';
@Component
export default class LastTraffic extends Vue {
  dashBoardModule = getModule(DashBoardModule, this.$store);
  get lastTrafficList() {
    return this.dashBoardModule.lastTrafficList;
  }
  mounted() {
    this.dashBoardModule.getLastTrafficList();
  }

  @Watch('lastTrafficList')
  changedLastResponseList() {
    if (this.lastTrafficList.length) {
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
        backgroundColor: '#fff',
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.lastTrafficList.map((item) => item.statBaseTm.slice(11, 16)),

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
            data: this.lastTrafficList.map((item) => item.todayAvgResTm),
          },
          {
            name: 'lastDay',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            data: this.lastTrafficList.map((item) => item.ystdayAvgResTm),
          },
          {
            name: 'lastWeek',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            data: this.lastTrafficList.map((item) => {
              return item.lstWkAvgResTm;
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
  }
  // base = new Date();
  // today = new Date(this.base.getTime()).toISOString().slice(0, 10);
  // lastDay = new Date(this.base.getTime() - 86400000).toISOString().slice(0, 10);
  // lastWeek = new Date(this.base.getTime() - 604800000).toISOString().slice(0, 10);
}
</script>
<style>
#lastTraffic {
  background-color: white;
}
</style>
