<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <input
        type="text"
        id=""
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClass"
        v-model="inputValue"
      />
      <p v-if="validCheck !== ''" class="red-txt noti">{{ validCheck }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Watch } from 'vue-property-decorator';
@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) placeholder!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) inputClass!: string;
  @Prop({ default: '' }) validCheck!: string;
  @Prop({ default: '' }) text!: string;

  @PropSync('childValue', { type: String })
  syncedChildValue!: string;

  inputValue = null;
  @Watch('inputValue')
  onChildChanged(val: string) {
    this.syncedChildValue = val;
  }
}
</script>
