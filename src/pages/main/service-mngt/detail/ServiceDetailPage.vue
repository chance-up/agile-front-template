<template>
  <div>
    <ContentLayout
      :isShowProgress="isShowProgress"
      title="서비스 정보 확인"
      subTitle="기본정보 확인"
      depth="서비스 관리"
      :isEmShow="false"
    >
      <template v-if="!isShowProgress" v-slot:contents>
        <ul>
          <InfoGroup :inputNm="$t('service.id')" :value="service.id" />
          <DateInfoGroup
            :inputNm="$t('service.date')"
            :startDt="getDate(service.svcStDt)"
            :endDt="getDate(service.svcEndDt)"
          />
          <AuthGroup
            :inputNm="$t('service.authentication_method')"
            :athn="service.athnType"
            :id="service.athn.basic.id"
            :pw="service.athn.basic.pw"
            :alg="service.athn.jwt.alg"
            :issuer="service.athn.jwt.iss"
            :subject="service.athn.jwt.aud"
            :publickey="service.athn.jwt.pubKey"
          />
          <ApiAuthGroup :inputNm="$t('service.api_mngt')" :countApiList="countApiList" @setShowApiAuth="showApiAuth" />
          <SlaGroup
            :inputNm="$t('service.SLA_mngt')"
            :secVal="service.sla.sec"
            :minVal="service.sla.min"
            :hourVal="service.sla.hr"
            :dayVal="service.sla.day"
            :monthVal="service.sla.mon"
          />
          <InfoGroup :inputNm="$t('service.tkcgrNm')" :value="service.tkcgrNm" />
          <InfoGroup :inputNm="$t('service.tkcgrPos')" :value="service.tkcgrPos" />
          <InfoGroup :inputNm="$t('service.tkcgrEml')" :value="service.tkcgrEml" />
          <InfoGroup :inputNm="$t('service.desc')" :value="service.desc" />
          <ModalLayout size="m" v-if="modal">
            <template v-slot:modalHeader
              ><h1 class="h1-tit">{{ $t('service.delete') }}</h1>
            </template>
            <template v-slot:modalContainer>
              <p class="text">{{ $t('service.delete_message') }}</p>
            </template>
            <template v-slot:modalFooter
              ><button class="lg-btn purple-btn" @click="deleteService(deleteId)">{{ $t('common.ok') }}</button
              ><button class="lg-btn white-btn" @click="modalHide()">{{ $t('common.cancel') }}</button>
            </template>
          </ModalLayout>
        </ul>
      </template>

      <template v-if="!isShowProgress" v-slot:buttons>
        <div class="btn-wrap">
          <button
            class="lg-btn purple-btn"
            @click="$router.push({ name: 'service-edit', params: { id: $route.params.id } })"
            :disabled="isRegisterProgress"
          >
            {{ $t('common.modify') }}
          </button>
          <button class="lg-btn white-btn" @click="modalShow(service.id)" :disabled="isRegisterProgress">
            {{ $t('common.delete') }}
            <b-spinner v-show="isRegisterProgress" small></b-spinner>
          </button>
          <button class="lg-btn gray-btn" @click="$router.back()" :disabled="isRegisterProgress">
            {{ $t('common.list') }}
          </button>
        </div>
      </template>
    </ContentLayout>
    <ApiAuthVueModal
      :setCheckedApiList="service.apiAut"
      :setIsApiAuthProgress="isApiAuthProgress"
      :setShowApiAuthModal="showApiAuthModal"
      :setCountApiList="countApiList"
      @hideApiAuth="hideApiAuth"
    ></ApiAuthVueModal>
  </div>
</template>
<script lang="ts">
import InfoGroup from '@/components/service-mngt/InfoGroup.vue';
import DateInfoGroup from '@/components/service-mngt/DateInfoGroup.vue';
import AuthGroup from '@/components/service-mngt/AuthGroup.vue';
import SlaGroup from '@/components/service-mngt/SlaGroup.vue';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import { ServiceResponse } from '@/types/ServiceType';
import { getModule } from 'vuex-module-decorators';
import ServiceModule from '@/store/modules/ServiceModule';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import ApiAuthVueModal from '@/components/service-mngt/ApiAuthVueModal.vue';
import ApiAuthGroup from '@/components/service-mngt/ApiAuthGroup.vue';
import { convertDate } from '@/utils/converter';

@Component({
  components: {
    InfoGroup,
    AuthGroup,
    SlaGroup,
    ContentLayout,
    ModalLayout,
    DateInfoGroup,
    ApiAuthVueModal,
    ApiAuthGroup,
  },
})
export default class ServiceDetailPage extends Vue {
  isShowProgress = false;
  isRegisterProgress = false;
  countApiList = 0;
  serviceModule = getModule(ServiceModule, this.$store);
  service: ServiceResponse = {} as ServiceResponse;
  get serviceOption(): ServiceResponse {
    return this.serviceModule.service;
  }

  getDate(date: string) {
    return convertDate(date);
  }

  deleteService(id: string) {
    this.modal = false;
    this.isRegisterProgress = true;
    this.serviceModule
      .deleteService(id)
      .then(() => {
        this.$router.back();
        this.modal = false;
      })
      .catch(() => {
        this.isRegisterProgress = false;
        this.$modal.show(`${this.$t('error.server_error')}`);
      });
  }

  mounted() {
    this.isShowProgress = true;

    this.serviceModule
      .getService(this.$route.params.id)
      .then(() => {
        this.isShowProgress = false;
        this.service = this.serviceOption;
        this.service.apiAut.forEach((api) => {
          this.countApiList += api.apiId.length;
        });
      })
      .catch(() => {
        this.$modal.show(`${this.$t('api.server_error')}`);
        this.isShowProgress = false;
      });
  }

  destroyed() {
    this.serviceModule.release();
    this.serviceModule.serviceReset();
  }

  modal = false;
  deleteId = '';
  modalShow(id: string) {
    this.deleteId = id;
    this.modal = true;
  }
  modalHide() {
    this.modal = false;
  }
  showApiAuthModal = false;
  isApiAuthProgress = false;

  showApiAuth() {
    this.showApiAuthModal = true;
    this.isApiAuthProgress = true;
  }
  hideApiAuth() {
    this.showApiAuthModal = false;
  }
}
</script>
