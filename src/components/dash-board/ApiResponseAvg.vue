<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">API 평균 응답시간 및 TPS</h3>
    <div
      class="chart-group tps-group"
      :class="{
        'avg-collapse-modal': modal == false,
        'avg-expand-modal': modal == true,
      }"
      ref="tpsGroup"
    >
      <div
        class="tps-chart"
        :class="{
          'dash-modal-detail-collapse': modal == true,
          'dash-modal-detail-expand': modal == false,
        }"
        @click="toggleModal(1)"
        v-show="modal === false"
      >
        <i><img src="@/assets/req_ico.svg" alt="평균 응답시간" /></i>
        <p class="text">평균 응답시간<em>(종전 1분)</em></p>
        <p class="fz42"><strong>8</strong>s</p>
      </div>

      <div
        class="tps-chart"
        @click="toggleModal(0)"
        v-show="modal === true && modalType === 1"
        style="width: 100%; height: 100%"
      >
        <div
          :class="{
            'dash-modal-detail-collapse': modal == false,
            'dash-modal-detail-expand': modal == true,
          }"
          id="avgDetail"
          style="width: 100%; height: 90%"
        />
      </div>

      <div
        class="tps-chart"
        :class="{
          'dash-modal-detail-collapse': modal == true,
          'dash-modal-detail-expand': modal == false,
        }"
        @click="toggleModal(2)"
        v-show="modal === false"
      >
        <i><img src="@/assets/tps_ico.svg" alt="TPS" /></i>
        <p class="text">TPS</p>
        <p class="fz42"><strong>0.875</strong></p>
      </div>
      <div
        class="tps-chart"
        @click="toggleModal(0)"
        v-show="modal === true && modalType === 2"
        style="width: 100%; height: 100%"
        :class="{
          'dash-modal-detail-collapse': modal == false,
          'dash-modal-detail-expand': modal == true,
        }"
      >
        <h5 class="h5-tit" style="color: #fff6e5">TPS Detail</h5>
        <div id="tpsDetail" style="width: 100%; height: 100%" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { calcCompactCardWidth } from '@/utils/screen';
import * as echarts from 'echarts';
import { avgDetailOption, tpsDetailOption } from '@/components/dash-board/chartDummy';

@Component
export default class ApiResponseAvg extends Vue {
  detailAvgDom = {} as HTMLDivElement;
  detailAvgChart = {} as echarts.EChartsType;
  detailTpsDom = {} as HTMLDivElement;
  detailTpsChart = {} as echarts.EChartsType;
  modal = false;
  // 0 = 모달 안보일 때
  // 1 = avg모달일 때
  // 2 = tps모달일 때
  modalType = 0;

  initChartAndDom() {
    this.detailAvgDom = document.getElementById('avgDetail') as HTMLDivElement;
    this.detailAvgChart = echarts.init(this.detailAvgDom);
    this.detailAvgChart.setOption(avgDetailOption);
    this.detailTpsDom = document.getElementById('tpsDetail') as HTMLDivElement;
    this.detailTpsChart = echarts.init(this.detailTpsDom);
    this.detailTpsChart.setOption(tpsDetailOption);
  }

  mounted() {
    this.initChartAndDom();
    this.observeSize();
  }

  width = 0;
  height = 0;
  observeSize() {
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        this.width = width;
        this.height = height;
      });
    });
    ro.observe(this.$refs.tpsGroup as HTMLDivElement);
  }
  resizeChart() {
    this.detailAvgChart.resize();
    this.detailTpsChart.resize();
  }
  @Watch('width')
  onWidthChange() {
    this.resizeChart();
  }

  toggleModal(type: number) {
    this.modalType = type;
    this.modal = !this.modal;
  }
}
</script>
<style scoped>
.avg-collapse-modal {
  width: 31.2%;
  position: absolute;
  right: 0px;
  z-index: 1;
  transition: all 0.3s;
}

.avg-expand-modal {
  width: 100%;
  height: 200%;
  position: absolute;
  right: 0px;
  z-index: 5;
  transition: all 0.3s;
}

.avg-expand-modal:hover,
.avg-collapse-modal:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
}
</style>
