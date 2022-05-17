<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">전일대비 응답시간 추이 (00:00 ~ 24:00)</h3>
    <div class="chart-group"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class LastResponse extends Vue {}
</script>
<style></style>
