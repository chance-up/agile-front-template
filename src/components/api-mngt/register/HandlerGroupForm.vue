<template lang="">
  <div>
    <li>
      <label class="label point">{{ groupNm }}</label>
      <div class="form-cont">
        <!--  multi select -->
        <div class="multi-wrap req-class">
          <div ref="selectRow" class="select-row inside-click" @click="requestHandleOnClickGroup">
            {{ chooseHandlerGroup }}
          </div>
          <!--  dropdown시 active class 추가-->
          <div ref="selectFrom" class="select-form inside-click" :class="{ none: !isSelectOpenRequest }">
            <!--  dropdown시 block class 추가-->
            <ul class="inside-click">
              <li class="inside-click" v-for="(handlerGroup, index) in handlerGroupList" :key="index">
                <span
                  class="inside-click"
                  @click="
                    [
                      handleSelectReqHandlerGroup(handlerGroup.apiGroupId),
                      (chooseHandlerGroup = handlerGroup.apiGroupNm),
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
      <label class="label point">{{ groupNm }}ss</label>
      <div class="form-cont">
        <!--  multi select -->
        <div class="multi-wrap res-class">
          <div ref="selectRow" class="select-row inside-click" @click="responseHandleOnClickGroup">
            {{ chooseHandlerGroup }}
          </div>
          <!--  dropdown시 active class 추가-->
          <div ref="selectFrom" class="select-form inside-click" :class="{ none: !isSelectOpenResponse }">
            <!--  dropdown시 block class 추가-->
            <ul class="inside-click">
              <li class="inside-click" v-for="(handlerGroup, index) in handlerGroupList2" :key="index">
                <span
                  class="inside-click"
                  @click="
                    [
                      handleSelectResHandlerGroup(handlerGroup.apiGroupId),
                      (chooseHandlerGroup = handlerGroup.apiGroupNm),
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
import { HandlerGroupDetail } from '@/types/ApiType';
import EachHandler from '@/components/api-mngt/register/EachHandler.vue';
import HandlerModal from '@/components/api-mngt/register/HandlerModal.vue';

@Component({
  components: {
    EachHandler,
    HandlerModal,
  },
})
export default class HandlerGroupForm extends Vue {
  @Prop() groupNm!: string | null;
  @Prop({ default: () => [] }) handlerGroupList!: HandlerGroupDetail[];
  handlerGroupList2: any = [];

  onClick(e: any): void {
    // console.log('========');
    console.log('========: ' + this.groupNm);
    // this.clickCheck++;
    const insideClick = e.target.classList as object;
    if (Object.values(insideClick).includes('select-row')) {
      console.log('@#@#@#@#');
    }

    if (!Object.values(insideClick).includes('inside-click') && this.isSelectOpenRequest) {
      console.log('외부클릭함');
      console.log(this.isSelectOpenRequest);
      this.requestHandleOnClickGroup();
      this.isSelectOpenRequest = false;
    }
    if (!Object.values(insideClick).includes('inside-click') && this.isSelectOpenResponse) {
      console.log('외부클릭함');
      console.log(this.isSelectOpenResponse);
      this.responseHandleOnClickGroup();
      this.isSelectOpenResponse = false;
    }
    console.log('========');
  }
  @Watch('handlerGroupList')
  changeValue() {
    for (let index = 0; index < this.handlerGroupList.length; index++) {
      const element = this.handlerGroupList[index];
      element.apiGroupId = 'new ' + element.apiGroupId;
      element.apiGroupNm = 'new' + element.apiGroupNm;
      for (let i = 0; i < element.apiIdList.length; i++) {
        const elementList = element.apiIdList[i];

        elementList.apiId = 'new ' + elementList.apiId;
        elementList.apiNm = 'new ' + elementList.apiNm;
      }
      console.log('asdfasffasdfasfd11111');
      console.log(this.handlerGroupList);
      this.handlerGroupList2.push(element);
    }
  }
  created() {
    // window.addEventListener('click', this.onClick2);
    for (let index = 0; index < this.handlerGroupList.length; index++) {
      const element = this.handlerGroupList[index];
      element.apiGroupId = 'new' + element.apiGroupId;
      element.apiGroupNm = 'new' + element.apiGroupNm;
      for (let i = 0; i < element.apiIdList.length; i++) {
        const elementList = element.apiIdList[i];

        elementList.apiId = 'new' + elementList.apiId;
      }
      this.handlerGroupList2.push(element);
    }
    console.log('asdfasffasdfasfd');
    console.log(this.handlerGroupList);
    console.log(this.handlerGroupList2);
  }
  mounted() {
    console.log('addEvent');
    const registerPage = document.getElementById('api-register') as HTMLElement;
    registerPage.addEventListener('click', this.onClick);
    registerPage.removeEventListener;
  }
  chooseHandlerGroup = 'handler 그룹을 선택해주세요';
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
    for (let index = 0; index < this.handlerGroupList.length; index++) {
      const handlerGroup = this.handlerGroupList[index];
      if (handlerGroup.apiGroupId == apiGroupId) {
        this.sendHandlerGroup = handlerGroup;
        break;
      }
    }
    this.showReqModal = true;
  }
  showResModalMethod(apiGroupId: string | number) {
    for (let index = 0; index < this.handlerGroupList2.length; index++) {
      const handlerGroup = this.handlerGroupList2[index];
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
    this.$emit('input', handlerGroupId);
    this.isSelectOpenRequest = false;
  }

  handleSelectResHandlerGroup(handlerGroupId: string): void {
    console.log('handlerGroupId => ' + handlerGroupId);
    this.$emit('input', handlerGroupId);
    this.isSelectOpenResponse = false;
  }
}
</script>
