<template>
  <ContentLayout
    :title="`${$t('api.api')}` + ' ' + `${$t('api.information')}` + ' ' + `${$t('api.edit')}`"
    :subTitle="`${$t('api.basic')}` + `${$t('api.information')}` + ' ' + `${$t('api.edit')}`"
    :depth="`${$t('api.api')}` + `${$t('api.management')}`"
  >
    <template v-slot:contents>
      <ul>
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
          :value="mockData.if_no"
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
          :value="mockData.time_out"
        />
        <EditTextAreaGroup :inputNm="`${$t('api.system')}` + ' ' + `${$t('api.description')}`" :point="false" />
      </ul>
    </template>
    <template v-slot:buttons>
      <EditButtonGroup />
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import EditInputSelectGroup from '@/components/api/edit/EditInputSelectGroup.vue';
import EditTextAreaGroup from '@/components/api/edit/EditTextAreaGroup.vue';
// import { DummySystemResponse, dummyData } from '@/types/SystemType';
import EditMethodGroup from '@/components/api/edit/EditMethodGroup.vue';
import EditURIGroup from '@/components/api/edit/EditURIGroup.vue';
import EditRequestHandler from '@/components/api/edit/EditRequestHandler.vue';
import EditResponseHandler from '@/components/api/edit/EditResponseHandler.vue';
import EditButtonGroup from '@/components/api/edit/EditButtonGroup.vue';
import { ApiDetailResponse } from '@/types/ApiType';
import { getApiDetail } from '@/api/api';
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
  // get dumyData(): SystemResponse {
  //   return dummyData;
  // }
  mockData: ApiDetailResponse | null = null;
  created() {
    getApiDetail(2).then((res) => {
      console.log('api edit: ' + this.$route.params.id);
      console.log(res);
      this.mockData = res;
    });
  }
}
</script>
<style lang=""></style>
