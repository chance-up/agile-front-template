<template lang="">
  <li>
    <label for="" class="label point">{{ groupNm }}</label>
    <div class="form-cont">
      <select class="select-box" placeholder="선택해주세요">
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
}
</script>
