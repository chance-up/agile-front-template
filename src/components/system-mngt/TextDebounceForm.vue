<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <b-form-input
        :type="type"
        :class="{ 'check-ok': check == true, 'check-false': check == false }"
        class="input-box lg"
        :placeholder="place"
        v-model="v"
        debounce="1000"
      />
      <p v-if="check == false" class="red-txt noti">???를 확인해주세요</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class TextDebounceForm extends Vue {
  @Prop({ default: null }) check!: boolean | null;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) place!: string;
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
