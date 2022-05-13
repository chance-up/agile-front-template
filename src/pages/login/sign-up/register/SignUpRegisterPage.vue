<template>
  <ContentLayout :title="$t('sign-up.title-register')" :subTitle="$t('sign-up.subtitle-register')">
    <template v-slot:contents>
      <ul>
        <InputGroup
          type="text"
          :value.sync="user.nm"
          :isValid.sync="nmValid"
          :inputNm="$t('sign-up.nm')"
          :place="$t('sign-up.nm-place')"
        />
        <InputGroup
          type="text"
          :value.sync="user.id"
          :isValid.sync="idValid"
          :inputNm="$t('sign-up.id')"
          :place="$t('sign-up.id-place')"
        />
        <InputGroup
          type="password"
          :value.sync="user.pwd"
          :inputNm="$t('sign-up.pwd')"
          :place="$t('sign-up.pwd-place')"
          :isValid.sync="pwdValid"
        />
        <InputGroup
          type="password"
          :value.sync="user.pwdConfirm"
          :inputNm="$t('sign-up.pwd-confirm')"
          :place="$t('sign-up.pwd-confirm-place')"
          :isValid.sync="pwdConfirmValid"
        />

        <InputGroup
          type="text"
          :value.sync="user.tel"
          :inputNm="$t('sign-up.tel')"
          :place="$t('sign-up.tel-place')"
          :isValid.sync="telValid"
        />

        <InputGroup
          type="text"
          :value.sync="user.pos"
          :inputNm="$t('sign-up.pos')"
          :place="$t('sign-up.pos-place')"
          :isValid.sync="posValid"
        />

        <InputGroup
          type="email"
          :value.sync="user.pwdConfirm"
          :inputNm="$t('sign-up.eml')"
          :place="$t('sign-up.eml-place')"
          :isValid.sync="emlValid"
        />
      </ul>
      <ModalLayout size="m" v-if="isShowModal">
        <template v-slot:modalHeader
          ><h1 class="h1-tit">{{ $t('sign-up.modal-register') }}</h1>
        </template>
        <template v-slot:modalContainer>
          <p class="text">{{ $t('sign-up.modal-register-message') }}</p>
        </template>
        <template v-slot:modalFooter
          ><button class="lg-btn purple-btn" @click="onSubmit">{{ $t('common.ok') }}</button
          ><button class="lg-btn purple-btn" @click="closeModal">{{ $t('common.cancel') }}</button>
        </template>
      </ModalLayout>
    </template>
    <template v-slot:buttons v-if="!isShowProgress">
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="showModal" :disabled="isBtnDisabled">
          {{ $t('common.join') }}
          <b-spinner variant="light" label="Spinning" v-if="isBtnDisabled" small></b-spinner>
        </button>
        <button class="lg-btn white-btn" @click="cancelOnClickEvent" :disabled="isBtnDisabled">
          {{ $t('common.cancel') }}
        </button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import UserModule from '@/store/modules/UserModule';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/login/sign-up/InputGroup.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import { UserResponse } from '@/types/UserType';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    ModalLayout,
  },
})
export default class SignUpRegisterPage extends Vue {
  nmValid = false;
  idValid = false;
  pwdValid = false;
  pwdConfirmValid = false;
  telValid = false;
  posValid = true;
  emlValid = true;

  isShowProgress = false;
  isShowModal = false;
  isBtnDisabled = false;

  userModule = getModule(UserModule, this.$store);

  user: UserResponse = {
    id: '', // id
    pwd: '', // pwd
    pwdConfirm: '', // 비밀번호 확인
    nm: '', // 이름
    pos: '', // 소속
    eml: '', // 이메일
    tel: '', // 전화번호
    sttus: '', // 상태
    autId: '', // 권한 id
    stpltId: '', // 약관 id
    stpltAgreeDt: '', //약관 동의 일시
    lastLoginDt: '', // 마지막 로그인 일시
    lastLoginFailDt: '', // 마지막 로그인 실패 일시
    loginFailCnt: 0, // 로그인 실패 건수
    cretDt: '', // 생성 일자
    updDt: '', // 갱신 일자
    cretId: '', // 생성 id
    updId: '', // 갱신 id
  };

  cancelOnClickEvent() {
    this.$router.go(-1);
  }

  timerId = 0;
  isDuplicatedId: boolean | null = null;
  // duplicateCheckId() {
  //   this.isDuplicatedId = null;
  //   if (this.timerId) {
  //     clearTimeout(this.timerId);
  //   }
  //   this.timerId = setTimeout(async () => {
  //     console.log('입력 1초 경과!!!!@#!@#!@#');
  //     this.isDuplicatedId = await this.systemModule.duplicateCheck(this.systemItem.id);
  //   }, 1000);
  // }

  showModal() {
    const val =
      this.nmValid &&
      this.idValid &&
      this.pwdValid &&
      this.pwdConfirmValid &&
      this.telValid &&
      this.posValid &&
      this.emlValid
        ? true
        : false;

    if (!val) {
      this.$modal.show(`${this.$t('system.empty_check_message')}`);
      return;
    } else {
      this.isShowModal = true;
    }
  }

  closeModal() {
    this.isShowModal = false;
  }

  async onSubmit() {
    this.isBtnDisabled = true;
    this.isShowModal = false;
    await this.userModule
      .signUp(this.user)
      .then(() => {
        this.isShowProgress = false;
        this.$router.push({ name: 'system' });
      })
      .catch(() => {
        this.isShowProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }
}
</script>
<style lang=""></style>
