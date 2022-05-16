<template>
  <article class="contents-wrap">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <TotalApiTraffic />
        </div>
        <div class="col-sm">One of three columns</div>
        <div class="col-sm">One of three columns</div>
      </div>
      <div class="row">
        <div class="col-4">
          .col-4<br />Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous
          unit.
        </div>
        <div class="col-6">.col-6<br />Subsequent columns continue along the new line.</div>
      </div>
    </div>
  </article>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DoughnutChart from '@/components/dash-board/charts/DoughnutChart.vue';
import TotalApiTraffic from '@/components/dash-board/charts/TotalApiTraffic.vue';

import * as echarts from 'echarts';
@Component({
  components: {
    DoughnutChart,
    TotalApiTraffic,
  },
})
export default class HomePage extends Vue {}
</script>
<style lang=""></style>
