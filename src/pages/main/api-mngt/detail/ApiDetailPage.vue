<template lang="html">
  <ContentLayout
    :title="`${$t('api.api')}` + ' ' + `${$t('api.information')}` + ' ' + `${$t('api.confirm')}`"
    :subTitle="`${$t('api.basic')}` + `${$t('api.information')}` + ' ' + `${$t('api.confirm')}`"
    :depth="`${$t('api.api')}` + ' ' + `${$t('api.management')}`"
    :isShowProgress="isShowProgress"
  >
    <template v-slot:contents v-if="!isShowProgress">
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <InfoGroup :inputNm="`${$t('api.system')}` + `${$t('api.name')}`" :value="mockData.sysNm" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.id')}`" :value="mockData.id" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.name')}`" :value="mockData.nm" />
        <InfoGroup :inputNm="`${$t('api.interface')}` + ' ' + `${$t('api.number')}`" :value="mockData.ifNo" />
        <MethodGroup :inputNm="`${$t('api.method')}`" :methods="mockData.meth" />
        <URIGroup :inputNm="`${$t('api.uri')}`" :uriSer="mockData.uriIn" :uriSys="mockData.uriOut" />
        <InfoGroup
          :inputNm="`${$t('api.system')}` + ' ' + `${$t('api.interlock')}` + ' ' + `${$t('api.information')}`"
          :value="mockData.ifGrp"
        />
        <InfoGroup
          :inputNm="`${$t('api.request')}` + ' ' + `${$t('api.handler')}` + ' ' + `${$t('api.group')}`"
          :value="mockData.reqHandlrGrpId"
        />
        <InfoGroup
          :inputNm="`${$t('api.response')}` + ' ' + `${$t('api.handler')}` + ' ' + `${$t('api.group')}`"
          :value="mockData.resHandlrGrpId"
        />
        <InfoGroup :inputNm="`${$t('api.timeOutMS')}`" :value="mockData.timeOut" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.description')}`" :value="mockData.desc" />
      </ul>
    </template>

    <template v-slot:buttons v-if="!isShowProgress">
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="$router.push({ name: 'api-edit', params: { id: mockData.id } })">
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
import ContentLayout from '@/components/layout/ContentLayout.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiDetailResponse } from '@/types/ApiType';
import ApiModule from '@/store/modules/ApiModule';
import { getModule } from 'vuex-module-decorators';

import { USER_STATE } from '@/store/UserState';
@Component({
  components: {
    InfoGroup,
    MethodGroup,
    URIGroup,
    ContentLayout,
  },
})
export default class ApiDetailPage extends Vue {
  apiModule = getModule(ApiModule, this.$store);

  get mockData(): ApiDetailResponse | null {
    return this.apiModule.apiDetail;
  }
  created() {
    this.apiModule.getApiDetail(this.$route.params.id);
  }
  destroyed() {
    this.apiModule.reset();
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
}
</script>
