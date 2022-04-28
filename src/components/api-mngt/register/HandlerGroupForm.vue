<template lang="">
  <li>
    <label class="label point">{{ groupNm }}</label>
    <div class="form-cont">
      <!--  multi select -->
      <div class="multi-wrap">
        <div ref="selectRow" class="select-row" @click="handleOnClickGroup">{{ chooseHandlerGroup }}</div>
        <!--  dropdown시 active class 추가-->
        <div ref="selectFrom" class="select-form" :class="{ none: !isSelectOpen }">
          <!--  dropdown시 block class 추가-->
          <ul>
            <!-- <EachHandler
              :handlerGroup="handlerGroup"
              v-for="(handlerGroup, index) in handlerGroupList"
              :key="index"
              @click="handleSelectHandlerGroup"
            /> -->
            <li v-for="(handlerGroup, index) in handlerGroupList" :key="index">
              <span
                @click="
                  [handleSelectHandlerGroup(handlerGroup.apiGroupId), (chooseHandlerGroup = handlerGroup.apiGroupNm)]
                "
                >{{ handlerGroup.apiGroupNm }}</span
              >
              <p class="multi-btn" @click="showModalMethod(handlerGroup.apiGroupId)"></p>
            </li>
            <HandlerModal :handlerGroup="sendHandlerGroup" v-if="showModal" @close="showModal = false" />
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
  // @Prop() closeSelect!: string | null;
  @Prop({ default: () => [] }) handlerGroupList!: HandlerGroupDetail[];
  // @Watch('closeSelect')
  // closeSelectMethod() {
  //   console.log('!!!!!');
  //   if (!this.isSelectOpen) {
  //     this.isSelectOpen = false;
  //   }
  // }
  onClick2(e: MouseEvent): void {
    // console.log('click!!!!!');
    // console.log(e.target);
    // console.log(this.$refs.selectFrom);
    console.log('click!!!!!');
    if (e.target !== this.$refs.selectRow) {
      if (e.target !== this.$refs.selectFrom) {
        // if (e.target !== this.$refs.selectFrom && this.isSelectOpen == true) {
        //결과 창 닫기
        console.log('외부클릭함');
        this.isSelectOpen = false;
      } else {
        console.log('내부클릭함');
      }
    }
  }
  mounted() {
    window.addEventListener('click', this.onClick2);
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
    this.isSelectOpen = !this.isSelectOpen;
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
