<template lang="html">
  <ContentLayout
    :title="$t('api.apiRegister')"
    :subTitle="$t('api.basicInformationRegister')"
    :depth="$t('api.apiManagement')"
    id="api-register"
  >
    <template v-slot:contents>
      <div>
        <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
        <ul v-if="showPage">
          <SelectForm
            :groupNm="$t('api.sysId')"
            :optionList="systemIdEdptList.map((item) => item.id)"
            v-model="requestBody.sysId"
          />
          <TextDebounceForm
            inputNm="API ID"
            :check="isDuplicatedId"
            :placeholder="$t('api.idEx')"
            type="text"
            :required="true"
            :isvalid.sync="idValid"
            v-model="requestBody.id"
            @input="duplicateCheckId"
          />

          <MethodForm groupNm="Method" v-model="requestBody.meth" />
          <UriForm groupNm="URI" :uriIn="requestBody.uriIn" v-model="requestBody.uriOut" />

          <!-- <SelectSysForm
            :groupNm="$t('api.systemInterlockInformation')"
            :optionList="edptList"
          /> -->
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
        </ul>
        <div class="text-center" v-if="!showPage">
          <b-spinner
            v-show="!showPage"
            style="width: 2rem; height: 2rem; position: absolute; left: 50%"
            label="Large Spinner"
          ></b-spinner>
        </div>
      </div>
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
import TextForm from '@/components/api-mngt/register/TextForm.vue';
import MethodForm from '@/components/api-mngt/register/MethodForm.vue';
import UriForm from '@/components/api-mngt/register/UriForm.vue';
import TextDebounceForm from '@/components/api-mngt/register/TextDebounceForm.vue';
import EndPointGroup from '@/components/api-mngt/register/EndPointGroup.vue';
import { apiValidationCheck } from '@/store/modules/ApiModule';
import { Dictionary } from 'vue-router/types/router';
import { SystemIdEdpt, SystemResponse } from '@/types/SystemType';
import { getModule } from 'vuex-module-decorators';
import SystemModule from '@/store/modules/SystemModule';
import ApiModule from '@/store/modules/ApiModule';
import HandlerModule from '@/store/modules/HandlerModule';
import axios from 'axios';
@Component({
  components: {
    ContentLayout,
    HandlerGroupForm,
    SelectForm,
    TextForm,
    TextDebounceForm,
    MethodForm,
    UriForm,
    EndPointGroup,
  },
})
export default class ApiRegisterPage extends Vue {
  systemModule = getModule(SystemModule, this.$store);
  apiModule = getModule(ApiModule, this.$store);
  handlerModule = getModule(HandlerModule, this.$store);

  get params(): Dictionary<string> | null {
    console.log(this.$route.params);
    return this.$route.params;
  }
  get systemIdEdptList(): SystemIdEdpt[] {
    return this.systemModule.systemIdEdptList;
  }
  showPage = false;

  created() {
    this.apiModule.apiReset();
    this.handlerModule.handlerReset();
    this.systemModule.systemReset();

    console.log('APiRegisterPage created');
    axios
      .all([
        this.systemModule.getSystemIdEdptList(),
        this.handlerModule.getReqHandlerGroupList(),
        this.handlerModule.getResHandlerGroupList(),
      ])
      .then(() => {
        this.showPage = true;
      })
      .catch();
  }
  destroyed() {
    this.apiModule.release();
    this.systemModule.release();
    this.handlerModule.release();
  }
  edptList: string[] | null = null;
  requestBody: ApiCreateRequestBody = {
    sysId: '',
    id: '',
    meth: [],
    uriIn: '',
    uriOut: '',
    reqHandlrGrpId: '',
    resHandlrGrpId: '',
    timeOut: 15000,
    desc: '',
  };
  //시스템관리 모듈에서 시스템리스트 조회
  // @Watch('sysList')
  // onSysListChange() {
  //   console.log('sysList changed', this.sysList);
  //   this.requestBody.sysNm = this.sysList[0].nm;
  // }
  // system id가 선택될때마다 시스템 연동정보 리스트 업데이트
  @Watch('requestBody.sysId')
  handleChangeSysId(val: string) {
    console.log('sysId changed', val);
    const selectedSystem = this.systemIdEdptList.filter((item) => item.id === val)?.[0];
    this.edptList = selectedSystem.edpt;
    this.requestBody.id = '';
    this.requestBody.uriIn = '';
    this.requestBody.uriOut = '';
  }
  apiIdCheck: boolean | null = null;

  @Watch('isDuplicatedId')
  async handleChangeApiId() {
    console.log('isDuplicatedId changed', this.isDuplicatedId);
    if (this.isDuplicatedId) {
      this.requestBody.uriIn = this.requestBody.sysId + '/v1/' + this.requestBody.id;
      this.requestBody.uriOut = this.requestBody.sysId + '/v1/' + this.requestBody.id;
    }
  }

  timerId = 0;
  isDuplicatedId: boolean | null = null;
  duplicateCheckId() {
    this.isDuplicatedId = null;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(async () => {
      console.log('id 입력 1초 경과');
      console.log(this.requestBody.id);
      this.isDuplicatedId = await apiValidationCheck(this.requestBody.id);
    }, 1000);
  }

  // 데이터 확인
  idValid = false;
  methodValid = false;
  handlerValid = false;
  timeoutValid = false;
  handleClickSubmitButton() {
    // this.$modal.show(this.convertToString(this.requestBody) + '\n 등록하시겠습니까?');
    confirm(this.convertToString(this.requestBody) + '\n' + this.$t('api.confirm_api_register'));
  }

  // 등록
  async onSubmit() {
    const val = this.idValid && this.methodValid && this.handlerValid && this.timeoutValid;

    if (!val) {
      this.$modal.show(`${this.$t('system.empty_check_message')}`);
      return;
    } else {
      // await this.systemModule.registerSystem(this.systemItem);
      this.$router.push({ name: 'api' });
    }
  }

  convertToString(body: ApiCreateRequestBody) {
    let res = '';
    Object.keys(body).forEach((key) => {
      res += `${key} : ${body[key]}\n`;
    });
    return res;
  }

  get reqHandlerGroupList(): HandlerGroupDetail[] {
    return this.handlerModule.reqHandlerGroupList;
  }
  get resHandlerGroupList(): HandlerGroupDetail[] {
    return this.handlerModule.resHandlerGroupList;
  }
}
</script>
