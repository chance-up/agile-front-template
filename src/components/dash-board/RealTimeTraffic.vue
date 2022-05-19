<template>
  <section class="group">
    <div class="chart-wrap">
      <h3 class="h3-tit">실시간 Traffic</h3>
      <div class="chart-group" id="real-time-traffic"></div>
    </div>
    <div>
      <ModalLayout size="lg" v-if="isShowModal">
        <template v-slot:modalHeader
          ><h2 class="h1-tit">this is modal!!</h2>
          <button @click="hideModal()">
            <i><img src="@/assets/close.svg" :alt="$t('common.close')" :title="$t('common.close')" /></i>
          </button>
        </template>
        <template v-slot:modalContainer>
          <div class="realtime-modal">
            <div ref="realTimeChart" class="chart-size"></div>
            <div>Country : {{ clickedParamData[3] }}</div>
            <div>Value : {{ clickedParamData[0] }}</div>
            <div>Year : {{ clickedParamData[4] }}</div>
            <div>Ratio : {{ clickedParamData[1] }}</div>
            <div>누적 : {{ clickedParamData[2] }}</div>
          </div>
        </template>
        <template v-slot:modalFooter>
          <button class="purple-btn lg-btn" @click="hideModal">
            {{ $t('common.ok') }}
          </button>
        </template>
      </ModalLayout>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import realtimeTestData from '@/utils/realtimeTest';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import * as echarts from 'echarts';
@Component({
  components: {
    ModalLayout,
  },
})
export default class RealTimeTraffic extends Vue {
  clickedParamData: any;
  setClickedParam(paramData: any) {
    this.clickedParamData = paramData;
  }

  isShowModal = false;
  showModals() {
    this.isShowModal = true;
  }
  hideModal() {
    this.isShowModal = false;
  }
  mounted() {
    this.drawDynamicChart('real-time-traffic', realtimeTestData);
  }
  drawDynamicChart = (id: string, _rawData: any) => {
    const countries = ['Finland', 'France', 'Germany', 'Iceland', 'Norway', 'Poland', 'Russia', 'United Kingdom'];
    const datasetWithFilters: echarts.DatasetComponentOption[] = [];
    const seriesList: echarts.SeriesOption[] = [];
    const dom = document.getElementById(id) as HTMLDivElement;
    const myChart = echarts.init(dom);
    window.addEventListener('resize', () => {
      myChart.resize();
    });

    echarts.util.each(countries, function (country) {
      const datasetId = 'dataset_' + country;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 1950 },
              { dimension: 'Country', '=': country },
            ],
          },
        },
      });

      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: country,
        endLabel: {
          show: true,
          formatter: function (params: any) {
            return params.value[3] + ': ' + params.value[0];
          },
        },
        labelLayout: {
          moveOverlap: 'shiftY',
        },
        emphasis: {
          focus: 'series',
        },
        encode: {
          x: 'Year',
          y: 'Income',
          label: ['Country', 'Income'],
          itemName: 'Year',
          tooltip: ['Income'],
        },
      });
    });

    const option = {
      animationDuration: 10000,
      dataset: [
        {
          id: 'dataset_raw',
          source: _rawData,
        },
        ...datasetWithFilters,
      ],

      tooltip: {
        order: 'valueDesc',
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle',
      },
      yAxis: {
        name: 'Income',
      },
      grid: {
        top: 30,
        left: 50,
        bottom: 20,
        right: 120,
      },
      series: seriesList,
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0],
          startValue: 1950,
          endValue: 2000,
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          startValue: 1950,
          endValue: 2000,
        },
      ],
    };

    myChart.setOption(option);

    myChart.on('click', (params) => {
      this.showModals();
      this.setClickedParam(params.data);
      console.log(params.data);
      console.log(typeof params.data);
      const optionModal = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
          text: 'Gradient Stacked Area Chart',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
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
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)',
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: 'Line 4',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 0, 135)',
                },
                {
                  offset: 1,
                  color: 'rgb(135, 0, 157)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
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

      setTimeout(() => {
        const modalDom = this.$refs.realTimeChart as HTMLElement;
        const myChart1 = echarts.init(modalDom);
        myChart1.setOption(optionModal);
      }, 0);
    });
  };

  widthValue = '';
  // setBoxWidth() {
  //   const val = document.querySelector('.chart-group')?.clientWidth;
  //   this.widthValue = `${val}px`;
  //   document.documentElement.style.setProperty('--box-width', this.widthValue);
  // }
}
</script>
<style scoped>
.realtime-modal {
  width: 100%;
  height: 100%;
}
.chart-size {
  width: 100%;
  height: 100%;
}
</style>
