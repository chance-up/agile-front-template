<template>
  <ContentLayout
    :title="$t('system.add_top_title')"
    :subTitle="$t('system.add_cont_title')"
    depth="$t('system.add_depth')"
  >
    <template v-slot:contents>
      <ul>
        <InputGroup :inputNm="$t('system.name')" :place="$t('system.name')" inputClass="input-box lg check-ok" />
        <InputGroup :inputNm="$t('system.id')" :place="$t('system.id')" inputClass="input-box lg" />
        <InputGroup
          :inputNm="$t('system.tkcgrNm')"
          :place="$t('system.tkcgrNm')"
          inputClass="input-box lg check-false"
        />
        <InputGroup
          :inputNm="$t('system.tkcgrPos')"
          :place="$t('system.tkcgrPos')"
          inputClass="input-box lg check-ok"
        />
        <InputGroup
          :inputNm="$t('system.tkcgrEml')"
          :place="$t('system.tkcgrEml')"
          inputClass="input-box lg check-ok"
        />
        <InterfaceGroup :inputNm="$t('system.ifGrp')">
          <template v-slot:interface>
            <Interface />
          </template>
        </InterfaceGroup>
        <TextAreaGroup :inputNm="$t('system.desc')" />
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
import InterfaceGroup from '@/components/system/InterfaceGroup.vue';
import Interface from '@/components/system/Interface.vue';
import TextAreaGroup from '@/components/system/TextAreaGroup.vue';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    InterfaceGroup,
    Interface,
    TextAreaGroup,
  },
})
export default class SystemRegisterPage extends Vue {}
</script>
<style lang=""></style>
