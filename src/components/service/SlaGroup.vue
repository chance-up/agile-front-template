<template>
  <li>
    <label>{{ inputNm }}</label>
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
import Vue from 'vue';
import Component from 'vue-class-component';

const SlaGroupProps = Vue.extend({
  props: {
    inputNm: {
      type: String,
      default: '',
    },
    term: {
      type: String,
      default: '',
    },
    count: {
      type: String,
      default: '',
    },
  },
});

@Component
export default class SlaGroup extends SlaGroupProps {}
</script>
