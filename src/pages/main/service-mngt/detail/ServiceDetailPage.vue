<template>
  <ContentLayout title="서비스 정보 확인" subTitle="기본정보 확인" depth="서비스 관리">
    <template v-slot:contents>
      <ul>
        <InfoGroup inputNm="서비스명" :value="serviceOption.nm" />
        <InfoGroup inputNm="서비스ID" :value="serviceOption.id" />
        <InfoGroup inputNm="담당자 이름" :value="serviceOption.tkcgr_nm" />
        <InfoGroup inputNm="소속" :value="serviceOption.tkcgr_pos" />
        <InfoGroup inputNm="E-mail" :value="serviceOption.tkcgr_eml" />
        <InfoGroup inputNm="서비스 기간" :value="serviceOption.svc_st_dt" />
        <AuthGroup
          inputNm="인중 수단"
          :athn="auth"
          :id="serviceOption.athn.BASIC_AUTH.id"
          :pw="serviceOption.athn.BASIC_AUTH.pw"
          :alg="serviceOption.athn.JWT.alg"
          :issuer="serviceOption.athn.JWT.issuer"
          :subject="serviceOption.athn.JWT.subject"
          :publickey="serviceOption.athn.JWT.publickey"
        />
        <SlaGroup
          inputNm="SLA 정책 관리"
          :SLAn="serviceOption.sla_yn"
          :term="serviceOption.sla_type"
          :count="serviceOption.sla_cnt"
        />
        <InfoGroup inputNm="서비스 설명" :value="serviceOption.desc" />
      </ul>
    </template>

    <template v-slot:buttons>
      <div class="btn-wrap">
        <button
          class="lg-btn purple-btn"
          @click="$router.push({ name: 'service-edit', params: { id: $route.params.id } })"
        >
          수정
        </button>
        <button class="lg-btn white-btn" @click="deleteService(serviceOption.id)">삭제</button>
        <button class="lg-btn gray-btn" @click="$router.go(-1)">목록</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import InfoGroup from '@/components/service-mngt/InfoGroup.vue';
import AuthGroup from '@/components/service-mngt/AuthGroup.vue';
import SlaGroup from '@/components/service-mngt/SlaGroup.vue';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import { ServiceResponse } from '@/types/ServiceType';
import { getModule } from 'vuex-module-decorators';
import ServiceModule from '@/store/modules/ServiceModule';
import { Watch } from 'vue-property-decorator';

@Component({
  components: {
    InfoGroup,
    AuthGroup,
    SlaGroup,
    ContentLayout,
  },
})
export default class ServiceDetailPage extends Vue {
  auth = '';
  @Watch('serviceOption')
  onServiceOptionChange(val: ServiceResponse) {
    if (val.athn.BASIC_AUTH.id === '') {
      this.auth = 'JWT';
    } else if (val.athn.JWT.alg === []) {
      this.auth = 'Basic Auth';
    }
  }

  serviceModule = getModule(ServiceModule, this.$store);

  get serviceOption(): ServiceResponse {
    return this.serviceModule.service;
  }

  created() {
    console.log('!!!IDIDID', this.$route.params.id);
    this.serviceModule.getService(this.$route.params.serviceId);
  }

  deleteService(ServiceId: string) {
    if (confirm('서비스를 삭제하시겠습니까?') == true) {
      this.serviceModule.deleteServiceAction(ServiceId);
      this.$router.back();
    } else {
      return;
    }
  }
}
</script>
