<template>
  <ContentLayout
    :title="$t('system.modify_top_title')"
    :subTitle="$t('system.modify_cont_title')"
    :depth="$t('system.modify_depth')"
  >
    <template v-slot:contents>
      <ul>
        <InputGroup
          :inputNm="$t('system.name')"
          v-model="systemItem.nm"
          :place="$t('system.name')"
          inputClass="input-box lg"
          :disabled="true"
        />
        <InputGroup
          :inputNm="$t('system.id')"
          v-model="systemItem.id"
          :place="$t('system.id')"
          inputClass="input-box lg"
          :disabled="true"
        />
        <InputGroup
          :inputNm="$t('system.tkcgrNm')"
          v-model="systemItem.tkcgr_nm"
          :place="$t('system.tkcgrNm')"
          inputClass="input-box lg check-false"
        />
        <!-- validCheck="중복된 API ID 입니다." -->
        <InputGroup
          :inputNm="$t('system.tkcgrPos')"
          v-model="systemItem.tkcgr_nm"
          :place="$t('system.tkcgrPos')"
          inputClass="input-box lg check-ok"
        />
        <InputGroup
          :inputNm="$t('system.tkcgrEml')"
          v-model="systemItem.tkcgr_eml"
          :place="$t('system.tkcgrEml')"
          inputClass="input-box lg check-ok"
        />
        <InterfaceGroup :inputNm="$t('system.ifGrp')" :linkType="systemItem.if_grp" />
        <TextAreaGroup :inputNm="$t('system.desc')" />
      </ul>
    </template>
    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="onSubmit">{{ $t('common.modify') }}</button>
        <button class="lg-btn white-btn" @click="cancelOnClickEvent">{{ $t('common.cancel') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import SystemModule from '@/store/modules/SystemModule';
import { SystemResponse } from '@/types/SystemType';

import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/system/InputGroup.vue';
import InterfaceGroup from '@/components/system/InterfaceGroup.vue';
import TextAreaGroup from '@/components/system/TextAreaGroup.vue';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    InterfaceGroup,
    TextAreaGroup,
  },
})
export default class SystemEditPage extends Vue {
  systemModule = getModule(SystemModule, this.$store);
  systemItem: SystemResponse = {} as SystemResponse;

  created() {
    this.systemModule.getSystemDetail(this.$route.params.id as string).then((res) => {
      console.log('edit page : ' + res.data.value);
      // this.systemItem = res;
    });
  }

  onSubmit(): void {
    if (confirm('서비스를 수정하시겠습니까?') == true) {
      console.log(this.systemItem);
    } else {
      return;
    }
  }

  cancelOnClickEvent() {
    this.$router.go(-1);
  }
}
</script>
<style lang=""></style>
