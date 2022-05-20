import * as echarts from 'echarts';

export const avgDetailOption: echarts.EChartsOption = {
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
      axisLine: { show: true, lineStyle: { color: '#FFF6E5' } },
      axisLabel: { show: true, fontSize: '13', fontWeight: 550, color: '#FFF6E5' },
    },
  ],
  yAxis: [
    {
      type: 'value',
      // splitLine: { show: true, lineStyle: { color: '#000' } },
      axisLabel: { show: true, fontSize: '13', fontWeight: 550, color: '#FFF6E5' },
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

export const tpsDetailOption: echarts.EChartsOption = {
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
      axisLine: { show: true, lineStyle: { color: '#FFF6E5' } },
      axisLabel: { show: true, fontSize: '13', fontWeight: 550, color: '#FFF6E5' },
    },
  ],
  yAxis: [
    {
      type: 'value',
      // splitLine: { show: true, lineStyle: { color: '#000' } },
      axisLabel: { show: true, fontSize: '13', fontWeight: 550, color: '#FFF6E5' },
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
      data: [220, 302, 181, 234, 210, 290, 150],
    },
  ],
};

export const progressOption = {
  graphic: {
    elements: [
      {
        type: 'group',
        left: 'center',
        top: 'center',
        children: new Array(7).fill(0).map((val, i) => ({
          type: 'rect',
          x: i * 20,
          shape: {
            x: 0,
            y: -40,
            width: 10,
            height: 80,
          },
          style: {
            fill: '#5470c6',
          },
          keyframeAnimation: {
            duration: 1000,
            delay: i * 200,
            loop: true,
            keyframes: [
              {
                percent: 0.5,
                scaleY: 0.3,
                easing: 'cubicIn',
              },
              {
                percent: 1,
                scaleY: 1,
                easing: 'cubicOut',
              },
            ],
          },
        })),
      },
    ],
  },
};

export const errorStatsPieOption: echarts.EChartsOption = {
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

export const errorStatsBarOption: echarts.EChartsOption = {
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

export const errorStatsDetailOption: echarts.EChartsOption = {
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

export const totalApiTrafficOption: echarts.EChartsOption = {
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

export const totalApiTrafficSuccsessOption: echarts.EChartsOption = {
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

export const totalApiTrafficFailOption: echarts.EChartsOption = {
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

export const totalApiTrafficDetailOption: echarts.EChartsOption = {
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
      axisLine: { show: true, lineStyle: { color: '#FFF6E5' } },
      axisLabel: { show: true, fontSize: '13', fontWeight: 550, color: '#FFF6E5' },
    },
  ],
  yAxis: [
    {
      type: 'value',
      // splitLine: { show: true, lineStyle: { color: '#000' } },
      axisLabel: { show: true, fontSize: '13', fontWeight: 550, color: '#FFF6E5' },
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
