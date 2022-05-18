<template>
  <div>
    <ListLayout :title="`${this.$t('api.apiManagement')}`" subTitle="API List">
      <template slot="search-form">
        <div class="search-wrap">
          <h2 class="h2-tit">{{ $t('common.search') }}</h2>
          <div class="search-cont">
            <SelectBox
              :searchTarget.sync="searchTarget"
              :searchValue.sync="searchValue"
              :label="searchOption.label"
              :selectOptions="searchOption.selectOptions"
              @submit="searchOnClieckEvent"
            />
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
                <caption>
                  API ID, Method, URI, Time out, Update, 수정, 삭제 항목 테이블
                </caption>
                <colgroup>
                  <col width="7%" />
                  <col width="18%" />
                  <col width="16%" />
                  <col width="*" />
                  <col width="10%" />
                  <col width="13%" />
                  <col width="10%" />
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
                <tbody v-if="apiList.length > 0">
                  <ListRow
                    v-for="(apiData, index) in apiList"
                    :key="index"
                    :apiData="apiData"
                    :index="index"
                    :pagination="pagination"
                    @deleteApi="
                      (msg) => {
                        handleOndeleteApi(msg);
                      }
                    "
                  />
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="8">{{ $t('common.no_data') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template v-slot:pagination v-if="!isShowProgress">
            <Paging
              v-if="pagination"
              :pagingOption="pagination"
              :isListEmpty="isListEmpty"
              @onChangedPage:page="onChangedPage"
            />
            <ModalLayout size="m" v-if="showModal">
              <template v-slot:modalHeader><h1 class="h1-tit">API 삭제</h1> </template>
              <template v-slot:modalContainer>
                <p class="text">{{ deleteMsg.id }}를 삭제하시겠습니까?</p>
              </template>
              <template v-slot:modalFooter
                ><button class="lg-btn purple-btn" @click="deleteApi" :disabled="isModalProgress">
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
import { ApiDetailResponse } from '@/types/ApiType';
import ApiModule from '@/store/modules/ApiModule';
import { getModule } from 'vuex-module-decorators';
import SelectBox from '@/components/commons/search-option/SelectBox.vue';
import InputBox from '@/components/commons/search-option/InputBox.vue';
import { SearchCondition, SelectOptionType } from '@/types/SearchType';
import Paging from '@/components/commons/Paging.vue';
import { BSpinner } from 'bootstrap-vue';
import { Pagination } from '@/types/GateWayResponse';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import SystemModule from '@/store/modules/SystemModule';
import axios from 'axios';

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
  isListEmpty = false;
  deleteMsg = { id: '', sysId: '' };
  handleOndeleteApi(msg: { id: string; sysId: string }) {
    this.deleteMsg = msg;
    this.showModal = true;
  }
  searchOption: { type: string; label: string; placeholder: string; selectOptions: SelectOptionType[] } = {
    type: 'selectBox',
    label: `${this.$t('api.basicInformation')}`,
    placeholder: `${this.$t('api.placeholder')}`,
    selectOptions: [
      { label: 'id', value: `${this.$t('api.apiId')}` },
      { label: 'sysId', value: `${this.$t('api.sysId')}` },
      { label: 'uriIn', value: `${this.$t('api.uri')}` },
    ],
  };
  apiModule = getModule(ApiModule, this.$store);
  searchTarget = 'id';
  searchValue = '';

  pagingData: SearchCondition = {};

  mounted() {
    this.fetchApiList();
  }
  // created() {
  //   this.fetchApiList();
  // }
  // updated() {
  //   this.fetchApiList();
  // }
  destroyed() {
    this.apiModule.release();
  }

  @Watch('apiList')
  onApiListChanged() {
    if (this.apiList.length === 0) {
      this.isListEmpty = true;
    } else {
      this.isListEmpty = false;
    }
  }

  fetchApiList() {
    this.isShowProgress = true;
    this.apiModule.apiReset();
    const query = this.$route.query;
    console.log('query : ', query);
    if (Object.keys(query).length > 0) {
      console.log('query 추가', query);
      this.searchTarget = Object.keys(query)[0];
      this.searchValue = query[this.searchTarget] as string;
      console.log(this.searchTarget, this.searchValue);
    }
    this.apiModule
      .getApiList(query)
      .then(() => {
        this.isShowProgress = false;
      })
      .catch(() => {
        this.isShowProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }

  get apiList(): ApiDetailResponse[] {
    console.log(this.apiModule.apiList);
    return this.apiModule.apiList;
  }

  async deleteApi() {
    // await this.serviceModule.deleteServiceAction(ServiceId);
    const query = { id: this.deleteMsg.id, sysId: this.deleteMsg.sysId };
    this.isModalProgress = true;
    await this.apiModule
      .deleteApi(query)
      .then(() => {
        this.showModal = false;
        this.isModalProgress = false;
        this.$toast.success(this.$t('common.delete_success'), {
          toastClassName: ['toast-success-custom-class'],
        });
      })
      .catch((error) => {
        this.showModal = false;
        this.isModalProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });

    this.fetchApiList();
  }

  // for searching
  searchOnClieckEvent() {
    console.log(this.searchTarget, this.searchValue);
    const query: { [key: string]: string } = {};
    query[this.searchTarget] = this.searchValue;
    if (this.searchValue === '') {
      this.$modal.show(`${this.$t('api.enter_search_data')}`);
    } else if (JSON.stringify(query) === JSON.stringify(this.$route.query)) {
      this.fetchApiList();
    } else {
      this.getList();
    }
  }

  // for paging
  onChangedPage(page: number) {
    this.pagingData.page = String(page);
    this.getList();
  }

  getList() {
    const query = {} as { [key: string]: string };
    if (this.searchTarget) query[this.searchTarget] = this.searchValue;
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
