<template>
  <transition name="modalLayout">
    <!------- handler pop -------->
    <div :class="{ large: l, medium: m, small: s, 'pop-wrap': true }" class="inside-click">
      <div class="pop-header inside-click">
        <h1 class="h1-tit inside-click">{{ handlerGroup.apiGroupNm }}</h1>
        <button class="inside-click" @click="$emit('close')">
          <i class="inside-click"><img class="inside-click" src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
        </button>
      </div>
      <div class="pop-container inside-click">
        <p class="text inside-click">{{ handlerGroup.apiGroupDesc }}</p>

        <ul class="handler-list inside-click">
          <li class="inside-click" v-for="(eachApi, index) in handlerGroup.apiIdList" :key="index">
            <span class="inside-click">{{ eachApi.apiNm }}</span>
            <p
              v-on:mouseout="handleMouseOut"
              v-on:mouseover="[changeApiDesc(eachApi.apiDesc)]"
              href=""
              class="tip-btn inside-click"
            >
              <i><img src="@/assets/tip.svg" alt="팁" :value="eachApi.apiDesc" /></i>
            </p>
          </li>
          <HoverModal v-if="showHoverModal" @close="showHoverModal = false" :apiDesc="sendApiDesc">
            <!-- <h3 slot="header">custom header</h3> -->
          </HoverModal>
        </ul>
      </div>
      <div class="pop-footer inside-click">
        <button class="lg-btn purple-btn inside-click" @click="$emit('close')">ok</button>
      </div>
    </div>
    <!------- handler pop -------->
  </transition>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import HoverModal from '@/components/api-mngt/register/HoverModal.vue';
import { HandlerGroupDetail } from '@/types/HandlerType';

import HoverLayout from '@/components/commons/modal/HoverLayout.vue';

@Component({
  components: {
    ModalLayout,
    HoverModal,
    HoverLayout,
  },
})
export default class HandlerModal extends Vue {
  showHoverModal = false;
  sendApiDesc = '';
  check = false;
  @Prop() public handlerGroup!: HandlerGroupDetail;
  @Prop() size!: string;
  l = false;
  m = false;
  s = false;
  created() {
    if (this.size == 'l') {
      this.l = true;
      this.m = false;
      this.s = false;
    } else if (this.size == 'm') {
      this.l = false;
      this.m = true;
      this.s = false;
    } else {
      this.l = false;
      this.m = false;
      this.s = true;
    }
  }
  handleMouseOut() {
    if (this.showHoverModal) {
      this.showHoverModal = false;
    }
  }
  handleMouseOver(event: MouseEvent) {
    if (!this.showHoverModal) {
      console.log(event);
      this.showHoverModal = true;
    }
  }
  changeApiDesc(apiDesc: string) {
    if (!this.showHoverModal) {
      this.sendApiDesc = apiDesc;
      console.log(apiDesc);
      this.showHoverModal = true;
    }
  }
}
</script>
<style>
/***   popup   ***/
.large {
  width: 600px;
  /* background: rgb(193, 33, 33); */
}
.medium {
  width: 400px;
  /* background: rgb(193, 174, 33); */
}
.small {
  width: 200px;
  /* background: rgb(33, 193, 73); */
}
.pop-wrap {
  position: fixed;
  z-index: 9998;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 100%;
  height: 100%; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: table;
  transition: opacity 0.3s ease;
  /* z-index: 5; */
  border: 1px #ddd solid;
  border-radius: 30px;
  /* position: relative; */
  /* background: #fff;
  width: 600px; */
  padding: 30px 30px;
  margin: 0 auto;
  box-shadow: 1px 1px 5px #ccc;
}

.pop-header {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.pop-footer {
  position: relative;
  text-align: center;
  padding: 20px 20px 0px 20px;
  border-top: 1px #ddd solid;
}
.pop-footer .lg-btn {
  padding: 12px 20px;
  margin-right: 10px;
}

.pop-container {
  width: auto;
  padding: 30px 0px;
  overflow-y: auto;
  position: relative;
  max-height: 320px;
}

.handler-list {
  position: relative;
  margin-top: 20px;
}
.handler-list li {
  position: relative;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  height: 36px;
}
.handler-list li::before {
  display: block;
  content: '-';
  position: absolute;
  left: 10px;
}

.handler-list li span {
  padding-left: 10px;
  color: #333;
  font-size: 16px;
  line-height: 36px;
  font-weight: 400;
}
.handler-list li:hover span,
.handler-list li:focus span {
  color: #8041f7;
}
.handler-list li .tip-btn {
  display: none;
}

.handler-list li:hover,
.multi-wrap .handler-list li:focus {
  cursor: pointer;
  background-color: #ece1fe;
}
.handler-list li:hover .tip-btn,
.handler-list li:hover .tip-btn:focus {
  display: block;
}

.tip-box {
  padding: 15px 15px;
  max-width: 200px;
  max-height: 100px;
  z-index: 5;
  background: #777777;
  border-radius: 8px;
  color: #ffffff;
}
</style>
