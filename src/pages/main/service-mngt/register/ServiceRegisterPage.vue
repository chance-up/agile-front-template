<template>
  <ContentLayout title="서비스 등록" subTitle="기본정보 등록" depth="서비스 관리">
    <template v-slot:contents>
      <ul>
        <InputGroup
          inputNm="서비스명"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          v-model="formData.nm"
        />
        <InputGroup
          inputNm="서비스 ID"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          v-model="formData.id"
        />
        <InputGroup
          inputNm="담당자 이름"
          placeholder="placeholder"
          validCheck="중복된 API ID 입니다."
          inputClass="input-box lg check-false"
          v-model="formData.tkcgr_nm"
        />
        <InputGroup
          inputNm="소속"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          v-model="formData.tkcgr_pos"
        />
        <InputGroup
          inputNm="E-mail"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          v-model="formData.tkcgr_eml"
        />
        <DateGroup
          inputNm="서비스 기간"
          placeholderStart="YYYY-MM-DD"
          placeholderENd="YYYY-MM-DD"
          :startDt.sync="formData.svc_st_dt"
          :endDt.sync="formData.svc_end_dt"
        />
        <AuthReqGroup
          inputNm="인증수단"
          v-model="Object.keys(formData.athn)[0]"
          :athid="formData.athn.BASIC_AUTH === null ? '' : formData.athn.BASIC_AUTH.id"
          :athpw="formData.athn.BASIC_AUTH === null ? '' : formData.athn.BASIC_AUTH.pw"
        />
        <SlaReqGroup inputNm="SLA 정책관리" :type="formData.sla_type" :count="formData.sla_cnt" />
        <SysExGroup inputNm="시스템 설명" v-model="formData.desc" />
      </ul>
    </template>
    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="submitForm()">등록</button>
        <button class="lg-btn white-btn" @click="$router.go(-1)">취소</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/service-mngt/InputGroup.vue';
import DateGroup from '@/components/service-mngt/DateGroup.vue';
import AuthReqGroup from '@/components/service-mngt/AuthReqGroup.vue';
import SlaReqGroup from '@/components/service-mngt/SlqReqGroup.vue';
import SysExGroup from '@/components/service-mngt/SysExGroup.vue';
import { getModule } from 'vuex-module-decorators';
import ServiceModule from '@/store/modules/ServiceModule';
import { ServiceRegisterRequest } from '@/types/ServiceType';

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
  serviceName = '';
  serviceId = '';
  position = '';
  email = '';
  startDateg = '';
  endDate = '';

  serviceModule = getModule(ServiceModule, this.$store);

  formData: ServiceRegisterRequest = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    sla_type: '',
    sla_cnt: 0,
    svc_st_dt: '',
    svc_end_dt: '',
    athn: {},
    api_aut: '',
    desc: '',
  };

  submitForm(): void {
    if (confirm('서비스를 등록하시겠습니까?') == true) {
      console.log(this.formData);
      this.serviceModule.createserviceAction(this.formData);
      this.$router.back();
    } else {
      return;
    }
  }
}
</script>
