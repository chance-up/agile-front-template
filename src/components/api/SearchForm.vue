<template>
  <!------- 검색 -------->
  <div class="search-wrap">
    <h2 class="h2-tit">{{ this.$t('api.search') }}</h2>
    <template v-for="(option, index) in searchPanelOption">
      <div class="search-cont" :key="index">
        <InputBox v-if="option.type === 'inputBox'" :label="option.label" :placeholder="option.placeholder" />

        <SelectBox
          v-if="option.type === 'selectBox'"
          :label="option.label"
          :placeholder="option.placeholder"
          :selectOptions="option.selectOptions"
        />
      </div>
    </template>

    <button class="mid-btn">
      <i><img src="@/assets/search_ico.svg" :alt="this.$t('api.search')" /></i>Search
    </button>
  </div>
  <!------- // 검색 -------->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import InputBox from '@/components/api/search-option/InputBox.vue';
import SelectBox from '@/components/api/search-option/SelectBox.vue';

@Component({
  components: {
    InputBox,
    SelectBox,
  },
})
export default class SystemManagement extends Vue {
  @Prop() public searchPanelOption!: object[] | null;
}
</script>
