<template>
  <div>
    <transition name="modalLayout">
      <!------- handler pop -------->
      <div class="pop-wrap">
        <div class="pop-header">
          <slot name="modalHeader" />
        </div>
        <div class="pop-container">
          <slot name="modalContainer" />
        </div>
        <div class="pop-footer">
          <slot name="modalFooter" />
        </div>
      </div>
      <!------- handler pop -------->
    </transition>

    <transition v-if="alert" name="alertLayout">
      <!------- handler pop -------->
      <div class="pop-wrap">
        <div class="pop-header">
          <slot name="modalHeader" />
          <h1 class="h1-tit">{{ errorTitle }}</h1>
          <button @click="$emit('close')">
            <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
          </button>
        </div>
        <div class="pop-container">
          <slot name="modalContainer" />
          <p class="text">{{ errorDesc }}</p>
        </div>
        <div class="pop-footer">
          <slot name="modalFooter" />
          <button class="lg-btn purple-btn" @click="$emit('close')">ok</button>
        </div>
      </div>
      <!------- handler pop -------->
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ModalLayout extends Vue {
  @Prop({ default: false }) alert!: boolean;
  @Prop() errorTitle!: string;
  @Prop() errorDesc!: string;
}
</script>
<style>
/***   popup   ***/
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
