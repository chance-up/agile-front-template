<template>
  <ContentLayout
    :title="$t('system.add_top_title')"
    :subTitle="$t('system.add_cont_title')"
    :depth="$t('system.add_depth')"
  >
    <template v-slot:contents>
      <ul>
        <TextDebounceForm
          type="text"
          :check="isDuplicatedId"
          v-model="systemItem.id"
          :isValid.sync="idValid"
          :inputNm="$t('system.id')"
          :placeholder="$t('system.id_placeholder')"
          :required="true"
          @input="duplicateCheckId"
        />

        <EdptForm :inputNm="$t('system.edpt')" :strArr.sync="systemItem.edpt" :isValid.sync="edptValid" />

        <InputGroup
          type="text"
          :value.sync="systemItem.tkcgrNm"
          :isValid.sync="tkcgrNmValid"
          :inputNm="$t('system.tkcgrNm')"
          :place="$t('system.tkcgrNm_placeholder')"
        />
        <InputGroup
          type="text"
          :value.sync="systemItem.tkcgrPos"
          :inputNm="$t('system.tkcgrPos')"
          :place="$t('system.tkcgrPos_placeholder')"
          :isValid.sync="tkcgrPosValid"
        />
        <InputGroup
          type="email"
          :value.sync="systemItem.tkcgrEml"
          :inputNm="$t('system.tkcgrEml')"
          :place="$t('system.tkcgrEml_placeholder')"
          :isValid.sync="tkcgrEmlValid"
        />
        <TextAreaGroup :inputNm="$t('system.desc')" :value.sync="systemItem.desc" :isValid.sync="descValid" />
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
        <button class="lg-btn purple-btn" @click="showModal" :disabled="isBtnDisabled">
          {{ $t('common.register') }}
          <b-spinner variant="light" label="Spinning" v-if="isBtnDisabled" small></b-spinner>
        </button>
        <button class="lg-btn white-btn" @click="cancelOnClickEvent" :disabled="isBtnDisabled">
          {{ $t('common.cancel') }}
        </button>
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
import TextAreaGroup from '@/components/system-mngt/TextAreaGroup.vue';
import TextDebounceForm from '@/components/system-mngt/TextDebounceForm.vue';
import EdptForm from '@/components/system-mngt/EdptForm.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import { SystemRegisterResponse } from '@/types/SystemType';

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
  descValid = true;

  isShowProgress = false;
  isShowModal = false;
  isBtnDisabled = false;

  systemModule = getModule(SystemModule, this.$store);

  systemItem: SystemRegisterResponse = {
    id: '',
    tkcgrNm: '',
    tkcgrPos: '',
    tkcgrEml: '',
    edpt: ['http::'],
    desc: '',
    cretId: 'ccs',
    updId: 'ccs',
  };

  cancelOnClickEvent() {
    this.$router.go(-1);
  }

  timerId = 0;
  isDuplicatedId: boolean | null = null;
  duplicateCheckId() {
    this.isDuplicatedId = null;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(async () => {
      console.log('입력 1초 경과!!!!@#!@#!@#');
      this.isDuplicatedId = await this.systemModule.duplicateCheck(this.systemItem.id);
    }, 1000);
  }

  showModal() {
    // console.log('idValid :: ', this.idValid);
    // console.log('tkcgrNmValid :: ', this.tkcgrNmValid);
    // console.log('tkcgrPosValid :: ', this.tkcgrPosValid);
    // console.log('tkcgrEmlValid :: ', this.tkcgrEmlValid);
    // console.log('edptValid :: ', this.edptValid);
    // console.log('descValid :: ', this.descValid);
    // console.log('edpt :: ', this.systemItem.edpt);
    // console.log('edpt :: ', this.systemItem.edpt);
    console.log('desc :: ', this.systemItem.desc);

    const val =
      this.idValid && this.tkcgrNmValid && this.tkcgrPosValid && this.tkcgrEmlValid && this.edptValid && this.descValid
        ? true
        : false;

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
    this.isShowModal = false;
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
