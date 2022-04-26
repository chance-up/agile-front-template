<template lang="">
  <li>
    <label for="" class="label" :class="{ point: required }">{{ groupNm }}</label>

    <div v-if="type == 'text'" class="form-cont">
      <b-form-input
        class="input-box lg"
        :class="{ 'check-ok': check == true, 'check-false': check == false }"
        debounce="1000"
        v-model="formValue"
      />
    </div>

    <div v-if="type == 'textarea'" class="form-cont">
      <textarea class="textarea"></textarea>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class TextDebounceForm extends Vue {
  @Prop() type!: string | null;
  @Prop() groupNm!: string | null;
  @Prop({ default: null }) check!: boolean | null;
  @Prop({ default: false }) required!: boolean | null;
  // @Prop({ default: '' }) value!: string;
  formValue = '';
  @Watch('formValue')
  onValueChange(val: string) {
    console.log('input changed => ' + val);
    this.$emit('input', val);
  }
}
</script>
