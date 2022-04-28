<template>
  <div>
    <transition name="HoverModal">
      <!------- handler pop2 -------->
      <div class="tip-box"><h1>asdfasdf</h1></div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class HoverModal extends Vue {}
</script>
<style scoped>
/***   pop2up   ***/
.tip-box {
  /* padding: 15px 15px;
  max-width: 200px;
  max-height: 100px;
  z-index: 5;
  background: #777777;
  border-radius: 8px;
  color: #ffffff; */
  position: fixed;
  z-index: 9998;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* top: 25rem;
  left: 400px; */

  /* width: 100%;
  height: 100%; */
  background-color: rgba(183, 217, 34, 0.3);
  display: table;
  transition: opacity 0.3s ease;
  /* z-index: 5; */
  border: 1px #ddd solid;
  border-radius: 30px;
  /* position: relative; */
  /* background: rgb(183, 217, 34, 0.1); */
  width: 300px;
  padding: 30px 30px;
  margin: 0 auto;
  box-shadow: 1px 1px 5px #ccc;
}
.pop2-wrap {
  position: fixed;
  z-index: 9998;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* top: 25rem;
  left: 400px; */

  /* width: 100%;
  height: 100%; */
  background-color: rgba(183, 217, 34, 0.1);
  display: table;
  transition: opacity 0.3s ease;
  /* z-index: 5; */
  border: 1px #ddd solid;
  border-radius: 30px;
  /* position: relative; */
  /* background: rgb(183, 217, 34, 0.1); */
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
