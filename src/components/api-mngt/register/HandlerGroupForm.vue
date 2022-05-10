<template lang="">
  <div>
    <li>
      <label class="label point">{{ groupNm }}</label>
      <div class="form-cont">
        <!--  multi select -->
        <div class="multi-wrap">
          <div ref="selectRow" class="select-row inside-click req-class" @click="requestHandleOnClickGroup">
            {{ reqHandlerGroupId ? reqHandlerGroupId : chooseReqHandlerGroup }}
          </div>
          <!--  dropdown시 active class 추가-->
          <div ref="selectFrom" class="select-form inside-click" :class="{ none: !isSelectOpenRequest }">
            <!--  dropdown시 block class 추가-->
            <ul class="inside-click">
              <li class="inside-click" v-for="(handlerGroup, index) in reqHandlerGroupList" :key="index">
                <span
                  class="inside-click"
                  @click="
                    [
                      handleSelectReqHandlerGroup(handlerGroup.apiGroupId),
                      (chooseReqHandlerGroup = handlerGroup.apiGroupNm),
                    ]
                  "
                  >{{ handlerGroup.apiGroupNm }}</span
                >
                <p
                  ref="multiBtn"
                  class="multi-btn inside-click"
                  @click="showReqModalMethod(handlerGroup.apiGroupId)"
                ></p>
              </li>
              <HandlerModal
                :handlerGroup="sendHandlerGroup"
                v-if="showReqModal"
                @close="showReqModal = false"
                size="l"
              />
            </ul>
          </div>
        </div>
        <!--  // multi select -->
      </div>
    </li>
    <li>
      <label class="label point">{{ groupNm }}</label>
      <div class="form-cont">
        <!--  multi select -->
        <div class="multi-wrap">
          <div ref="selectRow" class="select-row inside-click res-class" @click="responseHandleOnClickGroup">
            {{ resHandlerGroupId ? resHandlerGroupId : chooseResHandlerGroup }}
          </div>
          <!--  dropdown시 active class 추가-->
          <div ref="selectFrom" class="select-form inside-click" :class="{ none: !isSelectOpenResponse }">
            <!--  dropdown시 block class 추가-->
            <ul class="inside-click">
              <li class="inside-click" v-for="(handlerGroup, index) in resHandlerGroupList" :key="index">
                <span
                  class="inside-click"
                  @click="
                    [
                      handleSelectResHandlerGroup(handlerGroup.apiGroupId),
                      (chooseResHandlerGroup = handlerGroup.apiGroupNm),
                    ]
                  "
                  >{{ handlerGroup.apiGroupNm }}</span
                >
                <p
                  ref="multiBtn"
                  class="multi-btn inside-click"
                  @click="showResModalMethod(handlerGroup.apiGroupId)"
                ></p>
              </li>
              <HandlerModal
                :handlerGroup="sendHandlerGroup"
                v-if="showResModal"
                @close="showResModal = false"
                size="l"
              />
            </ul>
          </div>
        </div>
        <!--  // multi select -->
      </div>
    </li>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { HandlerGroupDetail } from '@/types/HandlerType';
import HandlerModal from '@/components/api-mngt/register/HandlerModal.vue';

@Component({
  components: {
    HandlerModal,
  },
})
export default class HandlerGroupForm extends Vue {
  @Prop() groupNm!: string | null;
  @Prop({ default: () => [] }) reqHandlerGroupList!: HandlerGroupDetail[];
  @Prop({ default: () => [] }) resHandlerGroupList!: HandlerGroupDetail[];
  @Prop() reqHandlerGroupId!: string | null;
  @Prop() resHandlerGroupId!: string | null;

  onClick(e: any): void {
    const insideClick = e.target.classList as object;
    if (Object.values(insideClick).includes('req-class')) {
      if (this.isSelectOpenResponse) {
        this.isSelectOpenResponse = false;
      }
    }

    if (!Object.values(insideClick).includes('inside-click') && this.isSelectOpenRequest) {
      this.requestHandleOnClickGroup();
      this.isSelectOpenRequest = false;
      this.showReqModal = false;
    }
    if (!Object.values(insideClick).includes('inside-click') && this.isSelectOpenResponse) {
      this.responseHandleOnClickGroup();
      this.isSelectOpenResponse = false;
      this.showResModal = false;
    }
  }

  mounted() {
    const registerPage = document.getElementById('api-register') as HTMLElement;
    registerPage.addEventListener('click', this.onClick);
    registerPage.removeEventListener;
  }
  chooseReqHandlerGroup = 'handler 그룹을 선택해주세요';
  chooseResHandlerGroup = 'handler 그룹을 선택해주세요';
  showReqModal = false;
  showResModal = false;
  sendHandlerGroup: HandlerGroupDetail = {
    apiGroupId: '',
    // apiGroupNm: 'API & Login Authentication Group Name',
    apiGroupNm: '',
    apiGroupDesc: '',
    apiIdList: [
      {
        apiId: '',
        apiNm: '',
        apiDesc: '',
      },
      {
        apiId: '',
        apiNm: '',
        apiDesc: '',
      },
      {
        apiId: '',
        apiNm: '',
        apiDesc: '',
      },
      {
        apiId: '',
        apiNm: '',
        apiDesc: '',
      },
    ],
  };
  showReqModalMethod(apiGroupId: string | number) {
    for (let index = 0; index < this.reqHandlerGroupList.length; index++) {
      const handlerGroup = this.reqHandlerGroupList[index];
      if (handlerGroup.apiGroupId == apiGroupId) {
        this.sendHandlerGroup = handlerGroup;
        break;
      }
    }
    this.showReqModal = true;
  }
  showResModalMethod(apiGroupId: string | number) {
    for (let index = 0; index < this.resHandlerGroupList.length; index++) {
      const handlerGroup = this.resHandlerGroupList[index];
      if (handlerGroup.apiGroupId == apiGroupId) {
        this.sendHandlerGroup = handlerGroup;
        break;
      }
    }
    this.showResModal = true;
  }

  //  multi select
  isSelectOpenRequest = false;
  requestHandleOnClickGroup(): void {
    this.isSelectOpenRequest = !this.isSelectOpenRequest;
  }
  isSelectOpenResponse = false;
  responseHandleOnClickGroup(): void {
    this.isSelectOpenResponse = !this.isSelectOpenResponse;
  }

  // handleOnClickGroupDetail(): void {
  //   console.log('modal open');
  // }
  handleSelectReqHandlerGroup(handlerGroupId: string): void {
    console.log('handlerGroupId => ' + handlerGroupId);
    this.$emit('reqInput', handlerGroupId);
    this.isSelectOpenRequest = false;
  }

  handleSelectResHandlerGroup(handlerGroupId: string): void {
    console.log('handlerGroupId => ' + handlerGroupId);
    this.$emit('resInput', handlerGroupId);
    this.isSelectOpenResponse = false;
  }
}
</script>
