<template>
  <ContentLayout
    :title="$t('system.add_top_title')"
    :subTitle="$t('system.add_cont_title')"
    depth="$t('system.add_depth')"
  >
    <template v-slot:contents>
      <ul>
        <InputGroup
          v-model="systemItem.nm"
          :inputNm="$t('system.name')"
          :place="$t('system.name')"
          inputClass="input-box lg check-ok"
        />
        <InputGroup
          v-model="systemItem.id"
          :inputNm="$t('system.id')"
          :place="$t('system.id')"
          inputClass="input-box lg"
        />
        <InputGroup
          v-model="systemItem.tkcgr_nm"
          :inputNm="$t('system.tkcgrNm')"
          :place="$t('system.tkcgrNm')"
          inputClass="input-box lg check-false"
        />
        <InputGroup
          v-model="systemItem.tkcgr_pos"
          :inputNm="$t('system.tkcgrPos')"
          :place="$t('system.tkcgrPos')"
          inputClass="input-box lg check-ok"
        />
        <InputGroup
          v-model="systemItem.tkcgr_eml"
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
        <button class="lg-btn purple-btn" @click="onSubmit">{{ $t('common.register') }}</button>
        <button class="lg-btn white-btn" @click="cancelOnClickEvent">{{ $t('common.cancel') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import SystemModule from '@/store/modules/SystemModule';

import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/system/InputGroup.vue';
import InterfaceGroup from '@/components/system/InterfaceGroup.vue';
import Interface from '@/components/system/Interface.vue';
import TextAreaGroup from '@/components/system/TextAreaGroup.vue';

import { SystemResponse } from '@/types/SystemType';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    InterfaceGroup,
    Interface,
    TextAreaGroup,
  },
})
export default class SystemRegisterPage extends Vue {
  systemModule = getModule(SystemModule, this.$store);

  systemItem: SystemResponse = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    if_grp: '',
    desc: '',
    created_at: '',
    created_by: '',
    updated_at: '',
    updated_by: '',
  };

  onSubmit(): void {
    if (confirm('서비스를 등록하시겠습니까?') == true) {
      console.log(this.systemItem);
      this.systemModule.registerSystem(this.systemItem);
    } else {
      return;
    }
  }

  cancelOnClickEvent() {
    this.$router.go(-1);
  }
}
</script>
<style lang=""></style>
