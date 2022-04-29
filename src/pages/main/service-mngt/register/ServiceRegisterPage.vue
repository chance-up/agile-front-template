<template>
  <ContentLayout title="서비스 등록" subTitle="기본정보 등록" depth="서비스 관리">
    <template v-slot:contents>
      <ul>
        <TextDebounceForm
          type="text"
          :inputNm="$t('service.name')"
          :check="isDuplicatedNm"
          :placeholder="$t('service.name')"
          v-model="formData.nm"
          @input="duplicateCheckNm()"
        />
        <TextDebounceForm
          type="text"
          :inputNm="$t('service.id')"
          :check="isDuplicatedId"
          :placeholder="$t('service.id')"
          v-model="formData.id"
          @input="duplicateCheckId()"
        />
        <InputGroup
          type="text"
          :inputNm="$t('service.tkcgrNm')"
          :placeholder="$t('service.tkcgrNm')"
          :value.sync="formData.tkcgr_nm"
        />
        <InputGroup
          type="text"
          :inputNm="$t('service.tkcgrPos')"
          :placeholder="$t('service.tkcgrPos')"
          :value.sync="formData.tkcgr_pos"
        />
        <InputGroup
          type="text"
          :inputNm="$t('service.tkcgrEml')"
          :placeholder="$t('service.tkcgrEml')"
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
          @basicAuthClicked="basicAuthClicked"
          inputNm="인증수단"
          :basicId="basicAuth.id"
          :basicPW="basicAuth.pw"
          :athn.sync="show"
          :id.sync="formData.athn.BASIC_AUTH.id"
          :pw.sync="formData.athn.BASIC_AUTH.pw"
          :alg.sync="formData.athn.JWT.alg"
          :issuer.sync="formData.athn.JWT.issuer"
          :subject.sync="formData.athn.JWT.subject"
          :publicKey.sync="formData.athn.JWT.publickey"
          :isShowProgress="isShowProgress"
        ></AuthReqGroup>
        <SlaReqGroup
          inputNm="SLA 정책관리"
          :SLAn.sync="formData.sla_yn"
          :type.sync="formData.sla_type"
          :totalCnt.sync="formData.sla_cnt"
          :TPSCnt.sync="formData.sla_cnt"
        />
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/service-mngt/InputGroup.vue';
import DateGroup from '@/components/service-mngt/DateGroup.vue';
import AuthReqGroup from '@/components/service-mngt/AuthReqGroup.vue';
import SlaReqGroup from '@/components/service-mngt/SlqReqGroup.vue';
import SysExGroup from '@/components/service-mngt/SysExGroup.vue';
import { getModule } from 'vuex-module-decorators';
import ServiceModule from '@/store/modules/ServiceModule';
import { BasicAuthResponse, ServiceRegisterRequest } from '@/types/ServiceType';
import TextDebounceForm from '@/components/service-mngt/TextDebounceForm.vue';
import { USER_STATE } from '@/store/UserState';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    DateGroup,
    AuthReqGroup,
    SlaReqGroup,
    SysExGroup,
    TextDebounceForm,
  },
})
export default class SystemRegisterPage extends Vue {
  show = 'BASIC_AUTH';

  @Watch('show')
  onShowChange(val: string) {
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

  serviceModule = getModule(ServiceModule, this.$store);

  formData: ServiceRegisterRequest = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    sla_yn: 'none',
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

  submitForm(): void {
    if (confirm('서비스를 등록하시겠습니까?') == true) {
      console.log(this.formData);
      this.serviceModule.createserviceAction(this.formData);
      this.$router.back();
    } else {
      return;
    }
  }

  timerNm = 0;
  isDuplicatedNm: boolean | null = null;
  duplicateCheckNm() {
    if (this.timerNm) {
      clearTimeout(this.timerNm);
    }
    this.timerNm = setTimeout(async () => {
      console.log('서비스명 입력 1초 경과');
      console.log(this.formData.nm);
      this.isDuplicatedNm = await this.serviceModule.duplicateCheck(this.formData.nm);
    }, 1000);
  }

  timerId = 0;
  isDuplicatedId: boolean | null = null;
  duplicateCheckId() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(async () => {
      console.log('id 입력 1초 경과');
      console.log(this.formData.id);
      this.isDuplicatedId = await this.serviceModule.duplicateCheck(this.formData.id);
    }, 1000);
  }

  basicAuthClicked() {
    this.serviceModule.getBasicAuth();
  }

  get basicAuth(): BasicAuthResponse {
    return this.serviceModule.basicAuth;
  }

  isShowProgress = true;
  get userState() {
    return this.serviceModule.currAsyncState;
  }
  @Watch('userState')
  onCurrAsyncStateChange(userState: USER_STATE) {
    console.log('userState : ', userState);
    if (userState === USER_STATE.LOADING) {
      this.isShowProgress = true;
    } else if (userState === USER_STATE.ERROR) {
      this.isShowProgress = false;
      this.$modal.show('서버 통신 에러');
    } else if (userState === USER_STATE.DONE) {
      this.isShowProgress = false;
    }
  }
}
</script>
