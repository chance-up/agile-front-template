<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <input :type="type" :placeholder="placeholder" :disabled="disabled" :class="inputClass" v-model="text" />
      <p v-if="validCheck !== ''" class="red-txt noti">{{ validCheck }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) placeholder!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) inputClass!: string;
  @Prop({ default: '' }) validCheck!: string;
  @Prop({ default: '' }) value!: string;

  get text() {
    return this.value;
  }
  set text(val: string) {
    this.$emit('update:value', val);
  }
}
</script>
