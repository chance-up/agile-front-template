<template>
  <ContentLayout :isShowProgress="isShowProgress" title="서비스 정보 확인" subTitle="기본정보 확인" depth="서비스 관리">
    <template v-if="!isShowProgress" v-slot:contents>
      <ul>
        <InfoGroup :inputNm="$t('service.id')" :value="serviceOption.id" />
        <InfoGroup :inputNm="$t('service.date')" :value="serviceOption.svc_st_dt" />
        <AuthGroup
          :inputNm="$t('service.authentication_method')"
          :athn="auth"
          :id="serviceOption.athn.BASIC_AUTH.id"
          :pw="serviceOption.athn.BASIC_AUTH.pw"
          :alg="serviceOption.athn.JWT.alg"
          :issuer="serviceOption.athn.JWT.issuer"
          :subject="serviceOption.athn.JWT.subject"
          :publickey="serviceOption.athn.JWT.publickey"
        />
        <li>
          <label class="label">{{ $t('service.api_mngt') }}</label>
          <div class="form-cont">
            <div class="form-group"></div>
            <div class="form-group"></div>
          </div>
        </li>
        <SlaGroup
          :inputNm="$t('service.SLA_mngt')"
          :secVal.sync="serviceOption.sla.sec"
          :minVal.sync="serviceOption.sla.min"
          :hourVal.sync="serviceOption.sla.hr"
          :dayVal.sync="serviceOption.sla.day"
          :monthVal.sync="serviceOption.sla.mon"
        />
        <InfoGroup :inputNm="$t('service.tkcgrNm')" :value="serviceOption.tkcgr_nm" />
        <InfoGroup :inputNm="$t('service.tkcgrPos')" :value="serviceOption.tkcgr_pos" />
        <InfoGroup :inputNm="$t('service.tkcgrEml')" :value="serviceOption.tkcgr_eml" />
        <InfoGroup :inputNm="$t('service.desc')" :value="serviceOption.desc" />
        <ModalLayout size="m" v-if="modal">
          <template v-slot:modalHeader
            ><h1 class="h1-tit">{{ $t('service.delete') }}</h1>
          </template>
          <template v-slot:modalContainer>
            <p class="text">{{ $t('service.delete_message') }}</p>
          </template>
          <template v-slot:modalFooter
            ><button class="lg-btn purple-btn" @click="deleteService(deleteId)">{{ $t('common.ok') }}</button
            ><button class="lg-btn purple-btn" @click="modalHide()">{{ $t('common.cancel') }}</button>
          </template>
        </ModalLayout>
      </ul>
    </template>

    <template v-if="!isShowProgress" v-slot:buttons>
      <div class="btn-wrap">
        <button
          class="lg-btn purple-btn"
          @click="$router.push({ name: 'service-edit', params: { id: $route.params.id } })"
        >
          {{ $t('common.modify') }}
        </button>
        <button class="lg-btn white-btn" @click="modalShow(serviceOption.id)">{{ $t('common.delete') }}</button>
        <button class="lg-btn gray-btn" @click="$router.go(-1)">{{ $t('common.list') }}</button>
      </div>
    </template>
  </ContentLayout>
</template>
<script lang="ts">
import InfoGroup from '@/components/service-mngt/InfoGroup.vue';
import AuthGroup from '@/components/service-mngt/AuthGroup.vue';
import SlaGroup from '@/components/service-mngt/SlaGroup.vue';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import { ServiceResponse } from '@/types/ServiceType';
import { getModule } from 'vuex-module-decorators';
import ServiceModule from '@/store/modules/ServiceModule';
import { Watch } from 'vue-property-decorator';
import { USER_STATE } from '@/store/UserState';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';

@Component({
  components: {
    InfoGroup,
    AuthGroup,
    SlaGroup,
    ContentLayout,
    ModalLayout,
  },
})
export default class ServiceDetailPage extends Vue {
  auth = '';
  isShowProgress = false;

  @Watch('serviceOption')
  onServiceOptionChange(val: ServiceResponse) {
    if (val.athn.BASIC_AUTH.id === '') {
      this.auth = 'JWT';
    } else if (val.athn.JWT.alg === '') {
      this.auth = 'Basic Auth';
    }
  }

  serviceModule = getModule(ServiceModule, this.$store);

  get serviceOption(): ServiceResponse {
    return this.serviceModule.service;
  }

  async deleteService(ServiceId: string) {
    await this.serviceModule.deleteServiceAction(ServiceId);
    this.$router.back();
    this.modal = false;
  }

  created() {
    this.isShowProgress = true;
    this.serviceModule
      .getService(this.$route.params.serviceId)
      .then(() => {
        this.isShowProgress = false;
      })
      .catch((error) => {
        this.$modal.show('서버 통신 에러');
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
}
</script>
