<template>
  <div>
    <ListLayout :title="`${this.$t('api.apiManagement')}`" subTitle="API List">
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
        <ListForm title="API List">
          <template v-slot:list-btn-area>
            <button class="mid-btn" @click="$router.push({ name: 'api-register' })">
              <i><img src="@/assets/check_ico.svg" :alt="$t('common.register')" /></i>{{ $t('common.register') }}
            </button>
          </template>
          <template v-slot:list-table>
            <div class="tb-wrap">
              <div class="text-center" v-if="isShowProgress">
                <b-spinner label="Large Spinner"></b-spinner>
              </div>
              <table class="list-tb" v-if="!isShowProgress">
                <colgroup>
                  <col width="5%" />
                  <col width="15%" />
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
                    <th>{{ $t('api.sysId') }}</th>
                    <th>{{ $t('api.apiId') }}</th>
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
                  <ListRow
                    v-for="(apiData, index) in apiList"
                    :key="index"
                    :apiData="apiData"
                    :index="index"
                    @deleteApi="
                      (msg) => {
                        emitDelApi(msg);
                      }
                    "
                  />
                  <!-- @deleteApi="test(msg)" -->
                  <!-- <ListRow :key="0" :apiData="apiList[0]" :index="0" @deleteApi="test" /> -->
                </tbody>
              </table>
            </div>
          </template>
          <template v-slot:pagination v-if="!isShowProgress">
            <Paging v-if="pagination" :pagingOption="pagination" @onChangedPage:page="onChangedPage" />
            <ModalLayout size="m" v-if="showModal">
              <template v-slot:modalHeader><h1 class="h1-tit">API 삭제</h1> </template>
              <template v-slot:modalContainer>
                <p class="text">{{ deleteMsg }}를 삭제하시겠습니까?</p>
              </template>
              <template v-slot:modalFooter
                ><button class="lg-btn purple-btn" @click="deleteApi(deleteMsg)" :disabled="isModalProgress">
                  {{ $t('common.ok')
                  }}<b-spinner variant="light" label="Spinning" v-if="isModalProgress" small></b-spinner>
                </button>
                <button class="lg-btn white-btn" @click="showModal = false" :disabled="isModalProgress">
                  {{ $t('common.cancel') }}
                </button>
              </template>
            </ModalLayout>
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
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';

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
    ModalLayout,
  },
})
export default class ApiPage extends Vue {
  showModal = false;
  isModalProgress = false;
  isShowProgress = false;
  deleteMsg = '';
  emitDelApi(msg: string) {
    this.deleteMsg = msg;
    // console.log(msg + ' 를 삭제하시겠습니까?');
    this.showModal = true;
  }
  searchOption: { type: string; label: string; placeholder: string; selectOptions: SelectOptionType[] } = {
    type: 'selectBox',
    label: `${this.$t('api.basicInformation')}`,
    placeholder: `${this.$t('api.placeholder')}`,
    selectOptions: [
      { label: 'id', value: `${this.$t('api.apiId')}` },
      { label: 'sysId', value: `${this.$t('api.sysId')}` },
      { label: 'uri', value: `${this.$t('api.uri')}` },
    ],
  };
  apiModule = getModule(ApiModule, this.$store);
  searchData: SelectOptionType = {
    label: '',
    value: '',
  };
  pagingData: SearchCondition = {};

  searchDataLabel = '';
  searchDataValue = '';
  created() {
    this.isShowProgress = true;
    this.apiModule.apiReset();
    const query = this.$route.query;
    console.log('query : ', query);
    if (Object.keys(query).length > 0) {
      console.log('query 추가', query);
      this.searchData.label = Object.keys(query)[0];
      this.searchData.value = query[Object.keys(query)[0]] as string;
      console.log(this.searchData);
      // made in jp
      // this.searchDataLabel = Object.keys(query)[0];
      // this.searchDataValue = query[Object.keys(query)[0]] as string;
      // made in jp
    }
    this.apiModule
      .getApiList(query)
      .then(() => {
        this.isShowProgress = false;
      })
      .catch((error) => {
        this.isShowProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }

  destroyed() {
    this.apiModule.release();
  }

  get apiList(): ApiDetailResponse[] {
    console.log(this.apiModule.apiList);
    return this.apiModule.apiList;
  }

  async deleteApi(apiId: string) {
    // await this.serviceModule.deleteServiceAction(ServiceId);
    this.isModalProgress = true;
    await this.apiModule.deleteApi(apiId);
    this.showModal = false;
    this.isModalProgress = false;
    this.$router.go(0);
  }

  // for searching
  searchOnClieckEvent() {
    console.log('searchData : ', this.searchData);
    const query: { [key: string]: string } = {};
    query[this.searchData.label] = this.searchData.value;
    console.log(JSON.stringify(query));
    console.log(JSON.stringify(this.$route.query));
    if (JSON.stringify(query) === JSON.stringify(this.$route.query)) {
      this.$router.go(0);
    } else if (Object.values(this.searchData).some((item) => item.value != '')) {
      this.getList();
    } else {
      this.$modal.show(`${this.$t('api.enter_search_data')}`);
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
    return this.apiModule.apiPagination;
  }
}
</script>
