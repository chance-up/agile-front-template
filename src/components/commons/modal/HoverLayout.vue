<template>
  <div>
    <transition name="hoverLayout">
      <!------- handler pop2 -------->
      <div class="po2p-wrap">
        <div class="pop2-header">
          <slot name="hoverHeader" />
        </div>
        <div class="pop2-container">
          <slot name="hoverContainer" />
        </div>
        <div class="pop2-footer">
          <slot name="hoverFooter" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class HoverLayout extends Vue {}
</script>
<style>
/***   pop2up   ***/
.pop2-wrap {
  position: fixed;
  z-index: 9998;
  /* top: 25rem;
  left: 85rem; */
  top: 50%;
  left: 60%;
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
