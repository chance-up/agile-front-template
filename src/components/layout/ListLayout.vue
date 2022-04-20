<template>
  <article class="contents-wrap">
    <div class="tit-wrap">
      <h1 class="h1-tit">{{ title }}</h1>
    </div>
    <slot name="search-form" />
    <slot name="list-form" />
    <!-- <SearchForm />
    <ListForm :option="option">
      <template slot="colGroup">
        <colgroup>
          <col width="10%" />
          <col width="15%" />
          <col width="*" />
          <col width="10%" />
          <col width="15%" />
          <col width="10%" />
        </colgroup>
      </template>
      <template slot="thead">
        <thead>
          <tr>
            <th>No.</th>
            <th>시스템명</th>
            <th>시스템ID</th>
            <th>담당자</th>
            <th>Update</th>
            <th>Action</th>
          </tr>
        </thead>
      </template>
    </ListForm> -->
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListLayout extends Vue {
  @Prop() title!: string;
}
</script>
