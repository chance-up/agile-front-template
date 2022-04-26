<template>
  <ListLayout :title="title">
    <template slot="search-form">
      <SearchForm :searchPanelOption="searchOption" :searchData="searchData">
        <template slot="search-btn-area">
          <button class="mid-btn" @click="searchOnClieckEvent">
            <i><img src="@/assets/search_ico.svg" alt="검색" /></i>{{ $t('common.search') }}
          </button>
        </template>
      </SearchForm>
    </template>
    <template slot="list-form">
      <ListForm :title="listTitle">
        <template slot="list-btn-area">
          <button class="mid-btn" @click="$router.push({ name: 'service-register' })">
            <i><img src="@/assets/check_ico.svg" alt="등록" /></i>등록
          </button>
        </template>
        <template slot="list-table">
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
                {{ list.athn }}
              </td>
              <td @click="$router.push({ name: 'service-detail', params: { id: list.id } })">
                {{ list.svc_st_dt }} ~ {{ list.svc_end_dt }}
              </td>
              <td @click="$router.push({ name: 'service-detail', params: { id: list.id } })">
                {{ list.upd_dt }}
              </td>
              <td>
                <button class="mod-btn" @click="$router.push({ name: 'service-edit', params: { id: list.id } })">
                  <i>{{ $t('common.modify') }}</i>
                </button>
                <button class="del-btn" @click="deleteService(list.id)">
                  <i>{{ $t('common.delete') }}</i>
                </button>
              </td>
            </tr>
          </tbody>
        </template>
      </ListForm>
    </template>
  </ListLayout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import ListLayout from '@/components/layout/ListLayout.vue';
import SearchForm from '@/components/commons/SearchForm.vue';
import ListForm from '@/components/commons/ListForm.vue';
import ServiceModule from '@/store/modules/ServiceModule';
import { ServiceResponse } from '@/types/ServiceType';
import { SearchCondition } from '@/types/SearchType';
@Component({
  components: {
    SearchForm,
    ListLayout,
    ListForm,
  },
})
export default class ServiceManagementPage extends Vue {
  title = this.$t('service.title');
  listTitle = '서비스 리스트';
  serviceModule = getModule(ServiceModule, this.$store);
  searchData: SearchCondition = {
    inputBoxCondition: {},
    selectBoxCondition: {},
  };
  searchOption = [
    {
      type: 'inputBox',
      label: '서비스명',
      target: 'nm',
      placeholder: '입력해주세요.',
    },
    {
      type: 'inputBox',
      label: '서비스ID',
      target: 'id',
      placeholder: '입력해주세요.',
    },
    {
      type: 'inputBox',
      label: '담당자명',
      target: 'tkcgr_nm',
      placeholder: '입력해주세요.',
    },
  ];
  get listOption(): ServiceResponse[] {
    return this.serviceModule.services;
  }
  deleteService(ServiceId: string) {
    if (confirm('서비스를 삭제하시겠습니까?') == true) {
      this.serviceModule.deleteServiceAction(ServiceId);
    } else {
      return;
    }
  }
  searchOnClieckEvent() {
    if (
      //썼다 지웠을 때도 통과 안되도록 로직 변경해야 함
      Object.keys(this.searchData.inputBoxCondition).length > 0 ||
      Object.keys(this.searchData.selectBoxCondition).length > 0
    ) {
      console.log('service page : ', this.searchData);
    } else {
      alert('검색 데이터를 입력해주세요.');
    }
  }
  created() {
    this.serviceModule.getServiceList();
  }
  text1 = '';
  text2 = '';
  text3 = '';
  // saveMySession(id: string) {
  //   this.text1 = this.searchOption[0].text;
  //   sessionStorage.setItem('text1', JSON.stringify(this.text1));
  //   this.text2 = this.searchOption[1].text;
  //   sessionStorage.setItem('text2', JSON.stringify(this.text2));
  //   this.text3 = this.searchOption[2].text;
  //   sessionStorage.setItem('text3', JSON.stringify(this.text3));
  //   console.log(this.text1);
  //   this.$router.push({ path: '/service-detail', params: { id: id } });
  // }
  // load() {
  //   if (sessionStorage.getItem('infiniteScrollEnabled') !== null) {
  //     let storedV1 = JSON.parse(sessionStorage.getItem('text1')!);
  //     if (storedV1) {
  //       this.searchOption[0].text = storedV1;
  //       this.text1 = storedV1;
  //     }
  //   }
  //   if (sessionStorage.getItem('infiniteScrollEnabled') !== null) {
  //     let storedV2 = JSON.parse(sessionStorage.getItem('text2')!);
  //     if (storedV2) {
  //       this.searchOption[1].text = storedV2;
  //       this.text2 = storedV2;
  //     }
  //   }
  //   if (sessionStorage.getItem('infiniteScrollEnabled') !== null) {
  //     let storedV3 = JSON.parse(sessionStorage.getItem('text2')!);
  //     if (storedV3) {
  //       this.searchOption[2].text = storedV3;
  //       this.text3 = storedV3;
  //     }
  //   }
  //   console.log(this.text1);
  // }
}
</script>
