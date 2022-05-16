<template lang="">
  <div class="row" id="TotalApiTrafficId">
    <div class="col" id="TotalApiTrafficId1">
      <DoughnutChart :option="option" />
    </div>
    <div class="col" id="TotalApiTrafficId2">
      <DoughnutChart :option="option" />
    </div>
    <div class="col" id="TotalApiTrafficId3">
      <DoughnutChart :option="option" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DoughnutChart from '@/components/dash-board/charts/DoughnutChart.vue';
import * as echarts from 'echarts';

@Component({
  components: {
    DoughnutChart,
  },
})
export default class TotalApiTraffic extends Vue {
  option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
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
<style scoped>
.TotalApiTrafficId {
  height: 200px;
  margin: 0;
  background: green;
}
#TotalApiTrafficId1 {
  height: 100%;
  margin: 0;
  background: red;
}
#TotalApiTrafficId2 {
  height: 100%;
  margin: 0;
  background: blue;
}
#TotalApiTrafficId3 {
  height: 100%;
  margin: 0;
  background: green;
}
</style>
