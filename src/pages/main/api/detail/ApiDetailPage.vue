<template lang="html">
  <ContentLayout
    :title="`${$t('api.api')}` + ' ' + `${$t('api.information')}` + ' ' + `${$t('api.confirm')}`"
    :subTitle="`${$t('api.basic')}` + `${$t('api.information')}` + ' ' + `${$t('api.confirm')}`"
    :depth="`${$t('api.api')}` + ' ' + `${$t('api.management')}`"
  >
    <template v-slot:contents>
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <InfoGroup :inputNm="`${$t('api.system')}` + `${$t('api.name')}`" :value="dumyData.sysNm" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.id')}`" :value="dumyData.apiId" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.name')}`" :value="dumyData.apiNm" />
        <InfoGroup :inputNm="`${$t('api.interface')}` + ' ' + `${$t('api.number')}`" :value="dumyData.itfNum" />
        <MethodGroup :inputNm="`${$t('api.method')}`" :methods="dumyData.methods" />
        <URIGroup :inputNm="`${$t('api.uri')}`" :uriSer="dumyData.uriSer" :uriSys="dumyData.uriSys" />
        <InfoGroup
          :inputNm="`${$t('api.system')}` + ' ' + `${$t('api.interlock')}` + ' ' + `${$t('api.information')}`"
          :value="dumyData.sysSync"
        />
        <InfoGroup
          :inputNm="`${$t('api.request')}` + ' ' + `${$t('api.handler')}` + ' ' + `${$t('api.group')}`"
          :value="dumyData.reqHdlGrp"
        />
        <InfoGroup
          :inputNm="`${$t('api.response')}` + ' ' + `${$t('api.handler')}` + ' ' + `${$t('api.group')}`"
          :value="dumyData.resHdlGrp"
        />
        <InfoGroup :inputNm="`${$t('api.timeOutMS')}`" :value="dumyData.timeOut" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.description')}`" :value="dumyData.apiCmt" />
      </ul>
    </template>

    <template v-slot:buttons>
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="$router.push({ path: '/api-edit' })">{{ $t('api.edit') }}</button>
        <button class="lg-btn white-btn" @click="$router.push({ path: '/api' })">{{ $t('api.delete') }}</button>
        <button class="lg-btn gray-btn" @click="$router.go(-1)">{{ $t('api.list') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>

<script lang="ts">
import InfoGroup from '@/components/api/detail/InfoGroup.vue';
import MethodGroup from '@/components/api/detail/MethodGroup.vue';
import URIGroup from '@/components/api/detail/URIGroup.vue';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import { Component, Vue } from 'vue-property-decorator';
import { DummyApiResponse, dummyData } from '@/types/ApiType';

@Component({
  components: {
    InfoGroup,
    MethodGroup,
    URIGroup,
    ContentLayout,
  },
})
export default class ApiDetailPage extends Vue {
  get dumyData(): DummyApiResponse {
    return dummyData;
  }
}
</script>
