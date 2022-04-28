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
      />
      <p v-if="!notiMessage[0]" class="red-txt noti">{{ notiMessage[1] }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { checkEmail, checkLength, checkEnglishNumber, checkEnglishKorean } from '@/utils/validation';

@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) place!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: false }) isvalid!: boolean | null;

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
      case this.$t('system.name'):
        if (checkLength(val, 1, 20) && checkEnglishNumber(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('system.valid_check_nm') as string];
        }
        break;
      case this.$t('system.tkcgrNm'):
        if (checkLength(val, 1, 20) && checkEnglishKorean(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('system.valid_check_tkcgrNm') as string];
        }
        break;
      case this.$t('system.tkcgrPos'):
        if (checkLength(val, 1, 20)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('system.valid_check_tkcgrPos') as string];
        }
        break;
      case this.$t('system.tkcgrEml'):
        if (checkLength(val, 1, 20) && checkEmail(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('system.valid_check_tkcgrEml') as string];
        }
        break;
      default:
        this.notiMessage = [null, ''];
    }

    this.$emit('update:value', val);
  }
}
</script>
<style lang=""></style>
