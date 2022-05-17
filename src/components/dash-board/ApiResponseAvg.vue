<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">API 평균 응답시간 및 TPS</h3>
    <div class="chart-group tps-group">
      <div class="tps-chart">
        <i><img src="@/assets/req_ico.svg" alt="평균 응답시간" /></i>
        <p class="text">평균 응답시간<em>(종전 1분)</em></p>
        <p class="fz42"><strong>8</strong>s</p>
      </div>
      <div class="tps-chart">
        <i><img src="@/assets/tps_ico.svg" alt="TPS" /></i>
        <p class="text">TPS</p>
        <p class="fz42"><strong>0.875</strong></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ApiResponseAvg extends Vue {}
</script>
<style></style>
