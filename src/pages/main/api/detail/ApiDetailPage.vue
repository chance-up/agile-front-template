<template lang="html">
  <ContentLayout title="API 정보 확인" subTitle="기본정보 확인" depth="API 관리">
    <template v-slot:contents>
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <InfoGroup inputNm="시스템명" :value="dumyData.sysNm" />
        <InfoGroup inputNm="API ID" :value="dumyData.apiId" />
        <InfoGroup inputNm="API 명" :value="dumyData.apiNm" />
        <InfoGroup inputNm="인터페이스 번호" :value="dumyData.itfNum" />
        <MethodGroup inputNm="Method" :methods="dumyData.methods" />
        <URIGroup inputNm="URI" :uriSer="dumyData.uriSer" :uriSys="dumyData.uriSys" />
        <InfoGroup inputNm="시스템 연동 정보" :value="dumyData.sysSync" />
        <InfoGroup inputNm="요청 handler 그룹" :value="dumyData.reqHdlGrp" />
        <InfoGroup inputNm="응답 handler 그룹" :value="dumyData.resHdlGrp" />
        <InfoGroup inputNm="타임아웃(ms)" :value="dumyData.timeOut" />
        <InfoGroup inputNm="API 설명" :value="dumyData.apiCmt" />
      </ul>
    </template>

    <template v-slot:buttons>
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn">수정</button>
        <button class="lg-btn white-btn">삭제</button>
        <button class="lg-btn gray-btn">목록</button>
      </div>
    </template>
  </ContentLayout>
</template>

<script lang="ts">
import InfoGroup from '@/components/api/InfoGroup.vue';
import MethodGroup from '@/components/api/MethodGroup.vue';
import URIGroup from '@/components/api/URIGroup.vue';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import Vue from 'vue';
import Component from 'vue-class-component';
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
