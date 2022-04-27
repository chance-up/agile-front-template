<template>
  <li>
    <select class="select-box">
      <option v-for="(option, idx) in options" :key="idx" :value="option">
        {{ option }}
      </option>
    </select>
    <span>://</span>
    <input type="text" id="" class="input-box mid" placeholder="domain" />
    <span>:</span>
    <input type="text" id="" class="input-box sm" placeholder="port" />
    <button class="xs-btn" @click="clickEvent" v-if="shape">
      <i class="plus"></i>
    </button>
    <button class="xs-btn" @click="clickEvent" v-else><i class="minus"></i></button>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Interface extends Vue {
  @Prop({ default: '' }) shape!: boolean;
  @Prop() private clickEvent!: () => void;

  options: string[] = ['https', 'http'];
}
</script>
<style lang=""></style>
