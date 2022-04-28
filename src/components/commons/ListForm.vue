<template>
  <div class="comp">
    <div class="tb-tit">
      <h2 class="h2-tit">{{ title }}</h2>
      <b-spinner v-show="isShowProgress" style="width: 2rem; height: 2rem" label="Large Spinner"></b-spinner>
      <div class="btn-wrap">
        <slot name="list-btn-area" />
      </div>
    </div>
    <div class="tb-wrap">
      <table class="list-tb">
        <slot name="list-table" />
      </table>
    </div>
    <div class="page-wrap">
      <slot name="pagination" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListForm extends Vue {
  @Prop() title!: string;
  @Prop() isShowProgress!: boolean;
}
</script>
