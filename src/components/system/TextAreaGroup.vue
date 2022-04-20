<template>
  <li>
    <label for="" class="point">{{ inputNm }}</label>
    <div class="form-cont">
      <textarea class="textarea"></textarea>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class TextAreaGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
}
</script>
<style lang=""></style>
