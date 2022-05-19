<template>
  <div>
    <TimeGroup @changeTime="handle" />
    <div class="monitor-comp">
      <!-- 정렬 -->
      <div class="tb-tit">
        <div class="search-cont">
          <label class="label">정렬기준</label>
          <select class="select-box">
            <option>건수</option>
            <option>에러율</option>
            <option>TPS</option>
            <option>응답시간</option>
          </select>
        </div>

        <p class="total">total : <span>8</span></p>
      </div>
      <!-- // 정렬 -->

      <!--- cardtype list --->
      <div class="card-wrap">
        <ul>
          <!-- <li v-for="(item, index) in serviceList" :key="index"> -->
          <ControlCard
            v-for="(item, index) in serviceList"
            :key="index"
            :item="item"
            @val="showApiDetailModal = true"
          ></ControlCard>
          <!-- <ControlCard v-for="(item, index) in serviceList" :key="index"></ControlCard> -->
        </ul>
      </div>
      <!--- // cardtype list --->
    </div>
    <ApiDetailModal v-if="showApiDetailModal" @close="closeModal" :apiDetailData="apiDetailData"></ApiDetailModal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TimeGroup from '@/components/monitoring/TimeGroup.vue';
import ControlCard from '@/components/monitoring/ControlCard.vue';
import ApiDetailModal from '@/components/commons/modal/ApiDetailModal.vue';

@Component({ components: { TimeGroup, ControlCard, ApiDetailModal } })
export default class ControlPage extends Vue {
  closeModal() {
    console.log('test', 'this is controllservicepage');
    this.showApiDetailModal = false;
  }
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
      nm: 'service_0001',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
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
      nm: 'service_0001',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
    {
      nm: 'service_0001',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
  ];

  handle(event: any) {
    console.log(event);
  }
}
</script>
<style lang=""></style>
