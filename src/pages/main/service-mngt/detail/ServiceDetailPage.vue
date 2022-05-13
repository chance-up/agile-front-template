<template>
  <ContentLayout
    :isShowProgress="isShowProgress"
    title="서비스 정보 확인"
    subTitle="기본정보 확인"
    depth="서비스 관리"
    :isEmShow="false"
  >
    <template v-if="!isShowProgress" v-slot:contents>
      <ul>
        <InfoGroup :inputNm="$t('service.id')" :value="serviceOption.id" />
        <DateInfoGroup
          :inputNm="$t('service.date')"
          :startDt="serviceOption.svcStDt.slice(0, 10)"
          :endDt="serviceOption.svcEndDt.slice(0, 10)"
        />
        <AuthGroup
          :inputNm="$t('service.authentication_method')"
          :athn="serviceOption.athnType"
          :id="serviceOption.athn.basic.id"
          :pw="serviceOption.athn.basic.pw"
          :alg="serviceOption.athn.jwt.alg"
          :issuer="serviceOption.athn.jwt.iss"
          :subject="serviceOption.athn.jwt.aud"
          :publickey="serviceOption.athn.jwt.pubKey"
        />
        <li>
          <label class="label">{{ $t('service.api_mngt') }}</label>
          <div class="form-cont">
            <div class="form-group">
              <p class="api-more"><span class="bold">6</span>건</p>
              <button class="more-btn">
                <i><img src="@/assets/more_ico.svg" alt="더보기" /></i>
              </button>
            </div>
          </div>
        </li>
        <SlaGroup
          :inputNm="$t('service.SLA_mngt')"
          :secVal="serviceOption.sla.sec"
          :minVal="serviceOption.sla.min"
          :hourVal="serviceOption.sla.hr"
          :dayVal="serviceOption.sla.day"
          :monthVal="serviceOption.sla.mon"
        />
        <InfoGroup :inputNm="$t('service.tkcgrNm')" :value="serviceOption.tkcgrNm" />
        <InfoGroup :inputNm="$t('service.tkcgrPos')" :value="serviceOption.tkcgrPos" />
        <InfoGroup :inputNm="$t('service.tkcgrEml')" :value="serviceOption.tkcgrEml" />
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
        <button class="lg-btn white-btn" @click="modalShow(serviceOption.id)" :disabled="isRegisterProgress">
          {{ $t('common.delete') }}
          <b-spinner v-show="isRegisterProgress" small></b-spinner>
        </button>
        <button class="lg-btn gray-btn" @click="$router.back()" :disabled="isRegisterProgress">
          {{ $t('common.list') }}
        </button>
      </div>
    </template>
  </ContentLayout>
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
import { Watch } from 'vue-property-decorator';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';

@Component({
  components: {
    InfoGroup,
    AuthGroup,
    SlaGroup,
    ContentLayout,
    ModalLayout,
    DateInfoGroup,
  },
})
export default class ServiceDetailPage extends Vue {
  isShowProgress = false;
  isRegisterProgress = false;

  serviceModule = getModule(ServiceModule, this.$store);

  get serviceOption(): ServiceResponse {
    return this.serviceModule.service;
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
}
</script>
