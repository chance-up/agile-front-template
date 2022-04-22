<template>
  <li>
    <label for="" class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <textarea class="textarea" v-model="inputValue"></textarea>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync, Watch } from 'vue-property-decorator';
@Component
export default class SysExGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;

  @PropSync('childValue', { type: String })
  syncedChildValue!: string;

  inputValue = null;
  @Watch('inputValue')
  onChildChanged(val: string) {
    this.syncedChildValue = val;
  }
}
</script>
