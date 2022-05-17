<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">API Top 5</h3>
    <ul class="list-wrap">
      <li v-for="(item, index) in top5List" :key="index">
        <p class="id-txt">{{ item.id }}</p>
        <dl>
          <dt><em>Total :</em>{{ item.total }}</dt>
          <dd>
            <span class="syan">{{ item.success }}</span
            >/<span class="red">{{ item.fail }}</span>
          </dd>
        </dl>
        <div class="sm-bar">성공률</div>
        <ProgressBar :listItem="item" />
        <button class="more-btn">
          <i><img src="@/assets/more_ico.svg" alt="더보기" /></i>
        </button>
      </li>
      <!-- <li>
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
      </li> -->
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ProgressBar from '@/components/commons/ProgressBar.vue';

@Component({
  components: {
    ProgressBar,
  },
})
export default class ApiTop5 extends Vue {
  top5List: any[] = [
    {
      id: 'sysID_API_deviceinfo',
      total: 208,
      success: 200,
      fail: 5,
    },
    {
      id: 'sysID_API_deviceinfo',
      total: 208,
      success: 170,
      fail: 38,
    },
    {
      id: 'sysID_API_deviceinfo',
      total: 208,
      success: 125,
      fail: 83,
    },
    {
      id: 'sysID_API_deviceinfo',
      total: 208,
      success: 208,
      fail: 0,
    },
    {
      id: 'sysID_API_deviceinfo',
      total: 208,
      success: 50,
      fail: 158,
    },
  ];
}
</script>
<style></style>
