<template>
  <div>
    <transition name="HoverModal">
      <!------- handler pop2 -------->
      <div class="pop2-wrap">
        <div class="pop2-header">
          <h1 class="h1-tit">Handler Group Name</h1>
          <button @click="$emit('close')">
            <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
          </button>
        </div>

        <div class="pop2-container">
          <p class="text">Handler Group 설명설명설명설명설명설명 ㅡ아아아아아아앙아아아아아아으아아아아아</p>

          <!-- <ul class="handler-list">
            <li>
              <a v-on:mouseover="doMouseOver">xxsdf</a>
              <span>REQ.API & Login Authentication1</span>
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
            <li>
              <span>REQ.API & Login Authentication</span>
              <a href="" class="tip-btn">
                <i><img src="@/assets/tip.svg" alt="팁" /></i>
              </a>
            </li>
          </ul> -->
        </div>

        <!-- <div class="pop2-footer">
          <button class="lg-btn purple-btn" @click="$emit('close')">ok</button>
        </div> -->
      </div>

      <!------- handler pop2 -------->
      <!-- <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"> default header </slot>
            </div>

            <div class="modal-body">
              <slot name="body"> default body </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                default footer
                <button class="modal-default-button" @click="$emit('close')">OK</button>
              </slot>
            </div>
          </div>
        </div>
      </div> -->
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class HoverModal extends Vue {}
</script>
<style>
/***   pop2up   ***/
.pop2-wrap {
  position: fixed;
  z-index: 9998;
  top: 25rem;
  left: 85rem;

  /* width: 100%;
  height: 100%; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: table;
  transition: opacity 0.3s ease;
  /* z-index: 5; */
  border: 1px #ddd solid;
  border-radius: 30px;
  /* position: relative; */
  background: rgb(183, 217, 34);
  width: 300px;
  padding: 30px 30px;
  margin: 0 auto;
  box-shadow: 1px 1px 5px #ccc;
}

.pop2-header {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.pop2-footer {
  position: relative;
  text-align: center;
  text-align: center;
  padding: 0px 20px;
}
.pop2-container {
  width: auto;
  padding: 30px 0px;
  overflow-y: auto;
  position: relative;
  max-height: 320px;
}

/* .handler-list {
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
} */

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
