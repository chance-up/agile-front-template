<template>
  <div>
    <TimeGroup @changeTime="handleTime" />
    <div class="monitor-comp">
      <CardSort :cnt="serviceList.length" @changeSort="handleSort" />
      <div class="card-wrap">
        <ul>
          <ControlCard
            v-for="(item, index) in serviceList"
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

@Component({
  components: {
    TimeGroup,
    ControlCard,
    ApiDetailModal,
    CardSort,
  },
})
export default class ControlPage extends Vue {
  public mornitoringControlModule = getModule(MornitoringControlModule, this.$store);
  searchData: ControllRequest = {
    statPerd: 0,
    sortBase: '',
  };

  showApiDetailModal = false;
  apiDetailData: any = {
    id: 'service_deviceinfo',
    total: 208,
    success: 200,
    fail: 5,
  };

  // serviceList: EachService[] = [
  //   {
  //     statPerd: 1440,
  //     svcId: 'service_0001',
  //     svcDesc: 'service_0001에 대한 설명입니다.',
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
  //     apiList: [],
  //   },
  //   {
  //     statPerd: 1440,
  //     svcId: 'service_0002',
  //     svcDesc: 'service_0002에 대한 설명입니다.',
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
  //     apiList: [],
  //   },
  //   {
  //     statPerd: 1440, // 통계 기준 시간
  //     svcId: 'service_0003', // 서비스 ID
  //     svcDesc: 'service_0003에 대한 설명입니다.', // 서비스 설명
  //     totCnt: 5, // 전체 서비스 건수
  //     sucesCnt: 200, // 성공 건수
  //     failCnt: 8, // 실패 건수
  //     sucesRate: 90, // 성공율
  //     failRate: 10, // 실패율
  //     crCnt: 2, // Critical 건수
  //     maCnt: 5, // Major 건수
  //     miCnt: 1, // Minor 건수
  //     tps: 0.894, // TPS
  //     avgResTm: 80000, // 평균 응답시간
  //     apiList: [], // API 리스트
  //   },
  //   {
  //     statPerd: 1440, // 통계 기준 시간
  //     svcId: 'service_0004', // 서비스 ID
  //     svcDesc: 'service_0004에 대한 설명입니다.', // 서비스 설명
  //     totCnt: 5, // 전체 서비스 건수
  //     sucesCnt: 200, // 성공 건수
  //     failCnt: 8, // 실패 건수
  //     sucesRate: 90, // 성공율
  //     failRate: 10, // 실패율
  //     crCnt: 2, // Critical 건수
  //     maCnt: 5, // Major 건수
  //     miCnt: 1, // Minor 건수
  //     tps: 0.894, // TPS
  //     avgResTm: 80000, // 평균 응답시간
  //     apiList: [], // API 리스트
  //   },
  //   {
  //     statPerd: 1440, // 통계 기준 시간
  //     svcId: 'service_0005', // 서비스 ID
  //     svcDesc: 'service_0005에 대한 설명입니다.', // 서비스 설명
  //     totCnt: 5, // 전체 서비스 건수
  //     sucesCnt: 200, // 성공 건수
  //     failCnt: 8, // 실패 건수
  //     sucesRate: 90, // 성공율
  //     failRate: 10, // 실패율
  //     crCnt: 2, // Critical 건수
  //     maCnt: 5, // Major 건수
  //     miCnt: 1, // Minor 건수
  //     tps: 0.894, // TPS
  //     avgResTm: 80000, // 평균 응답시간
  //     apiList: [], // API 리스트
  //   },
  // ];

  @Watch('searchData', { deep: true })
  onSearchDataChange(val: ControllRequest) {
    console.log('searchData changed', val);
    //api 통신 로직 추가
    this.mornitoringControlModule.getServiceList(this.searchData.statPerd);
  }

  handleTime(event: any) {
    this.searchData.statPerd = event;
    // this.time = event;
    // console.log(this.time);
  }

  handleSort(event: any) {
    this.searchData.sortBase = event;
  }

  // time = 1440;
  get serviceList() {
    return this.mornitoringControlModule.serviceList;
  }
  created() {
    // this.mornitoringControlModule.getServiceList(1440);
    console.log('monitoringControl created');
    console.log(this.mornitoringControlModule.serviceList);
  }

  closeModal() {
    console.log('test', 'this is controllservicepage');
    this.showApiDetailModal = false;
  }
}
</script>
<style lang=""></style>
