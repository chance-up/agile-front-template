<template>
  <li>
    <label class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <select class="select-box" v-model="auth">
          <option value="BASIC_AUTH">Basic Auth</option>
          <option value="JWT">JWT</option>
        </select>
      </div>

      <div v-if="auth == 'BASIC_AUTH'" class="form-group auth-group">
        <!-- Basic Auth -->
        <div class="auth-form">
          <label class="label">ID :</label>
          <input type="text" id="" class="input-box" placeholder="자동생성/변경불가" disabled v-model="basicId" />
          <button @click="clicked" class="sm-btn">
            <i><img src="@/assets/reserve.svg" alt="재발급" /></i>
          </button>
        </div>
        <div class="auth-form">
          <label class="label">PW :</label>
          <input type="text" id="" class="input-box" placeholder="자동생성/변경불가" disabled v-model="basicPW" />
        </div>
      </div>
      <!-- // Basic Auth -->
      <!-- JWT -->
      <div v-if="auth == 'JWT'" class="form-group auth-group">
        <div class="auth-form">
          <label class="label">알고리즘 :</label>
          <select class="select-box" v-model="show">
            <option value="init">선택해주세요</option>
            <option v-for="item in JWTalg" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="auth-form">
          <label class="label">발급자 :</label>
          <input type="text" id="" class="input-box" placeholder="" v-model="JWTissuer" />
        </div>
        <div class="auth-form">
          <label class="label">대상자 :</label>
          <input type="text" id="" class="input-box" placeholder="" v-model="JWTsubject" />
        </div>
        <div class="auth-form">
          <label class="label">공개key :</label>
          <textarea class="textarea" v-model="JWTpublicKey"></textarea>
        </div>
      </div>
      <!-- /JWT -->
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
  @Prop({ default: () => [] }) alg!: string[];
  @Prop({ default: '' }) issuer!: string;
  @Prop({ default: '' }) subject!: string;
  @Prop({ default: '' }) publicKey!: string;
  @Prop() basicId!: string;
  @Prop() basicPW!: string;
  show = 'init';

  get auth() {
    return this.athn;
  }
  set auth(val: string) {
    this.$emit('update:athn', val);
  }

  get BAid() {
    return this.id;
  }
  set BAid(val: string) {
    this.$emit('update:id', val);
  }

  get BApw() {
    return this.pw;
  }
  set BApw(val: string) {
    this.$emit('update:pw', val);
  }

  get JWTalg() {
    return this.alg;
  }
  set JWTalg(val: string[]) {
    this.$emit('update:alg', val);
  }

  get JWTissuer() {
    return this.issuer;
  }
  set JWTissuer(val: string) {
    this.$emit('update:issuer', val);
  }

  get JWTsubject() {
    return this.subject;
  }
  set JWTsubject(val: string) {
    this.$emit('update:subject', val);
  }

  get JWTpublicKey() {
    return this.publicKey;
  }
  set JWTpublicKey(val: string) {
    this.$emit('update:publickey', val);
  }

  clicked() {
    this.$emit('basicAuthClicked');
  }
}
</script>
