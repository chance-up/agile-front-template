<template lang="">
  <li>
    <label for="" class="label point">{{ groupNm }}</label>
    <div class="form-cont">
      <select class="select-box" placeholder="선택해주세요" @change="handleOnChange">
        <option v-for="(option, index) in optionList" :key="index">{{ option.if_nm }}</option>
        <!-- <option v-for="(option, index) in optionList" :key="index">이진솔</option> -->
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
  @Prop() optionList!: IfGrpType[];

  created() {
    if (this.optionList != null) {
      this.$emit('input', this.optionList.length > 0 ? this.optionList[0].if_nm : '');
    }
  }
  handleOnChange(event: any) {
    console.log(this.groupNm + ' changed => ' + event.target.value);
    this.$emit('input', event.target.value);
  }
}
</script>
