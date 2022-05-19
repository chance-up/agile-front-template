<template>
  <div>
    <transition name="modal" appear>
      <div class="modal-overlay">
        <div class="pop-wrap lg-pop">
          <div class="pop-header">
            <h1 class="h1-tit">{{ apiDetailData.id }}</h1>
            <button @click="$emit('close')">
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
          <div class="pop-container">
            <div class="pop-chart col-2">
              <div class="chart-div" id="stacked-area-chart-servicetop5"></div>
              <div class="chart-div" id="stacked-horizontal-bar-servicetop5"></div>
            </div>

            <ApiDetailModalApiList />
          </div>
          <div class="pop-footer">
            <button class="lg-btn purple-btn" @click="$emit('close')">확인</button>
            <button class="lg-btn white-btn" @click="$emit('close')">취소</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import * as echarts from 'echarts';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { disableScrolling, enableScrolling } from '@/utils/screen';

import ApiDetailModalApiList from '@/components/commons/modal/ApiDetailModalApiList.vue';
interface ApiDetail {
  id: string;
  total: number;
  success: number;
  fail: number;
}
@Component({
  components: { ApiDetailModalApiList },
})
export default class ApiDetailModal extends Vue {
  @Prop() apiDetailData!: ApiDetail;
  created() {
    disableScrolling();
  }

  destroyed() {
    enableScrolling();
  }
  mounted() {
    this.drawChart1('stacked-area-chart-servicetop5', 'asdf');
    this.drawChart2('stacked-horizontal-bar-servicetop5', 'asdf');
  }
  drawChart1 = (id: string, _rawData: any) => {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById(id) as HTMLDivElement;
    var myChart = echarts.init(chartDom);
    // window.addEventListener('resize', () => {
    //   myChart.resize();
    // });
    var option: EChartsOption;

    option = {
      //   title: {
      //     text: '전체/성공/실패 추이',
      //   },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      //   legend: {
      //     data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      //   },
      //   toolbox: {
      //     feature: {
      //       saveAsImage: {},
      //     },
      //   },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
          },
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };

    option && myChart.setOption(option);
  };
  drawChart2 = (id: string, _rawData: any) => {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById(id) as HTMLDivElement;
    var myChart = echarts.init(chartDom);

    var option: EChartsOption;

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      //   legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [320, 302, 301, 334, 390, 330, 320],
        },
        {
          name: 'Mail Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Affiliate Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [150, 212, 201, 154, 190, 330, 410],
        },
        {
          name: 'Search Engine',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [820, 832, 901, 934, 1290, 1330, 1320],
        },
      ],
    };

    option && myChart.setOption(option);
  };
}
</script>
<style>
/***   popup   ***/

.modal-enter,
.modal-leave-to,
.alertLayout-enter,
.alertLayout-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.modal-enter-active,
.modal-leave-active,
.alertLayout-enter-active,
.alertLayout-leave-active {
  transition: opacity 0.3s;
}

.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
