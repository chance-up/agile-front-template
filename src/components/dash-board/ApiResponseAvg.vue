<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">API 평균 응답시간 및 TPS</h3>
    <div
      class="chart-group tps-group"
      :class="{
        'boxWidth mouse-hover': modal == false,
        'expand-modal': modal == true,
      }"
      @click="showModalDetail()"
    >
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
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ApiResponseAvg extends Vue {
  modal = false;
  showModalDetail() {
    this.setBoxWidth();

    setTimeout(() => {
      this.modal = true;
    }, 0);
  }
  hideModalDetail() {
    this.modal = false;
  }
  widthValue = '';

  setBoxWidth() {
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

.boxWidth {
  width: var(--box-width);
}

.expand-modal {
  width: 50%;
  z-index: 5;
  position: absolute;
  transform: translate(-87.6%, 50%) scaleY(2);
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
  transition: all 0.5s;
}
</style>
