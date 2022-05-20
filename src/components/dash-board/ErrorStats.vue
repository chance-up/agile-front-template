<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">Error stats (24Hour)</h3>
    <div
      class="chart-group error-stats"
      :class="{
        'error-collapse-modal': modal == false,
        'error-expand-modal': modal == true,
      }"
      @click="toggleModal()"
      ref="totalErrorStats"
    >
      <div
        v-show="modal == false"
        id="errorStatsPie"
        :class="{
          'dash-modal-detail-collapse': modal == true,
          'dash-modal-detail-expand': modal == false,
        }"
        class="error-pie"
      >
        실패율
      </div>
      <div
        v-show="modal == false"
        id="errorStateBar"
        :class="{
          'dash-modal-detail-collapse': modal == true,
          'dash-modal-detail-expand': modal == false,
        }"
        class="error-chart"
      >
        Critical/Major/Minor
      </div>

      <div
        v-show="modal == true"
        :class="{
          'dash-modal-detail-collapse': modal == false,
          'dash-modal-detail-expand': modal == true,
        }"
        style="width: 100%; height: 100%"
      >
        <h5 class="h5-tit">Error State Detail</h5>
        <div id="errorStateDetail" style="width: 100%; height: 100%"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as echarts from 'echarts';
import { errorStatsPieOption, errorStatsBarOption, errorStatsDetailOption } from '@/components/dash-board/chartDummy';
@Component
export default class ErrorStats extends Vue {
  dom1 = {} as HTMLDivElement;
  myChart1 = {} as echarts.EChartsType;
  dom2 = {} as HTMLDivElement;
  myChart2 = {} as echarts.EChartsType;
  dom3 = {} as HTMLDivElement;
  myChart3 = {} as echarts.EChartsType;

  initChartAndDom() {
    this.dom1 = document.getElementById('errorStatsPie') as HTMLDivElement;
    this.myChart1 = echarts.init(this.dom1);
    this.myChart1.setOption(errorStatsPieOption);
    this.dom2 = document.getElementById('errorStateBar') as HTMLDivElement;
    this.myChart2 = echarts.init(this.dom2);
    this.myChart2.setOption(errorStatsBarOption);
    this.dom3 = document.getElementById('errorStateDetail') as HTMLDivElement;
    this.myChart3 = echarts.init(this.dom3);
    this.myChart3.setOption(errorStatsDetailOption);
  }

  mounted() {
    this.initChartAndDom();
    this.observeSize();
  }

  resizeChart() {
    this.myChart1.resize();
    this.myChart2.resize();
    this.myChart3.resize();
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
    ro.observe(this.$refs.totalErrorStats as HTMLDivElement);
  }

  @Watch('width')
  onWidthChang() {
    this.resizeChart();
  }

  modal = false;
  toggleModal() {
    this.modal = !this.modal;
  }
}
</script>
<style scoped>
.error-stats {
  background-color: #fff;
}

.error-collapse-modal {
  width: 31.2%;
  position: absolute;
  z-index: 5;
  transition: all 0.3s;
}

.error-expand-modal {
  width: 100%;
  height: 200%;
  position: absolute;
  z-index: 5;
  transition: all 0.3s;
}

.error-expand-modal:hover,
.error-collapse-modal:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
}
</style>
