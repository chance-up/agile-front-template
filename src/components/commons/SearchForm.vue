<template>
  <div class="search-wrap">
    <h2 class="h2-tit">{{ $t('common.search') }}</h2>
    <template v-for="(option, index) in searchPanelOption">
      <div class="search-cont" :key="index">
        <InputBox
          v-if="option.type === 'inputBox'"
          v-model="searchData.inputBoxCondition[option.target]"
          :label="option.label"
          :placeholder="option.placeholder"
        />
        <SelectBox
          v-if="option.type === 'selectBox'"
          :label="option.label"
          :placeholder="option.placeholder"
          :selectOptions="option.selectOptions"
        />
      </div>
    </template>

    <slot name="search-btn-area" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import InputBox from '@/components/commons/search-option/InputBox.vue';
import SelectBox from '@/components/commons/search-option/SelectBox.vue';

import { SearchCondition, SearchOption } from '@/types/SearchType';

@Component({
  components: {
    InputBox,
    SelectBox,
  },
})
export default class SearchForm extends Vue {
  @Prop() public searchPanelOption!: SearchOption[];
  @Prop() public searchData!: SearchCondition;

  // created() {
  //   this.initSearchData();
  // }

  initSearchData() {
    if (this.searchPanelOption != null) {
      this.searchPanelOption.forEach((option) => {
        if (option.type === 'inputBox') {
          this.searchData.inputBoxCondition[option.target] = '';
        } else if (option.type === 'selectBox') {
          // selectbox 옵션 추가
        }
      });
    }

    console.log('initData : ', this.searchData);
  }
}
</script>
