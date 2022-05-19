<template>
  <li>
    <div class="card-tit">
      <h2 class="h2-tit">service_0001</h2>

      <div class="tip">
        <button class="tip-btn" v-on:mouseout="tipBox = false" v-on:mouseover="tipBox = true">
          <i><img src="@/assets/tip_ico.svg" alt="tip" /></i>
        </button>
        <span v-if="tipBox" class="tip-area">서비스 설명 ~ Lorem ipsum dolor sit amet</span>
      </div>
    </div>

    <div class="script-wrap">
      <div class="script-cont">
        <i><img src="@/assets/req_sm.svg" alt="평균 응답시간" /></i>
        <p class="text">평균 응답시간 : <span>80,000</span>ms</p>
      </div>
      <div class="script-cont">
        <i><img src="@/assets/tps_sm.svg" alt="TPS" /></i>
        <p class="text">TPS : <span>0.894</span></p>
      </div>
    </div>

    <div class="card-chart col-2">
      <div class="chart-div">차트영역</div>
      <dl>
        <dt>성공률 : <span class="syan">90%</span></dt>
        <dd>Total : <span class="purple">208</span></dd>
        <dd>Success : <span class="syan">200</span></dd>
        <dd>Fail : <span class="red">8</span></dd>
      </dl>
    </div>

    <div class="card-chart">
      <h4 class="h4-tit">실패 구분</h4>
      <div class="chart-div">차트영역</div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {},
})
export default class TestTest extends Vue {
  tipBox = false;
}
</script>
