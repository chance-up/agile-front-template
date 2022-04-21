<template>
  <div>
    <label class="label" for="sysName">{{ label }}</label>
    <input type="text" id="sysName" class="input-box" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InputBox extends Vue {
  @Prop() public label!: string;
  @Prop() public placeholder!: string;
}
</script>
