<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">{{ $t('dash-board.api_top5_title') }}</h3>
    <ul class="list-wrap">
      <li v-for="(item, index) in top5List" :key="index">
        <p class="id-txt">{{ item.id }}</p>
        <dl>
          <dt><em>Total :</em>{{ item.total }}</dt>
          <dd>
            <span class="syan">{{ item.success }}</span
            >/<span class="red">{{ item.fail }}</span>
          </dd>
        </dl>
        <div class="sm-bar">{{ $t('dash-board.success_rate') }}</div>
        <ProgressBar :listItem="item" />
        <button class="more-btn" @click="(isShowModal = true), (apiDetailData = item)">
          <!-- <button class="more-btn" @click="showModal"> -->
          <i><img src="@/assets/more_ico.svg" :alt="$t('common.more')" /></i>
        </button>
      </li>
      <!-- <li>
        <p class="id-txt">sysID_API_deviceinfo</p>
        <dl>
          <dt><em>Total :</em>208</dt>
          <dd><span class="syan">200</span>/<span class="red">3</span></dd>
        </dl>
        <div class="sm-bar">성공률</div>
        <button class="more-btn">
          <i><img src="@/assets/more_ico.svg" alt="더보기" /></i>
        </button>
      </li>
      <li>
        <p class="id-txt">sysID_API_deviceinfo</p>
        <dl>
          <dt><em>Total :</em>208</dt>
          <dd><span class="syan">200</span>/<span class="red">3</span></dd>
        </dl>
        <div class="sm-bar">성공률</div>
        <button class="more-btn">
          <i><img src="@/assets/more_ico.svg" alt="더보기" /></i>
        </button>
      </li>
      <li>
        <p class="id-txt">sysID_API_deviceinfo</p>
        <dl>
          <dt><em>Total :</em>208</dt>
          <dd><span class="syan">200</span>/<span class="red">3</span></dd>
        </dl>
        <div class="sm-bar">성공률</div>
        <button class="more-btn">
          <i><img src="@/assets/more_ico.svg" alt="더보기" /></i>
        </button>
      </li>
      <li>
        <p class="id-txt">sysID_API_deviceinfo</p>
        <dl>
          <dt><em>Total :</em>208</dt>
          <dd><span class="syan">200</span>/<span class="red">3</span></dd>
        </dl>
        <div class="sm-bar">성공률</div>
        <button class="more-btn">
          <i><img src="@/assets/more_ico.svg" alt="더보기" /></i>
        </button>
      </li> -->
    </ul>
    <ApiDetailModal v-if="isShowModal" @close="isShowModal = false" :apiDetailData="apiDetailData"></ApiDetailModal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { drawChart } from '@/utils/chart';
import * as echarts from 'echarts';

import ProgressBar from '@/components/commons/ProgressBar.vue';
import ApiDetailModal from '@/components/commons/modal/ApiDetailModal.vue';

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

@Component({
  components: {
    ProgressBar,
    ApiDetailModal,
  },
})
export default class ApiTop5 extends Vue {
  apiDetailData: any = {};
  top5List: any[] = [
    {
      id: 'sysID_API_deviceinfo',
      total: 208,
      success: 200,
      fail: 5,
    },
    {
      id: 'sysID_API_deviceinfo',
      total: 208,
      success: 170,
      fail: 38,
    },
    {
      id: 'sysID_API_deviceinfo',
      total: 208,
      success: 125,
      fail: 83,
    },
    {
      id: 'sysID_API_deviceinfo',
      total: 208,
      success: 208,
      fail: 0,
    },
    {
      id: 'sysID_API_deviceinfo',
      total: 208,
      success: 50,
      fail: 158,
    },
  ];

  apiTop5TransitionSeries: echarts.LineSeriesOption[] = [
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

  apiTop5TransitionOption: echarts.EChartsOption = {
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
      top: '5%',
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
        axisLabel: {
          margin: 12,
        },
      },
    ],
    series: this.apiTop5TransitionSeries.map((item, index) =>
      Object.assign(item, {
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        label: {
          show: index === this.apiTop5TransitionSeries.length - 1 ? true : false,
          position: 'top',
          formatter: this.getFormatter(this.apiTop5TransitionSeries),
          fontSize: 9,
        },
      })
    ),
  };

  ApiTop5AWeekTransitionOption: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'z-index: 9999999;',
      axisPointer: {
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    grid: {
      top: '5%',
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
        data: [150, 212, 201, 154, 190, 330, 410],
      },
    ],
  };

  isShowModal = false;

  @Watch('isShowModal')
  onIsShowModalChange(val: boolean) {
    if (val) {
      setTimeout(() => {
        this.chartInit();
      }, 0);
    }
  }

  chartInit() {
    // drawChart('apiTop5Transition', this.apiTop5TransitionOption);
    const transitionDOM = this.$refs.apiTop5Transition as HTMLElement;
    const weekTransitionDOM = this.$refs.apiTop5AWeekTransition as HTMLElement;
    const transitionChart = echarts.init(transitionDOM);
    const weekTransitionChart = echarts.init(weekTransitionDOM);
    transitionChart.setOption(this.apiTop5TransitionOption);
    weekTransitionChart.setOption(this.ApiTop5AWeekTransitionOption);
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

  showModal() {
    this.isShowModal = true;
  }

  hideModal() {
    this.isShowModal = false;
  }
}
</script>
<style scoped>
.chart-size {
  width: 380px;
  height: 160px;
}
</style>
