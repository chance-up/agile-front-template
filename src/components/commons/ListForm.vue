<template>
  <div class="comp">
    <div class="tb-tit">
      <h2 class="h2-tit">{{ title }}</h2>
      <div class="btn-wrap">
        <slot name="list-btn-area" />
      </div>
    </div>
    <slot name="list-table" />
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
