<template>
  <li>
    <span>REQ.API & Login Authentication1</span>
    <a v-on:mouseout="showHoverModal = false" v-on:mouseover="showHoverModal = true" href="" class="tip-btn">
      <i><img src="@/assets/tip.svg" alt="팁" /></i>
    </a>
    <div v-if="showHoverModal">
      <HoverModal v-for="(eachApi, index) in eachApiGroup.apiIdList" :key="index" @close="showHoverModal = false">
        <h3 slot="header">custom header</h3>
      </HoverModal>
    </div>
  </li>
  
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HandlerModalListRow extends Vue {
  showHoverModal = false;
}
</script>
