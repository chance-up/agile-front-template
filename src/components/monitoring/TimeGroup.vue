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
            :value="minute.value"
            :id="minute.text"
            :checked="minute.value == 1440"
          />
          <span class="radiomark"></span>
        </label>
      </div>
    </div>

    <div class="time-wrap">
      <span>{{ now }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ControlPage extends Vue {
  now = new Date().toLocaleString();
  callbackId = 0;
  mounted() {
    this.callbackId = setInterval(() => {
      this.now = new Date().toLocaleString();
    }, 1000);
    this.$emit('changeTime', '1440');
  }
  destroyed() {
    clearInterval(this.callbackId);
  }
  handleChangeTime(event: any) {
    this.$emit('changeTime', event.target.value);
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
