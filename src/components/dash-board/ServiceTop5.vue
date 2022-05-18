<template>
  <div class="chart-wrap">
    <h3 class="h3-tit">{{ $t('dash-board.service_top5_title') }}</h3>
    <ul class="list-wrap">
      <li v-for="(item, index) in top5List" :key="index">
        <p class="id-txt">{{ item.id }}</p>
        <dl>
          <dt>
            <em>{{ $t('common.total') }} :</em>{{ item.total }}
          </dt>
          <dd>
            <span class="syan">{{ item.success }}</span
            >/<span class="red">{{ item.fail }}</span>
          </dd>
        </dl>
        <div class="sm-bar">{{ $t('dash-board.success_rate') }}</div>
        <ProgressBar :listItem="item" />
        <button class="more-btn">
          <i><img src="@/assets/more_ico.svg" :alt="$t('common.more')" /></i>
        </button>
      </li>
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
