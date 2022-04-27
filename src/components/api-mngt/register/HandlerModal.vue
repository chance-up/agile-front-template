<template>
  <ModalLayout>
    <template v-slot:modalHeader>
      <h1 class="h1-tit">Handler Group Name</h1>
      <button @click="$emit('close')">
        <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
      </button>
    </template>
    <template v-slot:modalContainer>
      <p class="text">Handler Group 설명설명설명설명설명설명</p>

      <ul class="handler-list">
        <li>
          <span>REQ.API & Login Authentication1</span>
          <a v-on:mouseout="showHoverModal = false" v-on:mouseover="showHoverModal = true" href="" class="tip-btn">
            <i><img src="@/assets/tip.svg" alt="팁" /></i>
          </a>
        </li>
        <HoverModal v-if="showHoverModal" @close="showHoverModal = false">
          <h3 slot="header">custom header</h3>
        </HoverModal>
        <li>
          <span>REQ.API & Login Authentication</span>
          <a href="" class="tip-btn">
            <i><img src="@/assets/tip.svg" alt="팁" /></i>
          </a>
        </li>
        <li>
          <span>REQ.API & Login Authentication</span>
          <a href="" class="tip-btn">
            <i><img src="@/assets/tip.svg" alt="팁" /></i>
          </a>
        </li>
        <li>
          <span>REQ.API & Login Authentication</span>
          <a href="" class="tip-btn">
            <i><img src="@/assets/tip.svg" alt="팁" /></i>
          </a>
        </li>
        <li>
          <span>REQ.API & Login Authentication</span>
          <a href="" class="tip-btn">
            <i><img src="@/assets/tip.svg" alt="팁" /></i>
          </a>
        </li>
      </ul>
    </template>
    <template v-slot:modalFooter>
      <button class="lg-btn purple-btn" @click="$emit('close')">ok</button>
    </template>
  </ModalLayout>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import HoverModal from '@/components/commons/modal/HoverModal.vue';

@Component({
  components: {
    ModalLayout,
    HoverModal,
  },
})
export default class HandlerModal extends Vue {
  showHoverModal = false;
  // @Prop() eachApiGroup
}
</script>
<style>
/* .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */
/***   popup   ***/
.pop-wrap {
  position: fixed;
  z-index: 9998;
  top: 20rem;
  left: 45rem;

  /* width: 100%;
  height: 100%; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: table;
  transition: opacity 0.3s ease;
  /* z-index: 5; */
  border: 1px #ddd solid;
  border-radius: 30px;
  /* position: relative; */
  background: #fff;
  width: 600px;
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
  text-align: center;
  padding: 0px 20px;
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
