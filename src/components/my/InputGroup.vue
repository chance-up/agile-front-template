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
  checkOnlyEnglishAndNumber,
  checkEnglishKorean,
  checkEmpty,
  checkEnglishNumberKorean,
  checkEnglishNumberKoreanSpacialChar,
  checkTel,
} from '@/utils/validation';

@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) place!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: false }) isvalid!: boolean | null;
  @Prop({ default: '' }) confirm!: string;

  notiMessage: [boolean | null, string] = [null, ''];

  @Watch('notiMessage')
  messageChanged(val: [boolean | null, string]) {
    this.$emit('update:isvalid', this.notiMessage[0]);
  }

  get v() {
    return this.value;
  }
  set v(val: string) {
    switch (this.inputNm) {
      case this.$t('my.name'):
        if (checkLength(val, 1, 20) && checkEnglishKorean(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('my.valid_check_nm') as string];
          console.log(this.notiMessage);
        }
        break;
      case this.$t('my.id'):
        // val = val.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''); //한글 입력 방지 코드

        if (checkLength(val, 6, 10) && checkOnlyEnglishAndNumber(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('my.valid_check_id') as string];
          console.log(this.notiMessage);
        }
        break;
      case this.$t('my.password'):
        if (checkLength(val, 8, 20) && checkEnglishNumberKoreanSpacialChar(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('my.valid_check_password') as string];
        }
        break;
      case this.$t('my.password_confirm'):
        if (val == this.confirm) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('my.valid_check_password_confirm') as string];
        }
        break;
      case this.$t('my.tel'):
        if (checkLength(val, 1, 20) && checkTel(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('my.valid_check_tel') as string];
        }
        break;
      case this.$t('my.position'):
        if (checkLength(val, 1, 20)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('my.valid_check_position') as string];
        }
        break;
      case this.$t('my.email'):
        if (checkLength(val, 1, 20) && checkEmail(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('my.valid_check_email') as string];
        }
        break;
      default:
        this.notiMessage = [null, ''];
    }

    this.$emit('update:value', val);
  }

  emptyChkFunc() {
    if (!checkEmpty(this.v)) {
      this.notiMessage = [false, this.$t('my.empty_check') as string];
    }
  }
}
</script>
<style lang=""></style>
