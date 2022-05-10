<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="sla-group col-2">
        <div class="sla-form"><span class="bold">Month : </span><span>100</span><span>건</span></div>
        <div class="sla-form"><span class="bold">Day : </span><span>30</span><span>건</span></div>
        <div class="sla-form"><span class="bold">Hour : </span><span>100</span><span>건</span></div>
        <div class="sla-form"><span class="bold">Min : </span><span>30</span><span>건</span></div>
        <div class="sla-form"><span class="bold">Sec : </span><span>30</span><span>건</span></div>
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
