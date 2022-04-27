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
                {{ list.athn.BASIC_AUTH.id == '' ? 'JWT' : 'Basic Auth' }}
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
import InputBox from '@/components/commons/search-option/InputBox.vue';
import ListForm from '@/components/commons/ListForm.vue';
import ServiceModule from '@/store/modules/ServiceModule';
import { ServiceResponse } from '@/types/ServiceType';
import { SearchCondition } from '@/types/SearchType';
@Component({
  components: {
    ListLayout,
    ListForm,
    InputBox,
  },
})
export default class ServiceManagementPage extends Vue {
  title = this.$t('service.title');
  listTitle = '서비스 리스트';
  searchData: SearchCondition = {
    nm: '',
    id: '',
    tkcgr_nm: '',
  };
  serviceModule = getModule(ServiceModule, this.$store);
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
    if (Object.keys(this.$route.query).length > 0) {
      this.searchData.nm = this.$route.query.nm as string;
      this.searchData.id = this.$route.query.id as string;
      this.searchData.tkcgr_nm = this.$route.query.tkcgr_nm as string;
      this.serviceModule.getServiceList();
      // this.systemModule.getSystemList(this.searchData);
    } else {
      // this.target = this.selectOptions[0].value;
      this.serviceModule.getServiceList();
    }
  }
}
</script>
