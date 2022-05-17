<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">Total API Traffic (24Hour)</h3>
    <div class="chart-group api-traffic mouse-hover" @click="showModalDetail()">
      <div id="totalApiTrafficTotal" class="api-pie" data-echart-responsive="true">total</div>
      <div id="totalApiTrafficSuccess" class="api-pie" data-echart-responsive="true">성공</div>
      <div id="totalApiTrafficFail" class="api-pie" data-echart-responsive="true">실패</div>
    </div>
    <ModalLayout size="l" v-if="modal">
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
    </ModalLayout>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { drawChart } from '@/utils/chart';
import * as echarts from 'echarts';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
@Component({
  components: {
    ModalLayout,
  },
})
export default class TotalApiTraffic extends Vue {
  mounted() {
    drawChart('totalApiTrafficTotal', this.totalApiTrafficOption);
    drawChart('totalApiTrafficSuccess', this.totalApiTrafficSuccsessOption);
    drawChart('totalApiTrafficFail', this.totalApiTrafficFailOption);
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
    this.modal = true;
    setTimeout(() => {
      drawChart('totalApiTrafficDetail', this.totalApiTrafficDetail);
    }, 0);
  }
  hideModalDetail() {
    this.modal = false;
  }
}
</script>
<style scoped>
.mouse-hover:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
}
</style>
