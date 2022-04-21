<template>
  <ContentLayout
    :title="$t('system.detail_top_title')"
    :subTitle="$t('system.detail_cont_title')"
    :depth="$t('system.detail_depth')"
  >
    <template v-slot:contents>
      <ul>
        <InfoGroup :inputNm="$t('system.name')" :value="systemItem.nm" />
        <InfoGroup :inputNm="$t('system.id')" :value="systemItem.id" />
        <InfoGroup :inputNm="$t('system.tkcgrNm')" :value="systemItem.tkcgrNm" />
        <InfoGroup :inputNm="$t('system.tkcgrPos')" :value="systemItem.tkcgrPos" />
        <InfoGroup :inputNm="$t('system.tkcgrEml')" :value="systemItem.tkcgrEml" />
        <InfoGroup :inputNm="$t('system.ifGrp')" :value="systemItem.ifGrp" />
        <InfoGroup :inputNm="$t('system.desc')" :value="systemItem.desc" />
      </ul>
    </template>

    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="onClickEvent('modify')">{{ $t('common.modify') }}</button>
        <button class="lg-btn white-btn" @click="onClickEvent('delete')">{{ $t('common.delete') }}</button>
        <button class="lg-btn gray-btn" @click="onClickEvent('previous')">{{ $t('common.list') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { DummySystemResponse } from '@/types/SystemType';
import SystemModule from '@/store/modules/SystemModule';

import ContentLayout from '@/components/layout/ContentLayout.vue';
import InfoGroup from '@/components/api/detail/InfoGroup.vue';

@Component({
  components: {
    ContentLayout,
    InfoGroup,
  },
})
export default class SystemDetailPage extends Vue {
  systemModule = getModule(SystemModule, this.$store);

  get systemItem(): DummySystemResponse {
    return this.systemModule.systemItem;
  }

  created() {
    this.systemModule.getSystemDetail(1);
  }

  onClickEvent(event: string) {
    if (event === 'previous') {
      this.$router.go(-1);
    } else {
      console.log(event, ' 로직');
    }
  }
}
</script>
