<template>
  <ContentLayout title="서비스 등록" subTitle="기본정보 등록" depth="서비스 관리">
    <template v-slot:contents>
      <ul>
        <TextDebounceForm
          type="text"
          :inputNm="$t('service.name')"
          :check="isDuplicatedNm"
          :placeholder="$t('service.nameEx')"
          v-model="formData.nm"
          @input="duplicateCheckNm()"
          :isvalid.sync="nmValid"
        />
        <TextDebounceForm
          type="text"
          :inputNm="$t('service.id')"
          :check="isDuplicatedId"
          :placeholder="$t('service.idEx')"
          v-model="formData.id"
          @input="duplicateCheckId()"
          :isvalid.sync="idValid"
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
        <DateGroup
          inputNm="서비스 기간"
          placeholderStart="YYYY-MM-DD"
          placeholderENd="YYYY-MM-DD"
          :startDt.sync="formData.svc_st_dt"
          :endDt.sync="formData.svc_end_dt"
          :isvalid.sync="dateValid"
        />
        <AuthReqGroup
          @basicAuthClicked="basicAuthClicked"
          inputNm="인증수단"
          :basicId="basicAuth.id"
          :basicPw="basicAuth.pw"
          :athn.sync="show"
          :alg.sync="JWTAlg.alg"
          :pickedAlg.sync="formData.athn.JWT.alg"
          :issuer.sync="formData.athn.JWT.issuer"
          :subject.sync="formData.athn.JWT.subject"
          :publicKey.sync="formData.athn.JWT.publickey"
          :isvalid.sync="authValid"
        ></AuthReqGroup>
        <SlaReqGroup
          inputNm="SLA 정책관리"
          :SLAn.sync="formData.sla_yn"
          :type.sync="formData.sla_type"
          :totalCnt.sync="formData.sla_cnt"
          :TPSCnt.sync="formData.sla_cnt"
        />
        <SysExGroup inputNm="시스템 설명" v-model="formData.desc" />

        <ModalLayout size="m" v-if="modal">
          <template v-slot:modalHeader><h2 class="h1-tit">서비스 등록</h2> </template>
          <template v-slot:modalContainer>
            <p v-if="!isShowProgress" class="text">서비스를 등록하시겠습니까?</p>
            <div v-if="isShowProgress" style="width: 100%; text-align: center">
              <b-spinner
                v-show="isShowProgress"
                style="width: 2.5rem; height: 2.5rem"
                label="Large Spinner"
              ></b-spinner>
            </div>
          </template>
          <template v-slot:modalFooter
            ><button :disabled="isShowProgress" class="lg-btn purple-btn" @click="submit()">확인</button
            ><button :disabled="isShowProgress" class="lg-btn purple-btn" @click="modalHide()">취소</button>
          </template>
        </ModalLayout>
      </ul>
    </template>
    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="modalShow()" :disabled="isBtnDisabled || isShowProgress">등록</button>
        <button class="lg-btn white-btn" @click="$router.go(-1)" :disabled="isShowProgress">취소</button>
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
  totalValid: boolean[] = [false, false, false, false, false, false, false];
  nmValid = false;
  idValid = false;
  tkcgrNmValid = false;
  tkcgrPosValid = false;
  tkcgrEmlValid = false;
  dateValid = false;
  authValid = false;

  @Watch('nmValid')
  onNmValidChange(newVal: boolean) {
    this.totalValid.splice(0, 1, newVal);
  }

  @Watch('idValid')
  onIdValidChange(newVal: boolean) {
    this.totalValid.splice(1, 1, newVal);
  }

  @Watch('tkcgrNmValid')
  onTkcgrNmValidChange(newVal: boolean) {
    this.totalValid.splice(2, 1, newVal);
  }

  @Watch('tkcgrPosValid')
  onTkcgrPosValidChange(newVal: boolean) {
    this.totalValid.splice(3, 1, newVal);
  }

  @Watch('tkcgrEmlValid')
  onTkcgrEmlValidChange(newVal: boolean) {
    this.totalValid.splice(4, 1, newVal);
  }

  @Watch('dateValid')
  onDateValidChange(newVal: boolean) {
    this.totalValid.splice(5, 1, newVal);
  }

  @Watch('authValid')
  onAuthValidChange(newVal: boolean) {
    this.totalValid.splice(6, 1, newVal);
  }

  @Watch('isDuplicatedNm')
  onIsDuplicatedNmValidChange(newVal: boolean) {
    this.totalValid.splice(7, 1, newVal);
  }

  // @Watch('isDuplicatedId')
  // onIsDuplicatedIdValidChange(newVal: boolean) {
  //   this.totalValid.splice(7, 1, newVal);
  // }

  @Watch('totalValid')
  onTotalValidChange(newVal: boolean[]) {
    if (newVal.every((item) => item === true)) this.isBtnDisabled = false;
    else this.isBtnDisabled = true;
  }

  @Watch('show')
  onShowChange(val: string) {
    if (val == 'BASIC_AUTH') {
      this.formData.athn.JWT = {
        alg: '',
        issuer: '',
        subject: '',
        publickey: '',
      };
    } else {
      this.serviceModule.setBasicAuth({ id: '', pw: '' });
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
        alg: '',
        issuer: '',
        subject: '',
        publickey: '',
      },
    },
    api_aut: '',
    desc: '',
  };

  modal = false;
  modalShow() {
    this.modal = true;
  }
  modalHide() {
    this.modal = false;
  }

  async submit() {
    const val =
      this.nmValid &&
      this.idValid &&
      this.tkcgrNmValid &&
      this.tkcgrPosValid &&
      this.tkcgrEmlValid &&
      this.dateValid &&
      this.authValid &&
      this.isDuplicatedNm
        ? // &&this.isDuplicatedId
          true
        : false;

    if (!val) {
      this.$modal.show('빈 항목이 있습니다.');
      return;
    } else {
      console.log(this.formData);
      await this.serviceModule.createserviceAction(this.formData);
      this.$router.back();
    }
  }

  timerNm = 0;
  isDuplicatedNm: boolean | null = null;
  duplicateCheckNm() {
    if (this.timerNm) {
      this.isDuplicatedNm = null;
      clearTimeout(this.timerNm);
    }
    this.timerNm = setTimeout(async () => {
      console.log(this.formData.nm);
      await this.serviceModule.getDuplicatedCheckNm(this.formData.nm);
      this.isDuplicatedNm = this.serviceModule.duplicatedNm.isDuplicated;
    }, 1000);
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

  created() {
    this.serviceModule.getJWTAlg();
  }
  destroyed() {
    this.serviceModule.setBasicAuth({ id: '', pw: '' });
  }
}
</script>
