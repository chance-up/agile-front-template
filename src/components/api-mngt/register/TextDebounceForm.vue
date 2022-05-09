<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="text"
        :class="{
          'check-ok': notiMessage[0] === true && check === true,
          'check-false': notiMessage[0] === false || check === false,
        }"
        class="input-box lg"
        @focus="notice()"
      />
      <p v-if="show && notiMessage[0] == null" class="red-txt noti">해당 목록은 필수 입력값입니다.</p>
      <p v-if="check == false" class="red-txt noti">중복된 ID입니다.</p>
      <p v-if="notiMessage[0] == false" class="red-txt noti">{{ notiMessage[1] }}</p>
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
  @Prop({ default: '' }) placeholder!: string;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: '' }) active!: string;
  @Prop({ default: false }) isvalid!: boolean | null;
  @Watch('notiMessage')
  messageChanged(val: [boolean | null, string]) {
    this.$emit('update:isvalid', this.notiMessage[0]);
  }
  text = '';
  show = false;
  @Watch('text')
  onTextChange(val: string) {
    if (checkLength(val, 1, 20) && checkEnglishNumber(val)) {
      this.notiMessage = [true, ''];
    } else if (val == '') {
      this.notiMessage = [null, ''];
    } else {
      this.notiMessage = [false, this.$t('api.valid_check_id') as string];
    }
    this.$emit('input', val);
  }
  @Watch('value')
  onValueChange(val: string) {
    this.text = val;
  }

  notiMessage: [boolean | null, string] = [null, ''];

  notice() {
    this.show = true;
  }
}
</script>
<style lang=""></style>
