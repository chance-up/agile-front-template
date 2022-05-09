<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <input
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="text"
        :class="{
          'check-ok': notiMessage[0] === true,
          'check-false': notiMessage[0] === false,
        }"
        class="input-box lg"
        @focus="notice()"
      />
      <p v-if="emptyChk && text == ''" class="red-txt noti">해당 항목은 필수 입력값입니다.</p>
      <p v-if="notiMessage[0] == false && notiMessage[1] != ''" class="red-txt noti">{{ notiMessage[1] }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { checkEmail, checkLength, checkEnglishNumberKorean } from '@/utils/validation';
@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) placeholder!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: false }) isvalid!: boolean | null;
  emptyChk = false;

  notiMessage: [boolean | null, string] = [null, ''];

  @Watch('notiMessage')
  messageChanged() {
    this.$emit('update:isvalid', this.notiMessage[0]);
  }

  get text() {
    return this.value;
  }
  set text(val: string) {
    console.log('test');
    switch (this.inputNm) {
      case this.$t('service.tkcgrNm'):
        if (checkLength(val, 1, 20) && checkEnglishNumberKorean(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [false, ''];
        } else {
          this.notiMessage = [false, this.$t('service.valid_check_tkcgrNm') as string];
        }
        break;
      case this.$t('service.tkcgrPos'):
        if (checkLength(val, 1, 20) && checkEnglishNumberKorean(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [false, ''];
        } else {
          this.notiMessage = [false, this.$t('service.valid_check_tkcgrPos') as string];
        }
        break;
      case this.$t('service.tkcgrEml'):
        if (checkLength(val, 1, 20) && checkEmail(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [false, ''];
        } else {
          this.notiMessage = [false, this.$t('system.valid_check_tkcgrEml') as string];
        }
        break;
    }
    this.$emit('update:value', val);
  }

  notice() {
    this.emptyChk = true;
  }
}
</script>
