<template>
  <ContentLayout
    :title="$t('system.modify_top_title')"
    :subTitle="$t('system.modify_cont_title')"
    :depth="$t('system.modify_depth')"
  >
    <template v-slot:contents>
      <ul>
        <InputGroup :inputNm="$t('system.name')" :place="dumyData.sysNm" inputClass="input-box lg" :disabled="true" />
        <InputGroup :inputNm="$t('system.id')" :place="dumyData.sysId" inputClass="input-box lg" :disabled="true" />
        <InputGroup
          :inputNm="$t('system.tkcgrNm')"
          :place="dumyData.mgrNm"
          inputClass="input-box lg check-false"
          validCheck="중복된 API ID 입니다."
        />
        <InputGroup :inputNm="$t('system.tkcgrPos')" :place="dumyData.belong" inputClass="input-box lg check-ok" />
        <InputGroup :inputNm="$t('system.tkcgrEml')" :place="dumyData.eMail" inputClass="input-box lg check-ok" />
        <LinkGroup :inputNm="$t('system.ifGrp')" :linkType="dumyData.linkType" />
        <TextAreaGroup :inputNm="$t('system.desc')" />
      </ul>
    </template>
    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn">{{ $t('common.modify') }}</button>
        <button class="lg-btn white-btn">{{ $t('common.cancel') }}</button>
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
import { SystemResponse } from '@/types/SystemType';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    LinkGroup,
    TextAreaGroup,
  },
})
export default class SystemEditPage extends Vue {
  // get dumyData(): DummySystemResponse {
  //   return dummyData;
  // }
}
</script>
<style lang=""></style>
