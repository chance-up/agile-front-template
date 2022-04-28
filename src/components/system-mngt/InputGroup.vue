<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <input
        :type="type"
        :class="{ 'check-ok': notiMessage.length === 0, 'check-false': notiMessage.length !== 0 }"
        class="input-box lg"
        :placeholder="place"
        :disabled="disabled"
        v-model="v"
      />
      <p v-if="notiMessage !== ''" class="red-txt noti">{{ notiMessage }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { emailCheck, lengthCheck, englishAndNumberCheck } from '@/utils/validation';

@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) place!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) value!: string;

  notiMessage = '';
  get v() {
    return this.value;
  }
  set v(val: string) {
    switch (this.place) {
      case 'E-mail':
        this.notiMessage = emailCheck(val) ? '' : 'E-mail 형식이 아닙니다.';
        break;
      case '시스템명':
      case '담당자 이름':
      case '소속':
      case '시스템 설명':
        this.notiMessage = lengthCheck(val, 1, 20) && englishAndNumberCheck(val) ? '' : '형식에 맞게 입력해주세요.';
        break;
    }
    this.$emit('update:value', val);
  }
}
</script>
<style lang=""></style>
