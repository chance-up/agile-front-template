<template>
  <li>
    <label for="" class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <input :type="type" class="input-box lg" :placeholder="place" v-model="v" @focus="emptyChkFunc" />
      <p v-if="notiMessage[0] == false" class="red-txt noti">{{ notiMessage[1] }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { checkEmpty } from '@/utils/validation';

@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) place!: string;
  @Prop({ default: false }) isvalid!: boolean | null;

  notiMessage: [boolean | null, string] = [null, ''];

  @Watch('notiMessage')
  messageChanged() {
    this.$emit('update:isvalid', this.notiMessage[0]);
  }

  get v() {
    return this.value;
  }

  set v(val: string) {
    switch (this.inputNm) {
      case this.$t('login.id'):
        if (val == '') {
          this.notiMessage = [false, this.$t('my.empty_check') as string];
        } else {
          this.notiMessage = [true, ''];
        }
        break;
      case this.$t('login.pwd'):
        if (val == '') {
          this.notiMessage = [false, this.$t('my.empty_check') as string];
        } else {
          this.notiMessage = [true, ''];
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
