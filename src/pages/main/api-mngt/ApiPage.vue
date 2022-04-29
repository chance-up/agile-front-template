<template>
  <div>
    <ListLayout :title="`${this.$t('api.api')}${this.$t('api.management')}`" subTitle="API List">
      <template slot="search-form">
        <div class="search-wrap">
          <h2 class="h2-tit">{{ $t('common.search') }}</h2>
          <div class="search-cont">
            <SelectBox v-model="searchData" :label="searchOption.label" :selectOptions="searchOption.selectOptions" />
          </div>

          <button class="mid-btn" @click="searchOnClieckEvent">
            <i><img src="@/assets/search_ico.svg" :alt="$t('common.search')" /></i>{{ $t('common.search') }}
          </button>
        </div>
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
            <div class="text-center">
              <b-spinner
                v-show="isShowProgress"
                style="width: 2rem; height: 2rem; position: absolute; left: 50%"
                label="Large Spinner"
              ></b-spinner>
            </div>
            <tbody>
              <ListRow v-for="(apiData, index) in apiList" :key="index" :apiData="apiData" :index="index" />
            </tbody>
          </template>
          <template slot="pagination">
            <Paging />
          </template>
        </ListForm>
      </template>
    </ListLayout>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import ListLayout from '@/components/layout/ListLayout.vue';
import SearchForm from '@/components/api-mngt/list/SearchForm.vue';
import ListForm from '@/components/api-mngt/list/ListForm.vue';
import ListRow from '@/components/api-mngt/list/ListRow.vue';
import { ApiDetailResponse } from '@/types/ApiType';
import ApiModule from '@/store/modules/ApiModule';
import { getModule } from 'vuex-module-decorators';
import SelectBox from '@/components/commons/search-option/SelectBox.vue';
import InputBox from '@/components/commons/search-option/InputBox.vue';
import { SelectOptionType } from '@/types/SearchType';
import Paging from '@/components/commons/Paging.vue';
import { USER_STATE } from '@/store/UserState';
import { BSpinner } from 'bootstrap-vue';

@Component({
  components: {
    ContentLayout,
    ListLayout,
    SearchForm,
    ListForm,
    ListRow,
    SelectBox,
    InputBox,
    Paging,
    BSpinner,
  },
})
export default class ApiPage extends Vue {
  searchOption = {
    type: 'selectBox',
    label: `${this.$t('api.basic')}` + `${this.$t('api.information')}`,
    placeholder: `${this.$t('api.placeholder')}`,
    selectOptions: [
      `${this.$t('api.api')} ${this.$t('api.id')}`,
      `${this.$t('api.api')} ${this.$t('api.name')}`,
      `${this.$t('api.platform')}${this.$t('api.name')}`,
      `${this.$t('api.uri')}`,
    ],
  };
  apiModule = getModule(ApiModule, this.$store);
  searchData: SelectOptionType = {
    label: '',
    value: '',
  };
  mounted() {
    const query = this.$route.query;
    console.log('query : ', query);
    if (Object.keys(query).length > 0) {
      this.searchData.label = Object.keys(query)[0];
      this.searchData.value = query[Object.keys(query)[0]] as string;
    }
    this.apiModule.getApiList(query);
  }
  destroyed() {
    this.apiModule.reset();
  }
  searchOnClieckEvent() {
    console.log('searchData : ', this.searchData);
    const query: { [key: string]: string } = {};
    query[this.searchData.label] = this.searchData.value;
    console.log(query);
    if (Object.values(this.searchData).some((item) => item != '')) {
      this.$router.push({
        name: 'api',
        query,
      });
    } else {
      this.$modal.show('검색 데이터를 입력해주세요.');
    }
  }
  get apiList(): ApiDetailResponse[] {
    console.log(this.apiModule.apiList);
    return this.apiModule.apiList;
  }
  // for progress
  isShowProgress = false;
  get userState() {
    return this.apiModule.currAsyncState;
  }
  @Watch('userState')
  onCurrAsyncStateChange(userState: USER_STATE) {
    console.log('userState : ', userState);
    if (userState === USER_STATE.LOADING) {
      this.isShowProgress = true;
    } else if (userState === USER_STATE.ERROR) {
      this.$modal.show('서버 통신 에러');
    } else if (userState === USER_STATE.DONE) {
      this.isShowProgress = false;
    }
  }
}
</script>
