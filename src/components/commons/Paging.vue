<template>
  <ul>
    <li class="page-btn" v-show="isShowFirstBtn == true">
      <a @click="onChangedPage(1)"><img src="@/assets/page_first.svg" alt="처음" /></a>
    </li>
    <li class="page-btn" v-show="isShowPrevBtn == true">
      <a @click="onChangedPage(pagingOption.current_page - 1)"><img src="@/assets/page_before.svg" alt="이전" /></a>
    </li>
    <li v-for="(page, index) in pageList" :key="index" :class="page === pagingOption.current_page ? 'active' : ''">
      <a @click="onChangedPage(page)">{{ page }}</a>
    </li>
    <li class="page-btn" v-show="isShowNextBtn == true">
      <a @click="onChangedPage(pagingOption.current_page + 1)"><img src="@/assets/page_after.svg" alt="다음" /></a>
    </li>
    <li class="page-btn" v-show="isShowLastBtn == true">
      <a @click="onChangedPage(pagingOption.total_pages)"><img src="@/assets/page_last.svg" alt="마지막" /></a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Pagination } from '@/types/GateWayResponse';

@Component
export default class Paging extends Vue {
  @Prop() pagingOption!: Pagination;

  get pageList(): number[] {
    const list = [];
    for (let p = this.startPage; p <= this.endPage; p++) {
      list.push(p);
    }
    return list;
  }

  get startPage(): number {
    return Math.floor(this.pagingOption.current_page / this.pagingOption.limit) * this.pagingOption.limit + 1;
  }

  get endPage(): number {
    const lastPage =
      Math.floor(this.pagingOption.current_page / this.pagingOption.limit) * this.pagingOption.limit +
      this.pagingOption.limit;
    return lastPage <= this.pagingOption.total_pages ? lastPage : this.pagingOption.total_pages;
  }

  get isShowFirstBtn(): boolean {
    // 총 페이지 수가 10개를 초과하고, 현재 페이지가 1이 아닌 경우에 true, 그 외에는 false
    const rule = this.pagingOption.total_pages > 10 && this.pagingOption.current_page > 1;
    return rule;
  }

  get isShowPrevBtn(): boolean {
    // 현재 페이지가 1이면 false, 그 외에는 true
    const rule = this.pagingOption.current_page > 1;
    return rule;
  }

  get isShowNextBtn(): boolean {
    // 현재 페이지가 마지막 페이지면 false, 그 외에는 true
    const rule = this.pagingOption.current_page < this.pagingOption.total_pages;
    return rule;
  }

  get isShowLastBtn(): boolean {
    // 총 페이지 수가 10개를 초과하고, 현재 페이지가 마지막 페이지가 아닌 경우에 true, 그 외에는 false
    const rule = this.pagingOption.total_pages > 10 && this.pagingOption.current_page < this.pagingOption.total_pages;
    return rule;
  }

  onChangedPage(page: number) {
    this.$emit('onChangedPage:page', page);
  }
}
</script>
