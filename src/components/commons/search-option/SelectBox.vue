<template>
  <div>
    <label class="label">{{ label }}</label>
    <select class="select-box" @change="handleChangeTarget">
      <option v-for="(item, index) in selectOptions" :key="index" :selected="item.label == value.label">
        {{ item.value }}
      </option>
    </select>
    <input type="text" class="input-box" :value="value.value" @change="handleChangeSearchData" />
  </div>
</template>

<script lang="ts">
import { SelectOptionType } from '@/types/SearchType';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class SelectBox extends Vue {
  @Prop() public label!: string;
  @Prop() public placeholder!: string;
  @Prop() public selectOptions!: SelectOptionType[];
  @Prop() public value!: SelectOptionType | null;
  // made in jp
  // @Prop() public searchDataLabel!: string;
  // @Prop() public searchDataValue!: string;
  // made in jp

  // made in jp
  // checkSelectOption = {
  //   'API ID': 'id',
  //   시스템ID: 'sysId',
  //   URI: 'uri',
  // };
  // made in jp
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
    this.$emit('input', this.searchData);
  }

  @Watch('value')
  handleChangeValue(value: SelectOptionType) {
    console.log('handleChangeValue : ', value);
    this.searchData.value = value.value;
    this.searchData.label = value.label;
  }
  handleChangeSearchData(event: any) {
    this.searchData.value = event.target.value;
    this.$emit('input', this.searchData);
  }
}
</script>
