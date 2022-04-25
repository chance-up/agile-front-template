<template>
  <div class="search-wrap">
    <h2 class="h2-tit">검색</h2>
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

    <slot name="search-btn-area" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import InputBox from '@/components/commons/search-option/InputBox.vue';
import SelectBox from '@/components/commons/search-option/SelectBox.vue';

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
