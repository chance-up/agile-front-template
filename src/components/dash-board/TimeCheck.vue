<template>
  <section class="time-wrap">
    <span>2022.05.16 15:23:36</span>
    <button>
      <i><img src="@/assets/pause_ico.svg" alt="pause" /></i>
    </button>
    <div id="timer" class="test" />
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as echarts from 'echarts';

@Component
export default class TimeCheck extends Vue {
  mounted() {
    const dom = document.getElementById('timer') as HTMLDivElement;
    const myChart = echarts.init(dom);
    myChart.setOption(this.timerOption);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  }

  timerOption: echarts.EChartsOption = {
    title: {
      show: false,
    },
    backgroundColor: '#FFFFFF',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,

        label: {
          show: false,
        },

        labelLine: {
          show: false,
        },
        data: [
          { value: 15, name: '실패율' },
          { value: 85, name: '성공률' },
        ],
        emphasis: {
          disabled: true,
        },
      },
    ],
    color: ['#8C8C8C', '#000000'],
  };
}
</script>
<style>
.test {
  background-color: #f3f3f3;
  width: 30%;
}
</style>
