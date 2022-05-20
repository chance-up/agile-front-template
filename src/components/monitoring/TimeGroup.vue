<template>
  <div class="search-wrap monitor-search">
    <div class="search-cont">
      <h4 class="label-tit">기간 선택</h4>

      <div class="radio-group" @change="handleChangeTime">
        <label class="radio-check" :for="minute.text" v-for="(minute, index) in minutes" :key="index">
          {{ minute.text }}
          <input
            type="radio"
            name="timeGroup"
            v-model="selectVal"
            :value="minute.value"
            :id="minute.text"
            :checked="minute.value == 1440"
          />
          <span class="radiomark"></span>
        </label>
      </div>
    </div>

    <div class="time-wrap">
      <span>{{ selectDate }} ~ {{ nowDate }}</span>
      <div id="timer" class="cicle-timer" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import * as echarts from 'echarts';
import { EChartsType } from 'echarts';

const INTERVAL_VALUE = 60;

@Component({})
export default class TimeGroup extends Vue {
  selectVal = 1440;
  timer = 0;
  chartCountPercentData = 0;
  chartCountTotalData = 100;
  myChart: EChartsType | null = null;
  nowDate = this.getPauseTime(new Date());
  selectDate = this.getPauseTime(new Date(new Date().getTime() - this.selectVal * (60 * 1000)));
  callbackId = 0;

  @Watch('chartCountTotalData')
  onCountChange(val: number) {
    this.myChart?.setOption(this.getTimerOption());
  }

  mounted() {
    const dom = document.getElementById('timer') as HTMLDivElement;
    this.myChart = echarts.init(dom);

    this.myChart.setOption(this.getTimerOption());
    window.addEventListener('resize', () => {
      this.myChart?.resize();
    });

    this.countTimer();
    this.$emit('changeTime', '1440');
  }

  countTimer() {
    this.callbackId = setInterval(() => {
      this.setTimer();
    }, 1000);
  }

  async setTimer() {
    this.timer = this.timer + 1;
    if (this.timer > INTERVAL_VALUE) {
      this.timer = 0;
      const date = new Date();
      this.nowDate = this.getPauseTime(date);
      this.selectDate = this.getPauseTime(new Date(date.getTime() - this.selectVal * (60 * 1000)));
      this.$emit('changeTime', this.selectVal);
    }
    this.chartCountPercentData = (this.timer / INTERVAL_VALUE) * 100;
    this.chartCountTotalData = ((INTERVAL_VALUE - this.timer) / INTERVAL_VALUE) * 100;
  }

  destroyed() {
    clearInterval(this.callbackId);
  }

  handleChangeTime(event: any) {
    this.$emit('changeTime', event.target.value);
  }

  getPauseTime(today: Date): string {
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let date = today.getDate();
    let hours = String(today.getHours()).padStart(2, '0');
    let minutes = String(today.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${date} ${hours}:${minutes}`;
  }

  getTimerOption() {
    const timerOption: echarts.EChartsOption = {
      title: {
        show: false,
      },

      backgroundColor: '#F3F7F9',
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

  minutes = [
    {
      value: 1440,
      text: '24Hour',
    },
    {
      value: 720,
      text: '12Hour',
    },
    {
      value: 360,
      text: '6Hour',
    },
    {
      value: 60,
      text: '1Hour',
    },
    {
      value: 30,
      text: '30Min',
    },
    {
      value: 10,
      text: '10Min',
    },
    {
      value: 5,
      text: '5Min',
    },
  ];
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
