<template lang="">
  <li>
    <label>{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <img class="img" src="@/assets/in.svg" alt="uri" />
        <span>{{ uriSer }}</span>
      </div>
      <div class="form-group">
        <img class="img" src="@/assets/out.svg" alt="uri" />
        <span>{{ uriSys }}</span>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const URIGroupProps = Vue.extend({
  props: {
    inputNm: {
      type: String,
      default: '',
    },
    uriSer: {
      type: String,
      default: '',
    },
    uriSys: {
      type: String,
      default: '',
    },
  },
});

@Component
export default class URIGroup extends URIGroupProps {}
</script>
