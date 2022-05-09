<template>
  <ContentLayout
    :isShowProgress="isShowProgress"
    :title="$t('service.modify_title')"
    :subTitle="$t('service.modify_sub_title')"
    :depth="$t('service.title')"
  >
    <template v-slot:contents v-if="formData.id != ''">
      <ul>
        <InputGroup
          type="text"
          :inputNm="$t('service.id')"
          :placeholder="$t('service.idEx')"
          inputClass="input-box lg check-ok"
          :disabled="true"
          :value.sync="formData.id"
        />
        <DateGroup
          :inputNm="$t('service.date')"
          placeholderStart="YYYY-MM-DD"
          placeholderENd="YYYY-MM-DD"
          :startDt.sync="formData.svc_st_dt"
          :endDt.sync="formData.svc_end_dt"
          :isvalid.sync="dateValid"
        />

        <AuthReqGroup
          @basicAuthClicked="basicAuthClicked"
          :inputNm="$t('service.authentication_method')"
          :basicId="basicAuth.id"
          :basicPw="basicAuth.pw"
          :athn.sync="showAuth"
          :alg.sync="JWTAlg.alg"
          :pickedAlg.sync="formData.athn.JWT.alg"
          :issuer.sync="formData.athn.JWT.issuer"
          :subject.sync="formData.athn.JWT.subject"
          :publicKey.sync="formData.athn.JWT.publickey"
          :isvalid.sync="authValid"
          :progress="isBasicAuthProgress"
        ></AuthReqGroup>
        <li>
          <label class="label point">{{ $t('service.api_mngt') }}</label>
          <div class="form-cont">
            <div class="form-group"></div>

            <div class="form-group"></div>
          </div>
        </li>
        <SlaReqGroup
          :inputNm="$t('service.SLA_mngt')"
          :SLAn.sync="formData.sla_yn"
          :type.sync="formData.sla_type"
          :totalCnt.sync="formData.sla_cnt"
          :TPSCnt.sync="formData.sla_cnt"
        />
        <InputGroup
          type="text"
          :inputNm="$t('service.tkcgrNm')"
          :placeholder="$t('service.tkcgrNmEx')"
          :value.sync="formData.tkcgr_nm"
          :isvalid.sync="tkcgrNmValid"
        />
        <InputGroup
          type="text"
          :inputNm="$t('service.tkcgrPos')"
          :placeholder="$t('service.tkcgrPosEx')"
          :value.sync="formData.tkcgr_pos"
          :isvalid.sync="tkcgrPosValid"
        />
        <InputGroup
          type="text"
          :inputNm="$t('service.tkcgrEml')"
          :placeholder="$t('service.tkcgrEmlEx')"
          inputClass="input-box lg check-ok"
          :value.sync="formData.tkcgr_eml"
          :isvalid.sync="tkcgrEmlValid"
        />
        <SysExGroup :inputNm="$t('service.desc')" v-model="formData.desc" />
        <ModalLayout size="m" v-if="modal">
          <template v-slot:modalHeader
            ><h1 class="h1-tit">{{ $t('service.modify') }}</h1>
          </template>
          <template v-slot:modalContainer>
            <p v-if="!isShowProgress" class="text">{{ $t('service.modify_message') }}</p>
            <div v-if="isShowProgress" style="width: 100%; text-align: center">
              <b-spinner
                v-show="isShowProgress"
                style="width: 2.5rem; height: 2.5rem"
                label="Large Spinner"
              ></b-spinner></div
          ></template>
          <template v-slot:modalFooter
            ><button :disabled="isShowProgress" class="lg-btn purple-btn" @click="editService()">
              {{ $t('common.ok') }}</button
            ><button :disabled="isShowProgress" class="lg-btn purple-btn" @click="modalHide()">
              {{ $t('common.cancel') }}
            </button>
          </template>
        </ModalLayout>
      </ul>
    </template>
    <template v-slot:buttons v-if="!isShowProgress">
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="modalShow()" :disabled="isBtnDisabled || isShowProgress">
          {{ $t('common.register') }}
        </button>
        <button class="lg-btn white-btn" @click="$router.back()" :disabled="isShowProgress">
          {{ $t('common.cancel') }}
        </button>
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
import { BasicAuthResponse, JWTAlgResponse, ServiceRegisterRequest } from '@/types/ServiceType';
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
  isBasicAuthProgress = false;

  isBtnDisabled = true;
  totalValid: boolean[] = [true, true, true, true, true];
  tkcgrNmValid = null;
  dateValid = null;
  tkcgrPosValid = null;
  tkcgrEmlValid = null;
  authValid = null;

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
        id: null,
        pw: null,
      },
      JWT: {
        alg: null,
        issuer: null,
        subject: null,
        publickey: null,
      },
    },
    api_aut: '',
    desc: '',
  };

  showAuth = '';
  @Watch('serviceOption')
  onServiceOptionChanged() {
    if (this.serviceOption.athn.BASIC_AUTH?.id != '') {
      this.showAuth = 'BASIC_AUTH';
    } else {
      this.showAuth = 'JWT';
    }
    this.formData = this.serviceOption;
  }

  @Watch('showAuth')
  onShowChange(val: string) {
    console.log(this.showAuth);
    if (val == 'BASIC_AUTH') {
      this.formData.athn.JWT = {
        alg: null,
        issuer: null,
        subject: null,
        publickey: null,
      };
    } else if (val == 'JWT') {
      this.serviceModule.setBasicAuth({ id: null, pw: null });
    }
  }

  @Watch('tkcgrNmValid')
  onTkcgrNmValidChange(newVal: boolean) {
    this.totalValid.splice(0, 1, newVal);
  }

  @Watch('tkcgrPosValid')
  onTkcgrPosValidChange(newVal: boolean) {
    this.totalValid.splice(1, 1, newVal);
  }

  @Watch('tkcgrEmlValid')
  onTkcgrEmlValidChange(newVal: boolean) {
    this.totalValid.splice(2, 1, newVal);
  }

  @Watch('dateValid')
  onDateValidChange(newVal: boolean) {
    this.totalValid.splice(3, 1, newVal);
  }

  @Watch('authValid')
  onAuthValidChange(newVal: boolean) {
    this.totalValid.splice(4, 1, newVal);
  }

  @Watch('totalValid')
  onTotalValidChange(newVal: boolean[]) {
    if (newVal.every((item) => item === true)) this.isBtnDisabled = false;
    else this.isBtnDisabled = true;
  }

  async editService() {
    const val =
      this.tkcgrNmValid == false ||
      this.tkcgrPosValid == false ||
      this.tkcgrEmlValid == false ||
      this.dateValid == false ||
      this.authValid == false
        ? false
        : true;

    if (!val) {
      this.$modal.show('빈 항목이 있습니다.');
      return;
    } else {
      await this.serviceModule.editServiceAction(this.serviceOption);
      this.$router.back();
    }
  }

  createAuthId() {
    Math.random().toString(36).substr(2, 11);
  }

  created() {
    this.serviceModule.getService(this.$route.params.id);
    this.serviceModule.getJWTAlg();
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

  get basicAuthState() {
    return this.serviceModule.basicAuthState;
  }

  @Watch('basicAuthState')
  onBasicAuthStateChange(userState: USER_STATE) {
    console.log('userState : ', userState);
    if (userState === USER_STATE.LOADING) {
      this.isBasicAuthProgress = true;
    } else if (userState === USER_STATE.ERROR) {
      this.$modal.show('서버 통신 에러');
    } else if (userState === USER_STATE.DONE) {
      this.isBasicAuthProgress = false;
    }
  }

  get JWTAlg(): JWTAlgResponse {
    return this.serviceModule.JWTAlg;
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
