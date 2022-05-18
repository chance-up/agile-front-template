<template>
  <b-progress class="w-25" style="border-radius: 10px">
    <b-progress-bar
      :value="progressBar.success"
      :max="progressBar.total"
      style="border-radius: 10px; background-color: #6998ff"
    ></b-progress-bar>
  </b-progress>
  <!-- <div id="apiTop5List" data-echart-responsive="true"></div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ApiTop5 extends Vue {
  @Prop() public listItem!: any;

  progressBar: any = {
    id: '',
    total: 0,
    success: 0,
    fail: 0,
  };

  mounted() {
    this.progressBar = this.listItem;
  }
}
</script>
<style>
.progress {
  transition: width 0.6s ease;
}
</style>
