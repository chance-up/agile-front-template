<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <div v-for="(group, title, index) in ifGrps" :key="index" class="domain-wrap">
        <p class="bold">{{ title }}</p>
        <dl class="dot-list">
          <dt v-for="(item, index2) in group" :key="index2">
            {{ item }}
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
