<template lang="">
  <li>
    <label for="" class="label point">{{ groupNm }}</label>
    <div class="form-cont">
      <select class="select-box" placeholder="선택해주세요" @change="handleOnChange">
        <option value="" :disabled="clickSelectbox">선택해주세요</option>
        <option v-for="(option, index) in optionList" :key="index" :selected="value === option.if_nm">
          {{ option.if_nm }}
        </option>
      </select>
    </div>
  </li>
</template>
<script lang="ts">
import { IfGrpType } from '@/types/SystemType';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SelectSysForm extends Vue {
  @Prop() groupNm!: string | null;
  @Prop({ default: () => [] }) optionList!: IfGrpType[];
  @Prop() value!: string | null;

  handleOnChange(event: any) {
    console.log(this.groupNm + ' changed => ' + event.target.value);
    this.$emit('input', event.target.value);
  }
  mounted() {
    this.clickSelectbox = true;
  }
  clickSelectbox = false;
}
</script>
