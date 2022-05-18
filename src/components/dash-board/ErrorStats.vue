<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">Error stats (24Hour)</h3>
    <div class="chart-group error-stats mouse-hover">
      <div id="errorStatsPie" class="error-pie" autoresize>실패율</div>
      <div id="errorStateBar" class="error-chart" autoresize>Critical/Major/Minor</div>
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
    // drawChart('errorStatsPie', this.errorStatsPieOption);
    // drawChart('errorStateBar', this.errorStatsBarOption);
    const dom = document.getElementById('errorStatsPie') as HTMLDivElement;
    const myChart = echarts.init(dom);
    myChart.setOption(this.errorStatsPieOption);
    const dom2 = document.getElementById('errorStateBar') as HTMLDivElement;
    const myChart2 = echarts.init(dom2);
    myChart2.setOption(this.errorStatsBarOption);
    window.addEventListener('resize', () => {
      myChart.resize();
      myChart2.resize();
    });
  }
  errorStatsPieOption: echarts.EChartsOption = {
    title: {
      text: '실패율',
      left: 'center',
      top: '75%',
      textStyle: {
        color: 'black',
        fontSize: '13',
        fontWeight: 400,
      },
    },
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFFFFF',
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
          fontSize: '16',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 15, name: '실패율' },
          { value: 85, name: '성공률' },
        ],
        center: ['50%', '35%'],
        emphasis: {
          disabled: true,
        },
      },
    ],
    color: ['#FF4E63', '#F8B7B0'],
  };
  errorStatsBarOption: echarts.EChartsOption = {
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFFFFF',
    xAxis: {
      type: 'value',
      max: 8,
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: [
      {
        data: ['Minor', 'Major', 'Critical'],
        type: 'category',
        axisLine: { show: false },
        axisLabel: { show: true, fontSize: '13', fontWeight: 600, color: '#000' },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      {
        type: 'category',
        data: ['1건', '5건', '2건'],
        axisLine: { show: false },
        axisLabel: { show: true, fontSize: '13', fontWeight: 600, color: '#000' },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    grid: {
      top: 30,
      left: 50,
      bottom: 30,
      right: 50,
    },
    series: [
      {
        data: [
          {
            value: 1,
            itemStyle: {
              color: '#6998FF',
            },
          },
          {
            value: 5,
            itemStyle: {
              color: '#FFB43D',
            },
          },
          {
            value: 2,
            itemStyle: {
              color: '#FF4E63',
            },
          },
        ],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.5)',
          borderRadius: [100, 100, 100, 100],
        },
        // label: {
        //   show: true,
        //   position: 'right',
        //   valueAnimation: true,
        //   formatter: '{c}' + '건',
        // },
        barWidth: '40%',
        itemStyle: {
          borderRadius: [100, 100, 100, 100],
        },
      },
    ],
  };
}
</script>
<style scope>
.mouse-hover:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
}
</style>
