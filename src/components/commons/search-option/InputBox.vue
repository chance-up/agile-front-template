<template>
  <div>
    <label class="label" for="sysName">{{ label }}</label>
    <input type="text" id="sysName" v-model="searchText" class="input-box" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InputBox extends Vue {
  @Prop() public label!: string;
  @Prop() public placeholder!: string;
  @Prop() public searchText!: string;

  v1: Array<any> = [];
}
</script>
