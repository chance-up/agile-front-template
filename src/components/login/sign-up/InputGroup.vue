<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <input
        :type="type"
        :class="{
          'check-ok': notiMessage[0] === true,
          'check-false': notiMessage[0] === false,
        }"
        class="input-box lg"
        :placeholder="place"
        :disabled="disabled"
        v-model="v"
        @focus="emptyChkFunc"
      />
      <p v-if="notiMessage[0] == false" class="red-txt noti">{{ notiMessage[1] }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {
  checkEmail,
  checkLength,
  checkEnglishNumber,
  checkEnglishKorean,
  checkEmpty,
  checkEnglishNumberKorean,
} from '@/utils/validation';

@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) place!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: false }) isValid!: boolean | null;

  notiMessage: [boolean | null, string] = [null, ''];

  @Watch('notiMessage', { deep: true })
  messageChanged() {
    this.$emit('update:isValid', this.notiMessage[0]);
  }

  get v() {
    return this.value;
  }
  set v(val: string) {
    switch (this.inputNm) {
      case this.$t('system.name'):
        if (checkLength(val, 1, 20) && checkEnglishNumberKorean(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [false, this.$t('system.empty_check') as string];
        } else {
          this.notiMessage = [false, this.$t('system.valid_check_nm') as string];
          console.log(this.notiMessage);
        }
        break;

      default:
        this.notiMessage = [null, ''];
    }

    this.$emit('update:value', val);
  }

  emptyChkFunc() {
    if (!checkEmpty(this.v)) {
      this.notiMessage = [false, this.$t('system.empty_check') as string];
    }
  }
}
</script>
<style lang=""></style>
