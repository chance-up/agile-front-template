<template>
  <li>
    <div class="list-comp list" @click="onClickRow">
      <!-- service -->
      <div class="stati-service">
        <h4 class="h4-tit">service_ID_001</h4>
        <div class="other-cont">
          <div class="stick-cont">
            <span class="stick minor"></span>
            <span class="stick major"></span>
            <span class="stick critical"></span>
          </div>

          <span class="text">Total : <em class="purple">208</em></span>
          <span class="text">Success : <em class="syan">200</em></span>
          <span class="text">Fail : <em class="red">8</em></span>

          <span class="success"><em>90</em>%</span>
        </div>
      </div>

      <button class="more-btn">
        <i><img src="@/assets/dropup_ico.svg" alt="더보기" title="더보기" /></i>
      </button>
    </div>
    <!-- //service -->

    <div class="stati-list" :class="{ 'list-slider': isOpen, 'list-slider-none': !isOpen }">
      <!-- api list -->
      <ul>
        <ApiRow v-for="(i, index) in [1, 2, 3, 4]" :key="index" />
      </ul>
    </div>
    <!-- // api list -->
  </li>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ApiRow from '@/components/monitoring/ApiRow.vue';
@Component({ components: { ApiRow } })
export default class ServiceRow extends Vue {
  isOpen = false;
  onClickRow() {
    this.isOpen = !this.isOpen;
  }
}
</script>
<style scoped>
.list {
  background-color: white;
  height: auto;
}
.list-slider {
  transform-origin: top;
  height: fit-content;
  transform: scaleY(100%);
  transition: all 0.3s ease-out;
}
.list-slider-none {
  transform-origin: top;
  height: 0;
  transform: scaleY(0%);
}
</style>
