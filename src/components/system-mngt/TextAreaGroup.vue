<template>
  <li>
    <label for="" class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <textarea class="textarea" v-model="v"></textarea>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class TextAreaGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) value!: string;

  get v() {
    return this.value;
  }
  set v(val: string) {
    this.$emit('update:value', val);
  }
}
</script>
<style lang=""></style>
