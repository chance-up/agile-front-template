<template>
  <ListLayout :title="title">
    <template slot="search-form">
      <div class="search-wrap">
        <h2 class="h2-tit">{{ $t('common.search') }}</h2>

        <!-- Input Box 옵션 -->
        <div class="search-cont">
          <InputBox v-model="searchData['nm']" :label="$t('service.name')" placeholder="입력해주세요." />
        </div>
        <div class="search-cont">
          <InputBox v-model="searchData['id']" :label="$t('service.id')" placeholder="입력해주세요." />
        </div>
        <div class="search-cont">
          <InputBox v-model="searchData['tkcgr_nm']" :label="$t('service.auth')" placeholder="입력해주세요." />
        </div>
        <button class="mid-btn" @click="searchOnClieckEvent">
          <i><img src="@/assets/search_ico.svg" :alt="$t('common.search')" /></i>{{ $t('common.search') }}
        </button>
      </div>

      <!-- Select Box 옵션 -->
      <!-- <div class="search-cont">
          <SelectBox
            v-model="searchData[target]"
            label="기본정보"
            placeholder="입력해주세요."
            :selectOptions="selectOptions"
            v-bind:value.sync="target"
          />
        </div> -->
    </template>
    <template slot="list-form">
      <ListForm :title="listTitle" :isShowProgress="isShowProgress">
        <template slot="list-btn-area">
          <button class="mid-btn" @click="$router.push({ name: 'service-register' })">
            <i><img src="@/assets/check_ico.svg" alt="등록" /></i>등록
          </button>
        </template>

        <template slot="list-table">
          <div class="tb-wrap">
            <div class="text-center" v-if="isShowProgress">
              <b-spinner label="Large Spinner"></b-spinner>
            </div>
            <table class="list-tb" v-if="!isShowProgress">
              <colgroup>
                <col width="7%" />
                <col width="18%" />
                <col width="15%" />
                <col width="12%" />
                <col width="*" />
                <col width="18%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('service.no') }}</th>
                  <th>{{ $t('service.name') }}</th>
                  <th>{{ $t('service.id') }}</th>
                  <th>{{ $t('service.authentication_method') }}</th>
                  <th>{{ $t('service.validity') }}</th>
                  <th>{{ $t('service.update') }}</th>
                  <th>{{ $t('service.action') }}</th>
                </tr>
              </thead>
              <div class="text-center">
                <b-spinner
                  v-show="isShowProgress"
                  style="width: 2rem; height: 2rem; position: absolute; left: 50%; margin-top: 2.5%"
                  label="Large Spinner"
                ></b-spinner>
              </div>
              <tbody>
                <tr v-for="(list, index) in listOption" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td @click="$router.push({ name: 'service-detail', params: { id: list.id } })">
                    <span class="bold">{{ list.nm }}</span>
                  </td>
                  <td @click="$router.push({ name: 'service-detail', params: { id: list.id } })">
                    {{ list.id }}
                  </td>
                  <td @click="$router.push({ name: 'service-detail', params: { id: list.id } })">
                    {{ list.athn.BASIC_AUTH.id == '' ? 'JWT' : 'Basic Auth' }}
                  </td>
                  <td @click="$router.push({ name: 'service-detail', params: { id: list.id } })">
                    <span>{{ list.svc_st_dt.slice(0, 10) }}</span> ~ <span>{{ list.svc_end_dt.slice(0, 10) }}</span>
                  </td>
                  <td @click="$router.push({ name: 'service-detail', params: { id: list.id } })">
                    <span>{{ list.upd_dt.slice(0, 10) }}</span
                    ><span>{{ list.upd_dt.slice(11, 19) }}</span>
                  </td>
                  <td>
                    <button class="mod-btn" @click="$router.push({ name: 'service-edit', params: { id: list.id } })">
                      <i>{{ $t('common.modify') }}</i>
                    </button>
                    <button class="del-btn" @click="modalShow(list.id)">
                      <i>{{ $t('common.delete') }}</i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <template slot="pagination">
          <Paging :pagingOption="pagination" @onChangedPage:page="onChangedPage" />
          <ModalLayout size="m" v-if="modal">
            <template v-slot:modalHeader><h1 class="h1-tit">서비스 삭제</h1> </template>
            <template v-slot:modalContainer>
              <p class="text">서비스를 삭제하시겠습니까?</p>
            </template>
            <template v-slot:modalFooter
              ><button class="lg-btn purple-btn" @click="deleteService(deleteId)">확인</button
              ><button class="lg-btn purple-btn" @click="modalHide()">취소</button>
            </template>
          </ModalLayout>
        </template>
      </ListForm>
    </template>
  </ListLayout>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import ListLayout from '@/components/layout/ListLayout.vue';
import InputBox from '@/components/commons/search-option/InputBox.vue';
import ListForm from '@/components/commons/ListForm.vue';
import ServiceModule from '@/store/modules/ServiceModule';
import { ServiceResponse } from '@/types/ServiceType';
import { SearchCondition } from '@/types/SearchType';
import { USER_STATE } from '@/store/UserState';
import { BSpinner } from 'bootstrap-vue';
import Paging from '@/components/commons/Paging.vue';
import { Pagination } from '@/types/GateWayResponse';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';

@Component({
  components: {
    ListLayout,
    ListForm,
    InputBox,
    BSpinner,
    Paging,
    ModalLayout,
  },
})
export default class ServiceManagementPage extends Vue {
  title = this.$t('service.title');
  listTitle = '서비스 리스트';
  searchData: SearchCondition = {};
  pagingData: SearchCondition = {};
  isShowProgress = true;

  serviceModule = getModule(ServiceModule, this.$store);

  get listOption(): ServiceResponse[] {
    return this.serviceModule.services;
  }

  async deleteService(ServiceId: string) {
    await this.serviceModule.deleteServiceAction(ServiceId);
    this.$router.go(0);
    this.modal = false;
  }
  searchOnClieckEvent() {
    console.log('searchData : ', this.searchData);
    if (Object.values(this.searchData).some((item) => item != '')) {
      this.$router.push({
        name: 'service',
        query: {
          nm: this.searchData.nm,
          id: this.searchData.id,
          athn: this.searchData.tkcgr_nm,
        },
      });
    } else {
      this.$modal.show('검색 데이터를 입력해주세요.');
    }
  }
  created() {
    this.serviceModule.setPagination({} as Pagination);
    if (Object.keys(this.$route.query).length > 0) {
      if (Object.keys(this.$route.query).includes('nm')) this.searchData.nm = this.$route.query.nm as string;
      if (Object.keys(this.$route.query).includes('id')) this.searchData.id = this.$route.query.id as string;
      if (Object.keys(this.$route.query).includes('athn')) this.searchData.athn = this.$route.query.athn as string;
      if (Object.keys(this.$route.query).includes('page')) this.pagingData.page = this.$route.query.page as string;
      // if (Object.keys(this.$route.query).includes('size')) this.searchData.size = Number(this.$route.query.size);
      // if (Object.keys(this.$route.query).includes('sort_by'))
      //   this.searchData.sort_by = this.$route.query.sort_by as string;
      // if (Object.keys(this.$route.query).includes('ordeer_by'))
      //   this.searchData.order_by = this.$route.query.order_by as string;

      const param = { ...this.searchData, ...this.pagingData };

      this.serviceModule.getServiceList(param);
    } else {
      this.serviceModule.getServiceList();
    }
  }

  get userState() {
    return this.serviceModule.currAsyncState;
  }

  @Watch('userState')
  onCurrAsyncStateChange(userState: USER_STATE) {
    console.log('userState : ', userState);
    if (userState === USER_STATE.LOADING) {
      this.isShowProgress = true;
    } else if (userState === USER_STATE.ERROR) {
      this.isShowProgress = false;
      this.$modal.show('서버 통신 에러');
    } else if (userState === USER_STATE.DONE) {
      this.isShowProgress = false;
    }
  }

  destroyed() {
    this.serviceModule.release();
    this.serviceModule.setServiceList([]);
    this.serviceModule.setPagination({} as Pagination);
  }

  get pagination(): Pagination {
    return this.serviceModule.pagination;
  }

  onChangedPage(page: number) {
    this.pagingData.page = String(page);
    this.getList();
  }

  getList() {
    const query = {} as SearchCondition;
    if (Object.keys(this.searchData).includes('nm')) query.nm = this.searchData.nm as string;
    if (Object.keys(this.searchData).includes('id')) query.id = this.searchData.id as string;
    if (Object.keys(this.searchData).includes('tkcgr_nm')) query.athn = this.searchData.athn as string;
    if (Object.keys(this.pagingData).includes('page')) query.page = this.pagingData.page;
    if (Object.keys(this.pagingData).includes('size')) query.size = this.pagingData.size;
    if (Object.keys(this.pagingData).includes('sort_by')) query.sort_by = this.pagingData.sort_by as string;
    if (Object.keys(this.pagingData).includes('ordeer_by')) query.order_by = this.pagingData.order_by as string;

    this.$router.push({
      name: 'service',
      query: {
        ...query,
      },
    });
  }

  modal = false;
  deleteId = '';
  modalShow(id: string) {
    this.deleteId = id;
    this.modal = true;
  }
  modalHide() {
    this.modal = false;
  }
}
</script>
