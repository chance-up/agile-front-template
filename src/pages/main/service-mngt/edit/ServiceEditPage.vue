<template>
  <ContentLayout
    :isShowProgress="isShowProgress"
    title="서비스 인증 정보 수정"
    subTitle="기본정보 수정"
    depth="서비스 관리"
  >
    <template v-slot:contents v-if="formData.id != ''">
      <ul>
        <InputGroup
          type="text"
          inputNm="서비스명"
          :placeholder="$t('service.nameEx')"
          inputClass="input-box lg check-ok"
          :disabled="true"
          :value.sync="formData.nm"
        />
        <InputGroup
          type="text"
          inputNm="서비스 ID"
          :placeholder="$t('service.idEx')"
          inputClass="input-box lg check-ok"
          :disabled="true"
          :value.sync="formData.id"
        />
        <InputGroup
          type="text"
          :inputNm="$t('service.tkcgrNm')"
          :placeholder="$t('service.tkcgrNmEx')"
          :value.sync="formData.tkcgr_nm"
        />
        <InputGroup
          type="text"
          :inputNm="$t('service.tkcgrPos')"
          :placeholder="$t('service.tkcgrPosEx')"
          :value.sync="formData.tkcgr_pos"
        />
        <InputGroup
          type="text"
          :inputNm="$t('service.tkcgrEml')"
          :placeholder="$t('service.tkcgrEmlEx')"
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
          :alg.sync="formData.athn.JWT.alg"
          :issuer.sync="formData.athn.JWT.issuer"
          :subject.sync="formData.athn.JWT.subject"
          :publicKey.sync="formData.athn.JWT.publickey"
        ></AuthReqGroup>
        <li>
          <label class="label point">API 권한관리</label>
          <div class="form-cont">
            <div class="form-group"></div>

            <div class="form-group"></div>
          </div>
        </li>
        <SlaReqGroup
          inputNm="SLA 정책관리"
          :SLAn.sync="formData.sla_yn"
          :type.sync="formData.sla_type"
          :totalCnt.sync="formData.sla_cnt"
          :TPSCnt.sync="formData.sla_cnt"
        />
        <SysExGroup inputNm="시스템 설명" v-model="formData.desc" />
        <ModalLayout size="m" v-if="modal">
          <template v-slot:modalHeader><h1 class="h1-tit">서비스 수정</h1> </template>
          <template v-slot:modalContainer> <p class="text">서비스를 수정하시겠습니까?</p></template>
          <template v-slot:modalFooter
            ><button class="lg-btn purple-btn" @click="editService()">확인</button
            ><button class="lg-btn purple-btn" @click="modalHide()">취소</button>
          </template>
        </ModalLayout>
      </ul>
    </template>
    <template v-if="!isShowProgress" v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="modalShow()">수정</button>
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
import { BasicAuthResponse, ServiceRegisterRequest } from '@/types/ServiceType';
import { USER_STATE } from '@/store/UserState';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    DateGroup,
    AuthReqGroup,
    SlaReqGroup,
    SysExGroup,
    ModalLayout,
  },
})
export default class SystemRegisterPage extends Vue {
  // router push 로 전달받은 id 는 this.$route.params.id 로 사용하시면 됩니다.
  serviceModule = getModule(ServiceModule, this.$store);
  isShowProgress = false;

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
    console.log(this.serviceOption);
    this.serviceModule.editServiceAction(this.serviceOption);
    this.$router.back();
  }

  createAuthId() {
    Math.random().toString(36).substr(2, 11);
  }

  created() {
    this.serviceModule.getService(this.$route.params.id);
  }

  get userState() {
    return this.serviceModule.currAsyncState;
  }

  @Watch('userState')
  onCurrAsyncStateChange(userState: USER_STATE) {
    console.log('userState : ', userState);
    if (userState === USER_STATE.LOADING) {
      this.isShowProgress = true;
    } else if (userState === USER_STATE.ERROR) {
      this.$modal.show('서버 통신 에러');
    } else if (userState === USER_STATE.DONE) {
      this.isShowProgress = false;
    }
  }

  modal = false;
  modalShow() {
    this.modal = true;
  }
  modalHide() {
    this.modal = false;
  }

  basicAuthClicked() {
    this.serviceModule.getBasicAuth();
  }

  get basicAuth(): BasicAuthResponse {
    return this.serviceModule.basicAuth;
  }

  @Watch('basicAuth.id')
  onIdChange(val: string) {
    this.formData.athn.BASIC_AUTH.id = val;
  }
  @Watch('basicAuth.pw')
  onPwChange(val: string) {
    this.formData.athn.BASIC_AUTH.pw = val;
  }

  destroyed() {
    this.serviceModule.setBasicAuth({ id: '', pw: '' });
  }
}
</script>
