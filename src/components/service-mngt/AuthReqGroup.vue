<template>
  <li>
    <label class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <select class="select-box lg" v-model="auth">
          <option value="basic">Basic Auth</option>
          <option value="jwt">JWT</option>
        </select>
      </div>

      <div v-if="auth == 'basic'" class="auth-group">
        <!-- Basic Auth -->
        <ul class="domain-list lg">
          <li>
            <div class="auth-form">
              <label class="label">ID :</label>
              <input type="text" id="" class="input-box" placeholder="자동생성/변경불가" disabled v-model="basicId" />
              <button @click="clicked" class="xs-btn">
                <i v-show="!progress" class="serve"></i>
                <b-spinner v-show="progress" small></b-spinner>
              </button>
            </div>
          </li>
          <li>
            <div class="auth-form">
              <label class="label">PW :</label>
              <input type="text" id="" class="input-box" placeholder="자동생성/변경불가" disabled v-model="basicPw" />
            </div>
          </li>
        </ul>
      </div>
      <!-- // Basic Auth -->
      <!-- JWT -->
      <div v-if="auth == 'jwt'" class="auth-group">
        <ul class="domain-list lg">
          <li>
            <div class="auth-form">
              <label class="label">알고리즘 :</label>
              <select class="select-box" v-model="algPick" @focus="noticeInput()">
                <option disabled value="null">선택해주세요</option>
                <option v-for="item in JWTalg" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
          </li>
          <li>
            <div class="auth-form">
              <label class="label">발급자 :</label>
              <input type="text" id="" class="input-box" placeholder="" v-model="JWTissuer" @focus="noticeInput()" />
            </div>
          </li>
          <li>
            <div class="auth-form">
              <label class="label">대상자 :</label>
              <input type="text" id="" class="input-box" placeholder="" v-model="JWTsubject" @focus="noticeInput()" />
            </div>
          </li>
          <li>
            <div class="auth-form">
              <label class="label">공개key :</label>
              <textarea class="textarea" v-model="JWTpublicKey" @focus="noticeInput()"></textarea>
            </div>
          </li>
        </ul>
      </div>
      <!-- /JWT -->
      <p
        v-if="
          (showInput && algPick == 'null') ||
          (showInput && JWTissuer == '') ||
          (showInput && JWTsubject == '') ||
          (showInput && JWTpublicKey == '') ||
          (showInput && algPick == null) ||
          (showInput && JWTissuer == null) ||
          (showInput && JWTsubject == null) ||
          (showInput && JWTpublicKey == null) ||
          (auth == 'basic' && basicId == '') ||
          (auth == 'basic' && basicId == null)
        "
        class="red-txt noti"
      >
        {{ $t('service.empty_check') }}
      </p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { BSpinner } from 'bootstrap-vue';
@Component({
  components: {
    BSpinner,
  },
})
export default class AuthReqGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) athn!: string;
  @Prop({ default: () => [] }) alg!: string[];
  @Prop({ default: '' }) issuer!: string;
  @Prop({ default: '' }) subject!: string;
  @Prop({ default: '' }) publicKey!: string;
  @Prop({ default: '' }) pickedAlg!: string;
  @Prop() basicId!: string;
  @Prop() basicPw!: string;
  @Prop({ default: false }) isvalid!: boolean | null;
  @Prop({ default: false }) progress!: boolean;

  @Watch('basicId')
  onBasicIdChanged(val: string) {
    if (this.auth == 'basic') {
      if (val == '' || val == null) {
        this.$emit('update:isvalid', false);
      } else {
        this.$emit('update:isvalid', true);
      }
    }
  }
  @Watch('algPick')
  onAlgPickChanged() {
    if (this.auth == 'jwt') {
      if (
        this.algPick != 'null' &&
        this.JWTissuer != '' &&
        this.JWTsubject != '' &&
        this.JWTpublicKey != '' &&
        this.algPick != null &&
        this.JWTissuer != null &&
        this.JWTsubject != null &&
        this.JWTpublicKey != null
      ) {
        this.$emit('update:isvalid', true);
      } else {
        this.$emit('update:isvalid', false);
      }
    }
  }

  @Watch('JWTissuer')
  onJWTissuerChanged() {
    if (this.auth == 'JWT') {
      if (
        this.algPick != 'null' &&
        this.JWTissuer != '' &&
        this.JWTsubject != '' &&
        this.JWTpublicKey != '' &&
        this.algPick != null &&
        this.JWTissuer != null &&
        this.JWTsubject != null &&
        this.JWTpublicKey != null
      ) {
        this.$emit('update:isvalid', true);
      } else {
        this.$emit('update:isvalid', false);
      }
    }
  }
  @Watch('JWTsubject')
  onJWTsubjwctChanged() {
    if (this.auth == 'JWT') {
      if (
        this.algPick != 'null' &&
        this.JWTissuer != '' &&
        this.JWTsubject != '' &&
        this.JWTpublicKey != '' &&
        this.algPick != null &&
        this.JWTissuer != null &&
        this.JWTsubject != null &&
        this.JWTpublicKey != null
      ) {
        this.$emit('update:isvalid', true);
      } else {
        this.$emit('update:isvalid', false);
      }
    }
  }
  @Watch('JWTpublicKey')
  onJWTpublicKeyChanged() {
    if (this.auth == 'JWT') {
      if (
        this.algPick != 'null' &&
        this.JWTissuer != '' &&
        this.JWTsubject != '' &&
        this.JWTpublicKey != '' &&
        this.algPick != null &&
        this.JWTissuer != null &&
        this.JWTsubject != null &&
        this.JWTpublicKey != null
      ) {
        this.$emit('update:isvalid', true);
      } else {
        this.$emit('update:isvalid', false);
      }
    }
  }

  get algPick() {
    return this.pickedAlg;
  }
  set algPick(val: string) {
    this.$emit('update:pickedAlg', val);
  }
  get auth() {
    return this.athn;
  }
  set auth(val: string) {
    this.showInput = false;
    this.$emit('update:athn', val);
    this.$emit('update:isvalid', false);
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
    this.$emit('update:publicKey', val);
  }
  clicked() {
    this.$emit('basicAuthClicked');
  }
  showInput = false;
  noticeInput() {
    this.showInput = true;
  }
}
</script>
