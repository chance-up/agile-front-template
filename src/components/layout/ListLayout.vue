<template>
  <article class="contents-wrap">
    <div class="tit-wrap">
      <h1 class="h1-tit">{{ title }}</h1>
    </div>
    <slot name="search-form" />
    <slot name="list-form" />
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListLayout extends Vue {
  @Prop() title!: string;
}
</script>
