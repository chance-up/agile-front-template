<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">Error stats (24Hour)</h3>
    <div
      ref="totalApiTraffic"
      class="chart-group error-stats"
      :class="{
        'error-collapse-modal mouse-hover': modal == false,
        'error-expand-modal': modal == true,
      }"
      @click="showModalDetail()"
    >
      <div v-show="modal == false" id="errorStatsPie" class="error-pie" autoresize>실패율</div>
      <div v-show="modal == false" id="errorStateBar" class="error-chart" autoresize>Critical/Major/Minor</div>
      <div v-show="modal == true" style="width: 100%; height: 100%">
        <h5 class="h5-tit">Error State Detail</h5>
        <div
          class="error-modal-detail"
          :class="{
            'error-modal-detail-collapse': modal == false,
            'error-modal-detail-expand': modal == true,
          }"
          id="errorStateDetail"
        ></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as echarts from 'echarts';
@Component
export default class ErrorStats extends Vue {
  dom1 = {} as HTMLDivElement;
  myChart1 = {} as echarts.EChartsType;
  dom2 = {} as HTMLDivElement;
  myChart2 = {} as echarts.EChartsType;
  dom3 = {} as HTMLDivElement;
  myChart3 = {} as echarts.EChartsType;

  mounted() {
    this.dom1 = document.getElementById('errorStatsPie') as HTMLDivElement;
    this.myChart1 = echarts.init(this.dom1);
    this.myChart1.setOption(this.errorStatsPieOption);
    this.dom2 = document.getElementById('errorStateBar') as HTMLDivElement;
    this.myChart2 = echarts.init(this.dom2);
    this.myChart2.setOption(this.errorStatsBarOption);
    this.dom3 = document.getElementById('errorStateDetail') as HTMLDivElement;
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
    ro.observe(this.$refs.totalApiTraffic as HTMLDivElement);
  }

  @Watch('width')
  onWidthChang() {
    this.resizeChart();
  }

  errorStatsPieOption: echarts.EChartsOption = {
    title: {
      text: '실패율',
      left: 'center',
      top: '75%',
      textStyle: {
        color: 'black',
        fontSize: '13',
        fontWeight: 550,
      },
    },
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFFFFF',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,

        label: {
          show: true,
          position: 'center',
          formatter: '15' + '%',
          color: 'red',
          fontSize: '16',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 15, name: '실패율' },
          { value: 85, name: '성공률' },
        ],
        center: ['50%', '35%'],
        emphasis: {
          disabled: true,
        },
      },
    ],
    color: ['#FF4E63', '#F8B7B0'],
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
        axisLabel: { show: true, fontSize: '13', fontWeight: 550, color: '#000' },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      {
        type: 'category',
        data: ['1건', '5건', '2건'],
        axisLine: { show: false },
        axisLabel: { show: true, fontSize: '13', fontWeight: 550, color: '#000' },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    grid: {
      top: 30,
      left: 50,
      bottom: 30,
      right: 50,
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

  errorStatsDetailOption: echarts.EChartsOption = {
    dataset: {
      source: [
        ['score', 'amount', 'product'],
        [89.3, 58212, 'Matcha Latte'],
        [57.1, 78254, 'Milk Tea'],
        [74.4, 41032, 'Cheese Cocoa'],
        [50.1, 12755, 'Cheese Brownie'],
        [89.7, 20145, 'Matcha Cocoa'],
        [68.1, 79146, 'Tea'],
        [19.6, 91852, 'Orange Juice'],
        [10.6, 101852, 'Lemon Juice'],
        [32.7, 20112, 'Walnut Brownie'],
      ],
    },
    grid: {
      top: '5%',
      left: '3%',
      right: '10%',
      containLabel: true,
    },
    xAxis: { name: 'amount' },
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      text: ['High Score', 'Low Score'],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F'],
      },
    },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "product" column to Y axis
          y: 'product',
        },
      },
    ],
  };

  modal = false;
  showModalDetail() {
    if (this.modal == true) {
      this.resetBoxWidth();
      setTimeout(() => {
        this.modal = false;
      }, 0);
    } else {
      this.setBoxWidth();

      setTimeout(() => {
        this.modal = true;
      }, 0);
      this.myChart3 = echarts.init(this.dom3);
      this.myChart3.setOption(this.errorStatsDetailOption);
    }
  }
  hideModalDetail() {
    this.modal = false;
  }
  widthValue = '';

  setBoxWidth() {
    const val = document.querySelector('.chart-group')?.clientWidth as number;
    this.widthValue = `${val + 2}px`;
    document.documentElement.style.setProperty('--error-box-width', this.widthValue);
  }
  resetBoxWidth() {
    document.documentElement.style.setProperty('--error-box-width', '100%');
  }
}
</script>
<style scoped>
:root {
  --error-box-widthh: 100%;
}
.mouse-hover:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
}

.error-stats {
  background-color: #fff;
}

.error-modal-detail {
  width: 100%;
  height: 90%;
  opacity: 0;
}

.error-modal-detail-collapse {
  opacity: 0;
}

.error-modal-detail-expand {
  opacity: 1;
  transition: opacity 0.5s;
}

.error-collapse-modal {
  width: var(--error-box-width);
}

.error-expand-modal {
  width: 60%;
  height: 200%;
  z-index: 5;
  position: absolute;
  transform: translateX(-28.8%);
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
  transform-origin: top;
  transition: all 0.5s;
}
</style>
