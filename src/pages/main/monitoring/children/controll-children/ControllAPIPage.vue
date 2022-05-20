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
            @val="(msg) => handleVal(msg)"
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
interface EachResponse {
  statPerd: number; // 통계 기준 시간
  svcId?: string; // 서비스 ID
  sysId?: string; // 시스템 ID
  apiId?: string; // API ID
  svcDesc?: string; // 서비스 설명
  apiDesc?: string; // API 설명
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
  apiList?: EachApi[]; // API 리스트
}
@Component({ components: { TimeGroup, ControlCard, ApiDetailModal, CardSort } })
export default class ControlPage extends Vue {
  public mornitoringControlModule = getModule(MornitoringControlModule, this.$store);

  searchData: ControllRequest = {
    statPerd: 0,
    sortBase: '',
  };

  showApiDetailModal = false;
  apiDetailData?: EachResponse;

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
  handleVal(msg: EachApi) {
    this.showApiDetailModal = true;
    this.apiDetailData = msg;
  }
}
</script>
<style lang=""></style>
