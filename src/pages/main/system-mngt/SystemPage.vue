<template>
  <!-- 페이지 최상단에 들어갈 타이들을 넘겨주세요 (ex. 시스템 관리) -->
  <ListLayout :title="$t('system.list_top_title')">
    <template slot="search-form">
      <div class="search-wrap">
        <h2 class="h2-tit">{{ $t('common.search') }}</h2>

        <!-- Input Box 옵션 -->
        <div class="search-cont">
          <InputBox v-model="searchData['nm']" :label="$t('system.name')" placeholder="입력해주세요." />
        </div>
        <div class="search-cont">
          <InputBox v-model="searchData['id']" :label="$t('system.id')" placeholder="입력해주세요." />
        </div>
        <div class="search-cont">
          <InputBox v-model="searchData['tkcgr_nm']" :label="$t('system.tkcgrNm')" placeholder="입력해주세요." />
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
      <!-- 리스트 컴포넌트에서 사용할 타이틀(ex. 시스템 리스트)을 넘겨주세요. -->
      <ListForm :title="$t('system.list_cont_title')" :isShowProgress="isShowProgress">
        <!-- 리스트 우측 상단에 들어갈 버튼은 template로 묶어서 넣어주시면 됩니다. -->
        <template slot="list-btn-area">
          <button class="mid-btn" @click="registerOnClickEvent">
            <i><img src="@/assets/check_ico.svg" :alt="$t('common.register')" /></i>{{ $t('common.register') }}
          </button>
        </template>
        <!-- 각 페이지마다 테이블 규격이 조금씩 달라서 template으로 묶어서 colgroup ~ tbody까지 넣어주시면 됩니다. -->
        <template slot="list-table">
          <div class="tb-wrap">
            <div class="text-center" v-if="isShowProgress">
              <!-- v-show="isShowProgress" -->
              <b-spinner label="Large Spinner"></b-spinner>
            </div>
            <table class="list-tb" v-if="!isShowProgress">
              <colgroup>
                <col width="8%" />
                <col width="*" />
                <col width="22%" />
                <col width="27%" />
                <col width="17%" />
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('system.no') }}</th>
                  <th>{{ $t('system.id') }}</th>
                  <th>{{ $t('system.tkcgr') }}</th>
                  <th>{{ $t('system.update') }}</th>
                  <th>{{ $t('system.action') }}</th>
                </tr>
              </thead>

              <!-- 각 리스트 페이지에 맞는 데이터로 v-for 돌려주시면 됩니다. <td> 태그 안이 조금씩 다를 수 있으니 퍼블리싱 파일 참조하면서 수정해주세요. -->
              <tbody>
                <tr v-for="(list, index) in listOption" :key="index">
                  <td @click="getRoutePage('system-detail', list.id)">{{ index + 1 }}</td>
                  <td @click="getRoutePage('system-detail', list.id)">{{ list.id }}</td>
                  <td @click="getRoutePage('system-detail', list.id)">{{ list.tkcgr_nm }}</td>
                  <td @click="getRoutePage('system-detail', list.id)">
                    <p class="date-txt">
                      <span>
                        {{ list.updated_at === '' ? getDate(list.created_at) : getDate(list.updated_at) }}
                      </span>
                      <span>
                        {{ list.updated_at === '' ? getHours(list.created_at) : getHours(list.updated_at) }}
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
        <template slot="pagination">
          <Paging :pagingOption="pagination" @onChangedPage:page="onChangedPage" />
        </template>
      </ListForm>
      <ModalLayout size="m" v-if="isShowModal">
        <template v-slot:modalHeader><h1 class="h1-tit">서비스 삭제</h1> </template>
        <template v-slot:modalContainer>
          <p class="text">서비스를 삭제하시겠습니까?</p>
        </template>
        <template v-slot:modalFooter
          ><button class="lg-btn purple-btn" @click="deleteSystem">확인</button
          ><button class="lg-btn purple-btn" @click="closeModal">취소</button>
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
import { USER_STATE } from '@/store/UserState';
import { Pagination } from '@/types/GateWayResponse';

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

  // target = '';
  // selectOptions: SelectOptionType[] = [
  //   { label: 'api id', value: 'id' },
  //   { label: 'api 명', value: 'nm' },
  //   { label: '시스템명', value: 'sys_id' },
  //   { label: 'uri', value: 'uri' },
  // ];
  // searchData: object = {};

  searchData: SearchCondition = {};
  pagingData: SearchCondition = {};
  DateList: string[][] = [];
  isShowProgress = true;
  isShowModal = false;
  currId = '';

  get listOption(): SystemResponse[] {
    return this.systemModule.systemList;
  }

  get pagination(): Pagination {
    return this.systemModule.pagination;
  }

  get userState() {
    return this.systemModule.currAsyncState;
  }

  created() {
    this.systemModule.setSystemList([]);
    this.systemModule.setPagination({} as Pagination);

    if (Object.keys(this.$route.query).length > 0) {
      if (Object.keys(this.$route.query).includes('nm')) this.searchData.nm = this.$route.query.nm as string;
      if (Object.keys(this.$route.query).includes('id')) this.searchData.id = this.$route.query.id as string;
      if (Object.keys(this.$route.query).includes('tkcgr_nm'))
        this.searchData.tkcgr_nm = this.$route.query.tkcgr_nm as string;
      if (Object.keys(this.$route.query).includes('page')) this.pagingData.page = this.$route.query.page as string;
      // if (Object.keys(this.$route.query).includes('size')) this.searchData.size = Number(this.$route.query.size);
      // if (Object.keys(this.$route.query).includes('sort_by'))
      //   this.searchData.sort_by = this.$route.query.sort_by as string;
      // if (Object.keys(this.$route.query).includes('ordeer_by'))
      //   this.searchData.order_by = this.$route.query.order_by as string;

      //store 말고 페이지에서 action 부를 때도 예외처리를 해줘야하는지 물어보기

      const param = { ...this.searchData, ...this.pagingData };
      this.systemModule.getSystemList(param);
    } else {
      this.systemModule.getSystemList();
    }
  }

  @Watch('userState')
  onCurrAsyncStateChange(userState: USER_STATE) {
    if (userState === USER_STATE.LOADING) {
      this.isShowProgress = true;
    } else if (userState === USER_STATE.ERROR) {
      this.isShowProgress = false;
      this.$modal.show('서버 통신 에러');
    } else if (userState === USER_STATE.DONE) {
      this.isShowProgress = false;
    }
  }

  searchOnClieckEvent() {
    if (Object.values(this.searchData).some((item) => item != '')) {
      this.getList();
    } else {
      this.$modal.show('검색 데이터를 입력해주세요.');
    }
  }

  getList() {
    const query = {} as SearchCondition;
    if (Object.keys(this.searchData).includes('nm')) query.nm = this.searchData.nm as string;
    if (Object.keys(this.searchData).includes('id')) query.id = this.searchData.id as string;
    if (Object.keys(this.searchData).includes('tkcgr_nm')) query.tkcgr_nm = this.searchData.tkcgr_nm as string;
    if (Object.keys(this.pagingData).includes('page')) query.page = this.pagingData.page;
    if (Object.keys(this.pagingData).includes('size')) query.size = this.pagingData.size;
    if (Object.keys(this.pagingData).includes('sort_by')) query.sort_by = this.pagingData.sort_by as string;
    if (Object.keys(this.pagingData).includes('ordeer_by')) query.order_by = this.pagingData.order_by as string;

    if (Object.is(JSON.stringify(this.$router.currentRoute.query), JSON.stringify(query))) {
      this.$router.go(0);
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
    await this.systemModule.deleteSystem(this.currId);
    this.$router.go(0);
    this.closeModal();
  }

  getDate(date: Date) {
    date = new Date(date);

    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    return year + '-' + month + '-' + day;
  }

  getHours(date: Date) {
    date = new Date(date);

    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return hours + ':' + minutes + ':' + seconds;
  }

  showModal(id: string) {
    this.currId = id;
    this.isShowModal = true;
  }

  closeModal() {
    this.isShowModal = false;
  }

  destroyed() {
    this.systemModule.setSystemList([]);
    this.systemModule.setPagination({} as Pagination);
  }
}
</script>
