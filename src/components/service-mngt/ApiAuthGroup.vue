<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <p class="api-more">
          <span class="bold">{{ countApiList }}</span
          >건
        </p>
        <button class="more-btn" @click="showApiAuth">
          <i><img src="@/assets/more_ico.svg" alt="더보기" /></i>
        </button>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class ApiAuthGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: 0 }) countApiList!: number;
  showApiAuth() {
    this.$emit('setShowApiAuth');
  }
}
</script>
