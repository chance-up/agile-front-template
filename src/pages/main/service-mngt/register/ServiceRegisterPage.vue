<template>
  <div>
    <ContentLayout
      :title="$t('service.register')"
      :subTitle="$t('service.register_sub_title')"
      :depth="$t('service.title')"
      :isShowProgress="isShowProgress"
    >
      <template v-if="!isShowProgress" v-slot:contents>
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
            :startDt.sync="formData.svcStDt"
            :endDt.sync="formData.svcEndDt"
            :isvalid.sync="dateValid"
          />
          <AuthReqGroup
            @basicAuthClicked="basicAuthClicked"
            :inputNm="$t('service.authentication_method')"
            :basicId="basicAuth.id"
            :basicPw="basicAuth.pw"
            :athn.sync="showAuth"
            :alg.sync="JWTAlg.alg"
            :pickedAlg.sync="formData.athn.jwt.alg"
            :issuer.sync="formData.athn.jwt.iss"
            :subject.sync="formData.athn.jwt.aud"
            :publicKey.sync="formData.athn.jwt.pubKey"
            :isvalid.sync="authValid"
            :progress="isBasicAuthProgress"
          />
          <ApiAuthReqGroup inputNm="권한설정" @showApiAuth="showApiAuth" :setCheck="apiAuthValid" />
          <SlaReqGroup
            :inputNm="$t('service.SLA_mngt')"
            :secVal.sync="formData.sla.sec"
            :minVal.sync="formData.sla.min"
            :hourVal.sync="formData.sla.hr"
            :dayVal.sync="formData.sla.day"
            :monthVal.sync="formData.sla.mon"
            :onSec.sync="slaSec"
            :onMin.sync="slaMin"
            :onHr.sync="slaHr"
            :onDay.sync="slaDay"
            :onMon.sync="slaMon"
          />
          <InputGroup
            type="text"
            :inputNm="$t('service.tkcgrNm')"
            :placeholder="$t('service.tkcgrNmEx')"
            :value.sync="formData.tkcgrNm"
            :isvalid.sync="tkcgrNmValid"
          />
          <InputGroup
            type="text"
            :inputNm="$t('service.tkcgrPos')"
            :placeholder="$t('service.tkcgrPosEx')"
            :value.sync="formData.tkcgrPos"
            :isvalid.sync="tkcgrPosValid"
          />
          <InputGroup
            type="text"
            :inputNm="$t('service.tkcgrEml')"
            :placeholder="$t('service.tkcgrEmlEx')"
            inputClass="input-box lg check-ok"
            :value.sync="formData.tkcgrEml"
            :isvalid.sync="tkcgrEmlValid"
          />
          <SysExGroup :inputNm="$t('service.desc')" v-model="formData.desc" />
          <ModalLayout size="m" v-if="modal">
            <template v-slot:modalHeader
              ><h2 class="h1-tit">{{ $t('service.register') }}</h2>
            </template>
            <template v-slot:modalContainer>
              <p v-if="!isRegisterProgress" class="text">{{ $t('service.register_message') }}</p>
              <div v-if="isRegisterProgress" style="width: 100%; text-align: center">
                <b-spinner
                  v-show="isRegisterProgress"
                  style="width: 2.5rem; height: 2.5rem"
                  label="Large Spinner"
                ></b-spinner>
              </div>
            </template>
            <template v-slot:modalFooter
              ><button class="lg-btn purple-btn" @click="submit()">
                {{ $t('common.ok') }}</button
              ><button class="lg-btn white-btn" @click="modalHide()">
                {{ $t('common.cancel') }}
              </button>
            </template>
          </ModalLayout>
        </ul>
      </template>
      <template v-if="!isShowProgress" v-slot:buttons>
        <div class="btn-wrap">
          <button class="lg-btn purple-btn" @click="modalShow()" :disabled="isRegisterProgress">
            {{ $t('common.register') }}
            <b-spinner variant="light" v-show="isRegisterProgress" small></b-spinner>
          </button>
          <button class="lg-btn white-btn" @click="$router.go(-1)" :disabled="isRegisterProgress">
            {{ $t('common.cancel') }}
          </button>
        </div>
      </template>
    </ContentLayout>

    <ApiAuthModal
      :setApiList="apiList"
      :setCheckedApiList="checkedApiList"
      :setIsApiAuthProgress="isApiAuthProgress"
      :setShowApiAuthModal="showApiAuthModal"
      @checkApiAll="checkApiAll"
      @checkApi="checkApi"
      @deleteApi="deleteApi"
      @searchApi="searchApi"
      @registerApi="registerApi"
      @hideApiAuth="hideApiAuth"
    />
  </div>
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
import { BasicAuthResponse, JWTAlgResponse, ServiceRegisterRequest, ApiAuthResponse } from '@/types/ServiceType';
import TextDebounceForm from '@/components/service-mngt/TextDebounceForm.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import { BSpinner } from 'bootstrap-vue';
import ApiAuthModal from '@/components/service-mngt/ApiAuthModal.vue';
import ApiAuthReqGroup from '@/components/service-mngt/ApiAuthReqGroup.vue';

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
    ApiAuthModal,
    ApiAuthReqGroup,
  },
})
export default class SystemRegisterPage extends Vue {
  isBtnDisabled = true;
  idValid = false;
  tkcgrNmValid = true;
  tkcgrPosValid = true;
  tkcgrEmlValid = true;
  dateValid = false;
  authValid = false;
  apiAuthValid = true;
  slaSec = false;
  slaMin = false;
  slaHr = false;
  slaDay = false;
  slaMon = false;
  isBasicAuthProgress = false;
  isRegisterProgress = false;
  isShowProgress = false;
  isApiAuthProgress = false;
  showApiAuthModal = false;
  apiList: ApiAuthResponse[] = [];
  checkedApiList: ApiAuthResponse[] = [];

  serviceModule = getModule(ServiceModule, this.$store);

  formData: ServiceRegisterRequest = {
    id: '',
    tkcgrNm: '',
    tkcgrPos: '',
    tkcgrEml: '',
    sla: { sec: null, min: null, hr: null, day: null, mon: null },
    svcStDt: '',
    svcEndDt: '',
    athnType: '',
    athn: {
      basic: {
        id: null,
        pw: null,
      },
      jwt: {
        alg: null,
        iss: null,
        aud: null,
        pubKey: null,
      },
    },
    apiAut: [],
    desc: '',
  };
  showAuth = 'basic';
  @Watch('showAuth')
  onShowChange(val: string) {
    this.formData.athnType = val;
    console.log();
    if (val == 'basic') {
      this.formData.athn.jwt = {
        alg: null,
        iss: null,
        aud: null,
        pubKey: null,
      };
    } else {
      this.serviceModule.setBasicAuth({ id: null, pw: null });
    }
  }

  modal = false;
  modalShow() {
    const val =
      this.idValid &&
      this.tkcgrNmValid &&
      this.tkcgrPosValid &&
      this.tkcgrEmlValid &&
      this.dateValid &&
      this.authValid &&
      this.isDuplicatedId
        ? true
        : false;

    if (!val) {
      this.$modal.show(`${this.$t('service.empty_check_message')}`);
      return;
    } else {
      if (
        (this.slaSec == true && this.formData.sla.sec == null) ||
        (this.slaMin == true && this.formData.sla.min == null) ||
        (this.slaHr == true && this.formData.sla.hr == null) ||
        (this.slaDay == true && this.formData.sla.day == null) ||
        (this.slaMon == true && this.formData.sla.mon == null) ||
        (this.slaSec == true && this.formData.sla.sec == 0) ||
        (this.slaMin == true && this.formData.sla.min == 0) ||
        (this.slaHr == true && this.formData.sla.hr == 0) ||
        (this.slaDay == true && this.formData.sla.day == 0) ||
        (this.slaMon == true && this.formData.sla.mon == 0) ||
        this.formData.apiAut == []
      ) {
        this.$modal.show(`${this.$t('service.empty_check_message')}`);
      } else {
        this.modal = true;
      }
    }
  }
  modalHide() {
    this.modal = false;
  }

  submit() {
    console.log(this.formData);
    this.modal = false;
    this.isRegisterProgress = true;
    this.serviceModule
      .createServiceAction(this.formData)
      .then(() => {
        this.$router.push({ path: '/service' });
      })
      .catch(() => {
        this.isRegisterProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
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
      await this.serviceModule.getDuplicatedCheckId(this.formData.id).then(() => {
        this.isDuplicatedId = this.serviceModule.duplicatedId.isPkDuplicated;
      });
    }, 1000);
  }

  basicAuthClicked() {
    this.isBasicAuthProgress = true;

    this.serviceModule
      .getBasicAuth()
      .then(() => {
        this.isBasicAuthProgress = false;
      })
      .catch(() => {
        this.isBasicAuthProgress = false;
      });
  }

  get basicAuth(): BasicAuthResponse {
    return this.serviceModule.basicAuth;
  }

  @Watch('basicAuth.id')
  onIdChange(val: string) {
    this.formData.athn.basic.id = val;
  }
  @Watch('basicAuth.pw')
  onPwChange(val: string) {
    this.formData.athn.basic.pw = val;
  }

  get JWTAlg(): JWTAlgResponse {
    return this.serviceModule.JWTAlg;
  }

  get apiAuthList(): ApiAuthResponse[] {
    return this.serviceModule.apiAuthList;
  }

  showApiAuth() {
    this.showApiAuthModal = true;
    this.isApiAuthProgress = true;
    this.serviceModule
      .getApiAuthList()
      .then(() => {
        this.isApiAuthProgress = false;
        this.apiList = this.apiAuthList.map((item) => {
          return { ...item };
        });
        this.checkedApiList = this.formData.apiAut.map((item) => {
          return { ...item };
        });
      })
      .catch(() => {
        this.isApiAuthProgress = false;
      });
  }

  hideApiAuth() {
    this.showApiAuthModal = false;
    if (this.checkedApiList.length == 0) {
      this.apiAuthValid = false;
    } else {
      this.apiAuthValid = true;
    }
  }

  checkApi(sys: string, api: string) {
    if (this.checkedApiList.find((item) => item.sysId === sys)) {
      if (this.checkedApiList[this.checkedApiList.findIndex((item) => item.sysId === sys)].apiId.includes(api)) {
        if (this.checkedApiList[this.checkedApiList.findIndex((item) => item.sysId === sys)].apiId.length === 1) {
          this.checkedApiList = this.checkedApiList.filter((item) => item.sysId !== sys);
        } else {
          this.checkedApiList[this.checkedApiList.findIndex((item) => item.sysId === sys)].apiId = this.checkedApiList[
            this.checkedApiList.findIndex((item) => item.sysId === sys)
          ].apiId.filter((item) => item !== api);
        }
      } else {
        this.checkedApiList[this.checkedApiList.findIndex((item) => item.sysId === sys)].apiId.push(api);
      }
    } else {
      this.checkedApiList.push({ sysId: sys, apiId: [api] });
    }
  }

  deleteApi(sys: string, api: string) {
    this.checkedApiList[this.checkedApiList.findIndex((item) => item.sysId === sys)].apiId = this.checkedApiList[
      this.checkedApiList.findIndex((item) => item.sysId === sys)
    ].apiId.filter((item) => item !== api);
  }

  checkApiAll(apiAll: ApiAuthResponse) {
    if (this.checkedApiList.find((item) => item.sysId === apiAll.sysId)) {
      if (this.checkedApiList.find((item) => item.sysId === apiAll.sysId)?.apiId.length === apiAll.apiId.length) {
        this.checkedApiList = this.checkedApiList.filter((item) => item.sysId !== apiAll.sysId);
      } else {
        this.checkedApiList[this.checkedApiList.findIndex((item) => item.sysId === apiAll.sysId)].apiId = apiAll.apiId;
      }
    } else {
      console.log(apiAll);
      this.checkedApiList.push({ sysId: apiAll.sysId, apiId: apiAll.apiId });
    }
  }

  searchApi(searchText: string) {
    if (searchText !== '') {
      console.log('공백 아닐 때 apiAuthList : ', this.apiAuthList);
      this.apiList = this.apiAuthList.map((item) => {
        return { ...item };
      });
      this.apiList.forEach((api, index) => {
        this.apiList[index].apiId = this.apiList[index].apiId.filter((item) => item.includes(searchText));
      });
      this.apiList = this.apiList.filter((item) => item.apiId.length !== 0);
    } else {
      console.log('공백일 때 apiAuthList : ', this.apiAuthList);
      this.apiList = this.apiAuthList.map((item) => {
        return { ...item };
      });
    }
  }

  registerApi(api: ApiAuthResponse[]) {
    this.formData.apiAut = api;
    this.showApiAuthModal = false;
    if (api.length == 0) {
      this.apiAuthValid = false;
    } else {
      console.log(api);
      this.apiAuthValid = true;
    }
  }

  created() {
    this.isShowProgress = true;
    this.serviceModule
      .getJWTAlg()
      .then(() => {
        this.isShowProgress = false;
      })
      .catch(() => {
        this.isShowProgress = false;
        this.$modal.show(`${this.$t('api.server_error')}`);
      });
  }

  destroyed() {
    this.serviceModule.release();
    this.serviceModule.serviceReset();
    this.serviceModule.setBasicAuth({ id: null, pw: null });
  }
}
</script>
