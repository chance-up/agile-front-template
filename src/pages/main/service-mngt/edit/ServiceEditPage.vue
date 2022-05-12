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
          :issuer.sync="formData.athn.JWT.iss"
          :subject.sync="formData.athn.JWT.aud"
          :publicKey.sync="formData.athn.JWT.pubKey"
          :isvalid.sync="authValid"
          :progress="isBasicAuthProgress"
        ></AuthReqGroup>
        <li>
          <label class="label point">{{ $t('service.api_mngt') }}</label>
          <div class="form-cont">
            <button class="sm-btn">권한설정 변경</button>
          </div>
        </li>
        <SlaReqGroup
          :inputNm="$t('service.SLA_mngt')"
          :secVal.sync="formData.sla.sec"
          :minVal.sync="formData.sla.min"
          :hourVal.sync="formData.sla.hr"
          :dayVal.sync="formData.sla.day"
          :monthVal.sync="formData.sla.mon"
          :onSec.sync="slaSec"
          :onMin.sync="slaMin"
          :onHour.sync="slaHr"
          :onDay.sync="slaDay"
          :onMonth.sync="slaMon"
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
            <div v-if="isShowProgress" style="width: 100%; text-align: center"></div
          ></template>
          <template v-slot:modalFooter
            ><button class="lg-btn purple-btn" @click="editService()">
              {{ $t('common.ok') }}</button
            ><button class="lg-btn white-btn" @click="modalHide()">
              {{ $t('common.cancel') }}
            </button>
          </template>
        </ModalLayout>
      </ul>
    </template>
    <template v-slot:buttons v-if="formData.id != ''">
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="modalShow()" :disabled="isRegisterProgress">
          {{ $t('common.modify') }}
          <b-spinner variant="light" v-show="isRegisterProgress" small></b-spinner>
        </button>
        <button class="lg-btn white-btn" @click="$router.back()" :disabled="isRegisterProgress">
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
  isRegisterProgress = false;

  isBtnDisabled = true;
  tkcgrNmValid = null;
  dateValid = null;
  tkcgrPosValid = null;
  tkcgrEmlValid = null;
  authValid = null;
  slaSec = false;
  slaMin = false;
  slaHr = false;
  slaDay = false;
  slaMon = false;

  get serviceOption(): ServiceRegisterRequest {
    return this.serviceModule.service;
  }

  formData: ServiceRegisterRequest = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    sla: { sec: null, min: null, hr: null, day: null, mon: null },
    svc_st_dt: '',
    svc_end_dt: '',
    athn: {
      basic: {
        id: null,
        pw: null,
      },
      JWT: {
        alg: null,
        iss: null,
        aud: null,
        pubKey: null,
      },
    },
    athnType: '',
    apiAut: [],
    desc: '',
  };

  showAuth = '';
  @Watch('serviceOption')
  onServiceOptionChanged() {
    if (this.serviceOption.athn.basic?.id != '') {
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
        iss: null,
        aud: null,
        pubKey: null,
      };
    } else if (val == 'JWT') {
      this.serviceModule.setBasicAuth({ id: null, pw: null });
    }
  }

  editService() {
    this.modal = false;
    this.isRegisterProgress = true;
    this.serviceModule
      .createServiceAction(this.formData)
      .then(() => {
        this.$router.back();
      })
      .catch(() => {
        this.isRegisterProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }

  createAuthId() {
    Math.random().toString(36).substr(2, 11);
  }

  created() {
    this.isShowProgress = true;
    Promise.all([this.serviceModule.getService(this.$route.params.id), this.serviceModule.getJWTAlg()])
      .then(() => {
        this.isShowProgress = false;
      })
      .catch(() => {
        this.isShowProgress = false;
        this.$modal.show(`${this.$t('api.server_error')}`);
      });
  }

  get JWTAlg(): JWTAlgResponse {
    return this.serviceModule.JWTAlg;
  }

  modal = false;
  modalShow() {
    const val =
      this.tkcgrNmValid == false ||
      this.tkcgrPosValid == false ||
      this.tkcgrEmlValid == false ||
      this.dateValid == false ||
      this.authValid == false
        ? false
        : true;

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
        (this.slaMon == true && this.formData.sla.mon == 0)
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

  destroyed() {
    this.serviceModule.release();
    this.serviceModule.serviceReset();
    this.serviceModule.setBasicAuth({ id: null, pw: null });
  }
}
</script>
