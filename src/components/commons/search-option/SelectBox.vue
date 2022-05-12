<template>
  <div>
    <label class="label">{{ label }}</label>
    <select class="select-box" @change="handleChangeTarget">
      <option v-for="(item, index) in selectOptions" :key="index" :selected="item.label == searchData.label">
        {{ item.value }}
      </option>
    </select>
    <input type="text" class="input-box" :value="value.value" @change="handleChangeSearchData" @keyup="handleKeyup" />
    <!-- @keyup="if (window.event.keyCode == 13) this.$emit('submit');" -->
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
  handleKeyup(event: any) {
    if (event.keyCode === 13) {
      this.$emit('submit');
    }
  }
  searchData: SelectOptionType = {
    label: '',
    value: '',
  };
  created() {
    this.searchData.label = this.selectOptions[0].label;
    const query = this.$route.query;

    const labels = this.selectOptions.map((value) => value.label);
    console.log(query, labels);
    Object.keys(query).map((key) => {
      console.log(key, labels.includes(key));
      if (labels.includes(key)) this.searchData.label = key as string;
    });
  }
  handleChangeTarget(event: any) {
    this.searchData.label = this.selectOptions[event.target.selectedIndex].label;
    this.searchData.value = '';
    this.$emit('input', this.searchData);
  }

  @Watch('value')
  handleChangeValue(value: SelectOptionType) {
    console.log('handleChangeValue : ', value);
    console.log('hahahahahahahah1' + JSON.stringify(this.searchData));
    this.searchData.value = value.value;
    this.searchData.label = value.label;
    console.log('hahahahahahahah2' + JSON.stringify(this.searchData));
  }
  handleChangeSearchData(event: any) {
    this.searchData.value = event.target.value;
    this.$emit('input', this.searchData);
  }
}
</script>
