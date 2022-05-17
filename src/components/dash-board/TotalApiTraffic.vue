<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">Total API Traffic (24Hour)</h3>
    <div class="chart-group api-traffic">
      <div id="totalApiTrafficTotal" class="api-pie" data-echart-responsive="true">total</div>
      <div id="totalApiTrafficSuccess" class="api-pie" data-echart-responsive="true">성공</div>
      <div id="totalApiTrafficFail" class="api-pie" data-echart-responsive="true">실패</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { drawChart } from '@/utils/chart';
import * as echarts from 'echarts';
@Component
export default class TotalApiTraffic extends Vue {
  mounted() {
    drawChart('totalApiTrafficTotal', this.totalApiTrafficOption);
    drawChart('totalApiTrafficSuccess', this.totalApiTrafficSuccsessOption);
    drawChart('totalApiTrafficFail', this.totalApiTrafficFailOption);
  }
  totalApiTrafficOption: echarts.EChartsOption = {
    title: {
      text: 'Total',
      left: 'center',
      top: 'bottom',
      textStyle: {
        color: '#fff',
        fontSize: '17',
      },
    },
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFA800',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['55%', '80%'],
        avoidLabelOverlap: false,

        label: {
          show: true,
          position: 'center',
          formatter: '4320' + '\n' + '건',
          fontSize: '15',
          color: '#fff',
        },

        labelLine: {
          show: false,
        },
        data: [{ value: 4320, name: 'total' }],
      },
    ],
    color: 'white',
  };

  totalApiTrafficSuccsessOption: echarts.EChartsOption = {
    title: {
      text: '성공',
      left: 'center',
      top: 'bottom',
      textStyle: {
        color: '#fff',
        fontSize: '17',
      },
    },
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFA800',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['55%', '80%'],
        avoidLabelOverlap: false,

        label: {
          show: true,
          position: 'center',
          formatter: '4000' + '\n' + '건',
          fontSize: '15',
          color: '#fff',
        },
        data: [
          { value: 4000, name: '성공' },
          { value: 320, name: '실패' },
        ],
      },
    ],
    color: ['white', 'rgba(255, 255, 255, 0)'],
  };

  totalApiTrafficFailOption: echarts.EChartsOption = {
    title: {
      text: '실패',
      left: 'center',
      top: 'bottom',
      textStyle: {
        color: '#fff',
        fontSize: '17',
      },
    },
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFA800',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['55%', '80%'],
        avoidLabelOverlap: false,

        label: {
          show: true,
          position: 'center',
          formatter: '320' + '\n' + '건',
          fontSize: '15',
          color: '#fff',
        },
        data: [
          { value: 320, name: '실패' },
          { value: 4000, name: '성공' },
        ],
      },
    ],
    color: ['white', 'rgba(255, 255, 255, 0)'],
  };
}
</script>
<style scoped></style>
