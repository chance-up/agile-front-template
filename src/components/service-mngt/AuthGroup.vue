<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div v-if="athn == 'basic'" class="form-cont">
      <p class="bold">{{ athn }}</p>
      <div class="sub-group">
        <ul>
          <li>
            <label class="label">ID :</label>
            <span class="text">{{ id }}</span>
          </li>
          <li>
            <label class="label">PW :</label>
            <span class="text">{{ pw }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="athn == 'jwt'" class="form-cont">
      <p class="bold">{{ athn }}</p>
      <div class="sub-group">
        <ul>
          <li>
            <label class="label">알고리즘 :</label>
            <span class="text">{{ alg }}</span>
          </li>
          <li>
            <label class="label">발급자 :</label>
            <span class="text">{{ issuer }}</span>
          </li>
          <li>
            <label class="label">대상자 :</label>
            <span class="text">{{ subject }}</span>
          </li>
          <li>
            <label class="label">공개key :</label>
            <span class="text">{{ publickey }}</span>
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
  @Prop() inputNm!: string;
  @Prop() athn!: string;
  @Prop() id!: string | null;
  @Prop() pw!: string | null;
  @Prop() alg!: string | null;
  @Prop() issuer!: string | null;
  @Prop() subject!: string | null;
  @Prop() publickey!: string | null;
}
</script>
