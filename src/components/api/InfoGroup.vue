<template lang="">
  <li>
    <label>{{ inputNm }}</label>
    <div class="form-cont">
      <p>{{ value }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const InfoGroupProps = Vue.extend({
  props: {
    inputNm: {
      type: String,
      default: '',
    },
    value: [String, Number],
  },
});

@Component
export default class InfoGroup extends InfoGroupProps {}
</script>
