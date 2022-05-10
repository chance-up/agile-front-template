<template>
  <ContentLayout
    :title="$t('system.add_top_title')"
    :subTitle="$t('system.add_cont_title')"
    :depth="$t('system.add_depth')"
  >
    <template v-slot:contents>
      <ul>
        <!-- 시스템 ID 자동생성/수정불가라서 disable 처리해야할 수도 있음 -->
        <InputGroup
          type="text"
          :value.sync="systemItem.id"
          :isvalid.sync="idValid"
          :inputNm="$t('system.id')"
          :place="$t('system.autoCreate')"
        />
        <InputGroup
          type="text"
          :value.sync="systemItem.tkcgr_nm"
          :isvalid.sync="tkcgrNmValid"
          :inputNm="$t('system.tkcgrNm')"
          :place="$t('system.tkcgrNm')"
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
        <EdptForm :inputNm="$t('system.ifGrp')" :value.sync="systemItem.edpt" />
        <!-- <InterfaceGroup :inputNm="$t('system.ifGrp')" :isvalid.sync="ifGrpValid" :ifgrps.sync="systemItem.if_grp" /> -->
        <TextAreaGroup :inputNm="$t('system.desc')" :value.sync="systemItem.desc" />
      </ul>
      <ModalLayout size="m" v-if="isShowModal">
        <template v-slot:modalHeader
          ><h1 class="h1-tit">{{ $t('system.modal_system_register') }}</h1>
        </template>
        <template v-slot:modalContainer>
          <p class="text">{{ $t('system.modal_register_message') }}</p>
        </template>
        <template v-slot:modalFooter
          ><button class="lg-btn purple-btn" @click="onSubmit">{{ $t('common.ok') }}</button
          ><button class="lg-btn purple-btn" @click="closeModal">{{ $t('common.cancel') }}</button>
        </template>
      </ModalLayout>
    </template>
    <template v-slot:buttons v-if="!isShowProgress">
      <div class="btn-wrap">
        <button id="submitBtn" class="lg-btn purple-btn" @click="showModal" :disabled="isShowModal">
          {{ $t('common.register') }}
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isShowModal"></span>
        </button>
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
import TextAreaGroup from '@/components/system-mngt/TextAreaGroup.vue';
import TextDebounceForm from '@/components/system-mngt/TextDebounceForm.vue';
import EdptForm from '@/components/system-mngt/EdptForm.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';

import { SystemResponse } from '@/types/SystemType';
import { USER_STATE } from '@/store/UserState';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    TextAreaGroup,
    TextDebounceForm,
    ModalLayout,
    EdptForm,
  },
})
export default class SystemRegisterPage extends Vue {
  idValid = false;
  tkcgrNmValid = false;
  tkcgrPosValid = false;
  tkcgrEmlValid = false;
  ifGrpValid = false;

  isShowProgress = false;
  isShowModal = false;
  isBtnDisabled = true;

  systemModule = getModule(SystemModule, this.$store);

  systemItem: SystemResponse = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    edpt: [],
    desc: '',
    created_at: '',
    created_by: '',
    updated_at: '',
    updated_by: '',
  };

  get userState() {
    return this.systemModule.currAsyncState;
  }

  @Watch('userState')
  onCurrAsyncStateChange(userState: USER_STATE) {
    if (userState === USER_STATE.LOADING) {
      this.isShowProgress = true;
    } else if (userState === USER_STATE.ERROR) {
      this.isShowProgress = false;
      this.$modal.show(`${this.$t('error.server_error')}`);
    } else if (userState === USER_STATE.DONE) {
      this.isShowProgress = false;
    }
  }

  async onSubmit() {
    console.log('idValid', this.idValid);
    console.log('tkcgrNmValid', this.tkcgrNmValid);
    console.log('tkcgrPosValid', this.tkcgrPosValid);
    console.log('tkcgrEmlValid', this.tkcgrEmlValid);
    console.log('ifGrpValid', this.ifGrpValid);

    await this.systemModule.registerSystem(this.systemItem);
    this.$router.push({ name: 'system' });
  }

  cancelOnClickEvent() {
    this.$router.go(-1);
  }

  isDuplicated: boolean | null = null;
  async duplicateCheck() {
    this.isDuplicated = await this.systemModule.duplicateCheck(this.systemItem.id);
  }

  showModal() {
    // TODO : Show Modal 을 띄웠을 떄 등록 버튼 비활성화 해야함.

    // console.log('idValid', this.idValid);
    // console.log('tkcgrNmValid', this.tkcgrNmValid);
    // console.log('tkcgrPosValid', this.tkcgrPosValid);
    // console.log('tkcgrEmlValid', this.tkcgrEmlValid);
    // console.log('ifGrpValid', this.ifGrpValid);

    const val =
      this.idValid && this.tkcgrNmValid && this.tkcgrPosValid && this.tkcgrEmlValid && this.ifGrpValid ? true : false;

    if (!val) {
      // TODO : 비어있거나 비정상적인 값이 있다 라고 멘트 수정....
      this.$modal.show(`${this.$t('system.empty_check_message')}`);
      return;
    } else {
      this.isShowModal = true;
    }
  }

  closeModal() {
    this.isShowModal = false;
  }

  destroyed() {
    this.systemItem = {} as SystemResponse;
  }
}
</script>
<style lang=""></style>
