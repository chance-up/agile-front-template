<template lang="html">
  <ContentLayout
    :title="`${$t('api.api')}` + ' ' + `${$t('api.information')}` + ' ' + `${$t('common.ok')}`"
    :subTitle="`${$t('api.basicInformation')}` + ' ' + `${$t('common.ok')}`"
    :depth="`${$t('api.api')}` + ' ' + `${$t('api.management')}`"
    :isShowProgress="isShowProgress"
  >
    <template v-slot:contents v-if="!isShowProgress && apiDetail">
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <InfoGroup :inputNm="`${$t('api.sysId')}`" :value="apiDetail.sysId" />
        <InfoGroup :inputNm="`${$t('api.apiId')}`" :value="apiDetail.id" />
        <InfoGroup :inputNm="`${$t('api.interface')}` + ' ' + `${$t('api.number')}`" :value="apiDetail.ifNo" />
        <MethodGroup :inputNm="`${$t('api.method')}`" :methods="apiDetail.meth" />
        <URIGroup :inputNm="`${$t('api.uri')}`" :uriSer="apiDetail.uriIn" :uriSys="apiDetail.uriOut" />
        <EndPointGroup groupNm="End-point" :edptList="edptList" />

        <InfoGroup
          :inputNm="`${$t('api.request')}` + ' ' + `${$t('api.handler')}` + ' ' + `${$t('api.group')}`"
          :value="apiDetail.reqHndlrGrpId"
        />
        <InfoGroup
          :inputNm="`${$t('api.response')}` + ' ' + `${$t('api.handler')}` + ' ' + `${$t('api.group')}`"
          :value="apiDetail.resHndlrGrpId"
        />
        <InfoGroup :inputNm="`${$t('api.timeOutMS')}`" :value="apiDetail.timeOut" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.description')}`" :value="apiDetail.desc" />
      </ul>
    </template>

    <template v-slot:buttons v-if="!isShowProgress">
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="$router.push({ name: 'api-edit', params: { id: apiDetail.id } })">
          {{ $t('api.edit') }}
        </button>
        <button class="lg-btn white-btn" @click="$router.push({ path: '/api' })">{{ $t('api.delete') }}</button>
        <button class="lg-btn gray-btn" @click="$router.go(-1)">{{ $t('api.list') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>

<script lang="ts">
import InfoGroup from '@/components/api-mngt/detail/InfoGroup.vue';
import MethodGroup from '@/components/api-mngt/detail/MethodGroup.vue';
import URIGroup from '@/components/api-mngt/detail/URIGroup.vue';
import EndPointGroup from '@/components/api-mngt/register/EndPointGroup.vue';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiDetailResponse } from '@/types/ApiType';
import ApiModule from '@/store/modules/ApiModule';
import { getModule } from 'vuex-module-decorators';

import { USER_STATE } from '@/store/UserState';
import SystemModule from '@/store/modules/SystemModule';
import { SystemResponse } from '@/types/SystemType';
@Component({
  components: {
    InfoGroup,
    MethodGroup,
    URIGroup,
    ContentLayout,
    EndPointGroup,
  },
})
export default class ApiDetailPage extends Vue {
  apiModule = getModule(ApiModule, this.$store);
  systemModule = getModule(SystemModule, this.$store);

  edptList: string[] | null = null;
  get apiDetail(): ApiDetailResponse | null {
    return this.apiModule.apiDetail;
  }
  get system(): SystemResponse | null {
    return this.systemModule.system;
  }

  created() {
    this.apiModule.apiReset();
    this.systemModule.systemReset();
    this.apiModule.getApiDetail(this.$route.params.id);
  }
  destroyed() {
    this.apiModule.release();
    this.systemModule.release();
  }

  @Watch('apiDetail')
  onApiDetailChange() {
    if (this.apiDetail) {
      this.systemModule.getSystemDetail(this.apiDetail.sysId);
    }
  }
  @Watch('system')
  onSystemChange() {
    if (this.system) {
      this.edptList = this.system.edpt;
    }
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
      this.$modal.show(`${this.$t('api.server_error')}`);
    } else if (userState === USER_STATE.DONE) {
      this.isShowProgress = false;
    }
  }
}
</script>
