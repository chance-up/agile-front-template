<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <div v-for="(group, index) in ifGrps" :key="index" class="domain-wrap">
        <p class="bold">{{ group.if_nm }}</p>
        <dl class="dot-list">
          <dt v-for="(item, index2) in group.if_url" :key="index2">
            {{ item.protocol }}://{{ item.domain }}:{{ item.port }}
          </dt>
        </dl>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class IfFormlGroup extends Vue {
  @Prop() public inputNm!: string | null;
  @Prop() public ifGrps!: object | null;
}
</script>
