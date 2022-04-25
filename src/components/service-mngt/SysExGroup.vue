<template>
  <li>
    <label for="" class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <textarea class="textarea" :value="value" @input="$emit('input', $event.target.value)"></textarea>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync, Watch } from 'vue-property-decorator';
@Component
export default class SysExGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) value!: string;
}
</script>
