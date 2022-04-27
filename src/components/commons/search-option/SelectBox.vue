<template>
  <div>
    <label class="label">{{ label }}</label>
    <select class="select-box" @change="update">
      <option v-for="(item, index) in selectOptions" :key="index" :value="item.value">
        {{ item.label }}
      </option>
    </select>
    <input type="text" class="input-box" :value="value" @input="inputTxt" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SelectBox extends Vue {
  @Prop() public label!: string;
  @Prop() public placeholder!: string;
  @Prop() public selectOptions!: string[];
  @Prop() public value!: string;

  update($event: any) {
    console.log('selected: ', $event.target.value);
    this.$emit('update:value', $event.target.value);
  }

  inputTxt($event: any) {
    this.$emit('input', $event.target.value);
  }
}
</script>
