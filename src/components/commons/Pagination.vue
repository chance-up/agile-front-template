<template>
  <ul>
    <li class="page-btn" v-show="isShowFirstBtn == true">
      <a @click="onChangedPage(1)"><img src="@/assets/page_first.svg" alt="처음" /></a>
    </li>
    <li class="page-btn" v-show="isShowPrevBtn == true">
      <a @click="onChangedPage(pagingOption.currentPage - 1)"><img src="@/assets/page_before.svg" alt="이전" /></a>
    </li>
    <li v-for="(page, index) in pageList" :key="index" :class="page === pagingOption.currentPage ? 'active' : ''">
      <a @click="onChangedPage(page)">{{ page }}</a>
    </li>
    <li class="page-btn" v-show="isShowNextBtn == true">
      <a @click="onChangedPage(pagingOption.currentPage + 1)"><img src="@/assets/page_after.svg" alt="다음" /></a>
    </li>
    <li class="page-btn" v-show="isShowLastBtn == true">
      <a @click="onChangedPage(pagingOption.totalPage)"><img src="@/assets/page_last.svg" alt="마지막" /></a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { PaginationType } from '@/types/SystemType';

@Component
export default class Pagination extends Vue {
  @Prop() pagingOption!: PaginationType;

  get pageList(): number[] {
    const list = [];
    for (let p = this.startPage; p <= this.endPage; p++) {
      list.push(p);
    }
    return list;
  }

  get startPage(): number {
    return Math.floor(this.pagingOption.currentPage / this.pagingOption.limit) * this.pagingOption.limit + 1;
  }

  get endPage(): number {
    const lastPage =
      Math.floor(this.pagingOption.currentPage / this.pagingOption.limit) * this.pagingOption.limit +
      this.pagingOption.limit;
    return lastPage <= this.pagingOption.totalPage ? lastPage : this.pagingOption.totalPage;
  }

  get isShowFirstBtn(): boolean {
    // 총 페이지 수가 10개를 초과하고, 현재 페이지가 1이 아닌 경우에 true, 그 외에는 false
    const rule = this.pagingOption.totalPage > 10 && this.pagingOption.currentPage > 1;
    return rule;
  }

  get isShowPrevBtn(): boolean {
    // 현재 페이지가 1이면 false, 그 외에는 true
    const rule = this.pagingOption.currentPage > 1;
    return rule;
  }

  get isShowNextBtn(): boolean {
    // 현재 페이지가 마지막 페이지면 false, 그 외에는 true
    const rule = this.pagingOption.currentPage < this.pagingOption.totalPage;
    return rule;
  }

  get isShowLastBtn(): boolean {
    // 총 페이지 수가 10개를 초과하고, 현재 페이지가 마지막 페이지가 아닌 경우에 true, 그 외에는 false
    const rule = this.pagingOption.totalPage > 10 && this.pagingOption.currentPage < this.pagingOption.totalPage;
    return rule;
  }

  onChangedPage(page: number) {
    this.$emit('onChangedPage:page', page);
  }
}
</script>
