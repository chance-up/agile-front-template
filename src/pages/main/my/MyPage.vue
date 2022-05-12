<template>
  <ContentLayout
    :isShowProgress="isShowProgress"
    :title="$t('my.modify_top_title')"
    :subTitle="$t('my.modify_cont_title')"
    :depth="$t('my.modify_depth')"
  >
    <template v-if="!isShowProgress" v-slot:contents>
      <ul>
        <InputGroup
          type="text"
          :inputNm="$t('my.name')"
          :value.sync="myInfo.nm"
          :isvalid.sync="nmValid"
          :place="$t('my.name')"
        />
        <InputGroup type="text" :inputNm="$t('my.id')" :value.sync="myInfo.id" :place="$t('my.id')" :disabled="true" />
        <InputGroup
          type="password"
          :inputNm="$t('my.password')"
          :value.sync="myInfo.pwd"
          :isvalid.sync="pwdValid"
          :place="$t('my.password')"
        />
        <InputGroup
          type="password"
          :inputNm="$t('my.password_confirm')"
          :value.sync="myInfo.pwdConfirm"
          :isvalid.sync="pwdConfirmValid"
          :pwdConfirm="isPwdConfirm"
          :place="$t('my.password_confirm')"
        />
        <InputGroup
          type="text"
          :inputNm="$t('my.tel')"
          :value.sync="myInfo.tel"
          :isvalid.sync="telValid"
          :place="$t('my.tel_message')"
        />
        <InputGroup
          type="text"
          :inputNm="$t('my.position')"
          :value.sync="myInfo.pos"
          :isvalid.sync="posValid"
          :place="$t('my.position')"
        />
        <InputGroup
          type="text"
          :inputNm="$t('my.email')"
          :value.sync="myInfo.eml"
          :isvalid.sync="emlValid"
          :place="$t('my.email')"
        />
      </ul>
      <ModalLayout size="m" v-if="isShowModal">
        <template v-slot:modalHeader
          ><h1 class="h1-tit">{{ $t('my.modal_my_edit') }}</h1>
        </template>
        <template v-slot:modalContainer>
          <p class="text">{{ $t('my.modal_edit_message') }}</p>
        </template>
        <template v-slot:modalFooter
          ><button class="lg-btn purple-btn" @click="onSubmit">{{ $t('common.ok') }}</button
          ><button class="lg-btn white-btn" @click="closeModal">{{ $t('common.cancel') }}</button>
        </template>
      </ModalLayout>
    </template>
    <template v-if="!isShowProgress" v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="showModal" :disabled="isDisabled">
          {{ $t('common.modify') }}
          <b-spinner variant="light" label="Spinning" v-if="isDisabled" small></b-spinner>
        </button>
        <button class="lg-btn white-btn" @click="cancelOnClickEvent" :disabled="isDisabled">
          {{ $t('common.cancel') }}
        </button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import UserModule from '@/store/modules/UserModule';
import { UserResponse } from '@/types/UserType';

import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/my/InputGroup.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import ErrorCode from '@/error/ErrorCodes';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    ModalLayout,
  },
})
export default class MyPage extends Vue {
  userModule = getModule(UserModule, this.$store);

  myInfo: UserResponse = {} as UserResponse;

  nmValid = true;
  pwdValid = true;
  pwdConfirmValid = true;
  telValid = true;
  posValid = true;
  emlValid = true;

  isPwdConfirm = false;

  isShowProgress = false;
  isShowModal = false;
  isDisabled = false;

  // !!! 회원정보 수정에서 필요한 부분 !!!
  // 로그인 유저 인증키 확인 필요 => 로그인 상태에서는 모든 API 통신 시 session token을 헤더에 담아서 보내줄꺼임
  // 인증값이 일치하는 경우(= 로그인 유저가 맞는 경우) 회원 정보 가져오기
  // 인증값이 일치하지 않는 경우(= 로그인 유저가 아닌 경우) error 페이지 출력

  get loginUser() {
    return this.userModule.loginUser;
  }

  @Watch('loginUser')
  onLoginUserChange(val: UserResponse) {
    this.myInfo = val;
  }

  @Watch('myInfo.pwd')
  onPwdChange(val: string) {
    if (this.myInfo.pwdConfirm === val) {
      this.isPwdConfirm = true;
    } else {
      this.isPwdConfirm = false;
    }
  }

  @Watch('myInfo.pwdConfirm')
  onPwdConfirmChange(val: string) {
    if (this.myInfo.pwd === val) {
      this.isPwdConfirm = true;
    } else {
      this.isPwdConfirm = false;
    }
  }

  created() {
    this.isShowProgress = true;

    this.userModule
      .getLoginUser(this.$route.params.id)
      .then(() => {
        this.isShowProgress = false;
      })
      .catch((error) => {
        this.isShowProgress = false;

        if (error === ErrorCode.NETWORK_ERROR) {
          this.$modal.show(`${this.$t('error.server_error')}`);
        } else if (error === ErrorCode.CANCEL_ERROR) {
          // api 취소된 경우
          this.$modal.show(`${this.$t('error.server_error')}`);
        }
      });
  }

  onSubmit(): void {
    delete this.myInfo.pwdConfirm;

    this.isDisabled = true;
    this.isShowModal = false;

    this.userModule
      .updateLoginUserInfo(this.myInfo)
      .then(() => {
        this.isShowProgress = false;
        this.isDisabled = false; // 주석 처리
        // this.$router.go(0);
      })
      .catch((error) => {
        this.isShowProgress = false;

        if (error === ErrorCode.NETWORK_ERROR) {
          this.$modal.show(`${this.$t('error.server_error')}`);
        } else if (error === ErrorCode.CANCEL_ERROR) {
          this.$modal.show(`${this.$t('error.server_error')}`);
        }
      });
  }

  cancelOnClickEvent() {
    this.$router.push({ name: 'home' });
  }

  showModal() {
    const valid =
      this.nmValid && this.pwdValid && this.pwdConfirmValid && this.telValid && this.posValid && this.emlValid;

    if (!valid) {
      this.$modal.show(`${this.$t('error.invalid_input')}`);
    } else {
      this.isShowModal = true;
    }
  }

  closeModal() {
    this.isShowModal = false;
  }
}
</script>
