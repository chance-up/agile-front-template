<template>
  <li @click="cardDetail">
    <div class="card-tit">
      <h2 class="h2-tit">{{ item.svcId }}</h2>

      <div class="tip">
        <button class="tip-btn" v-on:mouseout="tipBox = false" v-on:mouseover="tipBox = true">
          <i><img src="@/assets/tip_ico.svg" alt="tip" /></i>
        </button>
        <span v-if="tipBox" class="tip-area">{{ item.svcDesc }}</span>
      </div>
    </div>

    <div class="script-wrap">
      <div class="script-cont">
        <i><img src="@/assets/req_sm.svg" alt="평균 응답시간" /></i>
        <p class="text">
          평균 응답시간 : <span>{{ item.avgResTm }}</span
          >ms
        </p>
      </div>
      <div class="script-cont">
        <i><img src="@/assets/tps_sm.svg" alt="TPS" /></i>
        <p class="text">
          TPS : <span>{{ item.tps }}</span>
        </p>
      </div>
    </div>

    <div class="card-chart col-2">
      <div :id="'statsPie_' + apiDetailData.id" class="chart-div" autoresize></div>
      <!-- <div class="chart-div">차트영역</div> -->
      <dl>
        <dt>
          성공률 : <span class="syan">{{ item.sucesRate }}%</span>
        </dt>
        <dd>
          Total : <span class="purple">{{ item.totCnt }}</span>
        </dd>
        <dd>
          Success : <span class="syan">{{ item.sucesCnt }}</span>
        </dd>
        <dd>
          Fail : <span class="red">{{ item.failCnt }}</span>
        </dd>
      </dl>
    </div>

    <div class="card-chart">
      <h4 class="h4-tit">실패 구분</h4>
      <div :id="'errorStateBar_' + apiDetailData.id" class="chart-div" autoresize></div>
      <!-- <div class="chart-div">차트영역</div> -->
    </div>
    <!-- <ApiDetailModal
      v-if="showApiDetailModal"
      @close="showApiDetailModal = false"
      :apiDetailData="apiDetailData"
    ></ApiDetailModal> -->
    <!-- <ModalLayout v-if="showApiDetailModal" @close="showApiDetailModal = false" :alert="true"></ModalLayout> -->
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as echarts from 'echarts';

import ApiDetailModal from '@/components/commons/modal/ApiDetailModal.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
interface ApiDetail {
  id: string;
  total: number;
  success: number;
  fail: number;
}

interface EachService {
  statPerd: number; // 통계 기준 시간
  svcId: string; // 서비스 ID
  svcDesc: string; // 서비스 설명
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
  apiList?: string[]; // API 리스트
}
@Component({
  components: { ApiDetailModal, ModalLayout },
})
export default class ControlCard extends Vue {
  @Prop() item!: EachService;

  tipBox = false;
  showApiDetailModal = false;
  apiDetailData: ApiDetail = {
    id: 'service_deviceinfo',
    total: 208,
    success: 200,
    fail: 5,
  };

  statsPieOption: echarts.EChartsOption = {
    // title: {
    //   text: '실패율',
    //   left: 'center',
    //   top: '75%',
    //   textStyle: {
    //     color: 'black',
    //     fontSize: '13',
    //     fontWeight: 400,
    //   },
    // },
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFFFFF',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '90%'],
        avoidLabelOverlap: false,
        // width: '50%',
        // label: {
        //   show: true,
        //   position: 'center',
        //   formatter: '15' + '%',
        //   color: 'red',
        //   fontSize: '16',
        // },
        labelLine: {
          show: false,
        },
        data: [
          { value: 10, name: '실패율' },
          { value: 90, name: '성공률' },
        ],
        // center: ['50%', '50%'],
        emphasis: {
          disabled: true,
        },
      },
    ],
    color: ['#FF4E63', '#6650EE'],
  };

  errorStatsBarOption: echarts.EChartsOption = {
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFFFFF',
    xAxis: {
      type: 'value',
      max: 8,
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: [
      {
        data: ['Minor', 'Major', 'Critical'],
        type: 'category',
        axisLine: { show: false },
        axisLabel: { show: true, fontSize: '13', fontWeight: 600, color: '#000' },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      {
        type: 'category',
        data: ['1건', '5건', '2건'],
        axisLine: { show: false },
        axisLabel: { show: true, fontSize: '13', fontWeight: 600, color: '#000' },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    grid: {
      top: 10,
      left: '21%',
      bottom: 10,
      right: '20%',
    },
    series: [
      {
        data: [
          {
            value: 1,
            itemStyle: {
              color: '#6998FF',
            },
          },
          {
            value: 5,
            itemStyle: {
              color: '#FFB43D',
            },
          },
          {
            value: 2,
            itemStyle: {
              color: '#FF4E63',
            },
          },
        ],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.5)',
          borderRadius: [100, 100, 100, 100],
        },
        // label: {
        //   show: true,
        //   position: 'right',
        //   valueAnimation: true,
        //   formatter: '{c}' + '건',
        // },
        barWidth: '40%',
        itemStyle: {
          borderRadius: [100, 100, 100, 100],
        },
      },
    ],
  };

  mounted() {
    this.apiDetailData.id = this.item.svcId;
    setTimeout(() => {
      this.domInit();
    }, 0);
  }

  domInit() {
    const dom = document.getElementById('statsPie_' + this.apiDetailData.id) as HTMLDivElement;
    const myChart = echarts.init(dom);
    myChart.setOption(this.statsPieOption);
    const dom2 = document.getElementById('errorStateBar_' + this.apiDetailData.id) as HTMLDivElement;
    const myChart2 = echarts.init(dom2);
    myChart2.setOption(this.errorStatsBarOption);

    window.addEventListener('resize', {
      handleEvent() {
        myChart.resize();
        myChart2.resize();
      },
    });
  }

  cardDetail() {
    console.log('test', this.item);
    this.$emit('val', this.item);
  }
}
</script>
