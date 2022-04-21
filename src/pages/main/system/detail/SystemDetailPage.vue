<template>
  <ContentLayout title="시스템 정보 확인" subTitle="기본정보 확인" depth="시스템 정보 관리">
    <template v-slot:contents>
      <ul>
        <InfoGroup inputNm="시스템명" :value="dummyData.sysNm" />
        <InfoGroup inputNm="시스템 ID" :value="dummyData.sysId" />
        <InfoGroup inputNm="담당자 이름" :value="dummyData.mgrNm" />
        <InfoGroup inputNm="소속" :value="dummyData.belong" />
        <InfoGroup inputNm="이메일" :value="dummyData.eMail" />
        <InfoGroup inputNm="연동방식" :value="dummyData.linkType" />
        <InfoGroup inputNm="시스템 설명" :value="dummyData.sysDescription" />
      </ul>
    </template>

    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="onClickEvent('modify')">수정</button>
        <button class="lg-btn white-btn" @click="onClickEvent('delete')">삭제</button>
        <button class="lg-btn gray-btn" @click="onClickEvent('previous')">목록</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import InfoGroup from '@/components/api/detail/InfoGroup.vue';
import { DummySystemResponse, dummyData } from '@/types/SystemType';

@Component({
  components: {
    ContentLayout,
    InfoGroup,
  },
})
export default class SystemDetailPage extends Vue {
  get dummyData(): DummySystemResponse {
    return dummyData;
  }

  onClickEvent(event: string) {
    if (event === 'previous') {
      this.$router.push({ name: 'system_list' });
    } else {
      console.log(event, ' 로직');
    }
  }
}
</script>
