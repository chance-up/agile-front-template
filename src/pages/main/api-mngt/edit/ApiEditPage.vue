<template lang="html">
  <!-- for progress -->
  <ContentLayout
    :title="$t('api.apiInformationEdit')"
    :subTitle="$t('api.basicInformation') + $t('api.edit')"
    :depth="$t('api.apiManagement')"
    :isShowProgress="isShowProgress"
    id="api-register"
  >
    <!-- for progress -->
    <template v-slot:contents v-if="!isShowProgress">
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <TextForm
          :groupNm="$t('api.sysId')"
          type="text"
          :required="true"
          v-model="requestBody.sysId"
          :disabled="true"
        />
        <TextForm :groupNm="$t('api.apiId')" type="text" :required="true" v-model="requestBody.id" :disabled="true" />
        <TextForm
          :groupNm="$t('api.interfaceNumber')"
          type="text"
          :required="true"
          :disabled="true"
          v-model="requestBody.ifNo"
        />

        <MethodForm groupNm="Method" v-model="requestBody.meth" :isvalid.sync="methodValid" />
        <UriForm groupNm="URI" :uriIn="requestBody.uriIn" v-model="requestBody.uriOut" :isvalid.sync="uriValid" />
        <EndPointGroup groupNm="End-point" :edptList="edptList" />

        <HandlerGroupForm
          :groupNm="$t('api.resHndlrGrp')"
          :reqHandlerGroupList="reqHandlerGroupList"
          :resHandlerGroupList="resHandlerGroupList"
          :resHandlerGroupId="requestBody.resHndlrGrpId"
          :reqHandlerGroupId="requestBody.reqHndlrGrpId"
          @reqInput="
            (msg) => {
              requestBody.reqHndlrGrpId = msg;
            }
          "
          @resInput="
            (msg) => {
              requestBody.resHndlrGrpId = msg;
            }
          "
        />
        <TextForm
          :groupNm="$t('api.timeOutMS')"
          type="number"
          :required="true"
          v-model="requestBody.timeOut"
          :isvalid.sync="timeoutValid"
        />
        <TextForm
          :groupNm="$t('api.apiDescription')"
          type="textarea"
          v-model="requestBody.desc"
          :isvalid.sync="descValid"
        />
        <ModalLayout size="m" v-if="showModal">
          <template v-slot:modalHeader><h1 class="h1-tit">API 수정</h1> </template>
          <template v-slot:modalContainer>
            <p class="text">API를 수정하시겠습니까?</p>
          </template>
          <template v-slot:modalFooter>
            <button class="lg-btn purple-btn" @click="onSubmit">{{ $t('common.ok') }}</button>
            <button class="lg-btn purple-btn" @click="showModal = false">{{ $t('common.cancel') }}</button>
          </template>
        </ModalLayout>
      </ul>
    </template>
    <!-- for progress -->
    <template v-slot:buttons v-if="!isShowProgress">
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="handleClickTestSubmitButton">수정테스트</button>
        <!-- <button class="lg-btn purple-btn" @click="$router.push({ path: '/api' })">{{ $t('api.edit') }}</button> -->
        <button :disabled="isButtonDisabled" class="lg-btn purple-btn" @click="onClickSubmitButton">
          {{ $t('api.edit') }}
          <b-spinner variant="light" label="Spinning" v-if="isButtonDisabled" small></b-spinner>
        </button>
        <button :disabled="isButtonDisabled" class="lg-btn white-btn" @click="$router.go(-1)">
          {{ $t('common.cancel') }}
        </button>
      </div>
    </template>
  </ContentLayout>
</template>

<script lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiCreateRequestBody, ApiUpdateRequestBody } from '@/types/ApiType';
import { HandlerGroupDetail } from '@/types/HandlerType';
import HandlerGroupForm from '@/components/api-mngt/register/HandlerGroupForm.vue';
import SelectForm from '@/components/api-mngt/register/SelectForm.vue';
import TextForm from '@/components/api-mngt/register/TextForm.vue';
import MethodForm from '@/components/api-mngt/register/MethodForm.vue';
import UriForm from '@/components/api-mngt/register/UriForm.vue';
import TextDebounceForm from '@/components/api-mngt/register/TextDebounceForm.vue';
import EndPointGroup from '@/components/api-mngt/register/EndPointGroup.vue';
import ApiModule from '@/store/modules/ApiModule';
import { Dictionary } from 'vue-router/types/router';
import { SystemResponse } from '@/types/SystemType';
import { getModule } from 'vuex-module-decorators';
import SystemModule from '@/store/modules/SystemModule';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
// for progress
import { USER_STATE } from '@/store/UserState';
import axios from 'axios';
import HandlerModule from '@/store/modules/HandlerModule';

@Component({
  components: {
    ContentLayout,
    HandlerGroupForm,
    SelectForm,
    TextForm,
    TextDebounceForm,
    MethodForm,
    UriForm,
    ModalLayout,
    EndPointGroup,
  },
})
export default class ApiEditPage extends Vue {
  showModal = false;
  showPage = false;

  apiModule = getModule(ApiModule, this.$store);
  systemModule = getModule(SystemModule, this.$store);
  handlerModule = getModule(HandlerModule, this.$store);

  get params(): Dictionary<string> | null {
    console.log(this.$route.params);
    return this.$route.params;
  }
  get apiDetail(): ApiCreateRequestBody | null {
    return this.apiModule.apiDetail;
  }
  get system(): SystemResponse {
    return this.systemModule.system;
  }
  created() {
    this.isShowProgress = true;
    this.apiModule.getApiDetail(this.$route.params.id);
    console.log('APiRegisterPage created');
    axios
      .all([
        // this.systemModule.getSystemDetail(), api detail 꺼내고 sysId로 sysDetail 콜
        this.apiModule.getApiDetail(this.$route.params.id),
        this.handlerModule.getReqHandlerGroupList(),
        this.handlerModule.getResHandlerGroupList(),
      ])
      .then(() => {
        console.log();
      })
      .catch(() => {
        this.isShowProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }
  // apiDetail 저장소 업데이트시 컴포넌트 초기값 업데이트 및 system detail 콜
  @Watch('apiDetail')
  onApiDetailChange() {
    if (this.apiDetail) {
      this.requestBody = {
        sysId: this.apiDetail.sysId,
        id: this.apiDetail.id,
        ifNo: this.apiDetail.ifNo,
        meth: this.apiDetail.meth,
        uriIn: this.apiDetail.uriIn,
        uriOut: this.apiDetail.uriOut,
        reqHndlrGrpId: this.apiDetail.reqHndlrGrpId,
        resHndlrGrpId: this.apiDetail.resHndlrGrpId,
        timeOut: this.apiDetail.timeOut,
        desc: this.apiDetail.desc,
      };
      this.systemModule
        .getSystemDetail(this.apiDetail.sysId)
        .then(() => {
          this.isShowProgress = false;
          this.showPage = true;
        })
        .catch(() => {
          this.isShowProgress = false;
          this.$modal.show(`${this.$t('error.server_error')}`);
        });
    }
  }

  // system detail 이 저장소에서 업데이트시 edptList 값 업데이트
  edptList: string[] | null = null;
  @Watch('system')
  onSystemChange() {
    if (this.system) {
      this.edptList = this.system.edpt;
    }
  }

  requestBody: ApiUpdateRequestBody = {
    sysId: '',
    id: '',
    ifNo: '',
    meth: '',
    uriIn: '',
    uriOut: '',
    reqHndlrGrpId: '',
    resHndlrGrpId: '',
    timeOut: 15000,
    desc: '',
  };

  // handler 로직 관련
  get reqHandlerGroupList(): HandlerGroupDetail[] {
    return this.handlerModule.reqHandlerGroupList;
  }
  get resHandlerGroupList(): HandlerGroupDetail[] {
    return this.handlerModule.resHandlerGroupList;
  }

  isButtonDisabled = false;
  methodValid = true;
  uriValid = true;
  timeoutValid = true;
  descValid = true;
  // submit api
  handleClickTestSubmitButton() {
    function convertToString(body: ApiCreateRequestBody) {
      let res = '';
      Object.keys(body).forEach((key) => {
        res += `${key} : ${body[key]}\n`;
      });
      return res;
    }
    console.log(this.methodValid, this.uriValid, this.timeoutValid);
    confirm(convertToString({ ...this.requestBody }));
  }
  onClickSubmitButton() {
    const val =
      this.methodValid &&
      this.uriValid &&
      this.timeoutValid &&
      this.descValid &&
      this.requestBody.reqHndlrGrpId &&
      this.requestBody.resHndlrGrpId;
    // const val = true;
    if (!val) {
      this.$modal.show(`${this.$t('api.empty_check_message')}`);
      return;
    } else {
      this.showModal = true;
    }
  }
  async onSubmit() {
    this.isButtonDisabled = true;
    this.showModal = false;
    const apiUpdateRequestBody = { ...this.requestBody };
    await this.apiModule
      .putApi(apiUpdateRequestBody)
      .then(() => {
        this.$router.back();
      })
      .catch(() => {
        this.isButtonDisabled = false;
        this.$modal.show(`${this.$t('api.api_register_fail')}`);
      });
  }
  closeModal() {
    this.$modal.hide();
  }

  // for progress
  isShowProgress = false;
  get userState() {
    return this.apiModule.currAsyncState;
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
}
</script>
