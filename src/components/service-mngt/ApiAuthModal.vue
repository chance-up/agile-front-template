<template>
  <div v-if="showApiAuthModal" id="app" class="body-wrap">
    <!------- handler pop -------->
    <div class="pop-wrap lg-pop">
      <div class="pop-header">
        <h1 class="h1-tit">API 권한관리</h1>
        <button @click="hideApiMngt()">
          <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
        </button>
      </div>
      <b-spinner v-if="isApiAuthProgress" large></b-spinner>
      <div class="pop-container" v-if="!isApiAuthProgress">
        <div class="api-wrap">
          <div class="comp">
            <div class="search-form">
              <input class="input-box" type="text" placeholder="API 검색" v-model="searchText" @input="searchApi" />
            </div>
            <ul class="api-list">
              <li v-for="(system, sysIndex) in apiList" :key="sysIndex">
                <a class="stick">{{ system.sysId }}</a>
                <div class="api-group">
                  <div class="check-all">
                    <div class="check-box">
                      <div class="check">
                        <input
                          type="checkbox"
                          id="checkAll"
                          :checked="
                            checkedApiList.find((item) => item.sysId === system.sysId) &&
                            checkedApiList.find((item) => item.sysId === system.sysId).apiId.length ===
                              system.apiId.length
                          "
                          @click="checkApiAll(system)"
                        /><span class="checkmark"></span>
                      </div>
                      <label for="checkAll">전체 선택</label>
                    </div>
                  </div>
                  <div class="check-group">
                    <div class="check-box" v-for="(api, apiIndex) in system.apiId" :key="apiIndex">
                      <div class="check">
                        <input
                          type="checkbox"
                          id=""
                          :checked="
                            checkedApiList.find((item) => item.sysId === system.sysId) &&
                            checkedApiList.find((item) => item.sysId === system.sysId).apiId.includes(api)
                          "
                          @click="checkApi(system.sysId, api)"
                        /><span class="checkmark"></span>
                      </div>
                      <label for="checkGet">{{ api }}</label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="comp gray">
            <div class="box-tit">
              <h3 class="h3-tit">권한 부여 된 API</h3>
              <p class="total">
                total : <span>{{ checkedApiList.length }}</span>
              </p>
            </div>

            <div class="api-cont">
              <div v-for="(sys, index) in checkedApiList" :key="index">
                <div class="api-stick" v-for="(checkedApi, index) in sys.apiId" :key="index">
                  <span>{{ checkedApi }}</span>
                  <button @click="deleteApi(sys.sysId, checkedApi)">
                    <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  // pop-container   -->

      <div class="pop-footer" v-if="!isApiAuthProgress">
        <button class="lg-btn purple-btn">저장</button>
        <button class="lg-btn white-btn" @click="hideApiMngt()">취소</button>
      </div>
    </div>
    <!------- handler pop -------->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ApiAuthResponse } from '@/types/ServiceType';
import { BSpinner } from 'bootstrap-vue';

@Component({
  components: {
    BSpinner,
  },
})
export default class ApiAuthModal extends Vue {
  @Prop({ default: [] }) setApiList!: ApiAuthResponse[];
  @Prop({ default: [] }) setCheckedApiList!: ApiAuthResponse[];
  @Prop({ default: false }) setIsApiAuthProgress!: boolean;
  @Prop({ default: false }) setShowApiAuthModal!: boolean;

  searchText = '';

  apiList: ApiAuthResponse[] = [];
  @Watch('setApiList')
  apiListChanged(val: ApiAuthResponse[]) {
    this.apiList = val;
  }

  checkedApiList: ApiAuthResponse[] = [];
  @Watch('setCheckedApiList')
  checkedApiListChanged(val: ApiAuthResponse[]) {
    this.checkedApiList = val;
  }

  isApiAuthProgress = false;
  @Watch('setIsApiAuthProgress')
  isApiAuthProgressChanged(val: boolean) {
    this.isApiAuthProgress = val;
  }

  showApiAuthModal = false;
  @Watch('setShowApiAuthModal')
  showApiAuthModalChanged(val: boolean) {
    this.showApiAuthModal = val;
  }

  checkApiAll(system: ApiAuthResponse) {
    this.$emit('checkApiAll', system);
  }
  deleteApi(sysId: string, checkedApi: string) {
    this.$emit('deleteApi', sysId, checkedApi);
  }
  checkApi(sysId: string, checkedApi: string) {
    this.$emit('checkApi', sysId, checkedApi);
  }
  hideApiMngt() {
    this.$emit('hideApiMngt');
  }
  searchApi() {
    this.$emit('searchApi', this.searchText);
  }
}
</script>
