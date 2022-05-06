<template>
  <ContentLayout
    :title="$t('system.add_top_title')"
    :subTitle="$t('system.add_cont_title')"
    :depth="$t('system.add_depth')"
  >
    <template v-slot:contents>
      <ul>
        <!-- <InputGroup
          type="text"
          :value.sync="systemItem.nm"
          :inputNm="$t('system.name')"
          :place="$t('system.name')"
          :isvalid.sync="nmValid"
        /> -->
        <!-- 시스템 ID 자동생성/수정불가라서 disable 처리해야할 수도 있음 -->
        <InputGroup
          type="text"
          :value.sync="systemItem.id"
          :isvalid.sync="idValid"
          :inputNm="$t('system.id')"
          :place="$t('system.autoCreate')"
        />
        <!-- :disabled="true" -->
        <!-- <TextDebounceForm
          type="text"
          :check="isDuplicated"
          :v-model="systemItem.id"
          :inputNm="$t('system.id')"
          :place="$t('system.autoCreate')"
          @input="duplicateCheck"
        /> -->
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
        <InterfaceGroup :inputNm="$t('system.ifGrp')" :isvalid.sync="ifGrpValid" :ifgrps.sync="systemItem.if_grp" />
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
        <button id="submitBtn" class="lg-btn purple-btn" @click="showModal">
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
import InterfaceGroup from '@/components/system-mngt/InterfaceGroup.vue';
import Interface from '@/components/system-mngt/Interface.vue';
import TextAreaGroup from '@/components/system-mngt/TextAreaGroup.vue';
import TextDebounceForm from '@/components/system-mngt/TextDebounceForm.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import { SystemResponse } from '@/types/SystemType';
import { USER_STATE } from '@/store/UserState';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    InterfaceGroup,
    Interface,
    TextAreaGroup,
    TextDebounceForm,
    ModalLayout,
  },
})
export default class SystemRegisterPage extends Vue {
  // 1. 중복 검사 + 유효성 검사하는 로직을 추가하고자 한다.
  // 2. 중복 검사가 필요하지 않는 경우에는 유효성 검사만 수행한다.
  // 3. 중복 검사가 필요한 경우에는 중복 검사를 수행한다.
  // 4. 중복 검사에 필요한 메서드는 InputGroup에 prop으로 넘겨준다.
  totalValid: boolean[] = [];
  idValid = false;
  tkcgrNmValid = false;
  tkcgrPosValid = false;
  tkcgrEmlValid = false;
  ifGrpValid: boolean[] = [false, false];

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

  @Watch('tkcgrNmValid')
  onTkcgrNmValidChange(newVal: boolean) {
    this.totalValid.splice(0, 1, newVal);
  }

  @Watch('tkcgrPosValid')
  onTkcgrPosValidChange(newVal: boolean) {
    this.totalValid.splice(1, 1, newVal);
  }

  @Watch('tkcgrEmlValid')
  onTkcgrEmlValidChange(newVal: boolean) {
    this.totalValid.splice(2, 1, newVal);
  }

  @Watch('ifGrpValid')
  onIfGrpValidChange(newVal: boolean[]) {
    if (newVal[0] && newVal[1]) this.totalValid.splice(4, 1, true);
    else this.totalValid.splice(4, 1, false);
  }

  @Watch('totalValid')
  onTotalValidChange(newVal: boolean[]) {
    if (newVal.every((item) => item === true)) this.isBtnDisabled = false;
    else this.isBtnDisabled = true;
  }

  async onSubmit() {
    // console.log(this.systemItem);
    // console.log('valid!!!!!');
    // console.log(this.nmValid);
    // console.log(this.idValid);
    // console.log(this.tkcgrNmValid);
    // console.log(this.tkcgrPosValid);
    // console.log(this.tkcgrEmlValid);
    // console.log('ifGrpValid', this.ifGrpValid);

    const val =
      this.tkcgrNmValid && this.tkcgrPosValid && this.tkcgrEmlValid && this.ifGrpValid[0] && this.ifGrpValid[1]
        ? true
        : false;

    if (!val) {
      this.$modal.show(`${this.$t('system.empty_check_message')}`);
      return;
    } else {
      await this.systemModule.registerSystem(this.systemItem);
      this.$router.push({ name: 'system' });
    }
  }

  cancelOnClickEvent() {
    this.$router.go(-1);
  }

  isDuplicated: boolean | null = null;
  async duplicateCheck() {
    this.isDuplicated = await this.systemModule.duplicateCheck(this.systemItem.id);
  }

  showModal() {
    this.isShowModal = true;
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
