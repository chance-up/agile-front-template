<template>
  <div class="page-wrap" v-if="!isListEmpty">
    <ul>
      <li class="page-btn" v-show="isShowFirstBtn == true">
        <a @click="onChangedPage(1)"><img src="@/assets/page_first.svg" alt="처음" /></a>
      </li>
      <li class="page-btn" v-show="isShowPrevBtn == true">
        <a @click="onChangedPage(pagingOption.currentPage - 1)"><img src="@/assets/page_before.svg" alt="이전" /></a>
      </li>
      <li v-for="(page, index) in pageList" :key="index" :class="page === pagingOption.currentPage ? 'active' : ''">
        <a @click="onChangedPage(page)">{{ page + 1 }}</a>
      </li>
      <li class="page-btn" v-show="isShowNextBtn == true">
        <a @click="onChangedPage(pagingOption.currentPage + 1)"><img src="@/assets/page_after.svg" alt="다음" /></a>
      </li>
      <li class="page-btn" v-show="isShowLastBtn == true">
        <a @click="onChangedPage(pagingOption.totalPage)"><img src="@/assets/page_last.svg" alt="마지막" /></a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Pagination } from '@/types/GateWayResponse';

@Component
export default class Paging extends Vue {
  @Prop() pagingOption!: Pagination;
  @Prop() isListEmpty!: boolean;

  get pageList(): number[] {
    const list = [];
    const currQuot = Math.floor(this.pagingOption.currentPage / this.pagingOption.size); //현재 선택한 페이지의 범위

    for (let p = currQuot * this.pagingOption.size; p < this.endPage; p++) {
      list.push(p);
    }

    return list;
  }

  get endPage(): number {
    const lastPage =
      Math.floor(this.pagingOption.currentPage / this.pagingOption.size) * this.pagingOption.size +
      this.pagingOption.size;
    return lastPage > this.pagingOption.totalPage ? this.pagingOption.totalPage : lastPage;
  }

  get isShowFirstBtn(): boolean {
    // 총 페이지 수가 10개를 초과하고, 현재 페이지가 가장 첫 번째 범위(1 ~ 10)에 속하지 않은 경우에 true, 그 외에는 false
    const rule =
      this.pagingOption.totalPage > 10 &&
      Math.floor(this.pagingOption.currentPage / this.pagingOption.size) * this.pagingOption.size != 0;
    return rule;
  }

  get isShowPrevBtn(): boolean {
    // 현재 페이지가 1이면 false, 그 외에는 true
    const rule = this.pagingOption.currentPage === 0;
    return !rule;
  }

  get isShowNextBtn(): boolean {
    // 현재 페이지가 마지막 페이지면 false, 그 외에는 true
    const rule = this.pagingOption.currentPage == this.pagingOption.totalPage - 1;
    return !rule;
  }

  get isShowLastBtn(): boolean {
    // 총 페이지 수가 10개를 초과하고, 현재 페이지가 마지막 페이지 범위에 속하지 않는 않는 경우에 true, 그 외에는 false
    const rule =
      this.pagingOption.totalPage > 10 &&
      Math.floor(this.pagingOption.currentPage / this.pagingOption.size) * this.pagingOption.size !=
        Math.floor(this.pagingOption.totalPage / 10) * 10;
    return rule;
  }

  onChangedPage(page: number) {
    this.$emit('onChangedPage:page', page);
  }
}
</script>
