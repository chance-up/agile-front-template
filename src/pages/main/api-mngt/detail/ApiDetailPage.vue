<template lang="html">
  <ContentLayout
    v-if="mockData"
    :title="`${$t('api.api')}` + ' ' + `${$t('api.information')}` + ' ' + `${$t('api.confirm')}`"
    :subTitle="`${$t('api.basic')}` + `${$t('api.information')}` + ' ' + `${$t('api.confirm')}`"
    :depth="`${$t('api.api')}` + ' ' + `${$t('api.management')}`"
  >
    <template v-slot:contents>
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <InfoGroup :inputNm="`${$t('api.system')}` + `${$t('api.name')}`" :value="mockData.sys_id" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.id')}`" :value="mockData.id" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.name')}`" :value="mockData.nm" />
        <InfoGroup :inputNm="`${$t('api.interface')}` + ' ' + `${$t('api.number')}`" :value="mockData.if_no" />
        <MethodGroup :inputNm="`${$t('api.method')}`" :methods="mockData.meth" />
        <URIGroup :inputNm="`${$t('api.uri')}`" :uriSer="mockData.uri_in" :uriSys="mockData.uri_out" />
        <InfoGroup
          :inputNm="`${$t('api.system')}` + ' ' + `${$t('api.interlock')}` + ' ' + `${$t('api.information')}`"
          :value="mockData.if_grp"
        />
        <InfoGroup
          :inputNm="`${$t('api.request')}` + ' ' + `${$t('api.handler')}` + ' ' + `${$t('api.group')}`"
          :value="mockData.req_handlr_grp_id"
        />
        <InfoGroup
          :inputNm="`${$t('api.response')}` + ' ' + `${$t('api.handler')}` + ' ' + `${$t('api.group')}`"
          :value="mockData.res_handlr_grp_id"
        />
        <InfoGroup :inputNm="`${$t('api.timeOutMS')}`" :value="mockData.time_out" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.description')}`" :value="mockData.desc" />
      </ul>
    </template>

    <template v-slot:buttons>
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
import { Component, Vue } from 'vue-property-decorator';
import { ApiDetailResponse } from '@/types/ApiType';
import ApiModule from '@/store/modules/ApiModule';
import { getModule } from 'vuex-module-decorators';
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
}
</script>