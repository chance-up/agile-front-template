<template>
  <ContentLayout title="서비스 정보 확인" subTitle="기본정보 확인" depth="서비스 관리">
    <template v-slot:contents>
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <InfoGroup inputNm="서비스명" :value="dumyData.svcNm" />
        <InfoGroup inputNm="서비스ID" :value="dumyData.svcId" />
        <InfoGroup inputNm="담당자 이름" :value="dumyData.MngNm" />
        <InfoGroup inputNm="소속" :value="dumyData.depart" />
        <InfoGroup inputNm="E-mail" :value="dumyData.email" />
        <InfoGroup inputNm="서비스 기간" :value="dumyData.period" />
        <AuthGroup
          inputNm="인중 수단"
          :AuthNm="dumyData.authMtd[0]"
          :AuthId="dumyData.authMtd[1]"
          :AuthPw="dumyData.authMtd[2]"
        />
        <SlaGroup inputNm="SLA 정책 관리" :term="dumyData.slaPlc[0]" :count="dumyData.slaPlc[1]" />
        <InfoGroup inputNm="서비스 설명" :value="dumyData.scvEx" />
      </ul>
    </template>

    <template v-slot:buttons>
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn">수정</button>
        <button class="lg-btn white-btn">삭제</button>
        <button class="lg-btn gray-btn" @click="$router.go(-1)">목록</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import InfoGroup from '@/components/service/InfoGroup.vue';
import AuthGroup from '@/components/service/AuthGroup.vue';
import SlaGroup from '@/components/service/SlaGroup.vue';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import { DummyServiceResponse, dummyData } from '@/types/ServiceType';

@Component({
  components: {
    InfoGroup,
    AuthGroup,
    SlaGroup,
    ContentLayout,
  },
})
export default class ServiceDetailPage extends Vue {
  get dumyData(): DummyServiceResponse {
    return dummyData;
  }
}
</script>
