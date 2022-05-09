<template lang="">
  <li>
    <label for="" class="label point">{{ groupNm }}</label>
    <div class="form-cont">
      <select class="select-box" placeholder="선택해주세요" @change="handleOnChange" defalut="">
        <option value="" :disabled="clickSelectbox">선택해주세요</option>
        <option v-for="(option, index) in optionList" :key="index">{{ option }}</option>
      </select>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SelectForm extends Vue {
  @Prop() groupNm!: string | null;
  @Prop() optionList!: string[] | null;
  @Prop() value!: string | null;

  mounted() {
    this.clickSelectbox = true;
  }
  clickSelectbox = false;
  handleOnChange(event: any) {
    console.log(this.groupNm + ' changed => ' + event.target.value);
    this.$emit('input', event.target.value);
  }
}
</script>
