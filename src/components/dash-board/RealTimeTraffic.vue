<template>
  <section class="group">
    <div class="chart-wrap">
      <h3 class="h3-tit">실시간 Traffic</h3>
      <div class="chart-group" id="real-time-traffic"></div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import realtimeTestData from '@/utils/realtimeTest';
import * as echarts from 'echarts';
@Component
export default class RealTimeTraffic extends Vue {
  mounted() {
    this.drawDynamicChart('real-time-traffic', realtimeTestData);
  }
  drawDynamicChart = (id: string, _rawData: any) => {
    const countries = ['Finland', 'France', 'Germany', 'Iceland', 'Norway', 'Poland', 'Russia', 'United Kingdom'];
    const datasetWithFilters: echarts.DatasetComponentOption[] = [];
    const seriesList: echarts.SeriesOption[] = [];
    const dom = document.getElementById(id) as HTMLDivElement;
    const myChart = echarts.init(dom);

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
        right: 140,
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
      console.log(params);
      if (params.targetType === 'axisLabel') {
        if (params.value === 'MyLabel #3') {
          console.log("Hello, is it me you're looking for");
          // Do something ...
        }
      }
    });
  };
}
</script>
<style></style>
