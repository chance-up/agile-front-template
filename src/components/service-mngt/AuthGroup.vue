<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div v-if="athn == 'BASIC_AUTH'" class="form-cont">
      <p class="bold">{{ athn }}</p>
      <div class="sub-group">
        <ul>
          <li>
            <label class="label">ID :</label>
            <span>{{ id }}</span>
          </li>
          <li>
            <label class="label">PW :</label>
            <span>{{ pw }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="athn == 'JWT'" class="form-cont">
      <p class="bold">{{ athn }}</p>
      <div class="sub-group">
        <ul>
          <li>
            <label class="label">알고리즘 :</label>
            <span>{{ alg }}</span>
          </li>
          <li>
            <label class="label">발급자 :</label>
            <span>{{ issuer }}</span>
          </li>
          <li>
            <label class="label">대상자 :</label>
            <span>{{ subject }}</span>
          </li>
          <li>
            <label class="label">공개key :</label>
            <span>{{ publickey }}</span>
          </li>
        </ul>
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
