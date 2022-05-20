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

import { getModule } from 'vuex-module-decorators';
import MornitoringControlModule from '@/store/modules/MornitoringControlModule';
import { EachService, EachApi } from '@/types/MornitoringControllType';

interface ControllRequest {
  statPerd: number;
  sortBase: string;
  retvCnt?: number;
}

@Component({ components: { TimeGroup, ControlCard, ApiDetailModal, CardSort } })
export default class ControlPage extends Vue {
  public mornitoringControlModule = getModule(MornitoringControlModule, this.$store);

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

  // apiList: EachApi[] = [
  //   {
  //     statPerd: 1440,
  //     sysId: 'system_0001',
  //     apiId: 'api_0001',
  //     apiDesc: 'api_0001에 대한 설명입니다.',
  //     totCnt: 5,
  //     sucesCnt: 200,
  //     failCnt: 8,
  //     sucesRate: 90,
  //     failRate: 10,
  //     crCnt: 2,
  //     maCnt: 5,
  //     miCnt: 1,
  //     tps: 0.894,
  //     avgResTm: 80000,
  //   },
  //   {
  //     statPerd: 1440,
  //     sysId: 'system_0001',
  //     apiId: 'api_0002',
  //     apiDesc: 'api_0002에 대한 설명입니다.',
  //     totCnt: 5,
  //     sucesCnt: 200,
  //     failCnt: 8,
  //     sucesRate: 90,
  //     failRate: 10,
  //     crCnt: 2,
  //     maCnt: 5,
  //     miCnt: 1,
  //     tps: 0.894,
  //     avgResTm: 80000,
  //   },
  //   {
  //     statPerd: 1440,
  //     sysId: 'system_0002',
  //     apiId: 'api_0003',
  //     apiDesc: 'api_0003에 대한 설명입니다.',
  //     totCnt: 5,
  //     sucesCnt: 200,
  //     failCnt: 8,
  //     sucesRate: 90,
  //     failRate: 10,
  //     crCnt: 2,
  //     maCnt: 5,
  //     miCnt: 1,
  //     tps: 0.894,
  //     avgResTm: 80000,
  //   },
  //   {
  //     statPerd: 1440,
  //     sysId: 'system_0002',
  //     apiId: 'api_0004',
  //     apiDesc: 'api_0004에 대한 설명입니다.',
  //     totCnt: 5,
  //     sucesCnt: 200,
  //     failCnt: 8,
  //     sucesRate: 90,
  //     failRate: 10,
  //     crCnt: 2,
  //     maCnt: 5,
  //     miCnt: 1,
  //     tps: 0.894,
  //     avgResTm: 80000,
  //   },
  //   {
  //     statPerd: 1440,
  //     sysId: 'system_0002',
  //     apiId: 'api_0005',
  //     apiDesc: 'api_0005에 대한 설명입니다.',
  //     totCnt: 5,
  //     sucesCnt: 200,
  //     failCnt: 8,
  //     sucesRate: 90,
  //     failRate: 10,
  //     crCnt: 2,
  //     maCnt: 5,
  //     miCnt: 1,
  //     tps: 0.894,
  //     avgResTm: 80000,
  //   },
  //   {
  //     statPerd: 1440,
  //     sysId: 'system_0003',
  //     apiId: 'api_0006',
  //     apiDesc: 'api_0006에 대한 설명입니다.',
  //     totCnt: 5,
  //     sucesCnt: 200,
  //     failCnt: 8,
  //     sucesRate: 90,
  //     failRate: 10,
  //     crCnt: 2,
  //     maCnt: 5,
  //     miCnt: 1,
  //     tps: 0.894,
  //     avgResTm: 80000,
  //   },
  //   {
  //     statPerd: 1440,
  //     sysId: 'system_0003',
  //     apiId: 'api_0007',
  //     apiDesc: 'api_0007에 대한 설명입니다.',
  //     totCnt: 5,
  //     sucesCnt: 200,
  //     failCnt: 8,
  //     sucesRate: 90,
  //     failRate: 10,
  //     crCnt: 2,
  //     maCnt: 5,
  //     miCnt: 1,
  //     tps: 0.894,
  //     avgResTm: 80000,
  //   },
  //   {
  //     statPerd: 1440,
  //     sysId: 'system_0004',
  //     apiId: 'api_0008',
  //     apiDesc: 'api_0008에 대한 설명입니다.',
  //     totCnt: 5,
  //     sucesCnt: 200,
  //     failCnt: 8,
  //     sucesRate: 90,
  //     failRate: 10,
  //     crCnt: 2,
  //     maCnt: 5,
  //     miCnt: 1,
  //     tps: 0.894,
  //     avgResTm: 80000,
  //   },
  //   {
  //     statPerd: 1440,
  //     sysId: 'system_0004',
  //     apiId: 'api_0009',
  //     apiDesc: 'api_0009에 대한 설명입니다.',
  //     totCnt: 5,
  //     sucesCnt: 200,
  //     failCnt: 8,
  //     sucesRate: 90,
  //     failRate: 10,
  //     crCnt: 2,
  //     maCnt: 5,
  //     miCnt: 1,
  //     tps: 0.894,
  //     avgResTm: 80000,
  //   },
  // ];

  @Watch('searchData', { deep: true })
  onSearchDataChange(val: ControllRequest) {
    //api 통신 로직 추가
    this.mornitoringControlModule.getServiceList(this.searchData.statPerd);
  }

  handleTime(event: any) {
    this.searchData.statPerd = event;
  }

  handleSort(event: any) {
    this.searchData.sortBase = event;
  }

  get apiList() {
    return this.mornitoringControlModule.apiList;
  }
  created() {
    // this.mornitoringControlModule.getServiceList(1440);
    console.log('monitoringControl created');
    console.log(this.mornitoringControlModule.apiList);
  }
  closeModal() {
    console.log('test', 'this is controllservicepage');
    this.showApiDetailModal = false;
  }
}
</script>
<style lang=""></style>
