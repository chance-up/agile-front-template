<template lang="">
  <li>
    <label class="label point">{{ groupNm }}</label>
    <div class="form-cont">
      <!--  multi select -->
      <div class="multi-wrap">
        <div ref="selectRow" class="select-row inside-click" @click="handleOnClickGroup">{{ chooseHandlerGroup }}</div>
        <!--  dropdown시 active class 추가-->
        <div ref="selectFrom" class="select-form inside-click" :class="{ none: !isSelectOpen }">
          <!--  dropdown시 block class 추가-->
          <ul class="inside-click">
            <li class="inside-click" v-for="(handlerGroup, index) in handlerGroupList" :key="index">
              <span
                class="inside-click"
                @click="
                  [handleSelectHandlerGroup(handlerGroup.apiGroupId), (chooseHandlerGroup = handlerGroup.apiGroupNm)]
                "
                >{{ handlerGroup.apiGroupNm }}</span
              >
              <p ref="multiBtn" class="multi-btn inside-click" @click="showModalMethod(handlerGroup.apiGroupId)"></p>
            </li>
            <HandlerModal :handlerGroup="sendHandlerGroup" v-if="showModal" @close="showModal = false" size="l" />
          </ul>
        </div>
      </div>
      <!--  // multi select -->
    </div>
  </li>
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

  clickCheck = 0;
  onClick(e: any): void {
    // console.log('========');
    console.log('========: ' + this.groupNm);
    // this.clickCheck++;
    const insideClick = e.target.classList as object;
    // console.log('inside click: ' + Object.values(insideClick).includes('inside-click'));
    // if (!Object.values(insideClick).includes('inside-click') && this.isSelectOpen) {
    //   console.log('외부클릭함');
    //   console.log(this.isSelectOpen);
    //   console.log(this.clickCheck);
    //   // this.test();
    // }
    console.log('========');
  }
  test() {
    this.isSelectOpen = false;
  }
  // created() {
  //   window.addEventListener('click', this.onClick2);
  // }
  mounted() {
    console.log('addEvent');
    const registerPage = document.getElementById('api-register') as HTMLElement;
    registerPage.addEventListener('click', this.onClick);
    registerPage.removeEventListener;
  }
  chooseHandlerGroup = 'handler 그룹을 선택해주세요';
  showModal = false;
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
  showModalMethod(apiGroupId: string | number) {
    for (let index = 0; index < this.handlerGroupList.length; index++) {
      const handlerGroup = this.handlerGroupList[index];
      if (handlerGroup.apiGroupId == apiGroupId) {
        this.sendHandlerGroup = handlerGroup;
        break;
      }
    }
    this.showModal = true;
  }

  //  multi select
  isSelectOpen = false;
  handleOnClickGroup(): void {
    this.clickCheck = 0;
    if (!this.isSelectOpen) {
      this.clickCheck++;
    }

    // this.isSelectOpen = !this.isSelectOpen;
  }
  handleOnClickGroupDetail(): void {
    console.log('modal open');
  }
  handleSelectHandlerGroup(handlerGroupId: string): void {
    console.log('handlerGroupId => ' + handlerGroupId);
    this.$emit('input', handlerGroupId);
    this.isSelectOpen = false;
  }
}
</script>
