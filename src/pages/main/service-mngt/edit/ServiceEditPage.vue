<template>
  <ContentLayout title="서비스 인증 정보 수정" subTitle="기본정보 수정" depth="서비스 관리">
    <template v-slot:contents v-if="formData.id != ''">
      <ul>
        <InputGroup
          type="text"
          inputNm="서비스명"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          :disabled="true"
          :value.sync="formData.nm"
        />
        <InputGroup
          type="text"
          inputNm="서비스 ID"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          :disabled="true"
          :value.sync="formData.id"
        />
        <InputGroup
          type="text"
          inputNm="담당자 이름"
          placeholder="placeholder"
          validCheck="중복된 API ID 입니다."
          inputClass="input-box lg check-false"
          :value.sync="formData.tkcgr_nm"
        />
        <InputGroup
          type="text"
          inputNm="소속"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          :value.sync="formData.tkcgr_pos"
        />
        <InputGroup
          type="text"
          inputNm="E-mail"
          placeholder="placeholder"
          inputClass="input-box lg check-ok"
          :value.sync="formData.tkcgr_eml"
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
          :athn.sync="show"
          :id.sync="formData.athn.BASIC_AUTH.id"
          :pw.sync="formData.athn.BASIC_AUTH.pw"
          :alg.sync="formData.athn.JWT.alg"
          :issuer.sync="formData.athn.JWT.issuer"
          :subject.sync="formData.athn.JWT.subject"
          :publicKey.sync="formData.athn.JWT.publickey"
        ></AuthReqGroup>
        <SlaReqGroup
          inputNm="SLA 정책관리"
          :SLAn.sync="formData.sla_yn"
          :type="formData.sla_type"
          :count="formData.sla_cnt"
        />
        <SysExGroup inputNm="시스템 설명" v-model="formData.desc" />
      </ul>
    </template>
    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="editService()">등록</button>
        <button class="lg-btn white-btn" @click="$router.back()">취소</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
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
  // router push 로 전달받은 id 는 this.$route.params.id 로 사용하시면 됩니다.
  serviceModule = getModule(ServiceModule, this.$store);

  get serviceOption(): ServiceRegisterRequest {
    return this.serviceModule.service;
  }

  formData: ServiceRegisterRequest = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    sla_yn: '',
    sla_type: '',
    sla_cnt: 0,
    svc_st_dt: '',
    svc_end_dt: '',
    athn: {
      BASIC_AUTH: {
        id: '',
        pw: '',
      },
      JWT: {
        alg: [],
        issuer: '',
        subject: '',
        publickey: '',
      },
    },
    api_aut: '',
    desc: '',
  };

  show = '';
  @Watch('serviceOption')
  onServiceOptionChanged() {
    if (this.serviceOption.athn.BASIC_AUTH?.id != '') {
      this.show = 'BASIC_AUTH';
    } else {
      this.show = 'JWT';
    }
    this.formData = this.serviceOption;
  }

  @Watch('show')
  onShowChange(val: string) {
    console.log(this.show);
    if (val == 'BASIC_AUTH') {
      this.formData.athn.JWT = {
        alg: [],
        issuer: '',
        subject: '',
        publickey: '',
      };
    } else {
      this.formData.athn.BASIC_AUTH = {
        id: '',
        pw: '',
      };
    }
  }

  editService() {
    if (confirm('서비스를 등록하시겠습니까?') == true) {
      console.log(this.serviceOption);
      this.serviceModule.editServiceAction(this.serviceOption);
      this.$router.back();
    } else {
      return;
    }
  }

  createAuthId() {
    Math.random().toString(36).substr(2, 11);
  }

  created() {
    this.serviceModule.getService(this.$route.params.id);
  }
}
</script>
