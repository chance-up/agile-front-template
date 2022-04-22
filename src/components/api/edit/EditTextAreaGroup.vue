<template>
  <li>
    <label for="" :class="{ label: true, point: point }">{{ inputNm }}</label>
    <div class="form-cont">
      <textarea class="textarea"></textarea>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class EditTextAreaGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: false }) point!: boolean;
}
</script>
<style lang=""></style>
