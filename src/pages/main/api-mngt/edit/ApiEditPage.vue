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

        <MethodForm groupNm="Method" v-model="requestBody.meth" />
        <UriForm groupNm="URI" :uriIn="requestBody.uriIn" v-model="requestBody.uriOut" />
        <EndPointGroup groupNm="End-point" :edptList="edptList" />

        <HandlerGroupForm
          :groupNm="$t('api.resHandlrGrp')"
          :reqHandlerGroupList="reqHandlerGroupList"
          :resHandlerGroupList="resHandlerGroupList"
          @reqInput="
            (msg) => {
              requestBody.reqHandlrGrpId = msg;
            }
          "
          @resInput="
            (msg) => {
              requestBody.resHandlrGrpId = msg;
            }
          "
        />
        <TextForm :groupNm="$t('api.timeOutMS')" type="number" :required="true" v-model="requestBody.timeOut" />
        <TextForm :groupNm="$t('api.apiDescription')" type="textarea" v-model="requestBody.desc" />
        <ModalLayout size="m" v-if="showModal">
          <template v-slot:modalHeader><h1 class="h1-tit">서비스 수정</h1> </template>
          <template v-slot:modalContainer>
            <p class="text">서비스를 수정하시겠습니까?</p>
          </template>
          <template v-slot:modalFooter>
            <button class="lg-btn purple-btn" @click="editApi()">{{ $t('common.ok') }}</button>
            <button class="lg-btn purple-btn" @click="showModal = false">{{ $t('common.cancel') }}</button>
          </template>
        </ModalLayout>
      </ul>
    </template>
    <!-- for progress -->
    <template v-slot:buttons v-if="!isShowProgress">
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="handleClickSubmitButton">수정테스트</button>
        <!-- <button class="lg-btn purple-btn" @click="$router.push({ path: '/api' })">{{ $t('api.edit') }}</button> -->
        <button class="lg-btn purple-btn" @click="showModal = true">{{ $t('api.edit') }}</button>
        <button class="lg-btn white-btn" @click="$router.go(-1)">{{ $t('common.cancel') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>

<script lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiCreateRequestBody, HandlerGroupDetail } from '@/types/ApiType';
import HandlerGroupForm from '@/components/api-mngt/register/HandlerGroupForm.vue';
import SelectForm from '@/components/api-mngt/register/SelectForm.vue';
import TextForm from '@/components/api-mngt/register/TextForm.vue';
import MethodForm from '@/components/api-mngt/register/MethodForm.vue';
import UriForm from '@/components/api-mngt/register/UriForm.vue';
import TextDebounceForm from '@/components/api-mngt/register/TextDebounceForm.vue';
import EndPointGroup from '@/components/api-mngt/register/EndPointGroup.vue';
import ApiModule, { apiValidationCheck } from '@/store/modules/ApiModule';
import { Dictionary } from 'vue-router/types/router';
import { SystemIdEdpt, SystemResponse } from '@/types/SystemType';
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
    this.apiModule.getApiDetail(this.$route.params.id);
    this.apiModule.getHandlerGroupList();
    console.log('APiRegisterPage created');
    axios
      .all([
        // this.systemModule.getSystemDetail(), api detail 꺼내고 sysId로 sysDetail 콜
        this.apiModule.getApiDetail(this.$route.params.id),
        this.handlerModule.getReqHandlerGroupList(),
        this.handlerModule.getResHandlerGroupList(),
      ])
      .then(() => {
        this.showPage = true;
      })
      .catch();
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
        reqHandlrGrpId: this.apiDetail.reqHandlrGrpId,
        resHandlrGrpId: this.apiDetail.resHandlrGrpId,
        timeOut: this.apiDetail.timeOut,
        desc: this.apiDetail.desc,
      };
      this.systemModule.getSystemDetail(this.apiDetail.sysId);
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

  requestBody: ApiCreateRequestBody = {
    sysId: '',
    id: '',
    ifNo: '',
    meth: '',
    uriIn: '',
    uriOut: '',
    reqHandlrGrpId: '',
    resHandlrGrpId: '',
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
  // 구현 필요

  // =============== 수정이 필요한 로직 ===============
  // ==============================

  async editApi(apiId: string) {
    // await this.serviceModule.deleteServiceAction(ServiceId);
    await this.apiModule.deleteApi(apiId);
    this.$router.go(-1);
    this.showModal = false;
  }
  // submit api
  handleClickSubmitButton() {
    // this.$modal.show(this.convertToString(this.requestBody) + '\n 등록하시겠습니까?');
    confirm(this.convertToString(this.requestBody) + '\n 수정하시겠습니까?');
  }
  convertToString(body: ApiCreateRequestBody) {
    let res = '';
    Object.keys(body).forEach((key) => {
      res += `${key} : ${body[key]}\n`;
    });
    return res;
  }
  // ==============================
  // ==============================

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
