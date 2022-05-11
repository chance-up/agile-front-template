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
          <li>
            <label class="label point">{{ $t('service.api_mngt') }}</label>
            <div class="form-cont">
              <button class="sm-btn" @click="showApiMngt()">권한설정</button>
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
              ><button class="lg-btn purple-btn" @click="modalHide()">
                {{ $t('common.cancel') }}
              </button>
            </template>
          </ModalLayout>
        </ul>
      </template>
      <template v-if="!isShowProgress" v-slot:buttons>
        <div class="btn-wrap">
          <button class="lg-btn purple-btn" @click="modalShow()" :disabled="isRegisterProgress">
            {{ $t('common.register') }}<b-spinner v-show="isRegisterProgress" small></b-spinner>
          </button>
          <button class="lg-btn white-btn" @click="$router.go(-1)" :disabled="isRegisterProgress">
            {{ $t('common.cancel') }}
          </button>
        </div>
      </template>
    </ContentLayout>
    <div v-if="showApiMngtModal" id="app" class="body-wrap">
      <!------- handler pop -------->
      <div class="pop-wrap lg-pop">
        <div class="pop-header">
          <h1 class="h1-tit">API 권한관리</h1>
          <button>
            <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
          </button>
        </div>

        <div class="pop-container">
          <div class="api-wrap">
            <div class="comp">
              <div class="search-form">
                <input class="input-box" type="text" placeholder="API 검색" />
              </div>
              <ul class="api-list">
                <li v-for="(list, index) in ['A', 'B', 'C']" :key="index">
                  <a class="stick">시스템_{{ list }}</a>
                  <div class="api-group">
                    <div class="check-all">
                      <div class="check-box">
                        <div class="check"><input type="checkbox" id="checkAll" /><span class="checkmark"></span></div>
                        <label for="checkAll">전체 선택</label>
                      </div>
                    </div>
                    <div class="check-group">
                      <div class="check-box" v-for="(list, index) in 4" :key="index">
                        <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                        <label for="checkGet">시스템_A_API _{{ index + 1 }}</label>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="comp gray">
              <div class="box-tit">
                <h3 class="h3-tit">권한 부여 된 API</h3>
                <p class="total">total : <span>6</span></p>
              </div>

              <div class="api-cont">
                <div class="api-stick" v-for="(list, index) in 3" :key="index">
                  <span>시스템_A_API_{{ index + 1 }}</span>
                  <button>
                    <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  // pop-container   -->

        <div class="pop-footer">
          <button class="lg-btn purple-btn">저장</button>
          <button class="lg-btn white-btn" @click="hideApiMngt()">취소</button>
        </div>
      </div>
      <!------- handler pop -------->
    </div>
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
import { BasicAuthResponse, JWTAlgResponse, ServiceRegisterRequest } from '@/types/ServiceType';
import TextDebounceForm from '@/components/service-mngt/TextDebounceForm.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import { BSpinner } from 'bootstrap-vue';
import ApiMngtModal from '@/components/service-mngt/ApiMngtModal.vue';

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
    ApiMngtModal,
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
  slaSec = false;
  slaMin = false;
  slaHr = false;
  slaDay = false;
  slaMon = false;
  isBasicAuthProgress = false;
  isRegisterProgress = false;
  isShowProgress = false;
  showApiMngtModal = false;

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
    sla: { sec: null, min: null, hr: null, day: null, mon: null },
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

  submit() {
    console.log(this.formData);
    this.modal = false;
    this.isRegisterProgress = true;
    this.serviceModule
      .createServiceAction(this.formData)
      .then(() => {
        this.$router.push({ path: '/service' });
      })
      .catch((error) => {
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
      await this.serviceModule.getDuplicatedCheckId(this.formData.id);
      this.isDuplicatedId = this.serviceModule.duplicatedId.isDuplicated;
    }, 1000);
  }

  basicAuthClicked() {
    this.isBasicAuthProgress = true;

    this.serviceModule
      .getBasicAuth()
      .then(() => {
        this.isBasicAuthProgress = false;
      })
      .catch((error) => {
        this.isBasicAuthProgress = false;
      });
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

  showApiMngt() {
    this.showApiMngtModal = true;
  }
  hideApiMngt() {
    this.showApiMngtModal = false;
  }

  created() {
    this.isShowProgress = true;
    this.serviceModule
      .getJWTAlg()
      .then(() => {
        this.isShowProgress = false;
      })
      .catch((error) => {
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
