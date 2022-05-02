<template lang="html">
  <ContentLayout
    :title="$t('api.apiRegister')"
    :subTitle="$t('api.basicInformationRegister')"
    :depth="$t('api.apiManagement')"
    id="api-register"
  >
    <template v-slot:contents>
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <SelectForm
          :groupNm="$t('api.sysNm')"
          :optionList="sysList.map((item) => item.nm)"
          v-model="requestBody.sysNm"
        />
        <TextDebounceForm
          inputNm="API ID"
          :check="isDuplicatedId"
          :placeholder="$t('api.idEx')"
          type="text"
          :required="true"
          v-model="requestBody.id"
          @input="duplicateCheckId"
        />
        <TextForm
          :groupNm="$t('api.apiNm')"
          type="text"
          :placeholder="$t('api.nmEx')"
          :required="true"
          v-model="requestBody.nm"
        />
        <TextForm
          :groupNm="$t('api.interfaceNumber')"
          type="text"
          :required="true"
          :disabled="true"
          v-model="requestBody.ifNo"
        />

        <MethodForm groupNm="Method" v-model="requestBody.meth" />
        <UriForm groupNm="URI" :uriIn="requestBody.uriIn" v-model="requestBody.uriOut" />

        <SelectSysForm
          :groupNm="$t('api.systemInterlockInformation')"
          :optionList="ifGrpList"
          v-model="requestBody.ifGrp"
        />

        <HandlerGroupForm
          :groupNm="$t('api.reqHandlrGrp')"
          :handlerGroupList="handlerGroupList"
          v-model="requestBody.reqHandlrGrpId"
        />
        <HandlerGroupForm
          :groupNm="$t('api.resHandlrGrp')"
          :handlerGroupList="handlerGroupList"
          v-model="requestBody.resHandlrGrpId"
        />
        <TextForm groupNm="타임아웃(ms)" type="number" :required="true" v-model="requestBody.timeOut" />
        <TextForm groupNm="시스템 설명" type="textarea" v-model="requestBody.desc" />
      </ul>
    </template>

    <template v-slot:buttons>
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="handleClickSubmitButton">등록테스트</button>
        <button class="lg-btn purple-btn" @click="$router.push({ path: '/api' })">{{ $t('common.register') }}</button>
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
import ApiModule from '@/store/modules/ApiModule';
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
  // closeSelect = '';
  clickHandlerGroup(input: string) {
    console.log('click Handler group, input: ' + input);
    // if (input != '') {
    //   console.log('@@@@@@');
    //   this.closeSelect = 'close';
    // }
  }
  systemModule = getModule(SystemModule, this.$store);
  apiModule = getModule(ApiModule, this.$store);

  get params(): Dictionary<string> | null {
    console.log(this.$route.params);
    return this.$route.params;
  }
  get sysList(): SystemResponse[] {
    return this.systemModule.systemList;
  }
  created() {
    console.log('APiRegisterPage created');
    this.systemModule.getSystemList();
    this.apiModule.getHandlerGroupList();
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
  // apiIdCheck: boolean | null = null;
  // @Watch('requestBody.id')
  // async handleChangeApiId() {
  //   console.log('apiId changed', this.requestBody.id);
  //   const { id } = this.requestBody;
  //   this.apiIdCheck = await apiValidationCheck(id);
  //   if (this.apiIdCheck) {
  //     this.requestBody.ifNo = this.requestBody.sysNm + '_v1_' + this.requestBody.id;
  //     this.requestBody.uriIn = 'someUriIn';
  //     this.requestBody.uriOut = 'someUriOut';
  //   }
  // }

  timerId = 0;
  isDuplicatedId: boolean | null = null;
  duplicateCheckId() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(async () => {
      console.log('id 입력 1초 경과');
      console.log(this.requestBody.id);
      this.isDuplicatedId = await apiValidationCheck(this.requestBody.id);
    }, 1000);
  }

  // backend 연결 전 임시 등록
  handleClickSubmitButton() {
    // this.$modal.show(this.convertToString(this.requestBody) + '\n 등록하시겠습니까?');
    confirm(this.convertToString(this.requestBody) + '\n' + this.$t('api.confirm_api_register'));
  }
  convertToString(body: ApiCreateRequestBody) {
    let res = '';
    Object.keys(body).forEach((key) => {
      res += `${key} : ${body[key]}\n`;
    });
    return res;
  }

  // handler group, api쏴서 받아오기
  // created() {
  //   this.apiModule.getHandlerGroupList();
  // }
  get handlerGroupList(): HandlerGroupDetail[] {
    return this.apiModule.handlerGroupList;
  }
}
</script>
