<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">API 평균 응답시간 및 TPS</h3>
    <div
      class="chart-group tps-group"
      :class="{
        'avg-contract-modal': modal == false,
        'avg-expand-modal': modal == true,
      }"
    >
      <div class="tps-chart" @click="toggleModal(1)" v-if="modal === false">
        <i><img src="@/assets/req_ico.svg" alt="평균 응답시간" /></i>
        <p class="text">평균 응답시간<em>(종전 1분)</em></p>
        <p class="fz42"><strong>8</strong>s</p>
      </div>

      <div class="tps-chart" @click="toggleModal(0)" v-if="modal === true && modalType === 1">
        <h1>이곳이 avg 모달차트가 들어갈 자리</h1>
      </div>

      <div class="tps-chart" @click="toggleModal(2)" v-if="modal === false">
        <i><img src="@/assets/tps_ico.svg" alt="TPS" /></i>
        <p class="text">TPS</p>
        <p class="fz42"><strong>0.875</strong></p>
      </div>
      <div class="tps-chart" @click="toggleModal(0)" v-if="modal === true && modalType === 2">
        <h1>이곳이 tps 모달차트가 들어갈 자리</h1>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { calcCompactCardWidth } from '@/utils/screen';

@Component
export default class ApiResponseAvg extends Vue {
  // 0 = 모달 안보일 때
  // 1 = avg모달일 때
  // 2 = tps모달일 때
  modalType = 0;

  mounted() {
    this.initModal();

    window.addEventListener('resize', () => {
      this.initModal();
    });
  }

  setStartWidth() {
    const startWidth = calcCompactCardWidth(document.querySelector('.dashboard')?.clientWidth as number);
    document.documentElement.style.setProperty('--contract-width', `${startWidth}px`);
  }

  modal = false;
  toggleModal(type: number) {
    this.modalType = type;
    document.documentElement.style.setProperty('--contract-position', 'absolute');
    this.setStartWidth();
    this.modal = !this.modal;
  }

  initModal = () => {
    this.setStartWidth();
    document.documentElement.style.setProperty('--contract-position', 'relative');
  };
}
</script>
<style scoped>
:root {
  --contract-width: 100%;
  --contract-position: relative;
}

.avg-contract-modal {
  width: var(--contract-width);
  z-index: 5;
  position: var(--contract-position);
  right: 0px;
  transition: all 0.2s;
  transform-origin: top right;
}

.avg-expand-modal {
  width: 80%;
  height: 200%;
  z-index: 5;
  position: absolute;
  right: 0px;
  transition: all 0.2s;
  transform-origin: top right;
}

.avg-expand-modal:hover,
.avg-contract-modal:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
}
</style>
