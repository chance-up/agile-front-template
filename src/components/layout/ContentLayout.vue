<template lang="html">
  <!-- <div class="body-wrap"> -->
  <!-- <div class="wrap"> -->
  <article class="contents-wrap" :id="id">
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
        <div class="text-center">
          <b-spinner v-show="isShowProgress" style="width: 2rem; height: 2rem" label="Large Spinner"></b-spinner>
        </div>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BSpinner } from 'bootstrap-vue';

@Component({
  components: {
    BSpinner,
  },
})
export default class ContentLayout extends Vue {
  @Prop() title!: string | null;
  @Prop() subTitle!: string | null;
  @Prop() depth!: string | null;
  @Prop() isShowProgress!: boolean;
  @Prop() id!: string | null;
}
</script>
