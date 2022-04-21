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
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class AuthReqGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) AuthNm!: string;
  @Prop({ default: '' }) AuthId!: string;
  @Prop({ default: '' }) AuthPw!: string;
}
</script>
