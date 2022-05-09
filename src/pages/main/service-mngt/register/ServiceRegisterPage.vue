<template>
  <ContentLayout
    :title="$t('service.register')"
    :subTitle="$t('service.register_sub_title')"
    :depth="$t('service.title')"
  >
    <template v-slot:contents>
      <ul>
        <TextDebounceForm
          type="text"
          :inputNm="$t('service.id')"
          :check="isDuplicatedId"
          :placeholder="$t('service.idEx')"
          v-model="formData.id"
          @input="duplicateCheckId()"
          :isvalid.sync="idValid"
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
          :athn.sync="show"
          :alg.sync="JWTAlg.alg"
          :pickedAlg.sync="formData.athn.JWT.alg"
          :issuer.sync="formData.athn.JWT.issuer"
          :subject.sync="formData.athn.JWT.subject"
          :publicKey.sync="formData.athn.JWT.publickey"
          :isvalid.sync="authValid"
          :progress="isBasicAuthProgress"
        ></AuthReqGroup>
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
            ><h2 class="h1-tit">{{ $t('service.register') }}</h2>
          </template>
          <template v-slot:modalContainer>
            <p v-if="!isShowProgress" class="text">{{ $t('service.register_message') }}</p>
            <div v-if="isShowProgress" style="width: 100%; text-align: center">
              <b-spinner
                v-show="isShowProgress"
                style="width: 2.5rem; height: 2.5rem"
                label="Large Spinner"
              ></b-spinner>
            </div>
          </template>
          <template v-slot:modalFooter
            ><button class="lg-btn purple-btn" @click="submit()">
              {{ $t('common.ok') }}</button
            ><button class="lg-btn purple-btn" @click="modalHide()">
              {{ $t('common.cancel') }}
            </button>
          </template>
        </ModalLayout>
      </ul>
    </template>
    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="modalShow()" :disabled="isShowProgress">
          {{ $t('common.register') }}<b-spinner v-show="isShowProgress" small></b-spinner>
        </button>
        <button class="lg-btn white-btn" @click="$router.go(-1)" :disabled="isShowProgress">
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
import TextDebounceForm from '@/components/service-mngt/TextDebounceForm.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import { USER_STATE } from '@/store/UserState';
import { BSpinner } from 'bootstrap-vue';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    DateGroup,
    AuthReqGroup,
    SlaReqGroup,
    SysExGroup,
    TextDebounceForm,
    ModalLayout,
    BSpinner,
  },
})
export default class SystemRegisterPage extends Vue {
  show = 'BASIC_AUTH';
  isBtnDisabled = true;
  idValid = false;
  tkcgrNmValid = false;
  tkcgrPosValid = false;
  tkcgrEmlValid = false;
  dateValid = false;
  authValid = false;
  isBasicAuthProgress = false;

  @Watch('show')
  onShowChange(val: string) {
    if (val == 'BASIC_AUTH') {
      this.formData.athn.JWT = {
        alg: null,
        issuer: null,
        subject: null,
        publickey: null,
      };
    } else {
      this.serviceModule.setBasicAuth({ id: null, pw: null });
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

  modal = false;
  modalShow() {
    const val =
      this.idValid && this.tkcgrNmValid && this.tkcgrPosValid && this.tkcgrEmlValid && this.dateValid && this.authValid
        ? // &&this.isDuplicatedId
          true
        : false;

    if (!val) {
      this.$modal.show('빈 항목이 있습니다.');
      return;
    } else {
      this.modal = true;
    }
  }
  modalHide() {
    this.modal = false;
  }

  async submit() {
    console.log(this.formData);
    this.modal = false;
    await this.serviceModule.createserviceAction(this.formData);
    this.$router.push({ path: '/service' });
  }

  timerId = 0;
  isDuplicatedId: boolean | null = null;
  duplicateCheckId() {
    if (this.timerId) {
      this.isDuplicatedId = null;
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(async () => {
      console.log(this.formData.id);
      await this.serviceModule.getDuplicatedCheckId(this.formData.id);
      this.isDuplicatedId = this.serviceModule.duplicatedId.isDuplicated;
    }, 1000);
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

  get JWTAlg(): JWTAlgResponse {
    return this.serviceModule.JWTAlg;
  }

  isShowProgress = false;

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

  created() {
    this.serviceModule.getJWTAlg();
  }

  destroyed() {
    this.serviceModule.release();
    this.serviceModule.serviceReset();
    this.serviceModule.setBasicAuth({ id: null, pw: null });
  }
}
</script>
