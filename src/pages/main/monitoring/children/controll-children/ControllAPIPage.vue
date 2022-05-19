<template>
  <div>
    <TimeGroup @changeTime="handle" />
    <div class="monitor-comp">
      <div class="tb-tit">
        <div class="search-cont">
          <label class="label">정렬기준</label>
          <select class="select-box">
            <option>건수</option>
            <option>에러율</option>
            <option>TPS</option>
            <option>응답시간</option>
          </select>
        </div>

        <p class="total">total : <span>8</span></p>
      </div>

      <!--- cardtype list --->
      <div class="card-wrap">
        <ul>
          <li v-for="(item, index) in apiList" :key="index">
            <div class="card-tit">
              <h2 class="h2-tit">{{ item.nm }}</h2>

              <div class="tip">
                <button class="tip-btn">
                  <i><img src="@/assets/tip_ico.svg" alt="tip" /></i>
                </button>
                <!-- <span class="tip-area">api 설명 ~ Lorem ipsum dolor sit amet</span> -->
              </div>
            </div>

            <div class="script-wrap">
              <div class="script-cont">
                <i><img src="@/assets/req_sm.svg" alt="평균 응답시간" /></i>
                <p class="text">
                  평균 응답시간 : <span>{{ item.avgTime }}</span
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
              <div class="chart-div">차트영역</div>
              <dl>
                <dt>
                  성공률 : <span class="syan">{{ item.successRate }}%</span>
                </dt>
                <dd>
                  Total : <span class="purple">{{ item.total }}</span>
                </dd>
                <dd>
                  Success : <span class="syan">{{ item.success }}</span>
                </dd>
                <dd>
                  Fail : <span class="red">{{ item.fail }}</span>
                </dd>
              </dl>
            </div>

            <div class="card-chart">
              <h4 class="h4-tit">실패 구분</h4>
              <div class="chart-div">차트영역</div>
            </div>
          </li>
        </ul>
      </div>
      <!--- // cardtype list --->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TimeGroup from '@/components/monitoring/TimeGroup.vue';

@Component({ components: { TimeGroup } })
export default class ControlPage extends Vue {
  apiList: any[] = [
    {
      nm: 'API_deviceinfo_01',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
    {
      nm: 'API_deviceinfo_01',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
    {
      nm: 'API_deviceinfo_01',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
    {
      nm: 'API_deviceinfo_01',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
    {
      nm: 'API_deviceinfo_01',
      avgTime: '80,000',
      tps: '0.894',
      successRate: '90',
      total: '208',
      success: '200',
      fail: '8',
    },
  ];

  handle(event: any) {
    console.log(event);
  }
}
</script>
<style lang=""></style>
