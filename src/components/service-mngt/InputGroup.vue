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
      />
      <p v-if="!notiMessage[0]" class="red-txt noti">{{ notiMessage[1] }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { checkEmail, checkLength, checkEnglishKorean } from '@/utils/validation';
@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) placeholder!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) value!: string;

  notiMessage: [boolean | null, string] = [null, ''];
  get text() {
    return this.value;
  }
  set text(val: string) {
    switch (this.inputNm) {
      case this.$t('service.tkcgrNm'):
        if (checkLength(val, 1, 20) && checkEnglishKorean(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('service.valid_check_tkcgrNm') as string];
        }
        break;
      case this.$t('service.tkcgrPos'):
        if (checkLength(val, 1, 20) && checkEnglishKorean(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('service.valid_check_tkcgrPos') as string];
        }
        break;
      case this.$t('service.tkcgrEml'):
        if (checkEmail(val) && checkEnglishKorean(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('system.valid_check_tkcgrPos') as string];
        }
        break;
    }
    this.$emit('update:value', val);
  }
}
</script>
