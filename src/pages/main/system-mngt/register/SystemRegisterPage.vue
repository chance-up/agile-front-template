<template>
  <ContentLayout
    :title="$t('system.add_top_title')"
    :subTitle="$t('system.add_cont_title')"
    :depth="$t('system.add_depth')"
  >
    <template v-slot:contents>
      <ul>
        <InputGroup
          type="text"
          :value.sync="systemItem.nm"
          :inputNm="$t('system.name')"
          :place="$t('system.name')"
          :isvalid.sync="nmValid"
        />
        <TextDebounceForm
          type="text"
          :check="isDuplicated"
          :value.sync="systemItem.id"
          :inputNm="$t('system.id')"
          :place="$t('system.id')"
          @input="duplicateCheck"
        />
        <InputGroup
          type="text"
          :value.sync="systemItem.tkcgr_nm"
          :inputNm="$t('system.tkcgrNm')"
          :place="$t('system.tkcgrNm')"
          :isvalid.sync="tkcgrNmValid"
        />
        <InputGroup
          type="text"
          :value.sync="systemItem.tkcgr_pos"
          :inputNm="$t('system.tkcgrPos')"
          :place="$t('system.tkcgrPos')"
          :isvalid.sync="tkcgrPosValid"
        />
        <InputGroup
          type="email"
          :value.sync="systemItem.tkcgr_eml"
          :inputNm="$t('system.tkcgrEml')"
          :place="$t('system.tkcgrEml')"
          :isvalid.sync="tkcgrEmlValid"
        />
        <InterfaceGroup :inputNm="$t('system.ifGrp')" :ifgrps.sync="systemItem.if_grp" />
        <TextAreaGroup :inputNm="$t('system.desc')" :value.sync="systemItem.desc" />
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import SystemModule from '@/store/modules/SystemModule';

import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/system-mngt/InputGroup.vue';
import InterfaceGroup from '@/components/system-mngt/InterfaceGroup.vue';
import Interface from '@/components/system-mngt/Interface.vue';
import TextAreaGroup from '@/components/system-mngt/TextAreaGroup.vue';
import TextDebounceForm from '@/components/system-mngt/TextDebounceForm.vue';
import { SystemResponse } from '@/types/SystemType';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    InterfaceGroup,
    Interface,
    TextAreaGroup,
    TextDebounceForm,
  },
})
export default class SystemRegisterPage extends Vue {
  // 1. 중복 검사 + 유효성 검사하는 로직을 추가하고자 한다.
  // 2. 중복 검사가 필요하지 않는 경우에는 유효성 검사만 수행한다.
  // 3. 중복 검사가 필요한 경우에는 중복 검사를 수행한다.
  // 4. 중복 검사에 필요한 메서드는 InputGroup에 prop으로 넘겨준다.
  nmValid = false;
  tkcgrNmValid = false;
  tkcgrPosValid = false;
  tkcgrEmlValid = false;

  systemModule = getModule(SystemModule, this.$store);

  systemItem: SystemResponse = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    if_grp: [
      {
        if_nm: '',
        if_url: [
          {
            protocol: 'http',
            domain: '',
            port: '',
          },
        ],
      },
    ],
    desc: '',
    created_at: '',
    created_by: '',
    updated_at: '',
    updated_by: '',
  };

  onSubmit(): void {
    if (confirm('서비스를 등록하시겠습니까?') == true) {
      console.log(this.systemItem);
      console.log('valid!!!!!');
      console.log(this.nmValid);
      console.log(this.tkcgrNmValid);
      console.log(this.tkcgrPosValid);
      console.log(this.tkcgrEmlValid);
    } else {
      return;
    }
  }

  cancelOnClickEvent() {
    this.$router.go(-1);
  }

  isDuplicated: boolean | null = null;
  async duplicateCheck() {
    this.isDuplicated = await this.systemModule.duplicateCheck(this.systemItem.id);
  }
}
</script>
<style lang=""></style>
