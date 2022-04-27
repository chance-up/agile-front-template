<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <input
        :type="type"
        :class="{ 'check-ok': check == true, 'check-false': check == false }"
        class="input-box lg"
        :placeholder="place"
        :disabled="disabled"
        v-model="formValue"
      />
      <p v-if="validCheck !== ''" class="red-txt noti">{{ validCheck }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class InputGroup extends Vue {
  @Prop({ default: null }) check!: boolean | null;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) place!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) validCheck!: string;

  formValue = '';
  @Watch('formValue')
  onChanged(newVal: string) {
    console.log(newVal);
    this.$emit('input', newVal);
  }
}
</script>
<style lang=""></style>
