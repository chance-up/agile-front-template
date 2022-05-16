<template lang="">
  <div id="echart-div">
    <div id="echart-graph" style="height: 100%"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as echarts from 'echarts';

@Component
export default class DoughnutChart extends Vue {
  @Prop()
  public option!: echarts.EChartsOption;

  mounted() {
    console.log(this.option);
    this.initChart(this.option);
  }

  initChart = (_option: echarts.EChartsOption) => {
    const dom = document.getElementById('echart-graph') as HTMLDivElement;
    const myChart = echarts.init(dom);
    myChart.setOption(_option);
  };
}
</script>
<style scoped>
.echart-div {
  height: 400px;
  margin: 0;
  background: 'black';
}
</style>
