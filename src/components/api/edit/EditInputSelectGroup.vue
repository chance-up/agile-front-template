<template lang="">
  <li>
    <label for="" :class="{ label: true, point: point }">{{ inputNm }}</label>
    <div class="form-cont">
      <input
        v-if="inputCondition"
        type="text"
        id=""
        :class="cssClass"
        :placeholder="place"
        :disabled="disabled"
        :value="value"
      />
      <select v-if="selectCondition" :class="cssClass" :disabled="disabled">
        <option v-for="(option, index) in options" :key="index">{{ option }}</option>
      </select>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EditInputSelectGroup extends Vue {
  @Prop() public inputNm!: string | null;
  @Prop() public options!: [string] | [number] | null;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: false }) point!: boolean;
  @Prop({ default: false }) inputCondition!: boolean;
  @Prop({ default: false }) selectCondition!: boolean;
  @Prop({ default: '' }) cssClass!: string;
  @Prop({ default: '' }) place!: string;
  @Prop({ default: '' }) value!: string;
}
</script>
