<template lang="">
  <li>
    <label class="label point">{{ groupNm }}</label>
    <div class="form-cont">
      <!--  multi select -->
      <div class="multi-wrap">
        <div class="select-row" @click="handleOnClickGroup">handler 그룹을 선택해주세요</div>
        <!--  dropdown시 active class 추가-->
        <div class="select-form" :class="{ none: !isSelectOpen }">
          <!--  dropdown시 block class 추가-->
          <ul>
            <EachHandler
              :handlerGroupId="dummyHandlerGroupId"
              v-for="(dummyHandlerGroupId, index) in dummyHandlerGroupIdList"
              :key="index"
              @click="handleSelectHandlerGroup"
            />
          </ul>
        </div>
      </div>
      <!--  // multi select -->
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { dummySystemList, dummySystemInfList, HandlerGroupDetail } from '@/types/ApiType';
import EachHandler from '@/components/api-mngt/register/EachHandler.vue';

import { dummyHandlerGroupIdList } from '@/types/ApiType';

@Component({
  components: {
    EachHandler,
  },
})
export default class HandlerGroupForm extends Vue {
  @Prop() groupNm!: string | null;
  @Prop({ default: () => [] }) handlerGroupList!: HandlerGroupDetail[];

  get dummyHandlerGroupIdList(): string[] {
    return dummyHandlerGroupIdList;
  }

  //  multi select
  isSelectOpen = false;
  handleOnClickGroup(): void {
    this.isSelectOpen = !this.isSelectOpen;
  }
  handleOnClickGroupDetail(): void {
    console.log('modal open');
  }
  handleSelectHandlerGroup(handlerGroupId: string): void {
    console.log('handlerGroupId => ' + handlerGroupId);
    this.$emit('input', handlerGroupId);
    this.isSelectOpen = false;
  }
}
</script>
