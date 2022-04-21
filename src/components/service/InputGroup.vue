<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <input type="text" id="" :placeholder="placeholder" :disabled="disabled" :class="inputClass" />
      <p v-if="validCheck !== ''" class="red-txt noti">{{ validCheck }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) placeholder!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) inputClass!: string;
  @Prop({ default: '' }) validCheck!: string;
}
</script>
