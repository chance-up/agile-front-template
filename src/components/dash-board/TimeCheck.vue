<template>
  <section class="time-wrap">
    <span>2022.05.16 15:23:36</span>
    <button>
      <i><img src="@/assets/pause_ico.svg" alt="pause" /></i>
    </button>
    <button>
      <i><img src="@/assets/spin_ico.svg" alt="refresh" /></i>
    </button>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class TimeCheck extends Vue {}
</script>
<style></style>
