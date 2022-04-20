<template lang="html">
  <!-- <div class="body-wrap"> -->
  <!-- <div class="wrap"> -->
  <article class="contents-wrap">
    <div class="tit-wrap">
      <h1 class="h1-tit">{{ title }}</h1>
      <div v-if="depth" class="directory-wrap">
        <span>{{ depth }}</span>
        <i><img src="@/assets/arrow_right.svg" alt="디렉토리목록" /></i>
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="box comp">
      <div class="box-tit">
        <h2 class="h2-tit">{{ subTitle }}</h2>
      </div>
      <div class="form-wrap">
        <slot name="contents" />
      </div>
      <slot name="buttons" />
    </div>
  </article>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    depth: {
      type: String,
    },
  },
})
export default class ContentLayout extends Vue {}
</script>
