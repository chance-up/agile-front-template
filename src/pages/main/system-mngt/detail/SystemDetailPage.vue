<template>
  <ContentLayout
    :isShowProgress="isShowProgress"
    :title="$t('system.detail_top_title')"
    :subTitle="$t('system.detail_cont_title')"
    :depth="$t('system.detail_depth')"
    :isEmShow="isEmShow"
  >
    <template v-if="!isShowProgress" v-slot:contents>
      <ul>
        <InfoGroup :inputNm="$t('system.id')" :value="systemItem.id" />

        <IfFormlGroup :inputNm="$t('system.edpt')" :endPoints="systemItem.edpt" />
        <InfoGroup :inputNm="$t('system.tkcgrNm')" :value="systemItem.tkcgrNm" />
        <InfoGroup :inputNm="$t('system.tkcgrPos')" :value="systemItem.tkcgrPos" />
        <InfoGroup :inputNm="$t('system.tkcgrEml')" :value="systemItem.tkcgrEml" />
        <InfoGroup :inputNm="$t('system.desc')" :value="systemItem.desc" />
        <ModalLayout size="m" v-if="isShowModal">
          <template v-slot:modalHeader
            ><h1 class="h1-tit">{{ $t('system.modal_system_delete') }}</h1>
          </template>
          <template v-slot:modalContainer>
            <p class="text">{{ $t('system.modal_delete_message') }}</p>
          </template>
          <template v-slot:modalFooter>
            <button class="lg-btn purple-btn" @click="onClickDelete">{{ $t('common.ok') }}</button>
            <button class="lg-btn white-btn" @click="closeModal">{{ $t('common.cancel') }}</button>
          </template>
        </ModalLayout>
      </ul>
    </template>
    <template v-if="!isShowProgress" v-slot:buttons>
      <div class="btn-wrap" v-if="!isShowProgress">
        <button class="lg-btn purple-btn" @click="onClickEdit" :disabled="isDisabled">{{ $t('common.modify') }}</button>
        <button class="lg-btn white-btn" @click="showModal" :disabled="isDisabled">
          {{ $t('common.delete') }}
          <b-spinner label="Spinning" v-if="isDisabled" small></b-spinner>
        </button>
        <button class="lg-btn gray-btn" @click="onClickPrevious" :disabled="isDisabled">{{ $t('common.list') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { SystemResponse } from '@/types/SystemType';
import SystemModule from '@/store/modules/SystemModule';

import ContentLayout from '@/components/layout/ContentLayout.vue';
import InfoGroup from '@/components/system-mngt/detail/InfoGroup.vue';
import IfFormlGroup from '@/components/system-mngt/detail/IfFormlGroup.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
// import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';

@Component({
  components: {
    ContentLayout,
    InfoGroup,
    IfFormlGroup,
    ModalLayout,
  },
})
export default class SystemDetailPage extends Vue {
  @Prop({ default: '' }) id!: string;

  systemModule = getModule(SystemModule, this.$store);
  systemItem: SystemResponse = {} as SystemResponse;

  isShowProgress = false;
  isShowModal = false;
  isDisabled = false;
  isEmShow = false;

  get system() {
    return this.systemModule.system;
  }

  mounted() {
    this.isShowProgress = true;
    this.systemModule.systemReset();

    this.systemModule
      .getSystemDetail(this.$route.params.id as string)
      .then(() => {
        console.log(this.systemModule.system);

        this.isShowProgress = false;
        this.systemItem = this.system;
      })
      .catch((error) => {
        if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
          this.$modal.show(`${this.$t('error.server_error')}`);
        } else {
          this.$modal.show(`${this.$t('error.server_error')}`);
        }
      });
  }

  // @Watch('system')
  // onSystemChange() {
  //   this.systemItem = this.system;
  // }

  onClickPrevious() {
    this.$router.go(-1);
  }

  onClickEdit() {
    this.$router.push({ name: 'system-edit', params: { id: this.$route.params.id } });
  }

  async onClickDelete() {
    this.isDisabled = true;
    this.isShowModal = false;

    await this.systemModule
      .deleteSystem(this.$route.params.id as string)
      .then(() => {
        this.isDisabled = false;
        this.$router.push({ name: 'system' });
        this.$toast.success(this.$t('common.delete_success'), {
          toastClassName: ['toast-success-custom-class'],
        });
      })
      .catch((error) => {
        this.isDisabled = false;
        if (error.getErrorCode() == ErrorCode.SYSTEM_DELETE_FAIL) {
          this.$toast.error(this.$t('system.system_delete_fail', { system_name: this.$route.params.id }));
        }
      });
  }

  showModal() {
    this.isShowModal = true;
  }

  closeModal() {
    console.log('closeModal');
    this.isShowModal = false;
  }
}
</script>
