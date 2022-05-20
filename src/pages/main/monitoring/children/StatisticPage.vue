<template>
  <!------- contents area -------->
  <article class="contents-wrap">
    <div class="tit-wrap">
      <h1 class="h1-tit">통계</h1>
    </div>

    <!------- 검색 -------->
    <SelectSearch />
    <!------- // 검색 -------->

    <div class="service-list">
      <!-- service list -->
      <ul>
        <ServiceRow v-for="(i, index) in [1, 2, 3, 4]" :key="index" />
      </ul>
    </div>
    <!-- // service list -->

    <!--- // comp --->
  </article>
  <!------- // contents area -------->
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import ServiceRow from '@/components/monitoring/ServiceRow.vue';
import SelectSearch from '@/components/monitoring/SelectSearch.vue';
@Component({ components: { ServiceRow, SelectSearch } })
export default class ControlPage extends Vue {}
</script>
<style lang=""></style>
