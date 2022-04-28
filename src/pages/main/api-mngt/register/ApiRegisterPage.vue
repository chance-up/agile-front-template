<template lang="html">
  <ContentLayout title="API 등록" subTitle="기본정보 등록" depth="API 관리">
    <template v-slot:contents>
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <SelectForm groupNm="시스템명" :optionList="sysList.map((item) => item.nm)" v-model="requestBody.sysNm" />
        <TextDebounceForm groupNm="API ID" :check="apiIdCheck" type="text" :required="true" v-model="requestBody.id" />
        <TextForm groupNm="API 명" type="text" :required="true" v-model="requestBody.nm" />
        <TextForm groupNm="인터페이스 번호" type="text" :required="true" :disabled="true" v-model="requestBody.ifNo" />

        <MethodForm groupNm="Method" v-model="requestBody.meth" />
        <UriForm groupNm="URI" :uriIn="requestBody.uriIn" v-model="requestBody.uriOut" />

        <SelectSysForm groupNm="시스템 연동 정보" :optionList="ifGrpList" v-model="requestBody.ifGrp" />

        <HandlerGroupForm groupNm="요청 handler 그룹" />
        <HandlerGroupForm groupNm="응답 handler 그룹" />
        <TextForm groupNm="타임아웃(ms)" type="number" :required="true" v-model="requestBody.timeOut" />
        <TextForm groupNm="시스템 설명" type="textarea" v-model="requestBody.desc" />
      </ul>
    </template>

    <template v-slot:buttons>
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="handleClickSubmitButton">등록테스트</button>
        <button class="lg-btn purple-btn" @click="$router.push({ path: '/api' })">등록</button>
        <button class="lg-btn white-btn" @click="$router.go(-1)">취소</button>
      </div>
    </template>
  </ContentLayout>
</template>

<script lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { dummySystemList, dummySystemInfList, ApiCreateRequestBody } from '@/types/ApiType';
import HandlerGroupForm from '@/components/api-mngt/register/HandlerGroupForm.vue';
import SelectForm from '@/components/api-mngt/register/SelectForm.vue';
import SelectSysForm from '@/components/api-mngt/register/SelectSysForm.vue';
import TextForm from '@/components/api-mngt/register/TextForm.vue';
import MethodForm from '@/components/api-mngt/register/MethodForm.vue';
import UriForm from '@/components/api-mngt/register/UriForm.vue';
import TextDebounceForm from '@/components/api-mngt/register/TextDebounceForm.vue';
import { apiValidationCheck } from '@/store/modules/ApiModule';
import { Dictionary } from 'vue-router/types/router';
import { IfGrpType, SystemResponse } from '@/types/SystemType';
import { getModule } from 'vuex-module-decorators';
import SystemModule from '@/store/modules/SystemModule';
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
export default class ApiRegisterPage extends Vue {
  systemModule = getModule(SystemModule, this.$store);
  get dummySystemList(): string[] {
    return dummySystemList;
  }
  get dummySystemInfList(): string[] {
    return dummySystemInfList;
  }
  get params(): Dictionary<string> | null {
    console.log(this.$route.params);
    return this.$route.params;
  }
  get sysList(): SystemResponse[] {
    return this.systemModule.systemList;
  }
  created() {
    this.systemModule.getSystemList();
  }

  ifGrpList: IfGrpType[] = [];
  requestBody: ApiCreateRequestBody = {
    sysId: '',
    sysNm: '',
    id: '',
    nm: '',
    ifNo: '',
    meth: [],
    uriIn: '',
    uriOut: '',
    ifGrp: '',
    reqHandlrGrpId: '',
    resHandlrGrpId: '',
    timeOut: 0,
    desc: '',
  };
  //시스템관리 모듈에서 시스템리스트 조회
  @Watch('sysList')
  onSysListChange() {
    console.log('sysList changed', this.sysList);
    this.requestBody.sysNm = this.sysList[0].nm;
  }
  // system id가 선택될때마다 시스템 연동정보 리스트 업데이트
  @Watch('requestBody.sysNm')
  handleChangeSysNm(val: string) {
    console.log('sysNm changed', val);
    const selectedSystem = this.sysList.filter((item) => item.nm === val)?.[0];
    this.ifGrpList = selectedSystem.if_grp;
    this.requestBody.ifGrp = this.ifGrpList[0].if_nm;
    this.requestBody.sysId = selectedSystem.id;
    this.requestBody.ifNo = selectedSystem.nm + '_v1_' + this.requestBody.id;
  }
  // api id가 입력될때마다 api id 중복체크
  apiIdCheck: boolean | null = null;
  @Watch('requestBody.id')
  async handleChangeApiId() {
    console.log('apiId changed', this.requestBody.id);
    const { id } = this.requestBody;
    this.apiIdCheck = await apiValidationCheck(id);
    if (this.apiIdCheck) {
      this.requestBody.ifNo = this.requestBody.sysNm + '_v1_' + this.requestBody.id;
      this.requestBody.uriIn = 'someUriIn';
      this.requestBody.uriOut = 'someUriOut';
    }
  }
  // backend 연결 전 임시 등록
  handleClickSubmitButton() {
    // this.$modal.show(this.convertToString(this.requestBody) + '\n 등록하시겠습니까?');
    confirm(this.convertToString(this.requestBody) + '\n 등록하시겠습니까?');
  }
  convertToString(body: ApiCreateRequestBody) {
    let res = '';
    Object.keys(body).forEach((key) => {
      res += `${key} : ${body[key]}\n`;
    });
    return res;
  }
}
</script>
