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
        <InfoGroup :inputNm="$t('system.tkcgrNm')" :value="systemItem.tkcgr_nm" />
        <InfoGroup :inputNm="$t('system.tkcgrPos')" :value="systemItem.tkcgr_pos" />
        <InfoGroup :inputNm="$t('system.tkcgrEml')" :value="systemItem.tkcgr_eml" />
        <InfoGroup :inputNm="$t('system.ifGrp')" :value="systemItem.if_grp" />
        <InfoGroup :inputNm="$t('system.desc')" :value="systemItem.desc" />
      </ul>
    </template>

    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="onClickEdit">{{ $t('common.modify') }}</button>
        <button class="lg-btn white-btn" @click="onClickDelete">{{ $t('common.delete') }}</button>
        <button class="lg-btn gray-btn" @click="onClickPrevious">{{ $t('common.list') }}</button>
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
import InfoGroup from '@/components/api/detail/InfoGroup.vue';

@Component({
  components: {
    ContentLayout,
    InfoGroup,
  },
})
export default class SystemDetailPage extends Vue {
  // router push 로 전달받은 id 는 this.$route.params.id 로 사용하시면 됩니다.
  @Prop({ default: '' }) id!: string;

  systemModule = getModule(SystemModule, this.$store);
  systemItem: SystemResponse = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    if_grp: '',
    desc: '',
    created_at: '',
    created_by: '',
    updated_at: '',
    updated_by: '',
  };

  created() {
    this.systemModule.getSystemDetail(this.$route.query.id as string).then((res) => {
      this.systemItem = res.data.value;
    });
  }

  onClickPrevious() {
    this.$router.go(-1);
  }

  onClickEdit() {
    this.$router.push({ name: 'system_edit', query: { id: this.$route.query.id } });
  }

  onClickDelete() {
    alert('삭제하시겠습니까?');
  }
}
</script>
