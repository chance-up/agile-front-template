<template>
  <div>
    <ListLayout :title="`${this.$t('api.api')}${this.$t('api.management')}`" subTitle="API List">
      <template v-slot:search-form>
        <SearchForm :searchPanelOption="searchOption" />
      </template>
      <template v-slot:list-form>
        <ListForm title="API List" :isShowProgress="isShowProgress">
          <template v-slot:list-table>
            <colgroup>
              <col width="5%" />
              <col width="15%" />
              <col width="12%" />
              <col width="*" />
              <col width="14%" />
              <col width="13%" />
              <col width="8%" />
              <col width="10%" />
              <col width="8%" />
            </colgroup>
            <thead>
              <tr>
                <th>No.</th>
                <th>{{ $t('api.platform') + $t('api.name') }}</th>
                <th>{{ $t('api.api') + ' ' + $t('api.id') }}</th>
                <th>{{ $t('api.api') + ' ' + $t('api.name') }}</th>
                <th>{{ $t('api.method') }}</th>
                <th>{{ $t('api.uri') }}</th>
                <th>{{ $t('api.timeOut') }}<br />(ms)</th>
                <th>{{ $t('api.update') }}</th>
                <th>{{ $t('api.action') }}</th>
              </tr>
            </thead>
            <tbody>
              <ListRow v-for="(apiData, index) in apiList" :key="index" :apiData="apiData" :index="index" />
            </tbody>
          </template>
          <template slot="pagination">
            <Pagination />
          </template>
        </ListForm>
      </template>
    </ListLayout>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import ListLayout from '@/components/layout/ListLayout.vue';
import SearchForm from '@/components/api-mngt/list/SearchForm.vue';
import ListForm from '@/components/api-mngt/list/ListForm.vue';
import ListRow from '@/components/api-mngt/list/ListRow.vue';
import { ApiDetailResponse } from '@/types/ApiType';
import ApiModule from '@/store/modules/ApiModule';
import { getModule } from 'vuex-module-decorators';
import Pagination from '@/components/commons/Pagination.vue';

@Component({
  components: {
    ContentLayout,
    ListLayout,
    SearchForm,
    ListForm,
    ListRow,
    Pagination,
  },
})
export default class ApiPage extends Vue {
  searchOption = [
    {
      type: 'selectBox',
      label: `${this.$t('api.basic')}` + `${this.$t('api.information')}`,
      placeholder: `${this.$t('api.placeholder')}`,
      selectOptions: [
        `${this.$t('api.api')} ${this.$t('api.id')}`,
        `${this.$t('api.api')} ${this.$t('api.name')}`,
        `${this.$t('api.platform')}${this.$t('api.name')}`,
        `${this.$t('api.uri')}`,
      ],
    },
  ];
  apiModule = getModule(ApiModule, this.$store);
  isShowProgress = false;

  created() {
    this.apiModule.getApiList();
  }
  destroyed() {
    this.apiModule.reset();
  }

  get apiList(): ApiDetailResponse[] {
    console.log(this.apiModule.apiList);
    return this.apiModule.apiList;
  }
}
</script>
