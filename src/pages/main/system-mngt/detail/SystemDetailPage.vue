<template>
  <ContentLayout
    :title="$t('system.detail_top_title')"
    :subTitle="$t('system.detail_cont_title')"
    :depth="$t('system.detail_depth')"
  >
    <template v-if="!isShowProgress" v-slot:contents>
      <ul>
        <InfoGroup :inputNm="$t('system.name')" :value="systemItem.nm" />
        <InfoGroup :inputNm="$t('system.id')" :value="systemItem.id" />
        <InfoGroup :inputNm="$t('system.tkcgrNm')" :value="systemItem.tkcgr_nm" />
        <InfoGroup :inputNm="$t('system.tkcgrPos')" :value="systemItem.tkcgr_pos" />
        <InfoGroup :inputNm="$t('system.tkcgrEml')" :value="systemItem.tkcgr_eml" />
        <IfFormlGroup :inputNm="$t('system.ifGrp')" :ifGrps="systemItem.if_grp" />
        <InfoGroup :inputNm="$t('system.desc')" :value="systemItem.desc" />
      </ul>
    </template>

    <template v-else v-slot:contents>
      <div class="text-center">
        <b-spinner
          v-show="isShowProgress"
          style="width: 2rem; height: 2rem; position: absolute; left: 50%"
          label="Large Spinner"
        ></b-spinner>
      </div>
    </template>

    <template v-if="!isShowProgress" v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="onClickEdit">{{ $t('common.modify') }}</button>
        <button class="lg-btn white-btn" @click="onClickDelete">{{ $t('common.delete') }}</button>
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
import { USER_STATE } from '@/store/UserState';

@Component({
  components: {
    ContentLayout,
    InfoGroup,
    IfFormlGroup,
  },
})
export default class SystemDetailPage extends Vue {
  // router push 로 전달받은 id 는 this.$route.params.id 로 사용하시면 됩니다.
  @Prop({ default: '' }) id!: string;

  systemModule = getModule(SystemModule, this.$store);
  systemItem: SystemResponse = {} as SystemResponse;
  isShowProgress = false;

  get system() {
    return this.systemModule.system;
  }

  get userState() {
    return this.systemModule.currAsyncState;
  }

  created() {
    this.systemModule.getSystemDetail(this.$route.params.id as string);
  }

  @Watch('system')
  onSystemChange() {
    this.systemItem = this.system;
  }

  @Watch('userState')
  onCurrAsyncStateChange(userState: USER_STATE) {
    console.log('userState : ', userState);
    if (userState === USER_STATE.LOADING) {
      this.isShowProgress = true;
    } else if (userState === USER_STATE.ERROR) {
      this.$modal.show('서버 통신 에러');
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

  onClickDelete() {
    this.$modal.show('삭제하시겠습니까?');
  }
}
</script>
