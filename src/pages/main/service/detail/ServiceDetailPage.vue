<template>
  <ContentLayout title="서비스 정보 확인" subTitle="기본정보 확인" depth="서비스 관리">
    <template v-slot:contents>
      <ul>
        <InfoGroup inputNm="서비스명" :value="serviceOption.serviceNm" />
        <InfoGroup inputNm="서비스ID" :value="serviceOption.serviceId" />
        <InfoGroup inputNm="담당자 이름" :value="serviceOption.ManagerNm" />
        <InfoGroup inputNm="소속" :value="serviceOption.department" />
        <InfoGroup inputNm="E-mail" :value="serviceOption.email" />
        <InfoGroup inputNm="서비스 기간" :value="serviceOption.start_validity_date" />
        <AuthGroup
          inputNm="인중 수단"
          :AuthNm="serviceOption.authMethod[0]"
          :AuthId="serviceOption.authMethod[1]"
          :AuthPw="serviceOption.authMethod[2]"
        />
        <SlaGroup inputNm="SLA 정책 관리" :term="serviceOption.slaPolicy[0]" :count="serviceOption.slaPolicy[1]" />
        <InfoGroup inputNm="서비스 설명" :value="serviceOption.serviceEx" />
      </ul>
    </template>

    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="$router.push('/service-edit')">수정</button>
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
import { DummyServiceResponse } from '@/types/ServiceType';
import { getModule } from 'vuex-module-decorators';
import ServiceModule from '@/store/modules/ServiceModule';
import { Prop } from 'vue-property-decorator';

@Component({
  components: {
    InfoGroup,
    AuthGroup,
    SlaGroup,
    ContentLayout,
  },
})
export default class ServiceDetailPage extends Vue {
  @Prop({ default: '' }) serviceId!: string;

  serviceModule = getModule(ServiceModule, this.$store);

  get serviceOption(): DummyServiceResponse {
    return this.serviceModule.service;
  }

  created() {
    this.serviceModule.getService(this.serviceId);
  }
}
</script>
