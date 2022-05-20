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

interface ControllRequest {
  statPerd: number;
  sortBase: string;
  retvCnt?: number;
}

@Component({ components: { TimeGroup, ControlCard, ApiDetailModal, CardSort } })
export default class ControlPage extends Vue {
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

  serviceList: any[] = [
    {
      nm: 'service_0001',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
    {
      nm: 'service_0002',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
    {
      nm: 'service_0003',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
    {
      nm: 'service_0004',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
    {
      nm: 'service_0005',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
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
