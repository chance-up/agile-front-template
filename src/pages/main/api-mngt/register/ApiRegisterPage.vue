<template lang="html">
  <ContentLayout title="API 등록" subTitle="기본정보 등록" depth="API 관리">
    <template v-slot:contents>
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <SelectForm groupNm="시스템명" :optionList="dummySystemList" />
        <TextDebounceForm
          groupNm="API ID"
          :check="apiIdCheck"
          type="text"
          :required="true"
          v-model="requestBody.id"
          @input="handleChangeApiId"
        />
        <TextForm groupNm="API 명" type="text" :required="true" />
        <TextForm groupNm="인터페이스 번호" type="text" :required="true" />

        <MethodForm groupNm="Method" />
        <UriForm groupNm="URI" />

        <SelectForm groupNm="시스템 연동 정보" :optionList="dummySystemInfList" />

        <HandlerGroupForm groupNm="요청 handler 그룹" />
        <HandlerGroupForm groupNm="응답 handler 그룹" />
        <TextForm groupNm="타임아웃(ms)" type="text" :required="true" />
        <TextForm groupNm="시스템 설명" type="textarea" />
      </ul>
    </template>

    <template v-slot:buttons>
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="$router.push({ path: '/api' })">등록</button>
        <button class="lg-btn white-btn" @click="$router.go(-1)">취소</button>
        <button>{{ requestBody.id }}</button>
      </div>
    </template>
  </ContentLayout>
</template>

<script lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue';
import { Component, Vue } from 'vue-property-decorator';
import { dummySystemList, dummySystemInfList, ApiCreateRequestBody } from '@/types/ApiType';
import HandlerGroupForm from '@/components/api-mngt/register/HandlerGroupForm.vue';
import SelectForm from '@/components/api-mngt/register/SelectForm.vue';
import TextForm from '@/components/api-mngt/register/TextForm.vue';
import MethodForm from '@/components/api-mngt/register/MethodForm.vue';
import UriForm from '@/components/api-mngt/register/UriForm.vue';
import TextDebounceForm from '@/components/api-mngt/register/TextDebounceForm.vue';
import { apiValidationCheck } from '@/store/modules/ApiModule';
import { Dictionary } from 'vue-router/types/router';
@Component({
  components: {
    ContentLayout,
    HandlerGroupForm,
    SelectForm,
    TextForm,
    TextDebounceForm,
    MethodForm,
    UriForm,
  },
})
export default class ApiRegisterPage extends Vue {
  get dummySystemList(): string[] {
    return dummySystemList;
  }
  get dummySystemInfList(): string[] {
    return dummySystemInfList;
  }
  get params(): Dictionary<string> | null {
    console.log(this.$route.params);
    return this.$route.params;
  }

  apiIdCheck: boolean | null = null;
  async handleChangeApiId() {
    const { id } = this.requestBody;
    this.apiIdCheck = await apiValidationCheck(id);
  }

  requestBody: ApiCreateRequestBody = {
    sysId: '',
    sysNm: '',
    id: '',
    nm: '',
    ifNo: '',
    meth: '',
    uriIn: '',
    uriOut: '',
    ifGrp: '',
    reqHandlrGrpId: '',
    resHandlrGrpId: '',
    timeOut: 0,
    desc: '',
  };
}
</script>
