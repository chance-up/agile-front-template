<template>
  <li>
    <label for="" class="point">{{ inputNm }}</label>
    <div class="form-cont">
      <input type="text" id="" :class="inputClass" :placeholder="place" :disabled="disabled" />
      <p v-if="validCheck !== ''" class="red-txt noti">{{ validCheck }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) place!: string;
  @Prop({ default: '' }) inputClass!: string;
  @Prop({ default: '' }) validCheck!: string;
  @Prop({ default: false }) disabled!: boolean;
}
</script>
<style lang=""></style>
