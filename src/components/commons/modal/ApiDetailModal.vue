<template>
  <div>
    <transition name="modal" appear>
      <div class="modal-overlay">
        <div class="pop-wrap lg-pop">
          <div class="pop-header">
            <h1 class="h1-tit">{{ apiDetailData.sysId == undefined ? apiDetailData.svcId : apiDetailData.apiId }}</h1>
            <button @click="$emit('close')">
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
          <div class="pop-container">
            <div class="pop-chart col-2">
              <div class="chart-div" id="stacked-area-chart-servicetop5"></div>
              <div class="chart-div" id="stacked-horizontal-bar-servicetop5"></div>
            </div>
            <div class="stati-wrap">
              <div class="tit-wrap">
                <h3 class="h3-tit">API List</h3>
                <p class="total">
                  total :
                  <span>{{ apiDetailData.sysId == undefined ? apiDetailData.totCnt : apiDetailData.totCnt }}</span>
                </p>
              </div>
              <div class="stati-list">
                <ul v-if="apiDetailData.sysId == undefined ? true : false">
                  <ApiDetailModalApiList
                    v-for="(item, index) in apiDetailData.sysId == undefined ? apiDetailData.apiList : apiDetailData"
                    :key="index"
                    :kind="apiDetailData.sysId == undefined ? 'svc' : 'api'"
                    :item="item"
                  />
                </ul>
                <ul v-if="apiDetailData.sysId == undefined ? false : true">
                  <ApiDetailModalApiList
                    :kind="apiDetailData.sysId == undefined ? 'svc' : 'api'"
                    :item="apiDetailData"
                  />
                </ul>
              </div>
            </div>
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
import { EachApi } from '@/types/MornitoringControllType';

import ApiDetailModalApiList from '@/components/commons/modal/ApiDetailModalApiList.vue';
interface ApiDetail {
  id: string;
  total: number;
  success: number;
  fail: number;
}

interface FormatterType {
  componentType: 'series';
  seriesType: string;
  seriesIndex: number;
  seriesName: string;
  name: string;
  dataIndex: number;
  data: object;
  value: number | object;
  encode: object;
  dimensionNames: Array<string>;
  dimensionIndex: number;
  color: string;
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
@Component({
  components: { ApiDetailModalApiList },
})
export default class ApiDetailModal extends Vue {
  @Prop() apiDetailData!: EachResponse;
  created() {
    disableScrolling();
  }

  mounted() {
    this.drawChart1('stacked-area-chart-servicetop5', 'asdf');
    this.drawChart2('stacked-horizontal-bar-servicetop5', 'asdf');
  }

  destroyed() {
    enableScrolling();
  }

  // x축 value 합계
  getFormatter(series: echarts.LineSeriesOption[]) {
    return (params: FormatterType) => {
      let sum = 0;
      series.forEach((item) => {
        const data = item.data as number[];
        sum += data[params.dataIndex];
      });
      return sum;
    };
  }

  drawChart1 = (id: string, _rawData: any) => {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById(id) as HTMLDivElement;
    var myChart = echarts.init(chartDom);
    // window.addEventListener('resize', () => {
    //   myChart.resize();
    // });

    let apiTop5TransitionSeries: echarts.LineSeriesOption[] = [
      {
        name: 'Email',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Union Ads',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Video Ads',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Direct',
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'Search Engine',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ];

    var option: EChartsOption;

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      // legend: {
      //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      // },
      grid: {
        top: '10%',
        bottom: '3%',
        left: '3%',
        right: '4%',
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
      series: apiTop5TransitionSeries.map((item, index) =>
        Object.assign(item, {
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          // label: {
          //   show: index === apiTop5TransitionSeries.length - 1 ? true : false,
          //   position: 'top',
          //   formatter: this.getFormatter(apiTop5TransitionSeries),
          //   fontSize: 9,
          // },
        })
      ),
    };

    option && myChart.setOption(option);
  };

  drawChart2 = (id: string, _rawData: any) => {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById(id) as HTMLDivElement;
    var myChart = echarts.init(chartDom);

    var option: EChartsOption;

    // 최근 7일 성공/실패 추이 데이터
    let apiTop5AWeekTransitionSeries: echarts.LineSeriesOption[] = [
      {
        name: 'Direct',
        data: [320, 302, 301, 334, 390, 330, 320],
      },
      {
        name: 'Mail Ad',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Affiliate Ad',
        data: [150, 212, 201, 154, 190, 330, 410],
      },
    ];

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        top: '5%',
        left: '3%',
        right: '6%',
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
      series: apiTop5AWeekTransitionSeries.map((item) =>
        Object.assign(item, {
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            fontSize: 9,
          },
          emphasis: {
            focus: 'series',
          },
        })
      ),
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
