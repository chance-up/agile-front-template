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
            <li>
              <span @click="handleOnClickGroup">API & Login Authentication Group</span>
              <p class="multi-btn" @click="handleOnClickGroupDetail"></p>
            </li>
            <li>
              <span>API & Login Authentication 2</span>
              <p class="multi-btn"></p>
            </li>
            <li>
              <span>API & Login Authentication 3</span>
              <p class="multi-btn"></p>
            </li>
            <li>
              <span>API & Login Authentication 4</span>
              <p class="multi-btn"></p>
            </li>
          </ul>
        </div>
      </div>
      <!--  // multi select -->
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { dummySystemList, dummySystemInfList } from '@/types/ApiType';

@Component
export default class HandlerGroupForm extends Vue {
  @Prop() groupNm!: string | null;
  get dummySystemList(): string[] {
    return dummySystemList;
  }
  get dummySystemInfList(): string[] {
    return dummySystemInfList;
  }

  //  multi select
  isSelectOpen = false;
  handleOnClickGroup(): void {
    this.isSelectOpen = !this.isSelectOpen;
  }
  handleOnClickGroupDetail(): void {
    console.log('modal open');
  }
}
</script>
