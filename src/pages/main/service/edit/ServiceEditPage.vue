<template>
  <ContentLayout title="서비스 인증 정보 수정" subTitle="기본정보 수정" depth="서비스 관리">
    <template v-slot:contents>
      <ul>
        <InputGroup
          inputNm="서비스명"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          :disabled="true"
          v-model="serviceOption.nm"
        />
        <InputGroup
          inputNm="서비스 ID"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          :disabled="true"
          v-model="serviceOption.id"
        />
        <InputGroup
          inputNm="담당자 이름"
          placeholder="placeholder"
          validCheck="중복된 API ID 입니다."
          inputClass="input-box lg check-false"
          v-model="serviceOption.tkcgr_nm"
        />
        <InputGroup
          inputNm="소속"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          v-model="serviceOption.tkcgr_pos"
        />
        <InputGroup
          inputNm="E-mail"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          v-model="serviceOption.tkcgr_eml"
        />
        <DateGroup
          inputNm="서비스 기간"
          placeholderStart="YYYY-MM-DD"
          placeholderENd="YYYY-MM-DD"
          :startDt="serviceOption.svc_st_dt"
          :endDt="serviceOption.svc_end_dt"
        />
        <AuthReqGroup imputNm="인증수단" v-model="serviceOption.athn" />
        <SlaReqGroup inputNm="SLA 정책관리" :type="serviceOption.sla_type" :count="serviceOption.sla_cnt" />
        <SysExGroup inputNm="시스템 설명" v-model="serviceOption.desc" />
      </ul>
    </template>
    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="editService()">등록</button>
        <button class="lg-btn white-btn" @click="$router.go(-1)">취소</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/service/InputGroup.vue';
import DateGroup from '@/components/service/DateGroup.vue';
import AuthReqGroup from '@/components/service/AuthReqGroup.vue';
import SlaReqGroup from '@/components/service/SlqReqGroup.vue';
import SysExGroup from '@/components/service/SysExGroup.vue';
import { getModule } from 'vuex-module-decorators';
import ServiceModule from '@/store/modules/ServiceModule';
import { ServiceRegisterRequest, ServiceResponse } from '@/types/ServiceType';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    DateGroup,
    AuthReqGroup,
    SlaReqGroup,
    SysExGroup,
  },
})
export default class SystemRegisterPage extends Vue {
  // router push 로 전달받은 id 는 this.$route.params.id 로 사용하시면 됩니다.

  serviceModule = getModule(ServiceModule, this.$store);

  get serviceOption(): ServiceRegisterRequest {
    return this.serviceModule.service;
  }

  created() {
    this.serviceModule.getService(this.$route.params.id);
  }

  editService() {
    if (confirm('서비스를 등록하시겠습니까?') == true) {
      console.log(this.serviceOption);
      this.serviceModule.editServiceAction(this.serviceOption);
      this.$router.push({ name: 'service-detail', params: { id: this.$route.params.id } });
    } else {
      return;
    }
  }
}
</script>
