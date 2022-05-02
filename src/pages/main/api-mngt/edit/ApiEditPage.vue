<template lang="html">
  <!-- for progress -->
  <ContentLayout title="API 정보 수정" subTitle="기본정보 수정" depth="API 관리" :isShowProgress="isShowProgress">
    <!-- for progress -->
    <template v-slot:contents v-if="!isShowProgress">
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <TextForm groupNm="시스템명" type="text" :required="true" v-model="requestBody.sysNm" :disabled="true" />
        <TextForm groupNm="API ID" type="text" :required="true" v-model="requestBody.id" :disabled="true" />
        <TextForm groupNm="API 명" type="text" :required="true" v-model="requestBody.nm" :disabled="true" />
        <TextForm groupNm="인터페이스 번호" type="text" :required="true" :disabled="true" v-model="requestBody.ifNo" />

        <MethodForm groupNm="Method" v-model="requestBody.meth" />
        <UriForm groupNm="URI" :uriIn="requestBody.uriIn" v-model="requestBody.uriOut" />

        <SelectSysForm groupNm="시스템 연동 정보" :optionList="system.if_grp" v-model="requestBody.ifGrp" />

        <HandlerGroupForm
          groupNm="요청 handler 그룹"
          v-model="requestBody.reqHandlrGrpId"
          :handlerGroupList="handlerGroupList"
        />
        <HandlerGroupForm
          groupNm="응답 handler 그룹"
          v-model="requestBody.resHandlrGrpId"
          :handlerGroupList="handlerGroupList"
        />
        <TextForm groupNm="타임아웃(ms)" type="number" :required="true" v-model="requestBody.timeOut" />
        <TextForm groupNm="시스템 설명" type="textarea" v-model="requestBody.desc" />
      </ul>
    </template>
    <!-- for progress -->
    <template v-slot:buttons v-if="!isShowProgress">
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="handleClickSubmitButton">수정테스트</button>
        <button class="lg-btn purple-btn" @click="$router.push({ path: '/api' })">수정</button>
        <button class="lg-btn white-btn" @click="$router.go(-1)">취소</button>
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
import SelectSysForm from '@/components/api-mngt/register/SelectSysForm.vue';
import TextForm from '@/components/api-mngt/register/TextForm.vue';
import MethodForm from '@/components/api-mngt/register/MethodForm.vue';
import UriForm from '@/components/api-mngt/register/UriForm.vue';
import TextDebounceForm from '@/components/api-mngt/register/TextDebounceForm.vue';
import ApiModule, { apiValidationCheck } from '@/store/modules/ApiModule';
import { Dictionary } from 'vue-router/types/router';
import { IfGrpType, SystemResponse } from '@/types/SystemType';
import { getModule } from 'vuex-module-decorators';
import SystemModule from '@/store/modules/SystemModule';
// for progress
import { USER_STATE } from '@/store/UserState';

@Component({
  components: {
    ContentLayout,
    HandlerGroupForm,
    SelectForm,
    TextForm,
    TextDebounceForm,
    MethodForm,
    UriForm,
    SelectSysForm,
  },
})
export default class ApiEditPage extends Vue {
  apiModule = getModule(ApiModule, this.$store);
  systemModule = getModule(SystemModule, this.$store);

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
  }
  get handlerGroupList(): HandlerGroupDetail[] {
    return this.apiModule.handlerGroupList;
  }

  requestBody: ApiCreateRequestBody = {
    sysId: '',
    sysNm: '',
    id: '',
    nm: '',
    ifNo: '',
    meth: '',
    uriIn: '',
    uriOut: '',
    ifGrp: '',
    reqHandlrGrpId: '',
    resHandlrGrpId: '',
    timeOut: 0,
    desc: '',
  };

  @Watch('apiDetail')
  onApiDetailChange() {
    if (this.apiDetail) {
      this.requestBody = {
        sysId: this.apiDetail.sysId,
        sysNm: this.apiDetail.sysNm,
        id: this.apiDetail.id,
        nm: this.apiDetail.nm,
        ifNo: this.apiDetail.ifNo,
        meth: this.apiDetail.meth,
        uriIn: this.apiDetail.uriIn,
        uriOut: this.apiDetail.uriOut,
        ifGrp: this.apiDetail.ifGrp,
        reqHandlrGrpId: this.apiDetail.reqHandlrGrpId,
        resHandlrGrpId: this.apiDetail.resHandlrGrpId,
        timeOut: this.apiDetail.timeOut,
        desc: this.apiDetail.desc,
      };
      this.systemModule.getSystemDetail(this.apiDetail.sysId);
    }
  }

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
