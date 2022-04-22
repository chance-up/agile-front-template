<template lang="">
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <select class="select-box disable" :disabled="disabled">
        <option v-for="(option, index) in options" :key="index">{{ option }}</option>
      </select>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InfoSelectGroup extends Vue {
  @Prop() public inputNm!: string | null;
  @Prop() public options!: [string] | [number] | null;
  @Prop({ default: false }) disabled!: boolean;
}
</script>
