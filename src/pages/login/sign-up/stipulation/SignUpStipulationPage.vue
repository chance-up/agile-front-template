<template>
  <ContentLayout :title="$t('sign-up.title-register')" :subTitle="$t('sign-up.title-stipulation')">
    <template v-slot:contents>
      <ul>
        <div class="check-box">
          <div class="check"><input type="checkbox" id="checkPost" /><span class="checkmark"></span></div>
          <label for="checkPost">약관 전체동의</label>
        </div>
        <InputGroup
          type="text"
          :value.sync="stplt.id"
          :isValid.sync="idValid"
          :inputNm="$t('sign-up.id')"
          :place="$t('sign-up.id-place')"
        />

        <TextAreaGroup :inputNm="$t('system.desc')" />
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
        <!-- <button class="lg-btn purple-btn" @click="showModal" :disabled="isBtnDisabled"> -->
        <button class="lg-btn purple-btn" @click="goToNext" :disabled="isBtnDisabled">
          {{ $t('common.next') }}
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
import TextAreaGroup from '@/components/login/sign-up/TextAreaGroup.vue';
import { StipulationResponse } from '@/types/UserType';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    ModalLayout,
    TextAreaGroup,
  },
})
export default class SignUpStipulationPage extends Vue {
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

  stplt: StipulationResponse = {
    id: '',
    stpltType: '',
    stpltSbst: [],
    cretDt: '',
    updDt: '',
    cretId: '',
    updId: '',
  };

  goToNext() {
    this.$router.push({ name: 'signUpRegister' });
  }

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

  // showModal() {
  //   const val =
  //     this.idValid && this.pwdValid && this.pwdConfirmValid && this.telValid && this.posValid && this.emlValid
  //       ? true
  //       : false;

  //   if (!val) {
  //     this.$modal.show(`${this.$t('system.empty_check_message')}`);
  //     return;
  //   } else {
  //     this.isShowModal = true;
  //   }
  // }

  closeModal() {
    this.isShowModal = false;
  }

  async onSubmit() {
    this.isBtnDisabled = true;
    this.isShowModal = false;
    await this.userModule
      .agreeStipulation(this.stplt)
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
