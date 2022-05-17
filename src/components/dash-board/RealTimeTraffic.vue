<template>
  <section class="group">
    <div class="chart-wrap">
      <h3 class="h3-tit">실시간 Traffic</h3>
      <div class="chart-group" id="real-time-traffic"></div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { drawDynamicChart } from '@/utils/chart';
import realtimeTestData from '@/utils/realtimeTest';
@Component
export default class RealTimeTraffic extends Vue {
  mounted() {
    drawDynamicChart('real-time-traffic', realtimeTestData);
  }
}
</script>
<style></style>
