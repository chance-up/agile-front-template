<template>
  <div>
    <label class="label">{{ label }}</label>
    <select class="select-box" @change="handleChangeTarget">
      <option v-for="(item, index) in selectOptions" :key="index">
        {{ item.value }}
      </option>
    </select>
    <input type="text" class="input-box" v-model="searchData.value" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import { ApiSearchLabel } from '@/types/ApiType';
import { SelectOptionType } from '@/types/SearchType';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class SelectBox extends Vue {
  @Prop() public label!: string;
  @Prop() public placeholder!: string;
  @Prop() public selectOptions!: SelectOptionType[];
  @Prop() public value!: SelectOptionType;
  handle(item: any) {
    console.log(item);
  }
  searchData: SelectOptionType = {
    label: '',
    value: '',
  };
  created() {
    this.searchData.label = this.selectOptions[0].label;
  }
  handleChangeTarget(event: any) {
    this.searchData.label = this.selectOptions[event.target.selectedIndex].label;
    this.searchData.value = '';
    console.log('handleChangeTarget : ', this.searchData);
  }

  @Watch('value')
  handleChangeValue(value: SelectOptionType) {
    this.searchData.value = value.value;
    this.searchData.label = value.label;
  }
  @Watch('searchData.value')
  handleChangeSearchData() {
    this.$emit('input', this.searchData);
  }
}
</script>
