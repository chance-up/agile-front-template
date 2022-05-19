<template>
  <li @click="cardDetail">
    <div class="card-tit">
      <h2 class="h2-tit">{{ item.nm }}</h2>

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
    <!-- <ApiDetailModal
      v-if="showApiDetailModal"
      @close="showApiDetailModal = false"
      :apiDetailData="apiDetailData"
    ></ApiDetailModal> -->
    <!-- <ModalLayout v-if="showApiDetailModal" @close="showApiDetailModal = false" :alert="true"></ModalLayout> -->
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiDetailModal from '@/components/commons/modal/ApiDetailModal.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
interface ApiDetail {
  id: string;
  total: number;
  success: number;
  fail: number;
}
@Component({
  components: { ApiDetailModal, ModalLayout },
})
export default class ControlCard extends Vue {
  cardDetail() {
    console.log('test', this.item);
    this.$emit('val', this.item);
  }
  @Prop() item!: any;
  tipBox = false;
  showApiDetailModal = false;
  apiDetailData: ApiDetail = {
    id: 'service_deviceinfo',
    total: 208,
    success: 200,
    fail: 5,
  };
  mounted() {
    this.apiDetailData.id = this.item.nm;
  }
}
</script>
