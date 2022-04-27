<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div v-for="(group, title, index) in ifGrps" :key="index">
      <div class="form-cont">
        <p>{{ title }}</p>
      </div>
      <div class="form-cont">
        <li v-for="(item, index2) in group" :key="index2">
          {{ item }}
        </li>
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
