<template>
  <ContentLayout title="시스템 등록" subTitle="기본정보 등록" depth="시스템 관리">
    <template v-slot:contents>
      <ul>
        <InputGroup inputNm="시스템명" :place="dumyData.sysNm" inputClass="input-box lg check-ok" />
        <InputGroup inputNm="시스템 ID" :place="dumyData.sysId" inputClass="input-box lg" />
        <InputGroup
          inputNm="담당자 이름"
          :place="dumyData.sysId"
          inputClass="input-box lg check-false"
          validCheck="중복된 API ID 입니다."
        />
        <InputGroup inputNm="소속" :place="dumyData.belong" inputClass="input-box lg check-ok" />
        <InputGroup inputNm="E-mail" :place="dumyData.eMail" inputClass="input-box lg check-ok" />
        <LinkGroup inputNm="연동방식" :linkType="dumyData.linkType" />
        <TextAreaGroup inputNm="시스템 설명" />
      </ul>
    </template>
    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn">등록</button>
        <button class="lg-btn white-btn">취소</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/system/InputGroup.vue';
import LinkGroup from '@/components/system/LinkGroup.vue';
import TextAreaGroup from '@/components/system/TextAreaGroup.vue';
import { DummySystemResponse, dummyData } from '@/types/SystemType';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    LinkGroup,
    TextAreaGroup,
  },
})
export default class SystemRegisterPage extends Vue {
  get dumyData(): DummySystemResponse {
    return dummyData;
  }
}
</script>
<style lang=""></style>
