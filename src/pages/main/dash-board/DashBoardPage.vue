<template>
  <article class="dashboard">
    <!--- refresh play/pause area --->
    <TimeCheck />

    <section class="group col-3">
      <!--- Total API Traffic (24Hour) area --->
      <TotalApiTraffic />

      <!--- Error stats (24Hour) area --->
      <ErrorStats />

      <!--- API 평균 응답시간 / TPS area --->
      <ApiResponseAvg />
    </section>

    <section class="group">
      <!--- 실시간 Traffic area --->
      <RealTimeTraffic />
    </section>

    <section class="group col-2">
      <!--- API Top 5 area --->
      <ApiTop5 />

      <!--- Service Top 5 area --->
      <ServiceTop5 />
    </section>

    <section class="group col-2 bg-pastel">
      <!--- API Top 5 area --->
      <LastTraffic />

      <!--- Service Top 5 area --->
      <LastResponse />
    </section>
  </article>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TimeCheck from '@/components/dash-board/TimeCheck.vue';
import TotalApiTraffic from '@/components/dash-board/TotalApiTraffic.vue';
import ErrorStats from '@/components/dash-board/ErrorStats.vue';
import ApiResponseAvg from '@/components/dash-board/ApiResponseAvg.vue';
import RealTimeTraffic from '@/components/dash-board/RealTimeTraffic.vue';
import ApiTop5 from '@/components/dash-board/ApiTop5.vue';
import ServiceTop5 from '@/components/dash-board/ServiceTop5.vue';
import LastTraffic from '@/components/dash-board/LastTraffic.vue';
import LastResponse from '@/components/dash-board/LastResponse.vue';

@Component({
  components: {
    TimeCheck,
    TotalApiTraffic,
    ErrorStats,
    ApiResponseAvg,
    RealTimeTraffic,
    ApiTop5,
    ServiceTop5,
    LastTraffic,
    LastResponse,
  },
})
export default class DashBoardPage extends Vue {}
</script>
<style lang=""></style>
