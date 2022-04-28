<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="text"
        :class="{
          'check-ok': notiMessage[0] === true,
          'check-false': notiMessage[0] === false,
        }"
        class="input-box lg"
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
  @Prop({ default: '' }) placeholder!: string;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: '' }) active!: string;
  text = '';
  @Watch('text')
  onValueChange(val: string) {
    switch (this.inputNm) {
      case this.$t('service.name'):
        if (checkLength(val, 1, 20) && checkEnglishNumber(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('service.valid_check_nm') as string];
        }
        break;
      case this.$t('service.id'):
        if (checkLength(val, 1, 20) && checkEnglishNumber(val)) {
          this.notiMessage = [true, ''];
        } else if (val == '') {
          this.notiMessage = [null, ''];
        } else {
          this.notiMessage = [false, this.$t('service.valid_check_id') as string];
        }
    }
    console.log('input changed => ' + val);
    this.$emit('input', val);
  }

  notiMessage: [boolean | null, string] = [null, ''];
}
</script>
<style lang=""></style>
