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
          :value.sync="systemItem.id"
          :isValid.sync="idValid"
          :inputNm="$t('system.id')"
          :place="$t('system.autoCreate')"
          :disabled="true"
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
        <!-- <InterfaceGroup :inputNm="$t('system.ifGrp')" :ifgrps.sync="systemItem.if_grp" /> -->
        <EdptForm :inputNm="$t('system.edpt')" :strArr.sync="systemItem.edpt" :isValid.sync="edptValid" />
        <TextAreaGroup :inputNm="$t('system.desc')" :value.sync="systemItem.desc" />
      </ul>
      <ModalLayout size="m" v-if="isShowModal">
        <template v-slot:modalHeader
          ><h1 class="h1-tit">{{ $t('system.modal_system_edit') }}</h1>
        </template>
        <template v-slot:modalContainer>
          <p class="text">{{ $t('system.modal_edit_message') }}</p>
        </template>
        <template v-slot:modalFooter
          ><button class="lg-btn purple-btn" @click="onSubmit">{{ $t('common.ok') }}</button
          ><button class="lg-btn purple-btn" @click="closeModal">{{ $t('common.cancel') }}</button>
        </template>
      </ModalLayout>
    </template>
    <template v-if="!isShowProgress" v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="showModal" :disabled="isBtnDisabled">
          {{ $t('common.modify') }}
        </button>
        <button class="lg-btn white-btn" @click="cancelOnClickEvent">{{ $t('common.cancel') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { SystemResponse } from '@/types/SystemType';

import SystemModule from '@/store/modules/SystemModule';

import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/system-mngt/InputGroup.vue';
import TextAreaGroup from '@/components/system-mngt/TextAreaGroup.vue';
import EdptForm from '@/components/system-mngt/EdptForm.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    TextAreaGroup,
    EdptForm,
    ModalLayout,
  },
})
export default class SystemEditPage extends Vue {
  systemModule = getModule(SystemModule, this.$store);
  systemItem: SystemResponse = {} as SystemResponse;
  idValid = true;
  tkcgrNmValid = true;
  tkcgrPosValid = true;
  tkcgrEmlValid = true;
  edptValid = true;

  isShowProgress = false;
  isShowModal = false;
  isBtnDisabled = false;

  get system() {
    return this.systemModule.system;
  }

  created() {
    this.isShowProgress = true;

    this.systemModule
      .getSystemDetail(this.$route.params.id as string)
      .then(() => {
        this.isShowProgress = false;
      })
      .catch((error) => {
        this.isShowProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }

  @Watch('system')
  onSystemChange() {
    this.systemItem = this.system as SystemResponse;
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

  onSubmit(): void {
    if (confirm('서비스를 수정하시겠습니까?') == true) {
      console.log(this.systemItem);
      this.isShowProgress = true;
      this.systemModule
        .updateSystemDetail(this.systemItem)
        .then(() => {
          this.isShowProgress = false;
        })
        .catch((error) => {
          this.isShowProgress = false;
          this.$modal.show(`${this.$t('error.server_error')}`);
        });
    } else {
      return;
    }

    // this.isBtnDisabled = true;

    //   await this.systemModule.registerSystem(this.systemItem);
    //   this.$router.push({ name: 'system' });
  }

  cancelOnClickEvent() {
    this.$router.go(-1);
  }
}
</script>
<style lang=""></style>
