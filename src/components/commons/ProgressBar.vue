<template>
  <b-progress class="w-25" style="border-radius: 10px">
    <b-progress-bar
      :value="listItem.success"
      :max="listItem.total"
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
}
</script>
<style>
.progress {
  transition: width 3.6s ease;
}
</style>
