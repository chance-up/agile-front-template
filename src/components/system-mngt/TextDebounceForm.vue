<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <b-form-input
        :type="type"
        :class="{ 'check-ok': check == true, 'check-false': check == false }"
        class="input-box lg"
        :placeholder="place"
        v-model="formValue"
        debounce="1000"
      />
      <p v-if="check == false" class="red-txt noti">???를 확인해주세요</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class TextDebounceForm extends Vue {
  @Prop({ default: null }) check!: boolean | null;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) place!: string;

  formValue = '';
  @Watch('formValue')
  onChanged(newVal: string) {
    console.log(newVal);
    this.$emit('input', newVal);
  }
  test() {
    console.log('thuusisisistest');
  }
  checkEmail(): void {
    //let re: RegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    //let re = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    // console.log(re.test(this.systemItem.tkcgr_eml));
    // return re.test(this.systemItem.tkcgr_eml);
  }
}
</script>
<style lang=""></style>
