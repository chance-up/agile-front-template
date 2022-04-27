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
        v-model="v"
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
  @Prop({ default: '' }) value!: string;
  //  re2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  // formValue = '';
  // @Watch('formValue')
  // onChanged(newVal: string) {
  //   console.log(newVal);
  //   console.log(this.re2.test(this.formValue));
  //   this.$emit('input', newVal);
  // }
  get v() {
    return this.value;
  }
  set v(val: string) {
    this.checkValid(val);
    this.$emit('update:value', val);
  }

  checkValid = (t: string) => {
    let re2 = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    console.log(t);
    console.log(re2.test(t));
  };
}
</script>
<style lang=""></style>
