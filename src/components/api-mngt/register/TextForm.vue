<template lang="">
  <li>
    <label for="" class="label" :class="{ point: required }">{{ groupNm }}</label>
    <div v-if="type == 'text'" class="form-cont">
      <input v-if="disabled" type="text" :value="value" class="input-box lg" :class="{ 'check-ok': check }" disabled />
      <input
        v-if="!disabled"
        type="text"
        id=""
        class="input-box lg"
        :class="{ 'check-ok': check }"
        :value="formValue"
        @input="$emit('input', $event.target.value)"
      />
    </div>

    <div v-if="type == 'number'" class="form-cont">
      <input
        v-if="disabled"
        type="number"
        :value="value"
        class="input-box lg disabled"
        :class="{ 'check-ok': check }"
        disabled
      />
      <input
        v-if="!disabled"
        type="number"
        id=""
        class="input-box lg"
        :class="{ 'check-ok': check }"
        :value="formValue"
        @input="$emit('input', $event.target.value)"
      />
    </div>

    <div v-if="type == 'textarea'" class="form-cont">
      <textarea class="textarea" @input="$emit('input', $event.target.value)" :value="value" />
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class TextForm extends Vue {
  @Prop() type!: string | null;
  @Prop() groupNm!: string | null;
  @Prop({ default: false }) check!: boolean | null;
  @Prop({ default: false }) required!: boolean | null;
  @Prop({ default: false }) disabled!: boolean;
  @Prop() value!: number | null;

  formValue = 0;
  mounted() {
    this.formValue = this.value as number;
  }
}
</script>
