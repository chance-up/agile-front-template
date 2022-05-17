<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">Total API Traffic (24Hour)</h3>
    <div class="chart-group api-traffic">
      <div id="totalApiTrafficTotal" class="api-pie">total</div>
      <div id="totalApiTrafficSuccess" class="api-pie">성공</div>
      <div id="totalApiTrafficFail" class="api-pie">실패</div>
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
    tooltip: {
      trigger: 'item',
    },
    backgroundColor: '#FFA800',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,

        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  };

  totalApiTrafficSuccsessOption: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    backgroundColor: '#FFA800',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [{ value: 1048, name: 'Search Engine' }],
      },
    ],
  };

  totalApiTrafficFailOption: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    backgroundColor: '#FFA800',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  };
}
</script>
<style scoped></style>
