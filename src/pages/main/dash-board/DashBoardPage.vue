<template>
  <article class="dashboard">
    <!--- refresh play/pause area --->
    <section class="time-wrap">
      <span>2022.05.16 15:23:36</span>
      <button>
        <i><img src="@/assets/pause_ico.svg" alt="pause" /></i>
      </button>
      <button>
        <i><img src="@/assets/spin_ico.svg" alt="refresh" /></i>
      </button>
    </section>
    <!--- // refresh play/pause area --->

    <section class="group col-3">
      <!--- Total API Traffic (24Hour) area --->
      <div class="chart-wrap">
        <h3 class="h3-tit">Total API Traffic (24Hour)</h3>
        <div class="chart-group api-traffic">
          <div class="api-pie">total</div>
          <div class="api-pie">성공</div>
          <div class="api-pie">실패</div>
        </div>
      </div>
      <!--- // Total API Traffic (24Hour) area --->

      <!--- Error stats (24Hour) area --->
      <div class="chart-wrap">
        <h3 class="h3-tit">Error stats (24Hour)</h3>
        <div class="chart-group error-stats">
          <div class="error-pie">실패율</div>
          <div class="error-chart">Critical/Major/Minor</div>
        </div>
      </div>
      <!--- // Error stats (24Hour) area --->

      <!--- API 평균 응답시간 / TPS area --->
      <div class="chart-wrap">
        <h3 class="h3-tit">API 평균 응답시간 및 TPS</h3>
        <div class="chart-group tps-group">
          <div class="tps-chart">
            <i><img src="@/assets/req_ico.svg" alt="평균 응답시간" /></i>
            <p class="text">평균 응답시간<em>(종전 1분)</em></p>
            <p class="fz42"><strong>8</strong>s</p>
          </div>
          <div class="tps-chart">
            <i><img src="@/assets/tps_ico.svg" alt="TPS" /></i>
            <p class="text">TPS</p>
            <p class="fz42"><strong>0.875</strong></p>
          </div>
        </div>
      </div>
      <!--- // API 평균 응답시간 / TPS area --->
    </section>

    <section class="group">
      <!--- 실시간 Traffic area --->
      <div class="chart-wrap">
        <h3 class="h3-tit">실시간 Traffic</h3>
        <div class="chart-group"></div>
      </div>
    </section>
    <!--- // 실시간 Traffic area --->

    <section class="group col-2">
      <!--- API Top 5 area --->
      <div class="chart-wrap">
        <h3 class="h3-tit">API Top 5</h3>
        <ul class="list-wrap">
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
        </ul>
      </div>
      <!--- // API Top 5 area --->

      <!--- Service Top 5 area --->
      <div class="chart-wrap">
        <h3 class="h3-tit">Service Top 5</h3>
        <ul class="list-wrap">
          <li>
            <p class="id-txt">service_API_deviceinfo</p>
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
            <p class="id-txt">service_API_deviceinfo</p>
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
            <p class="id-txt">service_API_deviceinfo</p>
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
            <p class="id-txt">service_API_deviceinfo</p>
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
            <p class="id-txt">service_API_deviceinfo</p>
            <dl>
              <dt><em>Total :</em>208</dt>
              <dd><span class="syan">200</span>/<span class="red">3</span></dd>
            </dl>
            <div class="sm-bar">성공률</div>
            <button class="more-btn">
              <i><img src="@/assets/more_ico.svg" alt="더보기" /></i>
            </button>
          </li>
        </ul>
      </div>
      <!--- // Service Top 5 area --->
    </section>

    <section class="group col-2 bg-pastel">
      <!--- API Top 5 area --->
      <div class="chart-wrap">
        <h3 class="h3-tit">전일대비/전주대비 Traffic 추이 (00:00 ~ 24:00)</h3>
        <div class="chart-group"></div>
      </div>

      <!--- // API Top 5 area --->

      <!--- Service Top 5 area --->
      <div class="chart-wrap">
        <h3 class="h3-tit">전일대비 응답시간 추이 (00:00 ~ 24:00)</h3>
        <div class="chart-group"></div>
      </div>
      <!--- // Service Top 5 area --->
    </section>
  </article>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DoughnutChart from '@/components/dash-board/charts/DoughnutChart.vue';
import TotalApiTraffic from '@/components/dash-board/charts/TotalApiTraffic.vue';

import * as echarts from 'echarts';
@Component({
  components: {
    DoughnutChart,
    TotalApiTraffic,
  },
})
export default class DashBoardPage extends Vue {}
</script>
<style lang=""></style>
