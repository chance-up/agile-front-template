<template>
  <ContentLayout
    :title="$t('system.add_top_title')"
    :subTitle="$t('system.add_cont_title')"
    depth="$t('system.add_depth')"
  >
    <template v-slot:contents>
      <ul>
        <InputGroup :inputNm="$t('system.name')" place="시스템명" inputClass="input-box lg check-ok" />
        <InputGroup inputNm="$t('system.id')" place="시스템 ID" inputClass="input-box lg" />
        <InputGroup inputNm="$t('system.tkcgrNm')" place="담당자 이름" inputClass="input-box lg check-false" />
        <InputGroup inputNm="$t('system.tkcgrPos')" place="소속" inputClass="input-box lg check-ok" />
        <InputGroup inputNm="$t('system.tkcgrEml')" place="E-Mail" inputClass="input-box lg check-ok" />
        <LinkGroup inputNm="$t('system.ifGrp')" linkType="연동방식" />
        <TextAreaGroup inputNm="$t('system.desc')" />
      </ul>
    </template>
    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn">{{ $t('common.register') }}</button>
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
export default class SystemRegisterPage extends Vue {}
</script>
<style lang=""></style>
