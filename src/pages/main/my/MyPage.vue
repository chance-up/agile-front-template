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
          :value.sync="myInfo.name"
          :place="$t('my.name')"
          inputClass="input-box lg"
        />
        <InputGroup
          type="text"
          :inputNm="$t('my.id')"
          :value.sync="myInfo.id"
          :place="$t('my.id')"
          inputClass="input-box lg"
          :disabled="true"
        />
        <InputGroup
          type="password"
          :inputNm="$t('my.password')"
          :value.sync="myInfo.password"
          :place="$t('my.password')"
          inputClass="input-box lg"
        />
        <InputGroup
          type="password"
          :inputNm="$t('my.password_confirm')"
          :value.sync="myInfo.passwordConfirm"
          :place="$t('my.password_confirm')"
          inputClass="input-box lg"
        />
        <InputGroup
          type="text"
          :inputNm="$t('my.tel')"
          :value.sync="myInfo.tel"
          :place="$t('my.tel')"
          inputClass="input-box lg"
        />
        <InputGroup
          type="text"
          :inputNm="$t('my.position')"
          :value.sync="myInfo.position"
          :place="$t('my.position')"
          inputClass="input-box lg"
        />
        <InputGroup
          type="text"
          :inputNm="$t('my.email')"
          :value.sync="myInfo.email"
          :place="$t('my.email')"
          inputClass="input-box lg"
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
          ><button class="lg-btn purple-btn" @click="closeModal">{{ $t('common.cancel') }}</button>
        </template>
      </ModalLayout>
    </template>
    <template v-if="!isShowProgress" v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="showModal">{{ $t('common.modify') }}</button>
        <button class="lg-btn white-btn" @click="cancelOnClickEvent">{{ $t('common.cancel') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import ContentLayout from '@/components/layout/ContentLayout.vue';
import InputGroup from '@/components/system-mngt/InputGroup.vue';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    ModalLayout,
  },
})
export default class MyPage extends Vue {
  isShowProgress = false;
  isShowModal = false;
  myInfo: any = {
    id: '',
    name: '',
    password: '',
    passwordConfirm: '',
    tel: '',
    position: '',
    email: '',
  };

  onSubmit(): void {
    console.log(this.myInfo);
    this.isShowModal = false;
  }

  cancelOnClickEvent() {
    this.$router.go(-1);
  }

  showModal() {
    this.isShowModal = true;
  }

  closeModal() {
    this.isShowModal = false;
  }
}
</script>
