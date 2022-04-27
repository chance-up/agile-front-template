<template>
  <ContentLayout
    :title="$t('system.add_top_title')"
    :subTitle="$t('system.add_cont_title')"
    depth="$t('system.add_depth')"
  >
    <template v-slot:contents>
      <ul>
        <InputGroup
          type="text"
          :v-model="systemItem.nm"
          :check="isValid"
          :inputNm="$t('system.name')"
          :place="$t('system.name')"
          inputClass="input-box lg check-ok"
          @input="validationCheck"
        />
        <TextDebounceForm
          type="text"
          :v-model="systemItem.id"
          :check="isDuplicated"
          :inputNm="$t('system.id')"
          :place="$t('system.id')"
          @input="duplicateCheck"
        />
        <InputGroup
          type="text"
          :v-model="systemItem.tkcgr_nm"
          :inputNm="$t('system.tkcgrNm')"
          :place="$t('system.tkcgrNm')"
          inputClass="input-box lg check-false"
        />
        <InputGroup
          type="text"
          :v-model="systemItem.tkcgr_pos"
          :inputNm="$t('system.tkcgrPos')"
          :place="$t('system.tkcgrPos')"
          inputClass="input-box lg check-ok"
        />
        <InputGroup
          type="email"
          :v-model="systemItem.tkcgr_eml"
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
  isValid: boolean | null = null;
  validationCheck() {
    // 정규식
    this.isValid = false;
  }
}
</script>
<style lang=""></style>
