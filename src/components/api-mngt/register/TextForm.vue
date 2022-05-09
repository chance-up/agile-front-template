<template lang="">
  <li>
    <label for="" class="label" :class="{ point: required }">{{ groupNm }}</label>
    <div v-if="type == 'text'" class="form-cont">
      <input v-if="disabled" type="text" :value="value" class="input-box lg" disabled :placeholder="placeholder" />
      <input
        v-if="!disabled"
        type="text"
        class="input-box lg"
        :class="{ 'check-ok': notiMessage[0], 'check-false': !notiMessage[0] && show }"
        v-model="text"
        :placeholder="placeholder"
        @focus="notice()"
      />
      <p v-if="show && notiMessage[0] == null" class="red-txt noti">해당 목록은 필수 입력값입니다.</p>
      <p v-if="notiMessage[0] == false" class="red-txt noti">{{ notiMessage[1] }}</p>
    </div>

    <div v-if="type == 'number'" class="form-cont">
      <input
        v-if="disabled"
        type="number"
        :value="value"
        class="input-box lg disabled"
        disabled
        :placeholder="placeholder"
      />
      <input
        v-if="!disabled"
        type="number"
        id=""
        class="input-box lg"
        :class="{ 'check-ok': notiMessage[0], 'check-false': !notiMessage[0] && show }"
        v-model="num"
        :placeholder="placeholder"
      />
      <p v-if="notiMessage[0] == false" class="red-txt noti">{{ notiMessage[1] }}</p>
    </div>

    <div v-if="type == 'textarea'" class="form-cont">
      <textarea
        class="textarea"
        @input="$emit('input', $event.target.value)"
        :value="value"
        :placeholder="placeholder"
      />
    </div>
  </li>
</template>
<script lang="ts">
import { checkEnglishNumber, checkLength } from '@/utils/validation';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class TextForm extends Vue {
  @Prop() type!: string | null;
  @Prop() groupNm!: string | null;
  @Prop({ default: false }) required!: boolean | null;
  @Prop({ default: false }) disabled!: boolean;
  @Prop() value!: string | number | null;
  @Prop() placeholder!: string | null;

  mounted() {
    if (typeof this.value === 'string') {
      this.text = this.value;
    } else if (typeof this.value === 'number') {
      this.num = this.value;
    }
  }
  notiMessage: [boolean | null, string] = [null, ''];
  text = '';
  num = 15000;
  show = false;

  @Watch('text')
  onTextChange(val: string) {
    if (checkLength(val, 1, 20)) {
      this.notiMessage = [true, ''];
    } else if (val == '') {
      this.notiMessage = [null, ''];
    } else {
      this.notiMessage = [false, this.$t('api.valid_check_nm') as string];
    }
    this.$emit('input', val);
  }

  @Watch('num')
  onNumberChange(val: number) {
    console.log(this.num);
    if (val >= 1000 && val <= 30000) {
      this.notiMessage = [true, ''];
    } else {
      this.notiMessage = [false, this.$t('api.valid_check_thimeout') as string];
    }
  }
  notice() {
    this.show = true;
  }
}
</script>
