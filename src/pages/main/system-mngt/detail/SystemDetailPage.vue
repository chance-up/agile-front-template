<template>
  <ContentLayout
    :isShowProgress="isShowProgress"
    :title="$t('system.detail_top_title')"
    :subTitle="$t('system.detail_cont_title')"
    :depth="$t('system.detail_depth')"
  >
    <template v-if="!isShowProgress" v-slot:contents>
      <ul>
        <InfoGroup :inputNm="$t('system.id')" :value="systemItem.id" />
        <InfoGroup :inputNm="$t('system.tkcgrNm')" :value="systemItem.tkcgr_nm" />
        <InfoGroup :inputNm="$t('system.tkcgrPos')" :value="systemItem.tkcgr_pos" />
        <InfoGroup :inputNm="$t('system.tkcgrEml')" :value="systemItem.tkcgr_eml" />
        <IfFormlGroup :inputNm="$t('system.ifGrp')" :endPoints="systemItem.if_grp" />
        <InfoGroup :inputNm="$t('system.desc')" :value="systemItem.desc" />
        <ModalLayout size="m" v-if="isShowModal">
          <template v-slot:modalHeader
            ><h1 class="h1-tit">{{ $t('system.modal_system_delete') }}</h1>
          </template>
          <template v-slot:modalContainer>
            <p class="text">{{ $t('system.modal_delete_message') }}</p>
          </template>
          <template v-slot:modalFooter
            ><button class="lg-btn purple-btn" @click="onClickDelete">{{ $t('common.ok') }}</button
            ><button class="lg-btn purple-btn" @click="closeModal">{{ $t('common.cancel') }}</button>
          </template>
        </ModalLayout>
      </ul>
    </template>
    <template v-if="!isShowProgress" v-slot:buttons>
      <div class="btn-wrap" v-if="!isShowProgress">
        <button class="lg-btn purple-btn" @click="onClickEdit">{{ $t('common.modify') }}</button>
        <button class="lg-btn white-btn" @click="showModal">{{ $t('common.delete') }}</button>
        <button class="lg-btn gray-btn" @click="onClickPrevious">{{ $t('common.list') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { SystemResponse } from '@/types/SystemType';
import SystemModule from '@/store/modules/SystemModule';

import ContentLayout from '@/components/layout/ContentLayout.vue';
import InfoGroup from '@/components/system-mngt/detail/InfoGroup.vue';
import IfFormlGroup from '@/components/system-mngt/detail/IfFormlGroup.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import { USER_STATE } from '@/store/UserState';
import { GateWayError } from '@/error/GateWayError';
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
  // router push 로 전달받은 id 는 this.$route.params.id 로 사용하시면 됩니다.
  @Prop({ default: '' }) id!: string;

  systemModule = getModule(SystemModule, this.$store);
  systemItem: SystemResponse = {} as SystemResponse;
  isShowProgress = false;
  isShowModal = false;

  get system() {
    return this.systemModule.system;
  }

  get userState() {
    return this.systemModule.currAsyncState;
  }

  created() {
    this.isShowProgress = true;

    this.systemModule
      .getSystemDetail(this.$route.params.id as string)
      .then(() => {
        this.isShowProgress = false;
      })
      .catch((error) => {
        if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
          this.$modal.show(`${this.$t('error.server_error')}`);
        } else {
          this.$modal.show(`${this.$t('error.server_error')}`);
        }
      });
  }

  @Watch('system')
  onSystemChange() {
    this.systemItem = this.system;
  }

  @Watch('userState')
  onCurrAsyncStateChange(userState: USER_STATE) {
    if (userState === USER_STATE.LOADING) {
      this.isShowProgress = true;
    } else if (userState === USER_STATE.ERROR) {
      this.$modal.show(`${this.$t('error.server_error')}`);
    } else if (userState === USER_STATE.DONE) {
      this.isShowProgress = false;
    }
  }

  onClickPrevious() {
    this.$router.go(-1);
  }

  onClickEdit() {
    this.$router.push({ name: 'system-edit', params: { id: this.$route.params.id } });
  }

  async onClickDelete() {
    await this.systemModule
      .deleteSystem(this.$route.params.id as string)
      .then(() => {
        this.$router.push({ name: 'system' });
      })
      .catch((error) => {
        // this.isShowProgress = false;
        // this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }

  showModal() {
    this.isShowModal = true;
  }

  closeModal() {
    this.isShowModal = false;
  }
}
</script>
