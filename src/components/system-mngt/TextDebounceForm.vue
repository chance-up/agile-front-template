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
      <p v-if="check == false" class="red-txt noti">중복된 이름입니다.</p>
      <p v-if="!notiMessage[0]" class="red-txt noti">{{ notiMessage[1] }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { checkLength, checkEnglishNumber } from '@/utils/validation';
@Component
export default class TextDebounceForm extends Vue {
  @Prop({ default: null }) check!: boolean | null;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) place!: string;
  @Prop({ default: '' }) value!: string;

  notiMessage: [boolean | null, string] = [null, ''];

  formValue = '';
  @Watch('formValue')
  onValueChange(val: string) {
    switch (this.inputNm) {
      case this.$t('system.id'):
        if (checkLength(val, 1, 20) && checkEnglishNumber(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('system.valid_check_nm') as string];
        }
        break;
    }
    this.$emit('input', val);
  }

  // get v() {
  //   return this.value;
  // }
  // set v(val: string) {
  //   this.$emit('input:value', val);
  // }
}
</script>
<style lang=""></style>
