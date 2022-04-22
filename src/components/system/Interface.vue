<template>
  <div class="domain-wrap">
    <select>
      <option v-for="(option, idx) in options" :key="idx" :value="option">
        {{ option }}
      </option>
    </select>
    <span>://</span>
    <input type="text" id="" class="input-box mid" placeholder="domain" />
    <span>:</span>
    <input type="text" id="" class="input-box sm" placeholder="port" />
    <button @click="clickEvent" v-if="shape">
      <i>
        <img src="@/assets/plus.svg" alt="추가" />
      </i>
    </button>
    <button @click="clickEvent" v-else>
      <i>
        <img src="@/assets/minus.svg" alt="삭제" />
      </i>
    </button>
  </div>
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
