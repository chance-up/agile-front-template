<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <!-- 총량 -->
      <div class="form-group sla-form">
        <span class="bold">총량</span><span>{{ term }}</span
        >/<span>{{ count }}</span
        >건
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InfoGroup extends Vue {
  @Prop() public inputNm!: string | null;
  @Prop() public term!: string | null;
  @Prop() public count!: string | null;
}
</script>
