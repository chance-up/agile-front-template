<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">Total API Traffic (24Hour)</h3>
    <div
      class="chart-group api-traffic"
      :class="{
        ' mouse-hover': modal == false,
        ' expand-modal': modal == true,
      }"
      @click="showModalDetail()"
    >
      <div v-show="modal == false" id="totalApiTrafficTotal" class="api-pie" data-echart-responsive="true">total</div>
      <div v-show="modal == false" id="totalApiTrafficSuccess" class="api-pie" data-echart-responsive="true">성공</div>
      <div v-show="modal == false" id="totalApiTrafficFail" class="api-pie" data-echart-responsive="true">실패</div>
      <template
        ><div v-show="modal == true" style="width: 540px; height: 300px" id="totalApiTrafficDetail"></div
      ></template>
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
import { Component, Vue } from 'vue-property-decorator';
import * as echarts from 'echarts';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
@Component({
  components: {
    ModalLayout,
  },
})
export default class TotalApiTraffic extends Vue {
  mounted() {
    const dom = document.getElementById('totalApiTrafficTotal') as HTMLDivElement;
    const myChart = echarts.init(dom);
    myChart.setOption(this.totalApiTrafficOption);
    const dom2 = document.getElementById('totalApiTrafficSuccess') as HTMLDivElement;
    const myChart2 = echarts.init(dom2);
    myChart2.setOption(this.totalApiTrafficSuccsessOption);
    const dom3 = document.getElementById('totalApiTrafficFail') as HTMLDivElement;
    const myChart3 = echarts.init(dom3);
    myChart3.setOption(this.totalApiTrafficFailOption);
    const dom4 = document.getElementById('totalApiTrafficFail') as HTMLDivElement;
    const myChart4 = echarts.init(dom4);
    myChart3.setOption(this.totalApiTrafficFailOption);
    window.addEventListener('resize', () => {
      myChart.resize();
      myChart2.resize();
      myChart3.resize();
    });
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

  totalApiTrafficDetail: echarts.EChartsOption = {
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
        name: 'Line 5',
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
              color: 'rgb(255, 191, 0)',
            },
            {
              offset: 1,
              color: 'rgb(224, 62, 76)',
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
    this.test();
    this.modal = true;
    // setTimeout(() => {
    //   drawChart('totalApiTrafficDetail', this.totalApiTrafficDetail);
    // }, 0);
  }
  hideModalDetail() {
    this.modal = false;
  }
  widthValue = '';
  test() {
    const val = document.querySelector('.chart-group')?.clientWidth;
    this.widthValue = `${val}px`;
    document.documentElement.style.setProperty('--box-width', this.widthValue);
  }
}
</script>
<style scoped>
:root {
  --box-width: 100%;
}
.mouse-hover:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
}

.chart-group {
  width: var(--box-width);
}

.expand-modal {
  width: 50%;
  height: 200%;
  z-index: 5;
  position: absolute;
  transform: translate(50%, -15%);
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
  transition: all 5s;
}
</style>
