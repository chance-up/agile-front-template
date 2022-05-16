<template>
  <ListLayout :title="$t('system.list_top_title')">
    <template slot="search-form">
      <div class="search-wrap">
        <h2 class="h2-tit">{{ $t('common.search') }}</h2>

        <!-- Input Box 옵션 -->
        <div class="search-cont">
          <InputBox
            v-model="searchData['id']"
            :label="$t('system.id')"
            :placeholder="$t('common.placeholder')"
            @submit="searchOnClieckEvent"
          />
        </div>
        <div class="search-cont">
          <InputBox
            v-model="searchData['tkcgr_nm']"
            :label="$t('system.tkcgrNm')"
            :placeholder="$t('common.placeholder')"
            @submit="searchOnClieckEvent"
          />
        </div>
        <button class="mid-btn" @click="searchOnClieckEvent">
          <i><img src="@/assets/search_ico.svg" :alt="$t('common.search')" /></i>{{ $t('common.search') }}
        </button>
      </div>
    </template>
    <template slot="list-form">
      <ListForm :title="$t('system.list_cont_title')">
        <template slot="list-btn-area">
          <button class="mid-btn" @click="registerOnClickEvent">
            <i><img src="@/assets/check_ico.svg" :alt="$t('common.register')" /></i>{{ $t('common.register') }}
          </button>
        </template>
        <template slot="list-table">
          <div class="tb-wrap">
            <div class="text-center" v-if="isShowProgress">
              <b-spinner label="Large Spinner"></b-spinner>
            </div>
            <table class="list-tb" v-if="!isShowProgress">
              <colgroup>
                <col width="10%" />
                <col width="*" />
                <col width="12%" />
                <col width="27%" />
                <col width="15%" />
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('system.no') }}</th>
                  <th>{{ $t('system.id') }}</th>
                  <th>{{ $t('system.tkcgrNm') }}</th>
                  <th>{{ $t('system.update') }}</th>
                  <th>{{ $t('system.action') }}</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(list, index) in listOption" :key="index">
                  <td @click="getRoutePage('system-detail', list.id)">{{ index + 1 }}</td>
                  <td @click="getRoutePage('system-detail', list.id)">{{ list.id }}</td>
                  <td @click="getRoutePage('system-detail', list.id)">{{ list.tkcgrNm }}</td>
                  <td @click="getRoutePage('system-detail', list.id)">
                    <p class="date-txt">
                      <span>
                        {{ list.updDt === '' ? getDate(list.cretDt) : getDate(list.updDt) }}
                      </span>
                      <span>
                        {{ list.updDt === '' ? getHours(list.cretDt) : getHours(list.updDt) }}
                      </span>
                    </p>
                  </td>
                  <td>
                    <button class="mod-btn" @click="getRoutePage('system-edit', list.id)">
                      <i>{{ $t('common.modify') }}</i>
                    </button>
                    <button class="del-btn" @click="showModal(list.id)">
                      <i>{{ $t('common.delete') }}</i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <template slot="pagination" v-if="!isShowProgress">
          <Paging :pagingOption="systemPagination" :isListEmpty="isListEmpty" @onChangedPage:page="onChangedPage" />
        </template>
      </ListForm>
      <ModalLayout size="m" v-if="isShowModal">
        <template v-slot:modalHeader
          ><h1 class="h1-tit">{{ $t('system.modal_system_delete') }}</h1>
        </template>
        <template v-slot:modalContainer>
          <p class="text">{{ currId }} &nbsp; {{ $t('system.modal_delete_message') }}</p>
        </template>
        <template v-slot:modalFooter>
          <button class="purple-btn lg-btn" @click="deleteSystem" :disabled="isDisabled">
            {{ $t('common.ok') }}<b-spinner variant="light" v-if="isDisabled" small></b-spinner>
          </button>
          <button class="lg-btn white-btn" @click="closeModal" :disabled="isDisabled">
            {{ $t('common.cancel') }}
          </button>
        </template>
      </ModalLayout>
    </template>
  </ListLayout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import SystemModule from '@/store/modules/SystemModule';

import ListLayout from '@/components/layout/ListLayout.vue';
import InputBox from '@/components/commons/search-option/InputBox.vue';
import SelectBox from '@/components/commons/search-option/SelectBox.vue';
import ListForm from '@/components/commons/ListForm.vue';
import Paging from '@/components/commons/Paging.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';

import { SearchCondition } from '@/types/SearchType';
import { SystemResponse } from '@/types/SystemType';
import { Pagination } from '@/types/GateWayResponse';

import { convertDate, convertTime } from '@/utils/converter';

@Component({
  components: {
    ListLayout,
    InputBox,
    SelectBox,
    ListForm,
    Paging,
    ModalLayout,
  },
})
export default class SystemPage extends Vue {
  systemModule = getModule(SystemModule, this.$store);

  searchData: SearchCondition = {};
  pagingData: SearchCondition = {};
  DateList: string[][] = [];

  isShowProgress = true;
  isShowModal = false;
  isDisabled = false;
  isListEmpty = false;

  currId = '';

  get listOption(): SystemResponse[] {
    return this.systemModule.systemList;
  }

  get systemPagination(): Pagination {
    return this.systemModule.systemPagination;
  }

  @Watch('listOption')
  onListOptionChanged() {
    if (this.listOption.length === 0) {
      this.isListEmpty = true;
    } else {
      this.isListEmpty = false;
    }
  }

  created() {
    //this._getSystemList();
  }
  mounted() {
    this._getSystemList();
  }

  _getSystemList() {
    this.isShowProgress = true;
    this.systemModule.systemReset();
    if (Object.keys(this.$route.query).length > 0) {
      if (Object.keys(this.$route.query).includes('id')) this.searchData.id = this.$route.query.id as string;
      if (Object.keys(this.$route.query).includes('tkcgr_nm'))
        this.searchData.tkcgr_nm = this.$route.query.tkcgr_nm as string;
      if (Object.keys(this.$route.query).includes('page')) this.pagingData.page = this.$route.query.page as string;

      const param = { ...this.searchData, ...this.pagingData };
      this.systemModule
        .getSystemList(param)
        .then(() => {
          this.isShowProgress = false;
        })
        .catch(() => {
          this.isShowProgress = false;
          this.$modal.show(`${this.$t('error.server_error')}`);
        });
    } else {
      this.systemModule
        .getSystemList()
        .then(() => {
          console.log('!!!!!!!!');
          console.log(this.systemModule.systemList);
          this.isShowProgress = false;
        })
        .catch(() => {
          this.isShowProgress = false;
          this.$modal.show(`${this.$t('error.server_error')}`);
        });
    }
  }

  searchOnClieckEvent() {
    if (Object.values(this.searchData).some((item) => item != '')) {
      this.getList();
    } else {
      this.$modal.show(`${this.$t('system.enter_search_data')}`);
    }
  }

  getList() {
    const query = {} as SearchCondition;
    if (Object.keys(this.searchData).includes('id')) query.id = this.searchData.id as string;
    if (Object.keys(this.searchData).includes('tkcgr_nm')) query.tkcgr_nm = this.searchData.tkcgr_nm as string;
    if (Object.keys(this.pagingData).includes('page')) query.page = this.pagingData.page;
    if (Object.keys(this.pagingData).includes('size')) query.size = this.pagingData.size;
    if (Object.keys(this.pagingData).includes('sort_by')) query.sort_by = this.pagingData.sort_by as string;
    if (Object.keys(this.pagingData).includes('order_by')) query.order_by = this.pagingData.order_by as string;

    if (Object.is(JSON.stringify(this.$router.currentRoute.query), JSON.stringify(query))) {
      this._getSystemList();
    } else {
      this.$router.push({
        name: 'system',
        query: {
          ...query,
        },
      });
    }
  }

  onChangedPage(page: number) {
    this.pagingData.page = String(page);
    this.getList();
  }

  registerOnClickEvent() {
    this.$router.push({ name: 'system-register' });
  }

  getRoutePage(page: string, id?: string): void {
    if (id) {
      this.$router.push({ name: page, params: { id: id } });
    } else {
      this.$router.push({ name: page });
    }
  }

  async deleteSystem() {
    console.log('currId : ', this.currId);
    this.isDisabled = true;

    await this.systemModule
      .deleteSystem(this.currId)
      .then(() => {
        this.closeModal();
        this.isDisabled = false;
        this._getSystemList();
      })
      .catch(() => {
        this.isDisabled = false;
      });
  }

  getDate(date: string) {
    return convertDate(date);
  }

  getHours(date: string) {
    return convertTime(date);
  }

  showModal(id: string) {
    this.currId = id;
    this.isShowModal = true;
  }

  closeModal() {
    console.log('closeModal');
    this.isShowModal = false;
  }

  destroyed() {
    this.systemModule.release();
  }
}
</script>
