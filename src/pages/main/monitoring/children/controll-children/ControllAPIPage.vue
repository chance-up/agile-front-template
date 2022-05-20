<template>
  <div>
    <TimeGroup @changeTime="handleTime" />
    <div class="monitor-comp">
      <CardSort :cnt="apiList.length" @changeSort="handleSort" />
      <div class="card-wrap">
        <ul>
          <ControlCard
            v-for="(item, index) in apiList"
            :key="index"
            :item="item"
            @val="showApiDetailModal = true"
          ></ControlCard>
        </ul>
      </div>
    </div>
    <ApiDetailModal v-if="showApiDetailModal" @close="closeModal" :apiDetailData="apiDetailData"></ApiDetailModal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import TimeGroup from '@/components/monitoring/TimeGroup.vue';
import ControlCard from '@/components/monitoring/ControlCard.vue';
import ApiDetailModal from '@/components/commons/modal/ApiDetailModal.vue';
import CardSort from '@/components/monitoring/CardSort.vue';

interface ControllRequest {
  statPerd: number;
  sortBase: string;
  retvCnt?: number;
}

interface EachApi {
  statPerd: number; // 통계 기준 시간
  sysId: string; // 시스템 ID
  apiId: string; // Api ID
  apiDesc: string; // Api 설명
  totCnt: number; // 전체 서비스 건수
  sucesCnt: number; // 성공 건수
  failCnt: number; // 실패 건수
  sucesRate: number; // 성공율
  failRate: number; // 실패율
  crCnt: number; // Critical 건수
  maCnt: number; // Major 건수
  miCnt: number; // Minor 건수
  tps: number; // TPS
  avgResTm: number; // 평균 응답시간
}

@Component({ components: { TimeGroup, ControlCard, ApiDetailModal, CardSort } })
export default class ControlPage extends Vue {
  searchData: ControllRequest = {
    statPerd: 0,
    sortBase: '',
  };

  showApiDetailModal = false;
  apiDetailData: any = {
    id: 'api_deviceinfo',
    total: 208,
    success: 200,
    fail: 5,
  };

  apiList: EachApi[] = [
    {
      statPerd: 1440,
      sysId: 'service_0001',
      apiId: 'api_0001',
      apiDesc: 'api_0001에 대한 설명입니다.',
      totCnt: 5,
      sucesCnt: 200,
      failCnt: 8,
      sucesRate: 90,
      failRate: 10,
      crCnt: 2,
      maCnt: 5,
      miCnt: 1,
      tps: 0.894,
      avgResTm: 80000,
    },
    {
      statPerd: 1440,
      sysId: 'service_0001',
      apiId: 'api_0002',
      apiDesc: 'api_0002에 대한 설명입니다.',
      totCnt: 5,
      sucesCnt: 200,
      failCnt: 8,
      sucesRate: 90,
      failRate: 10,
      crCnt: 2,
      maCnt: 5,
      miCnt: 1,
      tps: 0.894,
      avgResTm: 80000,
    },
    {
      statPerd: 1440,
      sysId: 'service_0002',
      apiId: 'api_0003',
      apiDesc: 'api_0003에 대한 설명입니다.',
      totCnt: 5,
      sucesCnt: 200,
      failCnt: 8,
      sucesRate: 90,
      failRate: 10,
      crCnt: 2,
      maCnt: 5,
      miCnt: 1,
      tps: 0.894,
      avgResTm: 80000,
    },
    {
      statPerd: 1440,
      sysId: 'service_0002',
      apiId: 'api_0004',
      apiDesc: 'api_0004에 대한 설명입니다.',
      totCnt: 5,
      sucesCnt: 200,
      failCnt: 8,
      sucesRate: 90,
      failRate: 10,
      crCnt: 2,
      maCnt: 5,
      miCnt: 1,
      tps: 0.894,
      avgResTm: 80000,
    },
    {
      statPerd: 1440,
      sysId: 'service_0002',
      apiId: 'api_0005',
      apiDesc: 'api_0005에 대한 설명입니다.',
      totCnt: 5,
      sucesCnt: 200,
      failCnt: 8,
      sucesRate: 90,
      failRate: 10,
      crCnt: 2,
      maCnt: 5,
      miCnt: 1,
      tps: 0.894,
      avgResTm: 80000,
    },
    {
      statPerd: 1440,
      sysId: 'service_0003',
      apiId: 'api_0006',
      apiDesc: 'api_0006에 대한 설명입니다.',
      totCnt: 5,
      sucesCnt: 200,
      failCnt: 8,
      sucesRate: 90,
      failRate: 10,
      crCnt: 2,
      maCnt: 5,
      miCnt: 1,
      tps: 0.894,
      avgResTm: 80000,
    },
    {
      statPerd: 1440,
      sysId: 'service_0003',
      apiId: 'api_0007',
      apiDesc: 'api_0007에 대한 설명입니다.',
      totCnt: 5,
      sucesCnt: 200,
      failCnt: 8,
      sucesRate: 90,
      failRate: 10,
      crCnt: 2,
      maCnt: 5,
      miCnt: 1,
      tps: 0.894,
      avgResTm: 80000,
    },
    {
      statPerd: 1440,
      sysId: 'service_0004',
      apiId: 'api_0008',
      apiDesc: 'api_0008에 대한 설명입니다.',
      totCnt: 5,
      sucesCnt: 200,
      failCnt: 8,
      sucesRate: 90,
      failRate: 10,
      crCnt: 2,
      maCnt: 5,
      miCnt: 1,
      tps: 0.894,
      avgResTm: 80000,
    },
    {
      statPerd: 1440,
      sysId: 'service_0004',
      apiId: 'api_0009',
      apiDesc: 'api_0009에 대한 설명입니다.',
      totCnt: 5,
      sucesCnt: 200,
      failCnt: 8,
      sucesRate: 90,
      failRate: 10,
      crCnt: 2,
      maCnt: 5,
      miCnt: 1,
      tps: 0.894,
      avgResTm: 80000,
    },
  ];

  @Watch('searchData', { deep: true })
  onSearchDataChange(val: ControllRequest) {
    //api 통신 로직 추가
  }

  handleTime(event: any) {
    this.searchData.statPerd = event;
  }

  handleSort(event: any) {
    this.searchData.sortBase = event;
  }

  closeModal() {
    console.log('test', 'this is controllservicepage');
    this.showApiDetailModal = false;
  }
}
</script>
<style lang=""></style>
