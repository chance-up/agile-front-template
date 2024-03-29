<template lang="html">
  <ContentLayout
    :title="`${$t('api.api')}` + ' ' + `${$t('api.information')}` + ' ' + `${$t('common.ok')}`"
    :subTitle="`${$t('api.basicInformation')}` + ' ' + `${$t('common.ok')}`"
    :depth="`${$t('api.api')}` + ' ' + `${$t('api.management')}`"
    :isShowProgress="isShowProgress"
    :isEmShow="false"
  >
    <template v-slot:contents v-if="!isShowProgress && apiDetail">
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <InfoGroup :inputNm="`${$t('api.sysId')}`" :value="apiDetail.sysId" />
        <InfoGroup :inputNm="`${$t('api.apiId')}`" :value="apiDetail.id" />
        <InfoGroup :inputNm="`${$t('api.interface')}` + ' ' + `${$t('api.number')}`" :value="apiDetail.ifNo" />
        <MethodGroup :inputNm="`${$t('api.method')}`" :methods="apiDetail.meth" />
        <URIGroup :inputNm="`${$t('api.uri')}`" :uriSer="apiDetail.uriIn" :uriSys="apiDetail.uriOut" />
        <EndPointGroup groupNm="End-point" :edptList="edptList" />

        <InfoGroup
          :inputNm="`${$t('api.request')}` + ' ' + `${$t('api.handler')}` + ' ' + `${$t('api.group')}`"
          :value="apiDetail.reqHndlrGrpId"
        />
        <InfoGroup
          :inputNm="`${$t('api.response')}` + ' ' + `${$t('api.handler')}` + ' ' + `${$t('api.group')}`"
          :value="apiDetail.resHndlrGrpId"
        />
        <InfoGroup :inputNm="`${$t('api.timeOutMS')}`" :value="apiDetail.timeOut" />
        <InfoGroup :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.description')}`" :value="apiDetail.desc" />
        <ModalLayout size="m" v-if="showModal">
          <template v-slot:modalHeader><h1 class="h1-tit">API 삭제</h1> </template>
          <template v-slot:modalContainer>
            <p class="text">{{ deleteMsg }}를 삭제하시겠습니까?</p>
          </template>
          <template v-slot:modalFooter
            ><button class="lg-btn purple-btn" @click="deleteApi">{{ $t('common.ok') }}</button
            ><button class="lg-btn white-btn" @click="showModal = false">{{ $t('common.cancel') }}</button>
          </template>
        </ModalLayout>
      </ul>
    </template>

    <template v-slot:buttons v-if="!isShowProgress">
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button
          :disabled="isButtonDisabled"
          class="lg-btn purple-btn"
          @click="$router.push({ name: 'api-edit', query: { id: apiDetail.id, sysId: apiDetail.sysId } })"
        >
          {{ $t('api.edit') }}
        </button>
        <button :disabled="isButtonDisabled" class="lg-btn white-btn" @click="showModal = true">
          {{ $t('api.delete') }}<b-spinner label="Spinning" v-if="isButtonDisabled" small></b-spinner>
        </button>
        <button :disabled="isButtonDisabled" class="lg-btn gray-btn" @click="$router.go(-1)">
          {{ $t('api.list') }}
        </button>
      </div>
    </template>
  </ContentLayout>
</template>

<script lang="ts">
import InfoGroup from '@/components/api-mngt/detail/InfoGroup.vue';
import MethodGroup from '@/components/api-mngt/detail/MethodGroup.vue';
import URIGroup from '@/components/api-mngt/detail/URIGroup.vue';
import EndPointGroup from '@/components/api-mngt/register/EndPointGroup.vue';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiDetailResponse } from '@/types/ApiType';
import ApiModule from '@/store/modules/ApiModule';
import { getModule } from 'vuex-module-decorators';

import { USER_STATE } from '@/store/UserState';
import SystemModule from '@/store/modules/SystemModule';
import { SystemResponse } from '@/types/SystemType';

import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
@Component({
  components: {
    InfoGroup,
    MethodGroup,
    URIGroup,
    ContentLayout,
    EndPointGroup,
    ModalLayout,
  },
})
export default class ApiDetailPage extends Vue {
  apiModule = getModule(ApiModule, this.$store);
  systemModule = getModule(SystemModule, this.$store);

  edptList: string[] | null = null;
  get apiDetail(): ApiDetailResponse | null {
    return this.apiModule.apiDetail;
  }
  get system(): SystemResponse | null {
    return this.systemModule.system;
  }

  mounted() {
    this.isShowProgress = true;
    this.apiModule.apiReset();
    this.systemModule.systemReset();
    const query = this.$route.query as { id: string; sysId: string };
    console.log('query', query);
    this.apiModule
      .getApiDetail(query)
      .then(() => {
        console.log();
        this.deleteMsg = this.apiDetail?.id;
      })
      .catch(() => {
        this.isShowProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }
  destroyed() {
    this.apiModule.release();
    this.systemModule.release();
  }

  @Watch('apiDetail')
  onApiDetailChange() {
    if (this.apiDetail) {
      this.systemModule
        .getSystemDetail(this.apiDetail.sysId)
        .then(() => {
          this.isShowProgress = false;
        })
        .catch(() => {
          this.isShowProgress = false;
          this.$modal.show(`${this.$t('error.server_error')}`);
        });
    }
  }
  @Watch('system')
  onSystemChange() {
    if (this.system) {
      this.edptList = this.system.edpt;
    }
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
      this.$modal.show(`${this.$t('api.server_error')}`);
    } else if (userState === USER_STATE.DONE) {
      this.isShowProgress = false;
    }
  }
  // modal part
  showModal = false;
  deleteMsg: string | undefined = '';
  async deleteApi() {
    const query = this.$route.query as { id: string; sysId: string };
    if (this.apiDetail) {
      this.showModal = false;
      this.isButtonDisabled = true;
      await this.apiModule
        .deleteApi(query)
        .then(() => {
          this.$router.push({ path: '/api' });
          this.isButtonDisabled = false;
          this.$toast.success(this.$t('common.delete_success'), {
            toastClassName: ['toast-success-custom-class'],
          });
        })
        .catch((error) => {
          this.isButtonDisabled = false;
          this.$modal.show(`${this.$t('error.server_error')}`);
        });
    }
  }
  // btn disabled
  isButtonDisabled = false;
}
</script>
