<template lang="html">
  <ContentLayout
    :title="$t('api.apiRegister')"
    :subTitle="$t('api.basicInformationRegister')"
    :depth="$t('api.apiManagement')"
    id="api-register"
    :isShowProgress="!showPage"
  >
    <template v-slot:contents>
      <div v-if="showPage">
        <ul>
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

          <MethodForm groupNm="Method" v-model="requestBody.meth" :isvalid.sync="methodValid" />
          <UriForm groupNm="URI" :uriIn="requestBody.uriIn" v-model="requestBody.uriOut" :isvalid.sync="uriValid" />

          <!-- <SelectSysForm
            :groupNm="$t('api.systemInterlockInformation')"
            :optionList="edptList"
          /> -->
          <EndPointGroup groupNm="End-point" :edptList="edptList" />
          <HandlerGroupForm
            :reqHandlerGroupList="reqHandlerGroupList"
            :resHandlerGroupList="resHandlerGroupList"
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
        </ul>
        <ModalLayout size="m" v-if="isShowModal">
          <template v-slot:modalHeader
            ><h1 class="h1-tit">{{ $t('api.apiRegister') }}</h1>
          </template>
          <template v-slot:modalContainer>
            <p class="text">{{ $t('api.confirm_api_register') }}</p>
          </template>
          <template v-slot:modalFooter
            ><button class="lg-btn purple-btn" @click="onSubmit">{{ $t('common.ok') }}</button
            ><button class="lg-btn purple-btn" @click="closeModal">{{ $t('common.cancel') }}</button>
          </template>
        </ModalLayout>
      </div>
    </template>
    <template v-slot:buttons>
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap" v-if="showPage">
        <!-- <button class="lg-btn purple-btn" @click="handleClickTestSubmitButton" :disabled="isButtonDisabled">
          등록테스트
        </button> -->
        <button class="lg-btn purple-btn" @click="onClickSubmitButton" :disabled="isButtonDisabled">
          {{ $t('common.register') }}
          <b-spinner variant="light" label="Spinning" v-if="isButtonDisabled" small></b-spinner>
        </button>
        <button class="lg-btn white-btn" @click="$router.go(-1)" :disabled="isButtonDisabled">
          {{ $t('common.cancel') }}
        </button>
      </div>
    </template>
  </ContentLayout>
</template>

<script lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiCreateRequestBody } from '@/types/ApiType';
import { HandlerGroupDetail } from '@/types/HandlerType';
import HandlerGroupForm from '@/components/api-mngt/register/HandlerGroupForm.vue';
import SelectForm from '@/components/api-mngt/register/SelectForm.vue';
import TextForm from '@/components/api-mngt/register/TextForm.vue';
import MethodForm from '@/components/api-mngt/register/MethodForm.vue';
import UriForm from '@/components/api-mngt/register/UriForm.vue';
import TextDebounceForm from '@/components/api-mngt/register/TextDebounceForm.vue';
import EndPointGroup from '@/components/api-mngt/register/EndPointGroup.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import { apiValidationCheck } from '@/store/modules/ApiModule';
import { Dictionary } from 'vue-router/types/router';
import { SystemIdEdpt } from '@/types/SystemType';
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
    ModalLayout,
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
  mounted() {
    this.apiModule.apiReset();
    this.handlerModule.handlerReset();
    this.systemModule.systemReset();

    console.log('APiRegisterPage created');
    Promise.all([
      this.systemModule.getSystemIdEdptList(),
      this.handlerModule.getReqHandlerGroupList(),
      this.handlerModule.getResHandlerGroupList(),
    ])
      .then(() => {
        this.showPage = true;
      })
      .catch((error) => {
        console.log(error);
      });
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
    reqHndlrGrpId: '',
    resHndlrGrpId: '',
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
    this.idValid = false;
  }
  apiIdCheck: boolean | null = null;

  @Watch('isDuplicatedId')
  async handleChangeApiId() {
    console.log('isDuplicatedId changed', this.isDuplicatedId);
    if (this.isDuplicatedId) {
      this.requestBody.uriIn = '/' + this.requestBody.sysId + '/v1/' + this.requestBody.id;
      this.requestBody.uriOut = '/' + this.requestBody.sysId + '/v1/' + this.requestBody.id;
      this.uriValid = true;
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
      this.isDuplicatedId = await apiValidationCheck(this.requestBody.id, this.requestBody.sysId);
    }, 1000);
  }

  idValid = false;
  methodValid = false;
  uriValid = false;
  timeoutValid = true;
  descValid = true;
  // 데이터 임시 확인용
  handleClickTestSubmitButton() {
    function convertToString(body: ApiCreateRequestBody) {
      let res = '';
      Object.keys(body).forEach((key) => {
        res += `${key} : ${body[key]}\n`;
      });
      return res;
    }
    console.log(this.isDuplicatedId, this.idValid, this.methodValid, this.uriValid, this.timeoutValid);
    confirm(convertToString({ ...this.requestBody }));
  }

  // API등록 로직
  isShowModal = false;
  isButtonDisabled = false;
  onClickSubmitButton() {
    const val =
      this.isDuplicatedId &&
      this.idValid &&
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
      this.isShowModal = true;
    }
  }
  async onSubmit() {
    this.isButtonDisabled = true;
    this.isShowModal = false;
    const apiCreateRequestBody = { ...this.requestBody };
    await this.apiModule
      .postApi(apiCreateRequestBody)
      .then(() => {
        this.$router.push('/api');
      })
      .catch(() => {
        this.isButtonDisabled = false;
        this.$modal.show(`${this.$t('api.api_edit_fail')}`);
      });
  }

  closeModal() {
    this.isShowModal = false;
  }

  get reqHandlerGroupList(): HandlerGroupDetail[] {
    return this.handlerModule.reqHandlerGroupList;
  }
  get resHandlerGroupList(): HandlerGroupDetail[] {
    return this.handlerModule.resHandlerGroupList;
  }
}
</script>
