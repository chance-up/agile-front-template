<template>
  <b-progress class="mt-2" :max="100" show-value>
    <b-progress-bar :value="70" :max="100" variant="success"></b-progress-bar>
  </b-progress>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ApiTop5 extends Vue {
  @Prop() public item: any;
}
</script>
