<template>
  <li>
    <label>{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <p>{{ AuthNm }}</p>
      </div>
      <div class="form-group">
        <span class="label">ID :</span>
        <span>{{ AuthId }}</span>
      </div>
      <div class="form-group">
        <span class="label">PW :</span>
        <span>{{ AuthPw }}</span>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const AuthGroupProps = Vue.extend({
  props: {
    inputNm: {
      type: String,
      default: '',
    },
    AuthNm: {
      type: String,
      default: '',
    },
    AuthId: {
      type: String,
      default: '',
    },
    AuthPw: {
      type: String,
      default: '',
    },
  },
});

@Component
export default class AuthGroup extends AuthGroupProps {}
</script>
