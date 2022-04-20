<template lang="">
  <li>
    <label>{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <span
          v-for="(item, index) in methods"
          :key="index"
          class="badge"
          :class="{
            syan: item == 'GET',
            red: item == 'DELETE',
            blue: item == 'POST',
            violet: item == 'PUT',
          }"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const MethodGroupProps = Vue.extend({
  props: {
    inputNm: {
      type: String,
      default: '',
    },
    methods: {
      type: Array,
      default: () => [],
    },
  },
});

@Component
export default class MethodGroup extends MethodGroupProps {}
</script>
