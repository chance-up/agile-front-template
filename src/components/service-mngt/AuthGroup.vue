<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div v-if="athn == 'BASIC_AUTH'" class="form-cont">
      <div class="form-group">
        <p>{{ athn }}</p>
      </div>
      <div class="form-group">
        <label class="label">ID :</label>
        <span>{{ id }}</span>
      </div>
      <div class="form-group">
        <label class="label">PW :</label>
        <span>{{ pw }}</span>
      </div>
    </div>

    <div v-else-if="athn == 'JWT'" class="form-cont">
      <div class="form-group">
        <p>{{ athn }}</p>
      </div>
      <div class="form-group">
        <label class="label">알고리즘 :</label>
        <span>{{ alg }}</span>
      </div>
      <div class="form-group">
        <label class="label">발급자 :</label>
        <span>{{ issuer }}</span>
      </div>
      <div class="form-group">
        <label class="label">대상자 :</label>
        <span>{{ subject }}</span>
      </div>
      <div class="form-group">
        <label class="label">공개key :</label>
        <span>{{ publickey }}</span>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class AuthReqGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) athn!: string;
  @Prop({ default: '' }) id!: string;
  @Prop({ default: '' }) pw!: string;
  @Prop({ default: [] }) alg!: string[];
  @Prop({ default: '' }) issuer!: string;
  @Prop({ default: '' }) subject!: string;
  @Prop({ default: '' }) publickey!: string;
}
</script>
