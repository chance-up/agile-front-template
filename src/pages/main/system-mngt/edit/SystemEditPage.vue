<template>
  <ContentLayout
    :isShowProgress="isShowProgress"
    :title="$t('system.modify_top_title')"
    :subTitle="$t('system.modify_cont_title')"
    :depth="$t('system.modify_depth')"
  >
    <template v-if="!isShowProgress" v-slot:contents>
      <ul>
        <InputGroup
          type="text"
          :value.sync="systemItem.nm"
          :inputNm="$t('system.name')"
          :place="$t('system.name')"
          :disabled="false"
        />
        <InputGroup
          :inputNm="$t('system.id')"
          v-model="systemItem.id"
          :place="$t('system.id')"
          inputClass="input-box lg"
          :disabled="true"
          type="text"
        />
        <InputGroup
          :inputNm="$t('system.tkcgrNm')"
          v-model="systemItem.tkcgr_nm"
          :place="$t('system.tkcgrNm')"
          inputClass="input-box lg check-false"
          type="text"
        />
        <!-- validCheck="중복된 API ID 입니다." -->
        <InputGroup
          :inputNm="$t('system.tkcgrPos')"
          v-model="systemItem.tkcgr_pos"
          :place="$t('system.tkcgrPos')"
          inputClass="input-box lg check-ok"
          type="text"
        />
        <InputGroup
          :inputNm="$t('system.tkcgrEml')"
          v-model="systemItem.tkcgr_eml"
          :place="$t('system.tkcgrEml')"
          inputClass="input-box lg check-ok"
          type="text"
        />
        <InterfaceGroup :inputNm="$t('system.ifGrp')" :linkType="systemItem.if_grp" />
        <TextAreaGroup :inputNm="$t('system.desc')" v-model="systemItem.desc" />
      </ul>
    </template>
    <template v-if="!isShowProgress" v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="onSubmit">{{ $t('common.modify') }}</button>
        <button class="lg-btn white-btn" @click="cancelOnClickEvent">{{ $t('common.cancel') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import SystemModule from '@/store/modules/SystemModule';
import { SystemResponse } from '@/types/SystemType';

import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/system-mngt/InputGroup.vue';
import InterfaceGroup from '@/components/system-mngt/InterfaceGroup.vue';
import TextAreaGroup from '@/components/system-mngt/TextAreaGroup.vue';
import { USER_STATE } from '@/store/UserState';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    InterfaceGroup,
    TextAreaGroup,
  },
})
export default class SystemEditPage extends Vue {
  systemModule = getModule(SystemModule, this.$store);
  systemItem: SystemResponse = {} as SystemResponse;
  isShowProgress = false;

  get system() {
    return this.systemModule.system;
  }

  get userState() {
    return this.systemModule.currAsyncState;
  }

  @Watch('userState')
  onCurrAsyncStateChange(userState: USER_STATE) {
    if (userState === USER_STATE.LOADING) {
      this.isShowProgress = true;
    } else if (userState === USER_STATE.ERROR) {
      this.isShowProgress = false;
      this.$modal.show('서버 통신 에러');
    } else if (userState === USER_STATE.DONE) {
      this.isShowProgress = false;
    }
  }

  created() {
    this.systemModule.getSystemDetail(this.$route.params.id as string);
  }

  @Watch('system')
  onSystemChange() {
    this.systemItem = this.system;
  }

  onSubmit(): void {
    if (confirm('서비스를 수정하시겠습니까?') == true) {
      console.log(this.systemItem);
      this.systemModule.updateSystemDetail(this.systemItem);
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
