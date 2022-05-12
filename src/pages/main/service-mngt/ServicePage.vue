<template>
  <ListLayout :title="$t('service.title')">
    <template slot="search-form">
      <div class="search-wrap">
        <h2 class="h2-tit">{{ $t('common.search') }}</h2>

        <!-- Input Box 옵션 -->
        <div class="search-cont">
          <InputBox
            v-model="searchData['nm']"
            :label="$t('service.name')"
            placeholder="입력해주세요."
            @submit="searchOnClieckEvent"
          />
        </div>
        <div class="search-cont">
          <InputBox
            v-model="searchData['id']"
            :label="$t('service.id')"
            placeholder="입력해주세요."
            @submit="searchOnClieckEvent"
          />
        </div>
        <div class="search-cont">
          <InputBox
            v-model="searchData['athnType']"
            :label="$t('service.auth')"
            placeholder="입력해주세요."
            @submit="searchOnClieckEvent"
          />
        </div>
        <button class="mid-btn" @click="searchOnClieckEvent">
          <i><img src="@/assets/search_ico.svg" :alt="$t('common.search')" /></i>{{ $t('common.search') }}
        </button>
      </div>
    </template>
    <template slot="list-form">
      <ListForm :title="$t('service.list_title')" :isShowProgress="isShowProgress">
        <template slot="list-btn-area">
          <button class="mid-btn" @click="$router.push({ name: 'service-register' })">
            <i><img src="@/assets/check_ico.svg" alt="등록" /></i>{{ $t('common.register') }}
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
                <col width="20%" />
                <col width="13%" />
                <col width="*" />
                <col width="17%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('service.no') }}</th>
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
                    {{ list.id }}
                  </td>
                  <td @click="$router.push({ name: 'service-detail', params: { id: list.id } })">
                    {{ list.athnType }}
                  </td>
                  <td @click="$router.push({ name: 'service-detail', params: { id: list.id } })">
                    <span>{{ list.svcStDt.slice(0, 10) }}</span> ~ <span>{{ list.svcEndDt.slice(0, 10) }}</span>
                  </td>
                  <td @click="$router.push({ name: 'service-detail', params: { id: list.id } })">
                    <span>{{ list.updDt.slice(0, 10) }}</span
                    ><span>{{ list.updDt.slice(0, 10) }}</span>
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
            <template v-slot:modalHeader
              ><h1 class="h1-tit">{{ $t('service.delete') }}</h1>
            </template>
            <template v-slot:modalContainer>
              <p class="text">{{ $t('service.delete_message') }}</p>
            </template>
            <template v-slot:modalFooter
              ><button class="lg-btn purple-btn" @click="deleteService(deleteId)" :disabled="isRegisterProgress">
                {{ $t('common.ok') }}
                <b-spinner variant="light" v-show="isRegisterProgress" small></b-spinner></button
              ><button class="lg-btn white-btn" @click="modalHide()" :disabled="isRegisterProgress">
                {{ $t('common.cancel') }}
              </button>
            </template>
          </ModalLayout>
        </template>
      </ListForm>
    </template>
  </ListLayout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import ListLayout from '@/components/layout/ListLayout.vue';
import InputBox from '@/components/commons/search-option/InputBox.vue';
import ListForm from '@/components/commons/ListForm.vue';
import ServiceModule from '@/store/modules/ServiceModule';
import { ServiceResponse } from '@/types/ServiceType';
import { SearchCondition } from '@/types/SearchType';
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
  searchData: SearchCondition = {};
  pagingData: SearchCondition = {};
  isShowProgress = true;
  isRegisterProgress = false;
  serviceModule = getModule(ServiceModule, this.$store);

  get listOption(): ServiceResponse[] {
    return this.serviceModule.services;
  }

  deleteService(ServiceId: string) {
    this.isRegisterProgress = true;
    this.serviceModule
      .deleteServiceAction(ServiceId)
      .then(() => {
        this._getServiceList();
        this.modal = false;
      })
      .catch(() => {
        this.isRegisterProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }
  searchOnClieckEvent() {
    if (Object.values(this.searchData).some((item) => item != '')) {
      this.getList();
    } else {
      this.$modal.show(`${this.$t('service.enter_search_data')}`);
    }
  }

  created() {
    this._getServiceList();
  }
  _getServiceList() {
    this.serviceModule.serviceReset();

    this.isShowProgress = true;
    this.serviceModule.setServicePagination({} as Pagination);
    if (Object.keys(this.$route.query).length > 0) {
      if (Object.keys(this.$route.query).includes('nm')) this.searchData.nm = this.$route.query.nm as string;
      if (Object.keys(this.$route.query).includes('id')) this.searchData.id = this.$route.query.id as string;
      if (Object.keys(this.$route.query).includes('athnType'))
        this.searchData.athnType = this.$route.query.athnType as string;
      if (Object.keys(this.$route.query).includes('page')) this.pagingData.page = this.$route.query.page as string;
      const param = { ...this.searchData, ...this.pagingData };

      this.serviceModule
        .getServiceList(param)
        .then(() => {
          this.isShowProgress = false;
        })
        .catch((error) => {
          this.isShowProgress = false;
          this.$modal.show(error);
        });
    } else {
      this.serviceModule
        .getServiceList()
        .then(() => {
          this.isShowProgress = false;
        })
        .catch((error) => {
          this.isShowProgress = false;
          this.$modal.show(error);
        });
    }
  }

  destroyed() {
    this.serviceModule.release();
  }

  get pagination(): Pagination {
    return this.serviceModule.servicePagination;
  }

  onChangedPage(page: number) {
    this.pagingData.page = String(page);
    this.getList();
  }

  getList() {
    const query = {} as SearchCondition;
    if (Object.keys(this.searchData).includes('nm')) query.nm = this.searchData.nm as string;
    if (Object.keys(this.searchData).includes('id')) query.id = this.searchData.id as string;
    if (Object.keys(this.searchData).includes('athnType')) query.athnType = this.searchData.athnType as string;
    if (Object.keys(this.pagingData).includes('page')) query.page = this.pagingData.page;
    if (Object.keys(this.pagingData).includes('size')) query.size = this.pagingData.size;
    if (Object.keys(this.pagingData).includes('sort_by')) query.sort_by = this.pagingData.sort_by as string;
    if (Object.keys(this.pagingData).includes('ordeer_by')) query.order_by = this.pagingData.order_by as string;

    if (Object.is(JSON.stringify(this.$router.currentRoute.query), JSON.stringify(query))) {
      this._getServiceList();
    } else {
      this.$router.push({
        name: 'service',
        query: {
          ...query,
        },
      });
    }
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
