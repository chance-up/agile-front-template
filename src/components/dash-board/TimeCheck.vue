<template>
  <section class="time-wrap" style="height: 28px">
    <span v-show="!isPlay && !isLoadData">{{ getPauseTime() }}</span>
    <button>
      <i><img src="@/assets/pause_ico.svg" v-show="isPlay && !isLoadData" @click="onCountPause()" alt="pause" /></i>
      <i><img src="@/assets/play_arrow.svg" v-show="!isPlay && !isLoadData" @click="onCountStart()" alt="play" /></i>
    </button>
    <div v-show="!isLoadData" id="timer" class="cicle-timer" />
    <div v-show="isLoadData" ref="progressChartRef" id="progressChart" style="height: 100%; width: 10%"></div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as echarts from 'echarts';

const INTERVAL_VALUE = 60;

@Component
export default class TimeCheck extends Vue {
  timer = 0;
  chartCountPercentData = 0;
  chartCountTotalData = 100;
  countChart = {} as echarts.EChartsType;
  loadingChart = {} as echarts.EChartsType;

  intervalId = 0;
  isPlay = true;
  @Prop() callBack!: () => void;
  @Prop({ default: false }) isLoadData!: boolean;

  countTimer() {
    this.intervalId = setInterval(this.setTimer, 1000);
  }

  async setTimer() {
    if (this.timer > INTERVAL_VALUE) {
      this.timer = 0;
      this.callBack();
    }
    this.timer = this.timer + 1;
    this.chartCountPercentData = (this.timer / INTERVAL_VALUE) * 100;
    this.chartCountTotalData = ((INTERVAL_VALUE - this.timer) / INTERVAL_VALUE) * 100;
  }

  destroyed() {
    clearInterval(this.intervalId);
  }

  onCountPause() {
    this.isPlay = false;
    clearInterval(this.intervalId);
  }

  onCountStart() {
    this.isPlay = true;
    this.countTimer();
  }

  mounted() {
    this.setCountChart();
    this.setProgressChart();

    this.onCountStart();
  }

  setProgressChart() {
    var chartDom = document.getElementById('progressChart') as HTMLDivElement;
    this.loadingChart = echarts.init(chartDom);
    var option: echarts.EChartsOption;
    option = {
      graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: new Array(7).fill(0).map((val, i) => ({
              type: 'rect',
              x: i * 12,
              shape: {
                x: 0,
                y: -10,
                width: 4,
                height: 20,
              },
              style: {
                fill: '#8041F7',
              },
              keyframeAnimation: {
                duration: 800,
                delay: i * 200,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    scaleY: 0.3,
                    easing: 'cubicIn',
                  },
                  {
                    percent: 1,
                    scaleY: 1,
                    easing: 'cubicOut',
                  },
                ],
              },
            })),
          },
        ],
      },
    };
    this.loadingChart.setOption(option);
  }

  width = 0;
  height = 0;
  observeSize() {
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        this.width = width;
        this.height = height;
      });
    });
    ro.observe(this.$refs.progressChartRef as HTMLDivElement);
  }

  @Watch('width')
  onWidthChange() {
    console.log('width', this.width);

    this.loadingChart.resize();
    this.countChart.resize();
  }

  setCountChart() {
    const dom = document.getElementById('timer') as HTMLDivElement;
    this.countChart = echarts.init(dom);

    this.countChart.setOption(this.getTimerOption());
  }

  getPauseTime(): string {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let date = today.getDate();
    let hours = String(today.getHours()).padStart(2, '0');
    let minutes = String(today.getMinutes()).padStart(2, '0');

    return `${this.$t('dash_board.pause_time')} : ${year}.${month}.${date} ${hours}:${minutes}`;
  }

  @Watch('isShow')
  test() {
    console.log('test');
  }

  @Watch('chartCountTotalData')
  onCountChange(val: number) {
    this.countChart.setOption(this.getTimerOption());
  }

  updated() {
    this.observeSize();
  }

  getTimerOption() {
    const timerOption: echarts.EChartsOption = {
      title: {
        show: false,
      },

      backgroundColor: '#FFFFFF',
      series: [
        {
          center: ['40%', '58%'],
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
          data: [{ value: this.chartCountPercentData }, { value: this.chartCountTotalData }],
          emphasis: {
            disabled: true,
          },
        },
      ],
      color: ['#000000', '#D5D5D5'],
    };

    return timerOption;
  }
}
</script>
<style>
.cicle-timer {
  margin-bottom: 4px;
  background-color: #f3f3f3;
  width: 24px;
  height: 24px;
}
</style>
