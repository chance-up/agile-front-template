<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div v-if="SLAn == 'total'" class="form-cont">
      <div class="form-group sla-form">
        <span v-if="term == 'MINITUE'">분</span> <span v-if="term == 'HOUR'">시간</span
        ><span v-if="term == 'DAY'">일</span><span v-if="term == 'MONTH'">월</span>/<span>{{ totalCount }}</span
        >건
      </div>
    </div>
    <div v-if="SLAn == 'none'" class="form-cont">
      <div class="form-group sla-form">
        <span>none</span>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InfoGroup extends Vue {
  @Prop() public inputNm!: string | null;
  @Prop() public SLAn!: string | null;
  @Prop() public term!: string | null;
  @Prop() public totalCount!: string | null;
  @Prop() public TPSCount!: string | null;
}
</script>
