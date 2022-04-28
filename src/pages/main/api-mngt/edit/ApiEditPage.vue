<template>
  <ContentLayout
    :title="`${$t('api.api')}` + ' ' + `${$t('api.information')}` + ' ' + `${$t('api.edit')}`"
    :subTitle="`${$t('api.basic')}` + `${$t('api.information')}` + ' ' + `${$t('api.edit')}`"
    :depth="`${$t('api.api')}` + `${$t('api.management')}`"
  >
    <template v-slot:contents>
      <ul v-if="mockData">
        <EditInputSelectGroup
          :inputNm="`${$t('api.system')}` + `${$t('api.name')}`"
          :inputCondition="false"
          :selectCondition="true"
          cssClass="select-box disable"
          :options="['선택해주세요', '시스템2', '시스템3']"
          :point="true"
          :disabled="true"
        />
        <EditInputSelectGroup
          :point="true"
          :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.id')}`"
          :inputCondition="true"
          :selectCondition="false"
          cssClass="input-box lg"
          place="placeholder"
          :disabled="true"
          :value="mockData.id"
        />
        <EditInputSelectGroup
          :point="true"
          :inputNm="`${$t('api.api')}` + ' ' + `${$t('api.name')}`"
          :inputCondition="true"
          :selectCondition="false"
          cssClass="input-box lg"
          place="placeholder"
          :disabled="true"
          :value="mockData.nm"
        />
        <EditInputSelectGroup
          :point="true"
          :inputNm="`${$t('api.interface')}` + ' ' + `${$t('api.number')}`"
          :inputCondition="true"
          :selectCondition="false"
          cssClass="input-box lg"
          place="시스템명_버전_API ID"
          :disabled="true"
          :value="mockData.ifNo"
        />
        <EditMethodGroup />
        <EditURIGroup />
        <EditInputSelectGroup
          :point="true"
          :inputNm="`${$t('api.system')}` + ' ' + `${$t('api.interlock')}` + ' ' + `${$t('api.information')}`"
          :inputCondition="false"
          :selectCondition="true"
          cssClass="select-box"
          :options="['시스템 등록에서 설정한 값', '시스템2', '시스템3']"
          :disabled="false"
        />
        <EditRequestHandler />
        <EditResponseHandler />
        <EditInputSelectGroup
          :point="true"
          :inputNm="`${$t('api.timeOutMS')}`"
          timeOutMS
          :inputCondition="true"
          :selectCondition="false"
          cssClass="input-box lg check-ok"
          place="number"
          :disabled="false"
          :value="mockData.timeOut"
        />
        <EditTextAreaGroup :inputNm="`${$t('api.system')}` + ' ' + `${$t('api.description')}`" :point="false" />
      </ul>
    </template>
    <template v-slot:buttons>
      <EditButtonGroup v-if="mockData" :id="mockData.id" />
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import EditInputSelectGroup from '@/components/api-mngt/edit/EditInputSelectGroup.vue';
import EditTextAreaGroup from '@/components/api-mngt/edit/EditTextAreaGroup.vue';
// import { DummySystemResponse, dummyData } from '@/types/SystemType';
import EditMethodGroup from '@/components/api-mngt/edit/EditMethodGroup.vue';
import EditURIGroup from '@/components/api-mngt/edit/EditURIGroup.vue';
import EditRequestHandler from '@/components/api-mngt/edit/EditRequestHandler.vue';
import EditResponseHandler from '@/components/api-mngt/edit/EditResponseHandler.vue';
import EditButtonGroup from '@/components/api-mngt/edit/EditButtonGroup.vue';
import { ApiCreateRequestBody, ApiDetailResponse } from '@/types/ApiType';
import ApiModule from '@/store/modules/ApiModule';
import { getModule } from 'vuex-module-decorators';
@Component({
  components: {
    ContentLayout,
    EditTextAreaGroup,
    EditInputSelectGroup,
    EditMethodGroup,
    EditURIGroup,
    EditRequestHandler,
    EditResponseHandler,
    EditButtonGroup,
  },
})
export default class ApiEditPage extends Vue {
  apiModule = getModule(ApiModule, this.$store);
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
  created() {
    this.apiModule.getApiDetail(this.$route.params.id);
  }
  get mockData(): ApiDetailResponse | null {
    return this.apiModule.apiDetail;
  }
  @Watch('mockData')
  onMockDataChange(val: ApiDetailResponse | null) {
    if (val) {
      this.requestBody.sysId = val.sysId;
      this.requestBody.sysNm = val.sysNm;
      this.requestBody.id = val.id;
      this.requestBody.nm = val.nm;
      this.requestBody.ifNo = val.ifNo;
      this.requestBody.meth = val.meth;
      this.requestBody.uriIn = val.uriIn;
      this.requestBody.uriOut = val.uriOut;
      this.requestBody.ifGrp = val.ifGrp;
      this.requestBody.reqHandlrGrpId = val.reqHandlrGrpId;
      this.requestBody.resHandlrGrpId = val.resHandlrGrpId;
      this.requestBody.timeOut = val.timeOut;
      this.requestBody.desc = val.desc;
    }
  }

  destroyed() {
    this.apiModule.reset();
  }
}
</script>
<style lang=""></style>
