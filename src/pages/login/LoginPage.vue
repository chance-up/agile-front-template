<template>
  <div>
    <div class="login-wrap">
      <h1>{{ $t('login.login') }}</h1>
      <div class="login-form-wrap">
        <div class="form-container form-wrap">
          <ul>
            <InputGroup
              type="text"
              :value.sync="loginForm.id"
              :isvalid.sync="idValid"
              :inputNm="$t('login.id')"
              :place="$t('login.id_placeholder')"
            />
            <InputGroup
              type="password"
              :value.sync="loginForm.pwd"
              :isvalid.sync="pwdValid"
              :inputNm="$t('login.pwd')"
              :place="$t('login.pwd_placeholder')"
            />
          </ul>
          <div class="google-recapcha">구글 리캡챠 자리</div>
          <div class="find-pwd-container">
            <p class="p-left">{{ $t('login.is_forgot_password') }}</p>
            <p class="p-right">{{ $t('login.find_password') }}</p>
          </div>
        </div>
        <div class="form-btn-container">
          <button class="lg-btn purple-btn btn-left" @click="onClickLogin">
            {{ $t('login.login') }}
          </button>
          <button class="lg-btn white-btn btn-right" @click="goToSignUpPage">{{ $t('login.join') }}</button>
        </div>
      </div>
    </div>
    <ModalLayout v-if="isShowModal" :errorDesc="message" :alert="true" @close="hideModal" size="m"> </ModalLayout>
    <!-- <ModalLayout :alert="true" size="m" @close="hideModal" /> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import UserModule from '@/store/modules/UserModule';
import { UserResponse } from '@/types/UserType';

import InputGroup from '@/components/login/InputGroup.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';

@Component({
  components: {
    InputGroup,
    ModalLayout,
  },
})
export default class LoginPage extends Vue {
  loginForm: { id: string; pwd: string } = { id: '', pwd: '' };

  idValid = false;
  pwdValid = false;

  isShowModal = false;
  message = '';

  userModule = getModule(UserModule, this.$store);

  created() {
    if (this.$route.params.error_code === 'UNAUTHORIZED') {
      this.showModal(`${this.$t('login.session_expired')}`);
    }
  }

  onClickLogin() {
    const val = this.idValid && this.pwdValid;
    if (!val) {
      this.showModal(`${this.$t('login.invalid_login')}`);
    } else {
      console.log('loginForm : ', this.loginForm);
      this.userModule.login(this.loginForm);
    }
  }

  goToSignUpPage() {
    this.$router.push({ name: 'signUp' });
  }

  showModal(text: string) {
    this.isShowModal = true;
    this.message = text;
  }

  hideModal() {
    this.isShowModal = false;
  }
}
</script>
<style>
.login-wrap {
  text-align: center;
  margin: 5rem auto;
}

.login-wrap h1 {
  margin-bottom: 1rem;
}

.google-recapcha {
  width: 90%;
  border: 3px solid red;
  margin: 1rem 0;
}

.find-pwd-container,
.form-btn-container {
  margin-top: 3rem;
}

.find-pwd-container p {
  display: inline-block;
}

.find-pwd-container .p-left {
  margin-right: 5rem;
}

.find-pwd-container .p-right {
  margin-left: 8rem;
}

.form-btn-container button {
  margin: 0.5rem;
}
</style>
