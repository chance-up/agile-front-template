<template>
  <!------- 검색 -------->
  <div class="search-wrap">
    <h2 class="h2-tit">검색</h2>
    <div class="search-cont">
      <label class="label" for="sysName">시스템명</label>
      <input type="text" id="sysName" class="input-box" placeholder="입력해주세요." />
    </div>
    <div class="search-cont">
      <label class="label" for="">시스템ID</label>
      <input type="text" id="" class="input-box" placeholder="입력해주세요." />
    </div>
    <div class="search-cont">
      <label class="label" for="">담당자명</label>
      <input type="text" id="" class="input-box" placeholder="입력해주세요." />
    </div>

    <button class="mid-btn">
      <i><img src="@/assets/search_ico.svg" alt="검색" /></i>Search
    </button>
  </div>
  <!------- // 검색 -------->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SystemManagement extends Vue {}
</script>
