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
          <template v-slot:list-btn-area>
            <button class="mid-btn" @click="$router.push({ name: 'api-register' })">
              <i><img src="@/assets/check_ico.svg" :alt="$t('api.register')" /></i>{{ $t('api.register') }}
            </button>
          </template>
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
                <th>{{ $t('api.system') + $t('api.name') }}</th>
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
          <template v-slot:pagination>
            <Paging v-if="pagination" :pagingOption="pagination" @onChangedPage:page="onChangedPage" />
            <!-- <ModalLayout size="m" v-if="modal">
              <template v-slot:modalHeader><h1 class="h1-tit">서비스 삭제</h1> </template>
              <template v-slot:modalContainer>
                <p class="text">API를 삭제하시겠습니까?</p>
              </template>
              <template v-slot:modalFooter
                ><button class="lg-btn purple-btn" @click="deleteService(deleteId)">확인</button
                ><button class="lg-btn purple-btn" @click="modalHide()">취소</button>
              </template>
            </ModalLayout> -->
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
import ListForm from '@/components/commons/ListForm.vue';
import ListRow from '@/components/api-mngt/list/ListRow.vue';
import { ApiDetailResponse, dummyPaginationSetting } from '@/types/ApiType';
import ApiModule from '@/store/modules/ApiModule';
import { getModule } from 'vuex-module-decorators';
import SelectBox from '@/components/commons/search-option/SelectBox.vue';
import InputBox from '@/components/commons/search-option/InputBox.vue';
import { SearchCondition, SelectOptionType } from '@/types/SearchType';
import Paging from '@/components/commons/Paging.vue';
import { USER_STATE } from '@/store/UserState';
import { BSpinner } from 'bootstrap-vue';
import { Pagination } from '@/types/GateWayResponse';

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
  searchOption: { type: string; label: string; placeholder: string; selectOptions: SelectOptionType[] } = {
    type: 'selectBox',
    label: `${this.$t('api.basic')}` + `${this.$t('api.information')}`,
    placeholder: `${this.$t('api.placeholder')}`,
    selectOptions: [
      { label: 'id', value: `${this.$t('api.api')} ${this.$t('api.id')}` },
      { label: 'nm', value: `${this.$t('api.api')} ${this.$t('api.name')}` },
      { label: 'sysNm', value: `${this.$t('api.system')} ${this.$t('api.name')}` },
      { label: 'uri', value: `${this.$t('api.uri')}` },
    ],
  };
  apiModule = getModule(ApiModule, this.$store);
  searchData: SelectOptionType = {
    label: '',
    value: '',
  };
  pagingData: SearchCondition = {};

  mounted() {
    const query = this.$route.query;
    console.log('query : ', query);
    if (Object.keys(query).length > 0) {
      this.searchData.label = Object.keys(query)[0];
      this.searchData.value = query[Object.keys(query)[0]] as string;
    }
    this.apiModule.getApiList(query);
  }

  unmounted() {
    this.apiModule.reset();
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

  // for searching
  searchOnClieckEvent() {
    console.log('searchData : ', this.searchData);
    const query: { [key: string]: string } = {};
    query[this.searchData.label] = this.searchData.value;
    if (Object.values(this.searchData).some((item) => item != '')) {
      this.getList();
    } else {
      this.$modal.show('검색 데이터를 입력해주세요.');
    }
  }

  // for paging
  onChangedPage(page: number) {
    this.pagingData.page = String(page);
    this.getList();
  }

  getList() {
    const query = {} as { [key: string]: string };
    if (Object.keys(this.searchData).includes('label')) query[this.searchData.label] = this.searchData.value as string;
    if (Object.keys(this.pagingData).includes('page')) query.page = this.pagingData.page as string;
    if (Object.keys(this.pagingData).includes('size')) query.size = this.pagingData.size as string;
    if (Object.keys(this.pagingData).includes('sort_by')) query.sort_by = this.pagingData.sort_by as string;
    if (Object.keys(this.pagingData).includes('ordeer_by')) query.order_by = this.pagingData.order_by as string;

    this.$router.push({
      name: 'api',
      query: {
        ...query,
      },
    });
  }

  get pagination(): Pagination | null {
    return this.apiModule.pagination;
  }
}
</script>
