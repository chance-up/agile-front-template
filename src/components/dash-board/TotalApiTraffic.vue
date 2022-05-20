<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">Total API Traffic (24Hour)</h3>
    <div
      class="chart-group api-traffic"
      :class="{
        'total-collapse-modal': modal == false,
        'total-expand-modal': modal == true,
      }"
      @click="toggleModal()"
      ref="totalApiTraffic"
    >
      <div
        id="totalApiTrafficTotal"
        v-show="modal == false"
        :class="{
          'dash-modal-detail-collapse': modal == true,
          'dash-modal-detail-expand': modal == false,
        }"
        class="api-pie"
      >
        total
      </div>
      <div
        v-show="modal == false"
        id="totalApiTrafficSuccess"
        :class="{
          'dash-modal-detail-collapse': modal == true,
          'dash-modal-detail-expand': modal == false,
        }"
        class="api-pie"
      >
        성공
      </div>
      <div
        v-show="modal == false"
        id="totalApiTrafficFail"
        :class="{
          'dash-modal-detail-collapse': modal == true,
          'dash-modal-detail-expand': modal == false,
        }"
        class="api-pie"
      >
        실패
      </div>

      <div
        v-show="modal == true"
        :class="{
          'dash-modal-detail-collapse': modal == false,
          'dash-modal-detail-expand': modal == true,
        }"
        style="width: 100%; height: 100%"
      >
        <h5 class="h5-tit" style="color: #fff6e5">Total API Traffic Detail</h5>
        <div id="totalApiTrafficDetail" style="width: 100%; height: 90%"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as echarts from 'echarts';
import {
  totalApiTrafficOption,
  totalApiTrafficSuccsessOption,
  totalApiTrafficFailOption,
  totalApiTrafficDetailOption,
} from '@/components/dash-board/chartDummy';

@Component
export default class TotalApiTraffic extends Vue {
  dom1 = {} as HTMLDivElement;
  myChart1 = {} as echarts.EChartsType;
  dom2 = {} as HTMLDivElement;
  myChart2 = {} as echarts.EChartsType;
  dom3 = {} as HTMLDivElement;
  myChart3 = {} as echarts.EChartsType;
  dom4 = {} as HTMLDivElement;
  myChart4 = {} as echarts.EChartsType;

  initChartAndDom() {
    this.dom1 = document.getElementById('totalApiTrafficTotal') as HTMLDivElement;
    this.myChart1 = echarts.init(this.dom1);
    this.myChart1.setOption(totalApiTrafficOption);
    this.dom2 = document.getElementById('totalApiTrafficSuccess') as HTMLDivElement;
    this.myChart2 = echarts.init(this.dom2);
    this.myChart2.setOption(totalApiTrafficSuccsessOption);
    this.dom3 = document.getElementById('totalApiTrafficFail') as HTMLDivElement;
    this.myChart3 = echarts.init(this.dom3);
    this.myChart3.setOption(totalApiTrafficFailOption);
    this.dom4 = document.getElementById('totalApiTrafficDetail') as HTMLDivElement;
    this.myChart4 = echarts.init(this.dom4);
    this.myChart4.setOption(totalApiTrafficDetailOption);
  }

  mounted() {
    this.initChartAndDom();
  }

  updated() {
    this.observeSize();
  }

  resizeChart() {
    this.myChart1.resize();
    this.myChart2.resize();
    this.myChart3.resize();
    this.myChart4.resize();
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
    ro.observe(this.$refs.totalApiTraffic as HTMLDivElement);
  }

  @Watch('width')
  onWidthChange() {
    this.resizeChart();
  }

  modal = false;
  toggleModal() {
    this.modal = !this.modal;
  }
}
</script>
<style scoped>
.total-collapse-modal {
  width: 31.2%;
  position: absolute;
  z-index: 6;
  transition: all 0.3s;
}

.total-expand-modal {
  width: 100%;
  height: 200%;
  position: absolute;
  z-index: 6;
  transition: all 0.3s;
}

.total-expand-modal:hover,
.total-collapse-modal:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
}
</style>
