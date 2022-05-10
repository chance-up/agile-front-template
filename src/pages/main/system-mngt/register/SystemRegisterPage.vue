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
          :value.sync="systemItem.id"
          :isValid.sync="idValid"
          :inputNm="$t('system.id')"
          :place="$t('system.autoCreate')"
        />
        <InputGroup
          type="text"
          :value.sync="systemItem.tkcgr_nm"
          :isValid.sync="tkcgrNmValid"
          :inputNm="$t('system.tkcgrNm')"
          :place="$t('system.tkcgrNm')"
        />
        <InputGroup
          type="text"
          :value.sync="systemItem.tkcgr_pos"
          :inputNm="$t('system.tkcgrPos')"
          :place="$t('system.tkcgrPos')"
          :isValid.sync="tkcgrPosValid"
        />
        <InputGroup
          type="email"
          :value.sync="systemItem.tkcgr_eml"
          :inputNm="$t('system.tkcgrEml')"
          :place="$t('system.tkcgrEml')"
          :isValid.sync="tkcgrEmlValid"
        />
        <EdptForm :inputNm="$t('system.edpt')" :strArr.sync="systemItem.edpt" :isValid.sync="edptValid" />
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
        <button id="submitBtn" class="lg-btn purple-btn" @click="showModal" :disabled="isBtnDisabled">
          {{ $t('common.register') }}
          <b-spinner variant="light" label="Spinning" v-if="isBtnDisabled" small></b-spinner>
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
  edptValid = false;

  isShowProgress = false;
  isShowModal = false;
  isBtnDisabled = false;

  systemModule = getModule(SystemModule, this.$store);

  systemItem: SystemResponse = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    edpt: ['http::'],
    desc: '',
    created_at: '',
    created_by: '',
    updated_at: '',
    updated_by: '',
  };

  cancelOnClickEvent() {
    this.$router.go(-1);
  }

  isDuplicated: boolean | null = null;
  async duplicateCheck() {
    this.isDuplicated = await this.systemModule.duplicateCheck(this.systemItem.id);
  }

  showModal() {
    console.log('idValid :: ', this.idValid);
    console.log('tkcgrNmValid :: ', this.tkcgrNmValid);
    console.log('tkcgrPosValid :: ', this.tkcgrPosValid);
    console.log('tkcgrEmlValid :: ', this.tkcgrEmlValid);
    console.log('edptValid :: ', this.edptValid);
    console.log('edpt :: ', this.systemItem.edpt);

    const val =
      this.idValid && this.tkcgrNmValid && this.tkcgrPosValid && this.tkcgrEmlValid && this.edptValid ? true : false;

    if (!val) {
      this.$modal.show(`${this.$t('system.empty_check_message')}`);
      return;
    } else {
      this.isShowModal = true;
    }
  }

  closeModal() {
    this.isShowModal = false;
  }

  async onSubmit() {
    this.isBtnDisabled = true;
    await this.systemModule
      .registerSystem(this.systemItem)
      .then(() => {
        this.isShowProgress = false;
        this.$router.push({ name: 'system' });
      })
      .catch(() => {
        this.isShowProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }
}
</script>
<style lang=""></style>
