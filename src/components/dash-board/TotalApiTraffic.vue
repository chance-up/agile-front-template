<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">Total API Traffic (24Hour)</h3>
    <div
      ref="totalApiTraffic"
      class="chart-group api-traffic"
      :class="{
        'total-collapse-modal  mouse-hover': modal == false,
        'total-expand-modal': modal == true,
      }"
      @click="showModalDetail()"
    >
      <div v-show="modal == false" id="totalApiTrafficTotal" class="api-pie" data-echart-responsive="true">total</div>
      <div v-show="modal == false" id="totalApiTrafficSuccess" class="api-pie" data-echart-responsive="true">성공</div>
      <div v-show="modal == false" id="totalApiTrafficFail" class="api-pie" data-echart-responsive="true">실패</div>
      <div v-show="modal == true" style="width: 100%; height: 100%">
        <h5 class="h5-tit">Total API Traffic Deetail</h5>
        <div
          class="total-modal-detail"
          :class="{
            'total-modal-detail-collapse': modal == false,
            'total-modal-detail-expand': modal == true,
          }"
          id="totalApiTrafficDetail"
        ></div>
      </div>
    </div>
    <!-- <ModalLayout size="l" v-if="modal">
      <template v-slot:modalHeader
        ><h2 class="h1-tit">팝업 title</h2>
        <button @click="hideModalDetail()">
          <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
        </button>
      </template>
      <template v-slot:modalContainer>
        <div style="width: 540px; height: 300px" id="totalApiTrafficDetail"></div>
      </template>
      <template v-slot:modalFooter> </template>
    </ModalLayout> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as echarts from 'echarts';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
@Component({
  components: {
    ModalLayout,
  },
})
export default class TotalApiTraffic extends Vue {
  dom1 = {} as HTMLDivElement;
  myChart1 = {} as echarts.EChartsType;
  dom2 = {} as HTMLDivElement;
  myChart2 = {} as echarts.EChartsType;
  dom3 = {} as HTMLDivElement;
  myChart3 = {} as echarts.EChartsType;
  dom4 = {} as HTMLDivElement;
  myChart4 = {} as echarts.EChartsType;

  mounted() {
    this.dom1 = document.getElementById('totalApiTrafficTotal') as HTMLDivElement;
    this.myChart1 = echarts.init(this.dom1);
    this.myChart1.setOption(this.totalApiTrafficOption);
    this.dom2 = document.getElementById('totalApiTrafficSuccess') as HTMLDivElement;
    this.myChart2 = echarts.init(this.dom2);
    this.myChart2.setOption(this.totalApiTrafficSuccsessOption);
    this.dom3 = document.getElementById('totalApiTrafficFail') as HTMLDivElement;
    this.myChart3 = echarts.init(this.dom3);
    this.myChart3.setOption(this.totalApiTrafficFailOption);
    this.dom4 = document.getElementById('totalApiTrafficDetail') as HTMLDivElement;
    this.myChart4 = echarts.init(this.dom4);
    this.myChart4.setOption(this.totalApiTrafficDeetailOption);
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
  onWidthChang() {
    this.resizeChart();
  }

  totalApiTrafficOption: echarts.EChartsOption = {
    title: {
      text: 'Total',
      left: 'center',
      top: 'bottom',
      textStyle: {
        color: '#FFF6E5',
        fontSize: '17',
      },
    },

    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFA800',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['57%', '80%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: '4320' + '\n' + '건',
          fontSize: '15',
          color: '#FFF6E5',
        },

        labelLine: {
          show: false,
        },
        data: [{ value: 4320, name: 'total' }],
        center: ['50%', '35%'],
        emphasis: {
          disabled: true,
        },
      },
    ],
    color: '#FFF6E5',
  };

  totalApiTrafficSuccsessOption: echarts.EChartsOption = {
    title: {
      text: '성공',
      left: 'center',
      top: 'bottom',
      textStyle: {
        color: '#FFF6E5',
        fontSize: '17',
      },
    },
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFA800',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['57%', '80%'],
        avoidLabelOverlap: false,

        label: {
          show: true,
          position: 'center',
          formatter: '4000' + '\n' + '건',
          fontSize: '15',
          color: '#FFF6E5',
        },
        data: [
          { value: 4000, name: '성공' },
          { value: 320, name: '실패' },
        ],
        center: ['50%', '35%'],
        emphasis: {
          disabled: true,
        },
      },
    ],
    color: ['#FFF6E5', 'rgba(255, 255, 255, 0)'],
  };

  totalApiTrafficFailOption: echarts.EChartsOption = {
    title: {
      text: '실패',
      left: 'center',
      top: 'bottom',
      textStyle: {
        color: '#FFF6E5',
        fontSize: '17',
      },
    },
    // tooltip: {
    //   trigger: 'item',
    // },
    backgroundColor: '#FFA800',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['57%', '80%'],
        avoidLabelOverlap: false,

        label: {
          show: true,
          position: 'center',
          formatter: '320' + '\n' + '건',
          fontSize: '15',
          color: '#FFF6E5',
        },
        data: [
          { value: 320, name: '실패' },
          { value: 4000, name: '성공' },
        ],
        center: ['50%', '35%'],
        emphasis: {
          disabled: true,
        },
      },
    ],
    color: ['#FFF6E5', 'rgba(255, 255, 255, 0)'],
  };

  totalApiTrafficDeetailOption: echarts.EChartsOption = {
    color: '#FFBF00',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    // 차트 이미지 저장
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    grid: {
      top: '5%',
      left: '2%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: { show: true, lineStyle: { color: '#fff' } },
        axisLabel: { show: true, fontSize: '13', fontWeight: 550, color: '#fff' },
      },
    ],
    yAxis: [
      {
        type: 'value',
        // splitLine: { show: true, lineStyle: { color: '#000' } },
        axisLabel: { show: true, fontSize: '13', fontWeight: 550, color: '#fff' },
      },
    ],
    series: [
      {
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#E2F9FF',
            },
            {
              offset: 1,
              color: '#FF2121',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [220, 302, 181, 234, 210, 290, 150],
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
    }
  }
  hideModalDetail() {
    this.modal = false;
  }
  widthValue = '';

  setBoxWidth() {
    const val = document.querySelector('.chart-group')?.clientWidth as number;
    this.widthValue = `${val + 2}px`;
    document.documentElement.style.setProperty('--total-box-width', this.widthValue);
  }
  resetBoxWidth() {
    document.documentElement.style.setProperty('--total-box-width', '100%');
  }
}
</script>
<style scoped>
:root {
  --total-box-width: 100%;
}
.mouse-hover:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
}

.total-modal-detail {
  width: 100%;
  height: 90%;
  opacity: 0;
}

.total-modal-detail-collapse {
  opacity: 0;
}

.total-modal-detail-expand {
  opacity: 1;
  transition: opacity 0.5s;
}

.total-collapse-modal {
  width: var(--total-box-width);
}

.total-expand-modal {
  width: 60%;
  height: 200%;
  z-index: 5;
  position: absolute;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
  transform-origin: top left;
  transition: all 0.5s;
}
</style>
