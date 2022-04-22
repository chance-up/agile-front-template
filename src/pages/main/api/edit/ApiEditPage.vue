<template>
  <ContentLayout title="API 정보 수정" subTitle="기본정보 수정" depth="API 관리">
    <template v-slot:contents>
      <ul>
        <EditInputSelectGroup
          inputNm="시스템명"
          :inputCondition="false"
          :selectCondition="true"
          cssClass="select-box disable"
          :options="['선택해주세요', '시스템2', '시스템3']"
          :point="true"
          :disabled="false"
        />
        <EditInputSelectGroup
          :point="true"
          inputNm="API ID"
          :inputCondition="true"
          :selectCondition="false"
          cssClass="input-box lg"
          place="placeholder"
          :disabled="true"
        />
        <EditInputSelectGroup
          :point="true"
          inputNm="API 명"
          :inputCondition="true"
          :selectCondition="false"
          cssClass="input-box lg"
          place="placeholder"
          :disabled="true"
        />
        <EditInputSelectGroup
          :point="true"
          inputNm="인터페이스 번호"
          :inputCondition="true"
          :selectCondition="false"
          cssClass="input-box lg"
          place="시스템명_버전_API ID"
          :disabled="true"
        />
        <EditMethodGroup />
        <EditURIGroup />
        <EditInputSelectGroup
          :point="true"
          inputNm="시스템 연동 정보"
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
          inputNm="타임아웃(ms)"
          :inputCondition="true"
          :selectCondition="false"
          cssClass="input-box lg check-ok"
          place="number"
          :disabled="false"
        />
        <EditTextAreaGroup inputNm="시스템 설명" :point="false" />
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
import InputGroup from '@/components/system/InputGroup.vue';
import InterfaceGroup from '@/components/system/LinkGroup.vue';
import EditTextAreaGroup from '@/components/api/edit/EditTextAreaGroup.vue';
// import { DummySystemResponse, dummyData } from '@/types/SystemType';
import EditMethodGroup from '@/components/api/edit/EditMethodGroup.vue';
import EditURIGroup from '@/components/api/edit/EditURIGroup.vue';
import EditRequestHandler from '@/components/api/edit/EditRequestHandler.vue';
import EditResponseHandler from '@/components/api/edit/EditResponseHandler.vue';
import EditButtonGroup from '@/components/api/edit/EditButtonGroup.vue';
import { SystemResponse } from '@/types/SystemType';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    InterfaceGroup,
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
}
</script>
<style lang=""></style>
